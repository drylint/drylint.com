# TS 接口 interface

[toc]

接口用来规范程序编写的。

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类（class）的一部分行为进行抽象以外，也常用于对「对象的形状（包含哪些属性，以及属性的类型）」进行描述。

相当于使用 `interface` 关键字定义一种类型，并规定这种类型中包含什么属性，以及这些属性的类型。

## 1. 对象类型的接口

使用 `?`放在属性名后表示可选属性，除可选属性外，其他明确规定的属性不能多也不能少。

- `interface` 定义一种对象类型 `Person`

    ```ts
    interface Person {
      name: string,
      age: number,
      gender?: string | number // 用 ? 表示可有可无的属性
    }
    ```

- 定义变量并指定类型为刚才定义的 `Person`

    ```ts
    // 以下是不满足接口规定的对象， 报错
    let tom: Person = {} // 属性少了

    let tom:Person = {
      name: 'tom'
      // 属性少了
    }

    let tom:Person = {
      name: 'tom',
      age: 20,
      gender: 1,
      phone: 135 // 属性多了
    }

    let tom:Person = {
      name: 'tom',
      age: 20,
      gender: false, // 属性值类型错了
    }

    // 以下是符合接口规定的对象
    let tom:Person = {
      name: 'tom',
      age: 20
    }

    let tom:Person = {
      name: 'tom',
      age: 20,
      gender: 1 // gender 在接口中规定可有可无，且类型可以为 string 或 number
    }
    ```

## 任意属性

希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  name: 'tom',
  gender: '1',
  isLogin: false,
  xxx: '...'
}

```

`[propName: string]: any` 表示属性名必须是字符串类型，属性值是 `any` 类型

### 一旦定义了任意属性，那么 `确定属性` 和 `可选属性` 的值类型都必须符合任意属性的值类型

```ts
interface Person {
  name: string
  age?: number // 报错，不满足任意属性的值类型 string | boolean
  [propName: string]: string | boolean
}

let tom: Person = {
  name: 'tom',
  gender: 1, // 报错，不满足任意属性的值类型 string | boolean
  isLogin: false,
  xxx: '...'
}

```

### 可选属性

```ts
interface Person {
  name: string,
  age: number,
  gender?: string | number // 可选属性，实现接口时，可有可无的属性
}
```

### 只读属性

如果希望对象中的一些字段只能在创建的时候被赋值，可以在属性名前用 `readonly` 来设为只读属性:

```ts
interface Point {
    readonly x: number
    readonly y: number
}

let p1: Point = {
  x: 10,
  y: 20
}
p1.x = 5 // 报错，Cannot assign to 'x' because it is a read-only property.

// 可选属性的只读约束依然是在对象赋值的时候生效了，即使初始化时没有此属性
let p2: Point = {
  x: 11
}
p2.y = 12 // 报错，Cannot assign to 'y' because it is a read-only property.

```

### `readonly` vs `const`

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const`，若做为属性则使用 `readonly`。

### 额外的属性检查

对象字面量作为函数参数，会被特殊对待，会经过额外属性检查。

如果一个对象字面量作为参数传递时，不符合 `interface` 解构的话会报错。

```ts
interface Person {
  name: string,
  age: number,
  gender?: string | number
}

let func = (obj: Person) => {
  console.log(obj)
}

// 传递对象字面量作为参数，会经过额外属性检查。
func({name: 'tom', age: 1, phone: 135 }) // 报错，phone 属性在接口 Person 中不存在

// 用变量保存对象后再传入，又可以接收 Person 中不存在的属性。
// 只要传入的对象中包含 interface 中规定的属性，并类型也符合即可。
let obj = {name: 'tom', age: 1, phone: 135 }
func(obj) // {name: "tom", age: 1, phone: 135}

```

以上例子中报错的情况是因为程序对参数进行了额外的属性检查，因为传入了一个字面量对象

绕开额外的属性检查：

- 用变量保存字面量对象，将此变量作为参数传入函数

    ```ts
    let obj = {name: 'tom', age: 1, phone: 135 }
    func(obj)
    ```

- 使用类型断言，将字面量对象 断言为 接口类型

    ```ts
    func({name: 'tom', age: 1, phone: 135 } as Person)
    ```

- 添加一个字符串索引签名

    ```ts
    interface Person {
        name: string,
        age: number,
        gender?: string | number // 可有可无的属性
        [propName: string]: any // 表示另外还可以有任意数量的属性，并可以是任意类型
    }
    let func = (obj:Person) => {
        console.log(obj)
    }

    func({name: 'tom', age: 1, phone: 135 }) // 不会再报错

    ```

> 注意：绕开额外属性检查 或 检查类型声明是否错误，这两者需要衡量

## 2. 函数类型的接口：描述(规定)函数

规定函数的类型，为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface Person{
  // 规定函数类型：参数类型，返回类型
  (name: string, age: number): boolean

}
// 函数参数名可以与接口中名字不一致，参数个数必须一致，可以不指定类型，一旦指定必须一一对应
// 如果不指定类型，TypeScript的类型系统会根据接口的规定依次推断出参数类型
let jerry:Person = (uname: string, age: number): boolean =>{
  console.log(uname, age) // tom 21
  return age > 20
}
console.log( jerry('tom', 21) ) // true
```

## 3. 可索引类型的接口：描述(规定)可索引的类型(如对象、数组)

描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

```ts
interface strArr {
  [index: number]: string // 索引签名，描述索引类型和索引返回值类型
}
let arr: strArr = ['tom', 'jerry']
let uname: string = arr[0]
console.log(uname) // tom
```

TypeScript支持两种索引签名：字符串和数字。

## (1) 数字索引类型

规定对象类型必须为数字索引

```ts
interface numStr {
  [index: number]: string // 索引签名，描述索引类型和索引返回值类型
}

let arr: numStr = ['tom', 'jerry'] // 数组默认为数字索引
let uname: string = arr[0]
console.log(uname) // tom

// 对象也必须使用数字索引
let obj:numStr = {
  1:'tom',
  2: 'jerry'
}
console.log(obj) // {1: "tom", 2: "jerry"}
console.log(obj[1]) // tom
```

## (2) 字符串索引类型

```ts
// 字符串索引
interface strStr {
  [i: string]: string
}
let obj:strStr = {
  a: 'tom',
  2: 'jerry'
}
console.log(obj[0]) // undefined
console.log(obj['a'], obj.a) // tom tom
console.log(obj[2], obj['2']) // jerry jerry
```

### 字符串索引签名能够很好的描述dictionary模式

```ts
interface NumberDictionary {
  [index: string]: number
  length: number // 可以，length 是 number 类型
  name: string // 错误，name 的类型与索引类型返回值的类型不匹配
}
```

### 将索引签名设置为只读，这样就防止了给索引赋值

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

## 4. 类类型接口：描述(规定) `class` 类型

`interface` 也能够用它来明确的强制一个 `class` 类去符合某种规定。

`interface` 定义一个接口， `class` 去实现(`implements`)这个类型。

- 类类型接口中，可以且只能规定其中必有的公开属性、方法以及值的类型

- 类实现接口时，必须包含（但不限于）接口中规定的所有必有属性及方法，且符合类型。

```ts
// 定义一个类类型接口
interface Person {
  // 接口中不能出现 public, protected, private 修饰符，因为默认只能规定类中的 public 属性和方法
  // protected uname: string // 错误：'protected' modifier cannot appear on a type member.
  uname: string
  intro(): void
}

// 创建一个 class ，去实现定义的接口
class Student implements Person {
  private works: string = 'study'
  constructor ( public uname: string, public age?: number) {}
  intro () {
    console.log(this.uname, this.age)
  }
}

let tom = new Student ('tom', 20)

```

一个类可以实现多个接口（多个接口用逗号分隔）：

```ts
interface Person {
  uname: string
  intro(): void
}

interface Boy {
  hobbies: string[]
}

// 实现多个接口
class Student implements Person, Boy {
  private works: string = 'study'
  constructor ( public uname: string, public hobbies: string[]) {}
  intro () {
    console.log(this.uname, this.hobbies)
  }
}

let tom = new Student ('tom', ['games', 'movies'])
```

## (1) 类静态部分与实例部分的区别

类是具有两个类型的：静态部分的类型和实例的类型。
直接用构造器签名去定义一个接口，并试图定义一个类去实现这个接口时会得到一个错误：

```ts
// 在类类型接口中规定构造函数的类型，报错

interface Person {
  foods: string
  new (name: string, age: number): void // 规定 构造函数类型
}

// 错误：Class 'Student' incorrectly implements interface 'Person'.
// Type 'Student' provides no match for the signature 'new (name: string, age: number): void'.
class Student implements Person {
  foods: string = 'rice'
  constructor(public name: string, public age: number) { }
}
```

因为当一个类实现一个接口时，程序只对其实例部分进行类型检查。 而 `constructor` 存在于 `class` 的静态部分，所以不在程序的检查范围内。所以程序会认为 `Student类` 在实现 `Person接口`
时没有提供与接口中构造函数签名相匹配的构造函数

解决：直接操作类的静态部分

```ts
// 创建接口，专用于 实例方法
interface personInterface {
  intro():void
}
// 创建接口，专用于 实例的构造函数
interface personConstructor {
  new (name: string, age: number): personInterface
}
// 创建函数，用传入的 类 和 参数 创建实例并返回
// 传入的第一个参数是 类， 类的类型必须满足构造函数类型的要求，也就是类中的构造函数必须符合要求。
// 这样就能够用接口规定构造函数的类型了
function createStudent(ctor: personConstructor, name: string, age: number): personInterface {
  return new ctor(name, age)
}

class Student implements personInterface {
  constructor(public name: string, public age: number) { }
  intro() {
      console.log(`My name is ${this.name}, I am ${this.age} years old`)
  }
}

// 传入创建实例的类 + 类中构造函数的参数，创建实例
let tom = createStudent(Student, 'tom', 20)
console.log(tom) // Student {name: "tom", age: 20}
tom.intro() // My name is tom, I am 20 years old

```

另一种方式：

```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
```

解决方式说明，构造函数签名的接口不应该用于被 class 直接实现，而应该用于类型检查。

## (2) 接口继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Person {
  uname: string
}

interface Man {
  gender: string
}
// 继承多个接口， 此接口则拥有继承的和自身的规定
interface Boy extends Person, Man {
  age?: number
}

// 以下为多种实现这个接口的方式：

// 1.
let Tom: Boy = {
  uname: 'Tom',
  gender: 'male'
}

// 2.
let Jerry: Boy = {
  uname: 'Jerry',
  gender: 'male',
  age: 20
}

// 3.
class SomeOne implements Boy {
  constructor (public uname: string, public gender: string) {}
}

// 4.
class SomeOne2 implements Boy {
  constructor (public uname: string, public gender: string, public age: number) {}
}

```

## (3) 接口继承类

当接口继承一个类时，它会继承类的属性和方法，但不包括其实现。

```ts
class Person {
  constructor (public uname: string, public gender: number) {}
}

interface IPerson extends Person {
  age: number
}

/* 相当于
interface IPerson {
  uname: string
  gender: number
  age: number
}
*/

// OK
let Tom: IPerson = {
  uname: 'Tom',
  gender: 1,
  age: 20
}

// OK
class Student implements IPerson {
  constructor (public uname: string, public gender: number, public age: number) {}
}
```

接口同样会继承到类的 `private` 和 `protected` 属性或方法，并保留属性或方法的修饰符。

这意味着，当一个接口继承了一个拥有 `private` 或 `protected` 属性或方法的类时，这个接口只能被这个类，或其子类，或他们的实例所实现（implement）。

当接口继承拥有 `private` 或 `protected` 成员的类时，如果没有添加额外的属性或方法，则它可以被这个类或子类，或他们的实例所实现。

```ts
class Person {
  constructor (public uname: string, protected gender: number) {}
}

interface IPerson extends Person {
}

// 报错 gender 属性是受保护的，但实现接口的值不是继承自 Person 类
// Property 'gender' is protected but type '{...}' is not a class derived from 'Person'.
let Tom: IPerson = {
  uname: 'Tom',
  gender: 1
}

// OK 实现接口的值是所继承的类的实例，符合
let Tom2: IPerson = new Person('Tom', 1)

// 报错 gender 是 Person 类中受保护的属性，但是 Student1 不是 Person 的子类
// Property 'gender' is protected but type 'Student1' is not a class derived from 'Person'.
class Student1 implements IPerson {
  constructor (public uname: string, protected gender: number, public age: number) {
  }
}

// OK, Student2 是继承的 Person 类，并且有符合接口中新增的属性
class Student2 extends Person implements IPerson {
  constructor (uname: string, gender: number, public age: number) {
    super(uname, gender)
  }
}

// OK，同样，Student2 的实例也是符合的
let Tom3: IPerson = new Student2('Tom', 1, 20)

```

当接口继承拥有 `private` 或 `protected` 成员的类时，添加了额外的属性或方法，则它就已经无法被这个类及这个类的实例实现，因为这个类中没有接口中新增的属性或方法。只能创建一个类来继承这个类，并单独实现接口中的新增方法。

- 接口继承的类中有 `protected` 属性

```ts
class Person {
  constructor (public uname: string, protected gender: number) {}
}

interface IPerson extends Person {
  age: number
}

// 报错 gender 属性是受保护的，但实现接口的值不是继承自 Person 类
// Property 'gender' is protected but type '{...}' is not a class derived from 'Person'.
let Tom: IPerson = {
  uname: 'Tom',
  gender: 1,
  age: 20
}

// 报错，实现接口的值缺少 age 属性，但接口中要求必须存在。虽然是继承的类的实例也不符合。
// Property 'age' is missing in type 'Person' but required in type 'IPerson'.
let Tom2: IPerson = new Person('Tom', 1)

// 报错 gender 是 Person 类中受保护的属性，但是 Student1 不是 Person 的子类
// Property 'gender' is protected but type 'Student1' is not a class derived from 'Person'.
class Student1 implements IPerson {
  constructor (public uname: string, protected gender: number, public age: number) {
  }
}

// OK, Student2 是继承的 Person 类，并且有符合接口中新增的属性
class Student2 extends Person implements IPerson {
  constructor (uname: string, gender: number, public age: number) {
    super(uname, gender)
  }
}

// OK，同样，Student2 的实例也是符合的
let Tom3: IPerson = new Student2('Tom', 1, 20)

```

- 接口继承的类中有 `private` 属性

```ts
class Person {
  constructor (public uname: string, private gender: number) {}
}

interface IPerson extends Person {
  age: number
}

// 报错 接口中的 gender 属性是私有的，但在实现中不是私有的。
// Property 'gender' is private in type 'IPerson' but not in type '{ ... }'.
let Tom: IPerson = {
  uname: 'Tom',
  gender: 1,
  age: 20
}

// 报错，实现接口的值缺少 age 属性，但接口中要求必须存在此属性。
// Property 'age' is missing in type 'Person' but required in type 'IPerson'.
let Tom2: IPerson = new Person('Tom', 1)

// 报错 Student1 这个类具有私有属性 gender 的单独声明。
// Types have separate declarations of a private property 'gender'.
class Student1 implements IPerson {
  constructor (public uname: string, private gender: number, public age: number) {
  }
}

// OK, Student2 是继承的 Person 类，并且有符合接口中新增的属性
class Student2 extends Person implements IPerson {
  constructor (uname: string, gender: number, public age: number) {
    super(uname, gender)
  }
}

// OK，同样，Student2 的实例也是符合的
let Tom3: IPerson = new Student2('Tom', 1, 20)

```

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。

## (4) 混合类型

一个对象可以同时做为函数和对象使用，并带有额外的属性。

```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

let getCounter1 = (): Counter => {
  // 使用断言，将函数断言为 Counter 类型，让程序跳过类型检查
  /* 写法一：
  let counter = <Counter>function (start: number) {
    console.log(`作为函数使用，接收到参数 ${start}`)
  }
  */

  /* 写法二：
  let counter = <Counter>((start: number) => {
    console.log(`作为函数使用，接收到参数 ${start}`)
  })
  */

  // 写法三：
  let counter = (function (start: number) {
    console.log(`作为函数使用，接收到参数 ${start}`)
  }) as Counter

  // 因为 return 的 counter 使用了断言，程序则以为符合返回类型接口，所以没有另外两个属性程序也不会报错。
  // 但访问时会没有的属性返回 undefined, 没有的方法会直接报错。
  return counter
}

// 尝试访问
let a = getCounter1()
a(5) // 作为函数使用，接收到参数 5
console.log(a.interval) // undefined
a.reset() // 报错： a.reset is not a function
```

完整地写法：

```ts
let getCounter2 = (): Counter => {
  let counter = ((start: number) => {
    console.log(`作为函数使用，接收到参数 ${start}`)
  }) as Counter
  counter.interval = 123
  counter.reset = () => {
    console.log('作为对象使用，执行对象中的 reset 函数')
  }
  return counter
}

// 尝试访问
let c = getCounter2()
c(10) // 作为函数使用，接收到参数 10
console.log(c.interval) // 123
c.reset() // 作为对象使用，执行对象中的 reset 函数
```
