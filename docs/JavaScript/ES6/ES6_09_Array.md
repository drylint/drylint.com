[toc]

## 数组的扩展

- 扩展运算符
- Array.from()
- Array.of()
- 数组实例的 copyWithin()
- 数组实例的 find() 和 findIndex()
- 数组实例的 fill()
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 includes()
- 数组实例的 flat()，flatMap()
- 数组的空位

### 1. 扩展运算符

#### (1) 基本使用

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```js
function f(v, w, x, y, z) { }
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

扩展运算符后面还可以放置表达式。

```js
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

如果扩展运算符后面是一个空数组，则不产生任何效果。

```js
[...[], 1] // [1]
```

注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

```js
(...[1, 2]) // Uncaught SyntaxError: Unexpected number

console.log((...[1, 2])) // Uncaught SyntaxError: Unexpected number

console.log(...[1, 2]) // 1 2
```

上面三种情况，扩展运算符都放在圆括号里面，但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。

#### (2) 替代函数的 apply 方法

由于扩展运算符可以展开数组，所以不再需要apply方法将数组转为函数的参数。

```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);


// 用Math.max方法，简化求出一个数组最大元素的写法。
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);


// 通过push函数，将一个数组添加到另一个数组的尾部。
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);


// 利用数组创建一个 Date 对象
// ES5
new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
new Date(...[2015, 1, 1]);

```

#### 扩展运算符的应用

##### 复制数组

数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

```js
// ES5 只能用变通方法来复制数组。
const a1 = [1, 2];
const a2 = a1.concat(); // a1 会返回原数组的克隆，再修改 a2 就不会对 a1 产生影响。

a2[0] = 2;
a1 // [1, 2]

// ES6 的扩展运算符提供了复制数组的简便写法。
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

但以上的拷贝方法依然是浅拷贝，二层及以上依然是引用地址。

```js
let arr1 = [1, 2, [3, 4, [5, 6]], 7]
let arr2 = arr1
let arr3 = arr1.concat()
let arr4 = [...arr1]
let arr5 = JSON.parse(JSON.stringify(arr1)) // 深拷贝

arr1[0] = 9
console.log(arr2, arr3, arr4);
/*
[ 9, 2, [ 3, 4, [ 5, 6 ] ], 7 ]
[ 1, 2, [ 3, 4, [ 5, 6 ] ], 7 ]
[ 1, 2, [ 3, 4, [ 5, 6 ] ], 7 ]
*/
arr1[2][0] = 99
console.log(arr2, arr3, arr4)
/*
[ 9, 2, [ 99, 4, [ 5, 6 ] ], 7 ]
[ 1, 2, [ 99, 4, [ 5, 6 ] ], 7 ]
[ 1, 2, [ 99, 4, [ 5, 6 ] ], 7 ]
*/
arr1[2][2][0] = 999
console.log(arr2, arr3, arr4, arr5)
/*
[ 9, 2, [ 99, 4, [ 999, 6 ] ], 7 ]
[ 1, 2, [ 99, 4, [ 999, 6 ] ], 7 ]
[ 1, 2, [ 99, 4, [ 999, 6 ] ], 7 ]
[ 1, 2, [ 3, 4, [ 5, 6 ] ], 7 ] 深拷贝的不受影响
*/

```

##### 合并数组

```js
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

```

合并数组依然是浅拷贝，引用类型的值依然是拷贝地址。

##### 与解构赋值结合

```js
// ES5
let a = list[0]
let rest = list.slice(1)
// ES6
let [a, ...rest] = list


const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

```

##### 操作字符串

扩展运算符还可以将字符串转为真正的数组。

```js
[...'hello'] // [ "h", "e", "l", "l", "o" ]
```

扩展运算符操作字符串，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

```js
'x\uD83D\uDE80y'.length // 4，JavaScript 将四个字节的 Unicode 字符，识别为 2 个字符
[...'x\uD83D\uDE80y'].length // 3，采用扩展运算符后将 \uD83D\uDE80 识别为一个字符
```

凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

```js
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y') // 3
```

```js
// 翻转包含四个字节 Unicode 字符的字符串

let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('') // 'y\uDE80\uD83Dx'，\uD83D\uDE80 被当做两个字符翻转了

[...str].reverse().join('') // 'y\uD83D\uDE80x'， \uD83D\uDE80 作为一个字符正确使用

```

##### 将拥有 Iterator 接口的对象转为数组

扩展运算符内部调用的是数据结构的 Iterator 接口，任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。比如 Map 和 Set 结构，Generator 函数。

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

- 对类数组使用扩展运算符

    ```js
    let nodeList = document.querySelectorAll('div'); // 类数组
    let array = [...nodeList]; // 扩展运算符将类数组转为数组，因为 NodeList 对象实现了 Iterator 。
    ```

- map 结构使用扩展运算符

    ```js

    let map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);

    let arr = [...map.keys()]; // [1, 2, 3]
    ```

- Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

    ```js
    const go = function*(){
      yield 1;
      yield 2;
      yield 3;
    };

    [...go()] // [1, 2, 3]
    // go() 执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值转为一个数组。
    ```

- 对没有Iterator 接口的对象使用扩展运算符，报错

    ```js
    let obj = {a: 1, b: 2};
    let arr = [...obj]; // // TypeError: obj is not iterable

    let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
    };
    let arr = [...arrayLike]; // TypeError: arrayLike is not iterable
    // arrayLike 对象没有 Iterator 接口，扩展运算符则报错。可以使用 Array.from() 将 arrayLike 转为真正的数组。
    ```

- 自定义对象遍历器解构

    ```js
    // console.log([...5]) // TypeError: 5 is not iterable， number 类型不可遍历

    // 定义 Number 对象的遍历器接口
    Number.prototype[Symbol.iterator] = function*() {
      let i = 0;
      let num = this.valueOf();
      while (i < num) {
        yield i++;
      }
    }

    // 扩展运算符将 5 自动转成 Number 实例, 调用定义的遍历器接口，就会返回自定义的结果。
    console.log([...5]) // [ 0, 1, 2, 3, 4 ]
    ```

### 2. Array.from()

从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。

```js
// 语法

Array.from(arrayLike[, mapFn[, thisArg]])

// 其实 相当于
Array.from(obj).map(mapFn, thisArg)
```

- `arrayLike`  
想要转换成数组的伪数组对象或可迭代对象。
- `mapFn` (可选参数)  
如果指定了该参数，新数组中的每个元素会执行该回调函数。
- `thisArg` (可选参数)  
可选参数，执行回调函数 mapFn 时 this 对象。

#### (1) 基本使用：转换 `arrayLike`

主要用于将两类对象转为真正的数组：

- 类似数组的对象（array-like object）:（拥有一个 length 属性和若干索引属性的任意对象）
- 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。

如果参数是一个真正的数组，`Array.from` 会拷贝返回一个一模一样的新数组。只拷贝第一层，第二层以上依然为引用(浅拷贝)。

```js
// 字符串
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']

// Set
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 类数组对象 1
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 类数组对象 2
console.log(Array.from({length: 3})) // [ undefined, undefined, undefined ]
```

常用语转换 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。

```js
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

```

##### `Array.from()` 对比 `...扩展运算符`

`扩展运算符(...)` 也可以将某些数据结构转为数组。

扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。

`Array.from()` 方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有 `length` 属性。因此，任何有 `length` 属性的对象，都可以通过 `Array.from` 方法转为数组，而此时扩展运算符就无法转换。

```js
console.log(Array.from({length: 3})) // [ undefined, undefined, undefined ]
console.log(...{length: 3}) // TypeError: Found non-callable @@iterator
```

对于还不支持 `Array.from()` 的浏览器，可以用 `Array.prototype.slice` 方法替代。

```js
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

#### (2) 使用 `mapFn` 遍历回调函数

用来对每个元素进行处理，将处理后的值放入数组再返回。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

```

##### `mapFn` 遍历回调函数 应用

- 取出一组 DOM 节点的文本内容。

    ```js
    let spans = document.querySelectorAll('span.name');

    // 传统方式：调用数组的 map() 方法
    let names1 = Array.prototype.map.call(spans, s => s.textContent);

    // ES6：使用 Array.from() 将类数组转为数组并循环操作
    let names2 = Array.from(spans, s => s.textContent)

    ```

- 将类数组对象转数组并遍历操作： 比如`arguments`中布尔值为false的成员转为0。

    ```js
    function fn (a, b, c, d) {
      console.log(arguments) // { '0': 1, '1': false, '2': 3, '3': true, '4': 5 }
      return Array.from(arguments, item => item || 0)
    }

    console.log(
      fn (1, false, 3, false, 5) // [ 1, 0, 3, 0, 5 ]
    )

    ```

- 获取字符串的长度。避免 JavaScript 将大于 `\uFFFF` 的 Unicode 字符算作两个字符。

    ```js
    let str = '\u{20bbb}\uD842\uDFB7'
    console.log(str) // 𠮻𠮷

    console.log(str.length) // 4
    console.log(
      Array.from(str).length // 2
    )
    ```

### 3. Array.of()

用于将一组值，转换为数组。

为了弥补构造函数 `Array()` 因为参数个数的不同，会导致 `Array()` 的行为有差异。

```js
// Array() 的差异
Array() // [] // 无参数创建一个空数组
Array(3) // [, , ,] // 一个数字的参数表示创建一个长度为 n 的数组
Array(3, 11, 8) // [3, 11, 8]， 多个参数则均视为数组的元素

// Array.of() 将所有的参数都当做数组的元素
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
Array.of() // []
```

> `Array.of` 基本上可以用来替代 `Array()` 或 `new Array()`

`Array.of()` 的模拟实现：

```js
// ES5
function ArrayOf(){
  return [].slice.call(arguments);
}
// ES6
function ArrayOf2(){
  return [...arguments]
}

console.log(
  ArrayOf(1, 2, 3), // [ 1, 2, 3 ]
  ArrayOf2(1, 2, 3) // [ 1, 2, 3 ]
)
```

### 4. Array.prototype.copyWithin()

将指定位置的成员复制到其他位置（会覆盖原有成员）。返回改变后的原数组。

```js
// 复制的值包含 start 下标的值，不包含 end 下标的值
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置之前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
// 复制从下标 3 开始到末尾的元素，从下标 0 开始依次覆盖元素
[1, 2, 3, 4, 5].copyWithin(0, 3) // [4, 5, 3, 4, 5]

// 将 3 号位复制到 0 号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]

// -2 相当于 3 号位，-1 相当于 4 号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1) // [4, 2, 3, 4, 5]

// 将 3 号位复制到 0 号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3) // {0: 1, 3: 1, length: 5}

// 将 2 号位到数组结束，复制到 0 号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2); // Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

### 5. Array.prototype.find() 和 Array.prototype.findIndex()

```js
// 找出第一个符合条件 (返回值为true)的数组元素，找不到返回 undefined
Array.prototype.find((value, i, arr) => {}, thisArg)

// // 找出第一个符合条件 (返回值为true)的数组元素的下标，找不到返回 -1
Array.prototype.findIndex((value, i, arr) => {}, thisArg)
```

> 以上两个回调函数中如果使用了 `this`，则默认指向 window，传入 thisArg 对象后指向 thisArg

```js
let tom = {
  name: 'tom',
  age: 20
}
let ages = [18, 17, 23, 16]

let result = ages.find(function (v) {
  return v > this.age // this 指向 传入的参数 tom
}, tom)

console.log(result) // 23

// 可以发现 NaN，弥补了数组的 indexOf() 方法的不足。
[NaN].indexOf(NaN) // -1, indexOf方法无法识别数组的NaN成员

[NaN].findIndex(y => Object.is(NaN, y)) // 0, findIndex() 借助 Object.is()方法可做到

```

### 6. Array.prototype.fill()

使用给定值，在指定的位置填充数组。

```js
arr.fill(value, start = 0, end = arr.length)
```

```js
// 新建数组，指定长度为3，填充内容为 7
new Array(3).fill(7) // [7, 7, 7]

// 在现有数组上填充，内容为7，默认全部替换。
['a', 'b', 'c'].fill(7) // [7, 7, 7]

// 在现有数组上填充，内容为 7， 位置为 [1, 2)
['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']

// 填充内容为 对象，都是引用地址，其中一个对象修改，则全部都会修改
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
console.log(arr) // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

// 填充内容为数组，同上，均为地址引用。
let arr = new Array(3).fill([]);
arr[0].push(5);
console.log(arr) // [[5], [5], [5]]
```

### 7. Array.prototype.entries()，keys() 和 values()

用于遍历数组。都返回一个遍历器对象，可用 `for...of` 循环进行遍历

- keys()是对键名的遍历
- values()是对键值的遍历
- entries()是对键值对的遍历。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### 8. Array.prototype.includes()

返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。

```js
Array.prototype.includes(value, start = 0)
```

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

console.log(
  [1, 2, 3].includes(2), // true
  [1, 2, 3].includes(2, 2), // false
  [1, 2, 3].includes(2, -1), // false
  [1, 2, 3].includes(2, -3) // true，从倒数下标为 3 开始查找，大于长度则从 +0 开始查找
)
```

```js
// 传统：使用indexOf方法，检查是否包含某个值。
arr.indexOf(xxx) !== -1
[NaN].indexOf(NaN) // -1, indexOf 使用 === , 会对NaN误判

// includes() 算法不同, 不会误判
[NaN].includes(NaN) // true

```

浏览器不支持 `includes()` 的模拟写法：

```js
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz'); // => false
```

Map 和 Set 数据结构有一个has方法，需要注意与 `includes()` 区分。

- Map 结构的 `has` 方法，是用来查找键名的，比如 `Map.prototype.has(key)` 、 `WeakMap.prototype.has(key)` 、 `Reflect.has(target, propertyKey)` 。
- Set 结构的 `has` 方法，是用来查找值的，比如 `Set.prototype.has(value)` 、 `WeakSet.prototype.has(value)` 。

### 9. Array.prototype.flat() 和 flatMap()

#### Array.prototype.flat()

将嵌套的数组“拉平” n 层并返回新数组, n 为 Infinity 表示全部拉平

```js
Array.prototype.flat(n = 1)
```

```js
// 如果原数组有空位，flat()方法会跳过空位。
let arr = [1, , 2, [3, , 4, [5, , 6]]]
console.dir(arr.flat()) // [1, 2, 3, 4, [5, , 6]]
```

#### Array.prototype.flatMap()

对数组的每个成员执行一次传入的函数，相当于执行 `Array.prototype.map()` ，然后对返回值组成的数组执行 `flat()` 方法。返回新数组。

```js
Array.prototype.flatMap((value, i, arr) => {}, thisArg)
```

### 10. 数组的空位

数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

```js
Array(3) // [, , ,]
```

上面代码中，Array(3)返回一个具有 3 个空位的数组。

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值， `in` 运算符可以说明这一点。

```js
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。

#### ES5 对空位的处理

ES5 对空位的处理很不一致，大多数情况下会忽略空位。

- forEach(), filter(), reduce(), every() 和some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

```js
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

#### ES6 对空位的处理

ES6 则是明确将空位转为 `undefined` 。

```js
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b']) // [ "a", undefined, "b" ]

// 扩展运算符（...）也会将空位转为undefined。
[...['a',,'b']] // [ "a", undefined, "b" ]

// copyWithin()会连空位一起拷贝。
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

// fill()会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]

// for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
// 数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。


// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```

 > 由于空位的处理规则非常不统一，所以建议避免出现空位。
