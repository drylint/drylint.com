# React官方脚手架create-react-app

[toc]

[create-react-app官方文档](https://create-react-app.dev/docs/getting-started)

## 开始使用

```bash
# 创建项目，会创建一个自命名的项目目录
npx create-react-app <项目名称>

# 进入项目目录
cd <项目名称>

# 开始开发，以开发模式启动项目，默认地址为 http://localhost:3000/
npm start

# 开发完成后，以生产模式打包项目，用于发布上线
npm run build
```

不建议使用 `npm install -g create-react-app` 全局安装到本地，如果已安装，建议执行 `npm uninstall -g create-react-app` 进行卸载。

### 选择模版

默认情况下，创建的项目使用默认模版，如果想使用其他的模版，使用

```bash
npx create-react-app <项目名称> --template <模版名称>

# 比如，使用 typescript 项目模版
npx create-react-app my-app --template typescript

# 等同于
npx create-react-app my-app --template cra-template-typescript
```

项目模版都是使用 `cra-template-` 开头，但是在创建项目使用模版时，可以省略此前缀，[点击查看可用的模版](https://www.npmjs.com/search?q=cra-template-*)，默认的模版其实就是 `cra-template` 。

### 文件目录结构

默认模版创建项目后，目录结构是这样的：

```bash
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

以下文件必须存在：

- `public/index.html` 是页面模本；
- `src/index.js` 是入口文件。

其他文件都可修改或删除。

所有需要打包构建的项目代码都需要放在 `src` 目录内，可以在 `src` 目录内自行嵌套任意目录。

如果要在 `public/index.html` 中直接引用一些文件，则这些文件必须放在 `public` 目录内。

可以自己创建一些和 `src` 同级的顶级目录，这些目录不会被打包构建，比如用于存放文档。

### 支持的浏览器及功能

默认，在 `package.json` 中，有 `browserslist` 字段，默认值为：

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

可以自行修改以支持更多浏览器，也可以删除此字段，然后在根目录创建 `.browserslistrc` 文件来指定， [查看详情](https://github.com/browserslist/browserslist) 。

### 升级更新

Create React App 分为两个包：

- `create-react-app` 是用于创建新项目的全局命令行工具。
- `react-scripts` 是创建的项目中的开发依赖。

查看创建的项目中的 `package.json` 中的依赖包 `react-scripts` 的版本号，然后查看 [更新记录](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md) 来确认有哪些更新，直接将依赖包 `react-scripts` 的版本号改为更新记录中想要升级的版本号，然后执行 `npm install` 即可。

## 开发阶段相关配置

### ESLint 代码检查

项目默认提供了 `eslint-config-react-app` 基础 ESLint 配置，并且在 `package.json` 中的 `eslintConfig` 字段中继承使用了这个配置。

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
```

可以扩展基础 ESLint 配置，或者如果的确需要的话，可以完全替换它。

- 强烈建议扩展基本配置，因为删除它可能会引入难以找到的问题。
- 当使用 TypeScript 时，你需要为只针对 TypeScript 文件的规则提供一个覆盖对象。
- 需要注意的是，任何设置为 `'error'` 的规则都将阻止项目的构建。

点击查看[ESLint 详细使用文档](https://eslint.org/docs/user-guide/getting-started)

### 断点调试

#### 在 Visual Studio Code 中调试

在项目根目录下创建 `.vscode/launch.json` 然后写入：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

然后执行 `npm start` 启动开发服务器，然后按下 `F5` 启动 debug 模式。

### 开发模式下使用 HTTPS

#### 使用自签名证书

##### Windows (cmd.exe)

```bash
# 缺少空格是故意的
set HTTPS=true&&npm start
```

##### Windows (Powershell)

```bash
($env:HTTPS = "true") -and (npm start)
```

##### Linux, macOS (Bash)

```bash
HTTPS=true npm start
```

#### 使用自己的证书

要使用自己的证书开启 HTTPS，只需要在启动项目时，将证书和 key 的路径分别赋值给 `SSL_CRT_FILE` 和 `SSL_KEY_FILE` 即可，当然，依然必须要设置 `HTTPS=true` 才行。

```bash
# Linux, macOS (Bash)
HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key npm start
```

为了避免每次命令中设置 `HTTPS=true` ，可以修改 `package.json` 中的 `scripts`：

```json
{
  "start": "HTTPS=true react-scripts start"
}
```

或者，也可以在根目录创建 `.env` 文件，然后写入 `HTTPS=true` 。

## 样式和资源文件

### 增加 CSS 样式文件

项目使用 `webpack` 来处理所有资源文件，所以在项目中使用时，需要在 js 文件中使用 `import` 来导入资源文件。

比如，一个 `Button` 组件中有 `Button/index.css`, `Button/index.jsx` 文件：

`Button/index.css` 中有：

```css
.button {
  padding: 4px 12px;
}
```

在 `Button/index.jsx` 中使用样式：

```jsx
import React, { Component } from 'react'
import './index.css' // 导入样式

class Button extends Component {
  render() {
    // React 需要通过 className 代替 class 来使用样式
    return <button className="button">按钮</button>
  }
}

export default Button
```

这样组件就导入了 CSS 样式，如果想要导入全局生效的样式，可以在 `src/index.js` 中进行导入。

### CSS 模块化 限制作用范围

项目默认已经支持 CSS 模块化，只需要将 CSS 文件名改为以 `.module.css` 结尾即可，比如 `index.module.css` ，CSS 模块通过自动创建 `[filename]_[classname]__[hash]` 这样的唯一类名格式，来确定CSS作用的范围。

CSS 模块化后，允许你在不同的 CSS 文件中使用相同的 CSS 类名，而不用担心命名冲突。

`Button/index.module.css` 中有：

```css
.button {
  padding: 4px 12px;
}
```

在 `Button/index.jsx` 中使用 CSS 模块：

```jsx
import React, { Component } from 'react'
import styles from './index.module.css' // 导入模块样式

class Button extends Component {
  render() {
    // 通过 className 使用样式
    return <button className={ styles.button }>按钮</button>
  }
}

export default Button
```

导入 CSS 模块不再像普通导入一样，而是导入了一个对象，这里将导入对象命名为 `styles`，绑定到元素的 `className` 时，需要从这个对象中取对应的类名即可。

编译后的结果：

```jsx
<button class="Button_button__3NdPb">按钮</button>
```

所有 CSS 模块中的类名都会被编译为 `[filename]_[classname]__[hash]` 这样的格式，这样就避免了同名类名引起的样式冲突。

### 使用 CSS 预处理器

#### Sass/SCSS

为方便描述，本文统一使用 SCSS 。

首先，安装 sass 依赖包用于将 scss 文件编译为 css 。

```bash
npm install -D sass
```

然后将 `.css` 结尾的文件改为 `.scss` ，在 `.js` 文件的导入中同样将 `.css` 改为 `.scss` 结尾。

这样，项目就会自动将 scss 文件编译为普通的 css 文件。

SCSS 的详细使用请参考其他相关教程。

使用 less 和 stylus 基本一致，先安装编译依赖包，再修改文件名即可。

### 添加 CSS 重置

项目默认配置了 PostCSS Normalize 作为可选的项目重置方案，但是默认没有使用它。如果需要使用，可以在 `index.css` 或 `App.css` 中添加 `@import-normalize;` 语句表示启用它，只需要添加一次即可。

```css
/* index.css */

@import-normalize;
```

打包时，如果检测到 `@import-normalize;` 语句，就会自动添加 `Normalize` 到项目中。

这条语句在启用了 `stylelint` 的项目中会看到报错 `unknownAtRules` ，因为这条语句是一条未知的 `@语句`，解决此报错可查看 stylelint 文档。

### CSS 后处理

项目默认启用了 `post-css` 的 `Autoprefixer` 功能，能够为需要兼容的浏览器自动添加样式或属性的前缀，需要兼容的浏览器是通过 `browserslist` 配置的。

但是 CSS 的 `grid` 布局是没有开启自动添加前缀的，因为 `grid` 目前有很大的局限性，如果想启用自动添加前缀，可以在 css 文件的顶部添加 `/* autoprefixer grid: autoplace */` 来启用。

### 使用图片，字体，文件等

使用图片，字体等文件就和使用 CSS 一样，直接在 `.js` 中导入即可。

导入的文件经过处理后，最终其实会得到这个文件打包后的实际路径，然后给到 `<image>` 元素的 `src` 属性，或 `<a>` 元素的 `href` 属性。

对 `bmp, gif, jpg, jpeg, png` 来说，小于 `10000` byte 的文件将使用 base64 编码打包成 data URI ，`svg` 文件除外，因为这会导致 svg sprites （俗称雪碧图）出错。

示例：

```jsx
import React from 'react';
import logo from './logo.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

在 CSS 中使用同样生效：

```css
.Logo {
  background-image: url(./logo.png);
}
```

如果想修改 `10000` byte 的阈值，可以通过环境变量 `IMAGE_INLINE_SIZE_LIMIT` 来进行修改。

svg 文件的另一种使用方式，将 svg 作为一个 react 组件使用：

```jsx
import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <div>
      {/* Logo is an actual React component */}
      <Logo />
    </div>
  );
}
```

### 加载 `.graphql` 文件

详见[Loading .graphql Files](https://create-react-app.dev/docs/loading-graphql-files)

### 使用 public 目录

根目录下的 `public` 目录中包含了 `index.html` 文件，这是项目打包使用的模版文件，打包后的文件都是从这个 HTML 中引入并使用，可以按照自己的需求来修改这个文件。

#### 在 public 目录添加其他资源文件

虽然可以在 public 目录添加其他资源文件，但始终建议资源文件尽量在 `.js` 文件中引入使用，因为它有几个优点：

- 脚本和样式文件都会被压缩，并且被打包到一起，可以减少额外的网络请求。
- 缺少文件时，直接引发编译打包错误，而不是在运行时出现 404 错误。
- 打包后的资源文件名包括根据文件内容生成的散列值 (content hash)， 不需要担心浏览器会缓存旧版本。

如果把资源文件放到 `public` 目录中，这些文件不会被 webpack 处理，而是直接原封不动地复制到打包目录中，如果要在 `public/index.html` 直接使用 `public` 目录中的资源文件，需要使用环境变量 `PUBLIC_URL` 来访问。

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

运行 `npm run build` 打包时，`%PUBLIC_URL%` 将会被替换为一个正确的绝对路径。

在 `.js` 文件中也可以访问这个环境变量 `process.env.PUBLIC_URL`：

```jsx
render() {
  // Note: this is an escape hatch and should be used sparingly!
  // Normally we recommend using `import` for getting asset URLs
  // as described in “Adding Images and Fonts” above this section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

但非常不推荐上面这样的用法，这样使用将没有前面提到的通过导入使用的那些优点。

#### 可以使用 public 的情况

- 在构建输出中需要一个具有特定名称的文件，不希望被打包时修改资源文件名时。
- 有成千上万个图片，需要动态引用他们的路径时。
- 在打包构建的代码外，还想包含一些特定的脚本文件时。
- 有些库可能与 webpack 不兼容，你没有其他选择，只能将它包含为 `<script>` 标记时。

如果在 `index.html` 中添加了一个 `<script>` 引入一个脚本，且这个脚本会声明全局变量，可以通过访问 `window` 对象来使用它：

```js
const $ = window.$
```

如果不通过 `window` 对象而直接使用这个变量，在开启了 `eslint` 功能的项目中会进行报错，因为在当前作用域没有这个变量存在。

### 代码分割

代码分割可以让你将代码分割成小块，然后按需加载，而不是在用户使用之前下载整个应用程序。

项目支持使用 `import()` 来进行动态导入，只要是使用 `import()` 导入的模块，都会被分割为一个独立的模块，在执行到需要这个模块时，才会被下载使用。

模块 `moduleA.js` ：

```js
const moduleA = 'Hello';

export { moduleA };
```

在 `App.js` 中进行动态导入：

```jsx
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

上面的 `import('./moduleA')` 会使 `moduleA` 以及它左右的依赖打包成为一个独立的模块，只有在用户点击后，这个模块才会被下载。

`import()` 返回的是一个 `Promise` 对象，它总会 resolve 模块的命名空间对象，除了使用 `.then()` 来接收以外，还可以使用 `async` 和 `await` 来使用它。

#### 在 React Router 中使用代码分割

[点击查看](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)

## 构建应用

### 导入组件

虽然项目支持 `require()` 和 `module.exports` 用于导入导出模块或组件，但推荐始终使用 `import` 和 `export` 来进行导入和导出。

在 `src/views/home/index.jsx` 中导入 `src/components/Button` 组件

```jsx
import Button from '../../components/Button'
```

#### 使用绝对路径导入

根目录的 `jsconfig.json` 或 `tsconfig.json` 配置：

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

修改前面的导入路径：

```jsx
import Button from 'components/Button'
```

导入路径为 `'components/Button'`，会自动到 `src` 目录中来查找这个路径。

查看 [jsconfig](https://code.visualstudio.com/docs/languages/jsconfig) 详细介绍。

查看 [tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 详细介绍。

### 使用 TypeScript

```bash
# 新建项目时使用 TypeScript
npx create-react-app my-app --template typescript

# 在已创建的项目中添加 TypeScript
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

[查看 TypeScript Example on React](https://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=196#example/typescript-with-react)

### 使用 Router

```bash
npm install --save react-router-dom
```

[查看 react-router 使用方式](https://reactrouter.com/web/example/basic)

### 添加自定义环境变量

默认情况下，在项目中可以使用的环境变量有： `NODE_ENV` 以及其他以 `REACT_APP_` 开头的变量。

自定义环境变量必须以 `REACT_APP_` 开头，其他都将被忽略。

所有定义的环境变量都通过 `process.env` 对象来访问，比如定义了 `REACT_APP_BASE_URL` ，在项目中访问时使用 `process.env.REACT_APP_BASE_URL` 即可访问，项目在打包时会分析代码，自动将 `process.env.REACT_APP_BASE_URL` 替换为环境变量定义的值。

`process.env.NODE_ENV` 的值：

- 在 `npm start` 时值为 `'development'`
- 在 `npm test` 时值为 `'test'`
- 在 `npm run build` 时值为 `'production'`

无法手动复写 `NODE_ENV` 的值。

在 `public/index.html` 中，也可以通过 `REACT_APP_` 来访问变量，比如 `<title>%REACT_APP_WEBSITE_NAME%</title>` 。除了 `NODE_ENV` 和 `PUBLIC_URL` 等内置环境变量以外，其他变量必须以 `REACT_APP_` 开头。同样是在编译打包阶段进行值的替换。

环境变量通常定义在 `.env`, `.env.development`, `.env.production` 等文件中，另外，也可以定义在命令行运行时的命令中。

#### 在 `.env` 文件中定义环境变量

环境变量文件：

- `.env` 所有环境下的变量
- `.env.local`: 本地的，除 测试环境 以外的所有环境下的变量
- `.env.development`, `.env.test`, `.env.production` 特定的环境下的变量
- `.env.development.local`, `.env.test.local`, `.env.production.local` 本地的特定环境下的变量

运行模式及环境变量优先级：

- npm start 优先级 `.env.development.local`, `.env.local`, `.env.development`, `.env`
- npm run build 优先级 `.env.production.local`, `.env.local`, `.env.production`, `.env`
- npm test 优先级 `.env.test.local`, `.env.test`, `.env` (注意： `.env.local` 不会使用)

更多详情查看 [dotenv](https://github.com/motdotla/dotenv)

#### 在命令中定义环境变量

Windows (cmd.exe)

```bash
set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start
```

Windows (Powershell)

```bash
($env:REACT_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)
```

Linux, macOS (Bash)

```bash
REACT_APP_NOT_SECRET_CODE=abcdef npm start
```

#### 在 `.env` 文件中使用机器上的其他变量

此功能使用 [dotenv-expand](https://github.com/motdotla/dotenv-expand) 实现

比如，获取环境变量 `npm_package_version`：

```bash
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

也可以访问在前面定义的变量：

```bash
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

### 制作一个 Progressive Web App

[点击查看](https://create-react-app.dev/docs/making-a-progressive-web-app)

### 性能评估

在 `src/index.js` 的最后，项目默认添加了 `reportWebVitals()` 性能中继器，允许你使用不同的指标来衡量和分析应用程序的性能。

可以自己传递一个函数给 `reportWebVitals()` 作为参数来使用，比如：

```js
reportWebVitals(console.log);
```

Web Vitals是一组有用的指标，旨在捕捉用户体验的网页。

在 Create React App 中，使用第三方库 [web-vitals](https://github.com/GoogleChrome/web-vitals)来衡量这些 Web Vitals 指标


## 测试

[详情查看](https://create-react-app.dev/docs/running-tests)

## 后端相关

### 在开发模式下代理 api

在且仅在开发模式下，可以使用代理来解决服务端接口跨域的问题。

在 `package.json` 中添加 `proxy` 字段：

```json
"proxy": "http://localhost:4000"
```

设置代理后，访问 `/api/todos` 就会自动代理到 `http://localhost:4000/api/todos` 而不会出现跨域问题。

如果 `proxy` 使用起来不够用，可以自定义配置

#### 自定义代理配置

首先，安装：

```bash
npm install -D http-proxy-middleware
```

在 `src` 目录下创建 `setupProxy.js`：

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

- 不需要在任何地方导入这个 `setupProxy.js` 文件。当您启动开发服务器时，它将自动注册。
- 这个文件只支持 Node 模块语法。

[查看 http-proxy-middleware 详细使用方式](https://github.com/chimurai/http-proxy-middleware)

## 进阶用法

### 自定义项目模版

官方提供了 `cra-template` 和 `cra-template-typescript` 这两个模版可在项目初始化时选择，前者是默认的模版。

如果不满足于官方的模版，可以自定义模版，自定义模版必须以 `cra-template-` 开头，也可以在 npm 上搜索 `cra-template-*` 来查看更多第三方提供的自定义模版。

#### 构建自定义模版

构建自定义模版必须包含以下目录结构：

```bash
cra-template-[template-name]/
  README.md (for npm)
  template.json
  package.json
  template/
    README.md (for projects created from this template)
    gitignore
    public/
      index.html
    src/
      index.js (or index.tsx)
```

可以添加其他任何自己想要添加到模版的文件或目录，但以上指定的文件和目录必须存在。

本地测试自定义模版，使用 `file:` 路径作为 `--template` 的参数：

```bash
npx create-react-app my-app --template file:../path/to/your/template/cra-template-[template-name]
```

其中， `template` 目录下的所有文件，会在初始化创建项目时，直接全部复制到用户的项目目录中，`gitignore` 文件会被自动更名为 `.gitignore` 作为 Git 仓库的忽略文件的配置。

`template.json` 文件是自定义模版的配置文件，目前，仅支持 `package` 这一个属性（key）。

```json
{
  "package": {
    "dependencies": {
      "eslint-plugin-jsx-a11y": "^6.2.3",
      "serve": "^11.2.0"
    },
    "scripts": {
      "serve": "serve -s build",
      "build-and-serve": "npm run build && npm run serve"
    },
    "eslintConfig": {
      "extends": ["react-app", "plugin:jsx-a11y/recommended"],
      "plugins": ["jsx-a11y"]
    }
  }
}
```

`package` 属性允许添加任何键值对，这些键值对将会被添加到用户创建的项目的 `package.json` 中。

注意，`package` 下的 `dependencies` 和 `scripts` 会和 `create-react-app` 指定的默认值进行合并，其他指定的键值对将会原封不动地被使用，如果 `create-react-app` 存在同名默认键值对，也会被自己指定的所替换掉。

为了方便起见，如果用户使用 `yarn` 进行的项目初始化，那么，`package` 下的 `scripts` 和 `README.md` 中的所有 `npm run` 都将被替换为 `yarn` 。

### 能否使用 decorators (装饰器)

Create React App目前故意不支持装饰器语法，原因如下:

- 这是一个实验性的建议，可能会改变(事实上，它已经改变过一次，还会再改变)。
- 大多数库目前只支持该提议的旧版本——它永远不会成为标准。

然而，在许多情况下，您可以在不使用装饰器的情况下重写基于装饰器的代码，并获得相同的结果。

更多详情可查看 Github 的 Issues [#214](https://github.com/facebook/create-react-app/issues/214), [#411](https://github.com/facebook/create-react-app/issues/411)

当规范进展到稳定阶段时，Create React App将添加装饰器支持。

### 预渲染到静态HTML文件

如果使用静态托管提供程序托管构建，可以使用 `react-snapshot` 或 `react-snap` 为应用程序中的每个路由或相对链接生成HTML页面。

预渲染为 HTML 文件对搜索引擎优化（SEO）更友好。

### 进阶配置

您可以通过在命令行中或使用 `.env` 文件设置环境变量来调整各种开发和生产设置。

不需要像使用自定义环境变量那样在以下变量之前声明 `REACT_APP_` 。

#### `BROWSER` 开发环境，指定项目启动时打开的浏览器

开发环境：是

生产环境：否

可选值：`none` | 其他浏览器值

默认情况下，项目启动会自动打开系统默认浏览器，设为 `none` 可禁用自动打开浏览器。

该功能使用 [open](https://github.com/sindresorhus/open) ，详情可点击查看。

如果需要自定义浏览器的启动方式，则可以指定一个 Node 脚本。任何传递给 `npm start` 的参数也会被传递给这个脚本，你的应用服务的 url 将是最后一个参数。脚本的文件名必须是 `.js` 扩展名。

#### `BROWSER_ARGS` 开发环境，要传递给 BROWSER 的参数

开发环境：是

生产环境：否

当指定 `BROWSER` 环境变量时，设置到 `BROWSER_ARGS` 的任何参数都将传递给浏览器实例。支持多个参数作为空格分隔的列表。默认情况下，没有参数被传递给 `BROWSER` 。

#### `HOST` 开发环境，主机名

开发环境：是

生产环境：否

默认情况下，开发 web 服务器绑定到设备上的所有主机名(localhost 、 局域网网络地址等)。您可以使用此变量指定不同的主机。

#### `PORT` 开发环境，指定开发服务器的端口

开发环境：是

生产环境：否

默认情况下，开发 web 服务器将尝试监听端口 `3000` 或提示您尝试下一个可用端口。您可以使用此变量指定不同的端口。

#### `HTTPS` 开发环境，以 `https` 模式运行开发服务器

开发环境：是

生产环境：否

当设置为 true 时，Create React App 将以 `https` 模式运行开发服务器。

#### `WDS_SOCKET_HOST` 开发环境，指定自定义的 websocket 主机名

开发环境：是

生产环境：否

当设置时，Create React App 将运行开发服务器和一个自定义的 websocket 主机名，用于模块热更新。通常，webpack-dev-server 默认为 `window.location.hostname` 作为 SockJS 主机名。你可以使用这个变量同时在多个Create React App 项目上启动本地开发。更多细节请参见 [webpack-dev-server文档](https://webpack.js.org/configuration/dev-server/#devserversockhost)。

#### `WDS_SOCKET_PATH` 开发环境，指定自定义的 websocket 路径

开发环境：是

生产环境：否

当设置时，Create React App 将运行开发服务器，并带有一个自定义的 websocket 路径，用于模块热更新。通常，webpack-dev-server 默认为 `/sockjs-node` 作为 SockJS 路径名。你可以使用这个变量同时在多个 Create React App 项目上启动本地开发。更多细节请参见 [webpack-dev-server文档](https://webpack.js.org/configuration/dev-server/#devserversockpath) 。

#### `WDS_SOCKET_PORT` 开发环境，指定自定义的 websocket 端口

开发环境：是

生产环境：否

当设置时，Create React App 将运行开发服务器和一个自定义的 websocket 端口，用于模块热更新。通常，webpack-dev-server 默认为 `window.location.port` 作为 SockJS 端口。你可以使用这个变量同时在多个 Create React App 项目上启动本地开发。更多细节请参见 [webpack-dev-server文档](https://webpack.js.org/configuration/dev-server/#devserversockport) 。

#### `PUBLIC_URL` 开发&生产环境，指定服务器资源存放路径

开发环境：是

生产环境：是

Create React App 假定你的应用程序托管在 web 服务器的根目录或 `package.json` 中的 `homepage` 指定的路径中。通常，Create React App 会忽略主机名。您可以使用此变量强制将资产逐字引用到您提供的 url(包括主机名)。当使用 CDN 托管应用程序时，这会特别有用。

#### `BUILD_PATH` 生产环境，指定打包构建的存放目录，默认 `/build`

开发环境：否

生产环境：是

默认情况下，Create React App 会将编译后的资源输出到与 `/src` 同级的 `/build` 目录中。可以使用这个变量为 Create React App 指定一个新的路径来输出资源。`BUILD_PATH` 应该被指定为一个相对于项目根的路径。

#### `CI` 开发&生产环境，是否启用 CI 控制

开发环境：是

生产环境：是

当设置为 `true` 时，Create React App 将警告视为构建失败。它还使测试运行程序不具有监视性。大多数 ci 默认启用此功能。

#### `REACT_EDITOR` 开发环境，设置编辑器检测功能

开发环境：是

生产环境：否

当一个应用程序在开发中崩溃时，你会看到一个带有可点击堆栈跟踪的错误叠加。当你点击它时，Create React App 将尝试根据当前运行的进程来确定你正在使用的编辑器，并打开相关的源文件。设置此环境变量将覆盖自动检测。如果这样做，请确保系统 `PATH` 环境变量指向编辑器的 `bin` 目录。也可以将其设置为 `none` 以完全禁用它。

#### `CHOKIDAR_USEPOLLING` 开发环境，是否启用轮询进行热更新检测，默认 false

开发环境：是

生产环境：否

当设置为 `true` 时，监控器将根据需要在 VM 中以轮询模式运行。如果 `npm start` 没有检测到更改，请启用此选项。

#### `GENERATE_SOURCEMAP` 生产环境，是否生成生产环境下的 SOURCEMAP 源码映射，默认 true

开发环境：否

生产环境：是

当设置为 `false` 时，不会为生产构建生成源映射。这解决了一些较小机器上的内存不足(OOM)问题。

#### `INLINE_RUNTIME_CHUNK` 生产环境，是否将运行时嵌入到 `index.html` 中，默认 true

开发环境：否

生产环境：是

默认情况下，Create React App 会在产品构建期间将运行时脚本嵌入到 `index.html` 中。当设置为 `false` 时，脚本将不会被嵌入，并且将像其他脚本一样被导入。处理 CSP 时通常需要这样做。

#### `IMAGE_INLINE_SIZE_LIMIT` 生产环境，设置图片被转为 base64 编码的阈值，默认 `10000` (字节)

开发环境：否

生产环境：是

默认情况下，小于 `10000` Byte(字节)的图像在 base64 中被编码为一个 data URI，并内联在 CSS 或 JS 构建文件中。设置它以控制大小限制(以字节为单位)。将其设置为 `0` 将禁用图像内联。

#### `FAST_REFRESH` 开发环境，是否启用 FAST_REFRESH 快速刷新功能，默认 true

开发环境：是

生产环境：否

当设置为 `false` 时，禁用对 `Fast Refresh` 的实验性支持，以允许您实时调整组件而无需重新加载页面。

#### `TSC_COMPILE_ON_ERROR` 开发&生产环境，是否在 TypeScript 检测到类型错误时中断编译，默认 false

开发环境：是

生产环境：是

当设置为 `true` 时，即使存在 `TypeScript` 类型检查错误，你也可以运行并正确构建 TypeScript 项目。这些错误将在终端 和 浏览器控制台中作为警告打印出来。

#### `ESLINT_NO_DEV_ERRORS` 开发环境，是否禁用 ESLint 在开发环境下报告错误（只报告警告），默认 false

开发环境：是

生产环境：否

当设置为 `true` 时，ESLint 错误将在开发期间转换为警告。因此，ESLint 输出的错误信息将不再覆盖实际的页面。

#### `DISABLE_ESLINT_PLUGIN` 开发&生产环境，是否禁用 eslint-webpack-plugin

开发环境：是

生产环境：是

当设置为 `true` 时， `eslint-webpack-plugin` 将被完全禁用。

#### `DISABLE_NEW_JSX_TRANSFORM` 开发&生产环境，是否禁用 React 17 推出的新的 JSX 转换

开发环境：是

生产环境：是

当设置为 `true` 时，禁用 `React 17` 中引入的新的 JSX 转换，并将其反向移植到React `16.14.0` 、 `15.7.0` 和 `0.14.10` 。新项目将使用一个默认支持这个功能的 React 版本，但是如果你不能升级React，你可能需要在现有项目中禁用它。

### 弹出(eject)配置的替代方式

使用 `npm run eject` 弹出配置将允许您自定义任何内容，但从那一刻起，您必须自己维护配置和脚本。如果您有许多类似的项目，那么这可能会令人望而生畏。在这种情况下，我们建议 fork `react-scripts` 和您需要的任何其他包，而不是弹出。

查看这篇文章，[Customizing create-react-app: How to Make Your Own Template](https://auth0.com/blog/how-to-configure-create-react-app/) 了解如何自定义配置。

也可以查看这个 Issue [Document maintaining a fork of react-scripts as an alternative to ejecting #682](https://github.com/facebook/create-react-app/issues/682)
