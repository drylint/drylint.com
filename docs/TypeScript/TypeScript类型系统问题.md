# TypeScript 类型系统备忘录

## 字符串

```ts
// 判断字符串的最后一个或多个字符的用法，第二个大括号内不使用 infer ，直接使用字面量类型即可
type IsOdd<T extends number> =
  `${T}` extends `${infer _}${1 | 3 | 5 | 7 | 9}`
    ? true
    : false

type R1 = IsOdd<2001> // true
type R1 = IsOdd<2002> // false
```

```ts
// 使用 infer N extends number 的一个问题
type Test1<T extends string> = T extends `${infer N extends number}${infer Rest extends string}` ? [N, Rest] : never
type Test2<T extends string> = T extends `${infer N extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${infer Rest extends string}` ? [N, Rest] : never

type Test1_1 = Test1<'1a'> // [1, "a"] , expected
type Test1_2 = Test1<' '> // [number, ""] , why?
type Test1_3 = Test1<' a'> // [number, "a"] , why?
type Test1_4 = Test1<'aa'> // never , expected

type Test2_1 = Test2<'1a'> // [1, "a"] , expected
type Test2_2 = Test2<' '> // never, expected
type Test2_3 = Test2<' a'> // never, expected
type Test2_4 = Test2<'aa'> // never, expected

```
