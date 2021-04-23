# TS 类型

[toc]

TypeScript中的数据类型有：

- Boolean
- Number
- String
- Array
- Tuple
- Enum
- Any
- Void
- Null and Undefined
- Never
- Object
- Type assertions
- A note about let

## 一、原始数据类型

包括 `boolean`， `number`， `string`， `null`， `undefined`

### `boolean`

```ts
let bool1: boolean = true // true
let bool2: boolean = Boolean() // false
let bool3: boolean = Boolean(1) // true

// 使用构造函数 Boolean 创造的对象不是布尔值，而是一个 Boolean 对象
// let bool4: boolean = new Boolean(1) // 报错 Type 'Boolean' is not assignable to type 'boolean'.

```

### `number`

```ts
// 十进制
let decLiteral: number = 6

// 十六进制
let hexLiteral: number = 0xf00d

// 二进制
let binaryLiteral: number = 0b1010

// 八进制
let octalLiteral: number = 0o744

let numberNaN: number = NaN
let numberInfinity1: number = Infinity
let numberInfinity2: number = -Infinity
```

### string

```ts
let uname: string = 'Tom'
console.log(uname) //Tom

let intro: string = `I am ${uname}`
console.log(intro) // I am Tom
```

### `undefined` 和 `null`

```ts
// undefined 类型的变量只能赋值为 undefined, null 类型的变量只能赋值为 null
let u: undefined = undefined
let n: null = null

// 给 undefined / null 类型的变量赋其他值会报错
u = 1 // 报错 Type '1' is not assignable to type 'undefined'.
n = 1 // 报错 Type '1' is not assignable to type 'null'.

// 但 undefined 和 null 是所有类型的子类型。可以赋值给其他任何类型
let u1: undefined = null
let n1: null = undefined

let num1: number = undefined
let num2: number = null

```

然而，当指定了 `--strictNullChecks` 标记后，`null` 和 `undefined` 只能赋值给 `void` 和它们各自。 这能避免很多常见的问题。

如果一个变量可能为 `string` 或 `null` 或 `undefined`，可以使用联合类型 `string | null | undefined` 。（联合类型后文讲解）

注意：我们鼓励尽可能地使用 `--strictNullChecks` ，但在本手册里我们假设这个标记是关闭的。

## 二、非原始数据类型

### void

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数

```ts
function warnUser(): void {
    console.log("This is my warning message")
}
```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`

```
let unusable: void = undefined
```

### any

给当前无法确定类型的变量指定一个类型，就用 `any`

```ts
let abc: number = 1 //声明为number类型后，改成其他类型值，编译时会报错
abc = '1' // 报错 Type '"1"' is not assignable to type 'number'.

// 声明为 any 类型后，可以赋值为任何类型
let abc: any = 1
abc = 'tom'
```

声明一个变量为 `any` 之后，对它的任何操作，返回的内容的类型都是任意类型。

在 `any` 类型上访问任何属性都是允许的，也允许调用任何方法，编译阶段都不会报错，但执行 `js` 时可能会报错。

```ts
let a: any = 1

console.log(a.name)
console.log(a.name.firstLetter)
console.log(a.name.get(123))

// 以上代码编译阶段不会报错，但执行时报错。
```

#### 类型推论

变量如果在声明的时候，未指定其类型，也没有被赋值，那么它会被推论为 `any` 类型。

如果未指定类型，但有赋值，则变量会被自动推论为所赋值的类型。

```ts
let a // 被推论为 any 类型
// 同时会警告 Variable 'a' implicitly has an 'any' type, but a better type may be inferred from usage.
a = 1 // OK
a = '1' // OK
a = false // OK

let b = 1 // 被推论为 number 类型 相当于 let b: number = 1
b = '1' // 报错 Type '"1"' is not assignable to type 'number'.

```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 `Object` 有相似的作用，就像它在其它语言中那样。 但是 `Object` 类型的变量只是允许你给它赋任意值 ， 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

```ts
let notSure: any = 4
notSure.ifItExists() // 编译 OK
notSure.toFixed() // 编译 OK

let prettySure: Object = 4
prettySure.toFixed() // 报错 Property 'toFixed' doesn't exist on type 'Object'.
```

当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```ts
let list: any[] = [1, true, "free"]
list[1] = 100
```

### array

#### 两种基本表示方法

##### 类型 + 方括号表示法 `Type[]`

```ts
// 表示由 number 类型的元素组成的数组
let arr1: number[] = [1, 2, 3]
arr1.push('4') // 报错 Argument of type '"4"' is not assignable to parameter of type 'number'.

// 表示由任意类型的元素组成的数组
let arr2: any[] = [1, '2', [1, 2] ]
```

##### 数组泛型 表示法 `Array<Type>`

泛型的具体使用参考【泛型】一章

```ts
let arr2: Array<number> = [1, 2, 3]

// 构造函数赋值
let arr3: Array<string> = new Array('tom','jerry','bob')

```

#### ReadonlyArray 只读数组

与 `Array<>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

// 原数组可以修改
a[0] = 11

// 报错 只读数组缺少了数组应有的方法，无法赋值给可变数组
a = ro

// 使用类型断言重写，跳过类型检查则不会报错
a = ro as number[]

// 所有修改只读数组的操作都会报错
ro[0] = 12
ro.push(5)
ro.length = 100

```

#### 用接口表示数组

```ts
interface IArr {
  [index: number]: number
}
let arr1: IArr = [1, 1, 2, 3, 5]
```

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
不过有一种情况例外，那就是它常用来表示类数组。

#### 类数组

类数组（Array-like Object）不是数组类型，比如 arguments：

```ts
function sum() {
    let args: number[] = arguments // 报错，类数组无法赋值给普通数组类型
}
// Type 'IArguments' is missing the following properties from type 'number[]':
// pop, push, concat, join, and 24 more.
```

上例中，`arguments` 实际上是一个类数组，不符合普通数组的约束的变量，因此需要自定义约束：

类数组其实除了值外，只有 `length` 和 `callee` 两个属性，而没有数组的原型方法。

```ts
function sum() {
    let args: {
        [index: number]: number
        length: number
        callee: Function
    } = arguments
}
```

在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```ts
function sum() {
    let args: IArguments = arguments // 使用内置接口 IArguments
}
```

其中 `IArguments` 是 TypeScript 中内置的类型接口，它实际上就是：

```ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

TypeScript 提供的具体内置对象，参考内置对象一章。

### tuple 元组

元组类型允许表示一个**已知元素数量和类型的数组**，各元素的类型不必相同。

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

```ts
// 指定数组中每一个元素的类型
let arr: [number, string] = [1, 'HelloWorld']

// 报错 Type 'string' is not assignable to type 'number'.
let arr2: [number, string] = ['1', 1]

// 报错：Property 'substr' does not exist on type 'number'.
console.log(arr[0].substr(1))

// OK
console.log(arr[1].substr(0))
```

当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项：

```ts
let arr: [number, string] = [1] // 报错
// Property '1' is missing in type '[number]' but required in type '[number, string]'.
```

因为变量 `arr` 类型为 `[number, string]`，而赋值的内容类型为 `[number]`

如果要对某一个元素赋值，需要使用下标方式而不能对整个变量赋值：

```ts
let arr: [number, string]
arr[1] = 'string' // OK
```

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```ts
arr[3] = 'world' // OK, 字符串可以赋值给 string | number 类型

arr[5].toString() // OK, 'string' 和 'number' 都有 toString

arr[6] = true // 报错, true 不符合 string | number 类型
```

### enum 枚举类型

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

使用枚举，可以定义一些带名字的常量。用于清晰地表达意图或创建一组有区别的用例。

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

TypeScript支持数字的和基于字符串的枚举。

##### 数字枚举

```ts
enum Color {Red, Green, Blue}

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Color) // {0: "Red", 1: "Green", 2: "Blue", Red: 0, Green: 1, Blue: 2}

let c: Color = Color.Green;
console.log(c) // 1
```

事实上，上面的例子会被编译为：

```js
// 编译后的js

"use strict";
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));

```

- 默认情况下，从 0 开始为元素编号。也可以手动赋值。 例如，将上面的例子改成从 1 开始编号：

    ```ts
    enum Color {Red = 1, Green, Blue}

    // {1: "Red", 2: "Green", 3: "Blue", Red: 1, Green: 2, Blue: 3}
    console.log(Color)

    let c: Color = Color.Green;
    console.log(c) // 2
    ```

    ```js
    // 编译后的js

    "use strict";
    var Color;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
    })(Color || (Color = {}));

    ```

    以上代码，未手动赋值的枚举项会接着上一个枚举项递增。
    > 手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1。

- 或者，全部都采用手动赋值：

    ```ts
    enum Color {Red = 1, Green = 3, Blue = 5}

    // {1: "Red", 3: "Green", 5: "Blue", Red: 1, Green: 3, Blue: 5}
    console.log(Color)

    let c: Color = Color.Green;
    console.log(c) //3
    ```

    ```js
    // 编译后的js

    var Color;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 3] = "Green";
        Color[Color["Blue"] = 5] = "Blue";
    })(Color || (Color = {}));

    ```

- 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：

    ```ts
    enum Color {Red = 1, Green = 0, Blue}
    console.log(Color) // {0: "Green", 1: "Blue", Red: 1, Green: 0, Blue: 1}

    ```

    ```js
    // 编译后的 js
    var Color;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 0] = "Green";
        Color[Color["Blue"] = 1] = "Blue";
    })(Color || (Color = {}));
    console.log(Color);
    ```

    使用的时候需要注意，最好不要出现这种覆盖的情况。

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 'Green'
```

#### 字符串枚举

在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```
enum Color {Red = 'red', Green = 'green', Blue = 'blue'}

// {Red: "red", Green: "green", Blue: "blue"}
console.log(Color)

let c = Color.Blue
console.log(c) // 'blue'
```

#### 异构枚举（Heterogeneous enums）

从技术的角度来说，枚举可以混合字符串和数字成员，但是似乎你并不会这么做：
除非真的想要利用 JavaScript 运行时的行为，否则不建议这样做。

```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

```

#### 常数项和计算所得项

枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

```ts
enum Color {Red, Green, Blue = "blue".length};
```

`"blue".length` 就是一个计算所得项。

计算所得项之后的项必须手动赋值，否则会因为无法获得初始值而报错。

```ts
enum Color {Red = "red".length, Green, Blue} // 报错
```

##### 常数项的定义

当满足以下条件时，枚举成员被当作是常数：

1. 未被初始化且前一个成员是常数。当前值加 1。
2. 枚举成员使用常数枚举表达式初始化。以下任意一项即为常数枚举表达式：
    - 数字字面量
    - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的，如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用）
    - 带括号的常数枚举表达式
    - `+, -, ~` 一元运算符应用于常数枚举表达式
    - `+, -, *, /, %, <<, >>, >>>, &, |, ^` 和 二元运算符， 常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

##### 所有其它情况的枚举成员被当作是计算所得项

#### 常数枚举

常数枚举是使用 const enum 定义的枚举类型：

```ts
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 编译后代码为：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 运行为：
console.log(directions) // [0, 1, 2, 3]
```

假如包含了计算成员，则会在编译阶段报错：

```ts
const enum Color {Red, Green, Blue = "blue".length}
```

#### 外部枚举

外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：

外部枚举与声明语句一样，常出现在声明文件中。

```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 编译后代码为：
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 运行时，会因为 Directions 已经被删除，而报错 Directions is not defined
```

同时使用 declare 和 const 也是可以的：

```ts
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 编译后代码为：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

// 运行后为：
console.log(directions) // [0, 1, 2, 3]
```

### never

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

下面是一些返回never类型的函数：

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### object

`object` 表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。

```ts
let obj: object = {
 a:1,
 b:2
}
```

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的API。例如：

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

```

## 二、类型相关

### 1. 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

通常发生在使用联合类型时，TS不确定一个联合类型的变量是哪个类型，此时只能访问此联合类型的所有类型的共有属性和方法。但有时候确实需要在不确定类型的时候访问一个类型的属性或方法，则需要使用断言来告诉编辑器它的类型，编辑器则会跳过它的类型检查。

类型断言有两种形式：`<类型>值` 或 `值 as 类型`

在 tsx 语法（React 的 jsx 语法的 ts 版）中只能用 `as` 语法。

#### 第一种：“尖括号”语法 `<类型>值`

```ts
function fn1 (a: string | number): void {
  console.log(a.toFixed(2)) // 报错，a 的值有可能是 string 类型，当为 string 时则没有 .toFixed() 方法
}

// 使用断言
function fn2 (a: string | number): void {
  console.log((<number>a).toFixed(2)) // 使用断言告诉程序 a 就是 number 类型，则此时编辑器不会再报错
}
```

#### 第二种：as 语法 `值 as 类型`

```ts
function fn(x: string | number): number {
  // return x // 报错，x 有可能为 string类型
  return x as number
}
```

类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的:

```ts
function fn(x: string | number): boolean {
  return <boolean>x // 报错
}
```

### 2. 类型推论

推断通常发生在初始化变量和成员，设置默认参数值、和决定函数返回值时。

```ts
let a = 5 // 变量 a 的类型被推断为 number
a = '5' // Type '"5"' is not assignable to type 'number'.

let b = [1, 2, '3', true, null, undefined]
// 被推断为 let a: (string | number | boolean | null | undefined)[]
```

### 3. 类型兼容性

> `TypeScript` 结构化类型系统的基本规则是：如果x要兼容y，那么y至少具有与x相同的属性。
> 也就是说，只有目标类型的成员会被一一检查是否兼容，非目标类型只要满足目标类型即可，多余的属性也不会引发错误。这个比较过程是递归进行的，检查需要的每个成员及子成员。

```
interface Named {
  name: string
}

class Person {
  constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }
}

let p: Named
p = new Person('tom', 20) // OK，因为 Person 类至少具有与 p 相同的属性。

// 检查函数参数时使用相同的规则：

function fn(a: Named): void {
  console.log(a)
}

fn(p) // {name: "tom", age: 20}

```

#### 比较两个函数

##### 比较参数

> 作为值的函数的每个参数，必须能在被赋值的函数变量里一一找到对应类型的参数。参数的名字相同与否无所谓，只要类型相同即可。

```
let x = (a: number): void => {
  console.log(a)
}
let y = (b: number, s: string): void => {
  console.log(b, s)
}

y = x; // OK，x的每个参数在y中都能找到对应的参数，所以允许赋值。y 的第二个参数则被忽略。
x = y; // Error，y必需有第二个参数，但是x并没有，所以不允许赋值。

```

##### 比较返回值

> 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。

```ts
let x = (): object => ({name: 'Alice'})
let y = (): object => ({name: 'Alice', location: 'Seattle'})

x = y // OK，y 的返回值类型只要包括 x 的全部类型即可，多余的无所谓。
y = x // Error， x 缺少 y 需要的 location 属性。


```

### 4. 高级类型

#### 交叉类型（Intersection Types）

将多个类型合并为一个类型。

```ts
interface Named {
  name: string
}
interface Age {
  age: number
}
interface Gender {
  gender: number
}

let tom: Named & Age & Gender = {
  name: 'tom',
  age: 20
  // error， 因为缺少 gender
}
let jerry: Named & Age & Gender = {
  name: 'jerry',
  age: 20,
  gender: 1
}

```

#### 联合类型（Union Types）

表示一个值可以是几种类型之一。 我们用竖线 `|` 分隔每个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```ts
function getLength(something: string | number): number {
  // 访问 string 有 number 没有的 length 属性
  // 报错 Property 'length' does not exist on type 'number'.
  return something.length
}

function getString(something: string | number): string {
    // OK，这是 string 和 number 类型共有的属性
    return something.toString()
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let strNum: string | number

strNum = 'seven' // 被推断为 string
console.log(strNum.length) // 5

strNum = 7 // 被推断为 number
console.log(strNum.length) // 编译时报错 Property 'length' does not exist on type 'number'.
```

```ts
interface Named {
  name: string
}
interface Age {
  age: number
}
interface Gender {
  gender: number
}

let bob: Named | Age | Gender = {
  name: 'bob'
}
let andy: Named | Age | Gender = {
  name: 'andy',
  gender: 1
}

```

访问联合类型的共有成员可正常访问，但访问联合类型中非共有成员会报错。需使用类型保护。

#### 类型保护与区分类型（Type Guards and Differentiating Types）

```ts
interface Named {
  name: string,
  phone: number
}
interface Age {
  age: number,
  phone: number
}
interface Gender {
  gender: number,
  phone: number
}

// 联合类型
let andy: Named | Age | Gender = {
  name: 'andy',
  age: 20,
  gender: 1,
  phone: 135
}

console.log(andy.phone) // OK，因为 phone 是 所有类型都有的成员
// console.log(andy.name) // error，因为 name 不是共有成员

// 需要使用类型断言
console.log((<Named>andy).name) // OK
console.log((<Age>andy).age) // OK
console.log((<Gender>andy).gender) // OK

```

##### 自定义的类型保护，一个函数，返回值是一个 类型谓词，形式为 `parameterName is xxType`

```ts
interface Named {
 name: string,
 phone: number
}
interface Age {
 age: number,
 phone: number
}
interface Gender {
 gender: number,
 phone: number
}

// 联合类型
let andy: Named | Age | Gender = {
 name: 'andy',
 age: 20,
 gender: 1,
 phone: 135
}

// 判断是否是Named类型，返回 true 即表示 类型谓词 成立
function isNamed(person: Named | Age | Gender): person is Named{
 // 需要将参数断言后检查是否存在 name 属性
 return (<Named>person).name !== undefined
}
function isAge(person: Named | Age | Gender): person is Age{
 return (<Age>person).age !== undefined
}

// 当所有类型都已经判断到只剩最后一种可能的类型时，直接写在 else 语句里即可
// typescript会知道这是最后一种情况，肯定就是最后一种可能的类型。
if (isNamed(andy)) {
 console.log(andy.name)
} else if (isAge(andy)) {
 console.log(andy.age)
} else {
 console.log(andy.gender)
}

```

##### 使用 `typeof` 进行类型保护

```ts
type uType = number | string | boolean
let a: uType = true

// typeof 类型保护
function isNumber (param: uType): param is number {
 return typeof param === 'number'
}
function isString (param: uType): param is string {
 return typeof param === 'string'
}

if (isNumber(a)) {
 console.log(`${a} is number`)
} else if (isString(a)) {
 console.log(`${a} is string`)
} else {
 console.log(`${a} is boolean`)
}

```

> `TypeScript` 其实可以将 `typeof` 识别为一个类型保护，也就是不用通过函数来返回类型谓词进行保护了。
> 但只有两种形式能被识别：`typeof v === "typename"`和 `typeof v !== "typename"`， `typename`必须是 `"number"`， `"string"`， `"boolean"`或 `"symbol"`。

```ts
type uType = number | string | boolean
let a: uType = true

if (typeof a === 'number') {
 console.log(`${a} is number`)
} else if (typeof a === 'string') {
 console.log(`${a} is string`)
} else {
 console.log(`${a} is boolean`)
}

```

### 5. 类型别名 `type`

类型别名用来给一个类型起个新名字。

类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

类型别名常用于联合类型。

> 起别名不会新建一个类型，它只是创建了一个新名字来引用那个类型。
> 给原始类型起别名通常没什么用

```ts
type nsb = number | string | boolean
let a: nsb
a = 1 // OK
a = '1' // OK
a = true // OK
a = [1 ,2 ,3] // 报错 Type 'number[]' is not assignable to type 'nsb'.

type fn = () => void
let fun: fn
fun = () => { // OK
  console.log('fn')
}
fun = 5 // 报错 Type '5' is not assignable to type 'fn'.

type nsbfn = nsb | fn
let x: nsbfn
x = 1 // OK
x = '1' // OK
x = true // OK
x = () => { // OK
 console.log('...')
}

function getSth (x: nsbfn) {
 if (typeof x === 'function') {
  console.log('function')
 } else if (typeof x === 'number'){
  console.log('number')
 } else if (typeof x === 'string'){
  console.log('string')
 } else {
  console.log('boolean')
 }
}
```

同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：

```ts
type person<N> = {
 name: string
 age: N
 gender: N
}

let tom: person<number> = {
 name: 'tom',
 age: 20,
 gender: 1
}

```

也可以使用类型别名来在属性里引用自己：

```ts
type person<N> = {
 name: string
 age: N
 gender: N
 son?: person<N> // 循环引用不使用 ? 表示可选的话，将会无止境的引用嵌套。
}

let tom: person<number> = {
 name: 'tom',
 age: 20,
 gender: 1,
 son: {
  name: 'jerry',
  age: 20,
  gender: 1,
 }
}
```

与交叉类型一起使用，可以创建出一些稀奇古怪的类型。

```ts
interface Person {
 name: string
}

type NoName<I> = I & { son?: NoName<I> }

let tom: NoName<Person> = {
 name: 'tom',
 son: {
  name: 'jerry'
 }
}

```

类型别名不能循环引用自身：

```ts
type N = Array<N> // error，类型别名循环引用自身会报错

```

#### 接口 vs 类型别名

- 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字。

- 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）。

- 当无法通过接口来描述一个类型并且需要使用联合类型或元组类型时，这时通常会使用类型别名。

#### 字面量类型别名

##### 字符串字面量类型别名

指定字符串必须的固定值。字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 通过结合使用这些特性，你可以实现类似枚举类型的字符串。

```ts
type gender = 'male' | 'famale'

let a: gender
a = "famale" // OK
a = "male" // OK
a = 'man' // 报错，不在可选范围内
```

##### 数字字面量类型别名

```ts
type odd = 1 | 3 | 5 | 7 | 9

function getOdd (x: odd) {
 console.log(x)
}

getOdd(1) // OK
getOdd(2) // 报错
```

##### 字面量类型别名较少使用，因为可以将字面量直接写在变量后

```ts
let x1: 1 | 3 | 5 | 7 | 9 = 1 // OK
let x2: 1 | 3 | 5 | 7 | 9 = 2 // 报错

let str1: 'male' | 'famale' = 'male' // OK
let str2: 'male' | 'famale' = 'man' // 报错

function getOdd (x: 1 | 3 | 5 | 7 | 9) {
 console.log(x)
}
getOdd(1) // OK
getOdd(2) // 报错

```

#### 可辨识联合类型（Discriminated Unions）

联合类型中的每一种类型都有一个共有成员属性，且这个共有成员有不同的字面量值

```ts

interface tom {
 name: 'tom',
 age: number
}
interface jerry {
 name: 'jerry'
 gender: number
}
interface andy {
 name: 'andy',
 phone: string
}
// 首先声明将要联合的接口。 每个接口都有 name 属性但有不同的字符串字面量类型。
// name 属性称做 可辨识的特征 或 标签。 其它的属性则特定于各个接口。

// 注意，目前各个接口间是没有联系的。下面把它们联合到一起：
type U = tom | jerry | andy

function getInfo(person: U) {
 if (person.name === 'tom') {
  return `姓名：${person.name}，年龄${person.age}`
 } else if (person.name === 'jerry') {
  return `姓名：${person.name}，性别：${person.gender}`
 } else {
  return `姓名：${person.name}，性别：${person.phone}`
 }
}
console.log(
 getInfo({name: 'tom',age: 20}) // 姓名：tom，年龄20
)
console.log(
 getInfo({name: 'jerry',gender: 1}) // 姓名：jerry，性别：1
)
console.log(
 getInfo({name: 'andy', phone: '131'}) // 姓名：andy，性别：131
)

```

#### 索引类型（Index types）

> `keyof T`， 索引类型查询操作符。 对于任何类型的 T， keyof T的结果为 T上已知的公共属性名的联合。

```ts
interface Person {
 name: string
 age: number
}

// keyof Person 相当于 "name" | "age"，但 keyof 只能用作声明类型，Person 新增属性会同步到 keyof
// console.log(keyof Person) // error
let tom: keyof Person // let tom: "name" | "age"
tom = 'age'
tom = 'name'
// tom = 'gender' // error
```

> `T[K]`， 索引访问操作符。

```ts
let person = {
 name: 'tom',
 age: 20
}

// 函数接收第一个参数为对象
// 第二个参数为对象的 key
// 返回值必须是对象的某一个 key 的值
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
}

let personName: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
// let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'

```

> 更多的用法：

```ts
// 泛型 K 的值必须为 T 的 key 之一
// 第一个参数为泛型T
// 第二个参数为 K 组成的数组
// 函数返回值必须为 T 中的 属性值(K) 组成的数组
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
 return names.map(n => o[n])
}

interface Person {
 name: string
 age: number
}

let person: Person = {
 name: 'tom',
 age: 35
}
// pluck 传参必须符合规定， key 数组可以是对象的全部或部分key，不能多或错。
let values: (string | number)[] = pluck(person, ['name', 'age'])
console.log(values) // ["tom", 35]

```

##### 索引类型和字符串索引签名

```ts
interface MyMap<T> {
    [DIYKey: string]: T // 规定 键名key 必须为 string， 值必须为 number 类型
}

let obj: MyMap<number> = {
 first: 1,
 second: 2,
 // third: '3' // error, Type 'string' is not assignable to type 'number'.
 4: 4
}

let keys: keyof MyMap<number> // let keys: string | number
keys = '1'
keys = 1
// keys = boolean // error

let value: MyMap<number>['foo'] // let value: number
value = 1
// value = '1' // error

```

#### 映射类型

```ts
// 属性可选
interface Person {
    name?: string;
    age?: number;
}
let andy: Person = {
 name: 'andy'
}

// 属性只读
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
let tom: PersonReadonly = {
 name: 'tom',
 age: 20
}

```

###### 完成类似以上的操作，TypeScript提供了从旧类型中创建新类型的一种方式 — ` 映射类型 `

在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 例如，你可以令每个属性成为 readonly类型或可选的。 下面是一些例子：

```ts
// 简易的 映射类型

type keys = 'name' | 'age'
type person = {
 [K in keys]: string | number
}
let tom: person = {
 name: 'tom',
 age: 20
}

```

```ts
// 更复杂的映射类型

type readonlyType<T> = {
 readonly [K in keyof T]: T[K];
}
type personType<T> = {
 [K in keyof T]?: T[K];
}
interface Person {
 name: string
 age: 20 // 此处的 20 变成了字面量类型，使用此接口的该类型值则必须是 20
}

// 根据只读类型 readonlyType， 创建另一个只读类型 readonlyPerson
type readonlyPerson = readonlyType<Person>
let tom: readonlyPerson = {
 name: 'tom',
 // age: 21 // error
 age: 20
}
// tom.age = 21 // Cannot assign to 'age' because it is a read-only property.

// 根据类型 personType 创建另一个只读类型 person
type person = personType<Person>
let jerry: person = {
 name: 'jerry'
 // name age 均为可选
}

```

##### 由映射类型进行推断

...

##### 预定义的有条件类型

...
