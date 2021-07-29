# React Router

[toc]

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
  useRouteMatch, // 返回当前路由匹配对象，{ isExact: true, params: {}, path: '/about', url: '/about' }
  useHistory, // 返回 history 实例对象，可用于路由跳转
  useLocation, // 返回当前路由相关位置信息 location 对象， { hash, key, pathname, search, state }
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

 `exact` 表示精准匹配，意思是路由的 `path` 必须和 URL 完全匹配才会被渲染，可以在所有需要精准匹配的路由上，都加上这个属性，但嵌套路由通常不能添加此属性。

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

这一段代码渲染了一个无序列表，分别是 `/`, `/about`, `/users` 这三个链接。不管路由切换到哪个 URL，这个无序列表会一直显示在页面最上方。

因为在根组件 `<BrowserRouter>` 内部，路由 `<Route>` 定义在这个无序列表的下方，所以，对应的组件也只会在这个无序列表的下方渲染，这就让路由的嵌套变得非常简单。

因此，`<Route>` 和普通的组件可以互相嵌套，以满足页面只有部分区域进行切换的功能。

嵌套路由示例：

```jsx
import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>

const UpdateUserInfo = () => <h3>修改个人信息</h3>
const UpdatePassword = () => <h3>修改密码</h3>

const Users = () => {
  const match = useRouteMatch()
  return <div>
    <h2>Users</h2>
    <ul>
      <li>
        <Link to={`${match.path}/updateUserInfo`}>修改个人信息</Link>
      </li>
      <li>
        <Link to={`${match.path}/updatePassword`}>修改密码</Link>
      </li>
    </ul>
    <Switch>
      <Route path={`${match.path}/updateUserInfo`}>
        <UpdateUserInfo />
      </Route>
      <Route path={`${match.path}/updatePassword`}>
        <UpdatePassword />
      </Route>
    </Switch>
  </div>
}

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

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```

### 主要组件

React Router中有三大类组件：

- routers (路由)，比如 `<BrowserRouter>` 和 `<HashRouter>`
- route matchers (路由匹配组件)，比如 `<Route>` 和 `<Switch>`
- navigation (导航组件)，也叫做 route changers, 比如 `<Link>`, `<NavLink>` 和 `<Redirect>`

使用任何组件之前，都需要从 `react-router-dom` 中导入。

#### routers 路由

每个 React Router 应用程序的核心都应该是一个路由组件。对于 web 项目，`react-router-dom` 提供了 `<BrowserRouter>` 和 `<HashRouter>` 路由器。两者之间的主要区别在于它们存储URL和与web服务器通信的方式。

- `<BrowserRouter>`, 使用普通（没有 `#` 符号）的的 URL 路径，但是这种模式下需要正确配置服务器的路由映射，具体来说，web 服务器需要在 React Router 客户端管理的所有 url 上提供相同的页面。Create React App 在开发环境下，默认支持这种模式，开箱即用无需配置，并附带了如何配置生产服务器的说明。

- `<HashRouter>`, 哈希路由，将当前位置存储在 URL 的 Hash 部分( `#` 号后)，因此 URL 看起来类似于 `http://example.com/#/your/page` 。由于哈希从未发送到服务器，这意味着不需要特殊的服务器配置。

要使用 Router ，只需确保它渲染在元素节点树的根节点上。通常情况下，你会将顶层的 `<App>` 元素包装在 Router中，像这样：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

const App = () => <h1>Hello React Router</h1>

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)
```

#### Route Matchers 路由匹配组件

路由匹配组件包括 `<Switch>` 和 `<Route>` 。当渲染 `<Switch>` 时，它搜索它的子元素 `<Route>` ，以找到路径与当前 URL 匹配的元素。当它找到一个时，就会渲染这个 `<Route>` 并忽略所有其他的 `<Route>` 。这意味着应该将具有更长的路径的 `<Route>` 放在较短的路径的 `<Route>` 之前。

如果没有 `<Route>` 匹配， `<Switch>` 则什么都不会渲染(`null`)。

```jsx
    <Switch>
      {/* 如果访问的 URL 是 /about, 这个路由将被渲染，其他路由将被忽略 */}
      <Route path="/about">
        <About />
      </Route>

      {/* 注意这两个路由的排序，更明确的路由 /user/:id 在 /user 之前
        这样，当查看一个 id 为 5 的用户时，访问 /user/5，就可以先匹配到 <User>
        当查看所有用户时，不带参数访问 /user 即可 */}
      <Route path="/user/:id">
        <User />
      </Route>
      <Route path="/user">
        <AllUser />
      </Route>

      {/* 如果之前的路由都没有渲染任何东西，这条路由充当后备路由。
        注意： path="/" 永远会匹配任何 URL，因为所有 URL 都以 / 开头
        这样是为什么要将此路由放在最后的原因 */}
      <Route path="/">
        <Home />
      </Route>
    </Switch>
```

注意，上例说到 `path="/"` 永远会匹配任何 URL，因为所有 URL 都以 `/` 开头，实际上，路由匹配默认是 开头匹配 模式，`path` 无论是什么路径，只要和 URL 的开头一致，就会被匹配到，这通常不是我们想要的结果，解决这个问题有两种方案：

1. 将更长的 path 的路由放在前面，更短的放在后面，比如 `/about` 在 `/` 前面，`/user/info` 在 `/user` 前面。
2. 如果要将更短的 path 的路由放在前面，那么在这个 `<Route>` 上添加 `exact` 属性即可，表示精准匹配，而不是开头匹配。

注意：尽管 React Router 支持在 `<Switch>` 之外渲染 `<Route>` 元素，但是从5.1版本开始，我们推荐你使用 `useRouteMatch` 钩子来代替。另外，我们不建议你渲染一个没有路径的 `<Route>` ，而是建议你使用一个钩子来访问你需要的任何变量。

#### Navigation (Route Changers) 路由导航组件

React Router 提供了以下组件用于路由导航：

- `<Link>`, `<Link>` 组件用来在应用程序中创建链接。当你渲染 `<Link>` 时，一个 `<a>` 元素将会在你的 HTML 文档中被渲染。
- `<NavLink>`, 这是 `<Link>` 的一种特殊类型，当它的 `to` 属性匹配当前位置时，它可以将自己设置为 `active` 状态 。
- `<Redirect>`, 在任何需要强制导航(重定向)的时候使用。当 `<Redirect>` 呈现时，它将使用它的 `to` 属性来进行导航。

```jsx
{/* 渲染为 <a href="/">Home</a> */}
<Link to="/">Home</Link>

{/*
  访问 /about 时, 渲染为：
  <a href="/about" className="active">about</a>
  访问其他 URL 时，渲染为：
  <a href="/about">about</a>
*/}
<NavLink to="/about" activeClassName="active">About</NavLink>

{/* 在 User 组件内使用 Redirect 组件 */}
<Link to="/user">User</Link>
```

上面例子中，使用了 `<Link>` 和 `<NavLink>`，这两个组件都会渲染为 `<a>` 元素，都是用于渲染可点击跳转的文本按钮的。

另外一个组件 `<Redirect>` 不会渲染任何节点，只用于重定向功能，一旦 `<Redirect>` 在任何位置被渲染，程序就会立即发生跳转，跳转到 `to` 属性指定的路径。

```jsx
const User = () => <h2><Redirect to="/" /></h2>
```

在 `<User>` 组件中使用了 `<Redirect to="/" />` 重定向到首页 `/` ，所以在点击 `<Link to="/user">User</Link>` 时，页面实际上会被重定向到 `/` 页面，而永远到不了 `/user` 页面。也就是访问 `/` 和 `/user` 是完全一样的效果。

### Server Rendering 服务端渲染

查看 [Server Rendering](https://reactrouter.com/web/guides/server-rendering)

### Code Splitting 代码分割

查看 [Code Splitting](https://reactrouter.com/web/guides/code-splitting)

### Scroll Restoration 滚动恢复

查看 [Scroll Restoration](https://reactrouter.com/web/guides/scroll-restoration)

### Hooks

React Router附带了一些钩子，可以让你访问路由器的状态，并在组件内部执行导航。

请注意:你需要使用 React 16.8 及以上的版本才能使用这些钩子!

- useHistory
- useLocation
- useParams
- useRouteMatch

#### useHistory

`useHistory()` 钩子返回 `history` 实例，可以使用 `history` 实例进行导航。

```jsx
import { useHistory } from 'react-router-dom'

const HomeButton = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/home')
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  )
}
```

#### useLocation

`useLocation()` 钩子返回表示当前 URL 的 `location` 对象。可以把它想象成一个 `useState` ，它在 URL 更改时返回一个新 `location` 对象。

比如需要做页面统计时，可以用来获取当前在应用中所处的位置信息，获取当前的路径。

```jsx
const usePageViews = () => {
  const location = useLocation()
  React.useEffect(() => {
    ga.send(['pageview', location.pathname])
  }, [location])
}

const App = () => {
  // 在应用加载时使用，路由切换时，就会触发 location 对象变化。
  usePageViews()
  return <Switch>...</Switch>
}
```

#### useParams

`useParams()` 返回一个 URL 参数的键值对组成的对象。相当于 `useroutmatch().params` 对象，也就是，`useParams() === useRouteMatch().params` 返回 `true` 。

比如定义的路由其中之一为：

```jsx
<Route path="/user/:id/:name">
  <User />
</Route>
```

访问 URL 为 `/user/5/tom` 时，在 `<User>` 组件中获取：

```jsx
const User = () => {
  const match = useParams()
  console.log('match', match) // { id: '1', name: 'tom' }
  return <h2>User</h2>
}
```

#### useRouteMatch

`useroutmatch()` 钩子尝试以与 `<Route>` 相同的方式匹配当前 URL 。它主要用于访问匹配数据，而不实际呈现 `<Route>` 。

- 不传入任何参数时，返回当前 `<Route>` 的匹配对象
- 可传入一个参数，与 `matchPath()` 函数接收的第二个参数相同，可以是一个字符串或对象

比如：

```jsx
const match1 = useRouteMatch()

const match2 = useRouteMatch('/blog/:slug')

const match3 = useRouteMatch({
  path: '/BLOG/:slug/',
  strict: true,
  sensitive: true,
})
```

### `<BrowserRouter>`

一个路由组件，它使用 HTML5 的 history API (pushState, replaceState 和 popstate 事件)来保持你的 UI 与 URL 同步。

路由组件应该将整个应用包裹起来，它接收的属性有：

```jsx
<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</BrowserRouter>
```

`<BrowserRouter>` 路由组件的所有属性都是可选的：

#### `basename: string`

基础 URL。当应用程序放置于服务器上子目录中时，可以设置，比如 `/public` 。

```jsx
<BrowserRouter basename="/calendar">
  {/* 渲染为 <a href="/calendar/today"> */}
    <Link to="/today"/>

  {/* 渲染为 <a href="/calendar/tomorrow"> */}
    <Link to="/tomorrow"/>
</BrowserRouter>
```

#### `getUserConfirmation: function`

用于确认导航的函数。默认使用 `window.confirm` 。

```jsx
<BrowserRouter
  getUserConfirmation={(message, callback) => {
    // 这是默认行为
    const allowTransition = window.confirm(message);
    callback(allowTransition);
  }}
/>
```

#### `forceRefresh: boolean`

如果为 `true` ，路由器将在页面导航中使用整个页面刷新。您可能希望使用它来模拟传统的服务器呈现应用程序在页面导航之间刷新整个页面时的工作方式。

#### `keyLength: number`

指定 `location.key` 的长度，默认为 `6` 位.

#### `children: node`

要渲染的子元素。

注意：在React 16 以下的版本中，每个组件必须使用单个根元素，因为渲染方法不能返回多个根元素。如果需要多个元素，可以尝试将它们包装在一个额外的 `div` 中。

### `<HashRouter>`

这是 React Router 提供的另一个路由组件，它使用 URL 的哈希部分(`window.location.hash`)来保持 UI 与 URL 同步。

注意：使用 `<HashRouter>` 将不支持 `location.key` 和 `location.state`。在之前的版本中，我们尝试过填充行为，但有些边缘情况我们无法解决。任何需要这种行为的代码或插件都无法工作。由于 `<HashRouter>` 仅用于支持遗留的旧浏览器，我们鼓励您配置服务器以配合使用 `<BrowserHistory>` 。

- `basename: string`, 同 `<BrowserRouter>` 的 `basename`。
- `getUserConfirmation: function`, 同 `<BrowserRouter>` 的 `getUserConfirmation`。
- `hashType: string`, Hash 编码类型，可选值 `'slash'(默认) | 'noslash' | 'hashbang'` 。
- `children: node`, 同 `<BrowserRouter>` 的 `children: node`。

`hashType` 的可选值意义：

- `slash`, 创建像 `#/`, `#/user/1` 这样的 hash 地址，默认值。
- `noslash`, 创建像 `#`, `#user/1` 这样的 hash 地址
- `hashbang`, 创建像 `#!/`, `#!/user/1` 这样的 ajax crawlable(已被 Google 遗弃) 的 hash 地址

### `<Link>`

用于定义可访问的导航链接。

#### `to: string | object | function`

- 字符串形式的 URL 链接地址，比如 `/user`, `/user?id=1`。
- 一个对象，包含 `pathname`, `search`, `hash`, `state` 属性。
- 一个回调函数，会接收当前位置的 `location` 对象作为参数，返回值必须是 `location` 对象或一个字符串路径。

```jsx
<Link to="/courses?sort=name" />

<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>

// 返回 loacion 对象
<Link to={location => ({ ...location, pathname: "/courses" })} />

// 返回字符串
<Link to={location => `${location.pathname}?sort=name`} />
```

#### `replace: boolean` 是否替换当前访问记录

当为 `true` 时，单击链接将替换历史堆栈中的当前记录，而不是添加一个新记录。

```jsx
<Link to="/courses" replace />
```

#### `innerRef: function | RefObject`

从 React Router 5.1 开始，如果你正在使用 React 16 ，你不应该需要这个属性，因为我们将 ref 转发到底层的 `<a>` 。应该使用普通的 `ref` 代替。

允许访问组件的基础引用。

```jsx
// innerRef 属性值是函数
<Link
  to="/"
  innerRef={node => {
    // node 是挂载的 DOM 节点的引用，未挂载时为 null
  }}
/>

// innerRef 属性值是 React.createRef() 的返回值 (RefObject)
let anchorRef = React.createRef()
<Link to="/" innerRef={anchorRef} />
```

#### `component: React.Component`

如果你想使用自己的导航组件，你可以通过 `component` 属性来传递。

```jsx
const FancyLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>💅 {props.children}</a>
))

<Link to="/" component={FancyLink} />
```

#### 传递其他属性给渲染后的 `<a>` 元素

还可以传递其他属性给渲染后的 `<a>` 元素，如 `title`, `id`, `className` 等。

### `<NavLink>`

`<Link>` 的一个特殊版本，当它与当前 URL 匹配时，它将向呈现的元素添加样式属性。

```jsx
// 和 `<link>` 一样使用
<NavLink to="/about">About</NavLink>
```

#### `activeClassName: string` 激活时的 class 选择器类名，默认为 `'active'`

当激活(`to` 属性与当前 URL 匹配)时，会将这个 class 选择器名添加到元素上，默认值为 `'active'`

```jsx
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>
```

#### `activeStyle: object` 激活时的样式对象

当激活时要应用的 CSS 样式对象。

```jsx
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```

#### `exact: boolean` 是否开启精准匹配模式

当为 `true` 时，只有在位置完全匹配时才会表现为激活状态。

```jsx
<NavLink exact to="/profile">
  Profile
</NavLink>
```

#### `strict: boolean` 是否开启严格模式

当为 `true` 时，在确定位置是否与当前 URL 匹配时，将考虑位置路径名的末尾斜杠。有关更多信息，请参阅 `<Route strict>` 文档。

开启后，`/events/` 和 `/events` 不会匹配。

```jsx
<NavLink strict to="/events/">
  Events
</NavLink>
```

#### `isActive: function`

一个函数，用于添加额外的逻辑，以确定链接是否处于激活状态。如果您想做的不仅仅是验证链接的路径名是否与当前 URL 的路径名匹配，那么应该使用此方法来返回 `true` 或 `false`。

```jsx
<NavLink
  to="/events/123"
  isActive={(match, location) => {
    if (!match) {
      return false;
    }

    // only consider an event active if its event id is an odd number
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
```

#### `location: object`

`isActive` 默认是比较当前浏览器访问的 URL 的位置信息。如果想和其他的位置进行比较，可以传递一个 `location` 对象。

#### `aria-current: string` 默认 `'page'`

在活动链接上使用的aria-current属性的值。可选值：

- `page`, 用于指示一组分页链接中的链接，默认值。
- `step`, 用于指示基于步骤的流程的步骤指示符中的链接
- `location`, 用于指示作为流程图的当前组件而在视觉上突出显示的图像
- `date`, 用于指示日历中的当前日期
- `time`, 用于指示时间表内的当前时间
- `true`, 用于指示 NavLink 是否激活
- `false`, 用于防止辅助技术对当前链接作出反应(用例是防止在单个页面上出现多个 aria-current 标记)

### `<Prompt>` 从 React Router 核心的 Prompt 重新导出

从 React Router 核心的 Prompt 重新导出

### `<MemoryRouter>`

一个路由组件，在内存中保存你的 URL 的历史(不对地址栏进行读或写)。在测试和 React Native 等非浏览器环境中非常有用。

```jsx
<MemoryRouter
  initialEntries={optionalArray}
  initialIndex={optionalNumber}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</MemoryRouter>
```

#### `initialEntries: array`

历史堆栈中的位置信息组成的数组。这些位置信息可能是带有 `{pathname, search, hash, state}` 的对象，或字符串 URL 。

```jsx
<MemoryRouter
  initialEntries={["/one", "/two", { pathname: "/three" }]}
  initialIndex={1}
>
  <App />
</MemoryRouter>
```

#### `initialIndex: number`

初始位置在 `initialEntries` 数组中的索引。

#### `getUserConfirmation: function` 确认导航的函数

用于确认导航的函数。当使用 `<MemoryRouter>` 和 `<Prompt>` 时，必须使用此选项。

#### `keyLength: number` 指定 `location.key` 的长度，默认为 `6` 位

指定 `location.key` 的长度，默认为 `6` 位.

#### `children: node` 要渲染的子元素。

要渲染的子元素。

### `<Redirect>`

### `<Route>`

### `<StaticRouter>`

### `<Switch>`

### generatePath

### history

### location

### match

### matchPath

### withRouter


## Native 应用 react-router-native

[react-router-native](https://reactrouter.com/native/guides/quick-start)
