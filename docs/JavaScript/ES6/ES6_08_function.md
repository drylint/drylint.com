[TOC]

## 函数的扩展

- 函数参数的默认值
- rest 参数
- 严格模式
- name 属性
- 箭头函数
- 尾调用优化
- 函数参数的尾逗号

### 1. 函数参数的默认值

#### (1) 基本用法

- es6 之前不支持参数默认值，只能写为：

    ```js
    // 缺点：如果想给 y 传入 false, '', null, 0, 但还是会被赋值为默认值。
    function log(x, y) {
      y = y || 'World'
      console.log(x, y)
    }

    log(1) // 1 "World"
    log(1, 0) // 1 "World"
    log(1, '') // 1 "World"
    log(1, null) // 1 "World"
    log(1, NaN) // 1 "World"

    // 改进的写法：参数 === undefined 时才使用默认值
    function log2(x, y) {
        y = y === undefined ? 'world' : y
        console.log(x, y)
    }

    log2(1) // 1 "World"
    log2(1, 0) // 1 0
    log2(1, '') // 1 ''
    log2(1, null) // 1 null
    log2(1, NaN) // 1 NaN
    ```

- ES6 默认值，`参数 === undefined` 时才使用默认值

    ```js
    function log(x, y = 'world') {
      console.log(x, y)
    }

    log(1) // 1 "World"
    log(1, undefined) // 1 "World"
    log(1, 0) // 1 0
    log(1, '') // 1 ''
    log(1, null) // 1 null
    log(1, NaN) // 1 NaN
    ```

> 参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。
> 使用参数默认值时，函数不能有同名参数。
> 参数默认值是惰性求值的。每次调用函数都重新计算 `默认值表达式` 的值。

#### (2) 默认值 + 解构赋值

```js
// 解构有默认值，参数无默认值
function foo ({x, y = 5}) { // y 使用解构默认值
    console.log(x, y)
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
// 调用函数没有传参，则函数参数为 undefined，再从 undefined 之中解构 x, y 则报错
foo() // TypeError: Cannot read property 'x' of undefined

//  解构默认值 + 参数默认值
function foo ({x, y = 5} = {}) { // 默认值为空对象， y 使用解构默认值
    console.log(x, y)
}

foo() // undefined 5
```

> `解构默认值` + `参数默认值` 结合使用是不错的选择。

##### 注意

- 参数默认值的位置：有默认值的参数须放在最后，无默认值的参数须在前。（唯一特例：除非显示地传入 `undefined` 去激活默认值）
- 函数的 `length` 属性：只计入默认值参数之前的参数个数，默认值参数及之后的所有参数均不计入。`...rest` 参数也不会计入。

    ```js
    (function (a, b = 1, c, d, ...rest) {}).length // 1
    ```

#### (3) 默认值参数作用域

函数参数 `()` 内如果有默认值，声明时则会形成一个单独作用域。初始化后会消失。

```js
let x = 1
function foo(x, y = function() { x = 2; }) {
  var x = 3 // 只能用 var 不能用 let，因为 let 不允许重复声明 x，和参数 x 不是同一个
  y() // 修改 x 的值为 2，但修改的是参数作用域中的 x，而不是函数体内声明的 x
  console.log(x) // 访问的是函数体内的 x，依然是 3
}

foo() // 3
console.log(x) // 1，全局作用域的 x 未被影响

```

函数 `foo` 的参数有默认值，则`()`内形成一个作用域，作用域内先声明了一个变量 `x` ，又声明了一个变量 y 并赋值一个匿名函数，函数内修改了变量 `x` 的值。

```js
// () 作用域实际上在执行

let x;
let y = function () {
    x = 2 // 指向本作用域的 x，和全局作用域的 x 无关。
}
```

`foo` 函数体内声明了一个变量 `x`， 该变量`x`与第一个参数`x`由于不是同一个作用域， 所以不是同一个变量，因此执行`y`后，并未修改函数体内的变量`x`，内部变量`x`和外部全局变量`x`的值都没变。

将 `foo` 函数体内的 `var` 去掉，则 函数体内的 x 指向 参数 x，执行 `y()`后局部变量则会被修改。

```js
let x = 1
function foo(x, y = function() { x = 2; }) {
  x = 3 // 指向 参数 x
  y() // 修改 x 的值为 2
  console.log(x) // 访问的是 参数 x
}

foo() // 2
console.log(x) // 1，访问的全局 x 未被影响

```

#### (4) 默认值的应用

##### 禁止省略参数

定义抛错函数并作为参数默认值，只要参数接收不到值就执行抛错函数。

```js
function throwIfMissing() {
 throw new Error('Missing parameter'); // 函数只要一执行则抛出错误
}

// 将抛出错误的函数作为参数默认值
// 只要参数没有接收到值，则会触发默认值函数执行，然后抛错
// 接收到值(undefined 除外)则忽略默认值函数
function foo(x = throwIfMissing()) {
 console.log(x)
}
  
foo(1) // 1
foo() // Error: Missing parameter
```

##### 允许省略参数

将参数默认值设为undefined，表明这个参数是可以省略的。

```js
function foo(optional = undefined) { ··· }
```

### 2. `...rest` 参数

用于将多余的参数放入 `数组 rest` 中，这样就不需要使用 `arguments` 对象了。

```js
// arguments变量的写法
function sortNumbers() {
  // Array.prototype.slice.call(arguments) 将 类数组 arguments 转为数组
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

```

> `...rest` 必须放在函数参数的末尾，否则报错
> 函数的 `.length` 属性 不计入 `rest` 参数

### 3. 严格模式

从 ES5 开始，函数内部可以设定为严格模式。

```js
function doSomething(a, b) {
  'use strict';
  // code
}

```

ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但此时参数已经执行完毕，所以和函数体的严格模式可能会冲突。

两种方法可以规避这种限制。

- 第一种是设定全局性的严格模式，这是合法的。

    ```js
    'use strict';

    function doSomething(a, b = a) {
      // code
    }
    ```

- 第二种是把函数包在一个无参数的立即执行函数(IIFE)里面。

   ```js
    const doSomething = (function () {
      'use strict';
      return function(value = 42) {
        return value;
      };
    }());
    ```

### 4. `name` 属性

函数的name属性，返回该函数的函数名。  
ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

```js
function fn () {}
let fn2 = function () {}

// es5
console.log(fn.name) // fn
console.log(fn2.name) // ''

// es6
console.log(fn.name) // fn
console.log(fn2.name) // fn2
```

`Function` 构造函数返回的函数实例，`name` 属性的值为 `anonymous` 。

```js
(new Function).name // "anonymous"
```

`bind` 返回的函数，`name` 属性值会加上 `bound` 前缀。

```js
function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "

```

### 5. 箭头函数

ES6 允许使用 '箭头'  `=>` 定义函数。

> 不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
> 代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
> 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
> 如果箭头函数只有一行语句，且不需要返回值 `let fn = () => void doesNotReturn();`

#### 注意

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

```js
function Fn () {
 this.a = 1;
 this.b = 2;
 (
  () => {
   this.a = 3 // this 指向 匿名函数的外部 this， 实例对象
  }
 )();
 (
  function () {
   this.b = 4 // this 指向 window，相当于在 修改全局变量 b 为 4
  }
 )();
}

let obj = new Fn()
console.log(obj) // Fn { a: 3, b: 2 } // 箭头函数的修改影响到了对象的值
console.log(b) // 4 全局变量 b

```

#### 箭头函数不适用场合

##### 1. 定义对象的方法，且该方法内部包括this

```js
const obj = {
 a: 1,
 fn: () => { // 箭头函数内 this 同 外部 this，但对象的大括号没有作用域，则为 window。
  console.log(this.a) // this 指向 函数外部的 this
 },
 fn2: function () {
  console.log(this.a)
 },
 fn3 () {
  console.log(this.a)
 }
}
obj.fn() // undefined
obj.fn2() // 1
obj.fn3() // 1

```

##### 2. 需要动态this的时候，也不应使用箭头函数

```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on'); // this 需要指向 button，但箭头函数让 this 指向 window
});

```

##### 3. 函数体很复杂时

有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

### 6. 尾调用

#### (1) 尾调用

尾调用（Tail Call）是函数式编程的一个重要概念，就是指某个函数的 ***最后一步*** 是调用另一个函数。
> 函数的最后一步就是 `return`。也就是必须在 `return` 中调用另一个函数。且 `return` 中除了调用函数以外没有其他操作。

```js
// 尾调用

// 函数 f 的最后一步是调用函数 g，这就叫尾调用。
function f(x){
  return g(x);
}
// 尾调用不一定出现在函数尾部，只要是最后一步（return）操作即可。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}

// 以下三种情况，都不属于尾调用。

// 情况一
function f(x){
  let y = g(x);
  return y; // 不是在 return 中调用函数则不算是最后一步调用。
}

// 情况二
function f(x){
  return g(x) + 1; // 调用函数后还执行 + 1 操作，不属于最后一步调用。
}

// 情况三
function f(x){
  g(x); // 不是在 return 中调用，函数默认还会执行 return undefined
  // return undefined
}

```

#### (2) 尾调用优化(Tail call optimization)

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  // 最后一步调用g之后，函数f就结束了，外层 f() 的调用帧被删除，只保留内层 g(3) 的调用帧。
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);

// 如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、g 的调用位置等信息。
```

> 尾调用优化：只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用栈之中调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

##### 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

#### (3) 递归 & 尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```js
// 普通递归：利用递归求阶乘

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // 调用栈中需要保存 n 个调用记录，n 越大越复杂
}

factorial(10) // 3628800，调用栈中出了外层调用记录，还多保存了 10 个内层调用记录

// nodejs
console.log(factorial(11385)) // Infinity
console.log(factorial(11386)) // RangeError: Maximum call stack size exceeded

// Chrome
console.log(factorial(22814)) // Infinity
console.log(factorial(22815)) // RangeError: Maximum call stack size exceeded


// 利用尾递归求阶乘

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total); // 尾递归，只保留一个调用记录
}

factorial(10, 1) // 3628800 从头到尾，调用栈中就只有一个调用帧，外部调用每一次都被删除

// nodejs
console.log(factorial(10436, 1)) // Infinity
console.log(factorial(10437, 1)) // RangeError: Maximum call stack size exceeded
// Chrome
console.log(factorial(20913, 1)) // Infinity
console.log(factorial(20914, 1)) // RangeError: Maximum call stack size exceeded
```

##### 利用尾递归完成 斐波拉契数列

```js
// 非尾递归实现：
function Fibonacci (n) {
 if ( n <= 1 ) {return 1};
 return Fibonacci(n - 1) + Fibonacci(n - 2);
}
  
console.log(Fibonacci(10)) // 89
console.log(Fibonacci(100)) // 超时
console.log(Fibonacci(500)) // 超时


// 尾递归实现：
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
 if( n <= 1 ) {return ac2};
 return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
  
console.log(Fibonacci2(100)) // 573147844013817200000
console.log(Fibonacci2(1000)) // 7.0330367711422765e+208
console.log(Fibonacci2(10000)) // Infinity

```

##### 递归函数的改写

尾递归的实现，往往需要改写递归函数，确保最后一步 `return` 操作只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

```js
// 初步尾递归改写，将用到的内部变量 total 改写成 函数参数
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total); // 尾递归
}

factorial(10, 1)

// 1. 利用默认值改写：
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(10) // 3628800

// 2. 是在尾递归函数之外，再提供一个正常形式的函数。
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

// 通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial
factorial(5) // 120

```

##### 柯里化（currying）

函数式编程的一个概念，意思是将多参数的函数转换成单参数的形式。

这里改写尾递归也可以使用柯里化。

```js
// 通过柯里化，将尾递归函数 tailFactorial 变为只接受一个参数的 factorial 。
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);
/*
// 此时 factorial 相当于：
factorial = function (m) {
    return tailFactorial.call(this, m, 1)
}
*/

factorial(5) // 120

```

#### (4) 严格模式

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

```js
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
```

### 7. 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
