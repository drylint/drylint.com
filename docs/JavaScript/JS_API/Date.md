[toc]

# Date

## 静态方法

```js
Date.UTC(yyyy, MM, dd, HH, mm, ss, ms) // 返回 UTC 时区的 时间戳
Date.now() // 返回 UTC 时区的当前时间的时间戳
Date.parse() //  将一个字符串格式的时间解析为时间戳
```

## 实例方法

### 实例方法之 getters

#### 获取 年/月/日/时/分/秒/毫秒/星期/时间戳

```js
Date.prototype.getFullYear() // 四位数的年份整数值
Date.prototype.getMonth() // 0 ~ 11 的整数值  
Date.prototype.getDate() // 1--31 的整数值
Date.prototype.getHours() // 0 ~ 23 的整数值
Date.prototype.getMinutes() // 0 ~ 59 的整数值
Date.prototype.getSeconds() // 0 ~ 59 的整数值
Date.prototype.getMilliseconds() // 0 ~ 999 的整数值
Date.prototype.getDay() // 0 ~ 6 的整数值
Date.prototype.getTime() // 距 1970-01-01 00:00:00 (UTC)的毫秒数, 同 valueOf() 一样
```

#### 以 UTC 为标准，获取 年/月/日/时/分/秒/毫秒/星期

```js
Date.prototype.getUTCFullYear()
Date.prototype.getUTCMonth()  
Date.prototype.getUTCDate()
Date.prototype.getUTCHours()  
Date.prototype.getUTCMinutes()  
Date.prototype.getUTCSeconds()  
Date.prototype.getUTCMilliseconds()  
Date.prototype.getUTCDay()  

```

#### 其他

```js
Date.prototype.getTimezoneOffset() //

Date.prototype.getYear() // 弃用  
```

### 实例方法之 setters

#### 设置 年/月/日/时/分/秒/毫秒

```js
// 以下方法都会日期实例对象变更，并返回时间戳
// 以下方法都至少指定第一项参数，不指定的都会以相应的 getter 来返回 (即保持不变)
// 如果一个参数超出合理范围，则会自动把多出来的加到前一项
Date.prototype.setFullYear(yyyy, MM, dd)  // 至少指定 yyyy
Date.prototype.setMonth(MM, dd)  // 至少指定 MM
Date.prototype.setDate(dd) //
Date.prototype.setHours(HH, mm, ss, ms) // 至少指定 HH
Date.prototype.setMinutes(mm, ss, ms) // 至少指定 mm
Date.prototype.setSeconds(ss, ms) // 至少指定 ss
Date.prototype.setMilliseconds(ms) //
Date.prototype.setTime(timestamp) // 指定时间戳
```

#### 以 UTC 为标准，设置 年/月/日/时/分/秒/毫秒/

```js
Date.prototype.setUTCFullYear()  
Date.prototype.setUTCMonth()  
Date.prototype.setUTCDate()  
Date.prototype.setUTCHours()  
Date.prototype.setUTCMinutes()  
Date.prototype.setUTCSeconds()  
Date.prototype.setUTCMilliseconds()  

Date.prototype.setYear() // 弃用
```

### 其他

```js
Date.prototype.valueOf() // 同 dateObj.getTime() 一样，通常在 JavaScript 内部被调用，而不是在代码中显式调用

// 实例日期对象被 用来作为文本值或用来进行字符串连接时，toString 方法会被自动调用。
Date.prototype.toString() // 返回美式英语 完整日期 格式的字符串
Date.prototype.toDateString()  // 返回美式英语 年/月/日/星期 的字符串
Date.prototype.toTimeString()  // 返回美式英语 时分秒 的字符串
Date.prototype.toUTCString() // 返回使用UTC时区表示的字符串

Date.prototype.toLocaleString() // 返回本地 完整日期 字符串
Date.prototype.toLocaleDateString() // '2019/4/22', 返回本地 年/月/日 字符串
Date.prototype.toLocaleTimeString() // '下午1:45:42', 返回本地 时/分/秒 字符串

Date.prototype.toISOString() // '2019-04-22T05:49:00.788Z'
Date.prototype.toJSON() // '2019-04-22T05:49:00.788Z'
Date.prototype.toSource() // 通常由JavaScript内部调用，而不是在代码中显式调用，非标准，通常不使用。
Date.prototype[@@toPrimitive]  

Date.prototype.toLocaleFormat() // 弃用  
Date.prototype.toGMTString() // 弃用  

```
