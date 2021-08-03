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

默认情况下，一个路由是否匹配，是比较路由 `path` 和当前浏览器访问的 URL 的位置信息 `location.pathname` 是否匹配。如果想让路由 `path` 和其他的位置信息进行比较，可以传递一个 `location` 对象。

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

#### `children: node` 要渲染的子元素

要渲染的子元素/组件

### `<Redirect>`

渲染 `<Redirect>` 将会立即导航到一个新位置。新位置将覆盖历史堆栈中的当前位置，就像服务器端重定向(HTTP 3xx)那样。

#### `to: string | object`

要重定向去的 URL 或 location 对象

```jsx
<Redirect to="/somewhere/else" />

{/* state 对象在目标组件中可以通过 props.location.state 访问 */}
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```

#### `push: boolean` 是否将重定向的覆盖当前记录改为添加一条记录，默认 `false`

当设为 `true` 时，不会在 `history` 中覆盖当前访问记录，而是在后面新增一条访问记录。

#### `from: string`

提供一个 URL 字符串，用于匹配来自那个路径，匹配到之后将立即重定向到 `to` 提供的路径。

注意：带 `from` 的 `<Redirect>` 组件只支持在 `<Switch>` 组件中使用。

```jsx
<Switch>
  {/* 如果访问 /old-path, 将立即被重定向到 /new-path */}
  <Redirect from="/old-path" to="/new-path" />
  <Route path="/new-path">
    <Place />
  </Route>
</Switch>

// 重定向时携带匹配的参数
<Switch>
  {/* 如果访问 /old-path/1, 将立即被重定向到 /new-path/1 */}
  <Redirect from="/users/:id" to="/users/profile/:id" />
  <Route path="/users/profile/:id">
    <Profile />
  </Route>
</Switch>
```

#### `exact: boolean` 是否使用精准匹配模式

注意：带 `exact` 的 `<Redirect>` 组件只支持在 `<Switch>` 组件中使用。

```jsx
<Switch>
  <Redirect exact from="/" to="/home" />
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

#### `strict: boolean` 是否启用严格模式

注意：带 `strict` 的 `<Redirect>` 组件只支持在 `<Switch>` 组件中使用。

```jsx
<Switch>
  <Redirect strict from="/one/" to="/home" />
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

#### `sensitive: boolean` 是否开启大小写敏感匹配，默认 `false`

设为 `true` 后，大小写完全一致时才会被匹配。

### `<Route>` 定义路由的组件

`<Route>` 组件可能是 React 路由器中最重要的组件，它最基本的职责是在其 `path` 属性值与当前 URL 匹配时呈现某些 UI 。

如果同一个组件同时被用作多个 `<Route>` 的子组件，React 会将其视为同一个组件实例，并且在路由变化之间组件的状态会被保留。如果不希望这样做，那么在每个路由组件中添加一个唯一的 `key` 值，将使 React 在路由更改时重新创建组件实例，而不是复用同一个组件实例。

待验证???

```jsx
{/* <About /> 组件同时用作两个 `<Route>` 的子组件
  路由在 /about 和 /aboutUs 中切换时，组件实例会被复用，而不会被重新创建
*/}
<Route path="/about">
  <About />
</Route>
<Route path="/aboutUs">
  <About />
</Route>
```

路由渲染方式

使用 `<Route>` 渲染内容的推荐方式是使用子元素，比如：

```jsx
<Route path="/about">
  <About />
</Route>
```

不过，还提供了一些其他方法可以使用 `<Route>` 渲染内容。额外提供这些方法主要是为了支持那些在引入钩子之前用早期 React Router 版本构建的应用。

- `<Route children> function` 如上介绍的推荐方式，使用子元素渲染组件。
- `<Route component>` 使用 `component` 属性渲染组件。
- `<Route render>` 使用 `render` 属性渲染组件。

这三种方式只应该选择一种使用，推荐使用 children 的方式来使用。如果同时存在，只按优先级渲染其中一项，三者的优先级： `children > component > render` 。

以上任意一种方式渲染组件时，该组件的 props 中都会被传入 `match`, `location`, `history` 这几个和路由相关的对象。

#### `component` 通过该属性传入一个组件

```jsx
const User = ({match, location, history} => {
  return <h2>username: {match.params.username}</h2>
})

// ...

<Route path="/user/:username" component={User} />
```

注意，当你使用 `component` 属性(而不是 `render` 或 `children` )传入路由组件时，路由系统会使用 `React.createElement()` 从给定的组件中创建一个新的 React 元素。这意味着，如果给 `component` 属性传入一个内联函数组件，每次渲染时都将会创建一个新组件。这会导致现有组件被卸载，新组件被挂载，而不仅仅是更新现有组件。当需要使用内联函数组件进行渲染时，请使用 `render` 或 `children` 属性传入。

#### `render: func`

`render` 属性很方便地用于内联函数组件渲染，而不是像 `component` 属性传入内联函数时需要重新挂载。

与使用`component` 属性接收内联函数会创建一个新的 React 元素不同，`render` 属性接收一个函数，以便在 `location` 匹配时调用。`render` 函数会被传入 `match`, `location`, `history` 这几个和路由相关的对象作为 props 的成员。

```jsx
<Route
  path="/user/:username"
  render={({match, location, history}) => {
    return <h2>username: {match.params.username}</h2>
  }}
/>
```

#### `children: function` 接收一个组件进行渲染

有时候，无论 `path` 值有没有匹配上当前所处位置, 都想进行渲染。在这些情况下，可以使用 `children` 属性。它的工作原理与 `render` 基本相同，唯一的不同就是无论是否匹配上它都会被渲染。

`children` 属性接收的组件也会被传入 `match`, `location`, `history` 这几个和路由相关的对象作为 props 的成员。除非路由无法匹配 URL，则 match 为 `null` 。这允许你根据路由是否匹配动态调整你的 UI 。

比如，如果路由匹配，我们将添加一个激活的 class 选择器：

```jsx
<Route
  path="/user"
  children={({ match }) => (
    <li className={match ? "active" : ""}>
      User
    </li>
  )}
/>
```

#### `path: string | string[]` 路径或路径组成的数组

传入合法的 URL 或由 URL 组成的数组。

如果 `<Route>` 组件没有传入 `path` 属性，那么这个组件将永远能够匹配上，相当于永远会被渲染出来。


#### `exact: boolean` 是否开启精准匹配，默认 `false`

开启时，`path` 值必须和 `location.pathname` 精准匹配(除大小写以外完全一致)。

比如 `path="/one"`, 当前 `location.pathname` 为 `/one/two`, 精准匹配开启时不会被匹配上，但默认情况下没有开启精准匹配，所以会被匹配上。

#### `strict: boolean` 是否开启严格模式，默认 `false`

是否严格匹配路径的尾斜线，开启时，`/one/` 和 `/one` 无法匹配。

#### `location: object` 位置对象

默认情况下，一个路由是否匹配，是比较路由 `path` 和当前浏览器访问的 URL 的位置信息 `location.pathname` 是否匹配。如果想让路由 `path` 和其他的位置信息进行比较，可以传递一个 `location` 对象。

如果一个包裹在 `<Switch>` 中的 `<Route>` 匹配上了 `<Switch>` 的 `location` 属性或当前访问的 `history` 的 `location` 对象，那么传递给 `<Route>` 的 `location` 属性会被 `<Switch>` 使用的 `location` 覆盖。

#### `sensitive: boolean` 是否启用大小写敏感，默认 `false`

开启后，`/One` 和 `/one` 将不匹配。

### `<Router>` 低级别组件

所有路由组件的通用底层接口。通常情况下，应用程序应该使用以下这些高级路由组件：

- `<BrowserRouter>`
- `<HashRouter>`
- `<MemoryRouter>`
- `<NativeRouter>`
- `<StaticRouter>`

使用低级的 `<Router>` 组件，最常见的用例是将自定义历史与像 Redux 或 Mobx 这样的状态管理库同步。注意，与 React Router 一起使用状态管理库并不是必需的，它只是用于深度集成。

`<Router>` 组件接收 `history: object` 和 `children: node` 两个属性。

```jsx
<Router history={history}>
  ｛/* children */｝
  <App />
</Router>
```

### `<StaticRouter>` 一个不改变位置的 `<Router>`

这在服务器端渲染的场景中非常有用，因为此时用户并没有实际点击，所以位置实际上不会改变，所以它叫做 static 。它在简单测试中也很有用，比如当您只需要插入一个 location 并对渲染输出进行断言时。

下面是一个示例，Node 服务端为 `<Redirect>`发送 302 状态码，为其他请求发送常规HTML。

```jsx
import http from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

http
  .createServer((req, res) => {
    // This context object contains the results of the render
    const context = {}

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>,
    )

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      })
      res.end()
    } else {
      res.write(html)
      res.end()
    }
  })
  .listen(3000)
```

#### `basename: string` 基础路径

基础 URL。当应用程序放置于服务器上子目录中时，可以设置，比如 `/public` 。

```jsx
<StaticRouter basename="/calendar">
  {/* 渲染为 <a href="/calendar/today"> */}
  <Link to="/today"/>
</StaticRouter>
```

#### `location: string | object` 位置信息

- string 类型，服务器接收到的 URL，在 Node 服务器可能是 `req.url` 。
- 对象类型，像是 `{ pathname, search, hash, state }` 这样的对象

```jsx
<StaticRouter location={req.url}>
  <App />
</StaticRouter>

<StaticRouter location={{ pathname: "/bubblegum" }}>
  <App />
</StaticRouter>
```

#### `context: object` 上下文对象

一个普通 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。

当 `<Route>` 匹配时，它将把 `context` 对象传递给这个组件，作为 `staticContext` 属性渲染。查看服务器呈现指南以获得更多关于如何自己完成此操作的信息。

更多详情查看 [server-rendering](https://reactrouter.com/web/guides/server-rendering)

渲染之后，可以使用这些属性来配置服务器的响应。

```jsx
const context = {}
<StaticRouter context={context}>
  <App />
</StaticRouter>
```

#### `children: node` 子节点

### `<Switch>` 仅渲染第一个匹配的组件

渲染能和当前访问的位置信息 `location` 匹配的第一个 `<Route>` 或 `<Redirect>` 子元素。

这对于动画过渡也很有用，因为匹配的 `<Route>` 被渲染在与前一个路由相同的位置。

#### `location: object` 用来与子路由的 path 做匹配的对象

当不想用当前访问的位置信息与路由的 path 做匹配时，手动传入一个 `location` 对象即可。

如果 传入一个 `location` 对象给 `<Switch>` ，将同时覆盖匹配到的 `<Route>` 的 `location` 属性。

#### `children: node` 子节点，通常是若干个 `<Route>` 或 `<Redirect>`

### generatePath 一个生成路径的函数

可以使用 `generatePath` 函数为路由生成 URL 。函数内部使用了 `path-to-regexp` 库。

接收两个参数：

- 第一个为正则 pattern 字符串
- 第二个为参数对象，包含 pattern 中要使用的相应参数，如果提供的参数和路径不匹配，将抛出一个错误。

```jsx
import { generatePath } from "react-router";

generatePath('/user/:id/:entity(posts|comments)', {
  id: 1, // pattern 需要的 id 参数
  entity: 'posts', // pattern 需要的 entity 参数
})

// 返回 /user/1/posts
```

将路径编译为正则表达式的结果会被缓存，因此使用相同 pattern 模式生成多个路径不会带来额外的开销。

### `history`

在本文档中，术语 `history` 和 `history object` 指的是 [history](https://github.com/ReactTraining/history) 依赖包，它是 React Router (除了React本身)仅有的两个主要依赖项之一，它提供了几种不同的实现，用于在不同的环境中管理 JavaScript 中的会话历史。

还有这些术语：

- `browser history` 一个特定于 DOM 的实现，在支持 HTML5 history API的 web 浏览器中很有用。
- `hash history` 用于遗留的旧 web 浏览器的，特定于 DOM 的实现，基于 Hash 来改变 URL 。
- `memory history` 一个内存中的 history 实现，在测试和非 DOM 环境(如 React Native )中很有用

历史对象通常具有以下属性和方法：

- length - (number) 历史堆栈中的条目数
- action - (string) 当前的动作 (是 PUSH, REPLACE, 还是 POP)
- location - (object) 当前位置对象，有以下属性：
  - pathname - (string) URL 路径
  - search - (string) 查询字符串
  - hash - (string) URL 哈希片段
  - state - (object) 这个位置被推入堆栈时，提供给 `push(path, state)` 的特定位置状态。仅在 `browser history` 和 `memory history` 中可用。
- push(path, [state]) - (function) 将一个新条目推入历史堆栈
- replace(path, [state]) - (function) 替换历史堆栈上的当前条目
- go(n) - (function) 将历史堆栈中的指针向前或向后移动 n 项
- goBack() - (function) 等同于 `go(-1)`
- goForward() - (function) 等同于 go`(1)`
- block(prompt) - (function) 阻止导航 (详情查看 [history docs](https://github.com/ReactTraining/history/blob/master/docs/blocking-transitions.md))

`history` 对象是可变的。因此，建议从 `<Route>` 的 `render` 属性中访问 `location` 对象，而不是从 `history.location` 。这确保了你对 React 的假设在生命周期钩子中是正确的。例如:

```jsx
class Comp extends React.Component {
  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged =
      this.props.location !== prevProps.location;

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged =
      this.props.history.location !== prevProps.history.location;
  }
}

<Route component={Comp} />;
```

### location

`location` 代表了应用程序现在所处的位置、以及你想让它去的地方，甚至是它过去的位置。它看起来是这样的:

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere',
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

路由会在这些地方提供一个 `location` 对象：

- Route `component` 中的 `this.props.location`
- Route `render` 中的 `({ location }) => ()`
- Route `children` 中的 `({ location }) => ()`
- `withRouter` 中的 `this.props.location`

它也可以在 `history.location` 访问到，但你不应该使用它，因为它不是固定指向某一个 `location` 对象，`history.location` 随时可能变为指向另一个 `location` 对象。

`location` 对象永远不会改变，所以你可以在生命周期钩子中使用它来确定什么时候导航，这对数据获取和动画非常有用。

你可以为以下导航的使用时，提供 `location` 对象而不是字符串：

- `<Link>` 的 `to` 属性
- `<Redirect>` 的 `to` 属性
- `history.push`
- `history.replace`

一般情况下提供路径的字符串即可，但是如果你想要添加一些“位置状态（location state）”，当应用程序返回到那个特定的位置时可用时，使用 `location` 对象就会很有用。

```jsx
// 一般情况，使用字符串即可
<Link to="/somewhere"/>

// 提供 location 对象
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

最后，还可以将 `location` 对象传递给以下组件的 `location` 属性：

- `<Route location={location}>`
- `<Switch location={location}>`

这将阻止他们使用路由器状态下的实际位置。这对于动画和挂起的导航很有用，或者当你想让组件在不同的位置呈现时。

### `match` 对象

`match` 对象包含关于 `<Route path>` 如何匹配 URL 的信息。`match` 对象包含以下属性：

- `params` - (object) 对应 `path` 匹配到的参数组成的键值对，比如 `path=/user/:id` 和 `/user/1` 时，`params` 为 `{ id: 1}`
- `isExact` - (boolean) 如果 `path` 和整个URL(没有尾随字符)精准匹配上，值则为 `true`
- `path` - (string) path 的匹配部分，当需要嵌套 `<Route>` 时非常有用。
- `url` - (string) URL 的匹配部分。 当需要嵌套 `<Route>` 时非常有用。

你可以在不同的地方匹配对象：

- Route `component` 中的 `this.props.match`
- Route `render` 中的 `({ match }) => ()`
- Route `children`  中的 `({ match }) => ()`
- `withRouter` 中的 `this.props.match`
- `matchPath()` 的返回值
- `useRouteMatch()` 的返回值

如果一个 `<Route>` 定义时没有提供 `path` 属性，它总是会匹配，将获得离得最近的父组件的 `match` 对象。`withRouter` 也是如此。

#### 空匹配

即使一个 `<Route>` 的 `path` 属性和当前位置没有匹配上，提供给 `<Route>` 的 `children` 属性的函数也会被调用，在这种情况下，`match` 对象将是 `null` 。

此小节待完善...

### `matchPath()` 函数

这允许您使用与 `<Route>` 在正常渲染周期之外使用的相同的匹配代码，比如在服务器上渲染之前收集数据依赖项。

```js
matchPath(pathname: string, props: object): match
```

- `pathname` 第一个参数是您想要匹配的路径名。如果你在服务器上使用 Node.js ，它将是 `req.path` 。
- `props` 第二个参数是要匹配的属性组成的对象，它们与 `<Route>` 接受的属性相同。它也可以是一个字符串或字符串数组作为{path}的快捷方式:
- 返回值为一个 `match` 对象

```js
import { matchPath } from "react-router";

const match = matchPath("/users/2", {
  path: "/users/:id",
  exact: true,
  strict: true
});



/*

match 对象：

{
  isExact: true
  params: {
      id: "2"
  }
  path: "/users/:id"
  url: "/users/2"
}
*/

// 第一个参数和第二个参数对象中的 path 不匹配时，返回 null
matchPath("/users", {
  path: "/users/:id",
  exact: true,
  strict: true
});

//  null

```

### `withRouter()` 函数

使用 `withRouter(SomeComponent)` 将一个非路由组件连接到路由系统，返回一个 “连接组件”， 以便于在这个非路由组件中访问离自己最近的父路由的 `match`, `location`, `history` 等 props 对象的成员。

```jsx
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    // 本组件不是路由组件，但被包装后依然可以访问这些成员
    const { match, location, history } = this.props;

    return <div>You are now at {location.pathname}</div>;
  }
}

// 使用 withRouter() 包装一个非路由组件
const ShowTheLocationWithRouter = withRouter(ShowTheLocation);
```

注意：不像 React Redux 的 `connect` 订阅状态会监听到变化，`withRouter()`  不会监听到 `location` 对象的变化。相反，在位置更改从 `<Router>` 组件传播出去之后重新渲染。这意味着 `withRouter` 不会在路由转换时重新渲染，除非它的父组件重新渲染。

`withRouter()` 返回的连接组件有 `WrappedComponent` 和 `wrappedComponentRef` 两个成员：

#### WrappedComponent

```jsx
// MyComponent.js
export default withRouter(MyComponent)

// MyComponent.test.js
import MyComponent from './MyComponent'
// 包装组件 MyComponent 暴露了一个静态属性 WrappedComponent，该属性可用于隔离测试组件。
render(<MyComponent.WrappedComponent location={{...}} ... />)
```

#### wrappedComponentRef

`wrappedComponentRef` 属性接收一个函数，将传递一个 ref 给这个函数。

```jsx
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething();
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => (this.component = c)} />
    );
  }
}
```

## Native 应用 react-router-native

[react-router-native](https://reactrouter.com/native/guides/quick-start)
