## Set 和 Map 数据结构

- Set
- WeakSet
- Map
- WeakMap

### 1. Set

#### (1) 基本用法

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

Set函数可以接受一个数组，或者具有 iterable 接口的其他数据结构(如类数组)作为参数，用来初始化。

```js
let s1 = new Set([1,2,3,2,1])
let s2 = [...s1]
console.log(s1) // Set { 1, 2, 3 }
console.log(s2) // [ 1, 2, 3 ]

// 字符串 可遍历
console.log(new Set('hello')) // Set { 'h', 'e', 'l', 'o' }

// 数字和字符串不会进行类型转换，NaN 视为同一个
console.log(new Set([1, '1'])) // Set { 1, '1' }
console.log(new Set([NaN, NaN])) // Set { NaN }

// +0 和 -0 被视为相等
console.log(new Set([+0, -0])) // Set { 0 }

// 空对象不会视为同一个
console.log(new Set([{}, {}])) // Set { {}, {} }
console.log(new Set([[], []])) // Set { [], [] }

// 用于函数参数类数组
function fn() {
  return [...new Set(arguments)]
}
console.log(fn(1, 2, 3, 2, 1)) // [ 1, 2, 3 ]
```

Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”

实际应用：

```js
// 去除数组的重复成员
// 方法一：
[...new Set([1, 2, 3, 2, 1])] // [ 1, 2, 3 ]
// 方法二：
Array.from(new Set([1, 2, 3, 2, 1])) // [ 1, 2, 3 ]

// 字符串去重
[...new Set('ababbc')].join('') // "abc"
```

#### (2) Set 实例的属性和方法

- 实例属性
  - `Set.prototype.constructor` ：构造函数，默认就是`Set`函数。
  - `Set.prototype.size` ：返回`Set`实例的成员总数。
- 实例方法
  - `add(value)` ：添加某个值，返回 Set 结构本身。
  - `delete(value)` ：删除某个值，返回一个布尔值，表示删除是否成功。
  - `has(value)` ：返回一个布尔值，表示该值是否为Set的成员。
  - `clear()` ：清除所有成员，没有返回值。
  - `keys()` ：返回键名的遍历器
  - `values()` ：返回键值的遍历器
  - `entries()` ：返回键值对的遍历器
  - `forEach()` ：使用回调函数遍历每个成员

```js
let s = new Set()
s.add(1).add(2)
console.log(s) // Set { 1, 2 }

console.log(s.size) // 2
console.log(s.has(2)) // true
console.log(s.has(3)) // false

console.log(s.delete(1)) // true
console.log(s.delete(4)) // false

s.clear()
console.log(s) // Set {}

```

##### `keys()`，`values()`，`entries()`

由于 `Set` 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys()`方法和`values()`方法的行为完全一致。`entries()`方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

```js
let s = new Set(['tom', 20, 'male'])

function fn (MyIterator) {
  for (let item of MyIterator) {
    console.log(item);
  }
}
fn(s.keys()) // tom 20 male
fn(s.values()) // tom 20 male
fn(s.entries()) // [ 'tom', 'tom' ] [ 20, 20 ] [ 'male', 'male' ]
```

意味着，可以省略values方法，直接用for...of循环遍历 Set。

```js
let s = new Set(['tom', 20, 'male'])

function fn (MyIterator) {
  for (let item of MyIterator) {
    console.log(item);
  }
}

fn(s) // tom 20 male

```

##### `forEach((value, key, self) => {}, thisArg)`

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

上面代码说明，forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

#### (3) 更多应用

- 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

    ```js
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);

    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}

    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}

    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}
    ```

- 遍历 `Set` 时同步修改所有值

    ```js
    // 方法一
    let set = new Set([1, 2, 3]);
    set = new Set([...set].map(val => val * 2));
    console.log(set) // Set { 2, 4, 6 }

    // 方法二
    let set = new Set([1, 2, 3]);
    set = new Set(Array.from(set, val => val * 2));
    console.log(set) // Set { 2, 4, 6 }
    ```

### 2. WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

```js
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```

其次，WeakSet 中的对象都是弱引用。

垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为`0`，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

这些特点同样适用于本章后面要介绍的 WeakMap 结构。

#### (1) 基本使用

```js
const a = [[1, 2], [3, 4]]; // 数组成员为 对象
const ws = new WeakSet(a); // 数组成员成为 WeakSet 的成员
// WeakSet {[1, 2], [3, 4]}

const b = [3, 4]; // 数组成员为 number 类型
const ws = new WeakSet(b); // 将数组成员作为 WeakSet 成员，成员非对象，报错
// Uncaught TypeError: Invalid value used in weak set(…)
```

作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

实例方法：

- `WeakSet.prototype.add(value)`：向 WeakSet 实例添加一个新成员。
- `WeakSet.prototype.delete(value)`：清除 WeakSet 实例的指定成员。
- `WeakSet.prototype.has(value)`：返回布尔值，表示 WeakSet 实例是否含有某个值。

```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

// WeakSet 没有size属性和forEach() 方法，没有办法遍历它的成员。
ws.size // undefined
ws.forEach // undefined

```

WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

另一个例子：

```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this) // 创建实例时，将实例添加为 WeakSet 结构 foos 的成员
  }
  method () {
    if (!foos.has(this)) { // 调用实例方法时，判断是否为 WeakSet 成员
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```

上面代码保证了`Foo`的实例方法，只能在`Foo`的实例上调用。这里使用 `WeakSet` 的好处是，`foos`对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑`foos`，也不会出现内存泄漏。

### 3. Map

#### 1. 基本用法

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

```js
const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
```

上面代码原意是将一个 `DOM` 节点作为对象`data`的键，但是由于对象只接受字符串作为键名，所以`element`被自动转为字符串`[object HTMLDivElement]`。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content') // 将对象 o 当作 m 的一个键
console.log(m) // Map { { p: 'Hello World' } => 'content' }

```

将数组作为构造函数的参数时，数组的成员必须是一个个表示键值对的数组。

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

console.log(map) // Map { 'name' => '张三', 'title' => 'Author' }

// 实际会执行
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```

不仅仅是数组，任何具有 `Iterator` 接口、且每个成员都是一个双元素的数组的数据结构， 都可以当作`Map`构造函数的参数。这就是说，`Set`和`Map`也可以用来生成新的 Map。

```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

```

对相同的键多次赋值，后面的值覆盖前面的值。

```js
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"

```

如果读取一个未知的键，则返回`undefined`。

```js
new Map().get('asfddfsasadf') // undefined
```

对于引用类型的对象来说，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。

数字、字符串、布尔值作为键时，只要严格相等(`===`)，Map 将其视为一个键。`NaN` 也视为一个键。

```js
let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

```

#### (2) 实例的属性和操作方法

- 实例属性
  - `Map.prototype.size` 返回 Map 结构的成员总数。

        ```js
        const map = new Map();
        map.set('foo', true);
        map.set('bar', false);

        map.size // 2
        ```

- 实例方法
  - `Map.prototype.set(key, value)` 返回整个 Map 结构，可链式操作。如果key已经有值，则键值会被更新，否则就新生成该键。

        ```js
        const m = new Map();
        m.set('edition', 6)        // 键是字符串
        m.set(262, 'standard')     // 键是数值
        m.set(undefined, 'nah')    // 键是 undefined
        ```
  - `Map.prototype.get(key)` 读取key对应的键值，如果找不到key，返回undefined。
  - `Map.prototype.has(key)` 返回一个布尔值，表示某个键是否在当前 Map 对象之中。
  - `Map.prototype.delete(key)` 删除某个键，返回true。如果删除失败，返回false。
  - `Map.prototype.clear()` 清除所有成员，没有返回值。
  - `Map.prototype.keys()` 返回键名的遍历器
  - `Map.prototype.values()` 返回键值的遍历器。
  - `Map.prototype.entries()` 返回所有成员的遍历器。
  - `Map.prototype.forEach((value, key, self) => {}, thisArg)` 遍历 Map 的所有成员。Map 的遍历顺序就是插入顺序。

```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
// Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

map[Symbol.iterator] === map.entries // true
```

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）。

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

```

结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。

Map 的实例方法 `forEach()`，与数组的`forEach()`方法类似，也可以实现遍历。

```js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

#### (3) 更多应用

##### Map 转为对象

如果所有 Map 的键都是字符串，它可以无损地转为对象。有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

```

##### 对象转为 Map

```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

##### Map 转为 JSON

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

##### JSON 转为 Map

JSON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个 `JSON` 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

### 4. WeakMap

`WeakMap`与`Map`的区别有两点。

首先，`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

```js
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

上面代码中，如果将数值`1`和`Symbol`值作为 WeakMap 的键名，都会报错。

其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。

```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。

```js
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。

也就是说，上面的 DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。

总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。

#### WeakMap 实例方法

WeakMap只有四个方法可用：get()、set()、has()、delete()。

#### WeakMap 的用途

前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

上面代码中，myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

WeakMap 的另一个用处是部署私有属性。

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。
