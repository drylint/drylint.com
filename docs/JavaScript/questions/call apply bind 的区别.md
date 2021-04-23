
# `call()`, `apply()`, `bind()` 的区别

通常，在对象的某个方法 `obj.fn()` 中使用了 `this` ，需要改变此 `this` 的指向时，会使用到`call()`, `apply()`, `bind()` 。

```js
obj.fn.call(newThisObj)

obj.fn.apply(newThisObj)

obj.fn.bind(newThisObj)()
```

`obj.fn` 方法中的 `this` 将会指向传入的第一个参数(对象)。

## 详情实例

```js
var uname = 'Bob'
var age = 20

const Man1 = {
  uname: 'Tom',
  age: 21,
  intro () {
    console.log(`${this.uname}, ${this.age}`)
  },
  introMore (like, dislike) {
    console.log(`${this.uname}, ${this.age}, like: ${like}, dislike: ${dislike}`)
  }
}

const Man2 = {
  uname: 'Jerry',
  age: 22
}
```

### 仅改变 `this`，不传递额外参数时

```js
Man1.intro() // Tom, 21

// call(), apply(), bind() 不传入参数时，程序默认将 window 对象传入，this 将指向 window
Man1.intro.call() // Bob, 20
Man1.intro.apply() // // Bob, 20
Man1.intro.bind()() // Bob, 20

Man1.intro.call(Man2) // Jerry, 22
Man1.intro.apply(Man2) // Jerry, 22
Man1.intro.bind(Man2)() // Jerry, 22
```

> `call()`, `apply()`, `bind()` 仅传入一个对象作为第一个参数时，结果一致，仅 `bind()` 使用方式上有区别；
> 注意: `bind()` 绑定后返回一个新的函数，不会执行，需要手动调用才会执行。

### 改变 `this`，同时还需要传递额外参数时

```js

Man1.introMore('music', 'sports') // Tom, 21, like: music, dislike: sports

Man1.introMore.call(this, 'music', 'sports') // Bob, 20, like: music, dislike: sports
Man1.introMore.apply(this, ['music', 'sports']) // Bob, 20, like: music, dislike: sports
Man1.introMore.bind(this, 'music', 'sports')() // Bob, 20, like: music, dislike: sports

Man1.introMore.call(Man2, 'music', 'sports') // Jerry, 22, like: music, dislike: sports
Man1.introMore.apply(Man2, ['music', 'sports']) // Jerry, 22, like: music, dislike: sports
Man1.introMore.bind(Man2, 'music', 'sports')() // Jerry, 22, like: music, dislike: sports
Man1.introMore.bind(Man2, ['music', 'sports'])() // Jerry, 22, like: music,sports, dislike: undefined
```

> `obj.fn` 方法中需要传参时，第一个参数必须指定一个对象作为 this 的指向，传递参数从第二个参数开始；
> `call()`, `bind()` 传递的多个参数以逗号隔开, `apply()` 传递的参数必须放在数组中作为第二个参数；
> 注意: `bind()` 绑定后返回一个新的函数，不会执行，需要手动调用才会执行。

## 总结

`call()`, `apply()`, `bind()` 在使用上有区别，在结果上一致，具体使用结合情况使用。

- `call()`, `apply()` : 临时替换 `this`，并立刻调用一次函数，独立参数用 `call()`, 数组参数用 `apply()`；
- `bind()` : 创建并返回新函数，但不会执行，可在需要时再手动调用，此新函数会永久绑定 `this`。
