# 泛型（Generics） ` <T> `

[toc]

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

## 泛型介绍

例：一个函数，接收一个参数，要求传入什么类型就返回什么类型。

```ts
// 第一种写法：固定某一种类型，不够灵活
let func = (value: number): number => {
 return value
}
func(10) // 此函数只能用于 number，其他类型却需要重新定义。

// 第二种写法：使用 any ，无法满足要求。
let func2 = (value: any):any => {
 return value.length
}
func2('str') // 接收到字符串，返回却是数字。
```

使用 any 类型的弊端：无法控制返回类型和传入类型一致。比如传入 number 类型，使用者却有可能返回任意类型。

### 1. 泛型（就是表示类型的变量） `<T>`

用变量来表示类型，使用同一变量的值都必须是同一种类型。

用 `<T>` 定义类型变量 `T` ，变量 `T` 会捕获到传入的类型，就可以在之后使用这个类型。

```ts
// 定义泛型函数：普通函数写法
function func<T>(value: T): T{
 return value
}

// 定义泛型函数：箭头函数写法
let func2 = <A>(value: A): A => {
 return value
}

// 调用时可以传入类型参数给泛型，若不传程序会利用 类型推论，根据参数自动推论。
console.log(func<number>(10)) // 10
console.log(func('str')) // str
console.log(func2(20)) // 20
console.log(func2<string>('string')) // string

func2<string>(1) // 报错 Argument of type '1' is not assignable to parameter of type 'string'.
```

### (2)使用泛型

同使用一般类型的用法基本一致

例：要求传入函数的参数是一个满足类型变量的数组，返回数组的长度

```ts
let getArrLength = <A>(value: A[]): number => { // value: Array<A> 另一种写法
 return value.length
}
// 1. 传入所有的参数，包含类型参数（此处为 <string>）：
console.log( getArrLength<string>(['1', '2', '3']) ) // 3


// 2. 利用类型推论 -- 编译器会根据传入的参数自动地帮助我们确定 <A> 中 A 的类型（此处推断为 number）：
console.log( getArrLength([1, 2, 3, 4, 5]) ) // 5

```

#### 多个泛型参数

```ts

// 普通函数写法
function multiParams <A, B, C> (tupleData: [C, B, A]): [B, C, A] {
  return [tupleData[1], tupleData[0], tupleData[2]]
}

// 箭头函数写法
const multiParams2 = <A, B, C> (tupleData: [C, B, A]): [B, C, A] => {
  return [tupleData[1], tupleData[0], tupleData[2]]
}

multiParams([1, false, 'str'])
/* 不指定泛型参数的类型，被推断为：
function multiParams<string, boolean, number>(
  tupleData: [number, boolean, string]
): [boolean, number, string]

*/

multiParams2<number, boolean, string>(['str', false, 1])
/* 手动指定每个泛型参数的类型：
function multiParams<number, boolean, string>(
  tupleData: [string, boolean, number]
): [boolean, string, number]

*/
```

### (3) 创建泛型函数

```ts
// 1. 定义变量，并直接赋值一个泛型函数，变量将被推论出类型
let func1 = <T>(arg: T): T => {
 return arg
}

// 2. 先定义变量并指定为泛型函数类型，再赋值一个泛型函数给它
let func2: <T>(arg: T) => T = func1

// 3. 同上
let func3: <T>(arg: T) => T = <B>(value: B): B => {
 return value
}

// 4. 使用带有调用签名的对象字面量来定义泛型函数
let func4: { <T>(arg: T): T } = func1


console.log( func1({a: 1, b: 2, c: 3}) ) // {a: 1, b: 2, c: 3}
console.log( func2([1, 2, 3]) ) // [1, 2, 3]
console.log( func3('str') ) // str
console.log( func4(['1', '2', '3']) ) // ["1", "2", "3"]

```

可以将以上的 `4.` 的对象字面量 拿出来作为一个接口：泛型接口

#### (4)泛型接口

```ts
// 定义泛型接口
interface Fan {
 <T>(arg: T): T
}

// 用泛型接口规定 变量 的类型，值必须满足泛型接口中规定的函数类型
let func1: Fan = <R>(value: R): R => {
 return value
}

console.log( func1(1) ) // 1

```

优化：将泛型变量 `T` 当作整个接口的类型

```ts
// 将 T 作为接口的参数
interface Fan<T> {
 (arg: T):T
}

// 使用接口时，必须指定泛型参数的类型
let func1: Fan<number> = <R>(value: R): R => {
 return value
}

console.log( func1(1) ) // 1

```

除了泛型接口，还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。

#### 5. 泛型类

```ts
class Person<T> {
 constructor (public name: T) {

 }
 intro: () => T = ():T => {
  return this.name
 }
}

let tom = new Person<string>('tom')
console.log(tom) // {name: "tom", intro: ƒ}
console.log(tom.intro()) // tom

```

直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

类有两部分：静态部分和实例部分，泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

#### (6) 泛型约束

定义一个接口，在接口中规定泛型参数的约束条件，比如必须拥有某个属性，再使用这个接口和 `extends` 关键字来实现约束：

```ts
// 定义接口，约束条件为：必须包含 length 属性，且这个属性的值为 number 类型
interface HasLength {
 length: number
}

// 定义类型变量 T 继承接口，T 将拥有接口的类型约束
function func<T extends HasLength>(arg: T): T {
 console.log(arg.length)
 return arg
}

func('string') // OK：参数是字符串，自带 length 属性
func([1, 2, 3]) // OK：参数是数组，自带 length 属性
func({a: 1, length: 5, b:2}) // OK：参数是对象，手动添加了length 属性
func(1) // 报错：参数是数字，没有 length 属性，不满足 HasLength 类型的约束条件

```

##### 泛型约束 VS 接口约束

```ts
interface HasLength {
 length: number
}

// 泛型约束: 泛型变量继承接口之后，再用于约束参数和返回值
function func1<T extends HasLength>(arg: T): T {
 console.log(arg.length)
 return arg
}

func1({a: 1, length: 5, b:2}) // OK，泛型约束只要至少包含约束的属性即可。

// 接口约束：直接使用接口来约束参数和返回值
function func2(arg: HasLength): HasLength {
 console.log(arg.length)
 return arg
}



func2({length: 5}) // OK

const obj = {a: 1, length: 5, b:2}
func2(obj) // OK

func2({a: 1, length: 5, b:2}) // 报错，接口约束的参数传入字面量对象时，要求属性不能多也不能少，必须和接口一样。

```

#### 多个类型参数之间也可以互相约束

```ts
// 1. K extends keyof T：泛型 K 继承泛型 T 的属性，也就是要求参数 key 必须是参数 obj 的属性之一
// 2. T[K] 要求返回值必须是 obj 之中的某一属性值。
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
 return obj[key]
}

let obj = { a: 1, b: 2, c: 3, d: 4 }

getProperty(obj, 'a'); // OK：obj 中包含 a 这个 key
getProperty(obj, 'm'); // 报错：obj 中不包含 m 这个 key

```

#### 泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
const Fan = <T = number>(value: T): T => {
  return value
}

```

#### (8) 在泛型里使用类类型

```ts
// 定义一个类类型，类类型接收一个泛型参数
interface Ctype<Z> {
 new (): Z
}

// 使用类类型，并传入类型参数 T
function createFn<T>(c: Ctype<T>): T {
 return new c();
}

// 若不想单独定义类类型接口 Ctype，函数参数中 'Ctype<T>' 也可直接写为类类型 '{ new (): T }' 或 'new () => T'

// create 函数的参数是一个 Class，返回值是这个 Class 的实例。
class Person {
  constructor (public name: string = 'tom', public age: number = 20) {
  }
}

let tom = createFn(Person)
console.log(tom) // {name: "tom", age: 20}
```

更进一步用法：

```
interface Ctype<Z> {
 new(n: string, a: number): Z
}

// 使用类类型，并传入类型参数 T
function createFn<T>(c: Ctype<T>, name: string, age: number): T {
 return new c(name, age);
}

class Person {
  constructor (public pname: string, public page: number) {
  }
}

let tom = createFn(Person, 'tom', 20)
console.log(tom) // {pname: "tom", page: 20}

```

###### 使用原型属性推断并约束构造函数与类实例的关系

```ts
class Boy {
  isBoy: boolean = true
}

class Girl {
  dressing: string = 'skirt'
}

class Person {
  legs: number = 2
}

class Primary extends Person {
  boys: Boy = { // 使用 Boy 原型推断类型，约束 boys 的类型
    isBoy: true
  }
  age: number = 10
}

class Middle extends Person {
  girls: Girl = { // 使用 Girl 原型推断类型，约束 girls 的类型
    dressing: 'skirt'
  }
  age:number = 13
}

function createInstance<A extends Person>(cla: new () => A): A {
  return new cla()
}

let a = createInstance(Primary)
let b = createInstance(Middle)
console.log(a) // {legs: 2, boys: {isBoy: true}, age: 10}
console.log(b) // {legs: 2, girls: {dressing: "skirt"}, age: 13}

```
