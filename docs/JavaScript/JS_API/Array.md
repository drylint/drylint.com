[toc]

# Array

## 静态属性

无

## 静态方法

```js
// 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
Array.from(arrayLike, mapFn?, thisArg?)

// 判断传递的值是否是一个数组类型，属于严格判断
Array.isArray(value)

// 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
Array.of(ele1, ele2, ..., eleN)

Array.observe() // 已废弃
Array.unobserve() // 已废弃
```

### `Array.from(arrayLike, mapFn?, thisArg?)`

- arrayLike 可迭代对象（包括字符串）和伪数组对象（拥有 `length` 属性和若干索引属性的对象）
- mapFn 遍历方法，`(ele, i, arr) => {}`，相当于 `arr.map()` 没有 `thisArg`。
- thisArg 第二个参数 mapFn 的 thisArg，指定时的 this 对象。

`Array.from(obj, mapFn, thisArg)` 就相当于 `Array.from(obj).map(mapFn, thisArg)`

在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。

### `Array.isArray(value)`

判断传递的值是否是一个数组类型，属于严格判断

```js
// true
Array.isArray([])
Array.isArray([1])
Array.isArray(new Array())
Array.isArray(new Array('a', 'b', 'c', 'd'))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype)

// false
Array.isArray()
Array.isArray({})
Array.isArray(null)
Array.isArray(undefined)
Array.isArray(17)
Array.isArray('Array')
Array.isArray(true)
Array.isArray(false)
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype })
```

Polyfill：

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}
```

### `Array.of(ele1, ele2, ..., eleN)`

```js
Array.of(7) // [7]
Array.of(1, 2, 3) // [1, 2, 3]
Array.of(undefined) // [undefined]

Array(7) // [ , , , , , , ]
Array(1, 2, 3) [1, 2, 3]
```

## 实例属性

```js
arr.constructor // 所有数组实例都继承了这个属性，它的值就是 `Array` 。
arr.length // 数组长度（元素的个数）
```

## 实例方法

### 改变原数组

```js
// 末尾加入若干个元素，返回该数组的新长度。
arr.push(a, b?, ..., n?)

// 头部加入若干个元素，返回该数组的新长度。
arr.unshift(a, b?, ..., n?)

// 末尾删除一个元素，并返回该元素的值，空数组返回 undefined
arr.pop()

// 头部删除一个元素，并返回该元素的值，空数组返回 undefined
arr.shift()

// 删除、替换数组元素，或插入新元素到某个位置，返回被删除的元素组成的数组或空数组
// deleteCount < 0 时，表示不删除元素，此时应该插入元素。
arr.splice(startIndex, deleteCount = arr.length, item1?, ..., itemN)

// 颠倒数组中元素并返回颠倒后的数组。
arr.reverse()

// 对数组元素根据 unicode 码值进行排序，并返回被排序修改的数组。
// 回调返回 负数，a 排 b 前面
// 回调返回 0， a, b 位置不变
// 回调返回 正数，a 排在 b 之后
arr.sort((a, b) => a - b) // 升序排列， b - a 降序排列

// 复制数组中 startIndex 到 endIndex 的(含头不含尾)元素到 targetIndex 位置开始覆盖现有元素
// 改变原数组，但不改变数组长度。
arr.copyWithin(targetIndex, startIndex = 0, endIndex = arr.length)

// 用一个固定值 value 填充或覆盖 startIndex 到 endIndex (含头不含尾)的元素。
arr.fill(value, startIndex = 0, endIndex = arr.length)
```

#### 遍历

```js
/* 可退出 */

// 循环完成后，回调函数全部返回 true ，则返回 true，只要有一个 false 则退出循环，返回 false
// arr 为空数组时，返回 true
arr.every((ele, i, arr): Boolean, thisArg?): Boolean

// 回调函数只要一返回 true，则直接退出循环并返回 true
// arr 为空数组时，返回 false
arr.some((ele, i, arr): Boolean, thisArg?): Boolean

// 回调函数只要一返回 true，则直接退出循环并返回当前元素值，否则返回 undefined
arr.find((ele, i, arr): Boolean, thisArg?): any

// 回调函数只要一返回 true，则直接退出循环并返回当前元素的索引（index），否则返回 -1
arr.findIndex((ele, i, arr): Boolean, thisArg?): Number

/* 不可退出 */

// 回调函数只要返回 true ，则当前元素会被放入新数组，循环结束返回此新数组
arr.filter((ele, i, arr): Boolean, thisArg?): Array

// 循环数组，每一次循环执行一次回调函数，循环结束返回 undefined
arr.forEach((ele, i, arr): undefined, thisArg?): undefined

// 循环数组，每一次循环执行一次回调函数，并将每一次返回值存入新数组，循环结束返回此新数组
arr.map((ele, i, arr): Array, thisArg?): Array

// 循环累计器，每一次回调的返回值，都将作为下一次回调的第一个参数 acc
// 回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：
// 如果提供了 initAcc ，acc 取值为 initAcc ，ele 取数组中的第一个值；
// 如果没有提供 initAcc ，则 acc 取数组中的第一个值，ele 取数组中的第二个值。
arr.reduce((acc, ele, i, arr): any, initAcc?)

// 数组从右往左循环执行 reduce
arr.reduceRight()

// 类似于 arr.map().flat(1) 连用的效果
// 遍历执行回调，回调函数如果返回的是数组，也会被展平放入新数组中
arr.flatMap((ele, i, arr): any, thisArg): Array

// 返回包含每个索引（index）键的 Array Iterator 对象。
arr.keys()

// 返回包含所有元素的 Array Iterator 对象。
arr.values()

// 返回包含所有元素的 Array Iterator 对象。
arr.entries()

// 和 arr.values() 是同一个函数
Array.prototype[@@iterator]()
```

```js
// arr.keys()

const arr = ['a', 'b', 'c'];
const iterator = arr.keys();
const iterator2 = arr.keys();

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

/*

{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: undefined, done: true }

*/

console.log([...iterator2]) // [0, 1, 2]

```

```js
// arr.values()

const arr = ['a', 'b', 'c'];
const iterator = arr.values();
const iterator2 = arr.values();

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

/*

{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: 'c', done: false }
{ value: undefined, done: true }

*/

console.log([...iterator2]) // [ 'a', 'b', 'c' ]
```

```js
// arr.entries()

const arr = ['a', 'b', 'c'];
const iterator = arr.entries();
const iterator2 = arr.entries();

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

/*

{ value: [ 0, 'a' ], done: false }
{ value: [ 1, 'b' ], done: false }
{ value: [ 2, 'c' ], done: false }
{ value: undefined, done: true }

*/

console.log([...iterator2]) // [ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]
```

#### 普通访问方法

```js
// 合并两个或多个数组为一个新数组并返回。
// 若有参数为非数组，则直接将其作为元素放入新数组中。
arr.concat(value1, value2, ..., valueN)

// 将数组转为字符串，并使用提供的 separator 作为分隔符号
// 空数组返回空字符串
// 若数组元素为 undefined 或 null，它会被转换为空字符串
// 若数组元素为引用类型，如数组，会被转为 '[object Array]' 这样的字符串
arr.join(separator)

// 将嵌套数组展平
// 按指定深度递归遍历数组，将所有层级元素展平并放入一个新数组返回
arr.flat(depth = 1)

// 从指定下标开始查找数组中是否包含某个值
arr.includes(value, startIndex = 0): Boolean


// 从指定下标开始查找某个值在数组中第一次出现的下标并返回，找不到返回 -1
// 使用 严格相等 === 查找比较
arr.indexOf(value, startIndex = 0): Number

// 从指定下标开始，倒着查找某个值在数组中第一次出现的下标并返回，找不到返回 -1
// 使用 严格相等 === 查找比较
arr.lastIndexOf(value, startIndex = arr.length - 1)

// 从原数组浅拷贝 startIndex 到 endIndex 的元素（含头不含尾）并存入新数组返回
arr.slice(startIndex = 0, endIndex = arr.length)

// 返回一个字符串，包含用逗号分隔的每个数组元素。
// 执行结果与 arr.join() 不传递分隔符时的结果一致
arr.toString()

// 返回一个字符串表示数组中的元素。每个元素将使用各自的 toLocaleString 方法转为字符串
arr.toLocaleString()

// 返回一个字符串,代表该数组的源代码
arr.toSource() // 非标准
```
