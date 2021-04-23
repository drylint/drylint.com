[toc]

## Generator 函数的语法

- 简介
- next 方法的参数
- for...of 循环
- Generator.prototype.throw()
- Generator.prototype.return()
- next()、throw()、return() 的共同点
- yield* 表达式
- 作为对象属性的 Generator 函数
- Generator 函数的this
- 含义
- 应用
- 异步应用

### 1. 简介

#### (1) 基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案。

语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个**遍历器对象**，也就是说，Generator 函数除了状态机，还是一个遍历器对象**生成函数**。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数特征：

- `function` 关键字与函数名之间有一个星号
- 函数体内部使用 `yield` 表达式，定义不同的内部状态

ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。所以下面的写法都能通过。

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

// 1. 调用 Generator 函数后，该函数并不执行，返回一个遍历器对象(`Iterator Object`)。
var hw = helloWorldGenerator(); // Object [Generator] {}

// 2. 下一步，必须调用遍历器对象的 next() 方法，使得指针移向下一个状态。
// 每次调用 next() 方法，内部指针就从函数头部或上一次停下来的地方开始执行，
// 直到遇到下一个 yield 表达式（或 return 语句）为止。
// 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: true } // done: true 遍历完成
console.log(hw.next()) // { value: undefined, done: true } // 完成之后返回值都是一样
console.log(hw.next()) // { value: undefined, done: true }

```

`next()` 返回的对象的`value`为 `yield` 表达式的值，`done`属性的`boolean`值表示遍历是否结束。

#### (2) yield 表达式

遍历器对象的 `next()` 方法的运行逻辑如下。

（1）遇到`yield`，就暂停执行后面的操作，并返回 `yield`后表达式的值，作为对象的`value`属性值。

（2）下一次调用 `next()` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。

（3）若不再有`yield`表达式则运行到函数结束，返回 `return` 表达式的值作为对象的`value`属性值。

（4）如果该函数没有  `return` 语句，则返回的对象的 `value` 属性值为 `undefined` 。

需要注意的是，`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```js
function* gen() {
  yield  123 + 456;
}
```

上面代码中，yield后面的表达式 `123 + 456` ，不会立即求值，只会在 `next()` 方法将指针移到这一句时，才会求值。

##### `yield` & `return`

- 都能返回紧跟在语句后面的那个表达式的值。
- 遇到 `yield` ，函数暂停执行，下一次再从该位置继续向后执行，而 `return` 语句不具备位置记忆的功能。
- 一个函数里面，只能执行一次`return` 语句，但是可以执行多次（或者说多个）`yield`表达式。
- 普通函数只能返回一个值(一次`return`)；Generator 函数可以返回多个值(多次`yield`)。

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* f() {
  console.log('执行了！')
}

var generator = f(); // 函数 f 是一个 Generator 函数，只有调用 next() 方法时，才会执行。

setTimeout(function () {
  generator.next()
}, 2000);
```

`yield` 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```js
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item); // yield 是用在普通回调函数中，而不是 generator 函数中
    } else {
      yield item;
    }
  });
};

for (var f of flat(arr)){
  console.log(f);
}
```

`forEach()`的回调函数是一个普通函数，在其中使用了`yield`表达式，报错。

可改用for循环。

```js
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item); // yield 是用在 generator 函数中
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```

`yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

`yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
`yield`虽然会将表达式的值抛出，但`yield`语句本身没有返回值，或者说总是返回`undefined`。

```js
function* demo() {
  foo(yield 'a', yield 'b'); // foo(undefined, undefined)
  let input = yield; // input 值为 undefined
}
```

#### (3) 与 Iterator 接口的关系

已经知道，任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给`Symbol.iterator`属性，从而使得`myIterable`对象具有了 Iterator 接口，可以被`...`运算符遍历了。

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g; // true
```

上面代码中，`gen`是一个 Generator 函数，调用它会生成一个遍历器对象`g`。它的`Symbol.iterator`属性，也是一个遍历器对象生成函数，执行后返回它自己。

### 2. next 方法的参数

因为`yield`语句本身值为`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`语句的值。

```js
function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i; // 相当于 yield i; var reset = undefined;
    if (reset) { i = -1; } // reset 值一直为 falsy，一直不会执行 if 中的语句
  }
}

var g = f();

console.log(g.next()); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }

// 传入 true 作为上一个 next() 中 yield 语句的值，相当于 reset = true，执行 if 中的语句
// 本次执行进入 if 语句， i = -1; 本次循环最后 i++; 再次碰到 yield i 相当于 yield 0
console.log(g.next(true)); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
```

通过`next()`方法的参数，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

另一个实例：

```js
function* foo(x) {
  var y = 2 * (yield (x + 1)); // yield (x + 1); var y = 2 * undefined;
  var z = yield (y / 3); // yield (NaN / 3); var z = undefined;
  return (x + y + z); // return (5 + NaN + undefined);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false } // var y = 2 * 12
b.next(13) // { value:42, done:true } // var z = 13
```

> 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。

再看一个通过next方法的参数，向 Generator 函数内部输入值的例子。

```js
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b
```

上面代码是一个很直观的例子，每次通过`next`方法向 Generator 函数输入值，然后打印出来。

如果想要第一次调用`next`方法时，就能够输入值，可以在 Generator 函数外面再包一层。

```js
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!
```

上面代码中，Generator 函数如果不用`wrapper`先包一层，是无法第一次调用`next`方法，就输入参数的。

### 3. for...of 循环

`for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) { // foo() 生成遍历器对象，for...of 直接遍历，相当于自动调用了 next()
  console.log(v);
}
// 1 2 3 4 5
```

上面代码使用`for...of`循环，依次显示 5 个`yield`表达式的值。

注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`6`，不包括在`for...of`循环之中。

利用 Generator 函数和`for...of`循环，实现斐波那契数列的例子。

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 20) break;
  console.log(n);
}
// 1
// 1
// 2
// 3
// 5
// 8
// 13
```

利用`for...of`循环，可以写出遍历任意对象（object）的方法。

- 遍历对象 写法一：通过 Generator 函数`objectEntries()`遍历对象

    ```js
    function* objectEntries(obj) {
      let propKeys = Reflect.ownKeys(obj);

      for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
      }
    }

    let jane = { first: 'Jane', last: 'Doe' };

    for (let [key, value] of objectEntries(jane)) {
      console.log(`${key}: ${value}`);
    }
    // first: Jane
    // last: Doe

    ```

- 遍历对象 写法二：将 Generator 函数加到对象的`Symbol.iterator`属性上面。

```js
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

```

除了`for...of`循环以外，扩展运算符（`...`）、解构赋值和`Array.from()`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

```js
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2

```

### 4. Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个`generatorObj.throw()`方法(不是全局的`throw`命令)，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

```js
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e); // 函数体内捕获函数体外抛出的错误
  }
};

var i = g();
i.next();

try {
  i.throw(new Error('错误一')); // 在 Generator 函数体外抛出错误
  i.throw(new Error('错误二'));
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 Error: 错误一
// 外部捕获 Error: 错误二

```

`throw()` 方法可接受一个参数，该参数会被 `catch` 语句接收

上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的`catch`语句捕获。`i`第二次抛出错误，由于 Generator 函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的`catch`语句捕获。

> 全局 `throw` 命令与 `g.throw` 方法是无关的，两者互不影响。
> `generatorObj.throw()` 是对象中的方法，抛出的错误可以被`generatorFunc()`函数体内的 `catch` 捕获
> 全局的 `throw()` 方法，抛出的错误只能被Generator函数体外的 `catch` 语句捕获。
> 如果 `generatorFunc()` 函数内部没有部署 `try...catch` 代码块，那么 `generatorObj.throw()` 方法抛出的错误，将被外部 `try...catch` 代码块捕获。
> 如果 `generatorFunc()` 函数内部和外部，都没有部署 `try...catch` 代码块，那么程序将报错，直接中断执行。
> Generator 函数内部部署了`try...catch`代码块，那么遍历器的`throw`方法抛出的错误，不影响下一次遍历。

`throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。

```js
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}

var g = gen();
g.throw(1); // next() 一次也没执行过，Generator 函数还未开始执行。抛出的错只能抛到外部。
// Uncaught 1
```

上面代码中，`g.throw(1)`执行时，`next`方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。

因为第一次执行`next`方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时`throw`方法抛错只可能抛出在函数外部。

`throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

```js
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();

g.next() // a
g.throw() // b，gen 函数体内的 catch 捕获错误之后，还会往后执行直到执行一次 yield 为止
g.next() // c

```

Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。

```js
function* foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}

var it = foo();

console.log(it.next()); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err); // TypeError: x.toUpperCase is not a function，x 是 number 类型没有此方法
}
console.log(it.next(99)); // { value: undefined, done: true }，程序认为Generator函数已执行完毕
console.log(it.next(100)); // { value: undefined, done: true }
```

上面代码中，第二个`next`方法向函数体内传入一个参数 `42`，数值是没有`toUpperCase`方法的，所以会抛出一个 `TypeError` 错误，被函数体外的`catch`捕获。

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。

如果此后还调用`next()`方法，将返回 `{ value: undefined, done: true }`，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

### 5. Generator.prototype.return()

遍历器对象 `generatorObj` 还有一个`return()`方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true } // return 返回给定值的对象，并将 done 置为 true
// g.return() // { value: undefined, done: true } // 不提供参数时，value 为 undefined。
g.next()        // { value: undefined, done: true } // gen() 函数已被 return 改为执行完毕

```

如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会推迟到`finally`代码块执行完再执行。

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
console.log(
    g.next(), // { value: 1, done: false }
    g.next(), // { value: 2, done: false }
    g.return(7), // { value: 4, done: false } 调用`return`方法后，就开始执行`finally`代码块
    g.next(), // { value: 5, done: false }
    g.next(), // { value: 7, done: true } 等到`finally`代码块执行完，再执行`return`方法。
)

```

### 6. next()、throw()、return() 的共同点

`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式本身。

- `next()`是将`yield`表达式替换成一个值。

    ```js
    const g = function* (x, y) {
      let result = yield x + y;
      return result;
    };

    const gen = g(1, 2);
    gen.next(); // Object {value: 3, done: false}

    gen.next(1); // Object {value: 1, done: true}
    // 相当于将 let result = yield x + y
    // 替换成 let result = 1; // 如果next()方法没有参数，相当于 let result = undefined。
    ```

- `throw()`是将`yield`表达式替换成一个`throw`语句。

    ```js
    gen.throw(new Error('出错了')); // Uncaught Error: 出错了
    // 相当于将 let result = yield x + y
    // 替换成 let result = throw(new Error('出错了'));
    ```

- `return()`是将`yield`表达式替换成一个`return`语句。

```js
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

### 7. `yield*` 表达式

需求：在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 调用另一个 Generator 函数 foo()， 需手动 for...of 遍历，如若嵌套更麻烦
  for (let i of foo()) {
    yield i;
  }
  yield 'y';
}
let genObj1 = bar();
console.log(
  genObj1.next(), // { value: 'x', done: false }
  genObj1.next(), // { value: 'a', done: false }
  genObj1.next(), // { value: 'b', done: false }
  genObj1.next(), // { value: 'y', done: false }
  genObj1.next(), // { value: undefined, done: true }
)

// 使用 yield* 改写
function* bar2 () {
  yield 'x';
  // yield foo(); // 如果不加 * 号，实际上是将这个遍历器对象整体 yield 出去
  yield* foo();
  yield 'y';
}
let genObj2 = bar2()
console.log(
  genObj2.next(), // { value: 'x', done: false }
  genObj2.next(), // { value: 'a', done: false }
  genObj2.next(), // { value: 'b', done: false }
  genObj2.next(), // { value: 'y', done: false }
  genObj2.next(), // { value: undefined, done: true }
)
```

`yield*` 后面跟的是一个遍历器对象，在外层 Generator 函数的遍历器对象中调用 `.next()` 时，程序会自动执行 `yield*` 后遍历器对象的 `.next()` 方法，并将结果作为外层结果 `yield`出去。

`yield*` 后面遍历器对象的 Generator 函数中没有`return`语句时，等同于在 Generator 函数内部，部署一个`for...of`循环。

```js
function* concat(iterObj1, iterObj2) {
  yield* iterObj1;
  yield* iterObj2;
}

// 等同于

function* concat(iterObj1, iterObj2) {
  for (var value of iterObj1) {
    yield value;
  }
  for (var value of iterObj2) {
    yield value;
  }
}
```

`yield*` 后面遍历器对象的 Generator 函数中有`return`语句时，则需要用`var value = yield* iterObj`的形式获取`return`语句的值。

```js
function* concat(iterObj1, iterObj2) {
  let obj1Result = yield* iterObj1;
  let obj2Result = yield* iterObj2;
}
```

实际上，任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历。比如数组，字符串，类数组等。

```js
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"

```

`yield*` 命令可以很方便地取出嵌套(多维)数组的所有成员。

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) { // 如果参数是数组，则循环
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]); // 取出数组元素，则递归调用自己
    }
  } else {
    yield tree; // 如果参数不是数组，则直接返回
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ]; // 多维数组

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e

// ... 扩展运算符也默认调用 Iterator 接口(next())
console.log([...iterTree(tree)]) // ["a", "b", "c", "d", "e"]
```

使用`yield*`语句遍历完全二叉树：

```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make(
  [
    [
      ['a'], 'b', ['c']
    ],
    'd',
    [
      ['e'], 'f', ['g']
    ]
  ]
);
console.log(tree)

/*
{
  left:{
    left: { left: null, label: 'a', right: null },
    label: 'b',
    right: { left: null, label: 'c', right: null }
  },
  label: 'd',
  right:{
    left: { left: null, label: 'e', right: null },
    label: 'f',
    right: { left: null, label: 'g', right: null }
  }
}
*/

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}
console.log(result) // ['a', 'b', 'c', 'd', 'e', 'f', 'g']

```

### 8. 作为对象属性的 Generator 函数

如果一个对象的某个属性是一个 Generator 函数，语法为：

```js
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};

// 简写：
let obj = {
  * myGeneratorMethod () {
    ···
  }
};
```

### 9. Generator 函数的`this`

Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的`prototype`对象上的方法。

```js
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

上面代码表明，Generator 函数`g`返回的遍历器`obj`，是`g`的实例，而且继承了`g.prototype`。但是，如果把`g`当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是`this`对象。

```js
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```

上面代码中，Generator 函数`g`在`this`对象上面添加了一个属性`a`，但是`obj`对象拿不到这个属性。

Generator 函数也不能跟`new`命令一起用，会报错。

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3

```

让 Generator 函数返回一个正常的对象实例，既可以用`next`方法，又可以获得正常的`this`？

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

// 执行的是遍历器对象 f
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

// 生成的对象实例是 obj
obj.a // 1
obj.b // 2
obj.c // 3
```

将这两个对象统一：一个办法就是将`obj`换成`F.prototype`。这样属性和方法都挂在 `prototype` 上。

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

再将`F` 改成构造函数，就可以对它执行 `new` 命令了。

```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

```

### 10. 含义

略...

### 11. 应用

Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。

#### (1) 异步操作的同步化表达

Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

```js
// 请求函数，回调中执行 next()
function request(url) {
  makeAjaxCall(url, function(res){
    it.next(res); // 响应数据需要通过 next() 的参数传给 yield 语句
  });
}

// 主函数：调用请求函数发送请求
function* main() {
  var result = yield request("http://some.url"); // 发送请求后暂停，在请求中调用 next() 继续
  var resp = JSON.parse(result);
    console.log(resp.value);
}

var it = main();
it.next(); // 开始执行主函数

```

通过 Generator 函数逐行读取文本文件。

```js
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
```

上面代码打开文本文件，使用yield表达式可以手动逐行读取文件。

#### (2) 控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});


// 采用 Promise 改写上面的代码。
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
```

Generator 函数可以进一步改善代码运行流程。

```js
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```

注意，上面这种做法，只适合同步操作，即所有的`task`都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。

下面，利用`for...of`循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。

```js
// 分布操作
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}

// 先分工作，每一项工作再分布操作
let jobs = [job1, job2, job3];

function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}

for (var step of iterateJobs(jobs)){
  ...
}
```

```js
// for...of的本质是一个while循环，所以上面的代码实质上执行的是下面的逻辑。

var it = iterateJobs(jobs);
var res = it.next();

while (!res.done){
  var result = res.value;
  // ...
  res = it.next();
}

```

#### (3) 部署 Iterator 接口

利用 Generator 函数，可以在任意对象上部署 Iterator 接口，实现对象的遍历。

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };
let genObj = iterEntries(myObj)
console.log(
  genObj.next(), // { value: [ 'foo', 3 ], done: false }
  genObj.next(), // { value: [ 'bar', 7 ], done: false }
  genObj.next() // { value: undefined, done: true }
)

```

下面是一个对数组部署 Iterator 接口的例子，虽然数组原生就具有这个接口。

```js
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
```

#### (4) 作为数据结构

Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

```js
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
```

上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。

```js
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```

实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。

```js
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
```

上面的函数，可以用一模一样的`for...of`循环处理！两相一比较，就不难看出 Generator 使得数据或者操作，具备了类似数组的接口。

### 12. 异步应用

#### (1) 异步任务的封装

```js
var axios = require('axios')
function* fn () {
  console.log('start');
  let res = yield axios.get('https://www.easy-mock.com/mock/5c36f2a48a4d935443d8598b/example/list')
  console.log('接收到res', res)
}

let genObj = fn(); // 获得遍历器对象

let res = genObj.next(); // 开始执行，value 为拿到异步请求的处于 pending 状态的 promise 对象
console.log('out', res)
res.value.then((r) => { // promise 执行下一步 then
  console.log(typeof r.data)
  genObj.next(r.data) // 将请求的数据放入 next() 中作为上次执行 yield 语句的返回值
})

// start
// out { value: Promise { <pending> }, done: false }
// object
// 接收到res { data: { name: 'tom', age: 22 } }

```

#### (2) Generator 自动执行控制

两种方法可以做到这一点。

- 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
- Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

##### 基于 Promise 对象的自动执行

```js
// 首先，把fs模块的readFile方法包装成一个 Promise 对象。
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 然后，手动执行上面的 Generator 函数：用then方法，层层添加回调函数
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});

```

写出一个自动执行器：

```js
function run(gen){
  var g = gen();
  // 只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen); // 传入一个 Generator 函数
```
