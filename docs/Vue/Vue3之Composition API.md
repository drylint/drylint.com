# Vue3之Composition API

[toc]

组合式(Composition) API 的使用地方，是在组件选项 `setup` 函数中。

## 组件选项 `setup` 函数

组件选项 `setup` 函数在组件创建之前执行，一旦 props 被解析，就将作为组合式 API 的入口。

```js
export default {
  components: {
    // ...
  },

  props: {
    propName: {
      type: String,
      default: 'defaultValue',
    },
  },

  // setup 函数会被传入两个参数
  // 第一个参数是组件接收到的 props, 具有响应性，但对其使用解构取出的成员不具备响应性
  // 第二个参数是 context 上下文，是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值
  setup (props, context) {
    console.log(props) // { propName: 'defaultValue' }

    // setup 函数返回的任何内容都会暴露到组件的 this 上，其他任何地方均可访问
    return {
      // ...
    }
  },

}
```

### `setup` 的第一个参数 props

`setup` 函数中的第一个参数是 `props`。正如在一个标准组件中所期望的那样，`setup` 函数中的 `props` 是响应式的，当传入新的 `prop` 时，它将被更新。

但是，因为 `props` 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。

```js
export default {
  props: {
    propName: {
      type: String,
      default: 'defaultValue',
    },
  },

  setup (props) {
    // 直接对 props 解构的话，取出的成员会丢失响应性
    // 如果启用了 eslint-plugin-vue 的 vue/no-setup-props-destructure 规则，会标红进行报错提示
    const { propName } = props
    console.log(propName)
  },
}
```

如果需要解构 prop，可以在 `setup` 函数中使用 `toRefs` 函数来完成此操作

```js
import { toRefs } from 'vue'
export default {
  setup (props) {
    const { propName } = toRefs(props)
    console.log(propName.value)
  },
}
```

这样解构出来的 `propName` 就具备响应性。

但是，如果 `propName` 是可选的，则传入的 props 中可能没有 `propName` 。在这种情况下，toRefs 将不会为 `propName` 创建一个 ref 。你需要使用 `toRef` 替代它：

```js
import { toRef } from 'vue'
export default {
  setup (props) {
    const propName = toRef(props, 'propName')
    console.log(propName.value)
  },
}
```

### `setup` 第二个参数 context

传递给 `setup` 函数的第二个参数是 `context` 。 `context` 是一个普通 JavaScript 对象，暴露了其它可能在 `setup` 中有用的值：

```js
export default {
  setup (props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
  },
}
```

`context` 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。

```js
export default {
  setup (props, { attrs, slots, emit, expose }) {
    // ...
  },
}
```

`attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 `attrs.x` 或 `slots.x` 的方式引用他们的属性。

请注意，与 `props` 不同，`attrs` 和 `slots` 的属性是非响应式的。如果你打算根据 `attrs` 或 `slots` 的更改应用副作用，那么应该在 `onBeforeUpdate` 生命周期钩子中执行此操作。

我们将在稍后解释 expose 所扮演的角色。

### `setup` 函数中可访问的组件属性

执行 setup 时，组件实例尚未被创建。因此，你只能访问以下属性：

- props
- attrs
- slots
- emit

无法访问以下组件选项：

- data
- computed
- methods
- refs (模板 ref)

### `setup` 返回的对象属性在视图模板中使用

如果 `setup` 返回一个对象，那么该对象的属性就都可以在模板中访问到：

```html
<template>
  <div>
    <div>{{ count }}</div>
  </div>
</template>

<script >
export default {
  setup () {
    return {
      count: 0,
    }
  },

}
</script>

```

上例中， `setup` 返回一个对象，对象属性都可以直接在视图模板中访问，但上例中的属性并不具备响应性。

### `setup` 使用渲染函数

setup 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：

```js
import { h, ref, reactive } from 'vue'

export default {
  setup () {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 请注意这里我们需要显式使用 ref 的 value
    return () => h('div', [readersNumber.value, book.title])
  },
}
```

返回一个渲染函数将阻止我们返回任何其它的东西。从内部来说这不应该成为一个问题，但当我们想要将这个组件的方法通过模板 ref 暴露给父组件时就不一样了。

我们可以通过调用 expose 来解决这个问题，给它传递一个对象，其中定义的 property 将可以被外部组件实例访问：

```js
import { h, ref } from 'vue'
export default {
  setup (props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    // expost 用于暴露一个对象，这个对象的所有属性都将挂载到组件实例上
    expose({
      increment,
    })

    return () => h('div', count.value)
  },
}
```

这个 `increment` 方法现在将可以通过父组件的模板 `ref` 访问。

### `setup` 内不能使用 `this`

在 `setup()` 内部，`this` 不是该活跃实例的引用，因为 `setup()` 是在解析其它组件选项之前被调用的，所以 `setup()` 内部的 `this` 的行为与其它选项中的 `this` 完全不同。这使得 `setup()` 在和其它选项式 API 一起使用时可能会导致混淆。

## `setup` 函数中的响应式变量

先看一个示例：

```html
<template>
  <div>
    <div>{{ count }}</div>
    <button @click="AddCount">
      增加 Count
    </button>
  </div>
</template>

<script >
export default {
  setup () {
    let count = 0
    const addCount = () => {
      count++
      console.log(count)
    }

    return {
      count,
      addCount,
    }
  },

}
</script>

```

上面示例中， setup 函数返回了一个 `count` 变量和一个函数 `addCount`。并且将 `count` 绑定到了视图中，将 `addCount` 函数绑定到了按钮上。

点击按钮的时候，可以看到控制台已经打印出了递增后的 `count` 值，但是，视图中依然还是 `0` ，根本没有变化，这是因为，这样导出的普通变量不是响应式的变量。

在 Vue 3.0 中，我们可以通过一个新的 ref 函数使任何响应式变量在任何地方都能响应变化：

```html
<template>
  <div>
    <!-- 在视图模板中，访问响应式变量不需要访问 value 属性，底层已经帮我们处理了 -->
    <div>{{ count }}</div>
    <button @click="AddCount">
      增加 Count
    </button>
  </div>
</template>

<script >
// 导入 Vue 3 中提供的 ref 函数
import { ref } from 'vue'
export default {
  setup () {
    // ref 接收参数并将其包裹在一个带有 value 属性的对象中返回，然后可以使用该属性访问或更改响应式变量的值：
    // 使用 ref 函数初始化变量，count 此时其实已经是一个对象
    const count = ref(0) // { value: 0 }
    const AddCount = () => {
      // 在 js 中，访问响应式变量要访问变量的 value 属性
      count.value++
      console.log(count.value)
    }

    return {
      count,
      AddCount,
    }
  },

}
</script>

```

即使是 Number, String 等引用类型的值，响应式变量也会被包装成一个对象，原因是：

> 将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，这是必须的。这是因为在 JavaScript 中，Number 或 String 等基本类型是通过值而非引用传递的。
>
> 在任何值周围都有一个封装对象，这样我们就可以在整个应用中安全地传递它，而不必担心在某个地方失去它的响应性。

## `setup` 函数内注册生命周期

为了使组合式 API 的功能和选项式 API 一样完整，我们还需要一种在 setup 中注册生命周期钩子的方法。这要归功于 Vue 导出的几个新函数。组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 `on` ：即 `mounted` 变成 `onMounted` 。

```js
import { onMounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      console.log('onMounted')
    })
    return {
    }
  },
}
```

上面代码在 Options API 中是这样写的：

```js
export default {
  mounted () {
    console.log('mounted')
  },
}
```

当然，非要两种一起用也是可以的，但不推荐：

```js
import { onMounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      console.log('onMounted 执行')
    })
    return {
    }
  },
  mounted () {
    console.log('mounted 执行')
  },
}
```

以上代码在 `setup` 函数中注册了 `onMounted` 生命周期，在组件选项中声明了 `mounted` 生命周期，两个地方都会执行，但是有先后。

`setup` 函数是在组件创建之前执行，所以其中的 `onMounted` 是先注册，所以就会先调用，所以上面代码依次在控制台打印出：

```bash
onMounted 执行
mounted 执行
```

### `setup` 内所有可用生命周期

可以通过在 Options API 的生命周期钩子前面加上 `on` 来访问组件的生命周期钩子。

选项式(Options) 生命周期 | `setup()` 内生命周期
-- | --
beforeCreate | 不需要
created | 不需要
beforeMount | onBeforeMount
mounted | onMounted
beforeUpdate | onBeforeUpdate
updated | onUpdated
beforeUnmount | onBeforeUnmount
unmounted | onUnmounted
errorCaptured | onErrorCaptured
renderTracked | onRenderTracked
renderTriggered | onRenderTriggered
activated | onActivated
deactivated | onDeactivated

可以看到，`beforeCreate`, `created` 两个生命周期是不需要在 `setup` 函数中使用的，因为 `setup` 就能代表这两个生命周期，这两个生命周期编写的任何代码都应该直接在 `setup` 函数中编写。

## `setup` 函数内注册 watch 监听

除了旧版的 Options API 可以在组件选项上使用 `watch` 以外， Vue 3 中还可以在 `setup` 函数中注册 `watch` 监听。

可以从 Vue 中导入 `watch` 函数，它接受 3 个参数：

- 一个想要侦听的响应式引用或 getter 函数
- 一个回调
- 可选的配置选项

```js
import { ref, watch } from 'vue'
export default {
  setup () {
    const count = ref(0)

    const AddCount = () => {
      // 在 js 中，访问响应式变量要访问变量的 value 属性
      count.value++
      console.log(count.value)
    }

    // 可以监听到 count 的变化
    watch(count, (newValue, oldValue) => {
      console.log(newValue, oldValue)
    })

    return {
      count,
      AddCount,
    }
  },

}
```

监听组件 props 变化：

```js
import { toRefs, watch } from 'vue'
export default {
  props: {
    propName: {
      type: String,
      default: 'defaultValue',
    },
  },

  setup (props) {
    const { propName } = toRefs(props)

    watch(propName, (newValue, oldValue) => {
      console.log(newValue, oldValue)
    })
  },
}
```

## `setup` 函数中使用 computed

与 `ref` 和 `watch` 类似，也可以使用从 Vue 导入的 `computed` 函数在 `setup` 函数创建计算属性。

```html
<template>
  <div>
    {{ doubleCount }}
  </div>
</template>

<script >
import { ref, computed } from 'vue'
export default {
  setup (props) {
    const count = ref(0)

    // 每隔 1 秒递增 count 值
    setInterval(() => {
      count.value++
    }, 1000)

    // count 的 2 倍值，只要 count 一变化，就会重新计算
    const doubleCount = computed(() => count.value * 2)

    return {
      doubleCount,
    }
  },

}
</script>
```

运行上面示例后，可以看到视图中绑定的 `doubleCount` 值每一秒都会重新计算并更新视图。

## Provide / Inject

在父组件 `Father.vue` 中使用 `provide()` 提供数据:

```js
import { provide } from 'vue'
import Son from './Son.vue'

export default {
  components: {
    Son,
  },
  setup () {
    const msg = 'hello'
    const userinfo = {
      name: 'Tom',
      age: 20,
    }
    provide('msg', msg)
    provide('userinfo', userinfo)
  },
}
```

在子组件 `Son.vue` 中使用 `inject()` 获取数据

```js
import { inject } from 'vue'

export default {
  setup () {
    const msg = inject('msg', 'defaultValue')
    const userinfo = inject('userinfo')

    console.log(msg) // 'hello'
    console.log(userinfo) // {name: 'Tom', age: 20}
  },
}
```

以上示例中 provide 提供的数据是不具备响应性的。

为了增加 `provide` 值和 `inject` 值之间的响应性，我们可以在 `provide` 值时使用 `ref` 或 `reactive` :

```js
// Father.vue

import { provide, reactive, ref } from 'vue'
import Son from './Son.vue'

export default {
  components: {
    Son,
  },
  setup () {
    const msg = ref('hello')
    const userinfo = reactive({
      name: 'Tom',
      age: 20,
    })
    provide('msg', msg)
    provide('userinfo', userinfo)
  },
}

```

在父组件提供响应性的数据后，一旦数据变更，子组件能够获得更新。

如果要在子组件内修改父组件 provide 的值，不应该在子组件直接进行修改（不应该直接修改，但是默认是能修改成功的），而是应该父组件来提供一个修改值的函数，子组件获取这个函数后，调用这个函数：

父组件提供函数：

```js
// Father.vue

import { provide, ref } from 'vue'
import Son from './Son.vue'

export default {
  components: {
    Son,
  },
  setup () {
    const msg = ref('hello')

    const updateMsg = newMsg => {
      msg.value = newMsg
    }

    provide('msg', msg)
    // 父组件提供数据修改函数
    provide('updateMsg', updateMsg)
  },
}
```

子组件直接修改父组件 provide 的响应式值(**不应该这样做**)：

```js
import { inject } from 'vue'

export default {
  setup () {
    const msg = inject('msg')

    msg.value = '123' // 默认情况下，能修改成功，但不应该这样做
  },
}
```

子组件获取父组件提供的函数进行数据修改(**应该这样做**)：

```js
import { inject } from 'vue'

export default {
  setup () {
    const msg = inject('msg')
    const updateMsg = inject('updateMsg')

    // 获取父组件传递的修改函数，进行数据修改
    updateMsg(`${msg.value} world!`)

    return {
      msg,
    }

  },
}
```

要确保父组件 provide 的数据不被子组件直接修改，可使用 `readonly()` 函数：

```js
// Father.vue

import { provide, ref, readonly } from 'vue'
import Son from './Son.vue'

export default {
  components: {
    Son,
  },
  setup () {
    const msg = ref('hello')
    const updateMsg = newMsg => {
      msg.value = newMsg
    }

    provide('msg', readonly(msg))
    // 父组件提供数据修改函数
    provide('updateMsg', updateMsg)
  },
}

```

这样，子组件直接修改 readonly 数据无法修改：

```js
import { inject } from 'vue'

export default {
  setup () {
    const msg = inject('msg')

    msg.value = '123' // 不会生效
  },
}
```

## `setup` 函数中引用视图元素或视图组件

```html
<template>
  <!-- 元素在渲染挂载后，会让 root 变量引用此元素 -->
  <div ref="root">
    This is a root element
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    // 声明一个响应式变量，并返回暴露给组件
    const root = ref(null)

    onMounted(() => {
      // DOM 元素将在初始渲染后，交给 root 变量引用
      console.log(root.value) // <div>This is a root element</div>
    })

    return {
      root,
    }
  },
}
</script>

```

`setup` 中使用渲染函数时：

```html
<script>
import { ref, onMounted, h } from 'vue'

export default {
  setup () {
    const root = ref(null)

    onMounted(() => {
      // DOM 元素将在初始渲染后，交给 root 变量引用
      console.log(root.value) // <div>This is a root element</div>
    })

    return () => h('div', {
      ref: root,
    }, 'This is a root element')
  },
}
</script>
```

`setup` 中使用 JSX 时：

```html
<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const root = ref(null)

    onMounted(() => {
      // DOM 元素将在初始渲染后，交给 root 变量引用
      console.log(root.value) // <div>This is a root element</div>
    })

    return () => <div ref={root}>This is a root element</div>
  },
}
</script>
```

v-for 中的用法：

组合式 API 模板引用在 v-for 内部使用时没有特殊处理。相反，请使用函数引用执行自定义处理：

```html
<template>
  <div
    v-for="(item, i) in list"
    :key="item"
    :ref="el => { if (el) divs[i] = el }"
  >
    {{ item }}
  </div>
</template>

<script>
import { ref, reactive, onBeforeUpdate } from 'vue'

export default {
  setup () {
    const list = reactive([1, 2, 3])
    const divs = ref([])

    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      divs.value = []
    })

    return {
      list,
      divs,
    }
  },
}
</script>

```

监听视图元素引用的变化：

```html
<template>
  <div ref="root">
    This is a root element
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'

export default {
  setup () {
    const root = ref(null)

    onMounted(() => {
      console.log('onMounted')
    })
    watchEffect(() => {
      // 这个副作用在 DOM 更新之前也会运行一次，之后也会运行一次
      console.log('watchEffect', root.value) // => null
    })

    return {
      root,
    }
  },
}
</script>
```

上例运行时在控股台打印结果为：

```bash
watchEffect null
onMounted
watchEffect `<div> This is a root element </div>`
```

为了让 `watchEffect` 函数只在 DOM 更新之后执行，可以添加第二个参数来配置：

```js
watchEffect(() => {
  console.log('watchEffect', root.value) // => null
}, {
  flush: 'post', // 在 DOM 更新后运行副作用
})
```

加入 `flush: 'post'` 配置之后， `watchEffect` 就只在 DOM 更新之后运行副作用函数。
