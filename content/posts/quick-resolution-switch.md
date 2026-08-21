---
title: "Quick Resolution Switch：一个托盘分辨率切换器的开发复盘"
date: "2026-08-21"
tags: ["开发复盘", "Win32", "桌面工具"]
summary: "从 wayfinder 地图到 540KB 单文件 exe——一个 Win11 托盘分辨率切换器的完整开发复盘，含 6 个踩穿了的坑。"
draft: false
---

## 一、缘起

想要一个轻量的屏幕分辨率切换工具，但系统自带面板要好几层菜单，第三方工具又往往臃肿。于是决定自己写：**托盘常驻、单文件、零安装依赖、UI 要好看**。

四个硬约束从一开始就定死：

1. 单文件 exe，不能带一堆 DLL / 资源文件分发
2. 托盘常驻，内存要小 —— UI 不能在后台白耗内存
3. 界面遵循 Apple 设计语言 —— 毛玻璃、spring 动效、克制的排版
4. Win11 x64 原生支持

## 二、技术选型：为什么是 WebView2 + Win32

UI 要做出 Apple 风格（毛玻璃、弹性动画），纯 Win32 自绘的成本极高。选择：

- **原生层**（C++/Win32）：托盘、窗口壳、分辨率引擎、IPC —— 这些用系统 API 最稳
- **UI 层**（HTML/CSS/JS）：交给 WebView2，前端生态直接复用 Apple 设计语言

关键决策是 **WebView2 按需加载**：常驻进程不创建 WebView2，点开主页面才 `CreateCoreWebView2Controller`。实测常驻内存 **14MB**，打开 UI 才会拉起 WebView2 子进程，用完关闭窗口即释放。

> 代价：Win11 必须预装 Evergreen WebView2 Runtime（Edge 自带，实际覆盖率很高）。

## 三、分辨率引擎

- **枚举**：`EnumDisplayDevices` 拿到显示器列表，`EnumDisplaySettings` 逐个枚举支持模式（分辨率 × 刷新率）
- **切换**：`ChangeDisplaySettingsEx`，先 `CDS_TEST` 预检再 `CDS_UPDATEREGISTRY` 持久化（重启后保持）
- **去重**：驱动会枚举出 275 个原始模式（同一分辨率不同刷新率算多个），按 `(w,h)` 分组取最高刷新率，最终 19 种

## 四、Apple 风格 UI 落地

严格按 Apple 设计规范的几个要点：

- **毛玻璃**：`backdrop-filter: blur(24px) saturate(160%)` + 半透明背景，层级用材质轻重表达
- **spring 动效**：确认条从底部弹入、popover 从触发器锚定展开（`transform-origin: top center`），CSS 变量令牌化深浅双主题
- **排版纪律**：42px 大号当前分辨率用负 tracking、`tabular-nums` 数字对齐
- **无障碍兜底**：`prefers-reduced-motion` 降级为淡入淡出

## 五、六个大坑（踩过的都记下来）

### 坑 1：透明背景导致界面"空白"

初始设计想让窗口背景全透明 + 系统级 Acrylic 毛玻璃，结果 WebView2 透明像素直接透出桌面 → 看起来啥都没有。

**解决**：WebView2 背景改不透明深色，毛玻璃由页面内卡片 `backdrop-filter` 模拟。UI 层做毛玻璃，窗口层保持不透明，最稳。

### 坑 2：IPC 双向 JSON 编码不对称

前端 `postMessage(JSON.stringify(msg))` 发出 `{"type":"getState"}`，原生 `get_WebMessageAsJson` 拿到的是 **JSON 字符串字面量**（外层带引号+转义）：`"{\"type\":\"getState\"}"` —— `has()` 匹配永远不命中，界面卡死在"加载中"。

**解决**：原生端写 `DecodeJsonString()` 解码一层；反向通道（原生→前端）WebView2 自动解析成对象，前端要兼容 `typeof e.data === 'string' ? JSON.parse : e.data`。

> 教训：WebView2 的双向消息都经过一次 JSON 编码，方向不同编码行为还不同，一定要实测。

### 坑 3：DPI 缩放 —— 窗口"太小太奇怪"

per-monitor aware 已生效，但窗口尺寸用固定物理像素 400×600，WebView2 在 150% DPI 屏上渲染成 600×900，窗口装不下 → 排版全乱。

**解决**：`GetDpiForWindow` + `MulDiv` 按 DPI 缩放窗口物理尺寸；manifest 用**链接器嵌入**（`/MANIFEST:EMBED`）而非 RC 资源，避免被 MSVC 默认 unaware manifest 覆盖。

> 探测陷阱：DPI-aware 进程的窗口，用 unaware 的 Python 探测 `GetWindowRect` 会返回虚拟化坐标（÷1.5），看起来 267×400 实际是 400×600，容易被误判。

### 坑 4：显示器信息错误 —— 缩放硬编码、刷新率 0Hz

- "缩放 100%" 是前端硬编码，实际 DPI 是 150% → 改用 `GetDpiForMonitor` 取真值
- 刷新率显示 0Hz —— 这台机器的 Generic PnP 驱动 `dmDisplayFrequency` 返回 0，但程序实际读到 165Hz（Python 探测脚本的 DEVMODE 结构布局有误，自己被自己骗了）

### 坑 5：窗口"一直显示"关不掉

失焦隐藏依赖 `WM_ACTIVATEAPP`，但托盘弹出时 `SetForegroundWindow` 常被系统前台锁拒绝 → 窗口从未真正激活 → 永远收不到 deactivation 消息。

**解决**：不用激活消息，改用 **定时器轮询**（250ms 检查一次 `GetForegroundWindow` 是否还在本窗口树），弹出后宽限 500ms 再启用。不依赖激活状态，最可靠。

### 坑 6：popover 被滚动容器裁剪

下拉菜单最初 `position: absolute` 挂在滚动容器 `.main-top` 里，展开时被容器边界裁剪，盖不住下方内容。

**解决**：改 `position: fixed`，打开时用 `getBoundingClientRect()` 动态算位置；`main-top` 滚动时关闭菜单避免错位。

## 六、构建链路

- **链接器 manifest**（DPI）+ **RC 资源**（图标 + HTML）+ `/MT` 静态 CRT
- WebView2 SDK 从 NuGet 拉取，链接 `WebView2LoaderStatic.lib`（需 `WEBVIEW2STATICLIB` 宏）
- HTML 通过 `NavigateToString` 从 RC 资源加载，不落盘
- `tools/build.py` 主构建脚本（本机 vcvars 路径含 `(x86)` 括号，batch 的 `if()` 块解析会挂，改用 Python 最稳）

## 七、迭代记录

| 版本 | 变化 |
| --- | --- |
| v1 | wayfinder 地图 + 6 工单定案，编译出 500KB exe |
| v2 | 修复空白界面（透明背景）、加载中（IPC 编码）、窗口比例（DPI）、显示器信息错误 |
| v3 | 失焦自动隐藏、托盘旁弹出、主页上下分栏 |
| v4 | 分辨率网格卡片 → Apple popover 下拉菜单 |
| v5 | popover 遮挡显示器信息 → fixed 定位覆盖 |
| v6 | 菜单固定 3 项高度，全部分辨率可滚动，不遮挡信息 |

## 八、心得

1. **先定约束再选型**：单文件 + 零依赖 + 轻量，这三点直接决定了 WebView2 按需加载和 /MT 静态编译的路线
2. **UI 和原生要尽早联调**：IPC 编码不对称这种问题，纯前端预览永远发现不了，必须真实 exe 里跑
3. **系统 API 的坑比想象多**：DPI 虚拟化、前台锁、驱动返回 0 值 —— 每一条都是实测踩出来的
4. **决策先写下来再动手**：把每个选择记进工单，回头复盘时每一步都有据可查，出问题也好定位是哪一步埋的

---

写代码的乐趣，一半在做出能用的东西，另一半在踩坑之后想明白"为什么"。这篇记的是后者。
