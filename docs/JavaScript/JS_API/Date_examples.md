
#### new Date() 差异

```js
// 0 时区

console.log(new Date('2019-04-18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0000 (格林尼治标准时间)
console.log(new Date('2019/04/18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0000 (格林尼治标准时间)

console.log(new Date('2019-04-18')) // Thu Apr 18 2019 00:00:00 GMT+0000 (格林尼治标准时间)
console.log(new Date('2019/04/18')) // Thu Apr 18 2019 00:00:00 GMT+0000 (格林尼治标准时间)


console.log(new Date('2019-04-18 00:00:00').getTime()) // 1555545600000
console.log(new Date('2019/04/18 00:00:00').getTime()) // 1555545600000

console.log(new Date('2019-04-18').getTime()) // 1555545600000
console.log(new Date('2019/04/18').getTime()) // 1555545600000

```

```js
// 中国 8 时区

console.log(new Date('2019-04-18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019/04/18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)

console.log(new Date('2019-04-18')) // Thu Apr 18 2019 08:00:00 GMT+0800 (中国标准时间) // 不一致
console.log(new Date('2019/04/18')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)


console.log(new Date('2019-04-18 00:00:00').getTime()) // 1555516800000
console.log(new Date('2019/04/18 00:00:00').getTime()) // 1555516800000

console.log(new Date('2019-04-18').getTime()) // 1555545600000 // 不一致
console.log(new Date('2019/04/18').getTime()) // 1555516800000

```

#### 传入数值类型，使用逗号( , )分隔，月份值为 0 ~ 11

```js
// 默认获取当前系统时区的时间
console.log(new Date()) // Thu Apr 18 2019 13:25:05 GMT+0800 (中国标准时间)

// 传入一个数值默认为毫秒数
console.log(new Date(2019)) // Thu Jan 01 1970 08:00:02 GMT+0800 (中国标准时间)

// 传入两个数值以上，默认依次读取为 yyyy-mm-dd hh:mm:ss，之后默认补充为可能值第一个值
console.log(new Date(2019,04)) // Wed May 01 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date(2019,04,18)) // Sat May 18 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date(2019,04,18,10)) // Sat May 18 2019 10:00:00 GMT+0800 (中国标准时间)
console.log(new Date(2019,04,18,10,30)) // Sat May 18 2019 10:30:00 GMT+0800 (中国标准时间)
console.log(new Date(2019,04,18,10,30,25)) // Sat May 18 2019 10:30:25 GMT+0800 (中国标准时间)
console.log(new Date(2019,04,18,00,00,00)) // Sat May 18 2019 00:00:00 GMT+0800 (中国标准时间)

```

#### 传入字符串类型，使用横线( - ) 分隔，月份值为 1 ~ 12

```js
console.log(new Date('2019')) // Tue Jan 01 2019 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019-04')) // Mon Apr 01 2019 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019-04-18')) // Thu Apr 18 2019 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019-04-18 10')) // Invalid Date
console.log(new Date('2019-04-18 10:30')) // Thu Apr 18 2019 10:30:00 GMT+0800 (中国标准时间)
console.log(new Date('2019-04-18 10:30:25')) // Thu Apr 18 2019 10:30:25 GMT+0800 (中国标准时间)
console.log(new Date('2019-04-18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)

```

#### 传入字符串类型，使用斜线( / ) 分隔，月份值为 1 ~ 12

```js
console.log(new Date('2019')) // Tue Jan 01 2019 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019/04')) // Mon Apr 01 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019/04/18')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(new Date('2019/04/18 10')) // Invalid Date
console.log(new Date('2019/04/18 10:30')) // Thu Apr 18 2019 10:30:00 GMT+0800 (中国标准时间)
console.log(new Date('2019/04/18 10:30:25')) // Thu Apr 18 2019 10:30:25 GMT+0800 (中国标准时间)
console.log(new Date('2019/04/18 00:00:00')) // Thu Apr 18 2019 00:00:00 GMT+0800 (中国标准时间)

```

#### 获取当天 00:00:00 和 23:59:59 的 时间对象 和 时间戳

```js
// 获取当天 年/月/日
let dayDate = new Date().toLocaleDateString()

// 当天 00:00:00 的时间对象
let dayStartObj = new Date(new Date().toLocaleDateString())
let dayStartObj2 = new Date(new Date().setHours(0,0,0,0))

// 当天 00:00:00 的时间戳
let dayStartTimestamp = new Date(new Date().toLocaleDateString()).getTime()
let dayStartTimestamp2 = new Date().setHours(0,0,0,0)

// 多经过一次转换的 00:00:00 的时间对象
let dayStartObj2 = new Date(new Date(new Date().toLocaleDateString()).getTime())

console.log(dayDate) // 2019/4/19
console.log(dayStartObj) // Fri Apr 19 2019 00:00:00 GMT+0800 (中国标准时间)
console.log(dayStartTimestamp) // 1555603200000
console.log(dayStartObj2) // Fri Apr 19 2019 00:00:00 GMT+0800 (中国标准时间)


// 获取当天 年/月/日
let todayDate = new Date().toLocaleDateString()

// 当天 23:59:59 的时间戳
let dayEndTimestamp = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
let dayEndTimestamp2 = new Date().setHours(23,59,59,999)

// 当天 23:59:59 的时间对象
let dayEndObj = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
let dayEndObj2 = new Date(new Date().setHours(23,59,59,999))
console.log(todayDate) // 2019/4/19
console.log(dayEndTimestamp) // 1555689599999
console.log(dayEndObj) // Fri Apr 19 2019 23:59:59 GMT+0800 (中国标准时间)



```

#### 字符串转日期类型的处理

```js
const arr = [
  '2020-04-16T09:27:52.848527',
  '2020-04-16T09:27:52',
  '2020-04-16 09:27:52.848527',
  '2020-04-16 09:27:52',
  '2020/04/16T09:27:52.848527',
  '2020/04/16T09:27:52',
  '2020/04/16 09:27:52.848527',
  '2020/04/16 09:27:52', // OK
]

arr.forEach(item => {
  document.body.innerHTML += new Date(item) + '<br />'
})

/*
// PC 和 Android 端

Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
Invalid Date
Invalid Date
Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
Thu Apr 16 2020 09:27:52 GMT+0800 (中国标准时间)
*/

/*
// IOS 端
Thu Apr 16 2020 17:27:52 GMT+0800 (CST)
Thu Apr 16 2020 17:27:52 GMT+0800 (CST)
Invalid Date
Invalid Date
Invalid Date
Invalid Date
Invalid Date
Thu Apr 16 2020 09:27:52 GMT+0800 (CST)
*/
```
