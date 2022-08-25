# tsconfig.json

```json
{

  "$schema": "https://json.schemastore.org/tsconfig",
  // 指定一个允许包括在程序中的文件列表。只要有任何一个指定的文件找不到，就会发生错误。
  // 通常用于指定一些必须存在的文件，不存在则报错提示缺少这些文件
  // 若没有必须存在的文件，则不建议设置该项，而是使用 include 指定
  "files": [
    "src/index.ts"
  ],
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ],
  "compilerOptions": {
    /* ↓↓↓↓↓ Type Checking ↓↓↓↓↓ */
    // 是否允许出现死区代码，默认 undefined
    "allowUnreachableCode": false,
    // 是否允许出现未使用的 label ，默认 undefined
    "allowUnusedLabels": false,
    // 是否总是使用 ECMAScript 严格模式解析代码，默认 undefined
    "alwaysStrict": true,
    // 是否要求提供准确的可选属性类型，默认 false ，需开启 strictNullChecks 或 strict 选项
    // 可选属性除了指定属性外，还可赋值为 undefined 类型，开启此规则会禁止赋值为 undefined 类型。
    "exactOptionalPropertyTypes": true,
    // 是否禁止出现 fallthrough 的 case 语句，默认 false
    "noFallthroughCasesInSwitch": true,
    // 是否禁止出现隐式的 any 类型，默认 false ，开启此规则不会禁止显示的 any
    "noImplicitAny": true,
    // 是否禁止出现隐式的 override, 默认 false ，开启此规则不会禁止显示的 override
    "noImplicitOverride": true,
    // 是否禁止出现隐式的 return ，默认 false
    "noImplicitReturns": true,
    // 是否禁止出现隐式的 this ，默认 false
    "noImplicitThis": true,
    // 是否禁止使用点 `.` 语法访问索引签名属性(未定义的属性)，默认 false
    // 此选项的目的是，在您的调用语法中表明您对该属性存在的确定程度
    "noPropertyAccessFromIndexSignature": true,
    // 是否禁止不确定的索引签名访问，默认 false
    // 开启此规则后，所有的索引签名属性除了指定的类型，还可能是 undefined 类型
    "noUncheckedIndexedAccess": true,
    // 是否禁止出现未使用的变量，默认 false
    "noUnusedLocals": true,
    // 是否禁止出现未使用的函数参数，默认 false
    "noUnusedParameters": true,
    // 是否启用 TS 类型校验严格模式，默认 false ，此规则会开启所有的严格选项，包括未来新增的严格选项
    // alwaysStrict strictNullChecks strictBindCallApply strictFunctionTypes
    // strictPropertyInitialization noImplicitAny noImplicitThis useUnknownInCatchVariables
    "strict": true,
    // 是否严格校验 call, bind, apply 的调用，默认跟随 strict 选项
    "strictBindCallApply": true,
    // 是否严格校验函数的类型，默认跟随 strict 选项
    "strictFunctionTypes": true,
    // 是否严格校验空值 null 和 undefined ，默认跟随 strict 选项
    "strictNullChecks": true,
    // 是否严格校验 class 属性必须初始化，默认跟随 strict 选项
    "strictPropertyInitialization": true,
    // 是否将 catch 语句捕获的参数设为 unknown 类型，如果设为 false ，捕获参数则是 any 类型
    "useUnknownInCatchVariables": true,
    /* ↑↑↑↑↑ Type Checking ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Modules ↓↓↓↓↓ */
    // 是否允许全局访问模块内部的 UMD 导出
    "allowUmdGlobalAccess": true,
    // 设置一个基础路径，用于解析非绝对路径的模块
    "baseUrl": "./",
    // 指定编译后的代码使用的模块规范
    // 如果 `target` 选项值为 `ES3` 或 `ES5` ，则默认为 `CommonJS` ，否则默认为 `ES6` / `ES2015`。
    // 此选项会影响 moduleResolution 选项
    "module": "ESNext",
    // 指定模块解析策略
    // 当 `module` 值为 `AMD, UMD, System, ES6/ES2015` 时，默认为 `Classic`
    // 当 `module` 值为 `NodeNext, node*` 时，默认为 `module` 的相同值
    // 否则， 默认值为 `Node`
    "moduleResolution": "NodeNext",
    // 指定模块后缀(文件名和扩展名之间的部分)列表，解析模块时要搜索的文件名后缀的列表，默认值为 `[""]`
    // 设置此选项时，数组最后一项应该始终保留空字符串 `""`
    // 比如： foo.ios.ts 的后缀为 `.ios`, ./foo.native.ts 后缀为 `.native`
    "moduleSuffixes": [""],
    // 是否禁用解析，默认 false
    // 默认情况下，TS 会检查 `import` 和 `<reference` 指令的初始文件集，并将这些解析后的文件添加到你的程序中。
    "noResolve": false,
    // 指定路径别名，相对于 baseUrl 选项的路径，目的时避免写太长的相对路径
    "paths": {
      "@/*": ["src/*"],
      "utils/*": ["src/utils/*"]
    },
    // 是否支持导入 json 文件，默认 false
    // 开启后，可以使用 `import * as data from './data.json'` 语句导入 JSON 文件的数据
    // 若开启 allowSyntheticDefaultImports 选项，则可使用默认导入 `import data from './data.json'`
    "resolveJsonModule": true,
    // 指定根目录，只影响编译后输出文件的目录结构，相当于，根目录内的文件编译后会直接放置到 `outDir` 指定的目录下
    // 默认值为：所有非声明输入文件的最长公共路径，即最外层的非声明文件所在的目录
    // 指定目录时，不能比最外层的非声明文件路径深
    "rootDir": "src",
    // 告诉编译器多个「虚拟目录」实际作为单个根目录
    // "rootDirs": [],
    // 指定要自动加载类型声明文件的根目录，默认为加载当前层级往上所有层级的 `@types/*`
    // 即默认值为：["./node_modules/@types/", "../node_modules/@types/", " ../../node_modules/@types/", ...]
    // 一旦指定，则只会自动在指定的目录中查找声明文件包，不会再去其他任何目录查找，哪怕是指定为空数组
    // 但 `types` 属性不受 `typeRoots` 影响，`types` 指定的声明文件包依然会去 node_modules/@types/ 中查找
    "typeRoots": ["types"],
    // 指定要自动加载的声明文件包名称，每一个指定的包必须存在，找不到则会报错
    // 默认值为：当前层级及往上的所有层级的 node_modules/@types/ 目录下的所有声明文件包
    // 一旦指定，则只会查找指定的声明文件包，不会再去查找其他任何声明文件包，哪怕是指定为空数组
    "types": [
      "node"
    ],
    /* ↑↑↑↑↑ Modules ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Emit ↓↓↓↓↓ */
    // 是否生成声明文件(`*.d.ts`), 默认值：跟随 `composite` 选项的值
    "declaration": false,
    // 指定生成的声明文件存放目录，默认为 null 会将声明文件与 js 文件一起放置
    // 必须开启 'declaration' 或 'composite' 选项才能设置此选项
    // "declarationDir": "dist/types",
    // 是否为声明文件生成 Source Map ，默认为 false
    // 这将允许 VS Code 等编辑器在使用 Go to Definition 等功能时转到原始 .ts 文件。
    // 使用 project references 时，应该考虑将此选项开启
    "declarationMap": false,
    // 是否将新的迭代语法和方法进行降级处理，默认 false
    // 比如 for of, 展开 ..., 剩余参数 ... 等
    "downlevelIteration": false,
    // 是否在输出文件中写入 byte order mark (BOM) ，默认 false ，通常保持为 false 即可
    "emitBOM": false,
    // 是否只生成声明文件，而不生成 JavaScript 文件，默认为 false
    // 在只想要声明文件或者有其他转移器来生成 JavaScript 时，才需要开启
    "emitDeclarationOnly": false,
    // 是否导入辅助函数，默认 false ，默认情况下，不会从外部导入辅助函数，而是直接将辅助代码侵入编译后的文件中
    // 不开启，会导致大量重复代码侵入不同文件中，开启后，辅助函数将从 `tslib` 包中引入
    // 如果自己另外实现了辅助函数，不想要编译产生辅助函数，可以开启 noEmitHelpers 选项
    "importHelpers": true,
    // 指定只作为类型使用的 import 语句在编译为 JS 文件时应该怎么被处理，默认为 `"remove"` 移除 import 语句
    // remove 直接移除 import 语句， JS 中完全没有 import 语句
    // preserve 生成的 JS 中保留 import 语句，但是是副作用式的 import 语句，就像 `import './module'`
    // error 和 preserve 一样，但在编译时会报错
    // 可以使用 error 来强制显示将 import 语句写为 import type 语句
    "importsNotUsedAsValues": "error",
    // 是否生成行内的 source map 而不是独立的 source map 文件, 默认 false ，此选项与 sourceMap 选项互斥
    "inlineSourceMap": false,
    // 是否在 JS 中生成行内的 TS 源码，默认 false ，前提须开启 sourceMap 或 inlineSourceMap 二者之一
    "inlineSources": false,
    // 指定一个额外放置 source map 文件的地址，前提须开启 'sourceMap' 或 'declarationMap' 二者之一
    // "mapRoot": "https://my-website.com/debug/sourcemaps/",
    // 指定要使用的行尾格式，可选 lf | crlf ，默认跟随系统平台而定
    // "newLine": "lf",
    // 是否让编译器不生成任何文件，包括 JS, Source Map, 声明文件等
    // 开启此选项后，相当于将 TypeScript 仅用作编辑器类型提示工具，以及类型校验工具。而不使用 TypeScript 进行编译
    "noEmit": false,
    // 是否不需要生成辅助函数导入，默认 false ，如果自己已有全局作用域下的辅助函数实现，则可以开启此选项
    "noEmitHelpers": false,
    // 是否在 TS 发现错误时，停止编译和输出 JS 文件、声明文件、Source Map 等。默认 false 不停止
    "noEmitOnError": false,
    // 指定文件编译后的输出目录，输出目录结构和源码结构保持一致，如果需要修改目录结构，可以设置 rootDir 选项
    // 默认不指定，生成的 JS 文件将和 TS 源文件在同一目录中
    "outDir": "dist",
    // 指定输出文件名，所有全局(非模块化)的代码都将编译到此文件中，仅在 module 选项值为 `None | System | AMD` 时使用
    // 此选项不能用于打包 CommonJS 或 ES6 模块
    // "outFile": "",
    // 是否在编译输出文件中保留声明的 枚举 变量，默认 false 移除枚举变量，将枚举引用编译为字面量值
    // 开启此选项后，枚举变量的声明语句将被保留。
    "preserveConstEnums": true,
    // 是否保留未使用的值导入语句，默认 false 不保留，不会影响未使用的类型导入语句被移除
    "preserveValueImports": false,
    // 是否在编译为 JS 代码时移除注释，默认 false
    "removeComments": false,
    // 是否生成 Source Map 文件，用于调试运行 JavaScript 时可以定位到源代码
    // 开启后，将生成 `.js.map` 或 `.jsx.map` 文件，并在 JS 代码的最后添加注释，表示对应 Source Map 文件的位置
    "sourceMap": false,
    // 指定存放 TS 源码的位置，前提必须开启 inlineSourceMap 或 sourceMap 二者之一
    // 比如，指定 index.js 文件的 TS 源码位置为 https://my-website.com/debug/source/index.ts
    // "sourceRoot": "https://my-website.com/debug/source/"
    // 是否不要为 JSDoc 注释中具有 `@internal` 注释的代码生成声明文件，默认 false
    // 此选项只影响输出的声明文件，这是一个内部编译器选项，使用有风险，因为编译器不会检查结果是否有效
    // 如果需要处理 `.d.ts` 文件中的可见性级别，请查看 @microsoft/api-extractor 工具
    "stripInternal": false,
    /* ↑↑↑↑↑ Emit ↑↑↑↑↑ */

    /* ↓↓↓↓↓ JavaScript Support ↓↓↓↓↓ */
    // 是否允许导入 js 文件，默认为 true, 允许导入 js 文件，导入内容将会是 any 类型
    // 此规则实际上表示：是否允许导入无声明的 JS 文件，有对应声明文件的 JS 文件不会报错
    "allowJs": false,
    // 是否允许 TS 检查 JS 代码，默认 false， 需开启 allowJs 选项
    "checkJs": false,
    // 在 node_modules 下搜索和加载 JavaScript 文件的最大依赖深度，默认为 0 表示不推断 JS 的类型
    // 开启 allowJs 选项后，此选项才会生效，开启后可以为 node_modules 中的所有 JavaScript 推断类型。
    // 通常应保持默认值 0 ，因为应该显示为 JS 文件提供一个声明文件，而不是让 TS 去推断 JS 的类型。
    "maxNodeModuleJsDepth": 0,
    /* ↑↑↑↑↑ JavaScript Support ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Editor Support ↓↓↓↓↓ */
    // 是否禁用 TS 内存占用限制，默认为 true 表示开启 TS 内存限制
    "disableSizeLimit": false,
    // 指定编辑器要使用的插件列表
    // VS Code 有能力让一个扩展自动包含语言服务插件，所以运行一些插件不需要在 tsconfig.json 中定义它们。
    // "plugins": [],
    /* ↑↑↑↑↑ Editor Support ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Interop Constraints ↓↓↓↓↓ */
    // 是否允许 TS 自动为没有默认导出的模块合成一个默认导出
    // 默认值：`module` 值为 `system` ，或 `esModuleInterop` 和 `module` 都不为 `es6/es2015` 或`esnext` 时，默认 true
    "allowSyntheticDefaultImports": true,
    // 是否启用 TS 对待 ES Module 和 CommonJS/AMD/UMD 模块的差异化修复，默认 false
    // 开启此选项将会自动开启 allowSyntheticDefaultImports 选项
    "esModuleInterop": true,
    // 是否开启导入模块文件名大小写敏感，默认 false ，推荐设为 true 开启
    "forceConsistentCasingInFileNames": true,
    // 是否开启隔离模块功能，默认 false ，开启此选项需要同时开启 preserveConstEnums 选项
    // 当使用其他编译器(如 Babel)来编译 TS 代码时，这些编译器只能一次操作一个文件，如果这个文件有一些全局引用，这些编译器无法理解
    "isolatedModules": true,
    /* ↑↑↑↑↑ Interop Constraints ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Backwards Compatibility ↓↓↓↓↓ */
    // 【已废弃】手动指定文件字符编码，已废弃，TS 现在会自动检测字符编码
    // "charset": "utf8",
    // 【已废弃】是否让 `keyof` 操作符对字符串索引签名返回 `string` 而不是 `string | number`，默认 false
    // 推荐不使用此选项或保持默认 false ，只需要 string 时可以显示使用 Extract<keyof T, string> 来获取
    // "keyofStringsOnly": false,
    // 是否禁用隐式的 "use strict;" 严格模式，默认 false ，推荐不使用此选项
    // "noImplicitUseStrict": false,
    // 是否禁用严格的泛型检查，默认 false ，推荐不使用此选项
    // "noStrictGenericChecks": false,
    // 【已废弃】用 outFile 选项代替，保留这个选项只是为了向后兼容
    // "out": "dist",
    // 是否禁止 TS 对多余属性报错，不推荐使用此选项，实在需要时使用 @ts-ignore 处理，
    // 此选项只是 TS 1.6 中为了人们方便迁移到严格检查而添加的编译选项
    // "suppressExcessPropertyErrors": false,
    // 是否禁止 TS 对索引访问为 any 类型的访问报错，不推荐使用此选项，实在需要时使用 @ts-ignore 处理
    // "suppressImplicitAnyIndexErrors": false,
    /* ↑↑↑↑↑ Backwards Compatibility ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Language and Environment ↓↓↓↓↓ */
    // 是否启用对使用 `reflect-metadata` 模块的装饰器发出类型元数据的实验性支持
    // 使用此选项需要先启用 experimentalDecorators 选项
    "emitDecoratorMetadata": true,
    // 是否启用对实验性的装饰器语法的支持，装饰器语法目前还未成为正式的规范
    "experimentalDecorators": true,
    // 指定 TS 对 jsx 代码如何处理，详见 https://www.typescriptlang.org/tsconfig#jsx
    // "jsx": "preserve",
    // 指定转换 jsx 代码时使用的工厂函数，默认为 `React.createElement`
    // "jsxFactory": "React.createElement",
    // 指定 jsx 中 Fragment 使用的工厂函数，默认为 `React.Fragment`
    // "jsxFragmentFactory": "React.Fragment",
    // 指定 jsx 的导入资源，默认为 `react`
    "jsxImportSource": "react",
    // 指定程序要包含的官方内置声明库，默认匹配 `target` 选项值
    // 比如，'DOM' 是包含浏览器的 API ，如果项目不是在浏览器中运行，那就不需要包含 'DOM'
    "lib": [
      "ESNext",
      "DOM"
    ],
    // 指定 TS 怎样检测一个文件是否是模块，默认为 'auto'
    // auto 自动检测，legacy 仅当出现 import/export 语句才当做模块，force 只要不是声明文件都当做模块
    "moduleDetection": "auto",
    // 是否禁用官方内置的声明库，默认 false ，不建议开启此选项
    // 一旦开启， lib 选项将会失效，TS 无法编译任何代码，除非自己提供了全部必须的类型定义
    "noLib": false,
    // 指定 jsx 编译时，从哪个对象调用 createElement 方法，不建议使用此选项，应使用 jsxFactory 选项来设置该功能
    // "reactNamespace": "React",
    // 指定编译输出的代码的ECMA规范版本，默认为 'ES3',
    // 支持 ES3 | ES5 | ES6/ES2015 | ES2016 | ... | ES2022 | ESNext
    "target": "ES5",
    // 是否以新的 ECMA 标准来对待 class 的字段，当 target 为 ES2022 及以上(包括 ESNext) 时默认为 true ，否则默认为 false
    // class 的标准在多年以前就提出，但即将到来的 ECMA 规范有一些不同的运行时的表现
    // "useDefineForClassFields": false
    /* ↑↑↑↑↑ Language and Environment ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Compiler Diagnostics ↓↓↓↓↓ */
    // 是否打印编译诊断，默认 false
    // 开启后，控制台会输出编译详情，包括：文件数，代码行数，内存使用情况，各阶段花费的时间等，是 extendedDiagnostics 打印信息的精简版
    "diagnostics": false,
    // 是否打印文件说明，说明一个文件为什么被 TS 当做项目以及编译流程的一部分，用于调试文件是否被 TS 包含
    "explainFiles": false,
    // 是否打印扩展的（更详细的）诊断信息，包含 diagnostics 选项打印的所有信息，以及更多详细信息
    "extendedDiagnostics": false,
    // 【仅命令行可用】是否在编译时生成 CPU 画像
    // 该文件可以在基于 chromium 的浏览器（如 CPU 分析器部分的 Chrome 或 Edge Developer）中打开
    // "generateCpuProfile": "profile.cpuprofile"
    // 是否打印生成的文件，默认 false
    "listEmittedFiles": false,
    // 是否打印编译的文件，默认 false ，不确定 TypeScript 是否包含期望的文件时，这很有用。
    "listFiles": false,
    /* ↑↑↑↑↑ Compiler Diagnostics ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Projects ↓↓↓↓↓ */
    // 是否开启组合约束，默认 false ，开启后会强制开启几个编译选项，会覆盖这几个选项各自的配置
    "composite": false,
    // 是否禁用所有引用项目的加载，默认 false 不禁用
    // 在多项目 TS 程序中，TS 会将所有可用项目加载到内存中，以便为需要完整知识图的编辑器响应提供准确的结果，例如“查找所有参考”
    // 大型项目中可以开启此选项，默认 false 不禁用
    "disableReferencedProjectLoad": true,
    // 是否禁用解决方案搜索功能，默认 false ，大型项目可以开启此选项
    "disableSolutionSearching": true,
    // 是否禁用引用项目的重定向
    "disableSourceOfProjectReferenceRedirect": true,
    // 是否在编译后生成 .tsbuildinfo 文件，默认值跟随 composite 选项值
    "incremental": true,
    // 指定 .tsbuildinfo 文件的路径及文件名
    "tsBuildInfoFile": ".tsbuildinfo",
    /* ↑↑↑↑↑ Projects ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Output Formatting ↓↓↓↓↓ */
    // 是否在错误消息太长时，不显示省略号，而是完整显示错误消息，默认 false 表示会截断
    "noErrorTruncation": true,
    // 是否在 watch 模式下，监听到变化时，控制台保留之前的输出信息，而不是清空输出，默认 false 表示会清空
    "preserveWatchOutput": true,
    // 是否开启高亮错误提示和消息提示，默认 true 开启
    "pretty": true,
    /* ↑↑↑↑↑ Output Formatting ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Completeness ↓↓↓↓↓ */
    // 【已废弃】是否跳过对默认库的类型声明文件进行校验，默认 false ，请使用 skipLibCheck 选项代替此选项
    // "skipDefaultLibCheck": true,
    // 是否跳过 lib 的声明文件类型校验，默认 false ，这会提升编译速度，但会牺牲一些类型准确性
    "skipLibCheck": true,
    /* ↑↑↑↑↑ Completeness ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Command Line ↓↓↓↓↓ */
    // 暂无选项
    /* ↑↑↑↑↑ Command Line ↑↑↑↑↑ */

    /* ↓↓↓↓↓ Watch Options ↓↓↓↓↓ */
    // 是否假定文件的变更仅会影响直接依赖，默认 false ，开启后，TS 仅重新检查/重建已更改的文件以及直接导入它们的文件
    "assumeChangesOnlyAffectDirectDependencies": true
    // 指定监听文件变更的方式，默认 "useFsEvents" 尝试使用操作系统/文件系统的本机事件进行文件更改
    // 更多可选值详见 https://www.typescriptlang.org/tsconfig#watch-watchFile
    // "watchFile": "useFsEvents",
    // "watchDirectory": "useFsEvents"
    /* ↑↑↑↑↑ Watch Options ↑↑↑↑↑ */
  }
  // 仅用于 JS 项目的配置
  // "typeAcquisition": {
  //   "enable": false,
  //   "include": [],
  //   "exclude": [],
  //   "disableFilenameBasedTypeAcquisition": false
  // }
}

```
