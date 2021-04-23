# JS 中的 Event Loop （事件循环）

## 微任务与宏任务

JS 执行时，遇到异步任务则放入微任务或宏任务异步队列中，将同步代码执行完毕之后再去执行异步队列中的代码。先执行微任务队列，微任务队列执行完毕后再执行宏任务队列。

微任务队列和宏任务队列均遵循：先入先执行的原则

### 微任务

- Promise.prototype.then()
- process.nextTick()

## 宏任务

- setTimeout()
- setInterVal()

## async / await

async 函数本身并不是异步任务，而是根据函数中执行的代码来确定放入宏任务或微任务中。

```js
const fn = async () => {
  console.log(1)
}
fn()
console.log(2)

// 1 2
```

```js
const fn = async () => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  }, 0);
}
fn()
console.log(3)

// 1 3 2

```

await 执行时，await 的函数会立即执行，此函数执行完毕后，再将 await 之后的代码放入微任务队列中。

```js
const fun = async () => {
  console.log(1)
}

const fn = async () => {
  console.log(2)
  await fun()
  console.log(3)
}
fn()
console.log(4)

// 2 1 4 3

```

```js
const fn = async () => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  }, 0);
}
fn()
console.log(3)

// 1 3 2

```

```js
const fun = async () => {
  console.log(1)
  setTimeout(() => {
    console.log('setTimeout')
  }, 0);
  new Promise(resolve => {
    console.log(2)
    resolve()
  }).then(() => {
    console.log(3)
  })
}

const fn = async () => {
  console.log(4)
  await fun()
  console.log(5)
}
fn()
console.log(6)

// 4 1 2 6 3 5 'setTimeout'

```

## 例一

```js
setTimeout(() => {
  console.log(1)
}, 0);

new Promise((resolve) => {
  console.log(2)
  resolve()
}).then(() => {
  console.log(3)
})

setTimeout(() => {
  console.log(4)
}, 0);

console.log(5)

/*

2
5
3
1
4

*/
```

## 例二

```js
setTimeout(() => {
  console.log(1)
  new Promise((resolve) => {
    console.log(2)
    resolve()
  }).then(() => {
    console.log(3)
  })
}, 0);

new Promise((resolve) => {
  console.log(4)
  resolve()
}).then(() => {
  console.log(5)
})

setTimeout(() => {
  console.log(6)
  new Promise((resolve) => {
    console.log(7)
    resolve()
  }).then(() => {
    console.log(8)
  })
}, 0);

console.log(9)

/*
// node 运行结果
4
9
5
1
2
6
7
3
8

*/

/*
// Chrome 运行结果
4
9
5
1
2
3
6
7
8

*/

```

以上结果在浏览器和Node中不相同，证明两者对嵌套的异步队列执行顺序不一样。

在Node中，将微任务执行完后，然后执行宏任务，即使在宏任务中又有微任务插入微任务异步队列，但也会将本次的所有宏任务执行完毕之后，再去执行微任务。

在浏览器中，将微任务执行完后，然后执行宏任务，但每一个宏任务完后，不会先执行下一个宏任务，而是再次去查看有没有微任务需要执行，有的话则将微任务队列执行完毕，再回到宏任务队列执行下一个宏任务。

## 例三

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});

console.log('script end');

/*
script start
async1 start
async2
promise1
script end
promise2
async1 end
setTimeout

*/

```
