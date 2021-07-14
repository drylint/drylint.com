# Webpack 之 `require.context()` 函数

## `require.context()` 函数

可以使用 `require.context()` 函数创建自己的上下文，Webpack 在构建时会解析代码中的 `require.context()` 。

用于加载一个目录中的所有文件或过滤部分文件。

语法：

```ts
// 方法执行后，返回一个 context 函数，同时它也是一个对象
const context = require.context(
  directory: string, // 必填，一个目录路径，用于创建上下文环境
  includeSubdirs?: boolean = true, // 可选，是否包含子目录，默认值为 true
  filter?: RegExp = /^\.\/.*$/, // 可选，过滤结果的正则表达式，默认值为 /^\.\/.*$/ 表示所有文件
  mode?: string = 'sync', // 可选, 加载模式，可选值为 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', 默认值为 'sync'
)
```

其中， `mode` 参数的可选值：

- `'sync'` 直接打包到当前文件，同步加载并执行
- `'lazy'` ，为每个导入的模块生成一个单独的可延迟加载（lazy-loadable）的 chunk ，模块将被异步加载。
- `'lazy-once'` 为所有的 `import()` 只生成一个满足所有的延迟加载模块，第一个 `import()` 语句加载这个模块后，之后的 `import()` 语句就只需在内存中读取了。
- `'eager'` 不会分离出单独的 chunk ，有的模块都被当前的 chunk 引入，并且没有额外的网络请求。但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，只有访问了这个 Promise 才会执行代码，相当于先加载代码，但暂不执行这部分代码。
- `'weak'`，尝试加载模块，如果该模块函数已经以其他方式加载，（即另一个 chunk 导入过此模块，或包含模块的脚本被加载）。仍会返回 Promise， 但是只有在客户端上已经有该 chunk 时才会成功解析。如果该模块不可用，则返回 rejected 状态的 Promise，且网络请求永远都不会执行。当需要的 chunks 始终在（嵌入在页面中的）初始请求中手动提供，而不是在应用程序导航在最初没有提供的模块导入的情况下触发，这对于通用渲染（SSR）是非常有用的。

webpack 的 `import()` 文档中描述了所有可用模式及其行为的完整列表。

注意，传递给 `require.context()` 的参数必须是字面量形式的。

示例：

```ts
// 在 test 目录中加载模块，不包含子目录，只加载所有文件名以 .test.js 结尾的模块
require.context('./test', false, /\.test\.js$/)

// 在父目录中加载模块，包含子目录，只加载所有文件名以 .stories.js 结尾的模块
require.context('../', true, /\.stories\.js$/)
```

## `require.context()` 返回的 `context` 函数

`require.context()` 返回的 `context` 是一个函数，同时也是一个对象，它有三个属性，分别是 `resolve`, `keys`, `id` 。

- `context.keys` 是一个函数，返回匹配到的所有模块路径字符串组成的数组，如 `['./a.js', './b.js']` ，将返回数组的任一元素传回给 `context()` 则可以得到这个文件的 ES Module ，访问这个 ES Module 的 `default` 就可以访问模块的默认导出。其他命名导出也按对应方法访问。
- `context.resolve` 也是一个函数，返回解析后得到的模块 id 。传入 `context.keys()` 返回的某个文件的 key ，可以得到这个文件相对于项目启动目录的一个相对路径。
- `context.id` 是上下文模块的模块 id 。这可能对 `module.hot.accept` 有用。

在浏览器查看一下 context 函数及属性是什么样的：

```ts
// 调用 require.context()
const context = require.context('./', true, /^\.\/Base[A-Z][^/]*$/u)

console.log(context)
/*

ƒ webpackContext(req) {
  var id = webpackContextResolve(req);
  return __webpack_require__(id);
}

*/


console.log(context.id)
/*

./src/components sync recursive ^\.\/Base[A-Z](?:(?!\/)[\s\S])*$

*/


console.log(context.keys)
/*

ƒ webpackContextKeys() {
  return Object.keys(map);
}
*/

console.log(context.resolve)
/*

ƒ webpackContextResolve(req) {
  if(!__webpack_require__.o(map, req)) {
    var e = new Error("Cannot find module '" + req + "'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
  }
  return map[req];
}

*/
```

相关文章：

- [深入理解webpack的require.context](https://juejin.cn/post/6844903895999709198) ，require.context 源码解析。
