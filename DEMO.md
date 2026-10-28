# dsh-ops #462 demo 分支

这个分支把构建产物 `lib/` 一起提交，目的只有一个：让维护者**不必本地构建**就能安装并体验单行插件页。

## 相关链接

- 实现 PR：https://github.com/T-Auto/dsh-ops/pull/472
- Issue：#462 https://github.com/T-Auto/dsh-ops/issues/462
- 现成构建包：https://github.com/xinspark/dsh-ops/releases/download/demo-462/dsh-ops-0.5.0.tgz
- 开发分支（PR head）：`work/462-detail-config-ui`

## 安装

```bash
# 二选一
pnpm add "github:xinspark/dsh-ops#demo/462-preview"   # 在 DSH profile 目录执行
# 或下载上面的 .tgz 后在 profile 目录安装
```

安装后**重启 DSH 实例**（宿主半侧改动不会因刷新页面生效）。

## 体验点

1. `插件 → dsh-ops`：只剩一行，状态卡显示平台 / 受管理的 Bash / Git Bash / PowerShell 7（版本）/ `dsh-win-pwsh7`（版本）。
2. 点「配置」：四个预设默认收起、点开出现四个子开关、关闭预设后子开关置灰；总开关门控同名子开关；「其他」里有数据采集 / TUI-OPS 联动 / `dsh-win-pwsh7` 联动。
3. 状态区的行内动作「安装/删除」：先给计划，再执行；安装 `dsh-win-pwsh7` 后重开配置页，联动会按检测自动开启。

包版本仍是 0.5.0（demo/prerelease），体验完卸载、装回原版本即可。
