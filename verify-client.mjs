/**
 * dsh-ds-balance client bundle 的离线验证脚本（Node 模拟浏览器加载）：
 * 1. 模拟 window.__ModuleLoader__.load 捕获 factory；
 * 2. 用真实 react 执行 factory，捕获插件 exports；
 * 3. 通过 slots.register stub 捕获组件，用 react-dom/server 渲染成 HTML。
 * 任何一步抛错即说明 bundle 在真实浏览器中有 boot 失败风险。
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

// 优先从 web profile 锚点解析 react：profile 的 parent-walk 能到达 DSH 的
// in-box 依赖平面（$DSH_HOME/profiles/node_modules）；找不到时退回脚本自身位置。
const home = process.env.DSH_HOME ?? join(process.env.HOME ?? ".", ".dsh");
const profileAnchor = join(home, "profiles", "web", "package.json");
const require = createRequire(existsSync(profileAnchor) ? profileAnchor : import.meta.url);
const bundlePath = new URL("client.js", import.meta.url);

// 1. 模拟浏览器加载
let capturedFactory = null;
globalThis.window = {
  __ModuleLoader__: {
    load({ factory }) {
      capturedFactory = factory;
    },
  },
};
new Function(readFileSync(bundlePath, "utf8"))();
if (capturedFactory === null) throw new Error("bundle 未调用 __ModuleLoader__.load");
// 回归检查：外层能量条曾因 flex-basis:0% 高度塌缩为 0（肉眼不可见），
// .dsb_bar 必须带 flex:none 且显式 height，防止同类问题复发。
const bundleText = readFileSync(bundlePath, "utf8");
if (!bundleText.includes(".dsb_bar{flex:none;width:100%;height:14px")) {
  throw new Error("回归失败：.dsb_bar 样式缺少 flex:none+显式高度（能量条会塌缩为 0 高）");
}

// 2. 执行 factory（react 为 seed word）
const pluginModule = capturedFactory((spec) => {
  if (spec === "react") return require("react");
  if (spec === "react/jsx-runtime") return require("react/jsx-runtime");
  throw new Error(`意外的 seed word：${spec}`);
});
console.log("插件导出：", Object.keys(pluginModule));

// 3. 捕获组件并 SSR 渲染
let balanceComponent = null;
const ctx = {
  slots: {
    inject(name, factory) {
      factory();
    },
    register(options, component) {
      balanceComponent = component;
      return () => {};
    },
  },
};
pluginModule.apply(ctx);
if (balanceComponent === null) throw new Error("apply 未注册组件");

const React = require("react");
const { renderToString } = require("react-dom/server");
for (const wide of [true, false]) {
  const html = renderToString(React.createElement(balanceComponent, { wide }));
  if (!html.includes("dsb_badge")) throw new Error(`wide=${wide} 渲染结果缺少 badge`);
  if (wide && !html.includes("dsb_bar")) throw new Error("宽侧栏渲染结果缺少能量条容器");
  if (wide && !html.includes("dsb_waveBack")) throw new Error("宽侧栏渲染结果缺少后层波浪");
  if (wide && !html.includes("dsb_waveFront")) throw new Error("宽侧栏渲染结果缺少前层波浪");
  if (!wide && !html.includes("dsb_railWaves")) throw new Error("窄侧栏渲染结果缺少外层波浪能量条");
  if (!wide && !html.includes("dsb_railAmount")) throw new Error("窄侧栏渲染结果缺少余额金额");
  console.log(`wide=${wide} 渲染 OK（${html.length} 字符）`);
}
// 面板仅在 open 状态下渲染（组件内部 state，SSR 无法打开），
// 小时用量柱形图做文本级回归检查。
for (const marker of ["dsb_chartWrap", "dsb_chartAxis", "dsb_colFill", "dsb_colEmpty", "recordHour"]) {
  if (!bundleText.includes(marker)) throw new Error(`柱形图回归失败：bundle 缺少 ${marker}`);
}
for (const marker of ["dsb_settings", "dsb_setChip", "dsb_gear", "THEMES", "SPEEDS", "REFRESH_OPTIONS", "buildDemoHours", "SEED_DEMO_ON_FIRST_RUN"]) {
  if (!bundleText.includes(marker)) throw new Error(`设置面板/演示数据回归失败：bundle 缺少 ${marker}`);
}
console.log("client bundle 验证通过");
