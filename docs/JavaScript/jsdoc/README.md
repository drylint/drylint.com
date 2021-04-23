# jsdoc

[toc]

JSDoc 是一种文档注释，只要遵循 JSDoc 的约定写注释，JSDoc 就可以识别注释内容并依靠注释内容来生成文档。

JSDoc 工具将扫描您的源代码注释，并为您生成一个 HTML 文档网站。

JSDoc 的目的是记录 JS 应用程序或 JS 库的 API 。比如 modules, namespaces, classes, methods, method parameters 等等。

## JSDoc 工具

安装：

```bash
# 全局安装
npm install -g jsdoc

# 项目内安装
npm install --save-dev jsdoc
```

使用：

```bash
# 全局安装使用方式
jsdoc xxx.js

# 项目内安装使用方式
./node_modules/.bin/jsdoc xxx.js
```

默认情况下，工具运行完成后，会生成一个 `out/` 目录在当前工作目录下，其中就是生成的文档的 HTML 页面。

## 开始

JSDoc 注释通常应该放在代码之前。

为了被 JSDoc 解析器识别，每个注释必须以 `/**` 序列开始。以 `/*` 、 `/***` 开头的注释或大于 3 星的注释都将被忽略。

最简单的注释文档就是一个纯描述：

```js
/** 这是 foo 函数的描述 */
function foo () {
}
```

可以使用特殊的 JSDoc tag 来提供更多信息。例如，如果函数是一个类的构造函数（constructor），您可以通过添加 `@constructor` 标记来指出这一点。

```js
/**
 * Represents a book.
 * @constructor
 */
function Book(title, author) {
}
```

JSDoc 有非常多 tag 用于添加详细的注释文档，详见后文，或查看 [https://jsdoc.app/index.html#block-tags](https://jsdoc.app/index.html#block-tags)

## 在 JSDoc 3 中使用 namepath

当引用文档中其他地方的 JavaScript 变量时，必须提供映射到该变量的唯一标识符。

名称路径（namepath）提供了这样一种方法，可以在实例成员、静态成员和内部变量之间消除歧义。

```js
myFunction
MyConstructor
MyConstructor#instanceMember // 实例成员
MyConstructor.staticMember // 静态成员
MyConstructor~innerMember // 内部成员，注意 JSDoc 2 使用的 dash 符号
```

比如，在一个构造函数中，有一个实例方法，一个静态方法，和一个内部的函数变量，三者都叫做 `say` ：

```js
/** @constructor */
const Person = function () {
  // 实例方法
  this.say = function () {
    return "I'm an instance."
  }

  // 内部函数变量
  const say = function () {
    return "I'm inner."
  }
  say()
}

// 静态方法
Person.say = function() {
  return "I'm static."
}

const p = new Person()
p.say() // I'm an instance.
Person.say() // I'm static.

// 在外部没法直接访问内部函数变量 say
```

上例中， `say` 是三种不同的方法，它们彼此独立存在。

可以使用三种不同的 namepath 语法来引用这三种不同的方法：

```js
Person#say  // 描述实例方法
Person.say  // 静态方法
Person~say  // 内部函数变量
```

您可能想知道，当内部方法不能从外部直接访问时，为什么会有一个引用内部方法的语法。

的确如此，因此 `~` 语法其实很少使用，但有时会从容器中的另一个方法返回对内部方法的引用（就像闭包），因此代码中其他地方的某些对象是有可能借用内部方法的。

注意，如果构造函数的某些实例成员也是构造函数，可以简单地将名称路径链接在一起，形成一个更长的 namepath ：

```js
/**
 * @constructor
 */
const Person = function () {
  /**
   * @constructor
   */
  this.Idea = function () {
    this.consider = function () {
      return 'hello'
    }
  }
}

const p = new Person()
const i = new p.Idea()
i.consider()
```

在本例中，要引用名为 `consider` 的方法，namepath 可以写为 `Person#Idea#consider` 。 所以， `# . ~` 可以任意组合一起使用。

特殊案例：

```js
/** A module. Its name is module:foo/bar.
 * @module foo/bar
 */

/** The built in string object. Its name is external:String.
 * @external String
 */

/** An event. Its name is module:foo/bar.event:MyEvent.
 * @event module:foo/bar.event:MyEvent
 */
```

带特殊字符的对象的 namepath ：

```js
/**
 * @namespace
 */
var chat = {
    /**
     * Refer to this by {@link chat."#channel"}.
     * @namespace
     */
    "#channel": {
        /**
         * Refer to this by {@link chat."#channel".open}.
         * @type {boolean}
         * @defaultvalue
         */
        open: true,
        /**
         * Internal quotes have to be escaped by backslash. This is
         * {@link chat."#channel"."say-\"hello\""}.
         */
        'say-"hello"': function (msg) {}
    }
};

/**
 * Now we define an event in our {@link chat."#channel"} namespace.
 * @event chat."#channel"."op:announce-motd"
 */
```

上面是一个 namespace 的例子，它的成员名中有不寻常的字符（hash, dash, quote） 。

引用时只需用引号包裹即可，比如 `chat."#channel"` , `chat."#channel"."op:announce-motd"` 等等，成员内的引号需要用反斜杠 `\` 转义，比如 `chat."#channel"."say-\"hello\""` 。

## 块级 tag 和 行内 tag

JSDoc 支持两种 tag ：

- 块级 tag，它们位于JSDoc注释的顶层。
- 行内 tag，它们在块标记或描述的文本中。

块标记：

- 块标记通常提供有关代码的详细信息，例如函数接受的参数。
- 块标记总是以 at 符号 `@` 开始。除 JSDoc 注释中的最后一个块标记外，每个块标记后面必须有一个换行符。

行内标记：

- 内联标记通常链接到文档的其他部分，类似于 HTML 中的锚标记 `<a>`。
- 内联标签也以 `@` 符号开始。但是，内联标签及其文本必须用大括号 `{}` 括起来。
- 如果标签中文本包含一个右花括号 `}`，必须用反斜杠 `\` 转义它，比如 `\}`。不需要在内联标记之后使用换行符。

大多数 JSDoc 标记都是块标记。一般来说，当这个站点提到 JSDoc 标记时，通常指的是块标记。

```js
/**
 * Set the shoe's color. Use { @link Shoe#setSize } to set the shoe size.
 *
 * @param {string} color - The shoe's color.
 * @param {SHOE_COLORS} color - The shoe color. Must be an enumerated
 * value of { @link SHOE_COLORS }.
 */
```

上例中， `@param` 是块标记， `@link` 是行内标记。第一个行内标记用在描述中，第二个行内标记用在了块标记中。两个块标记通过换行符分隔。
