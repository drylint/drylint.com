# React 教程

[toc]

## demo01 最简易的示例

创建一个 `demo01.html`，放入下面的代码：

```html
<!-- demo01.html -->

<!DOCTYPE html>
<html>
<head>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js"
  ></script>
</head>
<body>
  <!-- 定义一个空的容器，就算不为空，在插入虚拟 DOM 时也会将其清空 -->
  <div id="app"></div>

  <script>
    const app = document.getElementById('app')
    ReactDOM.render('hello', app)
  </script>
</body>
</html>
```

然后在浏览器中打开这个文件，能够看到页面上已经渲染了文本 `hello`。

上例中，引入了 `React`, `ReactDOM` 这两个全局对象，调用了 `ReactDOM.render()` 方法，将文本 `hello` 渲染到了 `app` 节点中。

代码中没有看到 `React` 对象的使用，那为什么要引入呢？

因为它是 react 程序运行所必须的核心，后面会详细介绍并频繁用到 `React` 这个对象。

那 `ReactDOM` 又是什么呢？

## `ReactDOM`

`ReactDOM` 则是 React 剥离出的涉及 DOM 操作的部分，功能就是把生成的虚拟 DOM 渲染到文档中变成实际 DOM。

包含的方法：

- `render()` 将虚拟 DOM 渲染到真实 DOM 中的方法。
- `hydrate()`
- `unmountComponentAtNode()`
- `findDOMNode()`
- `createPortal()`

通常情况下，只需要了解 `render` 方法即可，其它方法基本可以忽略。

### `ReactDOM.render(element, container[, callback])`

- `element` 必填，React 生成的虚拟 DOM
- `container` 必填，页面中要用来渲染虚拟 DOM 的容器节点元素
- `callback` 可选，在组件被渲染或更新之后被执行。

在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。

通常只在顶层组件使用，也就是说，在一个单页应用中只会使用一次。

> `ReactDOM.render()` 会控制你传入容器节点里的内容。当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
>
> `ReactDOM.render()` 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。
>
> `ReactDOM.render()` 目前会返回对根组件 ReactComponent 实例的引用。 但是，目前应该避免使用返回的引用，因为它是历史遗留下来的内容，而且在未来版本的 React 中，组件渲染在某些情况下可能会是异步的。 如果你真的需要获得对根组件 ReactComponent 实例的引用，那么推荐为根元素添加 callback ref。
>
> 使用 `ReactDOM.render()` 对服务端渲染容器进行 hydrate 操作的方式已经被废弃，并且会在 React 17 被移除。作为替代，请使用 hydrate()。

`ReactDOM.hydrate(element, container[, callback])`

与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。

### `ReactDOM.unmountComponentAtNode(container)`

从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 `true`，如果没有组件可被移除将会返回 `false`。

### `ReactDOM.findDOMNode()` 已废弃

### `ReactDOM.createPortal(child, container)`

创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。

## demo02

在 `demo01` 中，我们渲染了最简单的文本到页面上，那如果要渲染其它元素呢？

```html
<!DOCTYPE html>
<html>
<head>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js"
  ></script>
</head>
<body>
  <div id="app"></div>

  <script>
    const app = document.getElementById('app')
    // 使用 React.createElement() 方法来生成一个虚拟 DOM 元素
    const ele = React.createElement('h1', {}, 'hello')
    // 将生成的虚拟 DOM 元素挂载到容器元素中
    ReactDOM.render(ele, app)
  </script>
</body>
</html>
```

上面代码中，和 `demo01` 不同的是，使用了 `React.createElement()` 方法来生成一个虚拟 DOM 元素（`<h1>hello</h1>`），然后再由 `ReactDOM.render()` 将其挂载到真实 DOM 容器上。

`React.createElement()` 是用来做什么的？

## `React.createElement(type, [props], [...children])`

创建并返回指定类型的 React 元素。

- `type` 要生成的元素类型(如：`div`，`h1`)，或 React 组件，或 React fragment。
- `props` 元素的属性，比如 `class`, `style` 等
- `children` 子节点，可以是任意子节点，相当于 `innerHTML`

注意： `children` 如果是多个子节点，可以用数组存放，但这也要求每个子节点 的 props 中必须有一个 `key` 属性，并且每个同级元素的 `key` 的值不能重复。否则会在控制台警告 `Each child in a list should have a unique "key" prop.`

```js
React.createElement('h1', {}, 'hello')
```

上面代码挂载到页面上是这样的：

```html
<h1>hello</h1>
```

下面是一个嵌套多个子节点的的例子：

```js
const app = document.getElementById('app')
const Title = React.createElement('h1', { key: 'title' }, '标题')
const Content = React.createElement('p', { key: 'content' }, '文章内容...')
const App = React.createElement('div', {}, [Title, Content])
ReactDOM.render(App, app)
```

挂载到页面上是这样的：

```html
<div>
  <h1>标题</h1>
  <p>文章内容...</p>
</div>
```

上面多次用到了 `React.createElement()` 这个方法，每次都写比较麻烦，可以先赋值给一个简单的变量：

```js
const e = React.createElement
const app = document.getElementById('app')
const Title = e('h1', { key: 'title' }, '标题')
const Content = e('p', { key: 'content' }, '文章内容...')
const App = e('div', {}, [Title, Content])
ReactDOM.render(App, app)
```

上面代码虽然简化了一点点，但比起平时写 HTML 元素来，依然太过于复杂，如果能像写 HTML 那样写就好了，那么能不能实现呢？

答案是肯定的，那就是使用 JSX 语法来书写。

JSX 是什么呢？

## JSX

先看一个 JSX 示例：

```jsx
const element = <h1>Hello, world!</h1>;
```

上面这个例子，前面声明变量看起来是在写 JavaScript ，但后面赋值的内容看起来又像 HTML，这种语法就被称为 JSX，它是 JavaScript 的语法扩展，具有 JavaScript 的全部功能。

在 React 中配合使用 JSX，可以很好地描述 UI 应该呈现出它应有交互的本质形式，所以这是 React 最推荐的写法（但不是必须），通常情况下，应尽可能使用 JSX 来代替 `React.createElement()` 。

其实，使用 JSX 编写的代码最终都将会被转换成使用 `React.createElement()` 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 `React.createElement()`，这一步就交给程序帮我们完成就行了。

当然，每个 JSX 元素只是调用 `React.createElement()` 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成，也就是使用 `React.createElement()` 完成。

在浏览器中直接书写 JSX 当然是行不通的，因为浏览器是不能识别这种语法的，那要怎么让浏览器识别 JSX 呢？

答案就是，引入一个 `@babel/standalone` 库，并将 `<script>` 的 `type` 属性值改为 `text/babel` 或 `text/jsx`。

`@babel/standalone` 是 Babel （[什么是 Babel？](https://babeljs.io/)）专为浏览器和其他非 node .js 环境提供的一个独立的构建版本，[查看详细介绍](https://babeljs.io/docs/en/babel-standalone.html)。

当 `@babel/standalone` 加载在浏览器中后，它将自动编译和执行所有脚本标签类型为 `text/babel` 或 `text/jsx` 的代码。

```html
<!DOCTYPE html>
<html>
<head>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.development.js"
  ></script>

  <!-- 引入 @babel/standalone  -->
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.12.6/babel.min.js"
  ></script>
</head>
<body>
  <div id="app"></div>

  <!-- type 需要更改为 text/babel 或 text/jsx -->
  <script type="text/babel">
    const App = <div>
      <h1>标题</h1>
      <p>文章内容...</p>
    </div>
    ReactDOM.render(App, document.getElementById('app'))
  </script>
</body>
</html>
```

注意：`@babel/standalone` 不包含 [polyfill](https://babeljs.io/docs/en/babel-polyfill) ，如果要在低版本浏览器中运行，可以在它之前引入在线 polyfill 。

```html
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill/browser.js"></script>

<!-- 引入 @babel/standalone 库  -->
<script
  crossorigin
  src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.12.6/babel.min.js"
></script>
```

```html
  <script
    src="https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"
  ></script>
  <script>
    // 此操作的原因是 @babel/standalone 中使用了旧的 String.prototype.trimRight 这个 api
    // 但是 polyfill 中没有实现这个已经被废弃的旧的 api，而是实现了新的 String.prototype.trimEnd
    String.prototype.trimRight = String.prototype.trimEnd
  </script>
  <!-- 引入 @babel/standalone 库  -->
  <script
    crossorigin
    src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.12.6/babel.min.js"
  ></script>
```

为了便于阅读，可以将 JSX 拆分为多行。同时建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱。

```js
const App = (
  <div>
    <h1>标题</h1>
    <p>文章内容...</p>
  </div>
)
ReactDOM.render(App, document.getElementById('app'))
```

### 在 JSX 中嵌入表达式

在 JSX 中嵌入表达式使用大括号 `{}` 包裹即可。

```js
const msg = 'hello'
const App = <div>{ msg }</div>

ReactDOM.render(App, document.getElementById('app'))
```

在 JSX 语法中，可以在大括号内放置任何有效的 JavaScript 表达式。例如：`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

#### JSX 也是一个表达式

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用（`React.createElement()`），并且最终运行后将返回一个 JavaScript 对象。

```js
const msg = 'hello'
const App = <div>{ msg }</div>
```

转变后是这样的：

```js
// 编写的代码
const App = (
  <div>
    <h1>标题</h1>
    <p>文章内容...</p>
  </div>
)

// 转换后的代码
var App = React.createElement(
  "div",
  null,
  React.createElement("h1", null, "\u6807\u9898"),
  React.createElement("p", null, "\u6587\u7AE0\u5185\u5BB9...")
);

```

```js
// 编写的代码
const title = '标题'
const content = '文章内容...'
const App = (
  <div>
    <h1>{ title }</h1>
    <p>{ content }</p>
  </div>
)

// 转换后的代码
var title = "标题";
var content = "文章内容...";
var App = React.createElement(
  "div",
  null,
  React.createElement("h1", null, title),
  React.createElement("p", null, content)
);
```

也就是说，可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```js
const getGreeting = username => username
  ? <h1>Hello, { username }</h1>
  : <h2>未登录</h2>;
```

由此可见，JSX 中可以用 `{}` 插入 JS 表达式，表达式中也可以返回 JSX，如此嵌套下去...，这也是使用 React 开发应用的核心。

#### JSX 元素属性与属性值

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

例如，JSX 里的 `class` 和写 JS 一样变成了 `className`，而 `tabindex` 则变为 `tabIndex`。

对于属性值，字符串和 HTML 中一样，使用引号包裹即可：

```js
const element = <div className="container"></div>
```

除了字符串以为的任何值，都应该用 `{}` 包裹，且不在外层写引号：

```js
const element = (
  <input
    disabled={ true }
    style={{
      color: '#666',
      marginBottom: '10px'
    }}
  />
)
```

上例中，`disabled={ false }` 表示传入了一个 `Boolean` 值，当然，这里是为了示范才这样写，实际上只需要写上 `disabled` 属性就表示 `true` 值了，不写则取默认值 `false`。

还可以看到，`style` 属性那里有两层大扩号，这其实表示传入了一个对象值。

#### JSX 防止注入攻击

可以放心安全地在 JSX 当中插入用户输入内容。因为 React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

## 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()` 。

```js
const render = () => {
  const App = (
    <div>
      { new Date().toLocaleString() }
    </div>
  )

  ReactDOM.render(App, document.getElementById('app'))
}

setInterval(render, 1000)
```

上面这段代码。每秒钟调用一次 `render` 方法，获取当前时间渲染到页面上，每次都是重新调用 `ReactDOM.render()` 方法重新渲染根节点。

其实，在实践中，大多数 React 应用只会在开始调用一次 `ReactDOM.render()`。之后都只是更新数据来更新页面。

我们来实现一个功能，页面有一个初始值为 `1` ，有一个按钮，点击一次将这个值加 `1` 并渲染到页面上，看下面代码能实现吗？

```js
const num = 1
const add = () => {
  ++num
}
const App = (
  <div>
    <p>{ num }</p>
    <button onClick={ add }>增加</button>
  </div>
)

ReactDOM.render(App, document.getElementById('app'))
```

结果，运行时报错 `"num" is read-only`。

这样实现不了需求，那要怎么实现呢？

这里就要用到 React 核心之一：组件（Component）。

## 组件 & Props

React 有两种创建组件的方式：

- 函数组件
- class 组件

注意： 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如 `<div>` 代表 HTML 的 div 标签，而 `<Hello>` 则代表一个组件，并且需在作用域内使用。

### 函数组件

定义组件最简单的方式就是编写 JavaScript 函数：

```js
const Hello = props => <div>hello, { props.num }</div>
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 `props` 对象（组件被调用时传入的所有属性组成的对象），并返回一个 React 元素。这类组件被称为函数组件，因为它本质上就是 JavaScript 函数。

```js
const Hello = props => <div>hello, { props.name }</div>

ReactDOM.render(
  <Hello name="Tom"/>,
  document.getElementById('app')
)
```

上面代码中，`<Hello name="Tom"/>` 就表示调用了 `Hello` 组件，并传入了属性对象 `{ name: 'Tom' }`，这个对象就会作为函数组件 `Hello` 的第一个参数传入，在 `Hello` 组件中，就通过 `props.name` 读取到传入的名字。

#### Props 的只读性

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

纯函数：不会更改入参，且多次调用下相同的入参始终返回相同的结果。

### class 组件

`React.Component` 是 `React` 提供的一个基类，class 组件必须继承这个基类。

```js
class Hello extends React.Component {
  render() {
    return <div>hello, { this.props.name }</div>
  }
}
```

class 组件必须提供一个 render 方法，方法必须返回 JSX。在这个方法中，可以通过 `this.props` 访问到接收到的属性对象。

下面代码渲染效果和之前的函数组件渲染效果一样。

```js
class Hello extends React.Component {
  render() {
    return <div>hello, { this.props.name }</div>
  }
}
ReactDOM.render(
  <Hello name="Tom"/>,
  document.getElementById('app')
)
```

但到目前为止都还没有实现之前想要的 “点击按钮加 1” 的功能

要实现这个功能，需要用到 class 组件的 `state` 来存储状态，用到事件处理来更改状态值。

#### state

`state` 表示组件内部的状态管理对象，`state` 中的值一旦被更改，就会自动触发视图更新。

`state` 对象除了拥有并设置了它的组件可以访问，其他组件都无法访问。

```js
class App extends React.Component {
  state = {
    num: 1,
  }
  render() {
    return (
      <div>
        <p>{ this.state.num }</p>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

`state` 中的值不能直接赋值修改，需要通过组件的实例方法 `setState()` 来修改。

```js
// 错误写法
this.state.num = 2

// 正确写法
this.setState({ num: 2 })
```

`state` 的更新会被合并，当调用 `setState()` 的时候，React 会将提供的对象合并到当前的 `state` 中。

还可以将 `state` 中的值当作其它组件的 props 传给其它组件访问：

```js
const Count = props => <div>{ props.num }</div>

class App extends React.Component {
  state = {
    num: 1,
  }
  render() {
    return (
      <div>
        <p>{ this.state.num }</p>
        <Count num={ this.state.num }/>
      </div>
    )
  }
}
```

#### 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

例如，传统的 HTML：

```js
<button onclick="add()">点击增加</button>
```

在 React 中略微不同：

```js
<button onClick={ add }>点击增加</button>
```

在 React 中另一个不同点是不能通过返回 `false` 的方式阻止默认行为。必须显式的使用 `preventDefault()` 方法 。

例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：

```js
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

在 React 中，可能是这样的：

```js
const ActionLink = () => {
  const handleClick = e => {
    e.preventDefault()
    console.log('The link was clicked.')
  }

  return (
    <a href="#" onClick={ handleClick }>Click me</a>
  )
}
```

使用 class 组件的时候，通常的做法是将事件处理函数声明为 class 中的实例方法。

```js
class App extends React.Component {
  state = {
    num: 1,
  }
  // 这里使用箭头函数绑定 this，确保函数中能正确访问 this
  add = () => {
    const { num } = this.state
    this.setState({
      num: num + 1
    })
  }
  render() {
    return (
      <div>
        <p>{ this.state.num }</p>
        <button onClick={ this.add }>增加</button>
      </div>
    )
  }
}
```

上面代码就实现了之前的需求：点击按钮加 1 的功能。

必须谨慎对待 JSX 回调函数中的 `this`，在 `JavaScript` 中，`class` 的方法默认不会绑定 `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

```jsx
class App extends React.Component {
  state = {
    num: 1,
  }
  handleThis () {
    // class 的实例方法不会自动绑定 this
    // 所以这里通过 onClick 访问不到实例 this
    console.log(this) // undefined
    console.log(this.state.num) // 报错
  }
  render() {
    return (
      <div>
        <button onClick={ this.handleThis }>Click</button>
      </div>
    )
  }
}
```

#### 访问 this 问题

解决方式一，像之前示例一样使用箭头函数：

```jsx
class App extends React.Component {
  state = {
    num: 1,
  }
  handleThis = () => {
    console.log(this) // App 的实例对象
    console.log(this.state.num) // 1
  }
  render() {
    return (
      <div>
        <button onClick={ this.handleThis }>Click</button>
      </div>
    )
  }
}
```

解决方式二，在初始化时绑定 `this`：

```jsx
    class App extends React.Component {
      constructor () {
        super()
        // 在初始化时绑定 `this`
        this.handleThis = this.handleThis.bind(this)
      }
      state = {
        num: 1,
      }
      handleThis () {
        console.log(this) // App 的实例对象
        console.log(this.state.num) // 1
      }
      render() {
        return (
          <div>
            <button onClick={ this.handleThis }>Click</button>
          </div>
        )
      }
    }
```

解决方式三，在调用时绑定 `this`：

```jsx
class App extends React.Component {
  state = {
    num: 1,
  }
  handleThis () {
    console.log(this) // App 的实例对象
    console.log(this.state.num) // 1
  }
  render() {
    return (
      <div>
        { /* 在调用时绑定 this */}
        <button onClick={ this.handleThis.bind(this) }>Click</button>
      </div>
    )
  }
}
```

解决方式四，不改变调用主体，依然通过实例去调用方法：

```jsx
class App extends React.Component {
  state = {
    num: 1,
  }
  handleThis () {
    console.log(this) // App 的实例对象
    console.log(this.state.num) // 1
  }
  render() {
    return (
      <div>
        { /* 在调用时增加一个匿名函数，函数中在通过实例 this 调用方法 */}
        <button onClick={ () => { this.handleThis() } }>Click</button>
      </div>
    )
  }
}
```

#### 向方法中传参

调用方法时，默认会将事件对象作为参数：

```jsx
class App extends React.Component {
  handleArguments = (e) => {
    console.log(e)
  }
  render() {
    return (
      <button onClick={ this.handleArguments }>Click</button>
    )
  }
}
```

传递参数：

```jsx
class App extends React.Component {
  handleArguments = (num, e) => {
    console.log(num, e)
  }
  render() {
    return (
      <button onClick={ e => this.handleArguments(1, e) }>Click</button>
    )
  }
}
```

也可以这样传递参数：

```jsx
class App extends React.Component {
  handleArguments = (num, e) => {
    console.log(num, e)
  }
  render() {
    return (
      { /* 事件对象 e 会默认作为第二个参数传递给函数 */ }
      <button onClick={ this.handleArguments.bind(this, 1) }>Click</button>
    )
  }
}
```

## 条件渲染

依据应用的不同状态，只渲染对应状态下的部分内容。

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 `if` 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

```jsx
const LogStatus = props => {
  if (props.loggedIn) {
    return <div>已登录</div>
  }
  return <div>未登录</div>
}

class App extends React.Component {
  state = {
    loggedIn: false,
  }
  render() {
    const { loggedIn } = this.state
    return (
      <div>
        <LogStatus loggedIn={ loggedIn } />
      </div>
    )
  }
}
```

完善一些逻辑：

```jsx
const LogStatus = props => {
  if (props.loggedIn) {
    return <div>已登录</div>
  }
  return <button>去登录</button>
}

class App extends React.Component {
  state = {
    loggedIn: false,
  }
  handleToggleStatus = (status) => {
    this.setState({
      loggedIn: !status,
    })
  }
  render() {
    const { loggedIn } = this.state
    return (
      <div>
        <LogStatus loggedIn={ loggedIn } />
        <button onClick={ this.handleToggleStatus.bind(this, loggedIn) }>
          { loggedIn ? '注销' : '登录' }
        </button>
      </div>
    )
  }
}
```

使用逻辑运算符简化：

使用 `&&`

```jsx
const LogStatus = props => props.loggedIn && <div>已登录</div>
```

使用 `三目运算符`

```jsx
const LogStatus = props => props.loggedIn
  ? <div>已登录</div>
  : <button>去登录</button>
```

在极少数情况下，你可能希望能隐藏组件，可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

```jsx
const LogStatus = props => props.loggedIn ? <div>已登录</div> : null
```

### 列表 & Key

通过使用 `{}` 在 JSX 内构建一个元素集合。

```jsx
class App extends React.Component {
  state = {
    numbers: [1, 2, 3, 4, 5]
  }
  render() {
    const { numbers } = this.state
    return (
      <div>
        {
          numbers.map(num => <li> { num } </li>)
        }
      </div>
    )
  }
}
```

上述代码已经在页面中渲染出了一个列表，只不过，我们打开控制台会看到有一个报错：`Warning: Each child in a list should have a unique "key" prop.` 。

意思是当你在列表中创建一个元素时，必须包括一个特殊的 `key` 属性。

先来认识一下这个 `key` 属性是什么？

#### key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串或数字。

现在来解决之前例子中的报错，给每一个元素加一个 key 属性：

```jsx
numbers.map(num => <li key={ num }> { num } </li>)
```

通常，如果可能，我们使用数据中的 id 来作为元素的 key 。

```jsx
personList.map(person => <li key={ person.id }> { person.name } </li>)
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 `index` 作为 key。

```jsx
numbers.map((num, i) => <li key={ i }> { num } </li>)
```

但是，如果列表项目的顺序可能会变化，则不应该使用索引来用作 key 值，这样会渲染出意料之外的页面。

另外，只应该且只需要在 `map()` 方法中返回的最外层元素上设置 `key` 属性，并且 key 只需要在这些最外层兄弟元素之间是唯一的。

## 表单

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。

### 受控组件

受控组件指受 React 控制的组件，也就是表单的数据是由 React 组件来管理，而不是由 DOM 来保存数据。

在 HTML 中，表单元素（如 `<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。

而在 React 中，可变状态（mutable state）通常保存在组件的 `state` 属性中，并且只能通过使用 `setState()` 来更新。

记住，对于受控组件来说，输入的值始终由 React 的 `state` 驱动。

#### input

```jsx
class App extends React.Component {
  state = {
    value: '',
  }

  handleOnChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <input type="text" value={ value } onChange={ this.handleOnChange } />
      </div>
    )
  }
}
```

上例中，将组件 `state` 中的 `value` 绑定到了 `<input>` 元素上，又给 `<input>` 元素绑定了 `onChange` 事件，每当输入时，`onChange` 触发 `handleOnChange` 方法，并将事件对象传入，在 `handleOnChange` 方法中取出输入值后，调用 `setState()` 方法更新 `state` 中 `value` 的值，程序又将新的 `value` 值渲染到页面上。

如果不绑定 `onChange` 事件，控制台会警告： `Warning: You provided a 'value' prop to a form field without an 'onChange' handler. This will render a read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set either 'onChange' or 'readOnly'.`

意思就是，你在表单上提供了 `value` 属性，但是没有绑定 `onChange` 事件，这会渲染一个只读表单，如果想要的是一个可改变但不更新 `state` 的表单，使用 `defaultValue` 代替 `value`，否则，绑定 `onChange` 事件或者设置显式的 `readOnly` 属性。

还有一种情况，如果给 `<input>` 提供的 `value` 属性值为 `null` 或 `undefined`，这时候不绑定 `onChange` 事件，输入框也不会是只读的。但通常不应该提供这两个值，如果初始值是空，应该提供空字符串。

#### textarea

在 HTML 中, `<textarea>` 元素的值，通过子文本节点元素定义：

```html
<textarea>
  你好， 这是在 text area 里的文本
</textarea>
```

而在 React 中，`<textarea>` 使用 `value` 属性代替。这样， `<textarea>` 和 `<input>` 的用法一致：

```jsx
class App extends React.Component {
  state = {
    value: '',
  }

  handleOnChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <textarea value={ value } onChange={ this.handleOnChange } />
      </div>
    )
  }
}
```

#### select

在 HTML 中，`<select>` 创建下拉选择列表，是否选中是通过 `<option>` 的 `selected` 属性来控制的：

```jsx
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>
```

React 并不会使用 `selected` 属性，会直接忽略 `selected` 属性，而是在根 `select` 标签上使用 `value` 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它

```jsx
class App extends React.Component {
  state = {
    value: 2,
    list: [
      { label: '女', value: 0 },
      { label: '男', value: 1 },
      { label: '保密', value: 2 },

    ],
  }

  handleOnChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }

  render() {
    const { list, value } = this.state
    return (
      <div>
        <select value={ value } onChange={ this.handleOnChange }>
          {
            list.map(item => (
              <option key={ item.value } value={ item.value }>{ item.label }</option>
            ))
          }
        </select>
      </div>
    )
  }
}
```

可以将数组传递到 `value` 属性中，以支持在 select 标签中选择多个选项：

```jsx
<select multiple value={ ['B', 'C'] }>
```

#### 处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

```jsx
class App extends React.Component {
  state = {
    input1: '',
    input2: '',
    select: 1,
    checked: true,
  }

  handleOnChange = (e) => {
    const { name, value, checked, type } = e.target
    const realValue = type === 'checkbox' ? checked : value
    this.setState({ [name]: realValue })
  }

  render() {
    const { input1, input2, select, checked } = this.state
    return (
      <div>
        <p>
          <input
            type="text"
            name="input1"
            value={ input1 }
            onChange={ this.handleOnChange }
          />
        </p>
        <p>
          <input
            type="text"
            name="input2"
            value={ input2 }
            onChange={ this.handleOnChange }
          />
        </p>
        <p>
          <select
            name="select"
            value={ select }
            onChange={ this.handleOnChange }
          >
            <option value={ 0 }>女</option>
            <option value={ 1 }>男</option>
          </select>
        </p>
        <p>
          <input
            type="checkbox"
            name="checked"
            checked={ checked }
            onChange={ this.handleOnChange }
          /> 是否选中
        </p>
      </div>
    )
  }
}
```

### 非受控组件

在大多数情况下，推荐使用 受控组件 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 `ref` 来从 DOM 节点中获取表单数据。

什么是 `ref` 将会在之后讲到。

```jsx
class App extends React.Component {
  constructor () {
    super()
    // 使用 React.createRef() 创建一个 ref
    this.myInput = React.createRef()
  }

  handleSubmit = () => {
    // 访问创建好的，已经关联的 ref.current 即可访问到 DOM 节点
    console.log(this.myInput.current) // input 节点
    console.log(this.myInput.current.value) // input 的输入值
  }

  render() {
    return (
      <div>
        { /* 将创建的 ref 关联到 ref 属性上 */ }
        <input type="text" ref={ this.myInput } />
        <button onClick={ this.handleSubmit }>Submit</button>
      </div>
    )
  }
}
```

如果想为非受控组件提供一个默认值，需要用到 `defaultValue` 属性，而不能使用 `value` 属性，因为之前讲到，提供了 `value` 就需要绑定 `onChange` 或设置 `readOnly` 属性。

```jsx
<input type="text" ref={ this.myInput } defaultValue="123" />
```

同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 `defaultChecked`，`<select>` 和 `<textarea>` 支持 `defaultValue`。

上例只是说明非受控组件有这样的用法，但完全不推荐将非受控组件用于普通表单元素。

非受控组件应该用于那些只能通过 DOM 访问元素值的元素，比如 `<input type="file">`

#### 文件 input 标签

在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 File API 进行控制。

```jsx
<input type="file" />
```

在 React 中，`<input type="file" />` 始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。

```jsx
class App extends React.Component {
  constructor () {
    super()
    this.myInput = React.createRef()
  }

  handleSubmit = () => {
    console.log(this.myInput.current.files) // 用户选中的文件数组
  }

  render() {
    return (
      <div>
        <input type="file" ref={ this.myInput } />
        <button onClick={ this.handleSubmit }>Submit</button>
      </div>
    )
  }
}
```

## 状态提升

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。

比如，有一个值，在两个组件中都可以去改变，在其中一个组件中修改了值后，另一个组件中也会同步显示修改后的值。

```jsx
class InputA extends React.Component {
  render () {
    const { value, handleOnChange } = this.props
    return (
      <div>
        <input type="text" value={ value } onChange={ handleOnChange } />
      </div>
    )
  }
}

class InputB extends React.Component {
  render () {
    const { value, handleOnChange } = this.props
    return (
      <div>
        <input type="text" value={ value } onChange={ handleOnChange } />
      </div>
    )
  }
}


class App extends React.Component {
  state = {
    value: '123',
  }

  handleOnChange = (e) => {
    const { value } = e.target
    this.setState({ value })
  }

  render() {
    const { state: { value }, handleOnChange } = this
    return (
      <div>
        <InputA value={ value } handleOnChange={ handleOnChange } />
        <InputB value={ value } handleOnChange={ handleOnChange } />
      </div>
    )
  }
}
```

上例中，将两个组件都要操作的值提升到它们的父组件中，父组件调用它们时，分别将这个值传入，并且传入一个修改这个状态值的方法，在两个子组件中，各自绑定这个值，并在更改时调用父组件提供的方法，统一完成修改操作。

至此，我们了解到，`props` 属性不仅可以传递数据，还可以传递方法，接下来还会了解更多可以传递的东西。

## 组合 vs 继承

在有些组件中，组件只提供一个容器，具体的内容需要在组件调用的时候传入，比如：弹层组件，弹窗组件，布局类组件等。

那要怎么实现呢，接下来以一个弹窗组件举例：

```jsx
<style>
  .dialog-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
  }
  .dialog-box > .content {
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 20px 5px #aaa;
    border-radius: 10px;
  }
</style>

<script type="text/babel">

class Dialog extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div className="dialog-box">
        <div className="content">
          { children }
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        这里是父组件的内容
        <Dialog children={
          <div>这里是要传入弹层的内容</div>
        } />
      </div>
    )
  }
}
</script>
```

就像例子中那么简单，只需要通过属性，就能够将 JSX 元素传入子组件，子组件直接拿这个属性放到自己的元素中渲染即可。

通过属性，可以传递 JSX 元素，也可以传递组件，包括函数组件和 class 组件。

可以通过多个属性传递 `JSX` 元素或 `组件` 到子组件中，子组件在多处渲染这些接收到的元素。

通过之前和本节的学习，我们了解到，通过 `props` 可以传递任意类型到子组件中，包括：基础类型，对象，数组，函数，JSX元素，函数组件，class 组件...等。

## Fragments

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

比如，下面这个组件中，使用了 `table` ，将 所有 `<td>` 元素抽离到另一个组件中。但是，组件不能直接返回多个 `<td>` 元素，需要使用一个唯一的根节点包裹，但一旦使用了如 `div` 这样的元素包裹，生成的 HTML 将无效，因为 `<tr>` 元素下面必须是 `<td>` 。

```jsx
class Columns extends React.Component {
  render() {
    return (
      // 需要使用唯一根节点
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    )
  }
}

class Table extends React.Component {
  render() {
    return (
      <table >
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>
    )
  }
}
```

上面的代码运行会收到浏览器（IE）警告 **标记不符合要求** 。

这里， `React.Fragment` 就排上了用场。

```jsx
class Columns extends React.Component {
  render() {
    return (
      // 使用 <React.Fragment> 作为唯一根节点
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}
```

`<React.Fragment>` 编译后会消失，这样，所有 `<td>` 元素就成为了 `<tr>` 元素的直接子元素。

`<React.Fragment>` 还有一种简写语法，看起来像空标签：

```jsx
class Columns extends React.Component {
  render() {
    return (
      //  <> 就是 <React.Fragment> 的简写
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    )
  }
}
```

`<>` 和 `<React.Fragment>` 唯一的区别就是， `<>` 不支持任何属性，包括 `key` 属性。

所以，当作为循环例表的根元素时，需要 `key` 属性，就不能使用简写形式。

```jsx
class App extends React.Component {
  state = {
    list: [
      { id: 1, name: '商品1', price: 15.5 },
      { id: 2, name: '商品2', price: 9.9 },
    ],
  }
  render() {
    return (
      <div>
        {
          this.state.list.map(item => (
            <React.Fragment key={ item.id }>
              <div>{ item.name }</div>
              <div>{ item.price }</div>
            </React.Fragment>
          ))
        }
      </div>
    )
  }
}
```

`key` 是目前唯一可以传递给 `Fragment` 的属性。未来可能会添加对其他属性的支持，例如事件。

## portal

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

就像是一道传送门，可以将一个子节点传送到任意的 DOM 节点下。

用法：

```js
ReactDOM.createPortal(child, container)
```

- 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
- 第二个参数（container）是一个 DOM 元素。

比如比较常见的全屏弹窗，正常情况下，在某个页面的表单组件中调用一个弹窗组件，这个弹窗组件挂载到 DOM 中就会是表单组件的子节点。

```jsx
class Dialog extends React.Component {
  render () {
    const { children } = this.props
    return <div>{ children }</div>
  }
}

class App extends React.Component {

  dialogContent = <div>这是要传入弹窗的内容</div>

  render() {
    return (
      <div>
        这里是父组件的内容
        <form>
          <Dialog children={ this.dialogContent }/>
        </form>
      </div>
    )
  }
}
```

但我们如果希望这个弹窗组件挂载到 `document.body` 中呢？

```jsx
class Dialog extends React.Component {
  render () {
    const { children } = this.props
    return ReactDOM.createPortal(
      <div>{ children }</div>,
      document.body
    )
  }
}
```

`ReactDOM.createPortal()` 就将第一个参数的内容挂载到了第二个参数指定的 DOM 节点中。

还可以不在组件中进行传送，而是在使用组件时再进行传送：

```jsx
<form>
  {
    ReactDOM.createPortal(
      <Dialog children={ this.dialogContent }/>,
      document.body
    )
  }
</form>
```

portal 只是将节点内容传送到真实 DOM 树中的任何节点位置，但也就仅此而已，在任何其他方面（比如冒泡，context上下文等），其行为和普通的 React 子节点行为一致。

比如上例中 `Dialog` 中的冒泡，并不会直接一步就到 `body` 上，而是和普通 React 节点一样，一层一层的往上冒。

## Refs & DOM

Refs 提供了一种方式，允许我们访问 `render()` 方法中创建的 React 元素挂载后对应的 DOM 节点。

在典型的 React 数据流中，`props` 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 `props` 来重新渲染它。

但是，在某些情况下，你需要在典型数据流之外强制修改子组件，或者强制调用子组件的方法。这个子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

何时使用 Refs：

- 管理焦点，文本选择或媒体播放。比如调用子组件的 `focus()` , `play()` 方法等。
- 触发强制动画。
- 集成第三方 DOM 库。

注意：能够通过 `props` 解决的就尽量不要通过 ref 去解决。

### 通过 `React.createRef()` 创建 ref

> `React.createRef()` 是 `React 16.3` 版本引入的 API。如果你正在使用 React 16.2 及以下的版本，应该使用后面讲到的使用回调函数的方式来创建 ref，将在后面讲到。

ref 可以使用 `React.createRef()` 创建，并附加到元素或组件的 `ref` 属性上完成对元素节点的引用。

在构造组件时，通常将创建的 ref 分配给实例属性，以便可以在整个组件中引用它。

```jsx
class App extends React.Component {
  // React.createRef() 创建 ref 并分配给组件的实例属性
  elementRef = React.createRef()
  render() {
    return (
      <div>
        { /* 将创建的 ref 赋值给元素的 ref 属性，即可完成对这个元素的引用 */ }
        <input ref={ this.elementRef } />
      </div>
    )
  }
}
```

`React.createRef()` 方法非常简单，其实就是返回了一个对象，对象里面有一个 `current` 属性默认值为 `null`，对目前版本来说，仅此而已。

所以上例还可以这样手动完成 ref 对象的创建：

```jsx
class App extends React.Component {
  // 相当于 elementRef = React.createRef()
  elementRef = {
    current: null,
  }
  render() {
    return (
      <div>
        <input ref={ this.elementRef } />
      </div>
    )
  }
}
```

React 会在组件挂载时给这个创建的 ref 对象的 `current` 属性赋值为目标 DOM 元素，并在组件卸载时又再次传入 `null` 值。ref 对象会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

所以，在组件内要访问这个 DOM 节点，使用 `this.elementRef.current` 即表示这个 DOM 节点。

```jsx
componentDidMount () {
  // 调用 DOM 节点的 focus 方法，让 <input> 元素一加载就自动获取焦点
  this.elementRef.current.focus()
}
```

ref 也可以用来引用一个 class 组件实例：

```jsx
class InputComponent extends React.Component {
  render () {
    return (
      <input type="text" />
    )
  }
}

class App extends React.Component {
  componentRef = React.createRef()
  render() {
    return (
      <div>
        { /* ref 属性用于 class 组件的实例 */ }
        <InputComponent ref={ this.componentRef } />
      </div>
    )
  }
}
```

引用一个组件时，引用的是这个 `class` 组件的实例，可以访问这个组件的实例属性和实例方法。但无法访问组件内部的任何元素节点。

注意，ref 无法引用一个函数组件，因为函数组件没有实例可以被引用。

```jsx
<FunctionComponent ref={this.componentRef} />

// 运行时报错：
// Function components cannot be given refs.
// Attempts to access this ref will fail.
// Did you mean to use React.forwardRef()?
```

上面代码试图用 ref 去引用一个函数组件，这是错误的，函数组件没有实例可以被引用。

当然，在函数组件内部依然是可以使用 ref 来引用组件内的元素的。

```jsx
function FunctionComponent() {
  const inputRef = React.createRef()
  const handleOnchange = () => {
    // 在 input 输入时，输入一次就会打印出当前 input 的值
    console.log(inputRef.current.value)
  }
  return <input ref={ inputRef } onChange={ handleOnchange } />
}
```

上面代码，在函数组件内部使用 ref，这是可以的。

如果父组件想控制子组件中的内部节点，可以这样来实现：

```jsx
class InputComponent extends React.Component {

  // 组件中还需要再使用 ref 去引用自己内部的元素节点
  inputRef = React.createRef()

  // 组件定义一个实例方法，供父组件调用
  focus = () => {
    this.inputRef.current.focus()
  }

  render () {
    return (
      <input ref={ this.inputRef } type="text" />
    )
  }
}

class App extends React.Component {
  componentRef = React.createRef()
  componentDidMount () {
    // this.componentRef.current 表示的是子组件实例
    // this.componentRef.current.focus() 调用的是子组件实例上的实例方法
    this.componentRef.current.focus()
}
  render() {
    return (
      <div>
        <InputComponent ref={this.componentRef} />
      </div>
    )
  }
}
```

在上面的代码中，通过继续向子组件添加 ref 实现了在父组件中控制子组件内部的节点。

虽然实现了需求，但这不是一个理想的解决方案，其实这是通过子组件作为中间人来实现的，而且，如果子组件是一个函数组件的话，也没法这样用，因为父组件引用不了函数组件。

我们希望，最好是不要子组件作为中间人，而是能够在父组件中直接引用子组件内部的节点元素。

其实，可以将 `React.createRef()` 创建的对象，作为其它普通属性名（只要不叫 `ref` 或 `key` 就行）直接传递下去，然后在子组件中将接收到的 ref 对象添加给目标 DOM 元素的 ref 属性。

```jsx
class InputComponent extends React.Component {
  render () {
    { /* 在目标元素使用父组件通过普通属性名传递下来的 ref */}
    return <input ref={ this.props.myRef } type="text" />

  }
}

class App extends React.Component {
  componentRef = React.createRef()
  componentDidMount () {
    this.componentRef.current.focus()
  }
  render() {
    return (
      <div>
        { /* 将创建的 ref 通过普通属性传递给子组件 */}
        <InputComponent myRef={ this.componentRef } />
      </div>
    )
  }
}
```

上例中，将 `React.createRef()` 创建的 ref 对象当作普通属性名传递到子组件，子组件便可以读取用来传递给内部的元素节点。

这种情况还绕开了前面说的在 `function` 组件调用时不能使用 `ref` 属性的限制。也就是，上例中的 `InputComponent` 组件即便是 funtion 组件也不会有问题的。

```jsx
function InputComponent (props) {
  // 使用父组件通过普通属性传递下来的 ref 对象
  return <input ref={ props.myRef } type="text" />
}

class App extends React.Component {
  componentRef = React.createRef()
  componentDidMount () {
    this.componentRef.current.focus()
  }
  render() {
    return (
      <div>
        { /* 将创建的 ref 对象通过普通属性传递给函数组件 */}
        <InputComponent myRef={ this.componentRef } />
      </div>
    )
  }
}
```

但是通过普通属性传递时，要进行 `prop-type` 检查应该使用什么类型呢？（待续）

在 React 16.3 或更高版本中, 官方引入了一个可以转发 ref 的 API 叫做 `React.forwardRef()`，它还可与 hooks 的 `useImperativeHandle` 结合使用。

### 使用 `React.forwardRef()` 转发 ref

ref 转发允许一个子组件接收 ref，并将其向下传递给子组件内部的元素（或组件）节点。

对于大多数应用中的组件来说，这通常不是必需的功能。但其对某些组件，尤其是可重用的组件库是很有用的。

`React.forwardRef()` 实际上会创建一个函数组件，它接收一个回调函数，在调用这个回调函数时会传入两个参数，第一个是组件被调用时传入的 props，第二个是组件被调用时传入的的 ref 对象。

```jsx

// InputComponent 相当于一个 函数组件
const InputComponent = React.forwardRef((props, myRef) => {
  return <input ref={ myRef } type="text" />
})


class App extends React.Component {
  componentRef = React.createRef()
  componentDidMount () {
    this.componentRef.current.focus()
  }
  render() {
    return (
      <div>
        { /* 虽然是函数组件，但使用了 forwardRef，所有这里可以使用 ref  */ }
        <InputComponent ref={ this.componentRef } />
      </div>
    )
  }
}
```

第二个参数 `ref` 只有在使用 `React.forwardRef()` 创建组件时才存在。常规函数组件和 `class` 组件都不接收 `ref` 参数，且 `props` 中也不存在 `ref`。

我们看到，通过转发 ref ，父组件可以直接引用子组件内部的节点了，但有一点，`React.forwardRef()` 返回的组件其实都是函数组件，也就是说，`React.forwardRef()` 这个 转发 ref 的 API 只适用于子组件是函数组件的情况，如果子组件是 class 组件，那就无法使用这个 API，而是使用前面讲到的通过普通属性（非 ref / key 属性名）的方式传递 `React.createRef()` 创建的 ref 对象到子组件中。

请注意，`React.createRef()` 和 `React.forwardRef()` 都是 React 16.3 及以上的版本中引入的 API，如果使用的是 React 16.2 及以下版本，怎么实现在父组件中直接引用子组件内部的节点呢？

这就需要用到另一种创建 ref 的方法了，就是通过回调函数的形式创建 ref 。

### 通过回调函数创建 ref

在 `React.createRef()` 发布之前，React 使用的是另一种设置 ref 的方式，称为 `回调 ref`。它能更精细地控制 ref 何时被设置和解除。

不同于传递 `React.createRef()` 创建的结果给元素节点的 `ref` 属性，这里会传递一个函数给 ref 属性。这个函数将会被调用，并且会将目标节点元素通过第一个参数传给这个函数。

方式一：以内联函数的方式定义 ref 回调函数

```jsx
class App extends React.Component {
  myRef = null
  componentDidMount () {
    this.myRef.focus()
  }
  render() {
    return (
      <div>
        { /* 回调参数 ele 就表示 input 元素本身，保存到实例属性上便于使用 */}
        <input type="text" ref={ ele => this.myRef = ele } />
      </div>
    )
  }
}
```

React 将在组件挂载时，调用 ref 回调函数并传入目标 DOM 元素，当卸载时再次调用它并传入 `null` 。在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会保证 ref 一定是最新的。

方式二：回调函数定义为组件的实例方法后再传入：

```jsx
class App extends React.Component {
  myRef = null
  getRef = ele => {
    this.myRef = ele
  }
  componentDidMount () {
    this.myRef.focus()
  }
  render() {
    return (
      <div>
        { /* input DOM 节点将会作为 this.getRef() 的第一个参数传入 */}
        <input type="text" ref={ this.getRef } />
      </div>
    )
  }
}
```

> 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。
>
>通过将 ref 的回调函数定义成 class 的实例方法的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

了解了通过回调函数创建 ref 的方式，现在我们来解决之前提到的问题：React 16.2 及以下版本，怎么实现在父组件中直接引用子组件内部的节点呢？

其实，回调函数也可以通过普通 `props` 属性名 一直往下传递到深层子组件中去引用深层的元素节点：

```jsx
class InputComponent extends React.Component {
  render () {
    // 使用父组件传递下来的 ref 回调，让父组件直接引用子组件内部的节点
    return <input ref={ this.props.getRef } type="text" />
  }
}

class App extends React.Component {
  componentRef = null
  getRef = ele => {
    this.componentRef = ele
  }
  componentDidMount () {
    this.componentRef.focus()
  }
  render() {
    return (
      <div>
        { /* 将回调函数通过普通属性（非 ref / key 属性）传递给子组件 */ }
        <InputComponent getRef={ this.getRef } />
      </div>
    )
  }
}
```

### 已废除 的 String 类型的 Ref

如果你之前使用过 React，你可能了解过之前的 API 中的 string 类型的 ref 属性，例如

```jsx
<input ref="inputRef" type="text" />
```

然后在组件的函数中可以通过 `this.refs.textInput` 来访问 DOM 节点。官方已不建议使用它，因为 string 类型的 refs 存在 一些问题。它已过时并会在未来的版本被移除。

## `React`

包含：

组件

- Component
- PureComponent

创建 React 元素

- createElement()
- createFactory()

转换元素

- cloneElement()
- isValidElement()
- React.Children

Fragments

- Fragment

Refs

- createRef
- forwardRef

Suspense

- React.lazy
- React.Suspense

Hook

- 基础 Hook
  - useState
  - useEffect
  - useContext

- 额外的 Hook
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebugValue
