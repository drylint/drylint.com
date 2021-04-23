[toc]

## 编程风格

- 块级作用域
- 字符串
- 解构赋值
- 对象
- 数组
- 函数
- Map 结构
- Class
- 模块
- ESLint 的使用

### 1. 块级作用域

（1）`let` 取代 `var`
建议不再使用`var`命令，而是使用`let`命令取代。

（2）全局常量和线程安全
在`let`和`const`之间，建议优先使用`const`，尤其是在全局环境，不应该设置变量，只应设置常量。

### 2. 字符串

静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。

### 3. 解构赋值

优先使用解构赋值。

### 4. 对象

单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法。

对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。

### 5. 数组

使用扩展运算符（`...`）拷贝数组。

使用 `Array.from` 方法，将类似数组的对象转为数组。

### 6. 函数

立即执行函数可以写成箭头函数的形式。

使用匿名函数当作参数的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。

箭头函数取代`Function.prototype.bind`，不应再用 `self`/`_this`/`that` = `this`。

简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

不要在函数体内使用 `arguments` 变量，使用 `rest` 运算符（`...`）代替。因为 `rest` 运算符显式表明你想要获取参数，而且 `arguments` 是一个类似数组的对象，而 `rest` 运算符可以提供一个真正的数组。

使用默认值语法设置函数参数的默认值。

### 7. Map 结构

注意区分 `Object` 和 `Map`，只有模拟现实世界的实体对象时，才使用 `Object`。如果只是需要`key: value`的数据结构，使用 `Map` 结构。因为 `Map` 有内建的遍历机制。

```js
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

### 8. Class

总是用 Class。

使用`extends`实现继承，因为这样更简单，不会有破坏`instanceof`运算的危险。

### 9. 模块

使用`import`取代`require`。

使用`export`取代`module.exports`。

如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，`export default`与普通的`export`不要同时使用。

不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。

```js
// bad
import * as myObject from './importModule';

// good
import myObject from './importModule';
```

如果模块默认输出一个函数，函数名的首字母应该小写。

如果模块默认输出一个对象，对象名的首字母应该大写。

### 10. ESLint 的使用

ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

首先，安装 ESLint。

```js
npm i -g eslint
```

然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。

```js
npm i -g eslint-config-airbnb
npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。

```js
{
  "extends": "eslint-config-airbnb"
}
```

现在就可以检查，当前项目的代码是否符合预设的规则。

index.js文件的代码如下。

```js
var unusued = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    alert(message);
}

greet();
```

使用 ESLint 检查这个文件，就会报出错误。

```cmd
$ eslint index.js
index.js
  1:1  error  Unexpected var, use let or const instead          no-var
  1:5  error  unusued is defined but never used                 no-unused-vars
  4:5  error  Expected indentation of 2 characters but found 4  indent
  4:5  error  Unexpected var, use let or const instead          no-var
  5:5  error  Expected indentation of 2 characters but found 4  indent

✖ 5 problems (5 errors, 0 warnings)
```

上面代码说明，原文件有五个错误，其中两个是不应该使用`var`命令，而要使用`let`或`const`；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。
