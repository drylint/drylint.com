
# html-webpack-plugin

[toc]

此插件使用的压缩器是 `html-minifier`。

```js
npm i html-webpack-plugin -D // 安装插件
```

插件将自动使用 `<script>` 在 `<body>` 引入入口(`entry`)打包出来的 js 文件， `<link>` 引入被提取出的css文件。

如果有多个入口，默认会将所有入口打包出的 js 文件引入。

尤其是对于打包时使用了 `[hash]` 作为文件名时非常有用，不再需要每次打包完成手动引入。

可以使用此插件自动生成一个 html 文件，也可以使用自己写好的 html 模板，通常会使用自己创造的一个 html 文件作为模版。

## 使用方式

```js
// webpack.config.js

const path = require('path')

// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 mode: 'development',
 plugins: [
     // 创建插件实例对象，并配置
  new HtmlWebpackPlugin({
      // options
  })
 ]
}
```

### 配置项（传入的对象参数）

#### title 生成的 html 的 `<title>` 中的标题

`type: string`

`default: ''`

页面标题，使用了template模板之后，则使用模板html文件中的title，此设置则无效。

#### filename 生成的 html 文件名

`type: string`

`default: 'index.html'`

默认为 `'index.html'`，可手动指定，比如：`dist/main.html` 可以指定文件名，并指定生成到某个目录下。

#### template 使用的自定义的 html 文件模版的路径

`type: string`

`default: ''`

不设置则自动生成一个html文件作为模版。

#### templateParameters 覆盖模板中使用的参数

`type: Boolean | Object | Function`

`default: ''`

#### inject 注入的 js 文件的位置

`type: Boolean | Object | Function`

`default: ''`

`true | 'head' | 'body' | false` 注入所有的资源到指定的模板中。

`true | 'body'` 会将所有的 js 资源都放置在 `<body>` 标签中的最后。

`'head'` 则会将 js 放置在 `<head>` 标签中。

#### favicon 指定图标 favicon 的路径

`type: string`

`default: ''`

#### meta 注入 `<meta>` 标签及属性

`type: Object`

`default: {}`

例如： `meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}`

#### minify 对象，传递 `html-minifier` 的配置项用于优化

`type: Boolean | Object`

`default: true`

'production' 模式通常会设置为 `true`， 'devlopment' 模式通常设置为 `false` 以提升编译速度。

#### hash 是否将 webpack 编译的唯一 hash 值加入到 js 和 css 文件中。用于清除缓存。默认未开启

`type: Boolean`

`default: false`

在 html 中引入js、css 等文件时加入 `?hash` 例如： `src="main.9bc3a529.js?9bc3a52937ed3c3f80d4"`。

如果js文件打包时已经加了 hash 值，这里可以不加。

#### cache 是否仅在文件有更改时触发更新，默认开启

`type: Boolean`

`default: true`

#### showErrors 发生的错误详细信息将写入 HTML 页面

`type: Boolean`

`default: true`

#### chunks 只注入指定的 chunks，比如只添加单元测试的 chunk

`type: Array<string>`

`default: ???`

在多入口时，会默认将所有 entry 指定的属性名（也就是 chunk 名） 都打包引入到 html 中，可以指定只将某些确定的 entry 名称注入。

#### excludeChunks 不注入指定的 chunks，比如要忽略单元测试的 chunks

`type: Array<string>`

`default: []`

#### chunksSortMode 指定在 chunks 被注入到 html 之前如何进行排序

`type: string('none' | 'auto' | 'dependency' | 'manual' ) | function`

`default: 'auto'`

#### xhtml 是否将link标签呈现为自动关闭（符合 XHTML）

`type: Boolean`

`default: false`

### 使用自己创建的 html 文件作为模板

```html
<!-- 自定义的html文件 -->

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

```js
plugins: [
    new HtmlWebpackPlugin({
     template: path.join(__dirname, 'src/index.html'), // 要使用的模板文件的绝对路径
     // 以下写法也可
     // template: path.join(__dirname, './src/index.html'),
     // template: path.resolve(__dirname, './src/index.html'),
     // template: path.resolve(__dirname, 'src/index.html'),
     // template: 'src/index.html',
     // template: './src/index.html',
     filename: 'index.html' // 生成的文件名
    })
]

```

还可以使用模板加载器（template loader）来解析 `options.template` 指定的文件

```js
module: {
  loaders: [
    // 模板加载器，加载 HtmlWebpackPlugin 中的 template 选项指定的模板文件
    { test: /\.hbs$/, loader: "handlebars" }
  ]
},
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template using Handlebars',
    template: 'index.hbs'
  })
]
```

上例中，loader 可以解析 HtmlWebpackPlugin 的 `template` 选项指定的模板文件，同理，`module.rules` 中 `test: /\.html$/` 指定的 loader 也会解析 HtmlWebpackPlugin 的 `template` 选项指定的 `.html` 文件。

### 生成多个 html 文件

在 plugins 中多次创建实例即可生成多个 html 文件

```js
plugins: [
    new HtmlWebpackPlugin(), // 生成默认的 index.html
    new HtmlWebpackPlugin({  // 同时使用一个自定义模板生成一个 test.html
        filename: 'test.html',
        template: 'src/assets/test.html'
    })
]

```

### 使用 lodash 语法高度定制自己需要的模板

如果觉得 `inject` 功能不满足于自己的需求，可以通过使用默认生成的模板作为起点，使用 lodash 语法，编写自己完全可控制资源放置的模板。

以下变量可在模板中使用：

- `htmlWebpackPlugin` 特用于此插件的数据

  - `htmlWebpackPlugin.files` webpack 的 `stats` 对象中的 `assetsByChunkName` 属性的简化表示法，包含从入口名称到打包名称的映射。

      ```js
      "htmlWebpackPlugin": {
        "files": {
          "css": [ "main.css" ],
          "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
          "chunks": {
            "head": {
              "entry": "assets/head_bundle.js",
              "css": [ "main.css" ]
            },
            "main": {
              "entry": "assets/main_bundle.js",
              "css": []
            },
          }
        }
      }
      ```

      如果在 webpack 中配置了 `publicPath`，此配置也将会正确地反映在此资源的 hash 值之中。

  - `htmlWebpackPlugin.options` 此配置的 hash 会被传递给插件，除了此插件实际使用的选项之外，还可以用此配置传递任意的数据到自己的模板中。

- `webpack`  webpack 的 `stats` 对象，注意，这是 html 模板被触发时的统计信息，因此可能不会有完整的 webpack 运行完毕后的可用的统计信息。

- `webpackConfig` webpack 的配置信息。例如，获取 `publicPath`：`webpackConfig.output.publicPath`。

- `compilation` webpack 编译对象（compilation object），例如，获取已处理资源的内容并内联到页面中：`compilation.assets[...].source()` 。详情 [inline template example](https://github.com/jantimon/html-webpack-plugin/blob/HEAD/examples/inline/template.jade)

```js
// webpack.prod.conf.js

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    ...
  },
  plugins: [
    // 使用并配置 html-webpack-plugin 插件
    new HTMLWebpackPlugin({
        // title: 'title', // 页面标题，不设置则为默认值 Webpack App，使用了template模板之后，则使用模板html文件中的title，此设置则无效。
        filename: 'main.html', // 打包生成的 html 文件名，默认值 index.html
        // 使用自定义的 html 文件作为模板后，就自动将打包的js和css文件引入模板html文件中再输出为指定的filename文件
        template: path.resolve(__dirname, 'src/index.html'), // 不设置则自动生成一个html文件。
        chunks: ['index', 'other'], // 适用于多页应用打包出多个模块时，指定这一个html文件引入哪一个模块，模块名就是 entry 中指定的名字

        // minify: boolean | object // 一次性设置或单独设置
        // minify: true, // 'production' 可设为 true， 'devlopment' 应设为 false
        minify: { // 单独设置子项
            collapseWhitespace: true, // 移除空白
            removeComments: true, // 移除注释
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
        // js文件打包时已经加了 hash 值，这里可以不加
        hash: false // 在 html 中引入时加入?hash： src="main.9bc3a529.js?9bc3a52937ed3c3f80d4"
    })
  ]
}

```

# html-minifier html-webpack-plugin 插件使用的压缩器

## 配置项

默认情况下，大多数选项都是禁用的。

### caseSensitive 是否在处理属性时区分大小写（适用于自定义HTML标签），默认 `false`

### collapseBooleanAttributes 是否从布尔属性中省略属性值，默认 `false`

### collapseInlineTagWhitespace 是否在 `display:inline;` 的元素之间折叠时不留任何空白，默认 `false`

必须与 `collapseWhitespace=true` 同时使用

### collapseWhitespace 是否折叠有助于文档树中文本节点的空白，默认 `false`

### conservativeCollapse 是否总是折叠为一个空格 (永远不要将其完全移除)

必须与 `collapseWhitespace=true` 同时使用，默认 `false`。

### continueOnParseError 是否处理解析错误而不是中止，默认 `false`

### customAttrAssign 数组，允许支持自定义属性分配表达式的正则组成的数组，默认 `[]`

例如 `<div flex?="{{mode != cover}}"></div>`

### customAttrCollapse 正则，指定自定义属性以从中删除换行符

例如 `/ng-class/`

### customAttrSurround 数组，允许支持自定义属性去环绕表达式的正则组成的数组，默认 `[]`

例如 `<input {{#if value}}checked="checked"{{/if}}>`

### customEventAttributes数组，支持给 minifyJS 的自定义事件属性的正则数组，默认 `[ /^on[a-z]{3,}$/ ]`

例如 ng-click

### decodeEntities 是否尽可能地使用 unicode 字符，默认 `false`

### html5 是否根据 html5 的规范来解析输入，默认 `true`

### ignoreCustomComments 数组，忽略指定的正则匹配的某些注释，默认 `[ /^!/ ]`

### ignoreCustomFragments 数组，忽略指定正则匹配的某些片段，默认 `[ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ]`

例如 `<?php ... ?>`, `{{ ... }}` 等。

### includeAutoGeneratedTags 是否插入 html 解析器生成的标签，默认 `true`

### keepClosingSlash 是否保留自闭合元素的斜线，默认 `false`

### maxLineLength 指定一行的最大长达. 压缩输出时，将在分割点进行换行

### minifyCSS 压缩 样式元素、样式属性中的 css ()，默认 `false`

`type: Boolean | Object | Function(text, type)`

使用的是 `clean-css` 插件

### minifyJS 压缩 `<script>` 元素和事件属性中的 js 代码，默认 `false`

`type: Boolean | Object | Function(text, inline)`

使用的是 `UglifyJS` 插件

### minifyURLs 压缩各类属性中的 url ，默认 `false`

`type: String | Object | Function(text)`

使用的是 `relateurl` 插件

### preserveLineBreaks 标签之间的空格包含换行符时，是否合并为 1 个换行符（用于不要完全删除），默认 `false`

必须与 `collapseWhitespace: true` 一起使用

### preventAttributesEscaping 是否阻止属性值的转义，默认 `false`

### processConditionalComments 通过 minifier 处理条件注释的内容，默认 `false`

### processScripts 字符串数组，指定 `<script>` 的 type 属性，使用 minifier 处理，默认 `[]`

例如 `text/ng-template`, `text/x-handlebars-template` 等

### quoteCharacter 属性值的引号是单引号还是双引号 `'' | ""`

### removeAttributeQuotes 是否尽可能删除属性周围的引号，默认 `false`

### removeComments 是否删除 html 注释，默认 `false`

### removeEmptyAttributes 删除所有值为空格的属性，默认 `false`

`type: true | Function(attrName, tag)`

### removeEmptyElements 删除所有内容为空的元素，默认 `false`

### removeOptionalTags 删除可选标签，默认 `false`

### removeRedundantAttributes 当赋予的属性值就是默认值时，是否删除该属性，默认 `false`

### removeScriptTypeAttributes 是否从 `<script>` 元素中去除 `type="text/javascript"`， 其他 type 值保持不变，默认 `false`

### removeStyleLinkTypeAttributes 是否从 `<style>` 或 `<link>` 元素中去除 `type="text/css"`，其他 type 值保持不变，默认 `false`

### removeTagWhitespace 是否尽可能删除属性之间的空格，注意这会导致 html 无效!，默认 `false`

### sortAttributes 是否按使用频率对属性进行排序，默认 `false`

### sortClassName 是否按频率对 style class 进行排序，默认 `false`

### trimCustomFragments 是否去除 `ignoreCustomFragments` 周围的空格，默认 `false`

### useShortDoctype 是否使用 html5 的短 的doctype 替换 `doctype`，默认 `false`
