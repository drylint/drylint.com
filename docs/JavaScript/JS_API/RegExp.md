[toc]

# RegExp

## 一、语法

字面量, 构造函数和工厂符号都可以定义一个正则对象：

```js
/pattern/flags // 字面量

new RegExp(pattern [, flags]) // 构造函数

RegExp(pattern [, flags]) // 工厂符号
```

- `pattern` 正则表达式的文本。
- `flags` 匹配的修饰符，以下值可任意组合。
  - `g` 全局匹配，找到所有匹配，而不是在第一个匹配后停止。
  - `i` 忽略大小写
  - `m` 多行，将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
  - `u` Unicode，将模式视为Unicode序列点的序列
  - `y` 粘性匹配，仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。
  - `s` dotAll模式，匹配任何字符（包括终止符 '\n'）。

```js
/ab+c/i;

// 等同于
new RegExp('ab+c', 'i');

// 等同于
new RegExp(/ab+c/, 'i');

```

当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 `\` ）。比如，以下是等价的：

```js
var re = new RegExp("\\w+");

// 等同于
var re = /\w+/;
```

## RegExp 属性

### 1. 静态属性

- `RegExp.prototype` 允许为所有正则对象添加属性。
- `RegExp.length` RegExp.length 值为 2。

### 2. 实例属性

```js
RegExp.prototype.dotAll // 是否使用 "s" 修饰符，特殊字符"."应另外匹配 \n \r 行分隔 段分隔
RegExp.prototype.flags // 返回一个字符串，表示已经启用的修饰符，比如 'gi'
RegExp.prototype.global // 是否使用 g 修饰符开启全局匹配。
RegExp.prototype.ignoreCase // 是否使用 i 修饰符忽略大小写。
RegExp.prototype.lastIndex // 可读可写，整数，获取/设置下一次匹配的起始索引。
RegExp.prototype.multiline //  是否使用 m 修饰符表示多行匹配。（影响 ^ 和 $ 的行为）。
RegExp.prototype.source // 返回正则的源文本字符串，不包含两边的斜杠以及修饰符。
RegExp.prototype.sticky // // 是否使用 i 修饰符开启粘滞匹配。从 lastIndex 下标处开始匹配。
RegExp.prototype.unicode // 是否使用了 u 修饰符，使用后任何 Unicode 代码点的转义都会被解释。

```

## RegExp 方法

### 1. 静态方法

```
无（继承的除外）
```

### 2. 实例方法

```js
RegExp.prototype.exec(str) // 在字符串参数中执行匹配。返回一个数组或 null。
RegExp.prototype.test(str) // 判断正则表达式与指定的字符串参数是否匹配。
RegExp.prototype.toString() // 返回一个表示该正则表达式的字符串。

// 已废弃，被用于在脚本执行过程中（重新）编译正则表达式。与RegExp构造函数基本一样。
RegExp.prototype.compile()

// 非标准，不建议使用
RegExp.prototype.toSource() // 返回一个字符串,代表当前对象的源代码
```

#### RegExp.prototype.exec(str)

在指定的字符串参数中进行匹配，有匹配成功返回数组，否则返回 `null`。

```js
let str = 'a1b22c333d444'
let reg = /([a-z])(\d)/

console.log(reg.exec(str))
// ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
```

返回的匹配结果数组中，下标 `0` 元素表示匹配到的字符串，若正则中有分组，则每一个分组的匹配字符串会从下标 `1` 开始罗列出来。 `index` 表示匹配到的起始下标，`input` 表示匹配的原始字符串参数。`groups` 表示分组命名。

#### RegExp.prototype.test(str)

判断正则表达式与指定的字符串参数是否匹配。

```js
let str = 'a1b22c333d444'
let reg = /([a-z])(\d)/

console.log(reg.test(str))
```

#### 全局匹配修饰符 `g` 的影响

若正则表达式中使用了修饰符 `g` 会对每一次的匹配结果产生影响，每次匹配结束后，正则对象的 `lastIndex` 属性会被更改为本次匹配的最后一位字符加 `1`。所以此正则对象下一次的匹配会从这个 `lastIndex` 下标值开始匹配。

未使用修饰符 `g` 则没有影响，因为匹配结束后不会修改正则对象中的 `lastIndex` 属性值，每次重新匹配时 此值都为 `0`，所以每次匹配都是从下标 `0` 开始匹配。

影响到

- 未使用修饰符 `g`

    ```js
    let str = 'a1b22c333d444'
    let reg = /([a-z])(\d)/

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    /*

    ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
    0

    ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
    0

    ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
    0

    ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
    0

    */
    ```

- 使用修饰符 `g`

    ```js
    let str = 'a1b22c333d444'
    let reg = /([a-z])(\d)/g

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    console.log(reg.exec(str))
    console.dir(reg.lastIndex)

    /*

    ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]
    2

    ["b2", "b", "2", index: 2, input: "a1b22c333d444", groups: undefined]
    4

    ["c3", "c", "3", index: 5, input: "a1b22c333d444", groups: undefined]
    7

    ["d4", "d", "4", index: 9, input: "a1b22c333d444", groups: undefined]
    11

    null
    0

    */
    ```
