# webpack-bundle-analyzer

[toc]

```bash
npm install -D webpack-bundle-analyzer
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
        // options
    })
  ]
}
```

## options object

### analyzerMode 指定此插件的运行模式，默认开启一个服务器

值类型： `string`

允许值：`'server' | 'static' | 'json' | 'disabled'`

默认值：`'server'`

- `'server'` 开启一个 http 服务器来展示打包分析报告(`http://127.0.0.1:8888`)
- `'static'` 生成一个静态文件 `report.html` 来展示打包分析报告
- `'json'` 生成一个 json 文件来展示报告
- `'disabled'` 禁用，仅使用此插件来生成 Webpack Stats JSON 文件，通过设置 `generateStatsFile: true`。

### analyzerHost 当模式为 `'server'` 时，指定开启的服务器主机地址

值类型： `string`

默认值：`'127.0.0.1'`

### analyzerPort 当模式为 `'server'` 时，指定开启的服务器端口

值类型： `number`

默认值：`8888`

当模式为 `'server'` ，并且需要多个项目同时运行时，需要设置为不同端口，否则会报错并退出。

### reportFilename 当模式为 `'static'` 时，指定生成的静态文件路径及名称

值类型： `string`

默认值：`'report.html'`

当模式设置为 `'static'` 时， 指定生成的 HTML 报告文件的路径以及文件名，绝对路径或者相对路径均可， 相对路径是相对于 webpack 配置的 `output.path` 指定的路径。

### defaultSizes 报告中默认展示的大小，是输入、输出还是 gzip 的大小

值类型： `string`

允许值：`'stat' | 'parsed' | 'gzip'`

默认值：`'parsed'`

默认地，模块(module)的大小展示在报告中。

- `'stat'` 输入文件的大小，在经历所有的转换与压缩之前的大小。这叫做 `stat size` 因为是从 webpack 的 stats 对象获得的名称。

- `'parsed'` 输出文件的大小。在所有插件转换压缩处理后的大小。（比如 TerserPlugin 压缩后）

It is called "stat size" because it's obtained from Webpack's stats object.

- `'gzip'` 通过 gzip 压缩运行 `'parsed'` 文件之后的大小。

### openAnalyzer 是否通过默认浏览器自动打开报告页面

值类型： `boolean`

默认值：`true`

### generateStatsFile 是否生成 webpack stats JSON 文件

值类型： `boolean`

默认值：`false`

如果设置为 `true`，webpack stats JSON 文件将会生成并放置在 bundle output 目录中。

### statsFilename 指定要生成的 webpack stats JSON 文件的存放路径及名称

值类型： `string`

默认值：`'stats.json'`

绝对路径或者相对路径均可， 相对路径是相对于 webpack 配置的 `output.path` 指定的路径。

### statsOptions 指定 `stats.toJson()` 方法的参数对象

值类型： `null | object`

默认值：`null`

例如，可以使用 `{ source: false }` 选项从 stats 文件中排除模块的源代码。更多详情见 webpack 的 Stats 配置项。

### excludeAssets 指定分析报告中要排除的 assets 资源的名称

值类型： `null | pattern || pattern[]` 其中 pattern 表示 `String | RegExp | function` 之一

默认值：`null`

此选项用来指定打包分析报告中要排除的资源名称，

若设置值为 `string` 类型，将使用 `RegExp(str)` 将其转换为 RegExp 类型去匹配资源名称，

若设置值为回调函数，则应该是 `(assetName: string) => boolean` ，也就是函数第一个参数会传入资源名称， 函数中判断后返回 `true` 表示要排除，返回 `false` 则表示不排除。

如果传入数组类型的多个 pattern，则资源文件只要匹配任意一个 pattern 就会被排除。

### logLevel 控制插件输出的详细程度

值类型： `string`

允许值：`'info' | 'warn' | 'error' | 'silent'`

默认值：`'info'`
