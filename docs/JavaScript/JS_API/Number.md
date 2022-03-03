# Number

[toc]

## 一、属性

### 1. 静态属性

```js
Number.MAX_VALUE // JS 能表示的最大数值，接近于 1.79E+308，大于 MAX_VALUE 的值代表 "Infinity"
Number.MIN_VALUE // 能表示的最小的接近 0 ，约为 5e-324，小于的会转为 0
Number.MAX_SAFE_INTEGER // JS 中最大的安全整数 (2的53次方 - 1)
Number.MIN_SAFE_INTEGER // JS 中最小的安全的integer型数字 (-(2的53次方 - 1))
Number.POSITIVE_INFINITY // 正无穷大
Number.NEGATIVE_INFINITY // 负无穷大
Number.NaN // 表示“非数字”
Number.EPSILON // 表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。
Number.prototype // 表示 Number 构造函数的原型
```

### 2. 实例属性

```bash
无
```

## 二、方法

### 1. 静态方法

```js
Number.isFinite(num) // 是否是有穷数，只有 Number 类型才可能为true ，而全局的 isFinite() 会先尝试转为 Number 类型
Number.isInteger() // 是否为整数，注意 NaN 和正负 Infinity 不是整数。

// 只有参数为 真正的 Number 类型，且真的为 NaN 时才返回 true ，否则都为false
Number.isNaN() // 不会强制将参数转为 Number类型，而全局的 isNaN 会先转换。

Number.isSafeInteger() // 否是一个“安全整数”
Number.parseFloat() // 与全局的 parseFloat() 函数相同
Number.parseInt() // 与全局的 parseInt() 函数相同
```

### 2. 实例方法

```js
Number.prototype.toExponential(int) // 以指数表示法返回该数值字符串表示形式，num 表示指数前保留几位小数

// digits默认为0，范围 0 ~ 20
// 非Number类型的对象上调用报错(TypeError)，超出 0 ~ 20 报错(RangeError)
Number.prototype.toFixed(int) // 保留几位小数，返回字符串。

Number.prototype.toLocaleString() // 数值在在当前语言环境下的字符串表示方法

Number.prototype.toPrecision(int) // 1 ~ 100，小数前后总共保留多少位数

Number.prototype.toSource() // JavaScript 内部调用，代码中勿显示调用

Number.prototype.toString(int) // 传入整数表示进制，2 ~ 36, 默认 10 进制
Number.prototype.valueOf() // 内部调用，勿显示调用


Number.toInteger() // 废弃
```

## toFixed 问题
