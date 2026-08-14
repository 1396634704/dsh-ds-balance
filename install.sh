#!/bin/bash
# dsh-ds-balance 插件安装脚本：把本插件安装到任意 DSH 的 profile。
#
# 用法：
#   ./install.sh                  # 安装到默认位置（~/.dsh 的 web profile）
#   ./install.sh <DSH_HOME> <profile>   # 安装到指定 DSH home 与 profile
#
# 说明：
#   - 把插件文件拷贝到 <DSH_HOME>/profiles/<profile>/node_modules/dsh-ds-balance/；
#   - 在 <DSH_HOME>/profiles/<profile>/cordis.patch.yml 中登记插件（幂等，重复执行安全）；
#   - 安装后需重启 dsh web（Ctrl+C 后重新 `dsh web`）并刷新浏览器才能看到 client 面。
set -euo pipefail

DSH_HOME="${1:-$HOME/.dsh}"
PROFILE="${2:-web}"
PROFILE_DIR="$DSH_HOME/profiles/$PROFILE"
DEST_DIR="$PROFILE_DIR/node_modules/dsh-ds-balance"
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$SRC_DIR/package.json" ]; then
  echo "错误：未在脚本目录找到插件源文件（package.json 缺失）" >&2
  exit 1
fi

echo "==> 安装 dsh-ds-balance 到 $PROFILE_DIR"

# 0. profile 目录检查：若尚未初始化，提示先让 DSH 自己初始化
#    （首次运行 `dsh --profile <profile> web` 会自动生成 profile 模板；
#    本脚本不代建 package.json，避免破坏 DSH 的初始化流程）。
if [ ! -d "$PROFILE_DIR" ] || [ ! -f "$PROFILE_DIR/package.json" ]; then
  echo "    注意：profile 尚未初始化。请先运行一次以下命令（会初始化 profile 模板）："
  echo "      dsh --profile $PROFILE web"
  echo "    然后重新执行本脚本。本脚本将先创建目录结构。"
  mkdir -p "$PROFILE_DIR"
fi

# 1. 拷贝插件文件（本体 + 验证脚本）
mkdir -p "$DEST_DIR"
cp "$SRC_DIR/package.json" "$SRC_DIR/index.js" "$SRC_DIR/client.js" "$SRC_DIR/verify-client.mjs" "$DEST_DIR/"
echo "    已拷贝插件文件到 $DEST_DIR"

# 2. 登记到 cordis.patch.yml（幂等）
PATCH="$PROFILE_DIR/cordis.patch.yml"
if [ ! -f "$PATCH" ]; then
  printf -- "[]\n" > "$PATCH"
fi
if grep -q "name: 'dsh-ds-balance'" "$PATCH"; then
  echo "    cordis.patch.yml 已登记本插件，跳过"
else
  # 把顶层空数组 `[]` 替换为 insert 列表；否则在文件末尾追加。
  if grep -q '^\[\]$' "$PATCH"; then
    awk '
      BEGIN { done = 0 }
      /^\[\]$/ && !done {
        print "- insert:"
        print "    - id: ds-balance"
        print "      name: '\''dsh-ds-balance'\''"
        done = 1
        next
      }
      { print }
    ' "$PATCH" > "$PATCH.tmp" && mv "$PATCH.tmp" "$PATCH"
  else
    printf '\n- insert:\n    - id: ds-balance\n      name: '\''dsh-ds-balance'\''\n' >> "$PATCH"
  fi
  echo "    已登记插件到 cordis.patch.yml"
fi

# 3. 校验凭据存在（只提示，不读值）
if [ -f "$DSH_HOME/.credentials.yaml" ] && grep -q '^DEEPSEEK_API_KEY:' "$DSH_HOME/.credentials.yaml"; then
  echo "    DEEPSEEK_API_KEY 已配置（$DSH_HOME/.credentials.yaml）"
else
  echo "    提示：请在 $DSH_HOME/.credentials.yaml 中配置 DEEPSEEK_API_KEY，否则余额端点返回 503"
fi

echo "==> 完成。重启 dsh web（Ctrl+C 后重新运行 dsh web）并刷新浏览器即可看到余额面板。"
