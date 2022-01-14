# temp

## option

### `charset` 输入文件的字符集编码，默认 'utf8'

`type: string`

`default: 'utf8'`

### `composite` 是否开启对项目引用的编译

`type: boolean`

`default: true`

开启以确保TypeScript可以确定在哪里找到要编译项目的引用项目的输出。

### `declaration` 是否生成相应的 `d.ts` 文件

`type: boolean`

`default: false`

### `declarationDir` 指定 `.d.ts` 声明文件的输出目录

`type: string`

`default: -`

TypeScript 2.0 版本以上生效

### `diagnostics` 是否显示诊断信息

`type: boolean`

`default: false`

### `emitBOM` 是否在输出文件开头生成 Byte Order Mark 头信息

`type: boolean`

`default: false`

在输出文件的开头发出一个UTF-8字节顺序标记 Byte Order Mark(BOM)。

### `emitDeclarationOnly` 是否只生成 `.d.ts` 声明文件

`type: boolean`

`default: false`

### `incremental` 是否启用增量编译

`type: boolean`

`default: 跟随 composite 属性的值`

通过 读/写 磁盘上保存的先前的编译信息文件来启用增量编译。这个文件由 `tsBuildInfoFile` 配置项控制。

### `tsBuildInfoFile` 指定一个文件名来保存增量编译信息

`type: string`

`default: '.tsbuildinfo'`

### `inlineSourceMap` 是否将 sourcemaps 生成在同一个文件中

`type: boolean`

`default: false`

将所有 sourcemaps 生成在一个文件中，而不是将每段 sourcemaps 都生成独立的文件

### `inlineSources` 是否将 sourcemap 生成在独立文件中

`type: boolean`

`default: false`

将 sourcemaps 与代码生成在同一个独立文件中，要求设置了 `inlineSourceMap` 或 `sourceMap` 选项。

### `jsx` 指定 jsx 代码生成，在 tsx 中支持 jsx

`type: string`

`default: 'preserve'`

可选值：`'preserve' | 'react' | 'react-native'`

### `reactNamespace` 已弃用，由 `jsxFactory` 选项代替

`type: string`

`default: 'React'`

当目标为生成 `react` JSX时，指定 `createElement` 和 `__spread` 的调用对象

### `listFiles` 是否在编译过程中列出文件列表

`type: boolean`

`default: false`

### `mapRoot` 为 debugger 指定 sourcemap 文件的路径

`type: string`

`default: -`

为调试器指定指定sourcemap文件的路径，而不是使用生成时的路径。当 `.map` 文件是在运行时指定的，并不同于 js 文件的地址时使用这个标记。指定的路径会嵌入到 sourceMap 里告诉调试器到哪里去找它们。

### `module` 指定生成哪个模块系统代码

`type: string`

`default: target === 'ES6' ? 'ES6' : 'commonjs'`

可选值 `'None' | 'CommonJS' | 'AMD' | 'System' | 'UMD' | 'ES6' | 'ES2015' | 'ES2020' | 'ESNext'`

只有 `'AMD'`  和 `'System'` 能够和 `outFile` 选项一起使用。

值 `"ES6"` 和 `"ES2015"` 可使用在目标输出为 `"ES5"` 或更低的情况下。

### `newLine` 指定行结束符是 `'crlf' | 'lf'`

当生成文件时指定行结束符： "crlf"（windows）或 "lf"（unix）。

`type: string`

`default: 根据平台指定`

可选值 `'crlf' | 'lf'`

### `noEmit` 是否不生成输出文件

`type: boolean`

`default: false`

### `noEmitHelpers` 是否不在输出文件中生成用户自定义的帮助函数代码

`type: boolean`

`default: false`

不在输出文件中生成用户自定义的帮助函数代码，如 `__extends`

### `noEmitOnError` 是否在报错时不生成输出文件

  'description': 'Do not emit outputs if any type checking errors were reported.',

`type: boolean`

`default: false`

### `noImplicitAny` 是否禁止使用隐式 `any` 类型

`type: boolean`

`default: false`

在表达式和声明上有隐含的 `any` 类型时报错

### `noImplicitThis` 是否在 `this` 表达式的值为隐式 `any` 类型的时候报错

`type: boolean`

`default: false`

当 `this` 表达式的值为隐式 `any` 类型的时候报错

### `noUnusedLocals` 是否在有未使用的局部变量时抛错

`type: boolean`

`default: false`

### `noUnusedParameters` 是否在有未使用的参数时报错

`type: boolean`

`default: false`

### `noLib` 是否不包含默认的库文件 `lib.d.ts`

`type: boolean`

`default: false`

### `noResolve` 是否不把 `/// <reference>` 或 模块导入的目标 加到已编译的文件列表中

`type: boolean`

`default: false`

如果设为 `true`，三斜线引用会被忽略；它们不会增加新文件，也不会改变给定文件的顺序。

### `noStrictGenericChecks` 是否禁用在函数类型里对泛型签名进行严格检查

`type: boolean`

`default: false`

### `skipDefaultLibCheck` 已弃用，是否忽略库的默认声明文件的类型检查

`type: boolean`

`default: false`

### `skipLibCheck` 是否忽略所有的声明文件（ `*.d.ts`）的类型检查

`type: boolean`

`default: false`

### `outFile` 指定将输出文件合并为一个文件

`type: string`

`default: -`

将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和 `///<reference``>` 和 `import` 的文件顺序决定的。

### `outDir` 重定向输出结构目录

`type: string`

`default: -`

### `preserveConstEnums` 是否在生成的代码中保留 const enum 声明

`type: boolean`

`default: false`

### `preserveSymlinks` 是否保留符号链接将其视为文件，不将它视为真实路径

`type: boolean`

`default: false`

不把符号链接解析为其真实路径；将符号链接文件视为真正的文件

### `preserveWatchOutput` 是否保留 watch 模式下过时的控制台输出而不清屏

`type: boolean`

`default: false`

### `pretty` 是否给错误和消息设置样式，使用颜色和上下文

`type: boolean`

`default: false`

### `removeComments` 是否删除所有注释，除了以 `/!*` 开头的版权信息

`type: boolean`

`default: false`

### `rootDir` 指定输入文件的根目录来控制 `outDir` 选项的输出目录结构

`type: string`

`default: 通常默认以输入文件为准`

指定输入文件的根目录，仅用来控制 `outDir` 选项的输出目录结构

### `isolatedModules` 是否无条件的为未解析的文件生成 imports

`type: boolean`

`default: false`

将每个文件作为单独的模块（与 `ts.transpileModule` 类似），执行额外的检查以确保单独的编译(例如使用 `transpileModule` 或 `@babel/plugin-transform-typescript` )是安全的。

### `sourceMap` 是否生成相应的 .map文件

`type: boolean`

`default: false`

### `sourceRoot`

  'description': 'Specifies the location where debugger should locate TypeScript files instead of source locations.',

`type: string`

`default: -`

指定 debugger 应该定位的 TypeScript文件而不是 源路径 的位置。

如果源将在运行时位于与设计时不同的位置，请使用此标志。

指定的位置将嵌入到sourceMap中，以指导 debugger 找到源文件所在的位置。

### `suppressExcessPropertyErrors` 是否禁止对对象字面量进行过多（额外）的属性检查

`type: boolean`

`default: false`

### `suppressImplicitAnyIndexErrors` 是否阻止索引对象缺乏索引签名时的 `noImplicitAny` 错误

`type: boolean`

`default: false`

阻止 `noImplicitAny` 对缺少索引签名的索引对象报错。查看 issue #1232了解详情。

### `stripInternal` 是否不对 `/** @internal */` JSDoc注解的代码生成声明

`type: boolean`

`default: false`

不对具有 `/** @internal */` JSDoc注解的代码生成声明

### `target` 指定ECMAScript目标版本

`type: string`

`default: 'ES3'`

可选值 `'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'`

### `watch` 是否监听输入文件的改变，在它们改变时重新编译

`type: boolean`

`default: -`

在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。监视文件和目录的具体实现可以通过环境变量进行配置。详情请看配置 Watch。

### `experimentalDecorators` 是否启用对实验性的ES7装饰器的支持

`type: boolean`

`default: false`

### `emitDecoratorMetadata` 是否给源码里的装饰器声明生成设计类型元数据

`type: boolean`

`default: false`

### `moduleResolution`

  'description': 'Specifies module resolution strategy: 'node' (Node) or 'classic' (TypeScript pre 1.6) .',

`type: string`

`default: module === "AMD" or "System" or "ES6" ? "Classic" : "Node"`

可选值 `'Classic' | 'Node'`

决定如何处理模块。设置为 `"Node"` 对于 `Node.js/io.js`风格的处理。


### `noImplicitReturns` 是否禁止函数的隐式返回值，若没有返回值时报错

`type: boolean`

`default: false`

不是函数的所有返回路径都有返回值时报错。

### `noFallthroughCasesInSwitch` 是否禁止在 switch 语句中出现 fallthrough case（没有 break）

`type: boolean`

`default: false`

在 switch 语句中出现 case 语句贯穿时报错

### `forceConsistentCasingInFileNames` 是否强制对同一文件使用一致的大小写引用

`type: boolean`

`default: false`

是否不允许对同一文件使用大小写不一致的引用。

### `baseUrl` 指定解析非相对模块名的基准目录

`type: string`

`default: -`

设置 `baseUrl` 来告诉编译器到哪里去查找模块。 所有非相对模块导入都会被当做相对于 `baseUrl`。

如果给定的路径是相对的，那么将相对于 `tsconfig.json` 路径进行计算。

相对模块的导入不会被设置的baseUrl所影响，因为它们总是相对于导入它们的文件。

### `paths` 指定要计算的相对于 `baseUrl` 的路径映射

`type: object`

`default: -`

对象的属性值类型为 `Array<string>`，路径字符串组成的数组。

### `plugins` 列出要加载的TypeScript语言服务器插件列表

`type: array`

`default: -`

数组元素为对象，对象 key 为插件名，value 为插件描述对象

### `rootDirs` 指定解析模块时使用的根目录列表

`type: Array<string>`

`default: -`

根文件夹列表，其组合内容表示运行时项目的结构。

### `typeRoots` 指定要包含的类型声明文件的目录列表

`type: Array<string>`

`default: -`

### `types` 指定编译中包含的类型声明文件

`type: Array<string>`

`default: -`

### `traceResolution` 是否启用名称解析过程的跟踪，报告模块解析日志消息

`type: boolean`

`default: false`

### `allowJs` 是否允许编译 javascript 文件

`type: boolean`

`default: false`

### `noErrorTruncation` 是否不截断错误消息

`type: boolean`

`default: false`

### `allowSyntheticDefaultImports` 是否允许从没有设置默认导出的模块中默认导入

`type: boolean`

`default: module === "system" 或 esModuleInterop 选项值`

允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。

### `noImplicitUseStrict` 是否在模块输出中不输出 `"use strict"` 指令

`type: boolean`

`default: false`

### `listEmittedFiles` 是否列出所有编译生成的文件名

`type: boolean`

`default: false`

### `disableSizeLimit` 是否禁用 JavaScript 项目的大小限制

`type: boolean`

`default: false`

### `lib` 指定编译过程中需要包含的库文件的列表

`type: Array<string>`

`default: 见下方`

`'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable', 'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable', 'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown', 'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String', 'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'`

如果 `lib` 没有指定默认注入的库的列表。默认注入的库为：

- 针对于 `target` 选项值为 `'ES5'`：`['DOM'，'ES5'，'ScriptHost']`
- 针对于 `target`选项值为 `'ES6'`：`['DOM'，'ES6'，'DOM.Iterable'，'ScriptHost']`

### `strictNullChecks` 是否开启严格的 `null` 检查模式

`type: boolean`

`default: false`

在严格的 `null` 检查模式下， `null` 和 `undefined` 值不包含在任何类型里，只允许用它们自己和 `any` 来赋值（有个例外， `undefined` 可以赋值到 `void` ）。

### `maxNodeModuleJsDepth`

`type: number`

`default: 0`

在 `node_modules` 目录下搜索和加载 JavaScript 文件的最大依赖深度。仅适用于 `allowJs` 选项值为 `true` 时。

### `importHelpers`

`type: boolean`

`default: false`

从 `tslib` 导入辅助工具函数（比如 `__extends` ， `__rest` 等）

### `importsNotUsedAsValues` 指定 仅用于类型的导入（`import`）的 emit/checking 行为

`type: string`

`default: 'remove'`

可选值 `'remove' | 'preserve' | 'error'`

### `jsxFactory` 指定生成 react jsx 时使用的 jsx 工厂函数

`type: string`

`default: 'React.createElement'`

指定生成目标为react JSX时，使用的JSX工厂函数，比如 `React.createElement` 或 `h` 。

### `alwaysStrict` 是否总是在严格模式下解析，并为每个源文件生成 `'use strict'`

`type: boolean`

`default: false`

### `strict` 是否开启所有 严格类型检查 配置选项

`type: boolean`

`default: false`

若启用此选项，则相当于会自动启用：

- noImplicitAny
- noImplicitThis
- alwaysStrict
- strictBindCallApply
- strictNullChecks
- strictFunctionTypes
- strictPropertyInitialization

### `strictBindCallApply` 是否在对函数使用 `bind`, `call`, `apply` 时使用更严格的检查

`type: boolean`

`default: false`

### `downlevelIteration` 是否为低版本编译目标提供迭代器的完整支持

`type: boolean`

`default: false`

当编译目标为 `ES5` 或 `ES3` 时，为 `for...of`、展开运算符(`...`)、解构赋值提供完整的支持。

### `checkJs` 是否在 `.js` 文件中报告错误，需与 `allowJs` 选项配合使用

`type: boolean`

`default: false`

### `strictFunctionTypes` 严格的函数参数类型检查

`type: boolean`

`default: false`

该规则将检查并限制函数类型参数是抗变（contravariantly）而非双变（bivariantly，即协变或抗变）的。

双变（协变或抗变）：子类型可以隐性的转换为父类型。

### `strictPropertyInitialization` 是否要求 class 的属性必须在构造函数初始化

`type: boolean`

`default: false`

确保 类(class) 的 非 `undefined` 属性已经在构造函数里初始化。

若要令此选项生效，需要同时启用 `strictNullChecks` 配置项。

### `esModuleInterop` 是否生成 babel runtime helper 并启用 `allowSyntheticDefaultImports`

`type: boolean`

`default: false`

若设置为 `true`， 会为 运行时的 babel 生态系统兼容性 生成 `'__importStar'` 和 `'__importDefault'` 帮助程序，同时会为类型兼容系统启用 `allowSyntheticDefaultImports` 配置项。

### `allowUmdGlobalAccess` 是否允许从模块访问 UMD 全局变量

`type: boolean`

`default: false`

### `keyofStringsOnly` 是否仅将 `keyof` 解析为字符串值的属性名

`type: boolean`

`default: false`

仅将 `keyof` 解析为字符串值的属性名(没有 number 或 symbols)。

### `useDefineForClassFields` 是否使用 ECMAScript 标准语义生成 class 字段

`type: boolean`

`default: false`

使用 ECMAScript 标准语义生成 class 字段，TypeScript 3.7 版本以上生效。

### `declarationMap` 是否为每个 `.d.ts` 声明文件 生成 sourcemap

`type: boolean`

`default: false`

为每个对应的 `.d.ts` 文件生成一个 sourcemap，TypeScript 2.9 版本以上生效。

### `resolveJsonModule` 是否解析导入的 `.json` 扩展名的模块

`type: boolean`

`default: false`

包含使用.json扩展名导入的模块，TypeScript 2.9 版本以上生效。

### `assumeChangesOnlyAffectDirectDependencies` 是否假设文件中改变只会直接影响和它相关的文件

`type: boolean`

`default: false`

在 `incremental`和 `watch` 配置项开启之中进行重新编译时，假设一个文件中的更改只会直接影响和它相关的文件。
