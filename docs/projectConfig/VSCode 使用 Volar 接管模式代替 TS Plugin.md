# VSCode 使用 Volar 接管模式代替 TS Plugin

原文：[Use Take Over Mode instead of TS Plugin #471](https://github.com/johnsoncodehk/volar/discussions/471)

使用 VSCode + Volar 开发 Vue3 + typescript 项目时，可以使用接管模式代替 TS Plugin 。

## 什么是接管模式

过去，我们为 TS 和 Vue 探索了多种语言支持模式，有：

- Vetur Mode: 为 Vue + TS 语言支持提供不同的扩展插件。
- VueDX Mode: 由 TS Plugin 实现，Vue + TS 语言支持也由 VSCode 内置的 TypeScript 扩展插件提供。
- Volar Mode: 类似于 Vetur，但额外使用 TS Plugin 来弥补 TS 语言支持。

Volar Mode 存在什么问题？

- 对于每个 TS 项目，VS Code 内置的 TypeScript 扩展和 Volar 创建了 2 个语言服务实例，TS Plugin 代理程序也有额外的内置 TS 扩展的语言服务实例，最后我们为每个 TS 项目创建了 6 个语言服务实例。理论上，内存和CPU的使用率分别为200% ~ 300%。
- 由于 VSCode 不支持 TS 插件启用设置，您必须在每次更新 Volar 时重新启用TS插件。

接管模式是怎么解决 Volar 的问题的？

- 接管模式不使用 VSCode 内置的 TypeScript 扩展，只使用 Vue 语言服务器来提供 Vue + TS 语言支持。所以我们只有 2 个语言服务实例。
- 这种方法没有侵入，我们不再需要在每次更新扩展后为 TS Plugin 重新加载 VSCode。

## 如何启用/禁用接管模式

- Volar 版本需要大于 `0.27.17`
- 禁用 VSCode 内置的 TypeScript 插件：左侧 Extensions 菜单，在过滤图标中选择 Built-in, 在 FEATURES 中找到 `TypeScript and JavaScript Language Features` 右键选择 Disable (Workspace)。
- 如需禁用接管模式，找到上一步的内置扩展 `TypeScript and JavaScript Language Features` 右键选择 Enable (Workspace) 即可。

## 接管模式的限制

Vue 语言服务器试图提供所有内置的 TS 扩展功能，但总会有一些功能落后、缺失或 bug。但都在逐步解决和更新，应用开发者基本可以放心使用，相关详情可查看原文。
