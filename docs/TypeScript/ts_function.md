# 函数

[toc]

## 函数的声明

```ts
// 1. 普通声明方法
function add (a: number, b: number): number {
 return a + b
}
console.log(add(3, 5)) // 8

// 2. 函数表达式法
let add2 = function (a: number, b: number): number {
 return a + b
}
console.log(add2(3, 5)) // 8

// 3. 箭头函数
let add3 = (a: number, b: number): number => {
 return a + b
}
console.log(add3(3, 5)) // 8

// 4. 完整的类型声明，声明变量时直接规定函数类型，赋值的函数也规定类型
// 声明的变量不规定类型，当赋值函数后，程序会自动为变量推论出类型
// 变量的函数类型参数(a, b)和实现的参数名(x, y)无需一致，类型符合即可
let add4: (a: number, b: number) => number = function(x: number, y: number): number {
    return x + y
}
```

上述第 4 中，注意不要混淆了 TypeScript 类型定义中的 `=>` 和 ES6 函数中的 `=>`。

在 TypeScript 的函数类型定义中，`=>` 左边括号中是参数类型约束，右边是函数返回类型约束。

调用函数时，参数多或少均会报错：

```ts
let add = (a: number, b: number): number => {
 return a + b
}

console.log(add(3)) // 报错 Expected 2 arguments, but got 1.
console.log(add(3, 5， 7)) // 报错 Expected 2 arguments, but got 3.

```

## 用接口定义函数的形状

```ts

// 函数接口
interface Ifunc{
  (arr: number[], value: number): boolean
}

// 使用接口约束函数的参数个数、类型，以及返回类型
const isIncludes: Ifunc = (arr: number[], value: number): boolean => {
  return arr.includes(value)
}


let arr = [1, 3, 5, 7, 9]
console.log(
  isIncludes(arr, 1), // true
  isIncludes(arr, 2), // false
)

```

## 可选参数 `?`

在参数名后加一个 `?` 即可表示可选参数，调用函数时，此参数可以不传。

> 注意：可选参数后面不允许再出现必需参数

```TS
const intro = (name: string, age?: number): string => `I am ${name}， age: ${age || '**'}`

console.log(
  intro('Tom'), // I am Tom， age: **
  intro('Jerry', 20), // I am Jerry， age: 20
)

```

## 参数默认值

ES6 中允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数。

```ts
const InterRangeArray = (end: number, start: number = 0): number[] => {
  const arr: number[] = []
  for (let i: number = start; i <= end; i++ ) {
    arr.push(i)
  }
  return arr
}

console.log(
  InterRangeArray(3), // [0, 1, 2, 3]
  InterRangeArray(10, 6) // [6, 7, 8, 9, 10]
)
```

如果将可选参数放在前，必须参数放在后，则调用函数时必须显示地传入 `undefined` 去使用默认参数。

## 剩余参数 `...rest`

使用 `...rest` 来获取剩余的所有参数，`rest` 将会是一个真正的数组。

```ts
const getSum = (currentSum: number, ...rest: number[]): number => {
  return rest.reduce((prev, next) => {
    return prev + next
  }, currentSum)
}

console.log(
  getSum(1), // 1
  getSum(1, 3 ,5) // 9
)

```

## 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如需要一个反转函数，将数字 `123` 反转为 `321`, 字符串 `'hello'` 反转为 `'olleh'`。

### 利用联合类型实现

```ts
const overloadReverse = (x: number | string): number | string => {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

console.log(
  overloadReverse(123), // 321
  overloadReverse('hello'), // "olleh"
)
```

缺点：不能够精确地表示，参数和返回值必须同时为 `number` 或 同时为 `string` 类型。

```ts
const overloadReverse = (x: number | string): number | string => {
  if (typeof x === 'number') {
    return String(x)
  } else if (typeof x === 'string') {
    return Number(x)
  }
}
```

以上代码，参数 `number` 类型 返回 `string` 类型， 参数 `string` 类型，返回 `number` 类型都没有报错，不符合需求。

### 使用重载定义多个 reverse 的函数类型

```ts
function overloadReverse(x: number): number;
function overloadReverse(x: string): string;
function overloadReverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
