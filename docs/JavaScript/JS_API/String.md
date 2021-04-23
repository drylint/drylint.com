[toc]

# String

## 一、属性

### 1.String.prototype

String的原型对象。

#### String.prototype 属性的属性特性

- writable false
- enumerable false
- configurable false

#### String.length

### 2. 实例属性

#### String.prototype.constructor

用于创造对象的原型对象的特定的函数。

#### String.prototype.length

返回了字符串的长度。

#### N

用于访问第N个位置的字符，其中N是小于 length 和 0之间的正整数。这些属性都是“只读”性质，不能编辑。

## 二、方法

### 1. 静态方法

#### String.fromCharCode(num1[, ...[, numN]])

返回由指定的UTF-16代码单元序列创建的字符串。  
一系列UTF-16代码单元的数字。 范围介于0到65535（0xFFFF）之间。 大于0xFFFF的数字将被截断。 不进行有效性检查。

```js
String.fromCharCode(0x4e00, 0x9fa5) // '一龥' 中文范围
String.fromCharCode(19968, 40869) // '一龥' 中文范围
String.fromCharCode(65, 66, 67);  // returns "ABC"
String.fromCharCode(0x2014)       // returns "—"
String.fromCharCode(0x12014)      // also returns "—"; the digit 1 is truncated and ignored
```

#### String.fromCodePoint(num1[, ...[, numN]])

返回使用指定的代码点序列创建的字符串。

- `String.fromCharCode()` 最大支持16位(65535/0xffff)的数字，而且ES中很早就开始支持，兼容性好。
- `String.fromCodePoint()` 可以多达21位(2097151/0x1fffff)数字，是ES6新加入的方法，是为了能够处理所有合法的Unicode( in order to deal with ALL legal Unicode values )，因为String.fromCharCode()并不够用。

```js
console.log(String.fromCodePoint(0x1D306, 0x61, 0x1D307)); //𝌆a𝌇
console.log(String.fromCharCode(0x1D306, 0x61, 0x1D307)); //팆a팇
```

可以看到两者能处理的最大位数是不一样的，String.fromCharCode()并不能正确处理，出现乱码。
> `fromCodePoint()` 兼容 `fromCharCode()`，只要是在es6环境就可直接用 `fromCodePoint`

#### String.raw(callSite, ...substitutions) / String.raw \`templateString\`

用来获取一个模板字符串的原始字符串的，比如说，占位符（例如 ${foo}）会被处理为它所代表的其他字符串，而转义字符（例如 \n）不会。

```js
// 想要 \n 作为正常字符输出，而不是转译字符
`Hi\n${2+3}!` // 'Hi↵5!'，不可以
`Hi\\n${2+3}!` // 'Hi\n5!' ,可以
String.raw `Hi\n${2+3}!` // 'Hi\n5!' ,可以
String.raw({
  raw: ['Hi', '5!']
}, '\\n', '?') // "Hi\n5!" 相当于交替拼接 raw 中的元素和对象后的参数，以数组元素结尾，对象后多的参数(此处为 '?')舍弃
```

### 2. 实例方法

```js
String.prototype.charAt(i) // 返回字符串中 下标i 对应的字符， 默认为 0,
'hello'.charAt(1) // 'e', 'hello'[1] 也可输出 'e'
'hello'.charAt(5) // '', 'hello'[5] 则返回 undefined

// 在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下(0~65535)，正常返回。
// 在 Unicode 编码单元无法只用一个单一的 UTF-16 编码单元表示的情况下(>65535)，此时为2个单元组成的代理对，只能返回代理对中的第一个单元。
String.prototype.charCodeAt(i) // 返回字符串中 下标i 对应字符的Unicode，0~65535，i > length 返回 NaN

// Surrogate Pair 是 UTF-16 中用于扩展字符而使用的编码方式，是一种采用四个字节(两个 UTF-16 编码)来表示一个字符，称作代理对。
// 如果在索引处开始没有 UTF-16 代理对，将直接返回在那个索引处的编码单元。
String.prototype.codePointAt(i) // 返回 一个 Unicode 编码点值的非负整数。i > length 返回 NaN
'\uD800\uDC00'.codePointAt(0) // 65536，正常返回代理对所代表的 Unicode
'\uD800\uDC00'.charCodeAt(0) // 55296， 第 1 个编码单元 \uD800 -> 55296, 第 2 个编码单元 \uDC00 -> 55296

String.prototype.concat(string2, string3[, ..., stringN]) // 字符串拼接，通常用 + += 代替
String.prototype.endsWith(str[, length]) // 是否是以子字符串(str)“结尾”,大小写敏感, length默认为原字符串长度
String.prototype.includes(str[, i])) // 是否包含 str 字符串，从下标 i 开始搜索，i 默认为 0, 大小写敏感
String.prototype.indexOf(str[, i]) // 从下标 i 开始查找第一次出现 str 的下标，找不到返回 -1
String.prototype.lastIndexOf(str[, i]) // 从下标 i 往 下标 0 查找第一次出现 str 的下标，找不到返回 -1
String.prototype.localeCompare()
String.prototype.match()
String.prototype.matchAll()
String.prototype.normalize()
String.prototype.padEnd()
String.prototype.padStart()
String.prototype.repeat()
String.prototype.replace()
String.prototype.search()
String.prototype.slice()
String.prototype.split()
String.prototype.startsWith()
String.prototype.substring()
String.prototype.toLocaleLowerCase()
String.prototype.toLocaleUpperCase()
String.prototype.toLowerCase()
String.prototype.toString()
String.prototype.toUpperCase()
String.prototype.trim()
String.prototype.trimRight()
String.prototype.trimLeft()
String.prototype.valueOf()
String.prototype[@@iterator]()

String.prototype.anchor() // 废弃
String.prototype.big() // 废弃
String.prototype.blink() // 废弃
String.prototype.bold() // 废弃
String.prototype.fixed() // 废弃
String.prototype.fontcolor() // 废弃
String.prototype.fontsize() // 废弃
String.prototype.italics() // 废弃
String.prototype.link() // 废弃
String.prototype.quote() // 废弃
String.prototype.small() // 废弃
String.prototype.strike() // 废弃
String.prototype.sub() // 废弃
String.prototype.substr() // 废弃
String.prototype.sup() // 废弃
String.prototype.toSource() // 非标准
```
