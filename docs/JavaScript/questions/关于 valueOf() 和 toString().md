# 学习valueOf和toString，理解隐式转化规则

js在比较运算过程中经常会发生隐式转换，常常会给人意料外的结果，而隐式转换在面试过程中又经常会被考到，所以打算好好整理一下隐式转换这个知识点，本文算是个人对隐式转换的学习梳理。

## 1.toString和valueOf

toString：toString()函数的作用是返回object的字符串表示

- Array 返回数组元素的字符串，默认以逗号链接。
- Boolean 布尔值的字符串值
- Date 日期UTC标准格式
- Function 函数的字符串值
- Number 数字值的字符串值
- Object [Object Object]
- String 字符串值
- Reg 正则的字符串值

如下代码演示（以下演示情况是toString方法没有被重写）

```js
let num = 1
let str = 'a'
let bool = true
let obj = {}
let date = new Date()
let reg = /\d/
let arr = [1, 2, 3]
let fun = function () {
}

console.log(num.toString())   // '1'
console.log(str.toString())   // 'a'
console.log(bool.toString())  // 'true'
console.log(obj.toString())   // '[object Object]'
console.log(date.toString())  // 'Thu Mar 28 2019 17:07:40 GMT+0800 (中国标准时间)'
console.log(reg.toString())   // '/\d/'
console.log(arr.toString())   // '1,2,3'
console.log(fun.toString())   // 'function(){}'
```

valueOf：valueOf()函数将对象转换为原始值

- Array 返回数组对象本身
- Boolean 布尔值
- Date 返回时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC
- Function 函数本身
- Number 数字值
- Object 对象本身，这是默认情况。
- String 字符串值
- Reg 正则本身

如下代码演示（以下演示情况是valueOf方法没有被重写）

```js
console.log(num.valueOf())   // 1
console.log(str.valueOf())   // 'a'
console.log(bool.valueOf())  // true
console.log(obj.valueOf())   // {}
console.log(date.valueOf())  // 1553766610534
console.log(reg.valueOf())   // /\d/
console.log(arr.valueOf())   // [1, 2, 3]
console.log(fun.valueOf())   // fun()
```

以上铺垫了这么多，是因为在隐式转换过程中经常会有用到调用对象的toString和valueOf方法

## 2. 隐式转换规则

以下为隐式转换时的规则：

- 转化成字符串：使用字符串连接符 +
- 转化成数字： 2.1 ++/-- （自加/自减） 2.2 + - * / % （算术运算）2.3 > < >= <= == != === !== （关系运算符）
- 转成布尔值：使用！非运算符

### 2.1 字符串连接符和算法运算符混淆

先看看以下代码：

```js
let a = 1
console.log(a + '1')          // '11'
console.log(a + null)         // 1
console.log(a + undefined)    // NaN (Number(undefined) = NaN)
console.log(a + true)         // 2
console.log(a + {})           // '1[object Object]'
console.log(a + [1, 2, 3])    // '11,2,3'
console.log(a + new Date())   // '1Fri Mar 29 2019 10:12:41 GMT+0800 (中国标准时间)'
console.log(a + /\d/)         // '1/\d/'
console.log(a + function(){}) // '1function(){}'
```

从打印的结果可以知道

- 当 + 号为字符串连接符时，则调用对象的toString方法转化为字符串然后相加
- 当 + 号为算术运算符时，则调用Number()方法转化然后相加
- 在这里我们需要注意的是null、布尔值和undefined这三类对象使用 + 进行操作，当有一边确定为数字的时候，这三类值会尝试用Number()进行转化，如果有一边类型确定为字符串的时候，直接就是进行字符串相加。

```js
let a = '1'
console.log(a + null)         // '1null'
console.log(a + undefined)    // '1undefined'
console.log(a + true)         // '1true'
```

2.2 关系运算符会把其他数据类型转换成number之后再比较关系

先看看以下代码：

```js
console.log('2' > 10)    // false
console.log('2' > '10')  // true
console.log('a' > 'b')   // false
console.log('ab' > 'aa') // true
```

从打印的结果可以知道

- 当关系比较有一边为数字的时候，会把其他数据类型调用Number()转化为数字后进行运算
- 当关系比较两边都为字符串的时候，会同时把字符串转化为数字进行比较，但是不是用Number()进行转化，而是按照字符串的unicode编码进行转化(string.charCodeAt,默认为字符的第一位)

```js
console.log('a' > 'b')   // false
// 'a'.charCodeAt() > 'b'.charCodeAt()
console.log('ab' > 'aa') // true
// 第一位都是a相等，所以比较第二位的 b.charCodeAt() > a.charCodeAt()
```

### 2.3 复杂数据类型在隐式转换时会先转成String，然后再转成Number运算

复杂类型数据指的是对象或数组这类数据进行隐式转换时，会先调用valueOf后调用toString方法转化成数据，再调用Number()转化成数字进行运算。

如果这个对象的valueOf方法和toString方法被重写过，则会根据valueOf返回的数据类型判断是否执行toString。

接下来代码示范：

```js
let a = {
    valueOf: function () {
        console.log('执行valueOf')
        return 'a'
    },
    toString: function () {
        console.log('执行toString')
        return 'a'
    }
}
console.log(a == 'a')
// 执行valueOf
// true
```

接下来尝试把valueOf返回值改成数字：

```js
let a = {
    valueOf: function () {
        console.log('执行valueOf')
        return 1
    },
    toString: function () {
        console.log('执行toString')
        return 'a'
    }
}
console.log(a == 'a')
// 执行valueOf
// false
```

尝试把valueOf返回值改成对象

```js
let a = {
    valueOf: function () {
        console.log('执行valueOf')
        return {}
    },
    toString: function () {
        console.log('执行toString')
        return 'a'
    }
}
console.log(a == 'a')
// 执行valueOf
// 执行toString
// true
```

通过上面的例子我们可以得出结论：

- valueOf返回的数据类型决定是否调用toString，如果返回的类型是数字或者字符串(其实用基础数据类型更准确点)，toString方法就不执行了。
- 转化成字符串后再调用Number()转化成数字进行比较
这里还有个问题就是如果toString方法返回不是基础类型，进行比较的时候则会报错。

### 2.4 逻辑非隐式转换与关系运算符隐式转换混淆

当使用!逻辑非运算符进行转化的时候，会尝试把数据转化成布尔值

以下情况使用Boolean()转化将会得到false

0、-0、undefined、null、NaN、false、''(空字符串)、document.all

```js
console.log([] == 0)    // true
console.log(![] == 0)   // true
// [] == 0 --> [].valueOf().toString()得到空字符串，Number('') == 0 成立
// ![] == 0 --> Boolean([])得到true再取反，最后转化成数字0，Number(!true) == 0 成立

console.log([] == ![])  // true
console.log([] == [])   // false
// [] == ![] --> [].valueOf().toString()得到空字符串，Number('')取得0，Boolean([])得到true再取反，转化成数字0，最后Number('') == Number(!true) 成立
// [] == [] --> 两个数组比较是因为两个数据的引用指向不一致，所以 [] == [] 不成立

console.log({} == !{})  // false
console.log({} == {})   // false
// {} == !{} --> {}.valueOf().toString()得到'[object Object]'，Boolean({})得到true再取反，所以 '[object Object]' == false 不成立
// {} == {} --> 两个对象比较是因为两个数据的引用指向不一致，所以 {} == {} 不成立
```

最后总结一下，在复杂数据类型隐式转化过程中会调用valueOf和toString方法，所以如果这两个方法被改写了往往会得到一些意料外的结果。
