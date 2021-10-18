# ts_符号、关键字和类型工具

[toc]

## 符号

- `!` 非空断言，不推荐使用，告诉 TS 一个变量不是 `null` 也不是 `undefined` 。

### `!` 非空断言

```ts
console.log(obj!.a)
```

## 关键字

- `typeof` 获取一个变量的类型
- `keyof` 获取一个对象中的所有 key 值
- `in` 遍历一个类型
- `extends` 在泛型中约束一个泛型应该继承自另一个类型
- `infer` 在条件类型语句中，可以用 `infer` 声明一个类型变量并且对它进行使用。

### `typeof`

不同于 JS 中的 `typeof`，TS 中的 `typeof` 可以获取一个**值**的类型，只获取属性名和属性类型，不会获取具体的值。

- JS 中的 `typeof` 是用于表达式中，用于运行时获取一个值的类型
- TS 中的 `typeof` 是用于类型上下文中，用于编译时推断一个值的类型

通常情况下，一个值是不能作为类型来使用的，使用 `typeof` 后则可以将一个值用于类型定义。`typeof` 之后只能是一个值，不能是一个类型。

```ts
const obj1 = {
  name: 'tom',
  age: 20,
}

const obj2: typeof obj1 = {
  name: 'jerry',
  age: 30,
}
```

`typeof` 通常用于具有结构的值，比如对象等。

如果将 `typeof` 用于原始类型的值，返回的类型将是这个值，通常这样做没有意义：

```ts
const var1 = 'hello'
const var2 = 1
const var3 = true
const var4 = { name: 'tom', age: 20 }
const var5 = [1, 2, 3]

type T1 = typeof var1 // 无意义，相当于 type T1 = 'hello'
type T2 = typeof var2 // 无意义，相当于 type T2 = 1
type T3 = typeof var3 // 无意义，相当于 type T3 = true
type T4 = typeof var4 // 相当于 type T4 = { name: string, age: number }
type T5 = typeof var5 // 相当于 type T5 = number[]
```

JS 中的 `typeof` 和 TS 中的 `typeof`：

```ts
const tom = {
  name: 'tom',
  age: 20,
}

// 函数定义返回值时使用的 typeof, 使用的是 TS 中的 typeof
const fn = (name: string, age: number | string): typeof tom => {
  // 表达式中的 typeof, 实际上是使用的 JS 中的 typeof
  if (typeof age === 'number') {
    return {
      name,
      age,
    }
  }
  return {
    name,
    age: +age,
  }
}
```

### `keyof`

`keyof` 用于获取一个类型的所有 key 值，并返回这些 key 值(注意不是 key 值的类型)组成的联合类型。如果该类型具有字符串或数字索引签名，`keyof` 将返回这些类型。

`keyof` 之后只能是一个类型，不能是一个值。如果要获取一个值的所有类型，需要使用 `keyof typeof <值>`

```ts
interface IPerson {
  name: string
  age: number
}

// 相当于 const var1: 'name' | 'age' = 'age'
const var1: keyof IPerson = 'age'

const var2: IPerson = {
  name: 'tom',
  age: 20,
}

//  keyof typeof 连用，相当于 const var3: 'name' | 'age' = 'name'
const var3: keyof typeof var2 = 'name'
```

`keyof` 获取拥有 `number` 索引签名的类型：

```ts
type Type1 = {
  [n: number]: unknown
}
type Type2 = keyof Type1; // 相当于 Type2 = number

const var1: Type2 = 1 // 相当于 const var1: number = 1
```

`keyof` 获取拥有 `string` 索引签名的类型：

```ts
type Type1 = {
  [x: string]: unknown
}

type Type2 = keyof Type1; // 相当于 Type2 = string | number

const var1: Type2 = 1
const var2: Type2 = 'hi'
```

可以看到，上例中，`Type1` 只拥有 `string` 类型的索引签名，但 `keyof` 取出了 `string | number` 类型，这是因为，在 JavaScript 中，对象的 key 总是会被转为 string 类型，`obj[0]` 总是相当于 `obj['0']`。

### `in`

遍历一个联合类型

```ts
type Keys = 'a' | 'b' | 'c'

// { a: any, b: any, c: any }
type Obj =  {
  [p in Keys]: any
}

```

### `extends`

`extends` 在 JS 中也存在，用于一个 class 继承另一个 class ，比如 `class A extends B` 。

在 TS 的类型系统中，`A extends B` 表示类型 A 是否是继承(扩展)自类型 B，也就是类型 A 可赋值给类型 B

TS 的类型系统中的 `extends` 通常用于**泛型约束**和**类型条件表达式**。

在泛型约束中，`extends` 用于将泛型变量的类型约束在一定的范围之内。比如：

```ts
// 将泛型变量 T 约束为只能为 number 或 string 之一
type Func = <T extends number | string>(x: T)=> T
```

在类型条件表达式中，语法为：

```ts
T extends U ? X : Y
```

示例：

```ts
interface Animal {
  live(): void
}

interface Dog extends Animal {
  woof(): void
}

// 结果为 type Example1 = number
type Example1 = Dog extends Animal ? number : string

// 结果为 type Example2 = string
type Example2 = RegExp extends Animal ? number : string
```

当泛型变量传入联合类型时，会有一些地方可能和想象结果不一样：

```ts
type ToArray1<Type> = Type extends any ? Type[] : never
type ToArray2<Type> = [Type] extends any ? Type[] : never

// type StrArrOrNumArr = string[] | number[]
type T1 = ToArray1<string | number>

// type T2 = (string | number)[]
type T2 = ToArray2<string | number>
```

可以看到，上面使用 `[]` 将泛型包裹一下后，返回的类型实际是不一样的。

类型条件表达式在泛型中会非常有用：

```ts
// T['message'] 相当于在提取泛型 T 的 message 属性的类型，结果取决于传入的泛型
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

interface Email {
  message: string
}

interface Phone {
  message: number
}

interface Dog {
  bark(): void
}

// 结果为：type EmailMessageContents = string
type EmailMessageContents = MessageOf<Email>

// 结果为：type PhoneMessageContents = number
type PhoneMessageContents = MessageOf<Phone>

// 结果为：type DogMessageContents = never
type DogMessageContents = MessageOf<Dog>
```

在上面的例子中，使用了 `T['message']` 来提取传入的泛型 T 的 `message` 属性的类型。但这其实是手动通过索引 `message` 来提取的。

在条件类型表达式中，还提供了一个更方便的用于提取类型的关键字 `infer` 。它可以帮我们更方便地提取一个类型出来。

### `infer`

`infer` 意为推断，但依据它的作用，其实可以将其理解为「捕获」，`infer X` 语句的意思就相当于：捕获一个类型并将这个类型分配给类型变量 `X` 保存。

`infer X` 语句放置在哪里呢，放置在一个想要捕获类型的地方，也就是说将 `infer X` 语句当作一个占位语句放置在本来应该书写类型的地方，就可以捕获到这个类型。

比如数组的类型，对象属性类型，函数参数的类型，函数的返回值等

```ts
// 用变量 ItemType 捕获数组的类型
// 也可写为 Array<infer ItemType> ，就像 string[] 和 Array<string> 写法一样
type T1<T> = T extends (infer ItemType)[] ? ItemType : T

// 用变量 MsgType 捕获对象属性的类型
type T2<T> = T extends { message: infer MsgType } ? MsgType : T

// 用变量 ParamType 捕获函数的参数 x 的类型
type T3<T> = T extends (x: infer ParamType) => string ? ParamType : T

// 用变量 ReturnType 捕获函数的返回值的类型
type T4<T> = T extends (x: string) => infer ReturnType ? ReturnType : T

type T11 = T1<string[]> // type T11 = string
type T12 = T1<Array<number>> // type T12 = number

type T21 = T2<{ message: string }> // type T21 = string
type T22 = T2<{ message: number }> // type T22 = number

type T31 = T3<(x: string) => string> // type T31 = string
type T32 = T3<(x: number) => string> // type T32 = number

type T41 = T4<(x: string) => string> // type T41 = string
type T42 = T4<(x: string) => number> // type T42 = number
```

下面看一个注释更详细的示例：

```ts
// (infer ItemType)[] 在这里表示任何类型的数组，比如 string[], number[] 等
// infer ItemType 就是将 ItemType 当作一个类型变量，传入的是什么类型的数组，ItemType 就是什么类型。
type Flatten<T> = T extends (infer ItemType)[] ? ItemType : T

// infer ItemType 将类型 string 推断给了 ItemType
// 结果为 type T1 = string
type T1 = Flatten<string[]>

// infer ItemType 将类型 number 推断给了 ItemType
// 结果为：type T2 = number
type T2 = Flatten<number[]>

// 类型条件表达式走了 false 分支，直接返回了泛型变量的类型
// 结果为 type T3 = string
type T3 = Flatten<string>
```

其实，TS 提供的多个类型工具都是使用的 `infer` 语句，比如很常用的 `ReturnType`, 还有 `ThisParameterType`, `OmitThisParameter`, `Parameters`, `ConstructorParameters`, `InstanceType` 。

比如，我们经常使用 `ReturnType<>` 来获取一个函数的返回值类型

```ts
type Func1 = (x: number, y: number) => number
type Func2 = (x: number, y: number) => string

type T1 = ReturnType<Func1> // type T1 = number
type T2 = ReturnType<Func2> // type T2 = string
```

来看一下 `ReturnType` 是怎么使用 `infer` 来捕获我们传入的函数的返回值的：

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

- `type ReturnType<T extends (...args: any) => any>` 定义了一个类型别名 `ReturnType`, 它有一个泛型变量 `T`, `T` 被约束为必须是一个函数。
- `T extends (...args: any) => infer R ? R : any;` 类型条件表达式，泛型变量 `T` 如果继承自 `(...args: any) => infer R`, 则返回 通过 `infer` 捕获到的函数返回值类型，否则返回 `any` 类型。
