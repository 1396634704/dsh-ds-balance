/**
 * dsh-ds-balance —— host 面（Node 侧）。
 *
 * 在 DSH Web GUI 上注册两个端点：
 * - `GET /api/deepseek-balance`：经 credentials seam 读取 `DEEPSEEK_API_KEY`，
 *   调用 DeepSeek 官方 `GET https://api.deepseek.com/user/balance` 查询余额转发。
 * - `POST /api/deepseek-balance/uninstall`：卸载自身——从 cordis.patch.yml
 *   移除登记、删除插件目录（重启 dsh web 后彻底生效）。
 * 密钥只在宿主进程内使用，绝不下发到浏览器。
 *
 * 挂载方式：`~/.dsh/profiles/web/cordis.patch.yml` 的 insert 列表
 * （`- insert: - id: ds-balance, name: 'dsh-ds-balance'`）。
 */

import { homedir } from "node:os";
import { readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

/** 稳定 Cordis 插件名。 */
const name = "ds-balance";

/** 依赖的宿主服务：webServer 提供路由注册，credentials 提供密钥解析。 */
const inject = ["webServer", "credentials"];

/** DeepSeek 官方余额查询端点。 */
const DEEPSEEK_BALANCE_URL = "https://api.deepseek.com/user/balance";

/** 凭据引用名（与 ~/.dsh/.credentials.yaml 中的键一致）。 */
const CREDENTIAL_REF = "DEEPSEEK_API_KEY";

/** 上游请求超时（毫秒）。 */
const UPSTREAM_TIMEOUT_MS = 15000;

/**
 * 判断请求 Host 是否为回环地址，防止 DNS rebinding 从局域网页面窃取余额。
 * @param {string | undefined} hostHeader - 请求的 Host 头（可能带端口）。
 * @returns {boolean} 是否允许。
 */
function isLoopbackHost(hostHeader) {
  if (hostHeader === undefined) return false;
  // 去掉端口；IPv6 字面量形如 [::1]:3080。
  const withoutPort = hostHeader.replace(/:\d+$/, "");
  return (
    withoutPort === "127.0.0.1"
    || withoutPort === "localhost"
    || withoutPort === "[::1]"
    || withoutPort === "::1"
  );
}

/** 合法 profile 名（防路径穿越）。 */
const PROFILE_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * 发送 JSON 响应。
 * @param {import("node:http").ServerResponse} res
 * @param {number} status
 * @param {unknown} body
 */
function sendJson(res, status, body) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(body));
}

/**
 * 从 cordis.patch.yml 文本中移除本插件的登记条目（id 行 + 紧随的 name 行），
 * 并清理因此留下的孤立 `- insert:` 壳；未找到登记时返回原文本。
 * 纯文本行级处理，不引入 YAML 依赖。
 * @param {string} content - 原始 patch 文本。
 * @returns {{ text: string, removed: boolean }}
 */
function stripRegistration(content) {
  const lines = content.split("\n");
  const kept = [];
  let removed = false;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^\s*- id: ds-balance\s*$/.test(lines[i])) {
      i += 1; // 跳过紧随的 name 行
      removed = true;
      continue;
    }
    kept.push(lines[i]);
  }
  // 清理孤立的顶层 "- insert:"：向后跳过空行，若到达 EOF 或直接跟另一个
  // 无缩进的顶层条目，说明该壳已无子条目，一并删除。
  const cleaned = [];
  for (let i = 0; i < kept.length; i += 1) {
    const line = kept[i];
    if (/^- insert:\s*$/.test(line)) {
      let j = i + 1;
      while (j < kept.length && kept[j].trim() === "") j += 1;
      const next = kept[j];
      if (next === undefined || /^- /.test(next)) continue;
    }
    cleaned.push(line);
  }
  return { text: cleaned.join("\n"), removed };
}

/**
 * 卸载自身：移除 patch 登记（成功后再删文件，保证两者一致，避免重启后
 * "登记已删但包残留"或反之导致的 boot 失败）。
 * @param {string} dshHome - DSH home 目录。
 * @param {string} profile - profile 名（默认 web）。
 * @returns {Promise<{ patchRemoved: boolean, dirRemoved: boolean }>}
 */
async function uninstallSelf(dshHome, profile) {
  const profileDir = join(dshHome, "profiles", profile);
  const patchPath = join(profileDir, "cordis.patch.yml");
  const pluginDir = join(profileDir, "node_modules", "dsh-ds-balance");

  let patchRemoved = false;
  if (existsSync(patchPath)) {
    const content = await readFile(patchPath, "utf8");
    const stripped = stripRegistration(content);
    if (stripped.removed) {
      await writeFile(patchPath, stripped.text, "utf8");
      patchRemoved = true;
    }
  }

  let dirRemoved = false;
  if (existsSync(pluginDir)) {
    // symlink 安装时只删链接；拷贝安装时递归删除目录。
    await rm(pluginDir, { recursive: true, force: true });
    dirRemoved = true;
  }
  return { patchRemoved, dirRemoved };
}

/** @type {import("@deepseek-ai/cordis").Plugin} */
function apply(ctx) {
  const balanceRoute = ctx.webServer.register({
    kind: "exact",
    path: "/api/deepseek-balance",
    async handler(req, res) {
      if (req.method !== "GET") {
        sendJson(res, 405, { error: "Method not allowed" });
        return;
      }
      // 只服务回环访问；LAN 直连场景如需放开，可在这里扩展白名单。
      if (!isLoopbackHost(req.headers.host)) {
        sendJson(res, 403, { error: "Forbidden: balance endpoint is loopback-only" });
        return;
      }
      const credential = await ctx.credentials.resolve(CREDENTIAL_REF);
      if (credential === undefined) {
        // 提示路径按实际 DSH home 动态拼，避免自定义 DSH_HOME 时误导用户。
        // 用 os.homedir() 而非 process.env.HOME，保证 Windows 下也正确。
        const homeHint = process.env.DSH_HOME ?? `${homedir()}/.dsh`;
        sendJson(res, 503, {
          error: `DEEPSEEK_API_KEY 未配置：请在 ${homeHint}/.credentials.yaml 中设置后刷新`,
        });
        return;
      }
      try {
        const upstream = await fetch(DEEPSEEK_BALANCE_URL, {
          method: "GET",
          headers: {
            authorization: `Bearer ${credential.value}`,
            accept: "application/json",
          },
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });
        const body = await upstream.json().catch(() => null);
        if (body === null) {
          sendJson(res, 502, { error: `DeepSeek 余额接口返回非 JSON（HTTP ${upstream.status}）` });
          return;
        }
        sendJson(res, upstream.status, body);
      } catch (error) {
        sendJson(res, 502, {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  const uninstallRoute = ctx.webServer.register({
    kind: "exact",
    path: "/api/deepseek-balance/uninstall",
    async handler(req, res) {
      if (req.method !== "POST") {
        sendJson(res, 405, { error: "Method not allowed" });
        return;
      }
      if (!isLoopbackHost(req.headers.host)) {
        sendJson(res, 403, { error: "Forbidden: uninstall endpoint is loopback-only" });
        return;
      }
      // profile 经 query 传入（默认 web），只允许安全字符。
      const url = new URL(req.url ?? "/", "http://x");
      const profile = url.searchParams.get("profile") ?? "web";
      if (!PROFILE_PATTERN.test(profile)) {
        sendJson(res, 400, { error: "Invalid profile name" });
        return;
      }
      const dshHome = process.env.DSH_HOME ?? `${homedir()}/.dsh`;
      try {
        const { patchRemoved, dirRemoved } = await uninstallSelf(dshHome, profile);
        sendJson(res, 200, {
          ok: true,
          patchRemoved,
          dirRemoved,
          message: "已卸载 dsh-ds-balance：重启 dsh web 后彻底生效"
            + (patchRemoved ? "（登记已移除）" : "（未在 cordis.patch.yml 找到登记，已清理文件）"),
        });
      } catch (error) {
        sendJson(res, 500, {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  // 插件卸载时移除路由，避免重复注册冲突。
  return () => {
    balanceRoute();
    uninstallRoute();
  };
}

export { apply, inject, name };
