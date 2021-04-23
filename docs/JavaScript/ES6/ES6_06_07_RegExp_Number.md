[toc]

## 正则的扩展

- RegExp 构造函数
- 字符串的正则方法
- u 修饰符
- RegExp.prototype.unicode 属性
- y 修饰符
- RegExp.prototype.sticky 属性
- RegExp.prototype.flags 属性
- s 修饰符：dotAll 模式
- 后行断言
- Unicode 属性类
- 具名组匹配
- String.prototype.matchAll

-

### 1. RegExp() 构造函数

 ES5 中，RegExp构造函数的参数有两种情况：

- 参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。

    ```js
    var regex = new RegExp('xyz', 'i')
    // 等价于
    var regex = /xyz/i

    ```

- 参数正则表示式，返回原有正则表达式的拷贝。不允时使用第二个参数添加修饰符。

    ```js
    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;
    ```

ES6 中允许参数为正则时使用第二个参数，并且优先级比正则中的修饰符更高。

```js
new RegExp(/abc/ig, 'i').flags // 获取正则的 修饰符(flag)
// "i" 第二个参数指定的修饰符覆盖了第一个参数正则中的修饰符。

```

### 字符串的正则方法

`match()` 、`replace()` 、`search()` 和 `split()`

### u 修饰符

ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。

```js
// \uD83D\uDC2A 是一个四个字节的 UTF-16 编码，代表一个字符。

/^\uD83D/.test('\uD83D\uDC2A') // true ES5 不支持四个字节的 UTF-16 编码，会将其识别为两个字符，导致第二行代码结果为true。
/^\uD83D/u.test('\uD83D\uDC2A') // false ES6 就会识别其为一个字符，所以第一行代码结果为false。

```

```js
// \u004B与\u212A都是大写的 K。

// \u004B 加不加修饰符 u 都可识别
console.log(/[a-z]/i.test('\u004B')) // true
console.log(/[a-z]/iu.test('\u004B')) // true

// \u212A 不加 u 则无法识别
console.log(/[a-z]/i.test('\u212A')) // false，识别不出
console.log(/[a-z]/iu.test('\u212A')) // true

```

##### RegExp.prototype.unicode 属性

正则实例对象新增unicode属性，表示是否设置了u修饰符。

```
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true

```

##### `y`  修饰符 -- “粘连”（sticky）修饰符

###### `y` 修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始  

###### 不同之处：`g` 修饰符只要剩余位置中存在匹配就可，而 `y` 修饰符要求必须从剩余的第一个位置开始就要匹配，这也就是“粘连”的涵义

```js
var s = 'aaa_aa_a'
var r1 = /a+/g
var r2 = /a+/y

r1.exec(s) // ["aaa"]
r1.exec(s) // ["aa"] // 第二次从 _ 开始往后找到匹配项即可


r2.exec(s) // ["aaa"]
r2.exec(s) // null // 第二次从 _ 开始，遇到第一个字符就不匹配，所以为 null

```

> 实际上，`y` 修饰符号隐含了头部匹配的标志^。`y` 修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。

### RegExp.prototype.sticky 属性

判断一个正则实例对象是否设置了 `y` 修饰符。

```js
var r = /hello\d/y;
r.sticky // true
```

### RegExp.prototype.flags 属性

返回一个正则表达式的所有修饰符。

```js
// ES5 的 source 属性，返回正则表达式的正文
/abc/ig.source // "abc"

// ES6 的 flags 属性，返回正则表达式的修饰符
/abc/ig.flags // 'gi'
```

### `s` 修饰符：dotAll 模式

ES2018 引入s修饰符，使得`.`可以真正意义上匹配任意单个字符。  
正则中，点（.）是一个特殊字符，匹配任意的单个字符，但是有两个例外。  
一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决。

另一个是行终止符（line terminator character）：

- U+000A 换行符（\n）
- U+000D 回车符（\r）
- U+2028 行分隔符（line separator）
- U+2029 段分隔符（paragraph separator）

```js
/foo.bar/.test('foo\nbar') // false，. 不匹配 \n
/foo.bar/s.test('foo\nbar') // true，使用修饰符 s 开启 dotAll 模式，真正匹配任意单个字符

```

### RegExp.prototype.dotAll 属性

判断一个正则实例对象是否处在dotAll模式

```js
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'

```

### 后顾(后行断言)

之前的ES只支持前瞻(先行断言)，ES2018 引入后顾(后行断言)，V8 引擎 4.9 版（Chrome 62）已经支持。

```js
// 前瞻

// 正向前瞻
let r1 = /(?=y)x/ // x 之后是 y 才匹配出 x
// 负向前瞻
let r2 = /(?!y)x/ // x 之后不是 y 才匹配出 x

// 后顾

// 正向后顾
let r3 = /(?<=y)x/ // x 之前是 y 才匹配出 x

// 负向后顾
let r4 = /(?<=y)x/ // x 之前不是 y 才匹配出 x

```

“后顾”的实现，需要先匹配 `/(?<=y)x/` 的 `x`，然后再回到左边，匹配 `y` 的部分。这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。

> 后行断言是先从左到右扫描，发现匹配以后再回过头，从右到左完成反斜杠引用。

- 异常的组匹配

    ```ts
    // 正常的分组匹配
    /^(\d+)(\d+)$/.exec('1053'); // ['1053', '105', '3']
    // '1053' 是整个表达式匹配结果, '105' 和 '3' 是两个括号分组匹配结果
    // 第一个分组匹配 '105' ，因为是 贪婪模式，匹配尽可能多
    // 第二个分组只匹配到了剩下的一个字符


    // 有后顾的分组匹配
    /(?<=(\d+)(\d+))$/.exec('105·3'); // ['', '1', '053']
    // '' 表示整个表达式没有匹配到字符，'1' 和 '053' 是两个括号分组匹配结果
    // 由于后顾的执行顺序是从右到左，第二个括号先匹配，并以贪婪模式匹配到 '053'
    // 第一个括号只能匹配到 '1'

    ```

- 异常的反斜杠引用
与通常的顺序相反，必须放在对应的那个括号之前。

    ```ts
    // 正常的反斜杠引用
    /(12)(34)\1/  // 表示 123412, \1 表示第一个分组 12
    /(12)(34)\2/  // 表示 123434, \2 表示第二个分组 34
    /(12)(34)\1\2/  // 表示 12341234
    /(12)(34)\2\1/  // 表示 12343412

    // 异常的反斜杠引用
    console.log(/(?<=(o)pp\1)site/.exec('opposite')) // null，\1 在分组 1 括号右边无法匹配
    console.log(/(?<=\1pp(o))site/.exec('opposite')) // ['site']，\1 在分组 1 括号左边可以

    ```

### 正则的 Unicode 属性类

ES2018 引入了一种新的类的写法 `\p{...}` 和 `\P{...}`，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

大写的P `\P{…}` 是 小写p `\p{…}` 的反向匹配，即匹配不满足条件的字符。
语法：

```ts

// 通常，Unicode 属性类要指定属性名和属性值。
/\p{UnicodePropertyName=UnicodePropertyValue}/u


// 对于某些属性，可以只写属性名，或者只写属性值。
/\p{UnicodePropertyName}/u
/\p{UnicodePropertyValue}/u

```

> 这两种类只对 `Unicode` 有效，所以使用的时候一定要加上 `u` 修饰符。如果不加 `u` 修饰符，正则表达式使用 `\p` 和 `\P` 会报错，ECMAScript 预留了这两个类。

```js
// 匹配十进制数字
const regex = /^\p{Decimal_Number}+$/u;
regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') // true

// 匹配所有数字
const regex = /^\p{Number}+$/u;
regex.test('²³¹¼½¾') // true
regex.test('㉛㉜㉝') // true
regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true

// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true

```

### 具名组匹配 -- 拥有别名的分组匹配

使用 `?<组名>` 写法

```js
// 没有分组名的正则

let result = /(\d{4})-(\d{2})-(\d{2})/.exec('1999-12-31') // 3 个分组不带名字
/*
[ '1999-12-31',
  '1999', // 分组 1 匹配结果
  '12', // 分组 2 匹配结果
  '31', // 分组 3 匹配结果
  index: 0,
  input: '1999-12-31',
  groups: undefined
]
*/
// 需要使用分组匹配的结果时，必须按下标顺序访问，如果分组顺序变化，访问也需要变化
console.log(
    result[1], // 1999
    result[2], // 12
    result[3] // 31
)


```

> 组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如matchObj[1]）引用，要是组的顺序变了，引用的时候就必须修改序号。
> ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

```js
let result = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('1999-12-31')
/*
[ '1999-12-31',
  '1999',
  '12',
  '31',
  index: 0,
  input: '1999-12-31',
  groups: { year: '1999', month: '12', day: '31' }
]
*/

// 需要使用分组匹配的结果时，直接访问 groups 对象即可，分组顺序变化也不会影响使用！
// 当然，也还可以继续通过数组下标 result[1] 这样的方式获取
console.log(
  result.groups.year, // 1999
  result.groups.month, // 12
  result.groups.day // 31
)

```

###### 即使分组没有匹配到结果，分组名字也会存在于 groups 对象的 key 中，值为 `undefined`

##### 具名分组的解构赋值和替换

```js
// 解构赋值使用分组结果
let {groups: {year, month}} = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec('1999-12-31')
console.log(year, month) // 1999 12

// 使用分组名替换
let r = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
'1999-12-31'.replace(r, '$<day>/$<month>/$<year>') // "31/12/1999"

// 函数替换

let changed = '1999-12-31'.replace(r, change)
console.log(changed) // 31/12/1999

function change (
  matched, // 整个匹配结果
  capture1, // 第一个组匹配
  capture2, // 第二个组匹配
  capture3, // 第三个组匹配
  position, // 匹配开始的位置
  S, // 原字符串
  groups // 具名组构成的一个对象 {year, month, day}
) {
  let {day, month, year} = groups;
  return `${day}/${month}/${year}`;
}


```

##### 正则表达式内引用分组名

使用 `\k<组名>` 的写法， 数字引用（\1）依然有效。两种引用语法还可以同时使用。

```js
// 引用分组名
let r = /^(?<word>[a-z]+)!\k<word>$/
r.test('abc!abc') // true
r.test('abc!ab') // false

// 数字引用
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false


// 同时使用 分组名引用 和 数字引用
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

### String.prototype.matchAll

取出一个字符串中的多个匹配结果

- 之前的方法：使用 `修饰符g` 或 `修饰符y`  

    ```js
    let regex = /t(e)(st(\d?))/g
    let str = 'test1test2test3'

    let matches = []
    let match
    while (match = regex.exec(str)) {
      matches.push(match) // 循环取出每一轮的正则匹配，并放入数组中
    }
    console.log(matches)
    /*
    [
        ["test1", "e", "st1", "1", index: 0, input: "test1test2test3", groups: undefined]
        ["test2", "e", "st2", "2", index: 5, input: "test1test2test3", groups: undefined]
        ["test3", "e", "st3", "3", index: 10, input: "test1test2test3", groups: undefined]
    ]
    */


    ```

- String 新提案方法：`String.prototype.matchAll`  
  一次性取出所有匹配。返回的一个遍历器（Iterator），而不是数组。

    ```js
    let regex = /t(e)(st(\d?))/g // g 修饰符加不加都可以
    let str = 'test1test2test3'

    let matches = str.matchAll(regex)
    let match
    for (const match of matches) {
      console.log(match)
    }
    // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
    // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
    // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
    console.log(match)
    console.log(typeof match)
    console.log(Object.prototype.toString.call(match))

    ```

    ```js

    for (const match of string.matchAll(regex)) {
      console.log(match);
    }
    // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
    // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
    // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]

    ```

由于string.matchAll(regex)返回的是遍历器，所以可以用for...of循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源。

遍历器转为数组是非常简单的，使用...运算符和Array.from方法就可以了。

```js
// 转为数组方法一
[...string.matchAll(regex)]

// 转为数组方法二
Array.from(string.matchAll(regex));

```

## 数值的扩展

- 二进制和八进制表示法
- Number.isFinite(), Number.isNaN()
- Number.parseInt(), Number.parseFloat()
- Number.isInteger()
- Number.EPSILON
- 安全整数和 Number.isSafeInteger()
- Math 对象的扩展
- 指数运算符

### 二进制和八进制表示法

ES6 提供了二进制和八进制数值的新的写法，分别用前缀 `0b`（或 `0B` ）和 `0o` （或 `0O` ）表示。

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀 `0` 表示，ES6 进一步明确，要使用前缀 `0o`   表示。

```js
0b111110111 === 503 // true // 二进制
0o767 === 503 // true 八进制

```

将0b和0o前缀的字符串数值转为十进制，要使用Number方法。

```js
Number('0b111')  // 7
Number('0o10')  // 8

```

### Number.isFinite(), Number.isNaN()

ES6 在 `Number` 对象上，新提供了 `Number.isFinite()` 和 `Number.isNaN()` 两个方法。

`Number.isFinite()` 用来检查一个数值是否为有限的（finite），即不是 `Infinity` 。
> 注意，如果参数类型不是数值，Number.isFinite一律返回false。

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

```

`Number.isNaN()` 用来检查一个值是否为 `NaN` 。
> 如果参数类型不是NaN，Number.isNaN一律返回false。

##### 与全局方法`isFinite()`和`isNaN()`的区别  

- 传统方法先调用Number()将非数值的值转为数值，再进行判断
- Number 的这两个新方法只对数值做有效判断，非数值一律 `false`，是数值则正常判断。

```
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false

```

### Number.parseInt(), Number.parseFloat()

ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

### Number.isInteger()

Number.isInteger()用来判断一个数值是否为整数。
JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
如果参数不是数值，Number.isInteger返回false。

> 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。

```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger(25) // true
Number.isInteger(25.0) // true

Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

// Number.isInteger的参数明明不是整数，但是会返回true。
// 原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了。
Number.isInteger(3.0000000000000002) // true

// 一个数值的绝对值小于 Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true，5E-325由于值太小，会被自动转为0，因此返回true。
```

总之，如果对数据精度的要求较高，不建议使用 `Number.isInteger()` 判断一个数值是否为整数。

### Number.EPSILON

JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

值为 1 与大于 1 的最小浮点数之间的差。对于 64 位浮点数来说，大于 1 的最小浮点数相当于二进制的1.00..001，小数点后面有连续 51 个零。这个值减去 1 之后，就等于 2 的 -52 次方。

```js
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
```

#### 作用

`Number.EPSILON` 可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即 `Number.EPSILON * Math.pow(2, 2)` ），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```js
5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2) // true

// 封装一个函数，判断两个数的误差是否在允许范围之内，此处允许范围是 2 的 -30 次方 (2e-52 * 2e-22)
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 22);
}

console.log(0.1 + 0.2 === 0.3) // false
console.log(withinErrorMargin(0.1 + 0.2, 0.3)) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
```

### 安全整数和 Number.isSafeInteger()

JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

```js
console.log(Math.pow(2, 53)) // 9007199254740992

// 超出 2 的 53 次方之后，一个数就不精确了。
console.log(9007199254740992)   // 9007199254740992
console.log(9007199254740993)   // 9007199254740992
console.log(9007199254740994)   // 9007199254740994
console.log(9007199254740995)   // 9007199254740996
console.log(90071992547409955)  // 90071992547409950

console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1) // true

```

ES6 引入了 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 这两个常量，用来表示这个范围的上下限。

```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true
Number.MAX_SAFE_INTEGER === 9007199254740991 // true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // true
Number.MIN_SAFE_INTEGER === -9007199254740991 // true

```

`Number.isSafeInteger()` 则是用来判断一个整数是否落在这个范围之内。

```js
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

`Number.isSafeInteger()` 函数的实现

```js
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' && // 是 number 类型
    Math.round(n) === n && // 是整数
    Number.MIN_SAFE_INTEGER <= n && // 大于 最小整数
    n <= Number.MAX_SAFE_INTEGER); // 小于最大整数
}
```

> 实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

```js
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 本应是 9007199254740003
```

9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。

```js
9007199254740993 === 9007199254740992 // true

```

同时验证两个运算数和运算结果的函数：

```js
function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3

```

### Math 对象的扩展

ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

##### Math.trunc()

去除一个数的小数部分，返回整数部分。对于非数值，Math.trunc内部使用Number方法将其先转为数值。对于空值和无法截取整数的值，返回NaN。

```js
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

```

##### Math.sign()

Math.sign方法用来判断一个数到底是正数、负数、还是零。

对于非数值，会使用 `Number(x)` 先将其转换为数值。能转则转后返回结果，转不了则返回NaN

它会返回五种值。

- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为 0，返回0；
- 参数为-0，返回-0;
- 其他值，返回NaN。

```js
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
}

```

##### Math.cbrt()

Math.cbrt方法用于计算一个数的立方根。

```js
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734

// 对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};

```

##### Math.clz32()

`Math.clz32()` 方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。  

clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。

```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
// 上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；
// 1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；
// 1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。


// 左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

// 对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30

// 对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
```

##### Math.imul()

##### Math.fround()

##### Math.hypot()

#### 对数方法

##### Math.expm1()

##### Math.log1p()

##### Math.log10()

##### Math.Math.log2()

#### 双曲函数方法

##### Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）

##### Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）

##### Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）

##### Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）

##### Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）

##### Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

### 指数运算符

ES2016 新增了一个指数运算符（**）。

```js
2 ** 2 // 4
2 ** 3 // 8

// 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
2 ** 3 ** 2  // 512, 相当于 2 ** (3 ** 2)

// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 1.5;
a **= 2; // 相当于 a 的 2次方，等同于 a = a * a;
let b = 4;
b **= 3; //相当于 b 的 3 次方，等同于 b = b * b * b;

// 注意，V8 引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。
Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197

// 上面代码中，两个运算结果的最后一位有效数字是有差异的。

```
