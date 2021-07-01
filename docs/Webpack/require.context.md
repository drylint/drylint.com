# Webpack 之 `require.context()` 函数

## `require.context()` 函数

可以使用 `require.context()` 函数创建自己的上下文，Webpack 在构建时会解析代码中的 `require.context()` 。

用于加载一个目录中的所有文件或过滤部分文件。

语法：

```ts
// 方法执行后，返回一个 context 对象，同时 context 也是一个函数
const context = require.context(
  directory: string, // 必填，一个目录路径，用于创建上下文环境
  includeSubdirs?: boolean = true, // 可选，是否包含子目录，默认值为 true
  filter?: RegExp = /^\.\/.*$/, // 可选，过滤结果的正则表达式，默认值为 /^\.\/.*$/ 表示所有文件
  mode?: string = 'sync', // 可选, 加载模式，可选值为 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', 默认值为 'sync'
);
```

其中， `mode` 参数的可选值：

- `'lazy'` ，底层模块将被异步加载
- `'sync'` 直接打包到当前文件，同步加载并执行
- `'lazy'` 延迟加载会分离出单独的 chunk 文件
- `'lazy-once'` 延迟加载会分离出单独的 chunk 文件，加载过下次再加载直接读取内存里的代码。
- `'eager'` 不会分离出单独的 chunk 文件，但是会返回 promise，只有调用了 promise 才会执行代码，可以理解为先加载了代码，但是我们可以控制延迟执行这部分代码。

webpack 的 `import()` 文档中描述了所有可用模式及其行为的完整列表。

注意，传递给 `require.context()` 的参数必须是字面量形式的。

示例：

```ts
// 在 test 目录中加载模块，不包含子目录，只加载所有文件名以 .test.js 结尾的模块
require.context('./test', false, /\.test\.js$/);

// 在父目录中加载模块，包含子目录，只加载所有文件名以 .stories.js 结尾的模块
require.context('../', true, /\.stories\.js$/);
```

## `require.context()` 返回的 `context` 对象

`require.context()` 返回的 `context` 对象有三个属性，分别是 `resolve`, `keys`, `id` 。

- `context.keys` 是一个函数，返回匹配到的所有模块路径字符串组成的数组，如 `['./a.js', './b.js']` ，将数组的任一元素传给 `context()` 则可以得到这个文件的 ES Module
- `context.resolve` 是一个函数，返回解析后得到的模块 id 。传入 `context.keys()` 返回的某个文件的 key ，可以得到这个文件相对于项目启动目录的一个相对路径。
- `context.id` 是上下文模块的模块 id 。这可能对 `module.hot.accept` 有用。

相关文章：

- [深入理解webpack的require.context](https://juejin.cn/post/6844903895999709198) ，require.context 源码解析。
