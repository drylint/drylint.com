[toc]

# webpack_plugins

## `webpack.definePlugin`

在打包阶段定义全局变量

```js
new webpack.definePlugin({
    'myObj': { a: 1 },
    str: "'string'", // 字符串需要用两层引号包裹
    str: JSON.stringify('string'), // 字符串也可以使用此方式定义。
    isTrue: 'false', // 会自动去掉引号，就是 Boolean 类型。
})

```

## `webpack.HashedModuleIdsPlugin`

保持module id 稳定

## `webpack.webpack.NoEmitOnErrorsPlugin`

屏蔽错误，避免开发服务器因为报错而停止服务器。

## `webpack.ProvidePlugin`

自动在每个文件引入第三方库，在文件中则可直接使用而无需手动引入。但不会挂在 window 对象中。

```js
new webpack.ProvidePlugin({
    $: 'jquery'
})

```

## `copy-webpack-plugin`

帮助拷贝内容插件

## DLL 优化 `webpack.DllPlugin` `webpack.DllReferencePlugin`

第三方库通常不变，但打包时还会去处理这些库，优化即可先将第三方库先打包好，这样每次编译打包只需要打包业务代码，提升打包速度。

比如，项目引入的 `react`，`react-dom` 都使用插件提前打包

```js
// webpack.config.react.js

module.exports = {
    mode: 'production',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 打包后的输出变量名
    },
    plugins: [
        new Webpack.DllPlugin({
            name: '_dll_[name]', // name 值需与 library 值相同
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}

```

以上配置，将 `react`， `react-dom` 库作为入口，打包到 dist 目录中输出 `_dll_react.js` 以及文件 `manifest.js`

```js
new Webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'dist', manifest.json)
})

```

```html
<head>
    <script src="./dist/_dll_react.js"></script>
</head>

```

## `happypack` 第三方模块

```bash
npm install happypack -D
```

使用多线程优化打包速度，相当于使用 happypack 接管 loader。适用于 `module.rules` 中的各类型文件。

此处以 `.js` 文件为例，其他文件同理。

```js

const happypack = require('happypack')

module: {
    rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: 'happypack/loader?id=js', // 自定义一个 id 在插件中使用
        }
    ]
},
plugins: [
    new happtpack({
        id: 'js', // 匹配loader中定义的id
        use: [ // 然后再这里正式使用 loader
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    })
]

```

```js


```

## loader 简介

每一个 loader 其实本质就是一个方法（函数）。函数会接收要处理的文本内容作为参数。

```js
// 使用自定义 loader

{
    test: /.js$/,
    use: [
        {
            loader: 'babel-loader',
        },
        {
            loader: './my-loader.js', // 使用自定义 loader
        }
    ]
}

```

```js
// my-loader.js
module.exports = function (context) {
    return context.replace('bind', 'on')
}

```

## plugin 简介

例如：将所有文件中使用静态文件的相对路径 (例如：`'./static/imgs/q.png'`) 全部替换为静态资源服务器的路径 (`'www.xxx.com/imgs/q.png'`)

```js
const myPlugin = require('./my-plugin.js')

// ...

plugins: [
    new myPlugin()
]

```

```js
// my-plugin.js
const fs = require('fs')
const path = require('path')

class Index {
    // 每一个插件在配置使用时 new 之后，都会执行原型上的 实例方法 apply()
    // 在此方法中，对打包的某个生命周期进行监听
    // 生命周期含： done, emit, ...
    apply (compiler) {
        // compiler 就是整个打包器
        compiler.hooks.done.tap('changeStatic', (compilation) => {
            let context = compiler.options.context // 获取当前项目根路径的绝对路径
            let publicPath = path.resolve(context, 'dist')
            compilation.toJson().assets.forEach((ast) => {
                const filePath = path.resolve(publicPath, ast.name)
                fs.readFile(filePath, (err, file) => {
                    let newContext = file.toString().replace('./static', 'www.xxx.com')
                    fs.writeFile(filePath, newContext, () => {})
                })
            })
        })
    }
}

module.exports = Index
```

## 比如多页配置

```js
entry: {
    app: 'app.js',
    app2: 'app2.js',
    app3: 'app3.js',
    // ...
}

```

以上写法，页面多的话，每一个都要指定，并且新增一个就需要指定一个，太复杂。

自己写一个方法去遍历：

```js
function entryFunc () {
    // 遍历 src 下的所有页面并返回
}

module.exports = {
    entry: entryFunc()
}

```

使用现有的库 glob 中的 glob.sync() 方法

```bash
npm install glob -D
```

```js
const glob = require('glob')


entry: glob.sync(path.join(__dirname, './src/pages/*/index.js'))
```

## splitChunks 代码分割，抽离公用代码块

webpack4 内置，替代 webpack3 中使用频繁的 CommonsChunkPlugin 插件。

比如多页应用，抽离多页共用的公共代码。

比如多个页面同时使用 `test.js` 以及一些第三方包。

chunks 取值：

- `'async'` 异步引入的库进行分割，默认值
- `'initial'` 同步引入的库进行分割
- `'all'` 所有引入的库都进行分割。

```js
module.exports = {
    optimization: {
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 自定义命名
                    chunks: 'initial',
                    minSize: 0, // 最小大小为多少才抽离
                    minChunks: 2, // 最少使用多少次及以上才抽离
                },
                vendor: { // 自定义命名，用于抽离大的包
                    test: /node_modules/,
                    priority: 1, // 权重，不然会被前面的抽离而走不到这里。
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,

                }
            }
        }
    }
}

```

## copyWebpackPlugin

将一些不是项目中用到的目录文件打包到输出目录。

```js
let copyWebpackPlugin = require('copy-webpack-plugin')



plugins: [
    new copyWebpackPlugin([
        {
            from: 'myFiles', 要拷贝的目录
            to: './', // 拷贝到打包目录的位置
        }
    ])
]
```

## webpack.bannerPlugin 内置

自动生成比如打包文件顶部的版权声明（被注释的字符串）

```js
const webpack = require('webpack')



plugins: [
    new webpack.bannerPlugin('文字内容')
]
```

## webpack.IgnorePlugin 用于忽略某些东西的插件

```js

plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
]

```

moment库中默认会将所有语言的文件引入，打包将会非常大，使用此插件，表示如果从 moment 中 引入 了 `./locale` 则将它忽略。但忽略后如果要使用其中一项语言包，比如中文，则需要手动引入中文语言包。

```js
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

moment.locale()

```

webpack 在生产环境会自动执行 tree-shaking 以及 去掉多余代码

- tree-shaking  去掉没有使用到的代码，比如引入的对象中没用到的方法，变量等

- 去掉多余代码  

```js
let a = 1

let b = 2

let c = 3

console.log(a + b + c)

```

webpack执行后，判断出不需要去声明三个变量再使用他们相加，直接编译出

```js
console.log(6)
```

## 热更新插件

webpack.namedModulesPlugin

webpack.HotModuleReplacementPlugin

```js
plugins: [
    new webpack.namedModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() // 热更新插件
]

```
