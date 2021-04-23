[toc]

## Class 的基本语法

- 简介
- 静态方法
- 实例属性的新写法
- 静态属性
- 私有方法和私有属性
- new.target 属性

### 1. 简介

#### (1) 生成实例对象

- 传统方法：构造函数。

    ```js
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
    };

    var p = new Point(1, 2);
    ```

- ES6的新方法：class。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

```

ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

ES6 的类，完全可以看作构造函数的另一种写法。

```js
class P {}
console.log(typeof P) // function

// prototype对象的constructor方法，直接指向“类”的本身，这与 ES5 的行为是一致的。
console.log(P === P.prototype.constructor) // true
```

创建实例，对类使用`new`命令

```js
class P {}
let obj = new P()
```

类的所有方法都定义在类的`prototype`属性上面。

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};

```

在类的实例上面调用方法，其实就是调用原型上的方法。

```js
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
b.constructor === B // true
```

类的新方法也可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

`class` 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype) // []
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```

ES5 的构造函数的写法行为不一致，是可枚举的。

```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype) // ["toString"]
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```

上面代码采用 ES5 的写法，`toString`方法就是可枚举的。

#### (2) `constructor()` 方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。如果没有显式定义，一个空的`constructor`方法会被默认添加。

```js
class Point {
}

// 等同于
class Point {
  constructor() {
      return this // 程序默认返回实例对象 this
  }
}
```

可以手动指定 `constructor()` 的返回对象

```js
class Point {
  constructor() {
      return {a: 1, b: 2}
  }
}

let obj = new Point()
console.log(obj) // { a: 1, b: 2 }

```

`class` 必须使用 `new` 调用。而构造函数不用 `new` 也不会报错，即使结果不正确。

#### (3) 类的实例

```js
//定义类
class Point {

  constructor(x, y) {
    this.x = x; // 实例上
    this.y = y; // 实例上
  }

  toString() { // 原型上
    return '(' + this.x + ', ' + this.y + ')';
  }

}

// 实例的属性都定义在constructor()中的this对象上，否则都是定义在class原型上。
var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

// 与 ES5 一样，类的所有实例共享一个原型对象。
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__ //true

// 实例的 __proto__ 属性会改写原型，会改变“类”的原始定义，影响到所有实例。不推荐使用。
p1.__proto__.sayHello = function () {console.log('hello')}
p1.sayHello() // hello
p2.sayHello() // hello
let p3 = new Point(1, 2)
p3.sayHello() // hello
```

#### (4) 取值函数（getter）和存值函数（setter）

在`class`的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    this._a = 1
  }
  get a() {
    return this._a
  }
  set a(value) {
    this._a = value
  }
}

let obj = new MyClass();
obj.a = 123; // setter: 123
obj.a // 'getter'


var descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'a');
console.log("get" in descriptor)  // true
console.log("set" in descriptor)  // true
```

#### (5) 属性名使用表达式

```js
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() { // 相当于 getArea () {}
    // ...
  }
}

```

#### (6) `Class` 类名使用表达式

```js
const MyClass = class Me {
  getClassName() {
    return Me.name; // 这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。
  }
};
let inst = new MyClass(); // 在 Class 外部，这个类只能用MyClass引用。
console.log(inst.getClassName()) // Me
// Me.name // ReferenceError: Me is not defined
// let obj = new Me() // ReferenceError: Me is not defined

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class { /* ... */ };
```

```js
// 采用 Class 表达式写法，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

```

> 类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。
> 类不存在变量提升（hoist），这一点与 ES5 完全不同。所以 `class` 在前， `new` 在后。
> 函数的许多特性都被`class`继承，比如 `name` 属性返回类名(函数名)
> 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
> 类的方法内部如果含有this，它默认指向类的实例。

### 2. 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
  static bar() {
    this.baz(); // 静态方法包含this关键字，这个this指的是类，而不是实例。
  }
  static baz() {
    console.log('hello');
  }
  baz() { // 静态方法可以与实例方法重名。
    console.log('world');
  }
}

Foo.bar() // hello

let f = new Foo()
f.bar() // TypeError: f.bar is not a function


// 父类的静态方法，可以被子类继承。
class Bar extends Foo {
}
Bar.bar() // hello

// 也可以从super对象上调用父类的静态方法。
class Bar extends Foo {
  static sayHello () {
    super.bar()
  }
}
Bar.sayHello() // hello

```

### 3. 实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层。

```js
class foo {
  // 新写法
  bar = 'hello';
  baz = 'world';
  
  /* 旧写法
  constructor() {
    this.bar = 'hello'
    this.baz = 'world'
  }
  */
}

```

### 4. 静态属性

静态属性指的是 `Class` 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```js
class Foo {
}
Foo.prop = 1; // 为Foo类定义了一个静态属性prop。
console.log(Foo.prop) // 1
```

ES6 明确规定，`class` 内部只有静态方法，没有静态属性。所以只能在 `class` 外 定义

现在有一个提案提供了类的静态属性，写法是在`实例属性写法`的前面，加上`static`关键字。

```js
class Foo {
  static prop = 1; // 为Foo类定义了一个静态属性prop。
}
console.log(Foo.prop) // 1
```

### 5. 私有方法和私有属性

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

- 写法一：在命名上加以区别。不保险，在类的外部还是可以调用。

    ```js
    class Widget {

      // 公有方法
      foo (baz) {
        this._bar(baz);
      }

      // 私有方法
      _bar(baz) {
        return this.snaf = baz;
      }

      // ...
    }
    ```

- 写法二：将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

    ```js
    class Widget {
      // foo是公开方法，内部调用了bar.call(this, baz)。
      foo (baz) {
        bar.call(this, baz);
      }

      // ...
    }

    function bar(baz) {
      return this.snaf = baz;
    }

    ```

- 写法三：利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。

    ```js
    const bar = Symbol('bar');
    const snaf = Symbol('snaf');

    export default class myClass{

      // 公有方法
      foo(baz) {
        this[bar](baz);
      }

      // 私有方法
      [bar](baz) {
        return this[snaf] = baz;
      }

      // ...
    };

    ```

    但是 `Reflect.ownKeys()` 依然可以拿到它们。

    ```js
    const inst = new myClass();

    Reflect.ownKeys(myClass.prototype)
    // [ 'constructor', 'foo', Symbol(bar) ]
    // Symbol 值的属性名依然可以从类的外部拿到。
    ```

- 写法四：私有属性的提案：在属性名之前，使用`#`表示私有属性、私有方法、getter 和 setter 方法。

    ```js
    class IncreasingCounter {
      // #count是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。
      #count = 0;
      get #value() {
        console.log('Getting the current value!');
        return this.#count;
      }
      #increment() {
        this.#count++;
      }
    }
    ```

    由于井号`#`是属性名的一部分，使用时必须带有`#`一起使用，所以`#x`和`x`是两个不同的属性。

    私有属性和私有方法前面，也可以加上`static`关键字，表示这是一个静态的私有属性或私有方法。

### 6. new.target 属性

ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。

如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

注意，在函数外部，使用`new.target`会报错。

```js
class Foo {
  constructor () {
    console.log(new.target)
    console.log(new.target === Foo)
  }
}

let obj = new Foo()
// [Function: Foo]
// true

// 子类继承父类时，new.target会返回子类。
let son = new Bar()
// [Function: Bar]
// false
```

## Class 的继承

- 简介
- Object.getPrototypeOf()
- super 关键字
- 类的 prototype 属性和__proto__属性
- 原生构造函数的继承
- Mixin 模式的实现

### 1. 简介

`class`可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

在子类中可以通过`super`关键字，表示父类，用来新建父类的`this`对象。

```js
class Father {
  // 实例属性
  constructor (name, age) {
    this.name = name
    this.age = age
  }
  // 实例方法
  intro () {
    return `I am ${this.name}, ${this.age} years old`
  }
  // 静态方法
  static sayHello () {
    return 'Hello!'
  }
}
// 静态属性
Father.foods = 'meat'


class Son extends Father {
  constructor (name, age, gender) {
    super(name, age) // 相当于调用父类的constructor (name, age)
    this.gender = gender
  }
  // 子类自己的实例属性
  introMore () {
    return `${super.intro()}, gender:${this.gender}` // // 调用父类的intro()
  }
}

let tom = new Son('tom', 18, 1)

// 父类的实例/静态属性、方法都会被继承

console.log(Son.sayHello()) // Hello!
console.log(Son.foods) // meat

console.log(tom) // { name: 'tom', age: 18, gender: 1 }
console.log(tom.intro()) // I am tom, 18 years old
console.log(tom.introMore()) // I am tom, 18 years old, gender:1
console.log(tom instanceof Son) // true
console.log(tom instanceof Father) // true

```

子类必须在`constructor()`方法中调用`super`方法，且必须在使用`this`之前，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

### 2. Object.getPrototypeOf()

`Object.getPrototypeOf()`方法可以用来从子类上获取父类。

```js
console.log(Object.getPrototypeOf(tom))
console.log(Object.getPrototypeOf(tom) === Son)
console.log(Object.getPrototypeOf(tom) === Father)
console.log(Object.getPrototypeOf(Son) === Father)
// Son {}
// false
// false
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

### 3. super 关键字

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

#### (1) `super`作为函数调用时

代表父类的构造函数。ES6 要求，**必须在且只能在子类的构造函数中**执行一次`super()`函数。

`super`虽然代表了父类`Father`的构造函数，但是返回的是子类`Son`的实例，即`super`内部的`this`指的是`Son`的实例，`super()`在这里相当于`Father.prototype.constructor.call(this)`。

```js
class Father {
  constructor() {
    console.log(new.target.name);
  }
}

class Son extends Father {
  constructor() {
    super();
  }
}

let tom = new Son() // new.target.name 输出 Son 而不是 Father
```

#### (2) `super`作为对象时

在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class Father {
  constructor(name) {
    this.name = name
    this.hobby = 'sports'
  }
  sayHello () {
    return `Hello, I am ${this.name}`
  }
  static sayHello () {
    return `static function，this.hobby => ${this.hobby}`
  }
}
Father.prototype.hobby2 = 'music'

class Son extends Father {
  constructor(name) {
    super();
    this.name = name
    super.age = 10 // 赋值时 super 代表 this，赋值的属性会变成子类实例的属性。
    console.log(this.age) // 10
    console.log(super.age) // undefined 读取的时候 super 代表 父类 prototype, 相当于 Father.prototype.age
    // console.log(super); // 报错，必须显式指定是作为函数、还是作为对象使用
  }
  intro () {
    // super 指向父类 prototype ,父类 constructor() 上的方法或属性，是无法通过 super 调用的。
    console.log(super.hobby) // undefined 因为此属性在父类 constructor 上
    console.log(super.hobby2) // music 因为此属性在父类 prototype 上

    // 在实例方法中，super 指向父类 prototype,
    // 通过super对象调用父类的方法时，方法内部的 this 指向当前的子类实例(constructor)。
    return super.sayHello() // 相当于 super.sayHello.call(this) => Father.prototype.sayHello.call(this)
  }
  static intro () {
    // 在静态方法中, super 指向父类Father,
    // 通过super对象调用父类的(静态)方法时, 方法中 this 指向子类 Son 而不再是子类实例 constructor
    return super.sayHello() // 相当于调用父类的静态方法 Father.sayHello()
  }
}
Son.hobby = 'games'

let tom = new Son('tom')
console.log(tom) // { name: 'tom', hobby: 'sports', age: 10 }
console.log(tom.intro()) // Hello, I am tom

console.log(Son.intro()) // 'static function，this.hobby => games'

```

由于对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

### 4. 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class Father {
  constructor() {
  }
}

class Son extends Father {
  constructor() {
    super();
  }
}

console.log(Son.__proto__) // [Function: Father]
console.log(Son.__proto__ === Father) // true

console.log(Son.prototype.__proto__) // Father {}
console.log(Son.prototype.__proto__ === Father.prototype) // true

```

这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {
}

class B {
}

// setPrototypeOf() 的实际代码：
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype); // 相当于 B.prototype.__proto__ = A.prototype;

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A); // 相当于 B.__proto__ = A;

const b = new B();

```

这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（`__proto__`属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（`prototype`属性）是父类的原型对象（`prototype`属性）的实例。

```js
B.prototype = Object.create(A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

```

`extends`关键字后面可以跟多种类型的值。

只要是一个有`prototype`属性的函数，就能被B继承。由于函数都有`prototype`属性（除了`Function.prototype`函数），因此A可以是任意函数。

下面，讨论两种情况。第一种，子类继承`Object`类。

```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

第二种情况，不存在任何继承。

```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。但是，A调用后返回一个空对象（即`Object`实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。

#### 实例的 `__proto__` 属性

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

```js
class Father {
  constructor() {
  }
}

class Son extends Father {
  constructor() {
    super();
  }
}

let father = new Father()
let son = new Son()

// 子类实例的原型的原型是父类实例的原型。
console.log(son.__proto__ === father.__proto__) // false
console.log(son.__proto__.__proto__ === father.__proto__) // true

// 通过子类实例的 __proto__.__proto__ 属性，可以修改父类实例的行为。
console.log(father.sayHello()) // Hello
son.__proto__.__proto__.sayHello = function () {
  return 'Hi'
};
console.log(father.sayHello()) // Hi
```

### 5. 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的。ES5是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。

```js
// ES5 无法继承
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"


// ES6 可以继承
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined

```

由此可见，`extends`关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构（增加静态/实例属性、方法等）。

注意，继承Object的子类，有一个行为差异。

```js
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```

上面代码中，`NewObj`继承了`Object`，但是无法通过`super`方法向父类`Object`传参。这是因为 ES6 改变了`Object`构造函数的行为，一旦发现`Object`方法不是通过`new Object()`这种形式调用，ES6 规定`Object`构造函数会忽略参数。

### 6. Mixin 模式的实现

`Mixin` 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

```js
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```

下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

```js
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

// 准备一个拷贝实例属性的方法
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```js
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
