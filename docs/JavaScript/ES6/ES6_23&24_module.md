[toc]

## Module 的语法

- 概述
- 严格模式
- `export` 命令
- `import` 命令
- 模块的整体加载
- `export default` 命令
- `export` 与 `import` 的复合写法
- 模块的继承
- 跨模块常量
- `import()`

### 1. 概述

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

### 2. 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）
上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。

其中，尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

### 3. export 命令

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。下面是一个 JS 文件，里面使用`export`命令输出变量。

```js
// export.js

let num = 1
let obj = {
  a: 1
}
let arr = [1, 2, 3]
function func () {
  // export let a = 1 // export只能出现在模块的顶层
}
class CL {}


// 错误导出方式：将值或变量直接导出
// export 1
// export num;
// export obj;
// export arr;
// export func;
// export CL;

// 正确导出方式（推荐）：放入对象中导出，才能提供对外的接口
export {
  num,
  obj,
  arr,
  func,
  CL
}
// 导出时可以起别名
export {
  num as num1,
  num as num2,
  CL as MyClass
}

// 可以在声明时即导出
export let num3 = 10
export function fn () {}
export class CL2 {}

// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
setTimeout(() => num = 2, 500); // 500ms 之后，num的值变为2，其他模块在此时间之后将获得新的值
```

### 4. import 命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

```js
// import命令具有提升效果，会提升到整个模块的头部，首先执行。
// 这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。
console.log('写在导入之前打印num', num) // 写在之前打印num 1

// import命令接受一对大括号，里面指定要从其他模块导入的变量名。
// 大括号里面的变量名，必须与被导入模块的对外接口的名称相同。
// 可以理解为：从一个对象中解构赋值并导入
import { num, obj } from './export.js'
// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import {num as num1} from './export.js'
// 以上两行代码相当于 import { num, obj, num as num1 } from 'export.js'

// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
/* 错误写法：在静态分析阶段，这些语法都是没法得到值的。
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
*/

// import语句会执行所加载的模块，因此可以有下面的写法。
import 'export.js'; // 仅执行，不导入任何值
import 'export.js'; // 重复导入不会重复执行

console.log('导入即打印的num值', num) // 1
console.log('', num1) // 1
setTimeout(() => {
  console.log('600ms 之后打印的num值',num) // 2，因为输出模块中的值变化，导入则动态变化。
}, 600);

// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
// num = 2 // 报错 Uncaught TypeError: Assignment to constant variable.
// 导入的如果是对象，对象的属性是允许修改的
// 但其他模块也会读到改写后的值。这种写法很难查错，所以尽量不要修改导入的东西。
console.log(obj) // {a: 1}
obj.a = 99
console.log(obj) // {a: 99}

```

目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的`import`命令，可以写在同一个模块里面，但是最好不要这样做。因为`import`在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。

```js
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

### 5. 模块的整体加载

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

```js
import * as importObj from './export.js'

console.log(importObj.num) // 1

// 整体加载的对象 importObj，应该是可以静态分析的，不允许运行时改变。

// Uncaught TypeError: Cannot assign to read only property 'num' of object '[object Module]'
importObj.num = 99

// index.html:13 Uncaught TypeError: Cannot add property aaa, object is not extensible
importObj.aaa = 1
```

### 6. `export default` 命令

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

```js
// export.js
let a = 1
export default a

// import.js
import diyA from './export.js'
console.log(diyA) // 1
```

一个模块只能有一个默认输出，因此`export default` 命令只能使用一次。所以，`import`命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。

```js
// export.js
let a = 1
export {a as default} // 其实完全相当于 export default a，被导入时都可任意命名

// import.js
import diyA from './export.js' // 相当于 import {default as diyA} from './export.js'
console.log(diyA) // 1
```

因为`export defaul`t命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句。

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。

```js
// 正确
export default 42;

// 报错
export 42;
```

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, { each, forEach } from 'lodash';
```

`export default`也可以用来输出类。

```js
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

### 7. `export` 与 `import` 的复合写法

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

```js
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module'; // 但实际并不会导入当前模块
export { foo, bar };
```

上面代码中，`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

```js
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法如下。
export { default } from 'foo';

// 具名接口改为默认接口的写法如下。
export { es6 as default } from './someModule';

// 默认接口也可以改名为具名接口。
export { default as es6 } from './someModule';

// 下面三种import语句，没有对应的复合写法。
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";

// 为了做到形式的对称，现在有提案，提出补上这三种复合写法。
export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";
```

### 8. 模块的继承

模块之间也可以继承。

```js
// A.js

let a = 'a';
export default a; // 默认导出 a

export let b = 'b'; // 普通导出 b
export function fn() { // 普通导出 fn
  console.log('A')
}


// B.js

import * as obj from './A.js'; // import * 包含所有 export 和 export default
console.log(obj); // {b: 'b', default: 'a', fn: fn() }

export * from './A.js'; // export * 只包含 A.js 中的 export 不包含 export default
export let c = 'c'; // 普通导出 c


//C.js

import * as index from './B.js'; // 包含 B.js 中 所有 export 和 export default
console.log(index); // {b: 'b', c: 'c', fn: fn() }

```

### 9. 跨模块常量

常量跨模块使用方法相同。

如果要使用的常量非常多，可以建一个专门的`constants`目录，将各种常量写在不同的文件里面，保存在该目录下。

```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];


// 然后，将这些文件输出的常量，合并在一个index.js里面。
// constants/index.js
export {db} from './db';
export {users} from './users';

// 使用的时候，直接加载index.js就可以了。
// script.js
import {db, users} from './constants/index';
```

### 10. `import()` 提案

#### (1) 简介

前面介绍过，`import`命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。

```js
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

上面代码中，引擎处理`import`语句是在编译时，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。

也就是说，`import`和`export`命令只能在模块的顶层，不能在代码块之中（比如，在`if`代码块之中，或在函数之中）。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代 Node 的`require`方法，这就形成了一个障碍。因为`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。

```js
// require() 运行时的动态加载，import命令做不到这一点。
const path = './' + fileName;
const myModual = require(path);
```

因此，有一个提案，建议引入`import()`函数，完成动态加载。

```
import(specifier).then()
```

上面代码中，import函数的参数specifier，指定所要加载的模块的位置。`import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为运行时动态加载。

`import()`返回一个 Promise 对象。

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同。`import()`类似于 Node 的`require()`方法，区别主要是`import()`是异步加载，`require()`是同步加载。

#### (2) 适用场合

（1）按需加载。

`import()`可以在需要的时候，再加载某个模块。

```js
// import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

（2）条件加载

```js
// import()可以放在if代码块，根据不同的情况，加载不同的模块。
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

（3）动态的模块路径

```js
// 根据函数f的返回结果，模块路径动态生成，加载不同的模块。
import(f())
.then(...);
```

#### (3) 注意点

`import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js
import('./myModule.js')
.then(({export1, export2}) => { // export1和export2都是myModule.js的输出接口，可以解构获得。
  // ...·
});
```

如果模块有default输出接口，可以用参数直接获得。

```js
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});

// 上面的代码也可以使用具名输入的形式。
import('./myModule.js')
.then(({default: theDefault}) => { // 相当于 default as theDefault
  console.log(theDefault);
});
```

同时加载多个模块，可以采用下面的写法。

```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()`也可以用在 `async` 函数之中。

```js
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```
