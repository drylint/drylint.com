# React-hooks

[toc]

相关文章：

- [阮一峰：轻松学会 React 钩子：以 useEffect() 为例](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)
- [阮一峰：React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

钩子列表：

- useState
- useEffect,
- useRef,
- useReducer,
- useContext,
- useMemo,
- useCallback, 每当依赖的数组改变时，就会创建一个 memoized 函数
- useImperativeHandle,
- useDebugValue,
- useLayoutEffect,

以前，React API 只有一套，现在有两套：类（class）API 和基于函数的钩子（hooks） API。

任何一个组件，都可以用类来写，也都可以用钩子来写。只用其中某一套均可实现同样的结果。

但官方推荐使用钩子（函数），而不是类。因为钩子更简洁，代码量少，用起来比较"轻"，而类比较"重"。而且，钩子是函数，更符合 React 函数式的本质。

钩子到底是什么？

一句话，钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。

由于副效应非常多，所以钩子有许多种。React 为许多常见的操作（副效应），都提供了专用的钩子。

- useState()：保存状态
- useContext()：保存上下文
- useRef()：保存引用
- ......

上面这些钩子，都是引入某种特定的副效应。

## `useState()` 数据管理

`useState()` 接收一个参数作为初始值，返回一个数组，数组第一个元素是当前值，数组第二个元素是一个函数，这个函数是用来修改值的函数，调用这个函数并传入一个值，则会修改数组第一个元素值。

```jsx
import { useState } from 'react'
const Index = (props) => {
  // 定义一个组件内状态，初始值为空字符串
  const [value, setValue] = useState('')

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}

export default Index
```

## `useEffect()` 做出一些副效应(副作用)的操作（可监听一个状态值的变化而执行）

函数式编程将那些跟数据计算无关的操作，都称为 "副效应" （side effect） 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

React 的函数组件应该是一个纯函数，只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能，纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。所以要在函数组件内使用 `useEffect()` 来执行含有副效应的操作。

`useEffect()` 是通用的副效应钩子 。找不到对应的钩子时，就可以用它。其实，从名字也可以看出来，它跟副效应（side effect）直接相关。

`useEffect(fn, [])` 函数接收两个参数，第一个参数是一个函数，第二个参数是监听的组件状态组成的数组，当第二个数组参数中的状态值有变化时，第一个函数参数就会被执行。

- 第一个函数参数会在组件第一次挂载的时候被触发，也可以在它的依赖更新时被触发。
- 如果 `useEffect()` 第二个参数是一个空数组，第一个参数函数则只会执行初始化的那一次。

```jsx
import { useState, useEffect } from 'react'
const Index = (props) => {
  const [value, setValue] = useState(localStorage.getItem('value' || ''))

  // 当 value 变化时，函数就会被执行
  useEffect(() => {
    localStorage.setItem('value', value)
  }, [value])

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}

export default Index
```

只要是副效应，都可以使用 `useEffect()` 引入。它的常见用途有下面几种。

- 获取数据（data fetching）
- 操作缓存 Storage（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

最常见的就是向服务器请求数据。以前，放在 `componentDidMount()` 里面的代码，现在可以放在 `useEffect()` 。

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()` 允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应， `useEffect()` 就不用返回任何值。

```jsx
useEffect(() => {
  const subscription = props.source.subscribe()
  return () => {
    subscription.unsubscribe()
  }
}, [props.source])
```

上面例子中，useEffect()在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。

实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

使用 `useEffect()` 时，有一点需要注意。如果有多个副效应，应该调用多个 `useEffect()` ，而不应该合并写在一起。

```jsx
function App() {
  const [varA, setVarA] = useState(0)
  const [varB, setVarB] = useState(0)
  useEffect(() => {
    const timeoutA = setTimeout(() => setVarA(varA + 1), 1000)
    const timeoutB = setTimeout(() => setVarB(varB + 2), 2000)

    return () => {
      clearTimeout(timeoutA)
      clearTimeout(timeoutB)
    }
  }, [varA, varB])

  return <span>{varA}, {varB}</span>
}
```

上面的例子是错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个 `useEffect()` 。

```jsx
function App() {
  const [varA, setVarA] = useState(0)
  const [varB, setVarB] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000)
    return () => clearTimeout(timeout)
  }, [varA])

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000)

    return () => clearTimeout(timeout)
  }, [varB])

  return <span>{varA}, {varB}</span>
}
```

## 自定义 hooks

基于 `useState` 和 `useEffect` 来写一个自定义的 hook

新建 `useStorage.js` 并写入：

```jsx
// useStorage.js

import { useState, useEffect } from 'react'

const useStorage = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState)

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

export default useStorage
```

```jsx
// index.js

import useStorage from './useStorage'
const Index = (props) => {
  const [inputValue, setInputValue] = useStorage('value')

  return (
    <div>
      <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
    </div>
  )
}

export default Index
```

## `useRef` 创建一个 ref 引用，用于访问 DOM 节点

`useRef()` 创建并返回一个 ref 引用对象，将这个对象赋值给一个元素的 `ref` 属性即可引用这个 DOM 节点。

```jsx
import { useState, useRef } from 'react'
const Index = (props) => {
  const [value, setValue] = useState('')

  // 创建一个 ref 引用对象
  const inputRef = useRef()

  // 引用对象上的 current 属性即是对应 DOM 节点元素
  const inputElement = inputRef.current

  const handleClick = () => {
    // 访问 DOM 节点元素 input 的 focus() 方法
    inputElement.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={handleClick}>点击让输入框获得焦点</button>
    </div>
  )
}

export default Index
```

## `useReducer` 使用 reducer 来管理状态

`useReducer()` 接收一个 reducer 函数和状态的初始值 state 作为参数，并且返回一个包含两项内容的数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的 dispatch 函数。

语法：

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

```jsx
import { useReducer } from 'react'
import style from './index.module.scss'
import Add from './Add'
import List from './List'

// 先定义一个 reducer 函数，第一个参数为状态 state, 第二个参数是 action 动作
const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIST':
      return action.payload
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id)
    default:
      return state
  }
}

const Index = () => {
  // 使用 reducer, useReducer() 第一个参数传入 reducer 函数，第二个参数为 state 初始默认值
  const [list, dispatchList] = useReducer(todoListReducer, [])

  const handleAdd = text => {
    const newItem = {
      text,
      done: false,
    }
    const newList = [...list, newItem]
    dispatchList({
      type: 'SET_LIST',
      payload: newList,
    })
  }

  return (
    <div className={style['view']}>
      <h1>todo</h1>
      <Add onConfirm={handleAdd} />
      <List list={ list } />
    </div>
  )
}

export default Index
```

## `useContext()` 共享状态钩子

如果需要在组件之间共享状态，可以使用useContext()。

现在有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。

```jsx
<div className="App">
  <Navbar/>
  <Messages/>
</div>
```

第一步就是使用 React 的 Context API `React.createContext()`，在组件外部建立一个 Context。

```jsx
const AppContext = React.createContext({})
```

组件封装代码如下。

```jsx
<AppContext.Provider
  value={{
    username: 'superawesome'
  }}
>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```

上面代码中，`AppContext.Provider` 提供了一个 Context 对象，这个对象可以被子组件共享。

Navbar 组件的代码如下。

```jsx
const Navbar = () => {
  const { username } = useContext(AppContext)
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  )
}
```

上面代码中，`useContext()` 钩子函数用来引入 Context 对象，从中获取 `username` 属性。

Message 组件的代码也类似。

```jsx
const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```

## `useMemo`

`useMemo` 主要用来解决使用 React hooks 产生的无用渲染的性能问题。使用function的形式来声明组件，失去了`shouldCompnentUpdate`（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。

而且在函数组件中，也不再区分 `mount` 和 `update` 两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。 `useMemo` 和 `useCallback` 都是解决上述性能问题的。

## `useCallback`

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)` ，主要区别是 `useMemo` 将调用 fn 函数并返回其结果，而 `React.useCallback` 将返回 fn 函数本身。
