# tsconfig.json

[toc]

运行 `tsc --init` 命令后自动生成的默认配置文件：

```js
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs"
  }
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


#### `allowUmdGlobalAccess`

#### `baseUrl`

#### `module`

#### `moduleResolution`

#### `noResolve`

#### `paths`

#### `resolveJsonModule`

#### `rootDir`

#### `rootDirs`

#### `typeRoots`

#### `types`

### Emit

#### `declaration`

#### `declarationDir`

#### `declarationMap`

#### `downlevelIteration`

#### `emitBOM`

#### `emitDeclarationOnly`

#### `importHelpers`

#### `importsNotUsedAsValues`

#### `inlineSourceMap`

#### `inlineSources`

#### `mapRoot`

#### `newLine`

#### `noEmit`

#### `noEmitHelpers`

#### `noEmitOnError`

#### `outDir`

#### `outFile`

#### `preserveConstEnums`

#### `preserveValueImports`

#### `removeComments`

#### `sourceMap`

#### `sourceRoot`

#### `stripInternal`

### JavaScript Support

#### `allowJs`

#### `checkJs`

#### `maxNodeModuleJsDepth`

### Editor Support

#### `disableSizeLimit`

#### `plugins`

### Interop Constraints


#### `allowSyntheticDefaultImports`

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
