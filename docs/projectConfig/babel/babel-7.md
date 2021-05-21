# babel

## 安装、运行

### 安装

推荐项目内安装，不推荐全局安装

```bash
npm i -D @babel/cli @babel/core # 安装命令行工具、核心模块
npx babel -V # 查看版本号
```

### 运行

```bash
# -o => --out-file
# -d => --out-dir

npx babel src -d dist # 整个目录编译
npx babel src -d dist -w # 整个目录编译并监听变化

npx babel src/index.js -o dist/index.js
npx babel src/index.js -o dist/index.js -w


npm i -D @babel/preset-env # 安装官方预设的转换环境
npm i -S @babel/polyfill # 安装新 API 的转换工具，注意是生产环境依赖

touch .babelrc | babel.config.js # 根目录新建babel配置文件，.babelrc各版本可用，babel.config.js V7推出
vim .babelrc | babel.config.js 编辑配置文件

```

```js
// .babelrc
{
  "presets": [],
  "plugins": []
}
```

```js
// babel.config.js

const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      }
    },
  ],
];
const plugins = [];
module.exports = { presets, plugins };
```

> 在webpack中使用 `babel-loader` 时，也会自动查找并使用此配置文件

```js

module: {
    rules: [
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }
    ]
}

```

`@babel/preset-env` 的一些配置参数

```js
  ["env", {
        "targets": { //指定要转译到哪个环境
            //浏览器环境
            "browsers": ["last 2 versions", "safari >= 7"],
            //node环境
            "node": "6.10", //"current"  使用当前版本的node

        },
         //是否将ES6的模块化语法转译成其他类型
         //参数："amd" | "umd" | "systemjs" | "commonjs" | false，默认为'commonjs'
        "modules": 'commonjs',
        //是否进行debug操作，会在控制台打印出所有插件中的log，已经插件的版本
        "debug": false,
        //强制开启某些模块，默认为[]
        "include": ["transform-es2015-arrow-functions"],
        //禁用某些模块，默认为[]
        "exclude": ["transform-es2015-for-of"],
        //babel / preset-env处理polyfill的方式。
        //参数：usage | entry | false，默认为false.
        "useBuiltIns": false
 }]

```

`targets` 参数的其他配置

```js
// 浏览器版本指定
targets: {
    edge: "17",
    firefox: "60",
    chrome: "67",
    safari: "11.1",
}

// 支持市场份额超过5%的浏览器
"targets": {
  "browsers": "> 5%"
}

// 或
// 支持最后两个版本的浏览器以及IE7+
"targets": {
   "browsers": ["last 2 versions", "ie >= 7"]
}
```

`useBuiltIns: 'entry' | 'usage' | false` 参数含义

```bash
entry: # 在引用程序入口导入一次babel / polyfill，多次导入可能会有全局冲突或其他问题。
usage：# 由于polyfill包很臃肿，将检查所有代码，以查找目标环境中缺少的功能，并仅包含所需的 polyfill。
false：# 不要为每个文件自动添加polyfill，也不要将“@ babel / polyfill”导入到单个polyfill。
```

#### 编译项目

编写完代码后，运行命令行

```bash
npx babel src/index.js -o dist/index.js -w
```

或添加到`package.json` 脚本命令

```js
// package.json
{
  "scripts": {
    "dev": "npx babel src/index.js -o dist/index.js -w",
    "build": "npx babel src/index.js -o dist/index.js"
  },
}
```

#### 使用 @babel/polyfill

在应用入口直接import引入

```js
import "babel-polyfill";
```

在 `webpack.config.js`中，将 `abel-polyfill` 加到 entry 数组中：

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
}
```

和`preset-env`预设配合，按照平台的支持情况引入所需的`polyfill`模块

```js
const presets = [
    ["@babel/env", {
        targets: {
            node: '0.10.42',
        },
        useBuiltIns: 'usage'
    }]
];
```

#### `@babel/runtime` `@babel/plugin-transform-runtime`

- `@babel/runtime` 就是用于提出来公共的包，但是提出来之后，代码并不会自己会引用这些包。
- `@babel/plugin-transform-runtime` 所以我们需要这个包来自动引用公共函数。
首先安装

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

`@babel/runtime`不需要配置，由`@babel/plugin-transform-runtime`引用，所以添加后者到 `plugins`

```js
// .babelrc
{
  "presets": [],
  "plugins": ["@babel/plugin-transform-runtime"]
}

```
