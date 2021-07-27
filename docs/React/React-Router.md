# React Router

React Router 包括几个库（npm 包），`react-router` 是核心库，`react-router-dom` 和 `react-router-native` 都依赖于核心库，前者用于浏览器环境，后者用于 React Native 原生 App 开发环境。

- `react-router`: 实现了核心功能，用作下面几个包的运行时依赖项(peer dependency)。
- `react-router-dom`: 用于 React WEB 应用的路由依赖. 基于 react-router，加入了在浏览器运行环境下的一些功能，例如：`BrowserRouter` 和 `HashRouter` 组件，前者使用 `pushState` 和 `popState` 事件构建路由;后者使用 `window.location.hash` 和 `hashchange` 事件构建路由
- `react-router-native`: 用于 React Native 应用的路由依赖。基于 `react-router` ，加入了 `react-native` 运行环境下的一些功能
- `react-router-config`: 用于配置静态路由的工具库

`react-router-dom` 依赖 `react-router`，所以我们使用 npm 安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装 `react-router` 。npm 会自动解析 `react-router-dom` 包中 package.json 的依赖并安装。

基于浏览器环境的开发，只需要安装 `react-router-dom` 即可，基于 React Native 环境的开发，只需要安装 `react-router-native` 即可。

## WEB应用：react-router-dom

安装：

```bash
npm install react-router-dom
```

`react-router-dom` 中包含的成员有：

```js
import {
  BrowserRouter, // 路由根组件
  Switch, // 路由唯一匹配组件
  Route, // 路由
  Link, // 链接组件，最终渲染为 `<a>` 元素
  Redirect, // 重定向组件
  Prompt,
  StaticRouter,
  useParams, // 获取当前路由携带的参数
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom'
```

### 基础使用

先看一个示例：

```jsx
import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

export default function App () {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>

      {/* <Switch> 代表只渲染第一个匹配到当前 URL 的组件 */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```

如上示例代码，要使用路由系统，先用 `<BrowserRouter>` 作为根组件（根元素），将整个应用包裹起来，然后在其中，使用 `<Route>` 组件定义好路由，然后在应用代码中，使用 `<Link>` 组件作为链接，点击即可跳转到对应路由页面。

示例中，还用了 `<Switch>` 包裹了所有的 `<Route>` 组件，这样只会渲染一个路由，目的是找到第一个和当前访问的 URL 匹配的路由即可，不用继续往后匹配。如果不使用 `<Switch>`，所有和 URL 匹配到的路由都将被渲染到页面上。

如果去掉 `<Switch>` 的包裹，像下面这样：

```jsx
<Route path="/about">
  <About />
</Route>
<Route path="/users">
  <Users />
</Route>
<Route path="/">
  <Home />
</Route>
```

结果是，在访问 `/` 的时候，渲染了 `<Home>` 组件，看起来一切正常，但在访问 `/about` 的时候，不仅是匹配到了 `/about`， 还会继续往后匹配到 `/`，结果也渲染了 `<Home>` 组件，这样，页面就同时渲染了 `<About>` 和 `<Home>` 两个组件，访问 `/users` 时也同时渲染了 `<Users>` 和 `<Home>` 两个组件。

还有一个问题，示例中定义路由的顺序分别是 `/about`, `/users`, `/` , 其中代表首页的路由 `/` 是被最后定义的，看起来和习惯有点不符，通常是在最前面定义首页。

将 `/` 放到最前面试一试：

```jsx
<Switch>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/users">
    <Users />
  </Route>
</Switch>
```

结果页面上不管访问 `/about`, `/users` 还是 `/`，都只渲染了 `<Home>` 组件，也就是，`/` 会匹配到任何的 URL ，再加上 `<Switch>` 的限定，永远到只会匹配到 `/` 一个路由，然后永远都渲染的是 `<Home>` 组件。

这里如果将 `<Switch>` 移除，那么又会出现之前的问题，同时匹配到 `/` 和 `/about`，或同时匹配到 `/` 和 `/users`。

所以，如果又想将首页 `/` 放在最前面定义，又想加上 `<Switch>` 的限定用于只匹配一个路由，那么就需要一个路由组件的 `exact` 属性了。

```jsx
<Switch>
  <Route path="/" exact>
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/users">
    <Users />
  </Route>
</Switch>
```

结果是，在 `/` 的路由组件上，加上了 `exact` 后，访问 `/`, `/about`, `/users` 均能表现正常了。

 `exact` 表示精准匹配，意思是路由的 `path` 必须和 URL 完全匹配才会被渲染，可以在所有需要精准匹配的路由上，都加上这个属性。

```jsx
<Switch>
  <Route path="/" exact>
    <Home />
  </Route>
  <Route path="/about" exact>
    <About />
  </Route>
  <Route path="/users" exact>
    <Users />
  </Route>
</Switch>
```

回到最开始的示例中，在根组件 `<BrowserRouter>` 内部的一开始，有以下这样的代码：

```jsx
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/about">About</Link>
  </li>
  <li>
    <Link to="/users">Users</Link>
  </li>
</ul>
```

这一段代码渲染了一个无序列表，分别是 `/`, `/about`, `/users` 这三个链接。这个无序列表












