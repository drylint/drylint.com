# webpack 配置项

[toc]

## 配置项

### `mode` 指定编译模式（开发或生产模式）

`type: string`

`default: 'production'`

可选值为 `production` 或者 `development`

```js
module.exports = {
  mode: 'development' // 或 mode: 'production'
}
```

或是从命令行（CLI）的参数中传递

```bash
webpack --mode=production
```

`development` 模式会将 `process.env.NODE_ENV` 的值设为 `'development'`。默认启用 `NamedChunksPlugin` 和 `NamedModulesPlugin` 插件。

`production`  模式会将 `process.env.NODE_ENV` 的值设为 `'production'`。默认启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`? `TerserPlugin` 插件。

### `context` 指定编译执行的路径上下文

type: string

基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader。

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

比如，当前配置的 `webpack.config.js` 不是放置在项目根目录，而是 根目录下的 config 目录下，此时 CWD 就是 config 目录，执行的路径就是基于 config 目录，我们通常需要基于根目录执行。

```js
  context: path.resolve(__dirname, "./")
  entry: {
    main: './src/main.js'
  },
```

以上代码报错 `ERROR in Entry module not found: Error: Can't resolve './src/main.js' in 'E:\codes\temp\webpack_demo01\config'` 。因为 context 指定的 `'./'` 表示config 目录，找不到entry指定的路径。

```js
  context: path.resolve(__dirname, "../")
  entry: {
    main: './src/main.js'
  },
```

以上配置，编译正确执行，context 指定的上下文为 config 目录的上级，然后在此上下文可以找到 entry 的路径。

### `entry` 指定程序的起点入口文件

`type: string | Array<string> | object: { <key>: string | Array<string> } | function`

`default: './src/index.js'`

值为路径字符串或路径字符串组成的数组，或由前两者作为值的对象形式，若是函数也必须返回符合前三者的值。

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

> 动态加载的模块不是入口起点。

如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。

#### 单页应用(SPA)：1个起点

```js
entry: {
    main: './src/main.js', // 主动将 chunk 命名为 main 并制定文件路径
}

// 等同于
entry: './src/main.js', // 不指定 chunk 名称则默认为 main

// 等同于
entry: ['./src/main.js'], // 不指定 chunk 名称则默认为 main

```

动态入口：

```js
entry: () => './src/main.js',

// 或

entry: () => new Promise((resolve) => resolve(['./src/main.js', './demo2.js']))
```

当结合 `output.library` 选项时：如果传入数组，则只导出最后一项。

若需要将多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。

分离 应用程序(app) 和 第三方库(vendor) 入口：

```js
entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
}
```

对象语法的写法是应用程序中定义入口的最可扩展的方式。因此推荐此写法。

常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中。

#### 多页应用(MPA)：多个起点

```js
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
```

- 告诉 webpack 需要 3 个独立分离的依赖图（如上面的示例）。每个 HTML 文档各自使用一个自己的入口起点。
- 在多页应用中，每当页面跳转时，服务器将获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。可使用 `CommonsChunkPlugin` 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。

### `output` 对象，编译打包输出到硬盘上的设置

`type: object`

指示 webpack 在项目中的哪个目录输出打包的所有文件，以及如何命名这些文件等，默认值为 `dist`。

#### `output.filename` 指定入口文件打包出的 bundle 的名称

`type: string | function`

打包完成后，bundle 将会写入到 `output.path` 选项指定的目录下。

对于单个入口起点，filename 会是一个静态名称：

```js
filename: "bundle.js"

// 使用入口的名称作为打包的名称
filename: [name].bundle.js

// 使用内部 chunk id
filename: "[id].bundle.js"

// 使用每次构建过程中，唯一的 hash 生成
filename: "[name].[hash].bundle.js"


// 使用基于每个 chunk 内容的 hash：
filename: "[chunkhash].bundle.js"

```

注意，此选项虽然被称为文件名，但还是可以使用像 `'js/[name]/bundle.js'` 这样的文件夹结构。

注意，此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 `output.chunkFilename` 选项来控制输出。通过 loader 创建的文件也不受影响。在这种情况下，你必须尝试 loader 特定的可用选项。

文件名称中，可以使用以下替换模板字符串（将通过 webpack 内部的 `TemplatedPathPlugin` 识别）：

| 模板 | 描述 |
| -- | -- |
[hash] | 模块标识符(module identifier)的 hash，和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
[chunkhash] | chunk 内容的 hash，和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
[contenthash] | 根据文件内容来生成 hash值，文件中内容不变则 Contenthash 就不变。
[name] | 模块名称
[id] | 模块标识符(module identifier)
[query] | 模块的 query，例如，文件名 ? 后面的字符串
[function] | 返回 filename 的函数
`[hash]` 和 `[chunkhash]` 的长度可以使用 `[hash:8]`（1~20有效，默认为 20）来指定。或者，通过指定 `output.hashDigestLength` 在全局配置长度。

#### `output.chunkFilename` 指定非入口文件打包出的 chunk 文件的名称

`type: string | function`

取值同 `output.filename`。

注意，这些文件名需要在 runtime 根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 [name] 和 [chunkhash])。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

默认使用 `'[id].js'` 或从 `output.filename` 中推断出的值（[name] 会被预先替换为 [id] 或 [id].）。

#### `output.hashDigestLength` 全局指定名称中替换模板字符串 `[hash]` 的长度

默认为 20。1 到 20 有效。无效值则取默认值。

#### `output.path` 打包存放路径，绝对路径

`type: string`

指定的打包目录必须为一个绝对路径。否则会报错。

```js
path: path.resolve(__dirname, 'dist'), // 此配置文件位于根目录时
path: path.resolve(__dirname, '../dist'), // 此配置文件位于 config 目录时，打包到根目录中的 dist 目录
```

注意，[hash] 在参数中被替换为编译过程(compilation)的 hash。

#### `output.publicPath` 指定代码中引入文件的基础路径

`type: string | function`

对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，`output.publicPath` 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 `404` 错误。

指定 js/html/css 等文件之中有引入资源时，以什么路径作为基础路径，因此，在多数情况下，此选项的值都会以/结束。

默认值是一个空字符串 `''`。

```js
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

在编译时无法知道输出文件的 `publicPath` 的情况下，可以留空，然后在入口文件（如 `main.js`）处使用自由变量(free variable) `__webpack_public_path__`，以便在运行时(runtime)进行动态设置。

```js
// main.js

 __webpack_public_path__ = myRuntimePublicPath

// 然后再是入口文件的其他代码...
 ```

#### -------------------- 以下配置项用于需要导出模块时使用，例如制作为第三方库时

#### `output.auxiliaryComment`

#### `output.library`

#### `output.libraryExport`

#### `output.libraryTarget`

#### `output.umdNamedDefine`

当 `libraryTarget: 'umd'` 时，设 `umdNamedDefine: true`会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 `define`。

#### -------------------- 以下配置项无需设置，略

#### `output.hashFunction` 散列算法

#### `output.hashSalt` 一个可选的加盐值，通过 Node.JS `hash.update` 来更新哈希

#### `output.hotUpdateChunkFilename` 自定义热更新 chunk 的文件名

#### `output.hotUpdateFunction` 只在 target 是 web 时使用，用于加载热更新(hot update)的 JSONP 函数

#### `output.hotUpdateMainFilename` 自定义热更新的主文件名(main filename)

#### `output.jsonpFunction` 只在 target 是 web 时使用，用于按需加载(load on-demand) chunk 的 JSONP 函数

#### `output.sourcePrefix` 修改输出 bundle 中每行的前缀。默认情况下使用空字符串

#### `output.strictModuleExceptionHandling` 是否抛出所有 require 时的异常，出于性能原因，默认为 `false`

#### `output.devtoolLineToLine` 已废弃，禁止使用

#### `output.hashDigest` 生成 hash 的编码方式，默认为 `'hex'`。支持 Node.js `hash.digest` 的所有编码

#### `output.pathinfo`

`type: boolean`

告诉 webpack 是否要在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 false，并且不应该用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。

```js
pathinfo: true
```

注意，这些注释也会被添加至经过 tree shaking 后生成的 bundle 中。

#### `output.sourceMapFilename` 配置 `source map` 的命名方式。默认使用 `'[file].map'`

`type: string`

只在顶层配置项 `devtool` 启用了 SourceMap 时才有效，会向硬盘写入一个指定名称的源码映射文件。

#### `output.chunkLoadTimeout` 数字值，chunk 请求到期之前的毫秒数，默认为 120 000

#### `output.crossOriginLoading`

`type: boolean string`

只用于 target 是 web，使用了通过 script 标签的 JSONP 来按需加载 chunk。

启用 cross-origin 属性 加载 chunk。以下是可接收的值……

- crossOriginLoading: false - 禁用跨域加载（默认）

- crossOriginLoading: "anonymous" - 不带凭据(credential)启用跨域加载

- crossOriginLoading: "use-credentials" - 带凭据(credential)启用跨域加载 with credentials

#### `output.jsonpScriptType`

`type: string'`

允许自定义 script 的类型，webpack 会将 script 标签注入到 DOM 中以下载异步 chunk。可以使用以下选项：

- "text/javascript"（默认）
- "module"：与 ES6 就绪代码一起使用。

#### `output.devtoolFallbackModuleFilenameTemplate`

`type: string | function(info)`
当上面的模板字符串或函数产生重复时使用的备用内容。

#### `output.devtoolModuleFilenameTemplate` 指定每个 source map 的 sources 数组中使用的名称

#### `output.devtoolNamespace`

`type: string`

此选项确定 `output.devtoolModuleFilenameTemplate` 使用的模块名称空间。未指定时的默认值为：`output.library`。在加载多个通过 webpack 构建的 library 时，用于防止 sourcemap 中源文件路径冲突。

例如，如果你有两个 library，分别使用命名空间 library1 和 library2，并且都有一个文件 `./src/index.js`（可能具有不同内容），它们会将这些文件暴露为 `webpack://library1/./src/index.js` 和 `webpack://library2/./src/index.js`。

### 5. module 对象，让 Webpack 可以处理各种文件类型及语法

webpack 自身只理解 `.js`和  `.json`，并且是 ES2015 以下的版本，loader 让 webpack 能够去处理那些非 JavaScript 文件和 ES2015+的语法。

loader 可以对 `import` 、`require` 语句碰到的所有类型的文件在打包时进行预处理，让 webpack 能够将其处理并打包到项目中。

#### `module.noParse` 指定不解析的文件

`type: RegExp | Array<RegExp> | function`

指定 webpack 不解析那些与给定正则表达式相匹配的文件。

忽略的文件中不应该含有 `import`, `require`, `define` 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

#### `module.rules` 由多个 rule （规则对象）组成的数组，每个 rule 规定如何处理项目中的不同类型的模块

`type: array`

每个规则对象能够对模块(module)应用 loader，或者修改解析器(parser)。

##### `Rule` 对象

每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。

###### Rule 条件：要匹配的资源的条件

要匹配的资源分为两种：

1. resource：请求的文件所在的绝对路径。它已经根据 resolve 规则解析。

2. issuer: 请求发生的模块文件的绝对路径。是导入时的位置。

比如：在 `index.js` 中引入 项目下的 `src/utils/common.js`。 在顶层配置项 `resolve` 项中，把 src 目录指定成 `@`

```js
// index.js

import Utils from '@/utils/common.js'
```

上例中，from 后的路径就是 resource，而 `index.js` 文件所在的路径就是 `issuer`。

属性 `test, include, exclude, resource` 对 resource 匹配，属性 `issuer` 对 issuer 匹配。

###### Rule 结果

规则结果只在规则条件匹配时使用。

对匹配结果有两种输入值：

1. 应用的 loader：应用在 resource 上的 loader 数组。
2. Parser 选项：用于为模块创建解析器的选项对象。

属性 `loader, options, use。query, loaders, enforce` 会影响 loader 的执行，属性 `parser` 会影响 parser 选项。

###### 嵌套的 Rule

可以使用属性 rules 和 oneOf 指定嵌套规则。这些规则用于在规则条件(rule condition)匹配时进行取值。

###### -------------------- Rule 对象中匹配 resource/issuer 资源的配置项

- ###### `Rule.resource` 对象，指定被请求的 resource 资源的匹配规则

    包括以下属性:

  - `Rule.resource.test` 要匹配的文件名
  - `Rule.resource.exclude` 排除的目录
  - `Rule.resource.include` 包括的目录
  - `Rule.resource.and` 同时匹配数组中的多项才满足
  - `Rule.resource.or` 匹配数组中的任意一项即可
  - `Rule.resource.not` 不是数组中的任意一项才满足

    但通常使用简写属性而不是写在 `Rule.resource` 对象中。

    条件值可以是以下之一：

  - 字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
  - 正则表达式：test 输入值。
  - 函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
  - 条件数组：至少一个匹配条件。
  - 对象：匹配所有属性。每个属性都有一个定义行为。

    值可以是字符串、正则、函数，条件数组、对象

    条件会匹配 `resource` 资源。既可以提供 `Rule.resource` 选项，也可以使用快捷选项 `Rule.test`，`Rule.exclude` 和 `Rule.include`。

- ###### `Rule.issuer` 指定发生请求的 issuer 资源的匹配规则，用来将 loader 应用到一个特定模块或一组模块的依赖中

    比如下例中，`a.js` 的发布者(issuer)是 `index.js` 文件的路径。

    ```js
    // index.js

    import A from './a.js'
    ```

    指定 `Rule.issuer` 属性值为此路径，意味着在所有引入 `'./a.js'` 的 issuer 中，loader 只应用到此 issuer。

- ###### `Rule.exclude` `Rule.resource.exclude` 的简写，此项不能与 `Rule.resource` 共存

- ###### `Rule.include` `Rule.resource.include` 的简写，此项不能与 `Rule.resource` 共存

- ###### `Rule.test` `Rule.resource.test` 的简写，此项不能与 `Rule.resource` 共存

###### -------------------- Rule 的匹配结果处理

- ###### `Rule.use` 由多个 useEntry 对象组成的数组，每个 useEntry 对象指定 loader 的使用方式

    UseEntry 对象：

  - `UseEntry.loader`：必填，字符串值，表示使用的 loader 的名称，比如 `'css-loader'`, `'babel-loader'` 等。
  - `UseEntry.options`：可选，loader 配置选项。
  - `UseEntry.query`：已废弃，它是 options 属性的别名。使用 options 属性替代。

    loader 的使用方式：

  - 在 webpack 配置文件文件中指定 loader，可添加配置项。**应尽量使用此方式**。

    ```js
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              }
            ]
          }
        ]
      }
    ```

  - 在每个 `import` 语句中显式指定内联 loader 。不推荐。

    ```js
    import Styles from 'style-loader!css-loader?modules!./styles.css';
    ```

  - 在命令行中指定使用的 loader 。不推荐。

    ```bash
    webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
    ```

    oader 特性：

  - loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
  - loader 可以是同步的，也可以是异步的。
  - loader 运行在 Node.js 中，并且能够执行任何可能的操作。
  - loader 接收查询参数。用于对 loader 传递配置。
  - loader 也能够使用 options 对象进行配置。
  - 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
  - 插件(plugin)可以为 loader 带来更多特性。
  - loader 能够产生额外的任意文件。

    loader 加载：

  - loader 遵循标准的模块解析。多数情况下，loader 将从模块路径 (node_modules) 中加载。

  - loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。通常使用 npm 进行管理，但是也可以将自定义 - loader 作为应用程序中的文件。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）。

    [查看如何编写loader](https://www.webpackjs.com/contribute/writing-a-loader/)

- ###### `Rule.options / Rule.query(已废弃)` 是 `Rule.use: [ { options: {} } ]` 里 `options` 的简写方式

    `Rule.query` 已废弃，因为需要支持 `Rule.options` 和 `Rule.use: [ { options: {} } ]`(也就是 `UseEntry.options`)

- ###### `Rule.loader` 是 `Rule.use: [ { loader: '' } ]` 里 `loader` 的简写，也就是 `UseEntry.loader`

- ###### `Rule.loaders` Rule.use 的别名。已废弃

- ###### `Rule.enforce` 指定当前 Rule 对象应用的 loader 为 前置/后置 loader。不指定则为普通 loader

    `type: string`

    可选值为 `'pre' | 'post'`，指定 loader 前置或后置。没有值表示是普通 normal loader。

    还有一个额外的种类是 `行内 inline loader`，也就是 loader 直接使用在 import/require 时。

    loader 执行的优先级 pre(前置) > normal(普通) > inline(行内) > post(后置)

    行内 inline loader 使用时的符号含义：
  - `-！` 禁用 pre loader 和 normal loader
  - `!` 禁用 normal loader
  - `!!` 禁用 pre & normal & post loader ，只用 inline loader。

    不应该使用行内 loader 和 ! 前缀，因为它们是非标准的。它们可在由 loader 生成的代码中使用。

- ###### `Rule.parser` 对象，配置解析的选项

    解析选项对象。所有应用的解析选项都将合并。

    以下为默认值：

    ```js
    parser: {
      amd: false, // 禁用 AMD
      commonjs: false, // 禁用 CommonJS
      system: false, // 禁用 SystemJS
      harmony: false, // 禁用 ES2015 Harmony import/export
      requireInclude: false, // 禁用 require.include
      requireEnsure: false, // 禁用 require.ensure
      requireContext: false, // 禁用 require.context
      browserify: false, // 禁用特殊处理的 browserify bundle
      requireJs: false, // 禁用 requirejs.*
      node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
      node: {...} // 在模块级别(module level)上重新配置 node 层(layer)
    }
    ```

    设为 `false` ，将禁用解析器。设置为 `true` ，或不修改将其保留为 undefined，可以启用解析器。

    然而，一些解析器(parser)插件可能不光只接收一个布尔值。例如，内部的 `NodeStuffPlugin` 插件，可以接收一个对象，而不是 `true`，来为特定的规则添加额外的选项。

- ###### `Rule.oneOf` 由 rule 对象组成的规则数组，当规则匹配时，只使用第一个匹配规则

    规则数组，当规则匹配时，只使用第一个匹配规则。

    ```js
    {
      test: /.css$/,
      oneOf: [
        {
          resourceQuery: /inline/, // foo.css?inline
          use: 'url-loader'
        },
        {
          resourceQuery: /external/, // foo.css?external
          use: 'file-loader'
        }
      ]
    }
    ```

- ###### `Rule.rules` 由 rule 对象组成的规则数组，当规则匹配时使用

- ###### `Rule.resourceQuery` 对引入文件的请求路径之中的查询字符串部分(`?xxx`)进行匹配

    比如在引入文件中，在请求路径后加了查询字符串 `?inline`

    ```js
    import foo from './foo.css?inline'
    ```

    resourceQuery 属性则可以去对这一部分进行匹配验证：

    ```js
    {
      test: /.css$/,
      resourceQuery: /inline/,
      use: 'url-loader'
    }

    ```

#### `模块上下文` 已废弃

### 6. `resolve` 对象，配置模块如何解析

例如，当在 ES2015 中调用 import "lodash"，resolve 选项能够对 webpack 查找 "lodash" 的方式去做修改。

#### `resolve.alias` 对象，创建 import 或 require 语句的别名

`type: object`

在 webpack 中配置别名，配置别名后，匹配的引入路径名称会替换为别名所代表的路径。

```js
resolve: {
    alias: {
        utils: path.resolve(__dirname, 'src/utils/'),
        minxins$: path.resolve(__dirname, 'src/utils/mixins'), // key 后加 $ 表示精确匹配，完全一致才会被匹配。
    }
}
```

在项目的使用中：

```js
// 没有配置别名的写法：
import utils from '../../utils/index.js'

// 配置别名后的写法：
import utils from 'utils/index.js' // utils 将会采用 alias 中对应的值来替换

// 加入精确匹配的匹配结果
import mixins from 'mixins' // 精准匹配，采用 alias 对应的值来替换
import mixins from 'mixins/others.js' // 无法匹配 alias 别名，采用普通解析

```

一些情况：

别名： | import "xyz" | import "xyz/file.js"
-- | -- | --
{} | /abc/node_modules/xyz/index.js | /abc/node_modules/xyz/file.js
{ xyz: "/abs/path/to/file.js" } | /abs/path/to/file.js | error
{ xyz$: "/abs/path/to/file.js" } | /abs/path/to/file.js | /abc/node_modules/xyz/file.js
{ xyz: "./dir/file.js" } | /abc/dir/file.js | error
{ xyz$: "./dir/file.js" } | /abc/dir/file.js | /abc/node_modules/xyz/file.js
{ xyz: "/some/dir" } | /some/dir/index.js | /some/dir/file.js
{ xyz$: "/some/dir" } | /some/dir/index.js | /abc/node_modules/xyz/file.js
{ xyz: "./dir" } | /abc/dir/index.js | /abc/dir/file.js
{ xyz: "modu" } | /abc/node_modules/modu/index.js | /abc/node_modules/modu/file.js
{ xyz$: "modu" } | /abc/node_modules/modu/index.js | /abc/node_modules/xyz/file.js
{ xyz: "modu/some/file.js" } | /abc/node_modules/modu/some/file.js | error
{ xyz: "modu/dir" } | /abc/node_modules/modu/dir/index.js | /abc/node_modules/dir/file.js
{ xyz: "xyz/dir" } | /abc/node_modules/xyz/dir/index.js | /abc/node_modules/xyz/dir/file.js
{ xyz$: "xyz/dir" } | /abc/node_modules/xyz/dir/index.js | /abc/node_modules/xyz/file.js

#### `resolve.aliasFields` 导入模块的 `package.json` 指定的别名

`type: string`

指定一个字段，例如 `'browser'`，根据此规范进行解析。默认：

```js
aliasFields: ["browser"]
```

#### `resolve.cacheWithContext` 是否启用上下文缓存

`type: boolean`

如果启用了不安全缓存，请在缓存键(cache key)中引入 `request.context`。这个选项被 `enhanced-resolve` 模块考虑在内。从 webpack 3.1.0 开始，在配置了 `resolve` 或 `resolveLoader` 插件时，解析缓存(resolve caching)中的上下文(context)会被忽略。这解决了性能衰退的问题。

#### `resolve.descriptionFiles` 指定用于描述的 JSON 文件。默认值为 `'package.json'`

`type: array`

指定用于描述的 JSON 文件。默认值为 `'package.json'`：

```js
descriptionFiles: ["package.json"]
```

#### `resolve.enforceExtension` 是否强制在引用文件时必须显示书写文件扩展名，默认为 `false` 不强制

`type: boolean`

默认地，引入 `index.js` 可不写扩展名 `require(./index)`。但此项设为 `true` 后必须写扩展名 `require('./index.js')`。

```js
enforceExtension: false
```

#### `resolve.enforceModuleExtension` 是否强制对模块必须显示书写扩展名（例如 loader）。默认为 `false`

#### `resolve.extensions` 数组，指定自动解析的扩展名列表

`type: array`

默认值为：`[".js", ".json"]`

```js
extensions: ['.js', '.json', '.vue', '.scss', '.css']
```

配置此项后，在引入这些扩展名的文件时，可以不用书写扩展名，会自动根据数组顺序查找有没有对于文件。

使用此选项，会覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。

对于使用其扩展导入的模块，要想正确的解析，一个包含“*”的字符串必须包含在数组中。

#### `resolve.mainFields` 数组，指定打包时从模块的 `package.json` 中使用哪个字段导入模块

`type: array`

根据 webpack 顶层配置属性 target 的值不同，默认值也会有所不同。

- 当 target 属性设置为 `webworker`, `web` 或者 `没有指定`，此属性的默认值为：

    ```js
    mainFields: ["browser", "module", "main"]
    ```

- 对于其他任意的 target（包括 node），默认值为：

    ```js
    mainFields: ["module", "main"]
    ```

例如，D3 的 package.json 含有这些字段：

```js
{
  ...
  main: 'build/d3.Node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```

这意味着当我们没有设置 `target`时，执行 `import * as D3 from "d3"`，实际从 `browser` 属性解析文件。在这里 `browser` 属性是最优先选择的，因为它是 `mainFields` 的第一项。

同时，由 webpack 打包为 Node.js 应用程序时默认会从 module 字段中解析文件。

#### `resolve.mainFiles` 数组，解析目录时要使用的文件名。默认：`['index']`

`type: array`

引入文件时只写到目录时，自动引入文件的文件名。?

默认情况下 `import util from './utils'` 如果没有 `utils.js` 则会查找 `utils/index.js`

#### `resolve.modules` 数组，指定模块的搜索目录，默认为 `['node_modules']`

`type: array`

告诉 webpack 解析模块时应该搜索的目录。

```js
modules: ['node_modules']
```

绝对路径和相对路径都能使用，但是要知道它们之间有一点差异：

指定相对路径将类似于 Node 查找 'node_modules' 的方式，找不到则逐级往上层目录查找，直到根目录也找不到为止。

使用绝对路径，将只在给定目录中搜索。

如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：

```js
modules: [path.resolve(__dirname, "src"), "node_modules"]
```

#### `resolve.unsafeCache` 指定部分或全部模块是否启用不安全缓存，默认为 `true`

`type: regex | array | boolean`

启用，会主动缓存模块，但并不安全。传递 `true` 将缓存一切。默认：

```js
unsafeCache: true
```

正则表达式，或正则表达式数组，可以用于匹配文件路径或只缓存某些模块。例如，只缓存 utilities 模块：

```js
unsafeCache: /src\/utilities/
```

修改缓存路径可能在极少数情况下导致失败。

#### `resolve.plugins`数组 指定要使用的额外的解析插件列表

`type: array`

指定要使用的额外的解析插件列表。它允许插件，如 `DirectoryNamedWebpackPlugin`。

```js
plugins: [
  new DirectoryNamedWebpackPlugin()
]
```

#### `resolve.symlinks` 是否将符号链接解析到它们的符号链接位置，默认为 `true`

`type: boolean`

是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)，默认为 `true` 。

启用时，符号链接(symlink)的资源，将解析为其_真实_路径，而不是其符号链接(symlink)位置。注意，当使用符号链接 package 包工具时（如 npm link），可能会导致模块解析失败。

#### `resolve.cachePredicate` 函数，返回布尔值来决定请求是否应该被缓存

`type: function`

决定请求是否应该被缓存的函数。函数传入一个带有 path 和 request 属性的对象。默认：

```js
cachePredicate: function ({ path, request }) { return true }
```

#### `resolveLoader` 对象 同 `resolve` 对象，但仅作用于 loader 包

`type: object`

这组选项与上面的 `resolve` 对象的属性集合相同，但仅用于解析 webpack 的 loader 包。默认：

```js
{
  modules: [ 'node_modules' ],
  extensions: [ '.js', '.json' ],
  mainFields: [ 'loader', 'main' ]
}
```

注意，这里你可以使用别名，并且其他特性类似于 resolve 对象。例如，`{ txt: 'raw-loader' }` 会使用 `raw-loader` 去 shim(填充) `'txt!templates/demo.txt'`。

#### resolveLoader.moduleExtensions 数组，指定自动添加的 loader 后缀，比如 `['-loader']`

`type: array`

使用 loader 时，大部分都有 `'-loader'` 后缀，比如 `'css-loader'`，`'url-loader'`。配置一个公共的后缀 `['-loader']` 后则可以不书写 `'-loader'` 后缀，自动添加。但不推荐使用，应该尽量使用全名以便尽可能地清晰。

```js
moduleExtensions: [ '-loader' ]
```

### 7. Optimization 配置优化项

#### `optimization.minimize` 是否启用优化，生产模式默认启用

`type: boolean`

设置 webpack 是否使用 TerserPlugin 或 `optimization.minimizer` 中指定的插件来进行优化，默认在生产模式下启用。

```js
module.exports = {
  //...
  optimization: {
    minimize: true, // 通常都使用默认值在生产环境下启用优化。
  }
};
```

#### `optimization.minimizer` 数组，指定优化要使用的插件实例

`type: Array<TerserPlugin> | Array<function (compiler)>`

可配置一个或多个 `TerserPlugin` 插件实例或其他插件的实例来覆盖默认的优化配置。

- 数组中传入实例：

    ```js
    module.exports = {
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // 如果要在生产环境中使用 source-map 必须设为 true
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            }
          }),
        ],
      }
    }
    ```

- 数组中传入函数

    ```js
    module.exports = {
      optimization: {
        minimizer: [
          (compiler) => {
            const TerserPlugin = require('terser-webpack-plugin');
            new TerserPlugin({ /* your config */ }).apply(compiler);
          }
        ],
      }
    }
    ```

#### `optimization.splitChunks` 对象，配置公用代码分割

`type: object`

#### `optimization.runtimeChunk` 默认值为 `false` ：每个条目块均嵌入运行时

`type: object string boolean`

设为 `true` or `'multiple'` 增加一个额外的代码块到每个运行时的入口文件，其实这是以下设置的别名：

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
};
```

不同的是，设为 `'single'` 则会创建一个运行时的文件共享给所有模块，其实这是以下设置的别名：

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
};
```

设为对象时，只能提供 `name` 属性，代表运行时的代码块的名称或名称工厂。

请注意，导入的模块会分别地被初始化给每一个运行时的代码块，所以如果项目中有页面拥有多个入口文件时，注意，可能需要将其设置为 `'single'` ，或使用另一种只允许拥有一个运行时的实例的配置。

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    }
  }
}
```

#### `optimization.noEmitOnErrors` 是否在编译时跳过错误抛出，webpack 进程将不会退出并显示错误代码

`type: boolean`

启用后，将不会有错误信息资源被抛出，对所有资源来说，统计信息中的 `emitted` 标志将被置为 `false` 。

#### `optimization.namedModules` 是否使用可读的模块标识符进行更好的调试

`type: boolean`

如果不设置，默认在开发环境下会启用，在生产环境下会禁用。通常不设置。

#### `optimization.namedChunks` 是否使用可读的代码块标识符进行更好的调试

`type: boolean`

如果不设置，默认在开发环境下会启用，在生产环境下会禁用。通常不设置。

#### `optimization.moduleIds` 默认为 `false`，配置生成模块 id 时使用哪种算法

`type: boolean | string（'natural' | 'named' | 'size' | 'deterministic'）`

设为 `false` 表示指定 webpack 不使用任何内置算法，因为可以通过插件提供自定义算法。

- `natural` 按照使用顺序生成的数字ID。
- `named` 可读的具名 ID，以进行更好的调试。
- `deterministic` 将模块名称被散列为较小的数值。
- `size` 数字ID，专注于最小的初始下载大小。
- `'hashed'` 已废弃，请使用 `deterministic`
- `'total-size'` 已在 webpack5 中被移除。

`'deterministic'` 对于长期缓存很有用，但与 `'hashed'` 相比仍会产生一些较小的包，数值的长度最多填充 id 空间的80%。值为 `'deterministic'` 时的默认最小长度为3位数字，如果要覆盖此设置，将 `optimization.moduleIds` 设置为 `false` 然后使用 `webpack.ids.DeterministicModuleIdsPlugin` 插件来配置。

```js
module.exports = {
  //...
  optimization: {
    moduleIds: false
  },
  plugins: [
    new webpack.ids.DeterministicModuleIdsPlugin({
      maxLength: 5
    })
  ]
};
```

#### `optimization.chunkIds` 配置生成代码块 id 时使用哪种算法

`type: boolean | string（'natural' | 'named' | 'size' | 'total-size'）`

设为 `false` 表示指定 webpack 不使用任何内置算法，因为可以通过插件提供自定义算法。

如果 `optimization.occurrenceOrder` 启用，会被默认设置为 `'total-size'`。

如果 `optimization.namedChunks` 启用，会被默认设置为 `'named'`。

如果以上都没有，则会被默认设置为 `'natural'`。

- `'total-size'` 数字id，专注于最小的总下载大小。
- 其他可选项意义同 `optimization.moduleIds`

#### `optimization.nodeEnv` 设置 process.env.NODE_ENV 的值

`type: boolean | string`

将 `process.env.NODE_ENV` 的值设置为指定字符串，将使用 `webpack.DefinePlugin` 来完成，除非设置为 `false`。

默认情况下，默认值为顶层配置项 `mode` 的值，如果 `mode` 没有设置，则默认为 `'production'`。

#### `optimization.mangleWasmImports` 是否通过将 `import`缩短为较短的字符串来减小 WASM 的大小

`type: boolean`

启用后，它将破坏模块以及导出的名称。

#### `optimization.removeAvailableModules` 是否检测并删除代码块中的 module，当它们已经存在于父级中时

`type: boolean`

默认在生产环境下为 `true`。

其实，它会降低 webpack 的性能，并且在下一个主要版本中默认情况下会在生产模式下设为 `false` 禁用它。如果要提高构建性能，请在生产模式下禁用它。

#### `optimization.removeEmptyChunks` 是否启用检测并删除空的代码块，默认为 `true`

#### `optimization.mergeDuplicateChunks` 是否合并包含相同 modules 的代码块，默认为 `true`

#### `optimization.flagIncludedChunks` 是否确定并标记出作为其他代码块的子集的代码块，生产模式默认为 `true`

开启后，可以使 webpack 在已经加载完毕较大的代码块时，不必再去加载子集代码块。

#### `optimization.occurrenceOrder` 是否启用找出 modules 出现的顺序已达到最小的初始化捆绑，生产模式默认为 `true`

#### `optimization.providedExports` 是否找出 modules 中提供哪些导出，以生成更有效的代码给 `export * from ...`，默认 `true`

#### `optimization.usedExports` 是否确定每个module 中被使用到了的 export，生产环境下为 `true`

结果是基于 `optimization.providedExports` 的结果的。 `optimization.usedExports` 收集的信息用于其他的优化或代码的生成。

比如： 模块中没有被使用过的 exports 将不会被编译生成 exports，当所有使用到的地方都能兼容时，那些导出的名字将会被摧毁为单个字符。`minimizers` 中的死代码消除功能就是得益于此才能移除那些没有被用到的 exports。

#### `optimization.concatenateModules` 是否查找 module 视图中可以被安全地串联为单个module的片段

结果取决于 `optimization.providedExports` 和 `optimization.usedExports`，在生产模式下默认为 `true`

#### `optimization.sideEffects` 是否去识别 package.json 或 rules 中的 sideEffects 标志，生产模式默认 `true`

如果启用，则可以跳过那些 exports 未被使用，被标记为 “不包含副作用” 的 modules。

此标记应该出现在 npm 模块的 package.json 之中。不过也不意味着需要在自己的项目的引入了大模块的 `package.json` 中将其设置为 `false`

```js
// package.json

{
  "name": "awesome npm module",
  "version": "1.0.0",
  "sideEffects": false
}

```

取决于 `optimization.providedExports` 去启用，这种依赖关系会花费大量构建时间，但由于减少了代码生成，因此消除模块会对性能产生积极影响。这种优化的效果取决于您的代码库，请尝试使用它以获得可能的性能。

#### `optimization.portableRecords` 是否生成带有相对路径的记录，以便能够移动上下文文件夹。默认为 `false`

当 `recordsPath, recordsInputPath, recordsOutputPath` 至少配置一项后，`optimization.portableRecords` 会自动设为 `true`。

#### `optimization.mangleExports` 是否启用输出的重整，生产模式默认为 `true`

#### `optimization.innerGraph` 是否对未使用的 exports 进行内部图形分析。生产模式默认 `true`

### 8. `plugins` 数组，配置要使用的插件列表

插件是 webpack 的支柱功能。webpack 自身也是构建于插件系统之上！插件目的在于解决 loader 无法实现的其他功能。

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

plugins 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。请查看这个页面获取插件列表和对应文档，但请注意这只是其中一部分，社区中还有许多插件。

插件使用方式：

1. 引入插件 `require('pluginName')`
2. 使用 `new` 创建一个插件实例并传入一个对象作为配置插件的参数
3. 将创建的实例放入 `plugins` 数组中即可。

```js

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
```

常见 plugins：

- CommonsChunkPlugin 将 chunks 相同的模块代码提取成公共js
- clean-webpack-plugin 清理构建目录
- ExtractTextWebpackPlugin 将 css 从 bundle 文件中提取成一个独立的css文件
- CopyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin 创建 html 文件去承载输出的 bundle
- UglifyjsWebpackPlugin 压缩 js
- ZipWebpackPlugin 将打包出的资源生成一个 zip 包

### 9. `devServer` 对象

详见 `webpack-dev-server` 一文。

### 10. `devtool` 设置是否生成，以及如何生成 source map（源码映射）

`type: string | boolean`

生成 source map 后，运行打包文件出错时，就能定位到源码的位置。否则就是编译打包后的代码。

使用 `SourceMapDevToolPlugin` 可进行更细粒度的配置。但和 `devtool` 不能同时使用。查看 `source-map-loader` 来处理已有的 source map。

选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

自定义生成的 source map 的文件名是通过顶层配置项 ouput 的 `output.sourceMapFilename` 属性设置。

生产环境中，省略 devtool 选项，将不会生成 source map。这是一个不错的选择。

开发环境中，视情况设置。

### 11. `target`  指定一种运行环境作为构建目标，默认为 `'web'`

`type: string | function(compiler)`

可以支持以下字符串值：

选项  | 描述
-- | --
async-node | 编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）
atom | electron-main 的别名
electron | electron-main 的别名
electron-main | 编译为 Electron 主进程。
electron-renderer | 编译为 Electron 渲染进程，使用 JsonpTemplatePlugin, FunctionModulePlugin 来为浏览器环境提供目标，使用 NodeTargetPlugin 和 ExternalsPlugin 为 CommonJS 和 Electron 内置模块提供目标。
node | 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk）
node-webkit | 编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 nw.gui 导入（实验性质）
web | 编译为类浏览器环境里可用（默认）
webworker | 编译成一个 WebWorker

如果传入一个函数，此函数调用时会传入一个 compiler 作为参数。如果以上列表中没有一个预定义的目标(target)符合你的要求，请将其设置为一个函数。

例如，如果你不需要使用以上任何插件：

```js
const options = {
  target: () => undefined
};
```

或者可以使用你想要指定的插件

```js
const webpack = require("webpack");

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin("web")
    );
  }
};

```

### 12. `watch` 是否启用监听模式，默认为 `false`

`type: boolean`

设置为 `true` 后，在初次构建完成之后，webpack 将继续监听任何已解析文件的更改。监听到更改则重新进行编译，编译会更新，但浏览器不会自动更新，依然需要手动刷新。

### 13. `watchOptions` 对象，配置 Watch 模式的选项

`type: object`

只有 设置了 `watch: true` 后，`watchOptions` 才会生效。

#### `watchOptions.aggregateTimeout` 重新构建前的延迟毫秒数，默认为 `300`

`type: number`

当第一个文件更改，会在重新构建前增加延迟，等待多少毫秒再去执行编译。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。

#### `watchOptions.ignored` 排除一些巨大的文件夹，不监听指定的目录，比如 `'node_modules'`

`type: string`

监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹，例如 `node_modules`：

```js
ignored: /node_modules/
```

也可以使用 anymatch 模式：

```js
ignored: "files/**/*.js"
```

#### `watchOptions.poll` 设置开启轮询，或设置轮询时间，也就是每隔多久检查一次变更

`type: number | boolean`

通过传递 `true` 开启 polling，或者指定毫秒为单位进行轮询。

```js
poll: 1000 // 每 1000 毫秒检查一次变动
```

如果监听没生效，试试这个选项。

#### `info-verbosity` 控制生命周期消息的详细程度。默认等级为 `'info'`

`type: string`

可选值 `'none' 'info' 'verbose'`。

控制生命周期消息的详细程度，例如 Started watching files(开始监听文件)... 日志。将 `info-verbosity` 设置为 `'verbose'`，还会额外在增量构建的开始和结束时，向控制台发送消息。

### 14. `externals` 对象，指定某些 `import` 的包不被打包，而是在运行时再从外部获取这些依赖

`type: string | array | object | function | regex` （此处指属性值的类型）

项目中会引入大量第三方的库，比如 `vue`，`vue-router`，`vuex` 等等。但如果将他们打包到项目中，打包体积会太大。

在生产环境中，这些包可以通过 CDN 网络服务器在线获取，所以不需要将他们打包到自己项目中。

例如，在项目中用到 `vue, vue-router, vuex, axios, element-ui, normalize.css`。

在项目中会有以下引入：

```js
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
```

配置不打包这些库，而是运行时再从外部获取：

- 在 HTML 中通过 CDN 引入：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css">
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js"></script>
```

- 在 webpack 中指定不打包，而是运行时从外部获取的库：

```js
    externals: {
        'vue': 'Vue', // key 表示项目中 from 之后的字符串匹配，value 表示 CDN 引入的库会暴露出来的全局变量
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
    }
```

如上配置中，`externals` 对象的属性 key 表示项目代码中 `from` 之后的字符串匹配，value 表示 CDN 引入的库会暴露出来的全局变量。

- 属性值为 `string` 类型

    ```js
    externals: {
        'vue': 'Vue',
    }
    ```

    上例中，属性值 `'Vue'` 就是使用的 `string` 类型。运行时就会去全局寻找这个全局变量 `window['Vue']`

- 属性值为 `array` 类型

    ```js
    externals: {
        subtract: ['./math', 'subtract']
    }
    ```

    subtract: ['./math', 'subtract'] 转换为父子结构，其中 ./math 是父模块，而 bundle 只引用 subtract 变量下的子集。

- 属性值为 `object` 类型

    ```js
    externals : {
      lodash : {
        commonjs: "lodash",
        amd: "lodash",
        root: "_" // 指向全局变量
      }
    }

    // 或者

    externals : {
      subtract : {
        root: ["math", "subtract"]
      }
    }
    ```

    此语法用于描述外部 library 所有可用的访问方式。这里 lodash 这个外部 library 可以在 AMD 和 CommonJS 模块系统中通过 lodash 访问，但在全局变量形式下用 _ 访问。subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）。

- 属性值为 `function` 类型

```js
externals: [
  function(context, request, callback) {
    if (/^yourregex$/.test(request)){
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }
],
```

- 属性值为 `regex` 类型

```js
externals: /^(jquery|\$)$/i
```

匹配到 `'jquery'` 或 `'$'` 都不会将这个引用打包到项目中。也是去全局查找。

### 15. `performance` 对象，配置项目性能提示

配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。

#### `performance.hints` 设置关闭提示，或开启提示的等级，默认为 `'warning'`

可选值：`false | 'error' | 'warning'`

```js
performance: {
    hints: 'error'
}
```

在生产环境构建时，我们推荐使用 `hints: "error"`，有助于防止把体积巨大的 bundle 部署到生产环境，从而影响网页的性能。

#### `performance.maxEntrypointSize` 设置入口起点的最大体积，超出会生成性能提示。单位：bytes。默认值为 `250000`

`type: number`

```js
performance: {
  maxEntrypointSize: 400000
}
```

#### `performance.maxAssetSize` 设置资源的最大体积，超出生成性能提示，默认 `250000` （bytes）

`type: number`

资源(asset)是从 webpack 生成的任何文件。如果某个单个资源体积超出，则会生成性能提示。

performance: {
  maxAssetSize: 100000
}

#### `performance.assetFilter` 函数，接收文件名为参数，返回布尔值表示是否生成性能提示。`true` 表示要生成

`type: funtion`

默认函数如下：

```js
function(assetFilename) {
    return !(/\.map$/.test(assetFilename)) // .map 文件返回 false，其他返回 true
}
```

以上默认函数表示，以 `.map` 结尾的文件不生成性能提示。

自定义函数覆盖默认函数：

```js
performance: {
  assetFilter: function(assetFilename) {
    return assetFilename.endsWith('.js')
  }
}
```

以上示例如果是 `.js` 文件则返回 `true`，表示只生成 `.js` 文件的性能提示。

### 16. `Node`

### 17. `stats`

### 18. 其他顶层配置项

- amd
- bail
- cache
- loader
- parallelism
- profile
- recordsPath
- recordsInputPath
- recordsOutputPath

### 附：modules 列表

### 1. 概念

对比 Node.js 模块，webpack 模块能够以各种方式表达它们的依赖关系，几个例子如下：

- ES2015 `import` 语句
- CommonJS `require()` 语句
- AMD `define` 和 `require` 语句
- css/sass/less 文件中的 `@import` 语句。
- 样式`url(...)`或 HTML 文件`<img src=...>`中的图片链接(image url)

### 2. loader 列表

#### 文件

- `raw-loader` 加载文件原始内容（utf-8）
- `val-loader` 将代码作为模块执行，并将 exports 转为 JS 代码
- `url-loader` 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
- `file-loader` 将文件发送到输出文件夹，并返回（相对）URL

#### JSON

- `json-loader` 加载 JSON 文件（默认包含）
- `json5-loader` 加载和转译 JSON 5 文件
- `cson-loader` 加载和转译 CSON 文件

#### 转换编译(Transpiling)

- `script-loader` 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
- `babel-loader` 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
- `buble-loader` 使用 Bublé 加载 ES2015+ 代码，并且将代码转译为 ES5
- `traceur-loader` 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5
- `ts-loader` 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+
- `coffee-loader` 像 JavaScript 一样加载 CoffeeScript

#### 模板(Templating)

- `html-loader` 导出 HTML 为字符串，需要引用静态资源
- `pug-loader` 加载 Pug 模板并返回一个函数
- `jade-loader` 加载 Jade 模板并返回一个函数
- `markdown-loader` 将 Markdown 转译为 HTML
- `react-markdown-loader` 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
- `posthtml-loader` 使用 PostHTML 加载并转换 HTML 文件
- `handlebars-loader` 将 Handlebars 转移为 HTML
- `markup-inline-loader` 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。

#### 样式

- `style-loader` 将模块的导出作为样式添加到 DOM 中
- `css-loader` 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
- `less-loader` 加载和转译 LESS 文件
- `sass-loader` 加载和转译 SASS/SCSS 文件
- `postcss-loader` 使用 PostCSS 加载和转译 CSS/SSS 文件
- `stylus-loader` 加载和转译 Stylus 文件

#### 清理和测试(Linting && Testing)

- `mocha-loader` 使用 mocha 测试（浏览器/NodeJS）
- `eslint-loader` PreLoader，使用 ESLint 清理代码
- `jshint-loader` PreLoader，使用 JSHint 清理代码
- `jscs-loader` PreLoader，使用 JSCS 检查代码样式
- `coverjs-loader` PreLoader，使用 CoverJS 确定测试覆盖率

#### 框架(Frameworks)

- `vue-loader` 加载和转译 Vue 组件
- `polymer-loader` 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件
- `angular2-template-loader` 加载和转译 Angular 组件

#### 更多第三方模块

[点击查看](https://github.com/webpack-contrib/awesome-webpack#loaders)

### 附：plugins 列表

#### 内置

Name | Description
- | -
AggressiveSplittingPlugin | 将原来的 chunk 分成更小的 chunk
BabelMinifyWebpackPlugin | 使用 babel-minify进行压缩
BannerPlugin | 在每个生成的 chunk 顶部添加 banner
CommonsChunkPlugin | 提取 chunks 之间共享的通用模块
CompressionWebpackPlugin | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
ContextReplacementPlugin | 重写 require 表达式的推断上下文
CopyWebpackPlugin | 将单个文件或整个目录复制到构建目录
DefinePlugin | 允许在编译时(compile time)配置的全局常量
DllPlugin | 为了极大减少构建时间，进行分离打包
EnvironmentPlugin | DefinePlugin 中 process.env 键的简写方式。
ExtractTextWebpackPlugin | 从 bundle 中提取文本（CSS）到单独的文件
HotModuleReplacementPlugin | 启用模块热替换(Enable Hot Module Replacement - HMR)
HtmlWebpackPlugin | 简单创建 HTML 文件，用于服务器访问
I18nWebpackPlugin | 为 bundle 增加国际化支持
IgnorePlugin | 从 bundle 中排除某些模块
LimitChunkCountPlugin | 设置 chunk 的最小/最大限制，以微调和控制 chunk
LoaderOptionsPlugin | 用于从 webpack 1 迁移到 webpack 2
MinChunkSizePlugin | 确保 chunk 大小超过指定限制
NoEmitOnErrorsPlugin | 在输出阶段时，遇到编译错误跳过
NormalModuleReplacementPlugin | 替换与正则表达式匹配的资源
NpmInstallWebpackPlugin | 在开发时自动安装缺少的依赖
ProvidePlugin | 不必通过 import/require 使用模块
SourceMapDevToolPlugin | 对 source map 进行更细粒度的控制
EvalSourceMapDevToolPlugin | 对 eval source map 进行更细粒度的控制
UglifyjsWebpackPlugin | 可以控制项目中 UglifyJS 的版本
ZopfliWebpackPlugin | 通过 node-zopfli 将资源预先压缩的版本
