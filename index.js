/**
 * dsh-ds-balance —— host 面（Node 侧）。
 *
 * 在 DSH Web GUI 上注册一个只读端点 `GET /api/deepseek-balance`：
 * 经 credentials seam 读取 `DEEPSEEK_API_KEY`，调用 DeepSeek 官方
 * `GET https://api.deepseek.com/user/balance` 查询账户余额并原样转发。
 * 密钥只在宿主进程内使用，绝不下发到浏览器。
 *
 * 挂载方式：`~/.dsh/profiles/web/cordis.patch.yml` 的 insert 列表
 * （`- insert: - id: ds-balance, name: 'dsh-ds-balance'`）。
 */

import { homedir } from "node:os";

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

/** @type {import("@deepseek-ai/cordis").Plugin} */
function apply(ctx) {
  const route = ctx.webServer.register({
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
  // 插件卸载时移除路由，避免重复注册冲突。
  return () => route();
}

export { apply, inject, name };
