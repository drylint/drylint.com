```

babel从入门到入门
博客讲解内容如下：

　　1、babel是什么
　　2、javascript制作规范
　　3、babel转译器
　　4、babel的使用
　　5、常见的几种babel转译器和插件
　　6、babel最常见配置选项
　　7、babel的其他
　　8、在webpack中使用babel
　　9、总结
凡是看到这个标题点进来的同学，相信对babel都有了一定的了解。babel使用起来很简单，简单到都没有必要写一篇文章去介绍，直接看看官方文档就可以。所以我也在怀疑到底该不该写这篇文章。想来想去还是决定动手写写，原因是很简单，自己在刚开始接触babel也出现过懵逼的状态，所以希望这篇文档能给其他人以帮助。

1、babel是什么
babel官网正中间一行黄色大字写着“babel is a javascript compiler”，翻译一下就是babel是一个javascript转译器。为什么会有babel存在呢？原因是javascript在不断的发展，但是浏览器的发展速度跟不上。以es6为例，es6中为javascript增加了箭头函数、块级作用域等新的语法和Symbol、Promise等新的数据类型，但是这些语法和数据类型并不能够马上被现在的浏览器全部支持，为了能在现有的浏览器上使用js新的语法和新的数据类型，就需要使用一个转译器，将javascript中新增的特性转为现代浏览器能理解的形式。babel就是做这个方面的转化工作。

2、javascript制作规范
在这里有必要简单讲一下javascript版本，我只是大体讲下，javascript是网景公司开发的一种脚本语言，1996年的时候以ECMAScript的名字正式成为一种标准。2007年的时候发布了版本es5，然后在随后近10年里js并没有大的变化。所以现在的浏览器都可以很好的支持es5。这一局面直到2015年被打破。2015年6月，TC39（javascript标准的制定组织）公布了新版本的js语言——ES6。而且从ES6开始，TC39规定每年都要发布一个js的新版本，新版本将包含年号，都是以ESxxxx的方式进行命名。所以2015年发布的ES6又叫ES2015，2016年发布的新的js版本就叫ES2016，2017年发布的新的js版本就叫ES2017……。

因为版本都是向前兼容的，就是老版本js版本中规定的语法和api在新版本的js中同样也会合理的。所以我们可以想到后面的规范肯定是包含前面的规范的，也就是ES2016版本的js规范是包含ES2015(ES6)规范的，ES2017是包含ES2016的也包含ES2015的。针对不同的规范，Babel也提供了对应的转换器。

babel-preset-es2015 将es2015版本的js转译为es5。

babel-preset-es2016 将es2016版本的js转译为es5。

babel-preset-es2017 将es2017版本的js转译为es5。

在转译过程中遇到更高版本的js语法，babel是会直接忽略的。

在这里在简单讲一下js新规范的制作过程。

js规范的制作分4个阶段。

Stage0 ：任何尚未提交为正式提案的讨论，想法，改变或对已有规范的补充建议都被认为是一个稻草人草案（“strawman” proposal），但只有TC39成员可以提出此阶段的草案。

Stage1 ：此阶段，稻草人草案升级为正式化的提案，并将逐步解决多部门关切的问题，如与其他提案的相互之间会有什么影响，这一草案具体该如何实施等问题。人们需要对这些问题提供具体的解决方案。stage1的提案通常还需要包括API描述，拥有说明性使用示例，并对语义和算法进行讨论，一般来说草案在这一阶段会经历巨大的变化。

Stage2 ：此阶段，草案就有了初始的规范。通过polyfill（打补丁。编写一些代码实现浏览器之前不支持的功能），开发者可以开始使用这一阶段的草案了，一些浏览器引擎也会逐步对这一阶段的规范的提供原生支持，此外通过使用构建工具（类似babel的工具）也可以编译源代码为现有引擎可以执行的代码，这些方法都使得这一阶段的草案可以开始被使用了。

State3 ：此阶段的规范就属于候选推荐规范了，这一阶段之后变化就不会那么大了，要达到这一阶段需要满足以下条件：

规范的编辑和指定的审阅者必须在最终规范上签字；

用户也应该对该提议感兴趣；

提案必须至少被一个浏览器原生支持；

拥有高效的ployfill，或者被Babel支持；

Stage4 ：此阶段的提案必须有两个独立的通过验收测试的实现，进入第4阶段的提案将包含在 ECMAScript 的下一个修订版中。

针对js规范的不同阶段，babel也提供了对应的转译器

Stage0：preset-stage-0

Stage1：preset-stage-1

Stage2：preset-stage-2

Stage3：preset-stage-3

不同阶段的转译器之间是包含的关系，preset-stage-0转译器除了包含了preset-stage-1的所有功能还增加了transform-do-expressions插件和transform-function-bind插件，同样preset-stage-1转译器除了包含preset-stage-2的全部功能外还增加了一些额外的功能……。

好了，javascript的制作规范大体讲完了，现在我们来讲下babel转译器。

3、babel转译器
为了便于说明，首先我们来定义两个概念。

转译插件，转译插件是用来转译单一功能的插件，比如transform-es2015-arrow-functions，这个插件只负责转译es2015新增的箭头函数。

转译器，转译器是一系列转译插件的集合。比如babel-preset-es2015就包含了es2015新增语法的所有转译插件，比如包含transform-es2015-arrow-functions（es2015箭头函数转译插件）、transform-es2015-classes(es2015 class类转译插件)等。

js规范新增的每个语法都有对应的babel插件，因此babel插件众多。为了便于管理，会把某些插件集合在一起，构成一个转译器。要不然如果我们想转译es2015的语法就要安装一大堆插件了，有了转译器之后我们只需要安装一个转译器就可以了。babel的转译器根据用途的不同也分了不同给的类，这些类非常多，所以babel看起来很混乱。不过大体上babel的转译器分为3类。

语法转译器，这些转译器只负责转译js最新的语法，并不负责转译js新增的api和全局对象。这类转译器包括babel-preset-env、babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest等，以后肯定还会有新的转译器加入，不过你只要理解转译器就是一堆转译插件的集合就可以了。

补丁转译器，这些转译器只负责转译js最新的api和全局对象。比如浏览器不支持String新增的String.padStart方法和Promise全局对象。通过babel-profill转译，我们可以通过其他代码来让浏览器实现类似String.padStart和Promise的功能。

jsx和flow插件，这类转译器用来转译JSX语法和移除类型声明的，使用Rect的时候你将用到它，转译器名称为babel-preset-react

另外你可以对babel已有的转译器进行改造或者创建新的转译器。如何创建babel转译器可以点这里。

4、babel的使用
babel支持的使用场景非常多，可以在浏览器中使用（browser）也可以在命令行（cli），还可以是我们常见的gulp和webpack中。

以下以安装babel-cli为例进行说明。babel更多的使用方法请点击这里。

4.1、创建bebel项目
在本地磁盘上创建一个文件夹es6（名字任意），在该文件夹下打开命令行工具，初始化项目。

1
D:\webpack\demo\es6>npm init -y
这个命令目的就是创建一个默认的package.json文件。

4.2、本地安装babel命令行工具
安装babel的命令行工具的目的是为了在命令行使用babel。

babel命令行工具可以全局安装也可以本地安装，官方文档推荐本地安装，原因有2点；

本地安装不同的项目可以使用不同版本的babel，你也可以单独对某个项目的babel进行升级等操作

每个项目单独安装的意味着对计算机环境没有依赖，便于移植

在命令行中继续执行如下命令

1
npm install --save-dev babel-cli
如果你已经全局安装了babel，可以使用如下的命令进行卸载

1
npm uninstall --global babel-cli
这样就已经在本地安装好babel了。

此时我的package.json文件如下（请忽略main字段）。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js", //请忽略main字段
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1"
  }
}
　　

4.3、在命令行中调用babel
本地安装的babel是不能够在直接命令行中运行的，为了在命令行中运行babel，我们有两个方法，1是需要配置下package.json文件的scripts项。比如如下代码，配置了一个build命令，运行该命令(npm run build)的时候就会在命令行执行babel src -d lib

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1"
  }
}
　　

第2个方法是你需要可以进入node_modules文件夹，再进入.bin文件夹，然后执行在命令行中执行babel src -d lib。

推荐使用npm run build的方法。

这里需要解释babel src -d lib这个命令的意思。这个命令目的是把src文件夹下的文件都转译，转译后的文件放到lib目录下。

关于babel的命令行使用方法请点这里

ps:此时无论你是运行npm run build 还是运行babel src -d lib命令（其实两个方法本质上都是一样的，都是运行babel src -d lib）命令行都会报错，原因是现在还没有src文件夹。可以先不用管它，稍后我们再新建src文件夹。

4.4、创建.babelrc配置文件
在cmd中键入以下命令。

1
D:\webpack\demo\es6>type nul>.babelrc
这个时候你的文件夹里就多了一个.babelrc文件了。windows是不能直接创建空文件名的文件的，所以必须通过命令行创建。

4.5、安装babel的转译器
这里我们以babel-preset-env为例。

在命令行中执行如下代码就会安装babel-preset-env转译器。

1
D:\webpack\demo\es6>npm install babel-preset-env --save-dev
注意：babel命令行工具（babel-cli）跟babel转译器是两个不同的东西，命令行工具并不具有转译代码的功能，只是为了在命令行中使用babel。要转码必须安装转译器，比如babel-preset-env转译器或者babel-preset-react转译器。要转译的时候，还要在.babelrc文件或者命令行中配置这些转译器(presets)选项

4.6、配置.babelrc文件
.babelrc用于配置除回调以外的所有babel api 选项。例如plugins和presets。plugins用于配置我们转译所需要的插件，presets用于配置我们所需要的转译器。

.babelrc不是必须的，我们在.babelrc中配置的选项都可以通过命令行添加，比如在命令行执行 babel src -d lib --presets=env 等价于在.babelrc中配置 "presets":["env"]。当然.babelrc要明显方便很多。

babel在转译代码的过程中会自动读取当前目录.babelrc配置文件，如果当前目录没有的话就遍历整个目录树去寻找，直到找到.babelrc文件或者含有"babel"字段的package.json文件，然后使用这些配置选项来转译代码。

关于.babelrc的注意点如下。

1、如果没有.babelrc文件，或者没有在其他文件中设置过babel的presets的配置选型，并且命令行中也没有配置--presets，那么代码是不会转译的。原es6代码什么样，转译后的代码还是什么样。

2、如果你的.babelrc或者你的命令行使用了你没有安装的转译器（presets），代码就会报错

3、但.babelrc中的配置跟你在命令行中使用的配置冲突的时候，以.babelrc中的配置为准

1
2
3
{
    "presets":["env"]
}
　　

关于.babelrc文件的更多使用方法请点击这里

4.7、.babelrc的替代方案
如果你不想生成.babelrc文件，你可以在你的package.json文件中对babel进行配置。如果你使用gulp或者webpack之类的管理工具的话，也可以在这里工具的配置选项里添加babel的配置选项。

以下以在package.json中配置为例。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib --comments=true"
  },
  "babel":{
    //babel选项
    "presets":["es2015"],
    "comments":false
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.6.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "webpack": "^3.2.0"
  }
}​
　　

在package.json中配置babel等同于使用.babelrc文件

4.8、编写es6代码
因为我们使用的babel命令是babel src -d lib 所以我们需要在目录中创建一个叫src的文件夹。目录结构如下：

|-node_modules
|-src
|-.babelrc
|-package.json
在src文件夹下我们创建一个person.js文件（文件名任意），编写如下es6代码（代码任意，只有是es6代码即可，方便看出编译后的效果）。编辑好代码后保存。

1
2
3
4
5
6
7
8
9
10
class Person{
    constructor(){
        this.name="bigbigStrong"
    }
    sayName(){
        console.log(`my name is ${this.name}`);
    }
}
var p = new Person();
p.sayName();
4.9、转译es6代码
在命令行工具中执行npm run build 就可以发现目录中多了一个lib文件夹，lib文件夹下有一个person.js的文件，这个文件就是src下的person.js文件转译后的代码。

1
D:\webpack\demo\es6>npm run build
转译后的代码如下：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
"use strict";
​
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
​
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
​
var Person = function () {
    function Person() {
        _classCallCheck(this, Person);
​
        this.name = "bigbigStrong";
    }
​
    _createClass(Person, [{
        key: "sayName",
        value: function sayName() {
            console.log("my name is " + this.name);
        }
    }]);
​
    return Person;
}();
​
var p = new Person();
p.sayName();
　　

5、常见的几种babel转译器和插件
经过上面的步骤我们已经完成了转译代码的工作，现在我们介绍下babel中常用的转译器和配置选项

5.1、babel-preset-env
转译器，最常用的转译器。通过在.babelrc中配置env选项，可以让代码兼容不同版本的浏览器或者node。浏览器或者node已经支持的语法将不再转译了，不支持的才转译。如果不配置env选项，该转译器等同于babel-preset-latest。更多详情和方法点这里

1
2
3
4
5
6
7
8
9
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
5.2、babel-preset-es2015
转译器，将es2015版本的js代码转译为es5代码，对于es2016版本的代码或者es2017版本的代码不转译。

5.3、babel-preset-latest
转译器，将最新版本的js代码转译为es5代码。不推荐使用，已经废除。建议使用babel-preset-env代替

5.4、babel-preset-react
转译器，剥离流类型并将JSX转换为createElement调用，主要在转译react代码的时候使用。

5.5、兼容ie浏览器的转译器
要兼容老版本的ie浏览器，可以使用对应的es3和es5插件

es3-member-expression-literals

es3-property-literals

es5-property-mutators

5.6、总结
转译器就是一堆转译插件的集合。babel转译器很多，但是我们常用的就那几个。如果要转译新版本的js的话，只需要使用babel-presets-env这一个转译器就可以了。

关于babel的更多转译器介绍，可以点击这里查看。你可以点击每一个转译器进去查看转译器的适用场景是使用方法

6、babel最常见配置选项
babel的配置选项在命令行的使用规则是babel --name-value 比如我们使用es2015转译器，我们的命令就是

1
babel src -d lib --presets=es2015
babel的配置选项非常多，每个转译器也都有自己的配置选项，关于babel的配置选项的详细功能和使用方法，请点击这里查看。我这里只介绍几个常见的。

6.1、babelrc
默认值为true，用于配置是否适用.babelrc和.babelignore文件，当命令行中添加--no-babelrc选项的时候，表示忽略.babelrc和.babelignore文件。在.babelrc文件中配置babelrc个人测试没有卵用。

6.2、env
默认值为一个空对象{}. env用于配置代码需要兼容的环境，比如你的代码要在chrome52上运行，可以这样配置.babelrc。

1
2
3
4
5
6
7
8
9
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}
配置代码兼容最新的node，可以这样设置.babelrc

1
2
3
4
5
6
7
8
9
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
6.3、ignore
忽略某些文件,默认值为null，比如src文件夹下有person.js和foo.js两个文件，转译的时候你要忽略src文件夹下的foo.js，可以这样配置.babelrc。这样就不再转译foo.js文件了

1
2
3
4
{
    "presets":["env"],
    "ignore":["foo.js"]
}
与ignore相对应的是only选项，only表示只转译某些文件。

6.4、minified
是否压缩转译后的代码，默认值为false

1
2
3
4
5
{
    "presets":["env"],
    "ignore":["foo.js"],
    "minified":true
}
6.5、plugins
配置转译所需要的插件。使用插件的顺序是按照插件在数组中的顺序依次调用的。比如如下命令，转译的时候先使用transform-decorators-legacy转译，再使用transform-class-properties转译

1
2
3
4
5
6
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
6.6、presets
配置你要使用的转译器。使用转译器的顺序是按照转译器在数组中的反顺序进行调用的。先使用数组最末尾的转译器，然后使用倒数第2个，倒数第3个，依次类推。比如使用下面命令的时候，先使用stage-2转译器转译，再react转译器转译，最后使用es2015转译器转译。

1
2
3
4
5
6
7
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
6.7、补充：plugins和presets的顺序
详情点这里

如果同时存在plugins和presets，则先使用plugins转译

plugin的调用顺序是从第一个到最后一个，

presets的调用的顺序是相反的，从最后一个到第一个

7、babel的其他
7.1、babel-node
bable-node是babel-cli自带的命令，提供了一个支持ES6的REPL环境，它支持node的REPL环境的所有功能，而且可以直接运行ES6代码。为了体验下这个功能，我们需要全局安装babel-cli。然后在命令行执行下面的命令。

安装

1
npm install --save-dev -g babel-cli
执行命令就会输出我们代码执行的结果

1
D:\webpack\demo\es6>babel-node -e  "var name='tom';console.log(`my name is ${name}`)"; //my name is tom;
babel-node的详细用法点击这里

7.2、babel-register
引用自阮一峰babel讲解

babel-register模块会改写require命令，为它加上一个钩子。此后每当使用require加载.js、.jsx、.es、.es6后缀名文件的时候，都会先用babel进行转码

安装

1
$ npm install --save-dev babel-register
使用的时候必须先加载babel-register。

1
2
require("babel-register");
require("./index.js");
然后，就不需要手动对index.js转码了。

需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

babel-register的详细使用方法点击这里

7.3、babel-core
babel-core主要在node等环境中使用，可以用来开发自己的babel转译器。直接调用babel的api对某些代码或者某些文件进行转译。

安装

1
npm install babel-core --save
使用方法

1
2
3
var babel =require('babel-core');
babel.transform(code,options);//转译程序片段
babel.transform(filename,options,callback); //转译文件
babel-core的详细使用方法点击这里

8、在webpack中使用babel。
8.1、安装webpack
1
D:\webpack\demo\es6>npm install --save-dev webpack
8.2、安装babel-preset-env和babel-loader。
如果你是跟着我这份教程一路看下来的，那么你babel-preset-env已经安装了。已经安装的话就不用再安装了。记得要安装babel-loader就好。

1
D:\webpack\demo\es6>npm install --save-dev babel-preset-env babel-loader
此时你的package.json如下。确保devDependencies中有babel-loader、babel-preset-env和webpack即可，其他的可以跟我不同。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "arrow.js",
  "scripts": {
    "build": "babel src -d lib"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "webpack": "^3.2.0"
  }
}
　　

8.3、创建webpack.config.js文件
在根目录下创建webpack.config.js文件，内容如下。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
var path = require("path");
module.exports = {
    entry: './src/person.js',
    output: {
        path: path.resolve(__dirname,"lib"),
        filename: 'person.compiled.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{
                presets:["env"]
            }
        }]
    }
}
　　

entry为入口文件，我们选择当前目录下，src文件夹下的person.js文件作为入口。output为输出选项，path为输出的目录，filename为输出文件名。query选项为.babelrc中的配置选项。在webpack中设置了query字段后，就不再需要.babelrc文件了。

此时我们的目录结构是这样子的。

-lib
-node_modules
-src
    -person.js
    -foo.js
-package.json
-webpack.config.js


8.4、运行webpack。
在命令行中执行webpack，webpack会自动读取webpack.config.js文件中的配置。然后对我们配置的文件进行转译。

1
D:\webpack\demo\es6>webpack
打开lib文件夹，我们发现多了一个转译后的文件person.compiled.js。

-lib
    -person.compiled.js
-node_modules
-src
    -person.js
    -foo.js
-package.json
-webpack.config.js
8.5、使用webpack转译多个文件
我们src文件夹下除了有person.js文件外，还有一个foo.js文件。但是我们上面的操作只转译了person.js文件，为了同时转译foo.js文件我们需要在person.js文件中引入foo.js

foo.js文件代码如下：

1
2
let name="tom";
console.log(`my name is ${name}`);
我们在person.js文件顶部中添加require("./foo");；这样就可以person.js文件中添加对foo.js的依赖。修改后的person.js代码如下：

1
2
3
4
5
6
7
8
9
10
11
require("./foo");
class Person{
    constructor(){
        this.name="bigbigStrong"
    }
    sayName(){
        console.log(`my name is ${this.name}`);
    }
}
var p = new Person();
p.sayName();
这样在编译后的文件person.compiled.js文件里，就包含了foo.js的代码。

关于webpack的更多使用方法，请点击查看webpack文档

9、总结
关于babel的知识点大概就这些。

babel常用的转译器是babel-preset-env。

常用的配置选项是plugins和presets

常用的使用场景是在webpack中

​

以上讲的都是常用的，关于babel更细的知识点还需要你自己查看babel官方文档。

```
