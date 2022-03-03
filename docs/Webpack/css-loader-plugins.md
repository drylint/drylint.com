# css 相关 loader 及插件

[toc]

# `css-loader` / `style-loader`

- `css-loader` 解释 `@import` 和 `url()` 并处理它们，就像 js 中的 `import/require()`
- `style-loader` 将解析后的 css 注入到 html 之中的 `<style>` 标签中

安装两个 loader：

```
npm install -D css-loader style-loader
```

## css-loader

### 基本使用方法

```js
// 代码中

import css from 'file.css';
```

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

```

### options 配置项

#### url 是否启用对css代码中的 `url()/image-set()` 的处理，默认开启

`Type: Boolean | Function`

`Default: true`

是否启用对css代码中的 `url()/image-set()` 的处理，但绝对路径和相对根路径不会被处理。

以下是 `url()` 的各种写法以及他们的处理结果：

```bash
url(image.png) => require('./image.png')
url('image.png') => require('./image.png')
url(./image.png) => require('./image.png')
url('./image.png') => require('./image.png')
url('http://xxx.com/2112.png') => require('http://xxx.com/2112.png')
image-set(url('image2x.png') 1x, url('image1x.png') 2x) => require('./image1x.png') and require('./image2x.png')
```

如果 `url()` 要从 `node_modules`(包括 resolve.modules) 或 alias 路径引入图片文件，需要添加前缀符号 `~`：

```bash
url(~module/image.png) => require('module/image.png')
url('~module/image.png') => require('module/image.png')
url(~aliasDirectory/image.png) => require('otherDirectory/image.png')
```

配置值为函数时允许对代码中的 `url()` 进行过滤，被过滤掉（`return false`）的 `url()` 代码将原封不动地保存在书写的代码中。

```js
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          url: (url, resourcePath) => {
            // url：表示 url() 中的路径
            // resourcePath：path to css file 表示css文件的路径

            // 比如，对 url() 中引入路径包含 `img.png` 的引入不进行处理
            if (url.includes('img.png')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
```

#### import 是否开启对 `@import` 语法的处理, 默认开启

`Type: Boolean`

`Default: true`

是否开启对 `@import` 语法的处理，默认开启。绝对路径将会被直接照搬到打包的代码中去。

以下是一些 `@import` 的写法，以及他们的处理结果

```bash
@import 'style.css' => require('./style.css')
@import url(style.css) => require('./style.css')
@import url('style.css') => require('./style.css')
@import './style.css' => require('./style.css')
@import url(./style.css) => require('./style.css')
@import url('./style.css') => require('./style.css')

@import url('http://xxx.com/style.css') => @import url('http://xxx.com/style.css')
```

如果 `@import` 要从 `node_modules`(包括 resolve.modules) 或 alias 路径引入图片文件，需要添加前缀符号 `~`

```bash
@import url(~module/style.css) => require('module/style.css')
@import url('~module/style.css') => require('module/style.css')
@import url(~aliasDirectory/style.css) => require('otherDirectory/style.css')
```

配置值为函数时允许对代码中的 `@import` 进行过滤，被过滤掉（`return false`）的 `@import` 代码将原封不动地保存在书写的代码中。

```js
// webpack.config

  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: (parsedImport, resourcePath) => {
            // parsedImport 对象，包含 url, media 属性
            // parsedImport.url - url of `@import` 表示 `@import` 的路径
            // parsedImport.media - media query of `@import` 表示 `@import` 的媒体查询
            // resourcePath - path to css file 表示 css 文件的路径

            // 比如，对 @import 中引入路径包含 `style.css` 的引入不进行处理
            if (parsedImport.url.includes('style.css')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
```

#### modules 是否启用 CSS 模块化功能，默认不启用

`Type: Boolean | String | Object`

`Default: false`

是否启用 CSS 模块化功能，默认不启用。不启用会提升性能，因为避免了对css模块特性的解析。这对使用 `vanilla css` 或其他技术的开发者有利。

若启用，它有以下功能：

1. Scope 样式作用域化

样式可以局部作用域化，以避免全局作用域化样式

使用局部值(`local`)需要您指定全局className。使用全局值(`global`)需要您指定局部className。

语法 `local(.className){}` 可用于在局部范围内声明 className。本地标识符由模块导出。

使用 `:local` 不带括号，可以为该选择器打开局部模式。

使用 `global(. classname)` 可以声明显式的全局选择器。

使用 `:global` 不带括号，可以为该选择器打开全局模式。

书写局部和全局的 className 选择器样式：

```css
:local(.className) {
  background: red;
}

:local .className {
  color: green;
}

:local(.className .subClass) {
  color: green;
}

:local .className .subClass :global(.global-class-name) {
  color: blue;
}

```

会被解析为下面这样：

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
}
._23_aKvs-b8bW2Vg3fwHozO {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name {
  color: blue;
}
```

标识符会被这样导出：

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1',
};
```

使用时：

```js
import styles from './index.css' // styles 就是导出的对象，含有的属性就是那些局部className，值就是被解析后的 className 。
```

`styles.className` 会被替换为 `'_23_aKvs-b8bW2Vg3fwHozO'`；`styles.subClass` 会被替换为 `'_13LGdX8RMStbBE9w-t0gZ1'`

建议本地选择器使用 CamelCase。它们更容易在导入的JS模块中使用。

`:local(#someId)` 这样的 id 选择器尽管可以使用，但不推荐，还是建议使用 class 选择器 代替 id 选择器。

2. Composing 组合样式

在定义一个局部 className 时，可以组合另一个局部 className：

```css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: classname; /* 组合另一个局部 className */
  background: blue;
}
```

这并不会导致对 CSS 本身的任何更改，而只是导出多个类名，相当于只写了一个 className 的元素上会加上被组合进去的 className：

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO', // subClass 相当于是两个 className，对应使用的元素也就有这两个 className 。
};
```

解析后的 css 不会有任何变化：

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

3. Importing 从其他模块导入局部 className

可以从一个或多个模块导入一个或多个局部 className 用来组合进当前的 className：

```css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}

:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}

:local(.className) {
  composes: edit hightlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classfromthismodule;
  background: red;
}
```

4. Values 定义变量

可以将 `@value` 用于在整个文档中重用的特定值。相当于使用 `@value` 声明一个变量并赋值，在代码中使用。

建议使用前缀 `v-` 表示值，`s-` 表示选择器，`m-` 表示媒体查询规则。

```css
@value v-primary: #BF4040;
@value s-black: black-selector;
@value m-large: (min-width: 960px);

.header {
  color: v-primary;
  padding: 0 10px;
}

.s-black {
  color: black;
}

@media m-large {
  .header {
    padding: 0 20px;
  }
}
```

值为 `boolean` 时表示是否开启模块化功能。默认为 `'local'` 模式。

值为 `string` 时，表示开启模块化功能并指定模式（mode）:

```js
modules: 'global', // 'local'（默认值） | 'global'
```

值为对象时，表示启用模块化功能，并为此配置选项：

```js
modules: {
    mode: 'local', // 默认值 `local`
    localIdentName: '[path][name]__[local]--[hash:base64:5]', // 默认值 `[hash:base64]`
    context: path.resolve(__dirname, 'src'), // 默认值 undefined，默认使用 跟路径
    hashPrefix: 'my-custom-hash', // 允许添加自定义哈希前缀，默认值 undefined
    getLocalIdent: (context, localIdentName, localName, options) => { // 默认值 undefined，值时一个函数。
        return 'whatever_random_class_name';
    },
},
```

- localIdentName

推荐：

在开发模式使用 `'[path][name]__[local]'`

在生产模式使用 `'[hash:base64]'`

`'[local]'` 占位符包含原始 className

注意：所有的保留字符 `<>:"/\|?*` 和文件系统控制字符 (`'[local]'` 占位符中的字符除外) 都将会被转为  `'-'`。

```js
localIdentName: '[path][name]__[local]--[hash:base64:5]'
```

- getLocalIdent

您还可以指定自定义getLocalIdent函数的绝对路径，以根据不同的模式生成classname。默认情况下，我们使用内置函数来生成类名。

- localIdentRegExp

`Type: String|RegExp`

`Default: undefined`

```js
localIdentRegExp: /page-(.*)\.css/i,
```

#### sourceMap 是否允许生成 source map 文件，默认 `false`

`Type: Boolean`

`Default: false`

默认情况下是不启用的，因为它们暴露了运行时开销并增加了包的大小(不影响 JS 的 source map 设置)。

#### importLoaders 设置允许在 `css-loader` 之前应用的加载器数量

`Type: Number`

`Default: 0`

`importLoaders` 允许配置：在 `css-loader` 加载器应用于 `@imports` 的资源之前，应用多少个加载器。

```js
options: {
  importLoaders: 2,
  // 0 => no loaders (default);
  // 1 => postcss-loader;
  // 2 => postcss-loader, sass-loader
},
```

当模块系统(即webpack)支持按来源匹配加载器时，这种情况可能会改变。

#### localsConvention 配置导出的 classnames 的风格，默认 `undefined`

`Type: String`

`Default: undefined`

- `'asIs'` classNames 将会被原样导出。
- `'camelCase'` classNames 将会被转为驼峰命名格式，原来的类名将不会从局部变量中移除。
- `'camelCaseOnly'` classNames 将会被转为驼峰命名格式，并且原来的类名将会从局部变量中移除。
- `'dashes'` 仅会将破折号连接的 `classNames` 转为驼峰命名格式。
- `'dashesOnly'` 仅会将破折号连接的 `classNames` 转为驼峰命名格式。并且原来的类名将会从局部变量中移除。

比如，在设置为 `localsConvention: 'camelCase'` 后：

在 css 中使用 破折号连接

```css
.class-name {
}
```

// 在 js 中使用 驼峰命名使用

```js
import { className } from 'file.css';
```

#### onlyLocals 是否只导出局部样式，默认为 `false`

`Type: Boolean`

`Default: false`

这个选项对使用 css 模块化进行预渲染（例如SSR）时很有用。

对于使用 `mini-css-extract-plugin` 进行预渲染，则应该使用此选项，而不是预渲染包中的 `style-loader!css-loader` 。

因为它不会嵌入CSS，而仅导出标识符映射。

```js
onlyLocals: true
```

#### 示例

- 当 css 中引入了一些比较小的图片或字体文件时，可以使用如下配置将这些文件转为 Data URLs 内嵌到 css 中。

    ```js
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192, // 小于 8192 bytes 的文件将被转为 Data URLs 编码内嵌到代码中。大文件还是会导出到对应目录中。
        },
      },
    ],
    ```

- 当项目中既有普通的 css， 又有 模块化的css（css modules） 时，可以这样配置：

    ```js
    rules: [
      {
        // For pure CSS (without CSS modules)
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // For CSS modules
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ]
    ```

- css 代码提取

    对于生产版本，建议将打包文件中将 css 提取到单独的 css 文件，以便可以使 CSS / JS 资源并行加载。

    这可以通过在生产模式下使用 `mini-css-extract-plugin` 插件来提取CSS为文件。

    或者，如果寻求更好的开发性能和模仿生产环境的CSS输出。 `extract-css-chunks-webpack-plugin` 插件非常友好地提供了一个热模块重载功能，它是扩展版本的 `mini-css-extract-plugin` 。 它实现了在开发环境中真正的 css 文件 热重载，使用体验就像在生产环境中使用 `mini-css-extract-plugin` 一样。

# `mini-css-extract-plugin` / `optimize-css-assets-webpack-plugin`

在生产环境中，css样式依赖于js执行环境并不好，渲染会被推迟，所以需要将css抽离出来。

- `extract-loader` 简单，专门针对 css-loader 的输出，通常不适用
- `extract-text-webpack-plugin`  用于webpack 3.x，已废弃。
- `mini-css-extract-plugin` 用于 webpack 4.x

或者，如果寻求更好的开发性能和模仿生产环境的CSS输出。 `extract-css-chunks-webpack-plugin` 插件非常友好地提供了一个热模块重载功能，它是扩展版本的 `mini-css-extract-plugin` 。 它实现了在开发环境中真正的 css 文件 热重载，使用体验就像在生产环境中使用 `mini-css-extract-plugin` 一样。

## mini-css-extract-plugin

将项目中的 css 代码提取到独立的文件之中，它将每一个 js 文件之中包含的 css 代码都提取为一个独立文件，支持按需加载和 source map。

此插件构建基于 webpack4 的一些新功能，所以需要在 webpack4 下工作。

优点：异步加载、没有重复编译（性能好）、使用简单、专用于css

> 此插件应该仅用于 `'production'` 模式下，并且要使用在没有 `style-loader` 的 loader 链中，尤其是想要在 `'development'` 模式下使用热更新时。

### 安装

```bash
npm install --save-dev mini-css-extract-plugin
```

### 基本使用方法

需要同时使用此插件和此插件的 loader 。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './', // 默认使用 webpackOptions.output.publicPath
              hmr: process.env.NODE_ENV === 'development', // 开发模式下开启热更新
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

### 配置项

配置项类似于 `webpackOptions.output`，且都不是必填项。

#### publicPath

`Type: String | Function`

`Default: webpackOptions.output.publicPath`

```js
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',  // 默认使用 webpackOptions.output.publicPath
      hmr: process.env.NODE_ENV === 'development',
    },
```

使用函数设置 `publicPath`：

```js
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: (resourcePath, context) => {
        // publicPath is the relative path of the resource to the context
        // e.g. for ./css/admin/main.css the publicPath will be ../../
        // while for ./css/main.css the publicPath will be ../
        return path.relative(path.dirname(resourcePath), context) + '/';
      },
    },
  },
```

### 示例

#### 开发模式使用热更新，生产模式提取到单文件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

#### 关于热更新（HMR）

此插件支持在开发模式下热更新实际的 css 文件，插件提供了一下选项来启用热更新，包含：标准样式表以及 locally scoped CSS 或 CSS modules。

例如：使用 CSS modules 的热更新配置

尝试对使用 CSS modules 进行热更新时，当使用自定义 chunk 名称进行代码拆分时不太容易执行。 `reloadAll: true` 选项应当仅在热更新无法正常工作时才启用。

CSS modules 热更新的核心挑战是当代码拆分时，chunk id 最终与文件名相比较可能会有所不同。

使用热加载时，输出文件名不能带 hash 值， 并且 loader 的 `options.hmr` 要设置为 `true`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // filename: isDevMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: '[id].css', // chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

#### 生产模式下压缩 CSS 代码

使用 `optimize-css-assets-webpack-plugin` 插件来完成压缩。配置在 `webpackOptions.optimization.minimizer` 属性上，覆盖 webpack 默认提供的配置。

> 注意：配置后会覆盖 webpack 默认的配置，默认的压缩 js 的配置也被覆盖了，所以还需要手动配置压缩 js 。

```js
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

```

#### 使用预加载（preload） 或 内联 css

runtime 代码通过检测 `<link>` 或 `<style>` 标签判断是否已添加 CSS，这对使用于服务端渲染时，在服务端注入 CSS 很有用。

`<link>` 标签的 `href` 属性的值（URL）必须匹配将被加载的 CSS chunk 的 URL。

`data-href` 属性也可以用于 `<link>` 和 `<style>` 。当内联CSS时，必须使用 `data-href` 。

#### 将所有CSS代码提取到一个文件中

使用 `webpackOptions.optimization.splitChunks.cacheGroups` 可以完成此操作。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

#### 基于 `entry` 选项提取 CSS

基于 `entry` 的名字提取CSS，尤其是在动态导入路由又希望css和entry打包在一起时非常有用。这也防止了 `ExtractTextPlugin` 插件引起的CSS重复的问题。

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    foo: path.resolve(__dirname, 'src/foo'),
    bar: path.resolve(__dirname, 'src/bar'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

#### 模块（Module）的文件名配置项（`moduleFilename`）

使用 `moduleFilename` 选项，可以使用 chunk data 来自定义文件名。当处理多入口且希望从给定的入口/chunk 的文件名中获得更多控制权时非常有用。

下例中，用 `moduleFilename` 选项将生成的 CSS 输出到另一个目录中。

```js
new MiniCssExtractPlugin({
  moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`,
});
```

#### 长期缓存

若要长期缓存，可使用 `filename: '[contenthash].css'`，可选择加入 `[name]占位符`。

#### 移除排序警告

对于通过使用范围界定或命名约定来缓解CSS排序的项目，可以通过设置插件选项 `ignoreOrder: true` 来禁用CSS排序警告。

```js
new MiniCssExtractPlugin({
  ignoreOrder: true,
}),
```

#### 媒体查询插件

如果想从提取的CSS中提取媒体查询（因此移动用户不再需要加载台式机或平板电脑专用的CSS），可以使用以下插件之一：

- Media Query Plugin
- Media Query Splitting Plugin
