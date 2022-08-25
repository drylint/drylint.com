# tsconfig.json

[toc]

运行 `tsc --init` 命令后自动生成的默认配置文件：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
    // ...
  },
  "include": [
    // ...
  ]
}

```

## `extends` 指定要继承的另一个配置文件的路径

`type: String`

`default: -`

`version: 2.1`

指定要继承的一个基础配置文件的路径，ts 2.1 版本以上生效。

首先加载要继承的配置文件，然后当前配置文件同名选项会覆盖。

## `files` 指定程序中的文件列表，指定的每一个文件必须存在

`type: Array<string>`

`default: -`

如果未指定 `files` 或 `include` 选项，编译器默认包含当前工作目录以及所有子目录的所有文件，但除了 `exclude` 指定的匹配文件。

当指定了 `files` 后，则就只有被 `files` 指定的文件和 `include` 指定的文件会被编译器包含。

`files` 用于指定一些特定的文件路径，适用于指定少量文件的情况，指定的列表中只要有任何一个文件找不到都会报错。

`include` 用于匹配大量文件，可使用 glob 模式进行指定。

## `include` 匹配程序中包括的文件列表，未匹配到也不会报错

`type: Array<string>`

`default: -`

`version: 2.0`

匹配程序中包含的文件，支持 glob 模式匹配大量文件，未匹配到也不会报错。

如果 glob 模式不包含文件扩展名，则默认只匹配支持的扩展名文件 `.ts`, `.tsx` 和 `.d.ts`，如果 `compilerOptions.allowJs` 设置为 `true`，则还包含 `.js` 和 `.jsx` 。

glob 匹配：

- `*` 匹配 0 个或任意个字符，不包含路径分隔符 `/`
- `?` 匹配 1 个字符，不包含路径分隔符 `/`
- `**/` 匹配任意嵌套深度的目录

## `exclude` 要排除的被 include 匹配到的文件列表

`type: Array<string>`

`default: ["node_modules", "bower_components", "jspm_packages", <outDir>]`

`version: 2.0`

指定要被编译器排除的文件列表，仅对 `include` 包含但 `files` 不包含的那些文件生效。

`files` 指定的文件无法被 `exclude` 排除。

`exclude` 只排除 `include` 匹配的到文件，不会有其他影响。

## `references` 项目引用

`type: Array<{ path: string, prepend: false }>`

`default: -`

项目引用是一种将 TypeScript 程序结构成更小块的方法。使用项目引用可以大大提高构建和编辑器的交互时间，强制组件之间的逻辑分离，并以新的和改进的方式来组织代码。

## `compileOnSave` 是否在保存文件的时候根据 tsconfig.json 重新生成文件

`type: Boolean`

`default: -`

## `compilerOptions` 编译器配置选项

这些选项构成了 TypeScript 配置的主要部分，它涵盖了该语言应该如何工作。

### 类型检查配置项 (Type Checking)

#### ``allowUnreachableCode``是否允许出现死区代码（永远无法执行到达的代码）

`type: boolean | undefined`

`default: undefined`

`Recommended Value: false`

- `undefined` 只警告不报错
- `true` 允许
- `false` 不允许，会报错

#### ``allowUnusedLabels``是否允许未使用标签存在

`type: boolean | undefined`

`default: undefined`

`Recommended Value: false`

- `undefined` 只警告不报错
- `true` 允许
- `false` 不允许，会报错

#### `alwaysStrict`是否在ECMAScript严格模式下解析，并生成 'use strict'

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

#### `exactOptionalPropertyTypes`是否严格校验可选属性的类型

`type: boolean`

`default: false`

`Recommended Value: true`

可选属性默认情况下允许被赋值为 `undefined` ，此选项设为 `true` 后，可选属性必须严格匹配指定的类型，不能被赋值为 `undefined` 。

#### `noFallthroughCasesInSwitch`是否禁止 switch 中出现 fallthrough 的 case 语句

`type: boolean`

`default: false`

`Recommended Value: true`

`switch` 语句中，如果一个 `case` 语句没有 `break`，那这就是 fallthrough case 语句。

#### `noImplicitAny`是否禁止出现隐式的 any 类型

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

本规则只禁用隐式的 `any` 类型，显式指定为 `any` 类型将不会报错。

#### `noImplicitOverride`是否禁止子类隐式覆盖父类的成员

`type: boolean`

`default: false`

`Recommended Value: true`

要求子类覆盖父类成员时，显式标记 `override`，这样，以免父类修改了成员名称，而子类忘记修改，开启此规则后，子类隐式覆盖父类成员时会收到报错。

```ts
class Album {
  setup() {}
}

class MLAlbum extends Album {
  // 显式标记 override
  override setup() {}
}

class SharedAlbum extends Album {
  // 覆盖父类成员，必须显式标记 override
  setup() {}
}
```

#### `noImplicitReturns`是否禁止隐式的函数返回值

`type: boolean`

`default: false`

`Recommended Value: true`

#### `noImplicitThis`是否禁止隐式的 this

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

#### `noPropertyAccessFromIndexSignature`是否禁止从索引签名中用点操作符访问未知属性

`type: boolean`

`default: false`

`Recommended Value: true`

对于索引签名中未知属性的访问，用点操作符 `obj.key` 访问可能会是无意识的一个错误，应该使用 `obj[key]` 来告诉编译器，这是你确定要访问此未知属性。

```ts
interface GameSettings {
  [key: string]: string
  speed: 'fast' | 'medium' | 'slow'
  quality: 'high' | 'low'
}

const settings: GameSettings = {
  speed: 'fast',
  quality: 'high',
}

// OK
console.log(settings.speed)

// OK
console.log(settings.quality)

// OK
// 注意，如果开启了 @typescript-eslint/dot-notation 规则，该规则的 allowIndexSignaturePropertyAccess 需设为 true
console.log(settings['username'])

// 报错：Property 'username' comes from an index signature, so it must be accessed with ['username'].ts(4111)
console.log(settings.username)

```

注意，如果开启了 `@typescript-eslint/dot-notation` 规则，该规则的 `allowIndexSignaturePropertyAccess` 需设为 `true`，否则会有冲突。

#### `noUncheckedIndexedAccess`是否禁用未知的索引签名属性

`type: boolean`

`default: false`

`Recommended Value: true`

访问一个符合索引签名的未知属性，默认情况下此属性就是索引签名指定的类型，但实际上它有可能是不存在的，也就是 `undefined` 类型。

开启此规则后，未知属性除了索引签名指定的类型，还会包括 `undefined` 类型。

```ts
interface GameSettings {
  [key: string]: string
  speed: 'fast' | 'medium' | 'slow'
  quality: 'high' | 'low'
}

const settings: GameSettings = {
  speed: 'fast',
  quality: 'high',
}
// 未开启 noUncheckedIndexedAccess 时，username 为 string 类型’
// 开启 noUncheckedIndexedAccess 时，username 为 string | undefined 类型
const { username } = settings

```

#### `noUnusedLocals`禁止未使用的局部变量

`type: boolean`

`default: false`

`Recommended Value: true`

定义了未使用的局部变量时，将会抛出错误。

#### `noUnusedParameters`禁止未使用的函数参数

`type: boolean`

`default: false`

`Recommended Value: true`

定义了未使用的函数参数时，将会抛出错误。

#### `strict`是否开启 TS 严格模式

`type: boolean`

`default: false`

`Recommended Value: true`

开启此规则后，将默认开启以下所有严格相关的编译选项：

- alwaysStrict
- strictNullChecks
- strictBindCallApply
- strictFunctionTypes
- strictPropertyInitialization
- noImplicitAny
- noImplicitThis
- useUnknownInCatchVariable

#### `strictBindCallApply`是否开启严格的 `.bind`, `.call`, `.apply` 函数调用

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

```ts
function fn(x: string) {
  return parseInt(x);
}

// 未开启 strictBindCallApply 时，第二个参数类型不正确，但不报错
// 开启 strictBindCallApply 后，第二个参数类型不正确而报错
const n = fn.call(undefined, false);
```

#### `strictFunctionTypes`是否开启严格的函数类型检查

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

注意，该检查仅适用于函数，不适用于对象的方法。

```ts
const fn = (x: string): void => {
  console.log(`Hello, ${x.toLowerCase()}`)
}

type StringOrNumberFunc = (numStr: string | number) => void

// 未开启 strictFunctionTypes 时，不会报错
// 开启 strictFunctionTypes 时，会报错，因为函数参数不匹配
const func: StringOrNumberFunc = fn

func('tom')
```

#### `strictNullChecks`是否开启严格的 null 和 undefined 检查

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

#### `strictPropertyInitialization`是否强制类属性必须初始化

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

比如在 `class` 中声明了一个属性，但是没有进行初始化。

#### `useUnknownInCatchVariables`是否默认将 catch 语句的变量上做为 `unknown` 而不是 `any` 类型

`type: boolean`

`default: 同 strict 配置项的值`

`Recommended Value: true`

### 模块相关配置项 (Modules)

#### `allowUmdGlobalAccess` 是否允许访问 UMD 全局变量

`type: boolean`

`default: false`

`Recommended Value: -`

默认没有开启，使用来自 UMD 模块的 `export` 时，需要一个 `import` 声明。

当设置为 `true` 时，TS 将许您从模块文件中访问UMD导出作为全局变量。模块文件是具有导入和/或导出的文件。

#### `baseUrl` 设置模块查找的基础路径

`type: string`

`default: -`

`Recommended Value: "./"(当配置文件位于根目录时)`

设置 TS 解析模块的基础路径，比如

```ts
import main from 'src/main'
```

默认情况下，TS 在解析这个模块时，会去按照绝对路径解析 `src/main` 这个路径，然后就会因为找不到而报错。

将 `baseUrl` 设置为项目的根路径后，TS 就知道 `src/main` 是从设置的根路径位置开始查找，进而就能找到 `src` 目录。

#### `module` 设置程序使用的模块规范

`type: none | commonjs | amd | umd | system | es6/es2015 | es2020 | es2022 | esnext | node12 | nodenext`

`default: "CommonJS"(当 target 设置为 "ES3" 或 "ES5" 时)，其他均为 "ES6"("ES2015")`

`Recommended Value: 无需设置`

CommonJS if target is ES3 or ES5,
ES6/ES2015 otherwise

#### `moduleResolution` 指定模块解析策略

`type: classic | node12(nodenext) | node`

`default: "classic"(当 module 设置为 AMD, UMD, System 或 ES6/ES2015 时)； 当 module 是 node12 或 nodenext 时，默认值相同；否则均为 node`

`Recommended Value: 无需设置`

- `'node'` Node.js 的 CommonJS 规范的实现
- `'node12'` | `'nodenext'` Node.js 的 ECMAScript Module 规范的支持
- `'classic'` TypeScript 1.6 开始使用的模式

#### `noResolve` 是否不在编译之前解析模块

`type: boolean`

`default: false`

`Recommended Value: false`

#### `paths` 设置 TS 系统的路径别名(基于 baseUrl)

`type: Record<string, string[]>`

`default: -`

`Recommended Value: 按需设置`

此设置用于避免在导入模块时使用太长的路径。

比如：

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@": ["src"]
    }
  }
}
```

如上设置就是告诉 TS 在模块导入时遇到 `@` 就表示 `src` 目录，比如：

```ts
import App from 'src/App'

// 可以写为
import App from '@/App'
```

#### `resolveJsonModule` 是否允许解析 json 文件作为模块

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

如果项目需要，可以设置为 `true`。

#### `rootDir` 指定输入文件的根目录来控制 `outDir` 选项的输出目录结构

`type: string`

`default: 根据输入文件列表自动计算`

`Recommended Value: 无需设置`

控制输出文件的目录结构，`rootDir` 指定的目录不会出现在输出结构中(相当于被输出目录替代)，它的所有子文件和子目录会按原有结构输出。

此选项不会影响 include, exclude, 或 files 的设置，也就是不会影响哪些文件会被 TS 编译。

指定的路径应该是包含所有被 TS 编译的文件的，这样编译后才能按结构输出，如果指定的路径没有包含所有被解析的文件，那么不被包含的这些文件就无法按正常目录结构输出。

#### `rootDirs` 指定根路径列表

`type: string[]`

`default: 根据输入文件列表自动计算`

`Recommended Value: 按需设置`

#### `typeRoots` 指定全局声明文件，支持声明文件包或自定义目录

`type: string[]`

`default: 从当前路径往系统根目录查找 node_modules/@types/**`

`Recommended Value: 按需设置`

默认会包含所有层级的 `node_modules` 下的 `@types` 目录中的声明文件包，但如果一旦指定值之后，就只包含指定的包了，不会再包含所有 `@types` 包。

比如：

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

#### `types` 指定全局声明文件包列表，只能是已安装的 `@types/*` 声明文件包

`type: string[]`

`default: 从当前路径往系统根目录查找 node_modules/@types/**`

`Recommended Value: 按需设置`

不支持指定自定义目录路径，只支持指定明确的 npm 安装的声明文件包， 比如 `@types/node` 则指定 `node` 即可。

如果指定的包不存在，则会报错。

默认会包含所有层级的 `node_modules` 下的 `@types` 目录中的声明文件包，但如果一旦指定值之后，就只包含指定的包了，不会再包含所有 `@types` 包。

例如：

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

指定后，则只会包含 `node_modules/@types/` 目录下的 `node`, `jest`, `express` 声明文件包，其他包会被忽略。

### Emit

#### `declaration` 是否生成源码对应的声明文件

`type: boolean`

`default: true(当 composite 为 true 时), 否则为 false`

`Recommended Value: 按需设置`

当和 JavaScript 一起使用 `.d.ts` 文件时，可能还需要设置`emitDeclarationOnly` 或 `outDir` 来确保 JavaScript 文件不会不给覆盖。

#### `declarationDir` 指定源码的哇声明文件的输出目录

`type: string`

`default: -`

`Recommended Value: 按需设置`

#### `declarationMap` 是否开启声明文件源码映射(source map)

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

如果在使用项目引用(project references) 的话，你可能需要启用此功能。

#### `downlevelIteration` 是否开启降级的迭代语法

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

针对 ES6 增加的一些迭代语法，比如 `[a, ...b]`, `fn(...args)` 等，是否开启更精确的降级实现。

#### `emitBOM` 是否生成 BOM(byte order mark)

`type: boolean`

`default: false`

`Recommended Value: 通常为 false 即可`

一些运行时环境需要 BOM 来正确解释 JavaScript 文件，另一些则要求它不存在。

#### `emitDeclarationOnly` 是否只生成 `.d.ts` 声明文件

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

只生成 `.d.ts` 声明文件，而不生成 `.js` 文件。

以下情况会需要开启此配置：

- 你正在使用 TypeScript 之外的一个编译器来生成你的 JavaScript 。
- 你使用 TypeScript 只为了生成 `.d.ts` 声明文件。

#### `importHelpers` 是否导入辅助函数

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

对于某些底层操作，TypeScript 会使用一些辅助函数来进行一些操作，比如扩展运算符以及异步操作等。默认情况下，这些辅助函数代码被插入到使用它们的文件中。如果在许多不同的模块中使用相同的辅助函数，这可能会导致代码重复。

开启此选项后，辅助函数将会替换为使用 `tslib` 模块，需要确保在运行时 `tslib` 模块是可用的。

```ts
//  downlevelIteration 为 true, importHelpers 为 false 时：

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function fn(arr) {
    var arr2 = __spreadArray([1], __read(arr), false);
}
```

```ts
//  downlevelIteration 和 importHelpers 均为 true 时：

import { __read, __spreadArray } from "tslib";
export function fn(arr) {
    var arr2 = __spreadArray([1], __read(arr), false);
}
```

如果要使用自己实现的辅助函数，可以设置 `noEmitHelpers`  选项为 `true`。

#### `importsNotUsedAsValues` 控制类型导入不能被当成值来使用

`type: remove | preserve | error`

`default: "remove"`

`Recommended Value: "error"`

- `remove` 默认值，丢弃只引用了类型的 import 语句

- `preserve` 保留所有 import 语句，即使引用的值或类型未被使用，这可能会导致 import 或 副作用被保留。

- `error`: 保留所有 import 语句 (和 `preserve` 一样), 但当一个导入的值仅仅被用作类型时会报错，如果想要确保没有值被意外的导入时这很有用，但

这个选项之所以存在，是因为 TS 其实支持使用 `import type` 来显式地创建一个永远不应该被生成到 JavaScript 中的 import 语句。

#### `inlineSourceMap` 是否开启内联的源码映射(SourceMap)

`type: boolean`

`default: false`

`Recommended Value: false`

开启此选项后，会将源码映射直接生成到 js 文件中，而不再是生成 `.js.map` 的文件。

源码映射将会在文件底部作为注释存在。

这在某些场景是合适的，比如，想在一个不允许提供 `.map` 文件的 web 服务器上调试 JS 文件时。

#### `inlineSources` 内联源码映射中是否包括源代码

`type: boolean`

`default: false`

`Recommended Value: false`

和 `inlineSourceMap` 的不同之处在于，源码映射的注释中，还多了源代码的内容。

#### `mapRoot` 指定源码映射的路径位置

`type: string`

`default: -`

`Recommended Value: 按需设置`

比如：

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "mapRoot": "https://my-website.com/debug/sourcemaps/"
  }
}
```

#### `newLine` 指定换新行时使用的换行符类型

`type: LF | CRLF`

`default: 跟随系统设定`

`Recommended Value: 无需设置`

指定生成文件时，使用的行结束为 `CRLF`(dos) 或 `LF` (unix)。

#### `noEmit` 是否不生成任何文件和代码

`type: boolean`

`default: false`

`Recommended Value: false`

是否不生成 JS，源码映射，声明文件等。开启此选项，为 Babel 这样的工具腾出空间，让它们来将 TS 代码转换成 JavaScript 。

这样，你就可以只使用  TypeScript 来作为编辑器集成工具，以及源代码的类型检查工具。

#### `noEmitHelpers` 是否不生成运行时辅助函数

`type: boolean`

`default: false`

`Recommended Value: false`

当自己在全局实现了这些辅助函数时，可以设为 true 。

#### `noEmitOnError` 是否在编译遇到错误时不要退出编译

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

控制在编译遇到错误时，是继续编译还是立即退出。

#### `outDir` 编译输出目录

`type: string`

`default: -`

`Recommended Value: -`

设置 TS 编译后生成的 `.js`, `.d.ts`, `.js.map` 等文件的输出目录。

#### `outFile` 指定一个名称，并将所有非模块文件输出到这个文件中

`type: string`

`default: -`

`Recommended Value: -`

如果指定，所有全局(非模块)文件将被连接输出到这个指定的单个文件中。

如果 `module` 选项设置为 `"system"` 或 `"amd"` ，所有的模块文件也会在所有全局内容之后连接输出到这个文件中。

注意: `outFile` 只能在 `module` 选项设置为 `"none"`, `"system"` 或 `"amd"` 时才能使用，当 `module` 选项设置为 `CommonJS` 或 `ES6` 时不能使用。

#### `preserveConstEnums` 是否保留常量枚举

`type: boolean`

`default: 跟随 isolatedModules 选项的值`

`Recommended Value: false`

是否在生成的代码中保留 `const enum` 声明。

在 TS 中，`const enum` 提供了一种方法，生成代码时直接将 `enum` 的值替换掉引用 enum 的地方，来减少应用程序在运行时的总体内存占用。

#### `preserveValueImports` 是否保留 import 但未使用的值

`type: boolean`

`default: -`

`Recommended Value: false`

在有些情况下， TS 无法检测到导入的值是否被引用到，比如：

```ts
import { Animal } from "./animal.js"
eval("console.log(new Animal().isDangerous())")
```

当与 `isolatedModules` 选项结合使用时，导入的如果是类型必须标记为 type-only (仅可作为类型使用)，因为编译器在面对有些 import 语句时，无法知道导入的是未使用的值，还是可以放心删除的类型，以避免运行时崩溃。

比如：

```ts
import { TitleComponent, TitleComponentProps } from "./TitleComponent.js";

import { TitleComponent, type TitleComponentProps } from "./TitleComponent.js";
```

#### `removeComments` 是否在编译时移除注释(忽略注释)

`type: boolean`

`default: false`

`Recommended Value: true`

编译过后的代码，通常不需要注释，所以可以设置为 `true` 。

#### `sourceMap` 是否生成源码映射(source map)

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

开启后， TS 编译为 JS 后，同时会生成一个源码映射文件，源码映射文件通常紧挨着对应的 JS 文件，在 JS 文件的底部同时会有一个注释用来说明源码映射文件的名称及位置。

#### `sourceRoot` 指定源码的位置供 debugger 定位源码使用

`type: string`

`default: -`

`Recommended Value: 按需设置`

例如：

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "sourceRoot": "https://my-website.com/debug/source/"
  }
}
```

上述配置指明了 `index.js` 的源码文件位置时 `https://my-website.com/debug/source/index.ts` .

#### `stripInternal` 移除 JSDoc 中的 @internal 注释

`type: boolean`

`default: false`

`Recommended Value: false`

不要为 JSDoc 注释中有 `@internal` 注释的代码发出声明。

这是一个内部编译器选项，使用的风险由您自己承担，因为编译器不会检查结果是否有效。

如果您正在寻找一种工具来处理 `d.ts` 文件中的额外级别的可见性，请查看 [api-extractor](https://api-extractor.com/)。

### JavaScript Support

#### `allowJs` 是否允许在 TS 中导入 JS 文件

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

启用后，可以用来将 TS 文件增量地添加到原 JS 项目中，允许 `.ts` 和 `.tsx` 文件与现有的 `.js` 文件共存。

#### `checkJs` 是否允许 TS 检查 JS 文件

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

和 `allowJs` 选项一起工作，开启后，相当于在所有 JS 文件顶部添加了 `// @ts-check` 注释，用来要求 TS 检查这个 JS 文件。

#### `maxNodeModuleJsDepth`  在 `node_modules` 下搜索和加载 JS 文件的最大依赖深度

`type: number`

`default: 0`

`Recommended Value: 按需设置`

这个选项只能在 `allowJs` 选项被启用的情况下使用，如果你想在你的 `node_modules` 中让所有的 JavaScript 拥有 TypeScript 推断类型，这个选项就可以开启。

### Editor Support

#### `disableSizeLimit` 是否禁用 TS 占用内存上限控制

`type: boolean`

`default: false`

`Recommended Value: 按需设置`

在处理非常大的 JavaScript 项目时，为了避免可能的内存膨胀问题，TypeScript 会分配一个上限的内存。打开此标志将移除这个限制。

#### `plugins` 编辑器中要运行的语言服务插件列表

`type: string[]`

`default: -`

### Interop Constraints

#### `allowSyntheticDefaultImports` 是否允许合并默认导出

`type: boolean`

`default: true(当module 为 true，或)`

`Recommended Value: 按需设置`

#### `esModuleInterop`

#### `forceConsistentCasingInFileNames`

#### `isolatedModules`

#### `preserveSymlinks`

### Backwards Compatibility

#### `charset`

#### `keyofStringsOnly`

#### `noImplicitUseStrict`

#### `noStrictGenericChecks`

#### `out`

#### `suppressExcessPropertyErrors`

#### `suppressImplicitAnyIndexErrors`

### Language and Environment


#### `emitDecoratorMetadata`

#### `experimentalDecorators`

#### `jsx`

#### `jsxFactory`

#### `jsxFragmentFactory`

#### `jsxImportSource`

#### `lib`

#### `noLib`

#### `reactNamespace`

#### `target`

#### `useDefineForClassFields`

### Compiler Diagnostics

#### `diagnostics`

#### `explainFiles`

#### `extendedDiagnostics`

#### `generateCpuProfile`

#### `listEmittedFiles`

#### `listFiles`

#### `traceResolution`

### Projects


#### `composite`

#### `disableReferencedProjectLoad`

#### `disableSolutionSearching`

#### `disableSourceOfProjectReferenceRedirect`

#### `incremental`

#### `tsBuildInfoFile`

### Output Formatting


#### `noErrorTruncation`

#### `preserveWatchOutput`

#### `pretty`

### Completeness


#### `skipDefaultLibCheck`

#### `skipLibCheck`

### Command Line

### Watch Options

#### assumeChangesOnlyAffectDirectDependencies

#### watchOptions


##### `watchFile`

##### `watchDirectory`

##### `fallbackPolling`

##### `synchronousWatchDirectory`

##### `excludeDirectories`

##### `excludeFiles`

### typeAcquisition

#### `enable`

#### `include`

#### `exclude`

#### `disableFilenameBasedTypeAcquisition`

## 注意事项

支持的 glob 通配符有：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

如果一个glob模式里的某部分只包含 `*` 或 `.*` ，那么仅有支持的文件扩展名类型被包含在内（比如默认 `.ts` ， `.tsx` ，和 `.d.ts` ， 如果  `allowJs` 设置为 `true` 还包含 `.js` 和 `.jsx` ）。

如果 `files` 和 `include` 都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（ `.ts` ,  `.d.ts`  和  `.tsx` ），但排除在 `exclude` 里指定的文件。如果 `allowJs` 被设置成 `true` ，JS文件（ `.js` 和 `.jsx` ）也会被包含进来。

如果指定了 `files` 或 `include` ，编译器则只会将 `files` 和 `include` 指定的文件或目录并包含进来。 使用  `outDir`  指定的目录下的文件永远会被编译器排除，除非你明确地使用 `files` 将其包含进来（这时就算用exclude指定也没用）。

使用 `include` 引入的文件可以使用 `exclude` 属性过滤。 然而，通过  `files` 属性明确指定的文件却无法被排除，不管 `exclude` 如何设置。

如果没有特殊指定，  `exclude` 默认情况下会排除 `node_modules` ， `bower_components` ， `jspm_packages` 和 `<outDir>` 目录。

任何被 `files` 或 `include` 指定的文件所引用的文件也会被包含进来。  `A.ts` 引用了 `B.ts` ，因此 `B.ts` 不能被排除，除非引用它的 `A.ts` 在 `exclude` 列表中。

需要注意编译器不会去引入那些可能做为输出的文件；比如，假设我们包含了 `index.ts` ，那么 `index.d.ts` 和 `index.js` 会被排除在外。

通常来讲，不推荐只有扩展名的不同来区分同目录下的文件。

`tsconfig.json` 文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

在命令行上指定的编译选项会覆盖在 `tsconfig.json` 文件里的相应选项。
