[toc]

## `Object` 类型转原始类型（`String`/`Number`/`Boolean`）

对象转为原始类型只有三种：字符串，数值，布尔值

对象转原始类型会涉及到三个方法

```js
Object.prototype.[Symbol.toPrimitive]() // 最先执行，在此函数中会去按条件执行 valueOf() 和 toString()
Object.prototype.toString() // 通常返回字符串类似于 '[object Object]' '[object Array]' 等
Object.prototype.valueOf() // 通常返回对象自身
```

> `Object.prototype.[Symbol.toPrimitive]()` 规则：
>
> 如果实例 `obj` 是原始类型的包装对象（如 `new Number(1)`），则返回当前值；
>
> 如果 `obj` 转 `String`，则先调用 `obj.toSting()`方法，若该方法返回的原始类型 则直接转字符串返回，否则再调用 `obj.valueOf()`方法并将返回结果转为字符串返回；
>
> 如果 `obj` 转 `Number|Boolean`，则先调用 `obj.valueOf()` 方法， 若该方法返回的原始类型则直接转数值返回，否则再调用 `obj.toString()`方法并返回结果；
>
> 如果都没有 原始类型 返回，则抛出 TypeError 类型错误。

### 1. `Object` => `String`

```js
String(obj)

// 实际上首先会执行
String(obj.toString())
// 如果 obj.toString() 返回原始类型（若未重写通常会返回字符串类似于 '[object Object]'），则会执行 String()
// 如果 obj.toString() 返回的不是原始类型（被重写后可能返回的不是原始类型），继续调用 valueOf() 方法
String(obj.valueOf()) // 将 obj.valueOf() 的返回结果转为字符串返回
```

```js
var obj1 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  }
}
var obj2 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  valueOf () {
    return this.arr[1]
  }
}
var obj3 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  },
  valueOf () {
    return this.arr[1]
  }
}
var obj4 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr
  },
  valueOf () {
    return this.arr[1]
  }
}
var obj5 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr
  },
  valueOf () {
    return this.arr
  }
}
console.log(
  // 执行 toString() 返回原始类型 数值 1，然后直接执行 String()
  String(obj1), // '1'

  // 执行 toString() 返回原始类型字符串'[object Object]'，不会再执行 valueOf()，直接执行外层 String()
  String(obj2), // '[object Object]'

  // 执行 toString() 返回原始类型 数值 1，不会再执行 valueOf()，直接执行外层 String()
  String(obj3), // '1'

  // 执行 toString() 返回非原始类型 数组对象，继续执行 valueOf() 返回 '2'，然后再执行外层 String()
  String(obj4), // '2'

  // 执行 toString() 返回数组对象，继续执行 valueOf() 也返回数组对象，执行外层 String()无法转换，报错
  String(obj5), // 报错 TypeError: Cannot convert object to primitive value
)

```

### 2. `Object` => `Number` | `Boolean`

```js
Number(obj)
// 实际上首先会执行
Number(obj.valueOf())
// 如果 obj.valueOf() 返回原始类型（重写后返回的原始类型，不重写通常返回对象自身），则会执行 Number()
// 如果 obj.valueOf() 返回的不是原始类型，继续调用 toString() 方法
Number(obj.toString())// 将 obj.valueOf() 的返回结果执行 Number() 返回 （数值或 NaN ）
```

```js
var obj1 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  }
}
var obj2 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  valueOf () {
    return this.arr[1]
  }
}
var obj3 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  },
  valueOf () {
    return this.arr[1]
  }
}
var obj4 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  },
  valueOf () {
    return this.arr
  }
}
var obj5 = {
  subObj: { a: 1 },
  arr: [1, 2, 3],
  toString () {
    return this.arr
  },
  valueOf () {
    return this.arr
  }
}

console.log(
  // 执行 valueOf() 返回对象自身，继续执行 toString() 返回 '1'，然后再执行外层 Number()
  Number(obj1), // '1'

  // 执行 valueOf() 返回数值 2，不会再执行 toString()，直接执行外层 Number()
  Number(obj2), // '2'

  // 执行 valueOf() 返回数值 2，不会再执行 toString()，直接执行外层 Number()
  Number(obj3), // '1'

  // 执行 valueOf() 返回一个数组对象，继续执行 toString() 返回 '1'，然后再执行外层 Number()
  Number(obj4), // '1'

  // 执行 valueOf() 返回数组对象，继续执行 toString() 也返回数组对象，执行外层 Number()无法转换，报错
  Number(obj5), // 报错 TypeError: Cannot convert object to primitive value
)

```

### 3. ES6 中 `[Symbol.toPrimitive]()` 方法调用优先级比 `toString()` `valueOf()` 更高

当执行将对象转换为原始类型的操作时(`String()`/`Number()`/`Boolean()`/`比较运算符`等操作)，程序会优先调用 `[Symbol.toPrimitive]()` 方法，然后再根据要转换的类型，决定`toString()`/`valueOf()`的调用顺序。

所以，除了重写 `toString()`、`valueOf()` 方法外，还可以直接重写 `[Symbol.toPrimitive]()`方法

```js
var obj = {
  arr: [1, 2, 3],
  [Symbol.toPrimitive] () {
    return this.arr
  }
}
var obj2 = {
  arr: [1, 2, 3],
  [Symbol.toPrimitive] () {
    return this.arr[0]
  }
}
var obj3 = {
  arr: [1, 2, 3],
  toString () {
    return this.arr[0]
  },
  [Symbol.toPrimitive] () {
    return this.toString()
  }
}
var obj4 = {
  arr: [1, 2, 3],
  valueOf () {
    return this.arr[1]
  },
  [Symbol.toPrimitive] () {
    return this.valueOf()
  }
}
var obj5 = {
  arr: [1, 2, 3],
  valueOf () {
    return this.arr[1]
  },
  toString () {
    return this.arr
  },
  [Symbol.toPrimitive] () {
    let toString = this.toString()
    return toString !== null && !(typeof toString).includes('object') ? toString : this.valueOf()
  }
}
var obj6 = {
  arr: [1, 2, 3],
  valueOf () {
    return this.arr
  },
  toString () {
    return this.arr[0]
  },
  [Symbol.toPrimitive] () {
    let valueOf = this.valueOf()
    return valueOf !== null && !(typeof valueOf).includes('object') ? valueOf : this.toString()
  }
}

console.log(
  // Number(obj) // 报错 TypeError: Cannot convert object to primitive value
  Number(obj2), // 1
  Number(obj3), // 1
  Number(obj4), // 2
  Number(obj5), // 2
  Number(obj6), // 1
)

```

### 4. Object 在比较运算符中的隐式转换

```js
var obj = {
  toString () {
    return 1
  },
  valueOf () {
    return 2
  }
}

console.log(obj == 1); // false
console.log(obj == 2); // true
console.log(obj == '1'); // false
console.log(obj == '2'); // true

console.log(obj === 1); // false
console.log(obj === 2); // false
console.log(obj === '1'); // false
console.log(obj === '2'); // false
```

由此可见，`Object` 在比较运算符中的隐式转换先调用 `valueOf()` ，再调用 `toString()`。

### 5. 数组对象的 `toString()` `join()` 转换方法

```js
// 重写 toString() 方法，只影响 toString() 方法
var arr = [1, 2, 3]
arr.toString = function () {
  return '1'
}
console.log(arr.toString()) // 1
console.log(arr.join()) // 123

// 重写 join() 方法， join() 和 toString() 都被影响
var arr2 = [1, 2, 3]
arr2.join = function () {
  return '2'
}
console.log(arr2.toString()) // 2
console.log(arr2.join()) // 2

// 重写 join() 和 toString()，各自影响自己，互不干扰
var arr3 = [1, 2, 3]
arr3.join = function () {
  return '2'
}
arr3.toString = function () {
  return '1'
}
console.log(arr3.toString()) // 1
console.log(arr3.join()) // 2

// 利用重写 toString() 实现 a == 1 && a == 2 && a == 3
var arr4 = [1, 2, 3]
console.log(arr4.toString()) // 1, 2, 3
arr4.toString = arr4.shift
console.log(
  arr4 == 1, // true
  arr4 == 2, // true
  arr4 == 3, // true
)

// 利用重写 join() 实现 a == 1 && a == 2 && a == 3
var arr5 = [1, 2, 3];
console.log(arr5.join()) // 1, 2, 3
arr5.join = arr5.shift
console.log(
  arr5 == 1, // true
  arr5 == 2, // true
  arr5 == 3, // true
)

```

### 利用上述重写可实现 a == 1 && a == 2 && a == 3

```js
// 重写劫持 Object.prototype.valueOf() 方法
var a = {
  arr: [1, 2, 3],
  valueOf () {
    return this.arr.shift()
  }
}

console.log(
  a == 1, // true
  a == 2, // true
  a == 3 // true
)

// 重写劫持 Object.prototype.toString() 方法
var b = {
  arr: [1, 2, 3],
  toString () {
    return this.arr.shift()
  }
}
console.log(
  b == 1, // true
  b == 2, // true
  b == 3 // true
)

// ES6 中，可以重写劫持 [Symbol.toPrimitive]() 方法
var c = {
  arr: [1, 2, 3],
  [Symbol.toPrimitive] () {
    return this.arr.shift()
  }
}
console.log(
  c == 1, // true
  c == 2, // true
  c == 3 // true
)

// 利用重写 Array.prototype.join() 实现
var arr5 = [1, 2, 3];
arr5.join = arr5.shift
console.log(
  arr5 == 1, // true
  arr5 == 2, // true
  arr5 == 3, // true
)
```
