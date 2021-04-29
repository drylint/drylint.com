# React-hooks

[toc]

- useState
- useEffect,
- useRef,
- useReducer,
- useCallback,
- useImperativeHandle,
- useContext,
- useDebugValue,
- useLayoutEffect,
- useMemo,

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

## `useEffect()` 监听一个状态值的变化，做出一些副作用的操作

`useEffect(fn, [])` 函数接收两个参数，第一个参数是一个函数，第二个参数是监听的组件状态组成的数组，当第二个数组参数中的状态值有变化时，第一个函数参数就会被执行。

- 第一个函数参数会在组件第一次挂载的时候被触发，也可以在它的依赖更新时被触发。
- 如果 `useEffect()` 第二个参数是一个空数组，则只会执行初始化的那一次。

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

## 自定义 hook

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

`useReducer()` 接收一个 reducer 函数和一个初始 state 作为参数，并且返回一个包含两项内容的数组。数组的第一项是当前的 state，第二项是 state 的更新函数 (也称 dispatch 函数)。

先定义一个 reducer 函数：

```jsx
import { useReducer } from 'react'
import style from './index.module.scss'
import Add from './Add'
import List from './List'

const todoListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIST':
      return action.payload
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id)
    default:
      return state;
  }
}

const Index = () => {
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

## `useCallback`
