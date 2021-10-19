# TS 声明文件 `.d.ts`

[toc]

参考：

- [《TypeScript 入门教程》 - 声明文件(作者：xcatliu)](https://ts.xcatliu.com/basics/declaration-files.html)

声明文件的使用场景通常是，你在 ts 代码中使用一个 npm 包，但这个包完全没有声明文件，这时候就只能自己来书写一份声明文件，以免 TS 因为不知道这个包的结构，成员属性以及它们的类型而报错。

先来看下 TS 是怎么查找一个 npm 包的声明文件的：

1. 先查找 npm 包的 `package.json` 中的根属性 `types` 或 `typings` 字段指定的声明文件，有则使用，否则继续查找。
2. 查找 npm 包的根目录是否有一个 `index.d.ts` 声明文件，有则使用，否则继续查找。
3. 查看 npm 包的 `package.json` 中的根属性 `main` 字段（入口文件），查找和入口文件同级目录下是否有同名的 `.d.ts` 文件，有则使用，否则认为此 npm 包完全没有声明文件。

声明文件只在开发阶段有用，用于声明一些变量或者类型，以免 TS 在做检查的时候抛出变量或类型不存在的错误，从而导致编译失败。同时，还能获得对应的代码补全、接口提示等。

默认情况下，TS 会解析项目内所有 `.d.ts` 文件，当声明文件中不出现顶层 `import` 或 `export` 时， 文件内声明的都是全局变量或全局类型。也就是说，这些全局变量或全局类型都是可以在全局任何地方直接使用的，而不需要导入后再使用。

但是只要声明文件中出现顶层的 `import` 或 `export`，那么这个声明文件就会被当做模块，模块中所有的声明都是局部变量或局部类型，必须 `export` 导出后，才能在其他文件中 `import` 导入使用。

## 声明文件语法列表

声明全局或局部变量：

- `declare var/let/const`  声明变量/常量
- `declare function` 声明函数
- `declare class` 声明 class
- `declare enum` 声明枚举变量
- `declare namespace` 声明命名空间(空间下必须有属性才生效)

声明全局或局部类型：

- `interface` 声明接口
- `type` 声明类型别名

变量或类型的导入导出：

- `export` 导出变量
- `export namespace` 导出（含有子属性的）对象
- `export default` ES6 默认导出
- `export =` commonjs 导出模块
- `export as namespace` UMD 库声明全局变量

扩展变量或模块：

- `declare global` 在模块中声明全局变量或全局类型
- `declare module` 声明模块或扩展模块
- `/// <reference />` 三斜线指令引用声明文件

## 声明各种变量

### 声明普通变量

声明变量可以使用 `declare var`, `declare let` `declare const` 三种，前两者效果一样，声明普通变量，`const` 用于声明只读的常量。通常全局变量都应该是只读的，所以应该尽量使用 `const` 。

实际上，基本上也只有全局变量才需要在声明文件中声明，局部变量是基本没有这个需求的。

在声明文件中，声明一个全局变量，比如：

```ts
// src/typings/index.d.ts

declare const string1: string
declare const number1: number
```

上面声明就是告诉 TS, 将来在运行的时候，我将会有一个全局变量叫做 `string1`, 它是 `string` 类型的，所以在编译代码并检查的时候，如果我直接使用了这个变量，你不要以为这个变量是不存在的就给我抛出错误了，你直接编译通过吧，有问题我自己负责。

然后，就可以在业务代码中直接使用这个变量：

```ts
// src/utils/index.ts

console.log(string1) // TS 已经知道这是全局变量，不会抛出变量未定义的错误
console.log(number1) // TS 已经知道这是全局变量，不会抛出变量未定义的错误
console.log(string1.toUpperCase()) // TS 已经知道这个变量是 string 类型，所以检查通过
console.log(number1.toFixed(2)) // TS 已经知道这个变量是 number 类型，所以检查通过

```

上面代码中，`string1` 和 `number1` 没有先声明再使用，而是直接使用的，但 TS 做代码检查的时候，并没有抛出错误，这是因为我们在声明文件中已经告诉了 TS 这个全局变量在运行时会存在，不用认为是没有声明就使用的变量。

要注意的是，这只是在编译阶段，我们告诉 TS 将来代码运行时会有这个全局变量，所以 TS 在编译阶段不报错了，但是将来在代码运行的时候，如果这个全局变量不存在，那么运行时就会抛出错误 `Uncaught ReferenceError: string1 is not defined` 。

所以要记住，我们既然告诉了 TS 在将来运行时会有这个全局变量，那么就一定要保证在运行时这个全局变量是存在的。

下面来修改一下声明文件：

```ts
// src/typings/index.d.ts

declare const string1: string
export declare const number1: number // export 导出变量

```

在上面声明文件中，其中一个声明加入了顶层 `export` 将其导出，另一个没有使用 `export` 导出。

再看下原来的使用变量的文件：

```ts
// src/utils/index.ts

console.log(string1) // TS 编译阶段抛错: Cannot find name 'string1'.
console.log(number1) // TS 编译阶段抛错: Cannot find name 'number1'.
console.log(string1.toUpperCase()) // TS 编译阶段抛错: Cannot find name 'string1'.
console.log(number1.toFixed(2)) // TS 编译阶段抛错: Cannot find name 'number1'.
```

可以看到上面代码都在报错，因为声明文件中出现了顶层 `export` ，所以声明文件被当做模块，而不再是全局声明文件了，所以其中的变量都成为了局部变量，而不再是全局可用的全局变量了。

### 声明函数

声明函数实际上也是在声明一个变量，只不过变量是函数类型的。

```ts
// 声明一个全局函数
declare function myFn(x: string): string

// 再次声明一个同名函数，即表示 函数重载
declare function myFn(x: number): boolean

// 也可以通过声明变量的方式来声明一个函数
declare const myFn2: (x: string)=> string

```

上例告诉 TS : 「嘿，在编译时如果看到未定义而直接使用变量 `myFn` 时，不要报错，因为在运行时，将会有一个全局变量叫做 `myFn` 可用，它是一个函数，当传入 `string` 类型的参数时，将返回一个 `string` 类型的值，当传入一个 `number` 类型的参数时，将返回一个 `boolean` 类型的值。」

### 声明 class (类)

声明 class (类) 实际上也是在声明一个变量：

```ts
declare class People {
  name: string

  constructor (name: string)

  sayHi (): string
}

```

上例告诉 TS : 「嘿，在编译时如果看到未定义而直接使用变量 `People` 时，不要报错，因为在运行时，将会有一个全局变量叫做 `People` 可用，它是一个 class ，它的结构是这样的。」

### 声明 enum (枚举)

声明 enum (枚举) 实际上也是在声明一个变量：

```ts
declare enum Status {
  normal,
  disabled,
  pending,
}
```

上例告诉 TS : 「嘿，在编译时如果看到未定义而直接使用变量 `Status` 时，不要报错，因为在运行时，将会有一个全局变量叫做 `Status` 可用，它是枚举类型，它的结构是这样的。」

### 声明命名空间(全局对象) `declare namespace`

声明对象实际上也是在声明一个变量，需要注意的是， `namespace` 必须有成员属性才能声明成功，且每一个成员属性均需要独立声明，但不需要使用 `declare` 来声明：
：

```ts
// 声明一个全局对象
declare namespace myObject {
  // 对象属性 name 是一个字符串
  const name: string
  // 对象属性 sayHi 是一个函数
  function sayHi(): string
  // 对象属性 People 是一个 class
  class People {
    name: string

    constructor (name: string)

    sayHi (): string
  }

  // 嵌套的对象
  namespace subObject {
    // 对象属性 sayHello 是一个函数
    function sayHello(): string
  }
}

```

上例告诉 TS : 「嘿，在编译时如果看到未定义而直接使用变量 `myObject` 时，不要报错，因为在运行时，将会有一个全局变量叫做 `myObject` 可用，它是一个对象，它的结构是这样的。」

使用示例：

```ts
// src/utils/index.ts

console.log(myObject.name.toUpperCase())
console.log(myObject.sayHi())
console.log(new myObject.People('Tom'))
console.log(myObject.subObject.sayHello())

```

## 声明类型

声明类型主要使用 `interface` 和 `type`

```ts
interface IPeople {
  name: string
  age?: number
}

type NumAndString = number | string
```

上例告诉 TS : 「嘿，在编译时如果看到未定义而直接使用类型 `IPeople` 时，不要报错，因为有一个全局类型叫做 `IPeople` 可用，它的结构是这样的。」

上例还告诉 TS : 「嘿，在编译时如果看到未定义而直接使用类型 `NumAndString` 时，不要报错，因为有一个全局类型叫做 `NumAndString` 可用，它的结构是这样的。」

需要注意的是，一个项目中，通常需要定义非常多的 `interface` 和 `type` ，如果像上面这样，所有的 `interface` 和 `type` 都暴露在最外层作为全局类型，很有可能会出现命名冲突。

实际上，应该尽可能的减少全局变量或全局类型的数量。

所以，最好将他们放在 `namespace` 命名空间下，这样只有命名空间暴露在全局：

```ts
// 声明一个全局命名空间
declare namespace mySpace {

  // 声明变量
  const name: string

  // 声明函数
  function fn<T>(x: T): T

  // 声明 interface
  interface IPeople {
    name: string
    age?: number
  }

  // 声明 type
  type NumAndString = number | string
}

```

使用全局命名空间下的变量和类型：

```ts
// 使用全局命名空间下的变量
console.log(mySpace.name.toUpperCase())
console.log(mySpace.fn('hello'))

// 使用全局命名空间下的 interface
const tom: mySpace.IPeople = {
  name: 'tom',
}

// 使用全局命名空间下的 type
const var1: mySpace.NumAndString = 1
const var2: mySpace.NumAndString = 'hello'

```

## 声明合并

声明合并指的是，如果声明了两个以上的同名函数、同名接口或同名 class ，那么它们会合并成一个类型。

声明合并可以在以下情况下发生：

```txt
interface + interface
namespace + namespace
class + interface
class + namespace
class + interface + namespace
function + namespace
enum + namespace
```

如果声明的同名变量不是函数，接口或 class，那么只以第一次声明的类型为准。

### 函数的声明合并（函数重载）

```ts
declare function fn(x: number): string
declare function fn(x: string): number
declare function fn(x: boolean): number
```

### `interface` 的声明合并

```ts
interface User {
  name: string
  fn(number): string
}

interface User {
  name: string
  age: number
}

interface User {
  age: number
  gender: number
  fn(string): number
}
```

相当于：

```ts
interface User {
  name: string
  age: number
  gender: number
  fn(number): string
  fn(string): number
}

```

可以看到上例中，多次声明同名 `interface`, 实际上它们会合并为一个声明，其成员可以重复，但类型必须一致，否则会报错，其中的同名方法也会发生合并，和函数的声明合并一致。

### class 类的合并

`class` 的合并实际上与 `interface` 的合并完全一致。

### 利用声明合并扩展全局 interface

比如，如果要告诉 TS ，我们将在 `window` 对象上添加一个函数：

直接通过 `interface` 声明 `Window` 即可，会通过声明合并与原有 `Window` 类型合并。

```ts
// src/index.d.ts

interface Window {
  sum(a: number, b: number): number
}
```

在项目中即可直接使用：

```ts
// 正常通过 TS 检查
console.log(window.sum(3, 2))
```

同理，还可以对 `String`, `Array` 等类型进行扩展：

```ts
interface String {
  isString(): boolean
}
```

## 模块(局部)声明文件

只要在声明文件中，出现了 `import` 或 `export`, 那么这个声明文件就是**模块声明文件**，而不再是全局声明文件。

在模块声明文件中，所有声明都属于局部声明，都只能在文件内部使用，或者通过 `export` 供外部使用。

如果必须要在模块声明文件中，声明一些全局变量或全局类型，可以在 `declare global` 块中完成：

比如，在一个叫做 `myModule` 的模块声明文件中声明全局变量和全局类型：

```ts
// src/myModule.d.ts

// declare global 必须在模块声明文件中使用，
// 如果实在没有东西需要导出，导出一个空对象也行
// 这样本文件才能成为一个模块声明文件
export {}

// 在模块声明文件中，声明全局变量，或者全局类型
declare global {
  // 声明全局变量
  const globalString: string
  // 声明全局函数
  function globalFn<T>(x: T): T

  // 声明全局 interface
  interface IPeople {
    name: string
    age?: number
  }
  // 声明已存在的 String 类型，会发生声明合并
  interface String {
    isString(): boolean
  }
}

```

需要注意的是，`declare global` 块必须出现在模块声明文件中，才能有效声明全局变量或全局类型。

在全局任意地方直接使用：

```ts
// src/**/*.js

// 使用全局变量
console.log(globalString)
// 使用全局方法
console.log(globalFn('hello'))

// 使用全局 interface
const tom: IPeople = {
  name: 'tom',
  age: 20,
}

// 通过 声明合并 扩展的 String 实例方法 isString
console.log(tom.name.isString())

```

### `declare module` 声明模块或扩展模块

`declare module` 可以用来为一个没有类型声明的模块声明类型，也可以用来扩展一个模块的类型声明。

#### 为一个模块编写声明文件

假设，现在有一个模块叫做 `foo` ，直接使用时会报错：

```ts
// TS 报错
// Cannot find module 'foo' or its corresponding type declarations.
import sayHi, { name, sayHello } from 'foo'
```

由于上例报错，所以需要我们来写声明文件告诉 TS 这个模块的信息：

```ts
declare module 'foo' {
  const name: string
  function sayHello (name: string): string
  export default function sayHi(): string
}
```

使用模块 `foo`：

```ts
import sayHi, { name, sayHello } from 'foo'

sayHi()
sayHello(name)

```

### `/// <reference />` 三斜线指令引用声明文件

当我们在编写一个全局声明文件但又依赖其他声明文件时，文件内不能出现 `import` 去导入其他声明文件的声明，此时就需要通过三斜线指令来引用其他的声明文件。

可以看出来，三斜线其实也是一种注释语句，只不过在原有注释两条斜线 `//` 的基础上多写一条变成了三斜线 `///` , 之后通过 `<reference />` 来引用另一个声明文件。TS 解析代码时看到这样的注释就知道我们是要引用其他声明文件了。

`<reference />` 可以通过 `types` 属性或 `path` 属性来引用其他声明文件。

`types` 用于引用另一个库的声明，而 `path` 用于引用另一个文件的声明：

```ts
/// <reference types="foo" />
/// <reference path="bar.d.ts" />
```

三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现行注释。

在声明了模块 `foo` 之后，就可以正常使用了，而不会收到 TS 编译时的报错信息。

## 打包时自动生成声明文件

在打包 TS 代码时，通过配置 `tsconfig.json` 可以自动生成相应的 `*.d.ts` 声明文件：

```json
{
  "compilerOptions": {
    // 是否自动生成声明文件
    "declaration": true,
    // 设置生成的声明文件存放目录
    "declarationDir": ".",
    // 对每个 .d.ts 文件，都生成对应的 .d.ts.map（sourcemap）文件
    "declarationMap": true,
    // 仅生成 .d.ts 文件，不生成 .js 文件
    "emitDeclarationOnly": true,
  }
}
```
