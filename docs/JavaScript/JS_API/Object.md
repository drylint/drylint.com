[toc]

# Object (对象)

## 一、属性

### 1. Object.prototype

Object 的原型对象

#### (1) Object.prototype.constructor

特定的函数，用于创建一个对象的原型。

#### (2) Object.prototype.__proto__

指向当对象被实例化的时候，用作原型的对象。

## 二、方法

### 1. 静态方法

```js
Object.assign()
Object.create()
Object.defineProperties()
Object.defineProperty()
Object.entries()
Object.freeze()
Object.fromEntries()
Object.getNotifier() // 废弃
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.getPrototypeOf()
Object.is()
Object.isExtensible()
Object.isFrozen()
Object.isSealed()
Object.keys()
Object.observe() // 废弃
Object.preventExtensions()
Object.seal()
Object.setPrototypeOf()
Object.unobserve() // 废弃
Object.values()
```

#### (1) Object.assign()

将所有可枚举属性的值从若干个源对象复制到目标对象,返回目标对象

```js
Object.assign(targetObj, objs...) // 返回 targetObj
```

- 若有相同键 (key)，后面的覆盖前面的。
- 无法深拷贝，引用类型只能拷贝引用地址。
- 继承属性和不可枚举属性不能被拷贝

    ```js
    const obj = Object.create(
        { foo: 1 // foo 是个继承属性。 },
        {
            bar: { value: 2},  // bar 是个不可枚举属性。
            baz: { // baz 是个自身可枚举属性。
                value: 3,
                enumerable: true  
            }
        }
    );

    const copy = Object.assign({}, obj);
    console.log(copy); // { baz: 3 }
    ```

- 原始类型会被包装为对象

    ```js
    const v1 = "abc";
    const v2 = true;
    const v3 = 10;
    const v4 = Symbol("foo")

    const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
    // 原始类型会被包装，null 和 undefined 会被忽略。
    // 注意，只有字符串的包装对象才可能有自身可枚举属性。
    console.log(obj); // { "0": "a", "1": "b", "2": "c" }
    ```

- 异常会打断后续拷贝任务

    ```js
    const target = Object.defineProperty({}, "foo", {
        value: 1,
        writable: false
    }); // target 的 foo 属性是个只读属性。

    Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
    // TypeError: "foo" is read-only
    // 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

    console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
    console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
    console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
    console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
    console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
    ```

#### (2) Object.create()

根据现有的实例对象来创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

```js
Object.create(proto, [propertiesObject]) // 返回一个新对象，带着指定的原型对象和属性。
```

- proto 新创建对象的原型对象。  
- propertiesObject 可选。  
如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
- 用 Object.create实现类式继承

    ```js
    // Shape - 父类(superclass)
    function Shape() {
      this.x = 0;
      this.y = 0;
    }

    // 父类的方法
    Shape.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
      console.info('Shape moved.');
    };

    // Rectangle - 子类(subclass)
    function Rectangle() {
      Shape.call(this); // call super constructor.
    }

    // 子类续承父类
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?',
      rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?',
      rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved.'
    ```

- 继承到多个对象，则可以使用混入的方式

    ```js
    function MyClass() {
        SuperClass.call(this);
        OtherSuperClass.call(this);
    }

    // 继承一个类
    MyClass.prototype = Object.create(SuperClass.prototype);
    // 混合其它
    Object.assign(MyClass.prototype, OtherSuperClass.prototype);
    // 重新指定constructor
    MyClass.prototype.constructor = MyClass;

    MyClass.prototype.myMethod = function() {
        // do a thing
    };
    ```

- 使用 Object.create 的 propertyObject参数

    ```js
     var o;

    // 创建一个原型为null的空对象
    o = Object.create(null);


    o = {};
    // 以字面量方式创建的空对象就相当于:
    o = Object.create(Object.prototype);


    o = Object.create(Object.prototype, {
      // foo会成为所创建对象的数据属性
      foo: {
        writable:true,
        configurable:true,
        value: "hello"
      },
      // bar会成为所创建对象的访问器属性
      bar: {
        configurable: false,
        get: function() { return 10 },
        set: function(value) {
          console.log("Setting `o.bar` to", value);
        }
      }
    });


    function Constructor(){}
    o = new Constructor();
    // 上面的一句就相当于:
    o = Object.create(Constructor.prototype);
    // 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


    // 创建一个以另一个空对象为原型,且拥有一个属性p的对象
    o = Object.create({}, { p: { value: 42 } })

    // 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
    o.p = 24
    o.p
    //42

    o.q = 12
    for (var prop in o) {
       console.log(prop)
    }
    //"q"

    delete o.p
    //false

    //创建一个可写的,可枚举的,可配置的属性p
    o2 = Object.create({}, {
      p: {
        value: 42,
        writable: true,
        enumerable: true,
        configurable: true
      }
    });
    ```

#### (3) Object.defineProperty() / Object.defineProperties()

##### Object.defineProperty(obj, prop, descriptor)

在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```js
Object.defineProperty(obj, prop, descriptor)
```

- obj  
    要在其上定义属性的对象。
- prop  
    要定义或修改的属性的名称 (key)。
- descriptor  
    将被定义或修改的属性描述符。如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

    ```js
    // 数据描述符
    {
        value : 37,
        writable : false, // 是否可更改
        enumerable : false, // 是否可以在 for...in 循环和 Object.keys() 中被枚举
        configurable : false // 是否可以被删除, 以及除value和writable特性外的其他特性是否可以被修改
    }
    ```

    ```js
    // 存取描述符
    {
        get : function(){
            return bValue;
        },
        set : function(newValue){
            bValue = newValue;
        },
        enumerable : true,
        configurable : true
    }
    ```

##### Object.defineProperties(obj, props)

在一个对象上定义或修改多个属性，并返回该对象。

```
Object.defineProperties(obj, props)
```

- obj  
    要操作的对象
- props  
    属性描述符对象

    ```js
    {
        prop1: {
            value: '',
            writable: false,
            enumerable: false,
            configurable: false,
        },
        prop2: {
            enumerable: false,
            configurable: false,
            get () {},
            set () {}
        }
    }
    ```

#### (4) 获取对象相关信息

```js
Object.getOwnPropertyDescriptor(obj, prop) // 返回指定对象上一个自有属性对应的属性描述符。
Object.getOwnPropertyDescriptors(obj) // 获取一个对象的所有自身属性的描述符
Object.getOwnPropertyNames(obj) // 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
Object.getOwnPropertySymbols(obj) // 返回一个给定对象自身的所有 Symbol 属性的数组。
Object.getPrototypeOf(obj) // 返回指定对象的原型（内部[[Prototype]]属性的值）。
```

#### (5) Object.entries() 和 Object.fromEntries()

`Object.entries()` 返回一个给定对象自身可枚举属性的键值对数组。  
`Object.fromEntries()` 是 Object.entries 的反转。

##### Object.entries()

```js
Object.entries(obj)
```

```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// array like object
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo 是不可枚举属性
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

// 非对象参数强制转为对象，如：字符串
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

```

```
// 将 Object 转换为 Map
var obj = { foo: "bar", baz: 42 };
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

##### Object.fromEntries()

```js
// Map 转化为 Object
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

// Array 转化为 Object
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }

// 对象转换
const object1 = { a: 1, b: 2, c: 3 };
const object2 = Object.fromEntries(
  Object.entries(object1)
  .map(([ key, val ]) => [ key, val * 2 ])
);
console.log(object2);
// { a: 2, b: 4, c: 6 }
```

#### (6) Object.freeze(obj)

冻结一个对象(数组也可冻结)，冻结后该对象无法做任何修改或新增。  
冻结是浅冻结，如果对象属性也是一个对象，则里层的对象不会被冻结

```js
// 浅冻结，里层的对象不会被冻结
obj1 = {
  internal: {}
}

Object.freeze(obj1);
obj1.internal.a = 'aValue'

obj1.internal.a // 'aValue'
```

```js
// 深冻结函数.
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined

```

#### (7) Object.seal(obj)

封闭一个对象，不可新增属性，不可配置现有属性。writable 遵循自身设置。

#### (8) Object.preventExtensions(obj)

将一个对象设置为不可扩展属性，不能再增加新的属性。

#### (9) Object.is(value1, value2)

判断两个值是否是相同的值。  
如果下列任何一项成立，则两个值相同：

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且  
    都是正零 +0  
    都是负零 -0  
    都是 NaN  
    都是除零和 NaN 外的其它同一个数字  

这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。

这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。

```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

#### (10) 判断对象是否可扩展/被密封/被冻结

```
Object.isExtensible(obj) // 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）
Object.isFrozen(obj) // 判断一个对象是否被冻结
Object.isSealed(obj) // 判断一个对象是否被密封
```

#### (11) Object.keys(obj)

返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

#### (12) Object.setPrototypeOf(obj, prototype)

设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。

###### `setPrototypeOf` 在各个浏览器和 JavaScript 引擎上都是一个很慢的操作，应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象

### 2. 实例方法

```

Object.prototype.__defineGetter__() // 废弃
Object.prototype.__defineSetter__() // 废弃
Object.prototype.__lookupGetter__() // 废弃
Object.prototype.__lookupSetter__() // 废弃
Object.prototype.eval() // 废弃
Object.prototype.hasOwnProperty()
Object.prototype.isPrototypeOf()
Object.prototype.propertyIsEnumerable()
Object.prototype.toLocaleString()
Object.prototype.toSource() // 非标准
Object.prototype.toString()
Object.prototype.unwatch() // 废弃
Object.prototype.valueOf()
Object.prototype.watch() // 废弃
```
