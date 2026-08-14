# dsh-ds-balance

在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI（`dsh web`）侧栏底部常驻展示 **DeepSeek 账户余额**的本地双面插件。

- **侧栏收起（窄）**：横胶囊，波浪呼吸背景 + 余额金额直接印在上面；
- **侧栏展开（宽）**：「总余额 ¥xxx」+ 波浪能量条（双层波浪起伏流动 + 呼吸）；
- **点击面板**：总余额、充值余额、刷新 / 关闭按钮、更新时间。

数据每 10 秒自动刷新（刷新过程不闪烁，仅数字变化）；波浪为纯装饰动画，系统开启"减少动态效果"时自动静止。

> 说明：DeepSeek 余额接口只返回「当前剩余金额」，没有历史充值 / 消耗数据，因此能量条不做百分比语义，纯作装饰。

## 快速开始（3 步）

**macOS / Linux / Windows（Git Bash 或 WSL）：**

```bash
# 1. 获取插件
git clone https://github.com/1396634704/dsh-ds-balance.git
cd dsh-ds-balance

# 2. 安装到默认位置（~/.dsh 的 web profile）
./install.sh
# 或指定 DSH home 与 profile：
# ./install.sh /path/to/.dsh web

# 3. 重启 dsh web（在运行 dsh web 的终端 Ctrl+C 后重新运行）
dsh web
```

**Windows（PowerShell）：**

```powershell
# 1. 获取插件
git clone https://github.com/1396634704/dsh-ds-balance.git
cd dsh-ds-balance

# 2. 安装到默认位置（%USERPROFILE%\.dsh 的 web profile）
.\install.ps1
# 或指定 DSH home 与 profile：
# .\install.ps1 -DshHome C:\path\.dsh -Profile web

# 3. 重启 dsh web（Ctrl+C 后重新运行 dsh web）
dsh web
```

> PowerShell 5.1（Win10/11 自带）或 7+ 均可，无需管理员权限。
> ⚠️ Windows 支持存在已知限制，详见下文 [平台支持与已知问题](#平台支持与已知问题)。

刷新浏览器（http://127.0.0.1:3080），侧栏底部即可看到余额面板。

## 前提条件

| 条件 | 说明 |
|---|---|
| DeepSeek Harness ≥ 0.1.0-rc.6 | 需要 web profile 的用户补丁层（`cordis.patch.yml`）与 `profiles/node_modules` 依赖平面 |
| `DEEPSEEK_API_KEY` 已配置 | 位于 `~/.dsh/.credentials.yaml`。**用 DeepSeek 官方模型跑 DSH 的部署本来就有这一项，装上即用，零额外配置**；未配置时安装脚本会提示，补一行即可 |
| 可直连 `api.deepseek.com` | 余额查询直接调用 DeepSeek 官方接口 |

## 工作原理

```
浏览器（client 面，client.js）── fetch ──▶ 宿主（host 面，index.js）
   侧栏底部 slot                            GET /api/deepseek-balance
                                            │  读 DSH credentials seam 的
                                            │  DEEPSEEK_API_KEY（密钥不下发浏览器）
                                            ▼
                                GET https://api.deepseek.com/user/balance
```

- **host 面**：注册只读端点 `/api/deepseek-balance`，仅回环地址可访问（防 DNS rebinding）；
- **client 面**：预构建 classic-script bundle，注册到 `sidebar.footer.action` slot；
- 插件遵循 DSH 官方插件机制（`cordis.patch.yml` 登记 + profile `node_modules` 解析），不修改 DSH 本体。

## 设置面板

点击面板右上角的 ⚙ 按钮可调：

| 设置 | 选项 |
|---|---|
| 颜色 | 海洋（默认）/ 森林 / 晚霞 / 紫夜——波浪、圆钮、柱形图同步换色 |
| 动画速度 | 慢 / 标准（默认）/ 快 |
| 余额刷新 | 10 秒（默认）/ 30 秒 / 60 秒 |

设置保存在浏览器 localStorage（`dsh-ds-balance:settings`），刷新页面不丢失。

## 每小时用量图（估算）

面板内展示最近 24 小时用量柱形图。DeepSeek 官方无用量查询接口，数据由本插件**按余额变化本地估算**（每按刷新间隔采样一次余额，按自然小时聚合），存于浏览器 localStorage（`dsh-ds-balance:hours`），**自安装后开始积累**；余额回升（充值）会重置当期基准。

> **数据持久性**：刷新页面、关闭浏览器、重启电脑**都不会丢失**；仅当**清理浏览器站点数据/换浏览器/换设备**时会丢。图表下方有对应提示。
> **精确用量**：点击面板右上角 ↗ 按钮直达 DeepSeek 官方后台用量明细（platform.deepseek.com/usage），精确数据以官方后台为准。

**演示数据**：首次运行且无任何历史记录时，插件会播种 24 小时演示数据，让图表开箱可见（图表下方有"演示数据"标注），随后被真实采样自然覆盖。不需要可把 `client.js` 中 `SEED_DEMO_ON_FIRST_RUN` 改为 `false`。

## 常见调整

| 想改什么 | 改哪里 |
|---|---|
| 自动刷新间隔（默认 10 秒） | `client.js` 中 `AUTO_REFRESH_MS` |
| 波浪速度 / 呼吸节奏 | `client.js` 中 `dsb-wave` / `dsb-breathe` 动画时长 |
| 波浪颜色 | `client.js` 中 `renderWaves` 的两个 `linearGradient` |
| 面板尺寸 / 位置 | `client.js` 中 `.dsb_panel` / `.dsb_bar` 样式 |

改完 `client.js` 后：

```bash
node verify-client.mjs   # 离线验证（Node 模拟加载 + SSR 渲染）
```

然后重启 `dsh web` 并刷新浏览器（client 面必须重启进程才生效，这是 DSH 客户端插件的扫描机制）。

## 文件结构

| 文件 | 说明 |
|---|---|
| `index.js` | host 面：余额查询端点 |
| `client.js` | browser 面：侧栏余额面板 bundle |
| `package.json` | 包清单（`exports` 必须含 `./package.json`，DSH 扫描依赖它） |
| `install.sh` | 一键安装（macOS / Linux / Git Bash / WSL，幂等） |
| `install.ps1` | 一键安装（Windows PowerShell，幂等） |
| `uninstall.mjs` | 命令行卸载（Node 跨平台，幂等） |
| `verify-client.mjs` | 离线验证脚本 |

## 卸载

本插件以 DSH 官方**静态 patch 方式**挂载（`cordis.patch.yml` + profile `node_modules`），
因此**不会出现在设置页的「插件清单」里**——那个面板只管理经 DSH 动态插件系统安装的包，
这是 DSH 的机制设计，并非本插件缺失功能。为此本插件自带两条卸载路径：

**方式一：面板内一键卸载（推荐）**
打开余额面板 → 点 ⚙ 打开设置 → 底部「卸载插件」按钮 → 确认。
将自动移除 cordis.patch.yml 中的登记并删除插件文件，重启 `dsh web` 后彻底生效。

**方式二：命令行卸载**

```bash
node uninstall.mjs                     # 卸载默认位置（~/.dsh 的 web profile）
node uninstall.mjs /path/to/.dsh web   # 指定 DSH home 与 profile
```

两种方式均为幂等操作，重复执行安全；卸载后浏览器里的设置与用量记录仍保留在
localStorage，可在 Console 执行 `localStorage.removeItem('dsh-ds-balance:hours'); localStorage.removeItem('dsh-ds-balance:settings')` 清理。

## 平台支持与已知问题

| 平台 | 状态 |
|---|---|
| macOS | ✅ 已实测（本插件的开发、离线验证与冒烟测试均在 macOS 完成） |
| Linux | 🟡 未实测：`install.sh` 只依赖标准 POSIX 工具（sh/awk/cp），预期可用 |
| Windows | 🟡 提供 `install.ps1`，但**未在真实 Windows 环境实测**，可能存在兼容性问题 |

**Windows 已知兼容性事项：**

1. `install.ps1` 按 PowerShell 5.1（Win10/11 自带）与 7+ 兼容语法编写，但未经 Windows 真机验证；若运行报错请提 issue，并附 Windows 版本、PowerShell 版本（`$PSVersionTable.PSVersion`）与完整报错信息。
2. PowerShell 默认执行策略可能禁止运行脚本，任选其一绕过：
   - `powershell -ExecutionPolicy Bypass -File .\install.ps1`
   - 先执行 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`，再 `.\install.ps1`
3. 原生 cmd/PowerShell 无法运行 `install.sh`（bash 脚本）；Windows 用户要么用 `install.ps1`，要么在 Git Bash/WSL 中运行 `install.sh`。
4. 插件本体（host 面为纯 Node、client 面为纯浏览器代码）不依赖平台特性，DSH 的插件机制（cordis.patch.yml + profile node_modules 解析）在 Windows 上预期与 macOS/Linux 行为一致；但**以上预期同样未在 Windows 上验证**。
5. Windows 下 DSH home 默认位于 `%USERPROFILE%\.dsh`；未配置 key 时面板提示的路径会按系统用户目录自动生成。

## 故障排查

| 现象 | 处理 |
|---|---|
| 侧栏看不到面板 | 重启 `dsh web` 了吗？client 面必须重启进程；然后硬刷新浏览器（Cmd+Shift+R） |
| 面板显示"查询失败：DEEPSEEK_API_KEY 未配置" | 在 `~/.dsh/.credentials.yaml` 添加 `DEEPSEEK_API_KEY: sk-xxx`，刷新即可（无需重启） |
| 页面白屏 | 新终端运行 `node verify-client.mjs` 自查 bundle；查看 `dsh web` 终端报错 |
| 面板显示"查询失败：Forbidden" | 插件仅允许回环访问；经局域网 IP 访问 GUI 的场景暂不支持 |

## License

[MIT](./LICENSE)
