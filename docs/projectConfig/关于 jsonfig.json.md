
### 什么是jsconfig.json

目录中存在jsconfig.json文件表示该目录是JavaScript项目的根目录。jsconfig.json文件指定根文件和 *[JavaScript语言服务](https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio){:target="_blank"}* 提供的功能选项。

> **提示**：如果您不使用JavaScript，则无需担心jsconfig.json。
> **提示**：jsconfig.json源于tsconfig.json，是TypeScript的配置文件。jsconfig.json相当于tsconfig.json的“allowJs”属性设置为true。

### 为什么我需要一个jsconfig.json文件

Visual Studio Code的JavaScript支持可以在两种不同的模式下运行：

- **文件范围 - 没有jsconfig.json**：在此模式下，在Visual Studio Code中打开的JavaScript文件被视为独立单元。 只要文件a.js没有显式引用文件b.ts（使用///引用指令或**CommonJS**模块），两个文件之间就没有共同的项目上下文。

- **显式项目 - 使用jsconfig.json**：JavaScript项目是通过jsconfig.json文件定义的。 目录中存在此类文件表示该目录是JavaScript项目的根目录。 文件本身可以选择列出属于项目的文件，要从项目中排除的文件，以及编译器选项（见下文）。

当您在工作空间中有一个定义项目上下文的jsconfig.json文件时，JavaScript体验会得到改进。 因此，当您在新工作空间中打开JavaScript文件时，我们提供了一个创建jsconfig.json文件的提示。

##### jsconfig.json的位置

我们通过创建jsconfig.json文件将我们代码的这一部分（我们网站的客户端）定义为JavaScript项目。 将文件放在JavaScript代码的根目录下，如下所示。
![](http://img.6h5.cn/xindot-blog/2019/01/24/vscode-jsconfig-json/59074-a893d0458a810472.png)
在更复杂的项目中，您可能在工作空间中定义了多个jsconfig.json文件。 您将需要执行此操作，以便不将一个项目中的代码建议为IntelliSense以在另一个项目中进行编码。 下面的插图是一个带有客户端和服务器文件夹的项目，显示了两个单独的JavaScript项目。
![](http://img.6h5.cn/xindot-blog/2019/01/24/vscode-jsconfig-json/59074-2c1c32bf978a8928.png)

#### 例子

默认情况下，*[JavaScript语言服务](https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio){:target="_blank"}* 将分析并为JavaScript项目中的所有文件提供IntelliSense<sup>(智能感知)</sup>。 您需要指定要排除或包含的文件，以便提供正确的IntelliSense。

##### 使用“exclude”属性

exclude属性（ *[glob模式](https://www.cnblogs.com/xdlysk/p/5183604.html){:target="_blank"}* ）告诉语言服务哪些文件是什么文件，而不是源代码的一部分。 这使性能保持在较高水平。 如果IntelliSense速度很慢，请将文件夹添加到排除列表中（如果检测到速度减慢，VS代码将提示您执行此操作）。

```
{
  "compilerOptions": {
    "target": "es6"
  },
  "exclude": [
    "node_modules"
  ]
}
```

> **提示**：您将要排除由构建过程生成的文件（例如，dist目录）。 这些文件会导致建议显示两次，并会降低IntelliSense的速度。

##### 使用“包含”属性

或者，可以使用include属性（ *[glob模式](https://www.cnblogs.com/xdlysk/p/5183604.html){:target="_blank"}* ）显式设置项目中的文件。如果不存在include属性，则默认为包含目录和子目录中的所有文件。如果指定了include属性，则只包括这些文件。下面是一个具有显式include属性的示例。

```
{
  "compilerOptions": {
    "target": "es6"
  },
  "include": [
    "src/**/*"
  ]
}
```

> **提示**：exclude和include中的文件路径是相对于jsconfig.json的位置。

#### jsconfig选项

下面是jsconfig“compilerOptions”来配置JavaScript语言支持。

> **提示**：不要被compilerOptions混淆。 此属性的存在是因为jsconfig.json是tsconfig.json的后代，后者用于编译TypeScript。

| 选项 | 描述 | 类型 | 默认 |
| --- | :--- | :--- | :--- |
| noLib | 不包含默认库文件（lib.d.ts） | string | - |
| target | 指定要使用的默认库（lib.d.ts）。 值是“es3”，“es5”，“es6”，“es2015”，“es2016”，“es2017”，“es2018”，“esnext”。| string | - |
| checkJs | 启用JavaScript文件的类型检查。| boolean | true |
| experimentalDecorators | 为拟议的ES装饰器提供实验支持。| string | - |
| allowSyntheticDefaultImports | 允许从没有默认导出的模块进行默认导入。 这不会影响代码发出，只会影响类型检查。 | boolean | true |
| baseUrl | 用于解析非相对模块名称的基目录。 | string | - |
| paths | 指定相对于baseUrl选项计算的路径映射。| object | 见demo |

#### 使用webpack别名

要使IntelliSense使用webpack别名，您需要使用 *[glob模式](https://www.cnblogs.com/xdlysk/p/5183604.html){:target="_blank"}* 指定paths键。
例如，对于别名'ClientApp'<sub>(或@)</sub>：

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
```

然后使用别名

```
import Something from 'ClientApp/foo'
// 或 import Something from '@/foo'
```

#### 最佳实践

只要有可能，您应该使用不属于项目源代码的JavaScript文件排除文件夹。

> **提示**：如果工作空间中没有jsconfig.json，则默认情况下，VS Code将排除node_modules文件夹。

下面是一个将常见项目组件映射到其安装文件夹的表，建议将其排除在外：

| 组件 | 要排除的文件夹 |
| --- | :--- |
| node | 排除node_modules文件夹 |
| webpack, webpack-dev-server | 排除内容文件夹，例如dist。|
| bower | 排除bower_components文件夹 |
| ember | 排除tmp和temp文件夹 |
| jspm | 排除jspm_packages文件夹 |

当您的JavaScript项目变得太大而性能变慢时，通常是因为像node_modules这样的库文件夹。 如果VS Code检测到您的项目变得过大，则会提示您编辑排除列表。

> **提示**：有时无法正确选择更改配置，例如添加或编辑jsconfig.json文件。 运行Reload JavaScript Project命令应重新加载项目并获取更改。

### 使用TypeScript编译器进行低级编译

当tsc用于将ES6 JavaScript向下级编译为旧版本时，jsconfig.json中的以下编译器选项适用：

| 选项 | 描述 |
| --- | :--- |
| module | 指定模块代码生成。 值为“commonjs”，“system”，“umd”，“amd”，“es6”，“es2015” |
| diagnostics | 显示诊断信息。|
| emitBOM | 在输出文件的开头发出UTF-8字节顺序标记（BOM）。 |
| inlineSourceMap | 使用源映射发出单个文件，而不是使用单独的文件。 |
| inlineSources | 在单个文件中将源与源图一起发出; 需要设置--inlineSourceMap。 |
| jsx | 指定JSX代码生成：“保留”或“反应”<sup>?</sup>。 |
| reactNamespace | 指定在针对'react'JSX发出的目标时为createElement和__spread调用的对象。 |
| mapRoot | 将位置指定为字符串中的uri，其中调试器应该找到映射文件而不是生成的位置。 |
| noEmit | 不发起输出。 |
| noEmitHelpers | 不在编译输出中生成自定义辅助函数，如__extends。 |
| noEmitOnError | 如果报告任何类型检查错误，不发起输出。 |
| noResolve | 不将三斜杠引用或模块导入目标解析为输入文件。 |
| outFile | 连接并将输出发送到单个文件。 |
| outDir | 将输出结构重定向到目录。 |
| removeComments | 不向输出发出注释。 |
| rootDir | 指定输入文件的根目录。用于通过--outDir控制输出目录结构。 |
| sourceMap | 生成相应的'.map'文件。 |
| sourceRoot | 指定调试器应该找到JavaScript文件而不是源位置的位置。 |
| stripInternal | 不为具有'@internal'注释的代码发出声明。 |
| watch | 监听输入文件。 |
| emitDecoratorMetadata | 在源中为装饰声明发出设计类型元数据。 |
| noImplicitUseStrict | 不在模块输出中发出“use strict”指令。 |

> 这个文档有用么？
> 参考：
> *[JavaScript语言服务](https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio){:target="_blank"}*
> *[TypeScript tsconfig.json](https://www.w3cschool.cn/typescript/typescript-tsconfig-json.html){:target="_blank"}*
> *[glob模式](https://www.cnblogs.com/xdlysk/p/5183604.html){:target="_blank"}*
> *[glob (programming)](https://en.wikipedia.org/wiki/Glob_(programming)){:target="_blank"}*
> *[webpack模板里import路径中@符号是什么意思？](https://blog.csdn.net/qq_32963841/article/details/80075872){:target="_blank"}*

---

翻译：Xindot
*[原文](https://code.visualstudio.com/docs/languages/jsconfig){:target="_blank"}*

---
