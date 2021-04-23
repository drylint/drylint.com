[toc]

# BOM

## window 对象

BOM 的核心对象是 window ，它表示浏览器的一个实例。在浏览器中， window 对象有双重角色，
它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。这意味着在网页中定义的任何一个对象、变量和函数，都以 window 作为其 Global 对象，因此有权访问
parseInt() 等方法。

### 全局作用域

由于 window 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明
的变量、函数都会变成 window 对象的属性和方法。

```js
var age = 29;
function sayAge () {
  console.log(this.age);
}
console.log(window.age); //29
sayAge(); //29
window.sayAge(); //29
```

定义全局变量与在 window 对象上直接定义属性还是有一点差别：

```js
var age = 29;
window.color = "red";
//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 false
delete window.age;
//在 IE < 9 时抛出错误，在其他所有浏览器中都返回 true
delete window.color; //returns true
alert(window.age); //29
alert(window.color); //undefined
```

尝试访问未声明的变量会抛出错误，但是通过查询 window 对象，可以知道某个可能未声明的变量是否存在。

```js
//这里会抛出错误，因为 oldValue 未定义
var newValue = oldValue;
//这里不会抛出错误，因为这是一次属性查询
//newValue 的值是 undefined
var newValue = window.oldValue;

```

### 窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的 window 对象，并且保存在 frames 集合中。在 frames 集合中，可以通过数值索引（从 0 开始，从左至右，从上到下）或者框架名称来访问相应的 window 对象。每个 window 对象都有一个 name 属性，其中包含框架的名称。下面是一个包含框架的页面：

```html
<html>
<head>
  <title>Frameset Example</title>
</head>
<frameset rows="160,*">
  <frame src="frame.htm" name="topFrame" />
    <frameset cols="50%,50%">
        <frame src="anotherframe.htm" name="leftFrame" />
        <frame src="yetanotherframe.htm" name="rightFrame" />
    </frameset>
</frameset>
</html>
```

以上代码创建了一个框架集，其中一个框架居上，两个框架居下。对这个例子而言，可以通过
`window.frames[0]` 或者 `window.frames["topFrame"]` 来引用上方的框架。不过，恐怕你最好使用 `top` 而非 `window` 来引用这些框架（例如，通过 `top.frames[0]` ）。

`top` 对象始终指向最高（最外）层的框架，也就是浏览器窗口。使用它可以确保在一个
框架中正确地访问另一个框架。因为对于在一个框架中编写的任何代码来说，其中的 `window` 对象指向的都是那个框架的特定实例，而非最高层的框架。

与 `top` 相对的另一个 `window` 对象是 `parent` 。顾名思义， `parent` （父）对象始终指向当前框架的直接上层框架。在某些情况下， `parent` 有可能等于 `top` ；但在没有框架的情况下，`parent` 一定等于 `top` （此时它们都等于 `window` ）。

```js
var abc = 10;
console.log(abc) // 10
console.log(window.abc) // 10

console.log(top.abc) // 10
console.log(top.window.abc) // 10

console.log(parent.abc) // 10
console.log(parent.window.abc) // 10

```

除非最高层窗口是通过 `window.open()` 打开的（本章后面将会讨论），否则其 `window` 对象
的 `name` 属性不会包含任何值。

与框架有关的最后一个对象是 self ，它始终指向 window ；实际上， self 和 window 对象可以互
换使用。引入 self 对象的目的只是为了与 top 和 parent 对象对应起来，因此它不格外包含其他值。

所有这些对象都是 window 对象的属性，可以通过 window.parent 、 window.top 等形式来访问。
同时，这也意味着可以将不同层次的 window 对象连缀起来，例如 window.parent.parent.frames[0] 。

在使用框架的情况下，浏览器中会存在多个 Global 对象。在每个框架中定义的
全局变量会自动成为框架中 window 对象的属性。由于每个 window 对象都包含原生
类型的构造函数，因此每个框架都有一套自己的构造函数，这些构造函数一一对应，
但并不相等。例如， top.Object 并不等于 top.frames[0].Object 。这个问题会
影响到对跨框架传递的对象使用 instanceof 操作符。

### 窗口位置

用来确定和修改 window 对象位置的属性和方法有很多。

IE、Safari、Opera 和 Chrome 都提供了 screenLeft 和 screenTop 属性，分别用于表示窗口相对于屏幕左边和上边的位置。

Firefox 则在 screenX 和 screenY 属性中提供相同的窗口位置信息，Safari 和 Chrome 也同时支持这两个属性。

Opera虽然也支持 screenX 和 screenY 属性，但与 screenLeft 和 screenTop 属性并不对应，因此建议大家不要在 Opera 中使用它们。

兼容浏览器的写法获取窗口与屏幕左上角的距离：

```js
var leftPos = (typeof window.screenLeft == "number") ?
  window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
  window.screenTop : window.screenY;
```

在使用这些值的过程中，还必须注意一些小问题。在 IE、Opera 中，screenLeft 和 screenTop 中保存的是从屏幕左边和上边到由 window 对象表示的页面可见区域的距离。换句话说，如果 window 对象是最外层对象，而且浏览器窗口紧贴屏幕最上端——即 y 轴坐标为 0，那么 screenTop 的值就是位于页面可见区域上方的浏览器工具栏的像素高度。但是，在 Chrome、Firefox和 Safari中， screenY 或 screenTop 中保存的是整个浏览器窗口相对于屏幕的坐标值，即在窗口的 y 轴坐标为 0 时返回 0。

更让人捉摸不透是，Firefox、Safari 和 Chrome 始终返回页面中每个框架的 top.screenX 和
top.screenY 值。即使在页面由于被设置了外边距而发生偏移的情况下，相对于 window 对象使用
screenX 和 screenY 每次也都会返回相同的值。而 IE 和 Opera 则会给出框架相对于屏幕边界的精确坐标值。

最终结果，就是无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。然而，使用 moveTo()
和 moveBy() 方法倒是有可能将窗口精确地移动到一个新位置。这两个方法都接收两个参数，其中moveTo() 接收的是新位置的 x 和 y 坐标值，而 moveBy() 接收的是在水平和垂直方向上移动的像素数。

```js
//将窗口移动到屏幕左上角
window.moveTo(0,0);
//将窗向下移动 100 像素
window.moveBy(0,100);
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口向左移动 50 像素
window.moveBy(-50,0);
```

需要注意的是，这两个方法可能会被浏览器禁用；而且，在 Opera 和 IE 7（及更高版本）中默认就
是禁用的。另外，这两个方法都不适用于框架，只能对最外层的 window 对象使用。

### 窗口大小

跨浏览器确定一个窗口的大小不是一件简单的事。IE9+、Firefox、Safari、Opera 和 Chrome 均为此提供了 4个属性： innerWidth 、 innerHeight 、 outerWidth 和 outerHeight 。

在 IE9+、Safari和 Firefox中， outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸（无论是从最外层的 window 对象还是从某个框架访问）。

在Opera中，outerWidth 和 outerHeight 的值表示页面视图容器（ Opera 中单个标签页对应的浏览器窗口）的大小。而innerWidth 和 innerHeight则表示该容器中页面视图区的大小（减去边框宽度）。

在 Chrome 中， outerWidth 、 outerHeight 与innerWidth 、 innerHeight 返回相同的值，即视口（viewport）大小而非浏览器窗口大小。

IE8 及更早版本没有提供取得当前浏览器窗口尺寸的属性；不过，它通过 DOM 提供了页面可见区域
的相关信息。

在 IE、Firefox、Safari、Opera 和 Chrome 中， document.documentElement.clientWidth 和
document.documentElement.clientHeight 中保存了页面视口的信息。在 IE6 中，这些属性必须在标准模式下才有效；如果是混杂模式，就必须通过 document.body.clientWidth 和 document.body.clientHeight 取得相同信息。而对于混杂模式下的 Chrome，则无论通过 document.documentElement 还是 document.body 中的 clientWidth 和 clientHeight 属性，都可以取得视口的大小。

虽然最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小，如下所示。

```js
// 获取浏览器视口大小（包括滚动条），兼容浏览器写法：

var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}

console.log(pageWidth)
console.log(pageHeight)

```

在以上代码中，我们首先将 window.innerWidth 和 window.innerHeight 的值分别赋给了
pageWidth 和 pageHeight 。然后检查 pageWidth 中保存的是不是一个数值；如果不是，则通过检查document.compatMode （这个属性将在第 10 章全面讨论）来确定页面是否处于标准模式。如果是，则分别使用 document.documentElement.clientWidth 和 document.documentElement.clientHeight 的值。否则，就使用 document.body.clientWidth 和 document.body.clientHeight 的值。

- 移动浏览器的可见视口（屏幕上可见的视口的区域，是否有滚动内容都是固定的）

  移动 IE 浏览器 保存在 document.documentElement.clientWidth 和 document.documentElement.clientHeihgt 中。随着页面的缩放，这些值也会相应变化。

  对于其他浏览器， window.innerWidth 和 window.innerHeight 保存着可见视口，也就是屏幕上可
  见页面区域的大小。

- 移动浏览器布局视口（即渲染后页面的实际大小，与可见视口不同，可见视口只是整个页面中的一小部分）

  移动 IE 浏览器把布局视口的信息保存在 document.body.clientWidth 和 document.body.clientHeight 中。

  其他移动浏览器的布局视口， document.documentElement.clientWidth 和 document.documentElement.clientHeight

另外，使用 resizeTo() 和 resizeBy() 方法可以调整浏览器窗口的大小。这两个方法都接收两个
参数，其中 resizeTo() 接收浏览器窗口的新宽度和新高度，而 resizeBy() 接收新窗口与原窗口的宽度和高度之差。来看下面的例子。

```js
//调整到 100×100
window.resizeTo(100, 100);
//调整到 200×150
window.resizeBy(100, 50);
//调整到 300×300
window.resizeTo(300, 300);
```

需要注意的是，这两个方法与移动窗口位置的方法类似，也有可能被浏览器禁用；而且，在 Opera
和 IE7（及更高版本）中默认就是禁用的。另外，这两个方法同样不适用于框架，而只能对最外层的
window 对象使用。

### 导航和打开窗口

使用 window.open() 方法既可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。

这个方法可以接收 4 个参数：

- 要加载的 URL、
- 窗口目标、
- 一个特性字符串
- 一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。

```js
window.open('url', 'targetName', '', true | false)
```

通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。

如果为 window.open() 传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具
有该名称的窗口或框架中加载第一个参数指定的 URL。看下面的例子。

```js
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open("http://www.wrox.com/", "topFrame");
```

调用这行代码，就如同用户单击了 href 属性为 <http://www.wrox.com/>， target 属性为 "topFrame"的链接。如果有一个名叫 "topFrame" 的窗口或者框架，就会在该窗口或框架加载这个 URL；否则，就会创建一个新窗口并将其命名为 "topFrame" 。此外，第二个参数也可以是下列任何一个特殊的窗口名称： _self 、_parent 、 _top 或_blank 。

#### 1. 弹出窗口

如果给 window.open() 传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根
据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会
打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页—
—根据浏览器设置）。在不打开新窗口的情况下，会忽略第三个参数。

第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。下表列出了可以出现
在这个字符串中的设置选项。

| 设 置 | 值 | 说 明
| -- | -- | -- |
fullscreen | yes 或 no | 表示浏览器窗口是否最大化。仅限IE
height | 数值 | 表示新窗口的高度。不能小于100
left | 数值 | 表示新窗口的左坐标。不能是负值
location | yes 或 no | 表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。<br />如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器）
menubar | yes 或 no | 表示是否在浏览器窗口中显示菜单栏。默认值为 no
resizable | yes 或 no | 表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为 no
scrollbars | yes 或 no | 表示如果内容在视口中显示不下，是否允许滚动。默认值为 no
status | yes 或 no | 表示是否在浏览器窗口中显示状态栏。默认值为 no
toolbar | yes 或 no | 表示是否在浏览器窗口中显示工具栏。默认值为 no
top | 数值 | 表示新窗口的上坐标。不能是负值
width | 数值 | 表示新窗口的宽度。不能小于100

表中所列的部分或全部设置选项，都可以通过逗号分隔的名值对列表来指定。其中，名值对以等号
表示（注意，整个特性字符串中不允许出现空格），如下面的例子所示。

```js
window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
```

这行代码会打开一个新的可以调整大小的窗口，窗口初始大小为 400×400 像素，并且距屏幕上沿
和左边各 10 像素。

这行代码会打开一个新的可以调整大小的窗口，窗口初始大小为 400×400 像素，并且距屏幕上沿
和左边各 10 像素。

window.open() 方法会返回一个指向新窗口的引用。引用的对象与其他 window 对象大致相似，但
我们可以对其进行更多控制。例如，有些浏览器在默认情况下可能不允许我们针对主浏览器窗口调整大
小或移动位置，但却允许我们针对通过 window.open() 创建的窗口调整大小或移动位置。通过这个返
回的对象，可以像操作其他窗口一样操作新打开的窗口，如下所示。

```js
var wroxWin = window.open("http://www.wrox.com/", "wroxWindow",
  "height=400,width=400,top=10,left=10,resizable=yes");
//调整大小
wroxWin.resizeTo(500, 500);
//移动位置
wroxWin.moveTo(100, 100);
```

调用 close() 方法还可以关闭新打开的窗口。

```js
wroxWin.close();
```

但是，这个方法仅适用于通过 window.open() 打开的弹出窗口。对于浏览器的主窗口，如果没有
得到用户的允许是不能关闭它的。不过，弹出窗口倒是可以调用 top.close() 在不经用户允许的情况
下关闭自己。弹出窗口关闭之后，窗口的引用仍然还在，但除了像下面这样检测其 closed 属性之外，
已经没有其他用处了。

```js
wroxWin.close();
alert(wroxWin.closed); //true
```

新创建的 window 对象有一个 opener 属性，其中保存着打开它的原始窗口对象。这个属性只在弹出
窗口中的最外层 window 对象（ top ）中有定义，而且指向调用 window.open() 的窗口或框架。例如：

```js
var wroxWin = window.open("http://www.wrox.com/","wroxWindow",
  "height=400,width=400,top=10,left=10,resizable=yes");
alert(wroxWin.opener == window); //true
```

虽然弹出窗口中有一个指针指向打开它的原始窗口，但原始窗口中并没有这样的指针指向弹出窗
口。窗口并不跟踪记录它们打开的弹出窗口，因此我们只能在必要的时候自己来手动实现跟踪。

有些浏览器（如 IE8 和 Chrome）会在独立的进程中运行每个标签页。当一个标签页打开另一个标
签页时，如果两个 window 对象之间需要彼此通信，那么新标签页就不能运行在独立的进程中。在 Chrome中，将新创建的标签页的 opener 属性设置为 null ，即表示在单独的进程中运行新标签页，如下所示。

```js
var wroxWin = window.open("http://www.wrox.com/","wroxWindow",
"height=400,width=400,top=10,left=10,resizable=yes");
wroxWin.opener = null;
```

将 opener 属性设置为 null 就是告诉浏览器新创建的标签页不需要与打开它的标签页通信，因此
可以在独立的进程中运行。标签页之间的联系一旦切断，将没有办法恢复。

#### 2. 安全限制

曾经有一段时间，广告商在网上使用弹出窗口达到了肆无忌惮的程度。他们经常把弹出窗口打扮成
系统对话框的模样，引诱用户去点击其中的广告。由于看起来像是系统对话框，一般用户很难分辨是真
是假。为了解决这个问题，有些浏览器开始在弹出窗口配置方面增加限制。

Windows XP SP2 中的 IE6 对弹出窗口施加了多方面的安全限制，包括不允许在屏幕之外创建弹出窗
口、不允许将弹出窗口移动到屏幕以外、不允许关闭状态栏等。IE7 则增加了更多的安全限制，如不允
许关闭地址栏、默认情况下不允许移动弹出窗口或调整其大小。Firefox 1 从一开始就不支持修改状态栏，因此无论给 window.open() 传入什么样的特性字符串，弹出窗口中都会无一例外地显示状态栏。后来的 Firefox 3 又强制始终在弹出窗口中显示地址栏。Opera 只会在主浏览器窗口中打开弹出窗口，但不允
许它们出现在可能与系统对话框混淆的地方。
此外，有的浏览器只根据用户操作来创建弹出窗口。这样一来，在页面尚未加载完成时调用
window.open() 的语句根本不会执行，而且还可能会将错误消息显示给用户。换句话说，只能通过单
击或者击键来打开弹出窗口。
对于那些不是用户有意打开的弹出窗口，Chrome 采取了不同的处理方式。它不会像其他浏览器那
样简单地屏蔽这些弹出窗口，而是只显示它们的标题栏，并把它们放在浏览器窗口的右下角。

在打开计算机硬盘中的网页时，IE 会解除对弹出窗口的某些限制。但是在服务器上执行这些代码会受到对弹出窗口的限制。

#### 3. 检测弹出窗口是否被屏蔽

大多数浏览器都内置有弹出窗口屏蔽程序，而没有内置此类程序的浏览器，也可以安装 Yahoo!
Toolbar 等带有内置屏蔽程序的实用工具。结果就是用户可以将绝大多数不想看到弹出窗口屏蔽掉。于
是，在弹出窗口被屏蔽时，就应该考虑两种可能性。如果是浏览器内置的屏蔽程序阻止的弹出窗口，那
么 window.open() 很可能会返回 null 。此时，只要检测这个返回的值就可以确定弹出窗口是否被屏蔽了，如下面的例子所示。

```js
var wroxWin = window.open("http://www.wrox.com", "_blank");
  if (wroxWin == null){
  alert("The popup was blocked!");
}
```

如果是浏览器扩展或其他程序阻止的弹出窗口，那么 window.open() 通常会抛出一个错误。因此，
要想准确地检测出弹出窗口是否被屏蔽，必须在检测返回值的同时，将对 window.open() 的调用封装
在一个 try-catch 块中，如下所示。

```js
var blocked = false;
try {
  var wroxWin = window.open("http://www.wrox.com", "_blank");
  if (wroxWin == null) {
    blocked = true;
  }
} catch (ex) {
  blocked = true;
}
if (blocked) {
  alert("The popup was blocked!");
}
```

在任何情况下，以上代码都可以检测出调用 window.open() 打开的弹出窗口是不是被屏蔽了。但
要注意的是，检测弹出窗口是否被屏蔽只是一方面，它并不会阻止浏览器显示与被屏蔽的弹出窗口有关
的消息。

### 定时器：间歇调用（setInterval）和超时调用（setTimeout）

setTimeout() 方法，它接受两个参数：

- 要执行的代码，可以是一个包含 JavaScript 代码的字符串（就和在 eval() 函数中使用的字符串一样），也可以是一个函数。最好使用函数而不是字符串。
- 以毫秒表示的时间（即在执行代码前需要等待多少毫秒）。

```js
//不建议传递字符串！
setTimeout("alert('Hello world!') ", 1000);
//推荐的调用方式
setTimeout(function () {
  alert("Hello world!");
}, 1000);

```

虽然这两种调用方式都没有问题，但由于传递字符串可能导致性能损失，因此不建议以字符串作为
第一个参数。

调用 setTimeout() 之后，该方法会返回一个数值 ID，表示超时调用。这个超时调用 ID 是计划执
行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用
clearTimeout() 方法并将相应的超时调用 ID 作为参数传递给它，如下所示。

```js
//设置超时调用
var timeoutId = setTimeout(function () {
  alert("Hello world!");
}, 1000);
//注意：把它取消
clearTimeout(timeoutId);
```

`setTimeout` 的函数中的代码都是在全局作用域中执行的，因此函数中 this 的值在非严格模式下指向 window 对象，在严格模式下是 undefined 。

间歇调用（setInterval() ）与超时调用类似，只不过它会按照指定的时间间隔重复执行代码，直至间歇调用被取消或者页面被卸载。

一般认为，使用超时调用来模拟间歇调用的是一种最佳模式。在开发环境下，很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。而像前面示例中那样使用超时调用，则完全可以避免这一点。所以，最好不要使用间歇调用。

### 系统对话框 `alert()` 、 `confirm()`、 `prompt()`

浏览器通过 alert() 、 confirm() 和 prompt() 方法可以调用系统对话框向用户显示消息。系统对
话框与在浏览器中显示的网页没有关系，也不包含 HTML。它们的外观由操作系统及（或）浏览器设置
决定，而不是由 CSS 决定。此外，通过这几个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。

```js
// alert()
alert('warning msg!')

// confirm() 确认返回 true ，取消返回 false。
let isTrue = confirm('Are you sure?')
console.log(isTrue) // true | false

// prompt() 确认返回 输入文本， 取消返回 null
let inputText = prompt('Tips', 'initValue')
console.log(inputText) // inputText | null
```

还有两个可以通过 JavaScript 打开的对话框，即“查找”和“打印”。这两个对话框都是异步显示
的，能够将控制权立即交还给脚本。这两个对话框与用户通过浏览器菜单的“查找”和“打印”命令
打开的对话框相同。而在 JavaScript 中则可以像下面这样通过 window 对象的 find() 和 print() 方法打开它们。

```js
//显示“打印”对话框
window.print();
//显示“查找”对话框
window.find();
```

## location 对象

location 是最有用的 BOM 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一
些导航功能。

事实上， location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是
document 对象的属性；换句话说， window.location 和 document.location 引用的是同一个对象。

location 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。下表列出了 location 对象的所有属性（注：省略了每个属性前面的 location 前缀）。

属 性 名 | 例 子 | 说 明
-- | -- | --
hash | "#contents" | 返回URL中的hash（#号后跟零或多个字符），如果 URL 中不包含散列，则返回空字符串
host | "www.wrox.com:80" | 返回服务器名称和端口号（如果有）
hostname | "www.wrox.com" | 返回不带端口号的服务器名称
href | "http:/www.wrox.com" | 返回当前加载页面的完整URL。而location对象的 toString()方法也返回这个值
pathname | "/WileyCDA/" | 返回URL中的目录和（或）文件名
port | "8080" | 返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串
protocol | "http:" | 返回页面使用的协议。通常是http:或https:
search | "?q=javascript" | 返回URL的查询字符串。这个字符串以问号开头

### 查询字符串参数

尽管 location.search 返回从问号到 URL 末尾的所有内容，但却没有办法逐个
访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然后返
回包含所有参数的一个对象：

```js
function parseQueryStringToObj(param) {
  // 去掉开头的问号
  let qs = param.substring(1)
  // 取得每一项 'key=value' 组成的数组
  let items = qs.includes('&') ? qs.split('&') : []
  let len = items.length

  let obj = {}
  // 循环逐个将每一项 key-value 添加到 obj 对象中
  for (let i = 0; i < len; i++) {
    let item = items[i].split('=')
    let key = decodeURIComponent(item[0])
    let value = decodeURIComponent(item[1])
    if (key.length) {
      obj[key] = value
    }
  }
  return obj
}
```

### 位置操作

最常用的方式，就是使用 `assign()` 方法并为其传递一个 URL

```js
location.assign('http://www.xxx.com')
```

这样，就可以立即打开新 URL 并在浏览器的历史记录中生成一条记录。如果是将 `location.href`
或 `window.location` 设置为一个 URL 值，也会以该值调用 `assign()` 方法。

```js
window.location = 'http://www.xxx.com'
location.href = 'http://www.xxx.com'

// 其实就相当于执行
location.assign('http://www.xxx.com')
```

修改 `location` 对象的其他属性也可以改变当前加载的页面。下面的例子展示了通过将 `hash` 、
`search` 、 `hostname` 、 `pathname` 和 `port` 属性设置为新值来改变 URL。

```js
//假设初始 URL 为 http://www.wrox.com/WileyCDA/

//将 URL 修改为"http://www.wrox.com/WileyCDA/#section1"
location.hash = "#section1";
//将 URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"
location.search = "?q=javascript";
//将 URL 修改为"http://www.yahoo.com/WileyCDA/"
location.hostname = "www.yahoo.com";
//将 URL 修改为"http://www.yahoo.com/mydir/"
location.pathname = "mydir";
//将 URL 修改为"http://www.yahoo.com:8080/WileyCDA/"
location.port = 8080;
```

每次修改 location 的属性（ hash 除外），页面都会以新 URL 重新加载。

当通过上述任何一种方式修改 URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。要禁用这种行为，可以使用 `replace()` 方法。这个方法只接受一个参数，即要导航到的 URL；结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录。在调用 `replace()` 方法之后，用户不能回到前一个页面

```js
location.replace('http://www.xxx.com')
```

与位置有关的最后一个方法是 `reload()` ，作用是重新加载当前显示的页面。如果调用 `reload()` 时不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。

```js
location.reload(); //重新加载（有可能从缓存中加载）
```

如果要强制从服务器重新加载，则需要像下面这样为该方法传递参数 `true` 。

```js
location.reload(true); //重新加载（从服务器重新加载）
```

## navigator 对象

属性或方法 | 说 明
-- | --
appCodeName | 浏览器的名称。通常都是 Mozilla ，即使在非Mozilla浏览器中也是如此
appName | 完整的浏览器名称
appVersion | 浏览器的版本。一般不与实际的浏览器版本对应
cookieEnabled | 表示cookie是否启用
cpuClass | 客户端计算机中使用的CPU类型（ x86 、68K 、 Alpha 、 PPC 或 Other ）
javaEnabled() | 表示当前浏览器中是否启用了Java
language | 浏览器的主语言
mimeTypes | 在浏览器中注册的MIME类型数组
onLine | 表示浏览器是否连接到了因特网
platform | 浏览器所在的系统平台
plugins | 浏览器中安装的插件信息的数组
preference() | 设置用户的首选项
product | 产品名称（如  'Gecko' ）
userAgent | 浏览器的用户代理字符串
vendor | 浏览器的品牌（如 'Google Inc.'）

表中的这些 navigator 对象的属性通常用于检测显示网页的浏览器类型（第 9 章会详细讨论）。

### 检测插件

检测浏览器中是否安装了特定的插件。

`navigator.plugins` 数组中的每一项都包含下列属性。

- name ：插件的名字。
- description ：插件的描述。
- filename ：插件的文件名。
- length ：插件所处理的 MIME 类型数量。

一般来说， name 属性中会包含检测插件必需的所有信息，但有时候也不完全如此。在检测插件时，
需要像下面这样循环迭代每个插件并将插件的 name 与给定的名字进行比较。

```js
//检测插件（在 IE 中无效）
function hasPlugin(name) {
  name = name.toLowerCase();
  for (var i = 0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}
//检测 Flash
alert(hasPlugin("Flash"));
//检测 QuickTime
alert(hasPlugin("QuickTime"));
```

### 注册处理程序

Firefox 2为 navigator 对象新增了 registerContentHandler() 和 registerProtocolHandler() 方
法（这两个方法是在 HTML5 中定义的，相关内容将在第 22 章讨论）。这两个方法可以让一个站点指明
它可以处理特定类型的信息。

## screen 对象

`screen` 对象基本上只用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等。

属性 | 说明
-- | --
width | 屏幕的像素宽度
height | 屏幕的像素高度
availWidth | 屏幕的像素宽度减系统部件宽度之后的值（只读）
availHeight | 屏幕的像素高度减系统部件高度之后的值（只读）
availTop | 未被系统部件占用的最上方的像素值（只读）
availLeft | 未被系统部件占用的最左侧的像素值（只读）
colorDepth | 用于表现颜色的位数；多数系统都是32（只读）
pixelDepth | 屏幕的位深（只读）

## history 对象

history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为 history 是 window 对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 history 对象与特定的 window 对象关联。

`history.go(integer)` 可以在用户的历史记录中任意跳转，参数为正数前进，负数后退

```js
// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);
```

也可以给 go() 方法传递一个字符串参数，此时浏览器会跳转到历史记录中包含该字符串的第一个位置——可能后退，也可能前进，具体要看哪个位置最近。如果历史记录中不包含该字符串，那么这个方法什么也不做。

```js
// 跳转到最近的 wrox.com 页面
history.go("wrox.com");
// 跳转到最近的 nczonline.net 页面
history.go("nczonline.net");
```

还可以使用两个简写方法 `back()` 和 `forward()` 来代替 `go()` 。顾名思义，这两个方法可以
模仿浏览器的“后退”和“前进”按钮。

```js
//后退一页
history.back(); // 相当于 history.go(-1)
//前进一页
history.forward(); // 相当于 history.go(1)
```

history 对象还有一个 `length` 属性，保存着历史记录的数量。这个数量包括所有历史记录，即所有向后和向前的记录。对于加载到窗口、标签页或框架中的第一个页面而言，`history.length` 等于 `0` 。通过像下面这样测试该属性的值，可以确定用户是否一开始就打开了你的页面。

```js
if (history.length === 0){
  //这应该是用户打开窗口后的第一个页面
}
```

注意： 改变 `location.hash` 也会在这些浏览器中生成一条新的历史记录。
