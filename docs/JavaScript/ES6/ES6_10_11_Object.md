
## 对象的扩展

- 属性的简洁表示法
- 属性名表达式
- 方法的 name 属性
- 属性的可枚举性和遍历
- super 关键字
- 对象的扩展运算符

### 1. 属性和方法写法简化

```js
// 属性写法简化： 将变量名作为属性名，变量值作为属性值时，可以直接写变量名
let foo = 'bar';
let baz = { foo }; // 等同于 let baz = {foo: foo};
console.log(baz) // {foo: "bar"}

// 方法写法简化
let tom = {
  name: 'tom',
  intro () {
    return `I am ${this.name}`;
  }
};

// 等同于
let tom = {
  name: 'tom',
  intro: function () {
    return `I am ${this.name}`;
  }
};

// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
let tom = {
  _name: 'tom',
  get name () { return this._name},
  set name (value) {this._name = value}
}

// 如果某个方法的值是一个 Generator 函数，前面需要加上星号。
const obj = {
  * m() {
    yield 'hello world';
  }
};
let g = obj.m()
console.log(g.next()) // { value: 'hello world', done: false }
console.log(g.next()) // { value: undefined, done: true }

```

### 2. 属性名表达式

字面量方式定义对象时：

```js
// ES5 只能直接用标识符作为属性名
let obj = {
  foo: true,
  abc: 123
};

// ES6 允许使用方括号内放置表达式来作为属性名或方法名： [表达式]
let propKey = 'foo';
let withSpace = 'hello world'
let obj = {
  [propKey]: true,
  [withSpace]: 'Hi',
  ['a' + 'bc']: 123,
  ['h' + 'ello']() {
    console.log('hello')
  }
  
};
console.log(obj)
/*
{
  foo: true,
  'hello world': 'Hi',
  abc: 123,
  hello: [Function: hello]
}
*/
obj.hello() // hello
```

属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 `'[object Object]'`, 多个的话会最后一个覆盖前面的。

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

console.log(myObject) // { '[object Object]': 'valueB' }

```

### 3. 对象方法的 `name` 属性

同普通函数的 `name` 属性一样，对象方法也是函数，也有name属性。

```js
let tom = {
  _name: 'tom',
  intro () {
    return `I am ${this.name}`;
  },
  get name () { return this._name},
  set name (value) {this._name = value}
};

console.log(tom.intro.name) // intro

let descriptor = Object.getOwnPropertyDescriptor(tom, 'name');
console.log(descriptor.get.name) // get name
console.log(descriptor.set.name) // set name
```

两种特殊情况：

- Function构造函数创造的函数，name属性返回anonymous。
- bind方法创造的函数，name属性返回bound加上原函数的名字；

```js
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

使用一个 Symbol 值 作为对象的方法名，此函数的 name 属性返回的是这个 Symbol 值的描述。

```js
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
console.log(obj[key1].name) // "[description]"， key1 对应的 Symbol 值有描述
console.log(obj[key2].name) // "" ， key2 没有描述。

```

### 4. 属性的可枚举性和遍历

#### (1) 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。`Object.getOwnPropertyDescriptor` 方法可以获取该属性的描述对象。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

这个描述对象中的 `enumerable` 属性， 称为“可枚举性”，为 `false` 时，某些操作会忽略（跳过）当前属性。

目前，有四个操作会跳过 `enumerable` 为 `false` 的属性。

- `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()` ：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`：只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个 `Object.assign()` 是 ES6 新增的。其中，只有 `for...in` 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。

实际上，引入“可枚举”（ `enumerable` ）这个概念的最初目的，就是让某些属性可以规避掉 `for...in` 操作，不然所有内部属性和方法都会被遍历到。

比如，对象原型的 `toString` 方法，以及数组的 `length` 属性，`enumerable` 值都是 `false` ，实例继承后，`for...in` 遍历继承的属性时会跳过这些不可遍历的属性。

```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false

Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。因为它们都设置了 `enumerable` 为 `false`

```js
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```

> 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用 `for...in` 循环，而用 `Object.keys()` 代替。

#### (2) 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

##### （1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

##### （2）Object.keys(obj)

 `Object.keys` 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

##### （3）Object.getOwnPropertyNames(obj)

 `Object.getOwnPropertyNames` 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

##### （4）Object.getOwnPropertySymbols(obj)

 `Object.getOwnPropertySymbols` 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

##### （5）Reflect.ownKeys(obj)

 `Reflect.ownKeys` 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

1. 首先遍历所有数值键，按照数值升序排列。
2. 其次遍历所有字符串键，按照加入时间升序排列。
3. 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
// 属性次序：首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。
```

### 5. super 关键字

`this` 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 `super` ，指向当前对象的原型对象。

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo; // 通过super.foo引用了原型对象 proto 的 foo 属性。
  }
};

// 将 proto 设为 obj 的原型对象，则在 obj 中访问 super 就相当于访问 proto
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"

```

> 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

以下前三种 `super` 的用法都会报错，因为对于 JavaScript 引擎来说，这里的 `super` 都没有用在对象的方法之中。第 4 种会被认为是用在了对象的方法中。

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  
  // super用在属性里面，报错
  // find1: super.foo, // SyntaxError: 'super' keyword unexpected here
  
  // super 虽然用在一个函数里面，却是通过赋值给对象的foo属性，不算在对象方法之中
  // find2: function () {
  //   return super.foo; //SyntaxError: 'super' keyword unexpected here
  // }
  
  // 同上
  // find3: () => {
  //   return super.foo // SyntaxError: 'super' keyword unexpected here
  // }
  
  // 目前，仅有对象方法简写会被认为是定义的是对象的方法，才可使用 super
  find4 () {
    return super.foo // hello
  }
};

Object.setPrototypeOf(obj, proto);

// ...调用函数省略
```

JavaScript 引擎内部， `super.foo` 等同于 `Object.getPrototypeOf(this).foo` （属性）或 `Object.getPrototypeOf(this).foo.call(this)` （方法）。

```js
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo(); // 指向原型对象proto的foo方法, 但是绑定的this却还是当前对象obj
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world" , this 指向 obj

```

### 6. 对象的扩展运算符(`...`)

ES2018 将 `...` 这个运算符引入了对象。

将目标对象 `自身的` 所有 `可遍历的（enumerable）`、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

#### (1) 解构赋值中： 扩展运算符`...` 用于剩余参数

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; // z: { a: 3, b: 4 }


// 解构赋值等号右边是undefined或null，就会报错，因为它们无法转为对象。
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误

解构赋值扩展运算符必须是最后一个参数，否则会报错。
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```

> 注意，解构赋值中扩展运算符的拷贝是浅拷贝，如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

用 `...obj` 复制一个对象时，不能复制这个对象 **继承** 自原型对象的属性。

```js
// 例 1：
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1; // o2 继承 o1 的原型
let { ...o3 } = o2; // o3复制了o2，只复制o2自身属性，没有复制原型对象o1的属性。
o3 // { b: 2 }
o3.a // undefined

// 例 2：
const o = Object.create({ x: 1, y: 2 }); // o 继承 x y 属性
o.z = 3; // z 是 o 的自身属性

let { x, ...newObj } = o; // ...newObj 无法复制 o 中继承的属性
let { y, z } = newObj;
x // 1 直接解构赋值取出，OK
y // undefined , newObj 无法复制到 o 中的继承属性 y
z // 3，z 是直接添加到 对象 o 之中的属性，可以被扩展运算符复制。

// ES6 规定，变量声明语句之中，如果使用解构赋值，
// 扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式
let { x, ...{ y, z } } = o; // 报错

```

#### (2) `...` 用于展开对象

取出对象的所有可遍历属性，拷贝到另一个对象之中。

对象的扩展运算符等同于使用 `Object.assign()` 方法。

```js
let z = { a: 3, b: 4 };
let n = { ...z }; // n: { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] }; // foo: {0: "a", 1: "b", 2: "c"}

// 如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1} // { a: 1 }

// 如果扩展运算符后面不是对象，则会自动将其转为对象。
{...1} // {},
// 自动转为数值的包装对象Number{1},
// 等同于 {...Object(1)}, 该对象没有自身属性，所以返回一个空对象。

{...true} // {} // 等同于 {...Object(true)}

{...undefined} // {} // 等同于 {...Object(undefined)}

{...null} // {} // 等同于 {...Object(null)}

// 扩展运算符后面是字符串，会自动转成一个类数组对象，返回的不是空对象。
{...'hello'} // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

```

扩展运算符(`...`) 和 `Object.assign()` 只是拷贝了对象实例的属性

如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

```js
// 写法一：__proto__属性在非浏览器的环境不一定部署，推荐使用写法二和写法三。
const clone1 = {
  __proto__: Object.getPrototypeOf(obj), // 取出obj的原型放到克隆对象上
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)), // 取出obj的原型放到克隆对象上
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj), // 取出obj的原型放到克隆对象上
  Object.getOwnPropertyDescriptors(obj)
)

```

合并对象时，相同属性会被最后一个覆盖。

```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

```js
const obj = {
  ...(x > 1 ? {a: 1} : {}),
  b: 2,
};
```

扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。

```js
// x 属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error('not throw yet');
  }
};

// x 属性会执行
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error('throw now');
    }
  }
};
```

## 对象的新增方法

- `Object.is()`
- `Object.assign()`
- `Object.getOwnPropertyDescriptors()`
- `__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()`
- `Object.keys()，Object.values()，Object.entries()`
- `Object.fromEntries()`

### 1. `Object.is()`

比较两个值是否严格相等。

在 ES5 中：

- `==` 会自动转换数据类型
- `===` NaN不等于自身，以及 +0 等于 -0

JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。

`Object.is` 与严格比较运算符（===）的行为基本一致

不同之处只有两个：一是 +0 不等于 -0，二是 NaN 等于自身。

```
// ES5 模拟：

Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

### 2. `Object.assign()`

用于对象的合并，将源对象（source）的所有**自身**的**可枚举**属性，**浅拷贝**到目标对象（target）。

第一个参数是目标对象，后面的参数都是源对象。

```js
Object.assign(obj1, obj2, obj3, ...)
```

- 同名属性，后面覆盖前面  
- 如果只有一个参数，`Object.assign` 会直接返回该参数。  
- 如果参数不是对象，则会先转成对象，然后返回。首参数转不了报错，非首参数转不了则会跳过。  
- 如果  `undefined` 和 `null` 作为参数，就会报错。因为无法转成对象。
- 数值、字符串和布尔值不在首参数，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。因为只有字符串的包装对象，会产生可枚举属性。

```js
// 同名属性对象直接替换：
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source) // a 对象直接被替换为 source 的 a对象，而不会合并
// { a: { b: 'hello' } }

// 合并数组

Object.assign([1, 2, 3], [4, 5]) // [4, 5, 3]， 下标一一对应直接替换

// 取值函数 getter 的处理： 不会复制函数，程序将求值后再复制。
let obj = {
  a: 1,
  get _a () {
    return this.a
  }
}

console.log(Object.assign({}, obj)) // { a: 1, _a: 1 }

```

### 3. `Object.getOwnPropertyDescriptors()`

ES5 的 `Object.getOwnPropertyDescriptor()` 返回对象某一个属性的描述对象（descriptor）。

ES2017 引入了  `Object.getOwnPropertyDescriptors()` 返回一个对象所有自身属性（非继承属性）的描述对象。

#### (1) 基本用法

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

console.log(Object.getOwnPropertyDescriptors(obj))
/*
{
  foo:
   { value: 123,
     writable: true,
     enumerable: true,
     configurable: true },
  bar:
   { get: [Function: get bar],
     set: undefined,
     enumerable: true,
     configurable: true }
}
*/

```

该方法的引入目的，主要是为了解决`Object.assign()`无法正确拷贝`get`属性和`set`属性的问题。

```js
// Object.assign() 拷贝问题
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source); // 将 source 对象 合并到 target1 中
console.log(target1) // { foo: undefined } // setter 函数 foo 成了 undefined
// 因为 Object.assign() 总是拷贝一个属性的值, 而不会拷贝它背后的setter或getter。
```

#### (2) 应用

- `Object.getOwnPropertyDescriptors()`+`Object.defineProperties()` 实现正确拷贝。

    ```js
    const source = {
      set foo(value) {
        console.log(value);
      }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    Object.getOwnPropertyDescriptor(target2, 'foo')
    // { get: undefined,
    //   set: [Function: set foo],
    //   enumerable: true,
    //   configurable: true }

    // 封装成为函数
    const shallowMerge = (target, source) => Object.defineProperties(
      target,
      Object.getOwnPropertyDescriptors(source)
    );
    ```

- 配合Object.create()方法，将对象属性浅拷贝到一个新对象。

    ```js
    // 克隆原型对象，以及对象自身所有属性的描述符对象
    const clone = Object.create(Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj));

    // 封装成为函数
    const shallowClone = (obj) => Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );

    ```

    ```js
    // 实例
    const shallowClone = (obj) => Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );

    const obj = {
      _a: 1,
      get a () {
        return this._a
      },
      set a (value) {
        this._a = value
      }
    }

    const obj2 = Object.assign({}, obj)
    console.log(obj2) // { _a: 1, a: 1 }

    const obj3 = shallowClone(obj)
    console.log(obj3) // { _a: 1, a: [Getter/Setter] }
    ```

- 实现一个对象继承另一个对象。

```js
// 原先写法：
const obj = {
  __proto__: prot,
  foo: 123,
};

// ES6 规定__proto__只有浏览器要部署，其他环境不用部署。
// 如果去除__proto__，上面代码就要改成下面这样。

const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

// 使用 Object.getOwnPropertyDescriptors 的新写法：
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
```

- 实现 Mixin（混入）模式

```js
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b); // 在对象 c 中混入对象 a, b

d.c // "c"
d.b // "b"
d.a // "a"

```

#### (3)该方法的实现

```js
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}

```

### 4. `__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()`

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

#### (1) `__proto__`属性

用来读取或设置当前对象的prototype对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

```js
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

该属性没有写入 ES6 的正文，而是写入了附录，原因是`__proto__`前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用以下方法代替。

- `Object.setPrototypeOf()`（写操作）
- `Object.getPrototypeOf()`（读操作）
- `Object.create()`（生成操作）。

该属性的实现，`__proto__`调用的是`Object.prototype.__proto__`

```js
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});

function isObject(value) {
  return Object(value) === value;
}

```

如果一个对象本身部署了`__proto__`属性，该属性的值就是对象的原型。

```js
const withProto = { __proto__: null }
console.log(Object.getPrototypeOf(withProto)) // null
```

#### (2) `Object.setPrototypeOf()`

作用与 `__proto__` 相同，用来设置一个对象的`prototype`对象，返回参数对象本身。

它是 ES6 正式推荐的设置原型对象的方法。

```js
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

// 等同于此函数
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

```js
// 实例

let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto); // 将proto对象设为obj对象的原型

proto.y = 20;
proto.z = 40;

console.log(obj) // { x: 10 } // obj 自身属性实际只有 x
console.log(obj.x) // 10
console.log(obj.y) // 20 从obj对象可以读取proto对象的属性。
console.log(obj.z) // 40 从obj对象可以读取proto对象的属性。
```

如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。

```js
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

// 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
```

#### (3) Object.getPrototypeOf()

用于读取一个对象的原型对象。

```js
Object.getPrototypeOf(obj);
```

```js
// 实例

function Rectangle() {
  // ...
}

const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype // true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype // false
```

如果参数不是对象，会被自动转为对象。

```js
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

// 如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
```

### 5. `Object.keys()，Object.values()，Object.entries()`

#### (1) Object.keys()

ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj) // ["foo", "baz"]
```

ES2017 引入了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用。

```js
let obj = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj)) // [ 'a', 'b', 'c' ]
console.log(Object.values(obj)) // [ 1, 2, 3 ]
console.log(Object.entries(obj)) // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```

#### (2) Object.values()

返回对象自身的（不含继承的）所有可遍历（enumerable）属性的键值组成的数组。

返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

会过滤属性名为 Symbol 值的属性。

```js
Object.values({ [Symbol()]: 123, foo: 'abc' }); // ['abc']
```

如果`Object.values()`方法的参数是一个字符串，会返回各个字符组成的一个数组。

```
Object.values('foo') // ['f', 'o', 'o']
```

字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，`Object.values()`返回每个属性的键值，就是各个字符组成的一个数组。

如果参数不是对象，`Object.values()`会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，`Object.values()`会返回空数组。

```
Object.values(42) // []
Object.values(true) // []
```

#### (3) Object.entries()

对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

该方法的行为与Object.values基本一致。也会忽略名为`Symbol`的属性。

将对象转为真正的Map结构。

```js
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }

```

`Object.entries()`函数的实现

```js
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}

```

### 6. `Object.fromEntries()`

`Object.fromEntries()`方法是`Object.entries()`的逆操作，用于将一个键值对数组转为对象。

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 `Map` 结构转为对象。

```js
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
```

该方法的一个用处是配合`URLSearchParams`对象，将查询字符串转为对象。

```js
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```
