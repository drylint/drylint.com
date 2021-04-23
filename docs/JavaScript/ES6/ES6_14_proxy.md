[toc]

## Proxy

- 概述
- Proxy 实例的方法
- Proxy.revocable()
- this 问题
- 实例：Web 服务的客户端

### 1. 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

```js
var proxyObj = new Proxy(targetObj, handlersObj);
// new Proxy()表示生成一个Proxy实例
// target参数表示所要代理(拦截)的目标对象
// handler参数也是一个对象，用来定制拦截行为。
```

```js
var proxy = new Proxy({}, {
  // get方法，用来拦截对目标对象属性的访问请求
  get: function(targetObj, propertyKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

```

如果`handlersObj`没有设置任何拦截，那就等同于直接通向原对象。

```js
var targetObj = {};
var handlersObj = {};
var proxy = new Proxy(targetObj, handlersObj);
proxy.a = 'b';
target.a // "b"
```

还可将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。

```js
var object = { proxy: new Proxy(target, handler) };
```

Proxy 实例也可以作为其他对象的原型对象。

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。

Proxy 支持的拦截操作一览，一共 13 种。

- `get(target, propKey, receiver)`：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- `has(target, propKey)`：拦截`propKey in proxy`的操作，返回一个布尔值。
- `deleteProperty(target, propKey)`：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- `getOwnPropertyDescriptor(target, propKey)`：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- `preventExtensions(target)`：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- `getPrototypeOf(target)`：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- `isExtensible(target)`：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- `setPrototypeOf(target, proto)`：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- `apply(targetFunc, object, args)`：拦截 `Proxy` 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

同一个拦截器函数，可以设置拦截多个操作。

```js
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true

```

### 2. Proxy 实例的方法

#### (1) `get(targetObj, propKey, receiver?)`

用于拦截某个属性的读取操作

参数依次为目标对象、属性名、 proxy 实例本身(可选)

访问对象中不存在的属性，通常只会返回`undefined`。设置一个拦截代理，如果访问目标对象不存在的属性，抛出一个错误。

```js
let person = {
  name: "Tom"
};

let proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "Tom"
proxy.age // ReferenceError: Property "age" does not exist.

// 拦截代理的 get 方法 可以继承
let student = Object.create(proxy)
console.log(proxy.name) // "Tom"
console.log(proxy.age) // ReferenceError: Property "age" does not exist.
```

下面的例子使用get拦截，实现数组读取负数的索引。

```js
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```js
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed

```

利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。

```js
var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });

    return oproxy;
  }
}());

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

```

利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。

```js
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

#### (2) `set(targetObj, propKey, value, receiver?)`

用来拦截某个属性的赋值操作

四个参数，依次为目标对象、属性名、属性值、Proxy 实例本身(可选)

实例：假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求。

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') { // 如果对 age 属性 赋值操作，则验证
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错

```

利用`set`方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。

```js
function invariant (key, action) {
  if (key[0] === '_') { // 如果访问的属性名是以 _ 开头，则抛出错误
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

const handler = {
  get (target, key) {
    invariant(key, 'get'); // 验证访问的属性名是否以 _ 开头
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set'); // // 验证访问的属性名是否以 _ 开头
    target[key] = value;
    return true;
  }
};

const target = {};
const proxy = new Proxy(target, handler);
proxy._prop // Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c' // Error: Invalid attempt to set private "_prop" property

```

第四个参数 Proxy 实例 `receiver`

```js
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true

```

注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。

```js
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

注意，严格模式下，set代理如果没有返回true，就会报错。

```js
'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

#### (3) `has(targetObj, propKey)`

拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。

两个参数，分别是目标对象、需查询的属性名。

实例：使用拦截`has`方法隐藏某些属性，不被in运算符发现。

```js
var handler = {
  has (target, key) {
    if (key[0] === '_') { // 属性以 _ 开头的不能被 in 发现
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

如果原对象不可配置或者禁止扩展，这时has拦截会报错。

```js
var obj = { a: 10 };
Object.preventExtensions(obj); // 禁止扩展

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

// TypeError: 'has' on proxy: trap returned falsish for property 'a'
// but the proxy target is not extensible
'a' in p

```

> 注意，has方法拦截的是`HasProperty`操作，而不是`HasOwnProperty`操作，即`has`方法不判断一个属性是对象自身的属性，还是继承的属性。

另外，虽然`for...in`循环也用到了`in`运算符，但是`has`拦截对`for...in`循环不生效。

```js
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}

let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);

'score' in oproxy1
// 张三 不及格
// false

'score' in oproxy2
// true

for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59

for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99
```

上面代码中，`has`拦截只对`in`运算符生效，对`for...in`循环不生效，导致不符合要求的属性没有被`for...in`循环所排除。

#### (4) `deleteProperty(targetObj, propKey)`

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。

```js
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete'); // 拦截操作，抛出错误删除失败
    delete target[key];
    return true;
  }
};

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。

> 注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。

#### (5) `ownKeys(targetObj)`

`ownKeys`方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in`循环

##### 拦截 `Object.keys()`

```js
let targetObj = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(targetObj) {
    return ['a'];
  }
};

let proxy = new Proxy(targetObj, handler);

Object.keys(proxy) // [ 'a' ]

```

注意，使用`Object.keys`方法时，有三类属性会被`ownKeys`方法自动过滤，不会返回。

- 目标对象上不存在的属性
- 属性名为 `Symbol` 值
- 不可遍历（`enumerable`）的属性

```js
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4', // 属性名为 symbol 值
};

Object.defineProperty(target, 'key', { // 不可遍历属性
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy) // ['a'] 只有 属性名 a 可以被获取

```

##### 拦截 `Object.getOwnPropertyNames()`

```js
var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p) // [ 'a', 'b', 'c' ]

```

##### 拦截 `for...in`循环

```js
const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b']; // obj 没有这两个属性，将会被自动过滤
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出
}

```

> `ownKeys`方法返回的数组中，成员只能是字符串或 `Symbol` 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

如果目标对象自身包含不可配置(`configurable: false`)的属性，则该属性必须被`ownKeys`方法返回，否则报错。

```js
var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b']; // 返回的数组之中，必须包含a，否则会报错。
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
```

另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。

```js
var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b']; // 返回的数组成员，必须且只能包含所有目标对象的属性。
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
```

#### (6) `getOwnPropertyDescriptor(targetObj, propKey)`

`getOwnPropertyDescriptor`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。

```js
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

上面代码中，handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。

#### (7) `defineProperty(targetObj, propKey, propDesc)`

`defineProperty`方法拦截了`Object.defineProperty`操作。

```js
var handler = {
  defineProperty (target, key, descriptor) {
    return false; // 返回 false，会使添加新属性总是无效。
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

> 注意，如果目标对象不可扩展（`non-extensible`），则 `defineProperty` 只能修改属性，不能新增属性。  
如果目标对象的某个属性不可写（`writable`）或不可配置（`configurable`），则`defineProperty`方法不得改变这两个设置。

#### (8) `preventExtensions(targetObj)`

`preventExtensions`方法拦截`Object.preventExtensions()`。该方法必须返回一个布尔值，否则会被自动转为布尔值。

> 只有目标对象不可扩展时（即`Object.isExtensible(proxy)`为`false`），`proxy.preventExtensions`才能返回`true`，否则会报错。

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish
// but the proxy target is extensible
```

上面代码中，`proxy.preventExtensions`方法返回`true`，但这时`Object.isExtensible(proxy)`会返回`true`，因此报错。

为了防止出现这个问题，通常要在`proxy.preventExtensions`方法里面，调用一次`Object.preventExtensions`。

```js
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
```

#### (9) `getPrototypeOf(targetObj)`

`getPrototypeOf`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

下面是一个例子。

```js
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

上面代码中，`getPrototypeOf`方法拦截`Object.getPrototypeOf()`，返回`proto`对象。

注意，getPrototypeOf方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。

#### (10) `isExtensible(targetObj)`

`isExtensible`方法拦截对实例进行的`Object.isExtensible`操作。

```js
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
```

上面代码设置了`isExtensible`方法，在调用`Object.isExtensible`时会输出`called`。

> 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。  
这个方法有一个强限制，它的返回值必须与目标对象的`isExtensible`属性保持一致，否则就会抛出错误。

```js
Object.isExtensible(proxy) === Object.isExtensible(target)
```

下面是一个例子。

```js
var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does
// not reflect extensibility of proxy target (which is 'true')

```

#### (11) `setPrototypeOf(targetObj, proto)`

`setPrototypeOf`方法主要用来拦截`Object.setPrototypeOf`方法。

下面是一个例子。

```js
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

上面代码中，只要修改target的原型对象，就会报错。

> 注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（`non-extensible`），`setPrototypeOf`方法不得改变目标对象的原型。

#### (12) `apply(targetFunc, object, args)` ( `Proxy` 实例作为函数调用时 )

apply方法拦截函数的调用、call和apply操作。

apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```js
var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};
```

下面是一个例子。

```js
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
```

上面代码中，变量`p`是 `Proxy` 的实例，当它作为函数调用时（`p()`），就会被apply方法拦截，返回一个字符串。

下面是另外一个例子。

```js
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。

另外，直接调用Reflect.apply方法，也会被拦截。

```js
Reflect.apply(proxy, null, [9, 10]) // 38

```

#### (13) `construct(target, args)` ( `Proxy` 实例作为构造函数被调用时 )

用于拦截`proxy`实例的 `new` 命令，下面是拦截对象的写法。

接收参数：

- target：目标对象，也就是 `new Proxy()` 的第一个参数
- args：构造函数的参数，数组。实例在 `new` 时传入的参数
- newTarget：`new Proxy()` 创造的 实例proxy 构造函数（下面例子的p）

`construct`方法返回的必须是一个对象，否则会报错。因为 `new` 出来的必须是对象。

```js
let Func = function () {}
let handler = {
  construct: function(target, args, nt) {
    console.log(args); // [ 1, 3, 5 ]
    console.log(nt);
    // return new target(...args); // 正常情况
    return { value: args[0] * args[1] * args[2] };
  }
}

let p = new Proxy(Func, handler);

let obj = new p(1, 3, 5)
console.log(obj.value) // 15
```

### 3. `Proxy.revocable()`

`Proxy.revocable`方法返回一个可取消的 `Proxy` 实例。

`Proxy.revocable`方法返回一个对象，该对象的`proxy`属性是Proxy实例，`revoke()`属性是一个函数，可以取消Proxy实例。

```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

`Proxy.revocable`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

### 4. `this` 问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

上面代码中，一旦`proxy`代理`target.m`，后者内部的`this`就是指向`proxy`，而不是`target`。

下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。

```js
const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
```

上面代码中，目标对象`jane`的`name`属性，实际保存在外部`WeakMap`对象`_name`上面，通过`this`键区分。由于通过`proxy.name`访问时，`this`指向`proxy`，导致无法取到值，所以返回`undefined`。

此外，有些原生对象的内部属性，只有通过正确的`this`才能拿到，所以 `Proxy` 也无法代理这些原生对象的属性。

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

上面代码中，`getDate`方法只能在`Date`对象实例上面拿到，如果`this`不是`Date`对象实例就会报错。这时，`this`绑定原始对象，就可以解决这个问题。

```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

### 5. 实例：Web 服务的客户端

Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```js
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```js
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```

同理，Proxy 也可以用来实现数据库的 ORM 层。
