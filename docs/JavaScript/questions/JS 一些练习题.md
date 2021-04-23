# JS 一些练习题

## 常见练习题

### 1. 判断输出结果

```js
var a = { n:1 }
var b = a
a.x = a = { n:2 }
console.log(a.x)
console.log(b.x)

// undefined
// Object{n:2}
```

### 2. 判断输出结果

```js
var a = { n:1 }
var b = a
a = { n:2 }
a.x = {n:2}
console.log(a.x)
console.log(b.x)

//Object{n:2}
//undefined
```

### 3. fizzbuzz

```js
// 第 1 种
let fizzbuzz = (a, b) => {
  for (let i = a; i <= b; i++){
    console.log(
      i % 3 === 0 && i % 5 === 0 ? 'fizzbuzz' :
      i % 3 === 0 ? 'fizz' :
      i % 5 === 0 ? 'buzz' : i
    )
  }
}
fizzbuzz(1, 100)

// 第 2 种
let fizzbuzz2 = (a, b) => {
  for (let i = a; i <= b; i++) {
    console.log(
      ((i % 3 === 0 ? 'fizz' : '') + (i % 5 === 0 ? 'buzz' : '')) || i
    )
  }
}
fizzbuzz2(1, 100)

```

### 4. 判断输出结果

```js
function fn (a) {
  return (a) => {
    console.log(1, a)
    return (a) => {
      console.log(2, a)
    }
  }
}

console.log(fn()()('value'))

/*

1 undefined
2 "value"
undefined

*/

```

### 5. 数组去重

```js
let arr = [1, 1, true, true, '123', '123', undefined, undefined, null, null]
//ES6 方法：
console.log([...new Set(arr)]) // [1 true '123' undefined null]
console.log([...new Set(arr)]) // [1 true '123' undefined null]
// 适用于包含基本类型的数组：undefined、null、boolean、string和number。
// 如果数组中包含了一个object,function或其他数组，那就需要使用另一种方法。

// ES5 方法：
console.log(
  arr.filter((item, i) => arr.indexOf(item) === i)
)

// 当前元素的下标 等于 此元素在元素组中第一个下标，则保留当前元素。其余的则被排除。
```

### 6. 获取两个数组的交集、并集等

```js
// 交集
let arr1 = [1, 2, 3, 4]
let arr2 = [1, 3, 5, 7]
let jiaoji = arr1.filter(item => arr2.includes(item))
console.log(jiaoji) // [ 1, 3 ]
```

### 7. 如何让 a == 1 && a == 2 && a == 3 为true

```js
// 重写劫持 Object.prototype.valueOf() 方法
var a = {
  arr: [1, 2, 3],
  valueOf () {
    return this.arr.shift()
  }
}

console.log(
  a == 1, // true
  a == 2, // true
  a == 3 // true
)

// 重写劫持 Object.prototype.toString() 方法
var b = {
  arr: [1, 2, 3],
  toString () {
    return this.arr.shift()
  }
}
console.log(
  b == 1, // true
  b == 2, // true
  b == 3 // true
)

// ES6 中，可以重写劫持 [Symbol.toPrimitive]() 方法
var c = {
  arr: [1, 2, 3],
  [Symbol.toPrimitive] () {
    return this.arr.shift()
  }
}
console.log(
  c == 1, // true
  c == 2, // true
  c == 3 // true
)

// 利用重写 Array.prototype.join() 实现
var arr5 = [1, 2, 3];
arr5.join = arr5.shift
console.log(
  arr5 == 1, // true
  arr5 == 2, // true
  arr5 == 3, // true
)

// 劫持对象的 getter 实现
var ALL = null
try { // 兼容浏览器 和 Node 的写法
  ALL = window;
} catch (err) {
  ALL = global;
}

ALL.value = 0;
Object.defineProperty(ALL, 'a', {
  get () {
    return ++this.value
  }
})
console.log(
  a == 1, // true
  a == 2, // true
  a == 3, // true
  a == 4, // true
  a == 5, // true
)

// 通过ES6 的 Proxy 代理 劫持 getter
let a = new Proxy({}, {
  value: 0,
  get () {
    return () => {
      return ++this.value
    }
  }
})

console.log(
  a == 1,
  a == 2,
  a == 3,
  a == 4,
  a == 5,
)

// 使用对象中的正则

// 原理
var reg = /\d/g
console.log(reg.exec(123)) // [ '1', index: 0, input: '123', groups: undefined ]
console.log(reg.exec(123)) // [ '2', index: 1, input: '123', groups: undefined ]
console.log(reg.exec(123)) // [ '3', index: 2, input: '123', groups: undefined ]
console.log(reg.exec(123)) // null

// 实现
var a = {
  reg: /\d/g,
  valueOf () {
    return this.reg.exec(123)[0]
  }
}

console.log(
  a == 1,
  a == 2,
  a == 3,
)
```

### 7.2 如何让 `a === 1 && a === 2 && a === 3` 返回 true

```js
var value = 0
Object.defineProperty(window, 'a', {
    get: function () {
        return this.value += 1
    }
})

console.log(a === 1 && a === 2 && a === 3)
```

### 8. 数组映射

```js
const arr = [
  {
    uname: 'Tom',
    age: '18'
  },
  {
    uname: 'Jerry',
    age: '17'
  },
  {
    uname: 'Bob',
    age: '20'
  },
]

// 使用 map() 循环
console.log(arr.map(item => item.uname)) // [ 'Tom', 'Jerry', 'Bob' ]

// Array.from(arr, mapFunc, thisObj) 的mapFunc 回调函数自带循环效果，相当于 map()
console.log(Array.from(arr, item => item.uname)) // [ 'Tom', 'Jerry', 'Bob' ]
console.log(Array.from(arr, ({uname}) => uname)) // [ 'Tom', 'Jerry', 'Bob' ]
```

### 9. 对浮点数快速取整（截取小数点前的数）

使用 `|` 运算符

```js
console.log(1.9 | 0) // 1
console.log(1.1 | 0) // 1
console.log(-1.9 | 0) // -1
console.log(-1.9 | 0) // -1

// 同样地，可以快速获取整数的前几位
console.log(1553 / 10   | 0) // 155
console.log(1553 / 100  | 0) // 15
console.log(1553 / 1000 | 0) // 1
```

### 10. 输出结果

```js

['1', '2', '3'].map(parseInt)

// [ 1, NaN, NaN ]
```

```js
// 解析：

// 数组实例的 map() 方法 接收的第一个参数是回调函数，并且传递三个参数给回调函数
arr.map((item, index, arr) => {}, thisArg)

// 上例将 parseInt() 函数作为了回调函数，所以相当于会循环执行
parseInt(item, index, arr)

// 而 parseInt() 接收两个参数，第一个待取整项，第二个为指定第一个参数是多少进制的基数(2~36)
parseInt(str, radix)
// 若 str 不是字符串，转为字符串，toString抽象操作，开头的空白符会被忽略。
// 若 radix 为 undefined ，0，或没有指定的情况下，JavaScript 作如下处理：
// 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
// 如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。
// ECMAScript 5 规定使用10，建议明确给出radix参数的值。
// 如果字符串 string 以其它任何值开头，则基数是10 (十进制)。

// 所以相当于执行了
['1', '2', '3'].map((item, index) => {
 return parseInt(item, index)
})

// 函数体内
parseInt('1', 0) // 1 // radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。
parseInt('2', 1) // NaN // 基数值必须位 2 ~ 36，指定为 1 无法解析
parseInt('3', 2) // NaN // 指定基数为2（2进制），但第一个参数不是2进制，所以无法解析。
```

```js
// 同理，另一种：

['10','10','10','10','10'].map(parseInt);
// [10, NaN, 2, 3, 4]

```

### 11. setTimeout、Promise、Async/Await 的区别

### 12. 异步执行结果输出顺序

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

/*
script start
async1 start
async2
promise1
script end
promise2
async1 end
setTimeout

*/

```

### 13. React setState() 执行顺序问题

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};

// 0 0 2 3
```

在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

**原因：** 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。

输出： 0 0 2 3

### 14. `['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']` 和 `['A', 'B', 'C', 'D']`，合并为 `[ 'A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D' ]`

```js
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']

let res = [].concat(
  ...arr2.map(item2 => {
    return arr1.filter(item1 => item1.startsWith(item2)).sort((a, b) => a - b).concat([item2])
  })
)


console.log(res)

// [ 'A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D' ]
```

### 14. setTimeOut() 中输出 0 ~ 9 而不是 十个 10

```js
for (var i = 0; i< 10; i++){
 setTimeout(() => {
  console.log(i);
    }, 10)
}

// 10 10 10 10 10 10 10 10 10 10

// 方法一：
for (let i = 0; i< 10; i++){
 setTimeout(() => {
  console.log(i);
    }, 10)
}

// 方法二：
for (var i = 0; i< 10; i++){
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 10)
  })(i)
}

for (var i = 0; i< 10; i++){
 setTimeout(((i) => () => console.log(i))(i), 10)
}
```

### 15. 以下分别输出什么

```js
var a = 10;
function foo() {
    console.log(a); // ??
    var a = 20;
}
foo();

// undefined // var a = 20 变量提升
```

```js
var a = 10;
function foo() {
    console.log(a); // ??
    let a = 20;
}
foo();

// ReferenceError: a is not defined // let a = 20 形成暂时性死区，访问 a 报错
```

### 16. 闭包：newArray 的值

```js
var array = [];
for(var i = 0; i <3; i++) {
 array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // ??

// [ 3, 3, 3 ]
```

```js
var array = [];
for(let i = 0; i <3; i++) {
 array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // ??

// [ 0, 1, 2 ]
```

### 17. 如果我们在浏览器控制台中运行`foo`函数，是否会导致堆栈溢出错误

```js
function foo() {
  setTimeout(foo, 0); // 是否存在堆栈溢出错误?
};
```

不会溢出

1. 调用 foo()会将foo函数放入调用堆栈(call stack)。

2. 在处理内部代码时，JS引擎遇到setTimeout。

3. 然后将foo回调函数传递给WebAPIs(箭头1)并从函数返回，调用堆栈再次为空

4. 计时器被设置为0，因此foo将被发送到任务队列 `<Task Queue>` (箭头2)。

5. 由于调用堆栈是空的，事件循环将选择foo回调并将其推入调用堆栈进行处理。

6. 进程再次重复，堆栈不会溢出。

### 16. 如果在控制台中运行以下函数，页面(选项卡)的 UI 是否仍然响应

```js
function foo() {
  return Promise.resolve().then(foo);
};
foo()
```

不会响应

JavaScript中有宏任务和微任务。setTimeout回调是宏任务，而Promise回调是微任务。

主要的区别在于他们的执行方式。宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此，如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务。只有当微任务队列为空时，事件循环才会重新渲染页面

每次调用 `foo()` 都会继续在微任务队列上添加另一个 `foo` 回调，因此事件循环无法继续处理其他事件（滚动，单击等），直到该队列完全清空为止。因此，它会阻止渲染。

### 17. 使用展开运算符（`...`）遍历对象的值

```js
var obj = { x: 1, y: 2, z: 3 };
[...obj]; // TypeError
```

展开语法 和 for-of 语句遍历iterable对象定义要遍历的数据。Array 或Map 是具有默认迭代行为的内置迭代器。对象不是可迭代的，但是可以通过使用iterable和iterator协议使它们可迭代。

通过对象的 `[Symbol.iterator]()` 方法设置遍历

```js
var obj = { x: 1, y: 2, z: 3 };
obj[Symbol.iterator] = function() {

  // iterator 是一个具有 next() 方法的对象，
  // 它的返回至少有一个对象
  // 两个属性：value＆done。

  // 返回一个 iterator 对象
  return {
    next: function() {
      if (this._countDown === 3) {
        const lastValue = this._countDown;
        return { value: this._countDown, done: true };
      }
      this._countDown = this._countDown + 1;
      return { value: this._countDown, done: false };
    },
    _countDown: 0
  };
};
console.log([...obj]); // [ 1, 2, 3 ]

```

使用生成器函数 `generator` 也可以：

```js
var obj = { x: 1, y: 2, z: 3}
obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
}
console.log([...obj]); // 打印 [1, 2, 3]

```

### 18. 运行以下代码片段时，控制台上会打印什么

```js
var obj = { a: 1, b: 2 };
Object.setPrototypeOf(obj, {c: 3});
Object.defineProperty(obj, 'd', { value: 4 });

for(let key in obj) {
    console.log(key);
}

// a b c
```

`for...in` 循环遍历对象本身的可枚举属性以及对象从其原型继承的属性。

```js

var obj = { a: 1, b: 2 }; //a，b 的属性 enumerable: true

// 将{c：3}设置为'obj'的原型，obj 会继承，for-in 循环也迭代继承的属性
Object.setPrototypeOf(obj, { c: 3 });

// defineProperty 设置的属性 默认 enumerable: false
Object.defineProperty(obj, "d", { value: 4 });
console.log(Object.getOwnPropertyDescriptor(obj, 'd'))
/*
{
  value: 4,
  writable: false,
  enumerable: false,
  configurable: false
}
*/
for (let prop in obj) {
  console.log(prop);
}

// a
// b
// c
```

### 19. 判断输出结果

```js
var x = 10;
var foo = {
  x: 90,
  getX: function() {
    console.log(this.x)
  }
};
foo.getX();
var xGetter = foo.getX;
xGetter();
var xGetter2 = foo.getX.bind(foo);
xGetter2();

// 90 // this => foo
// 10 // this => window
// 90 // this 被绑定到指向 foo 对象
```

### 20. 创建一个函数来判断给定的表达式中的大括号是否闭合，返回 `true | false`，对于空字串，返回 `true`

> 若仅仅查找各种括号的个数，这种括号是不匹配的：`}{`

```js
let expression = "{{}}{{}{}}{}"
let expressionFalse = "{}}{{}"

function isBalanced(exp){
  let info = exp.split("")
  let stack = []
  for(let i = 0; i < info.length; ++i){
      let el = info[i]
      if (el == "{"){
        stack.push("{")
      }
      else if (el == "}"){
        if(stack.length === 0){
          return false
        }
        stack.pop()
      }
  }
  return stack.length === 0
}

console.log(
  isBalanced(expression)
)
console.log(
  isBalanced(expressionFalse)
)

```

#### 升级：判断三种类型的括号 `{}`，`[]`，和 `()` 是否达到闭合平衡

```js
let exp1 = '(foo { bar (baz) [boo] })'
let exp2 = 'foo { bar { baz }'
let exp3 = 'foo { (bar [baz] } )'

const isBalanced = (str) => {
  const map = new Map([
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ])
  let stack = []
  for(let i = 0 ; i < str.length; ++i){
    let node = str[i]
    if (map.has(node)){
      stack.push(node)
    }
    else if ([...map.values()].includes(node)){
      if (
        stack[stack.length - 1] !== [...map.entries()].filter(el=>el[1]===node).pop().shift()
      ){
        return false
      }
      stack.splice(stack.length-1, 1)
    }
  }
  return stack.length === 0
}

console.log(isBalanced(exp1)) // true
console.log(isBalanced(exp2)) // false
console.log(isBalanced(exp3)) // false

```

### this 问题

```js
let fn = function () {
  console.log(this)
}
let obj = { fn }

(fn, obj.fn)() // window ，(fn, obj.fn) 返回右侧，但此时已经不是 obj 在调用它

(obj.fn)() // obj
```

### 判断输出结果

```js
function Foo() {
  getName = function () { console.log(1); };
  console.log(this)
  return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3

// 注意点：

// new Foo().getName() 相当于
new (Foo.getName)();
// 也相当于
var a = new Foo()
a.getName()


// new new Foo().getName() 相当于
new ((new Foo()).getName)();
// 也相当于
var a = new Foo()
var b = a.getName
var c = new b() // 其实第一个 new 和最后的 () 才是配对的
```

```js
function Foo() {
this.getName = function() {
console.log(3);
return {
getName: getName //这个就是第六问中涉及的构造函数的返回值问题
}
}; //这个就是第六问中涉及到的，JS构造函数公有方法和原型链方法的优先级
getName = function() {
console.log(1);
};
return this
}
Foo.getName = function() {
console.log(2);
};
Foo.prototype.getName = function() {
console.log(6);
};
var getName = function() {
console.log(4);
};

function getName() {
console.log(5);
} //答案：
Foo.getName(); //2
getName(); //4
console.log(Foo())
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
//多了一问
new Foo().getName().getName(); //3 1
new new Foo().getName(); //3
```
