## Promise 对象

- Promise 的含义
- 基本用法
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()
- Promise.resolve()
- Promise.reject()
- 应用
- Promise.try()

### 1. Promise 的含义

`Promise`将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

`Promise`也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 2. 基本用法

ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

```js
new Promise(function(resolve, reject){

}).then((data) => {

}[, (err) => {

}])
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`函数和`reject`函数。由 `JavaScript` 引擎自动传入。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去

`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。

`Promise` 新建（`new`）后就会立即执行。

```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// 输出顺序
// Promise
// Hi!
// resolved
```

下面是一个用`Promise`对象实现的 `Ajax` 操作的例子。

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("https://...").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

`resolve`函数的参数除了正常的值以外，还可能是另一个 `Promise` 实例

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('err')), 3000) // 3000ms 之后 抛出错误
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000) // 1000ms 之后抛出 p1
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: err

// 另一种写法：
p2.then((result) => {console.log(data)}, (err) => {console.log(err)})
```

`p2`在1000ms之后`resolve`了另一个 `Promise`，然后导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对`p1`的。又过了 2000ms，`p1`变为`rejected`，才会触发`catch`方法指定的回调函数。

注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

因为立即 `resolved` 的 `Promise` 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。所以会先打印2再打印1

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

```js
new Promise((resolve, reject) => {
  return resolve(1); // 相当于 return undefined
  // 后面的语句不会执行
  console.log(2);
})

```

### 3. Promise.prototype.then(resolvedFn, rejectedFn?)

`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。第一个回调函数完成以后，会将`return`返回结果作为参数，传入第二个回调函数，不写 `return` 默认为 `undefined`。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  return r + 9
}).then(r => {
  console.log(r)
}).then(r => {
  console.log(r)
})

// 2
// 10
// undefined

```

前一个回调函数，如果返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该 `Promise` 对象的状态发生变化，才会被调用 `resolvedFn`或是`rejectedFn`。

### 4. Promise.prototype.catch()

`Promise.prototype.catch(() => {})`方法是`.then(null, rejectedFn)`或`.then(undefined, rejectedFn)`的别名，用于指定发生错误时的回调函数。

```js

// catch 写法
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  throw new Error('return err')
}).catch(err => {
  console.log(err)
})

// .then() 写法
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  throw new Error('return err')
}).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})

//2
// return err

```

`reject`方法的作用，等同于抛出错误。

如果 `Promise` 状态已经变成`resolved`，再抛出错误是无效的。

```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 `catch` 语句捕获。

一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用 `catch`方法。

```js
getJSON('https://...').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

```

之前任何一个`.then()`抛出的错误，都会被最后一个`catch`捕获。

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

一般总是建议，`Promise` 对象后面要跟`catch`方法，这样可以处理 `Promise` 内部发生的错误。`catch`方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用`then`方法。

```js
Promise.resolve()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// carry on
```

有报错就先执行 `catch` 再执行 `then`，没报错就跳过 `catch` 直接执行 `then`。
上面的代码因为没有报错，跳过了`catch`方法，直接执行后面的`then`方法。此时，要是`then`方法里面报错，就与前面的`catch`无关了。

`catch`方法之中，还能再抛出错误，再被之后的 `catch` 捕获

### 5. Promise.prototype.finally()

`finally`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`resolved`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally`本质上是`then`方法的特例。

```
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。

`finally`方法的实现：

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

```

从上面的实现还可以看到，finally方法总是会返回原来的值。

```js
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})

```

### 6. Promise.all()

`Promise.all`方法用于将多个 `Promise`实例，包装成一个新的 `Promise`实例。

```js
const p = Promise.all([p1, p2, p3]);
```

上面代码中，`Promise.all`方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

实例：

```js
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});

```

上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

注意，如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。而是都执行 `then`方法。

### 7. Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

```js
const p = Promise.race(
    [
      fetch('/resource-that-may-take-a-while'), // 5000ms之内完成会执行 resolve()
      new Promise(function (resolve, reject) { // fetch 5000ms 之内没执行则执行 reject()
        setTimeout(() => reject(new Error('request timeout')), 5000)
      })
    ]
);

p
.then(console.log)
.catch(console.error);
```

上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

### 8. Promise.resolve()

将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```

上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。

```js
// Promise.resolve() 等价于下面的写法。

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve` 方法的参数分成四种情况。

#### （1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

#### （2）参数是一个thenable对象

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的`then`方法。

```js

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});

```

上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 `42`。

#### （3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

```js
const p = Promise.resolve('Hello');
p.then(function (s){
  console.log(s) // Hello
});
```

上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 `then` 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

#### （4）不带有任何参数

`Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量`p`就是一个 Promise 对象。

需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

```js
setTimeout(function () {
  console.log('three');
}, 0); // 下一轮“事件循环”开始时执行

Promise.resolve().then(function () {
  console.log('two'); // 本轮“事件循环”结束时执行
});

console.log('one'); // 立即执行

// one
// two
// three
```

上面代码中，`setTimeout(fn, 0)` 在下一轮“事件循环”开始时执行， `Promise.resolve()` 在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

### 9. Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s) // 出错了
});
```

上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。

注意，`Promise.reject()`方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => { // 原封不动地将 参数 thenable 对象传入 catch 的回调函数
  console.log(e === thenable)
})
// true
```

上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。

### 10. 应用

#### (1) 加载图片

我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。

```js
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

#### (2) Generator 函数与 Promise 的结合

使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

```js
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```

上面代码的 Generator 函数`g`之中，有一个异步操作`getFoo`，它返回的就是一个Promise对象。函数`run`用来处理这个Promise对象，并调用下一个`next`方法。

### 11. Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数`f`是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用`then`方法指定下一步流程，用`catch`方法处理`f`抛出的错误。一般就会采用下面的写法。

```js
Promise.resolve().then(f)
```

上面的写法有一个缺点，就是如果`f`是同步函数，那么它会在本轮事件循环的末尾执行。

const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。

那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。

- 第一种写法是用async函数来写。

    ```js
    const f = () => console.log('now');
    (async () => f())(); // 立即执行的匿名函数，会立即执行里面的 async 函数
    console.log('next');
    // 如果f是同步的，就会得到同步的结果
    // now
    // next

    // 如果f是异步的，就可以用then指定下一步
    (async () => f())().then(...)
    ```

    需要注意的是，`async () => f()` 会吃掉 `f()` 抛出的错误。所以，如果想捕获错误，要使用 `promise.catch` 方法。

    ```js
    (async () => f())()
    .then(...)
    .catch(...)
    ```

- 第二种写法是使用`new Promise()`。

    ```js
    const f = () => console.log('now');
    (
      () => new Promise(
        resolve => resolve(f()) // new Promise() 立即执行，抛出 f() 的执行结果
      )
    )(); // 立即执行函数
    console.log('next');
    // now
    // next
    ```

上面代码也是使用立即执行的匿名函数，执行`new Promise()`。这种情况下，同步函数也是同步执行的。

鉴于这是一个很常见的需求，所以现在有一个提案，提供`Promise.try()`方法替代上面的写法。

```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```

事实上，`Promise.try`存在已久，Promise 库`Bluebird`、`Q`和`when`，早就提供了这个方法。

由于`Promise.try()`为所有操作提供了统一的处理机制，所以如果想用`then`方法管理流程，最好都用 `Promise.try` 包装一下。这样有许多好处，其中一点就是可以更好地管理异常。

```js
function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}
```

上面代码中，`database.users.get()`返回一个 Promise 对象，如果抛出异步错误，可以用`catch`方法捕获，就像下面这样写。

```js
database.users.get({id: userId})
.then(...)
.catch(...)
```

但是`database.users.get()`可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用 `try...catch` 去捕获。

```js
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
```

上面这样的写法就很笨拙了，这时就可以统一用`promise.catch()`捕获所有同步和异步的错误。

```js
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

事实上，`Promise.try`就是模拟`try`代码块，就像`promise.catch`模拟的是`catch`代码块。
