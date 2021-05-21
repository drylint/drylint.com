# ESLint Configuration

[toc]

## 开始配置

### Configuration Comments 通过注释配置

使用注释把配置信息直接嵌入到一个代码源文件中

### Configuration Files 通过配置文件配置

#### Configuration File Formats 配置文件格式

ESLint 支持几种格式的配置文件：

- JavaScript - 使用 `.eslintrc.js` 然后输出一个配置对象。
- JavaScript (ESM) 在 JavaScript 包中运行 ESLint 时使用 `.eslinrc .cjs`，这些包中指定了 `'type':'module'`。注意，目前 ESLint 不支持 ESM 配置。
- YAML - 使用 `.eslintrc.yaml` 或 `.eslintrc.yml` 去定义配置的结构。
- JSON - 使用 `.eslintrc.json` 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
- (弃用) - 使用 `.eslintrc`，可以是 JSON 也可以是 YAML。
- package.json - 在 `package.json` 里创建一个根属性 `eslintConfig` ，在那里定义你的配置，ESLint 插件会自动查找并读取此属性的值作为配置。

当同级目录存在多种配置文件时，仅优先级高的生效，优先级低的忽略，优先级如下：

1. `.eslintrc.js`
2. `.eslintrc.cjs`
3. `.eslintrc.yaml`
4. `.eslintrc.yml`
5. `.eslintrc.json`
6. `.eslintrc`
7. `package.json`

#### Configuration Cascading and Hierarchy 配置级联和层次结构

当一个项目下，除了根目录有配置文件，有些子目录中也有配置文件时，对一个文件的检测会优先使用最近的配置文件。

子目录中有配置文件时，会合并使用子目录的配置文件，以及依次往上查找到的优先级最高的配置文件，当配置属性有冲突时，最近的配置文件优先级最高。所以，一个项目中可以有项目级配置和目录级配置。

当项目根目录同时拥有 `.eslintrc.*` 配置文件和 `package.json` 的 `eslintConfig` 属性时， 将只会使用 `.eslintrc.*` 配置文件， `package.json` 的 `eslintConfig` 属性不会被读取。

例一：

```bash
project
├── .eslintrc
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```

- `project/lib/source.js` 将会使用 `project/.eslintrc` 配置
- `project/tests/test.js` 将会使用 `project/tests/.eslintrc` + `project/.eslintrc` 配置，并且在有冲突时以 `project/tests/.eslintrc` 为准。

例二：

```bash
project
├── package.json # 文件内包含 eslintConfig 属性
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```

- `project/lib/source.js` 将会使用 `project/package.json` 的 `eslintConfig` 属性配置
- `project/tests/test.js` 将会使用 `project/tests/.eslintrc` + `project/package.json` 配置，并且在有冲突时以 `project/tests/.eslintrc` 为准。

例三：

```bash
project
├── .eslintrc
├── package.json # 文件内包含 eslintConfig 属性
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```

- 项目根目录同时拥有 `.eslintrc.*` 配置文件和 `package.json` 的 `eslintConfig` 属性，只会使用优先级高的 `.eslintrc.*` 配置
- `project/lib/source.js` 将会使用 `project/.eslintrc` 配置
- `project/tests/test.js` 将会使用 `project/tests/.eslintrc` + `project/.eslintrc` 配置，并且在有冲突时以 `project/tests/.eslintrc` 为准。

默认情况下，ESLint 会一直往祖先目录查找配置文件，并使用所有高优先级配置文件的配置，但有时不希望有这种情况，可以使用根属性 `root` 来告诉 ESLint 当前是否是根配置，不要再往上级目录查找了。

```js
module.exports = {
  root: true,
}
```

## `root` 当前配置是否是根配置

`type: boolean`

`default: false`

```js
module.exports = {
  root: true,
}
```

告诉 ESLint 不要再往上级目录查找，利用此属性配置，项目级和目录级的配置都可以不受上级目录以及祖先目录的配置影响。通常项目根目录应该设置为 `true`。

完整的配置层次结构，从最高优先级到最低优先级如下:

- 行内配置（最高）：
  - `/*eslint-disable*/` and `/*eslint-enable*/`
  - `/*global*/`
  - `/*eslint*/`
  - `/*eslint-env*/`
- 命令行配置（其次）:
  - `--global`
  - `--rule`
  - `--env`
  - `-c`, `--config`
- 项目级配置（最低）:
  - 同目录下的 `.eslintrc.*` 或 `package.json`
  - 继续往上往祖先目录查找，直到找到系统根目录或拥有 `root === true` 的配置文件

## `parserOptions` 解析器配置项

`type: object`

`default: 见各属性默认值`

### `ecmaVersion` 指定 ECMAScript 版本，默认 `5`

`type: number`

`default: 5`

可以设置为版本数字或版本年份，比如 `6 | 7 | 2017 | 2020`。

请注意支持 ES6 语法也不代表 ESlint 能识别 ES6 中新的全局变量，比如 `Set`。

也就是说，设置了 `parserOptions.ecmaVersion === 6` 仅表示支持 ES6 语法，若要支持 ES6 的全局变量还需要设置 `env.es6 === true` ，当然，设置了 `env['es6'] === true` 之后其实也自动启用了 ES6 语法。

### `sourceType` 指定源码类型是 script (默认) 还是 module 类型

`type: string`

`default: 'script'`

如果代码使用的是 ES 模块(ECMAScript Module)， 则设置为 `'module'`。

### `ecmaFeatures` 指定使用的额外的语言特性，所有选项默认 `false`

#### `globalReturn` 是否允许在全局作用域下使用 return 语句，默认 `false`

#### `impliedStrict` 当 `parserOptions.ecmaVersion >= 5` 时，是否启用全局 strict mode

#### `jsx` 是否启用 JSX

请注意，支持 JSX 语法不代表支持 React 。 React 对 JSX 应用了特定的语义以至于 ESLint 无法识别。

如果您正在使用 React 并且希望 ESLint 识别 React 语义，我们建议使用 `eslint-plugin-react`。

#### `experimentalObjectRestSpread` 已弃用，是否支持对象 `rest/spread`

ECMAScript 标准已包括，所以该属性已弃用，通过 `ecmaVersion` 控制

## `parser` 指定解析器，默认 `Espree`

`type: string`

`default: 'Espree'`

ESLint 默认使用 `Espree` 作为解析器，可以任意指定解析器，只要满足以下要求：

- 必须是一个可以从当前配置文件加载的 Node 模块。也就是 npm 安装的解析器包。

- 必须符合解析器接口 ([parser interface](https://eslint.org/docs/developer-guide/working-with-custom-parsers))

注意，即使满足这些条件，也不能保证外部解析器能够正确使用 ESLint ，而且 ESLint 不会修复与其他解析器不兼容的 bug。

将 npm 包名作为 `parser` 属性的值即可。

```js
module.exports = {
  parser: 'esprima',
}
```

与  ESLint 兼容的解析器有：

- `Esprima`
- `Babel-ESLint` 一个对 Babel parser 的包装，使其与  ESLint 兼容
- `@typescript-eslint/parser` 一个将 TypeScript 转换为 ESTree 兼容形式的解析器，所以能够用在 ESLint 中。

注意：使用自定义的解析器时，也需要配置 `parserOptions` 属性，以便于 ESLint 能够正常使用那些默认设置的 ES5 没有的特性，插件会传递 `parserOptions` 给任意解析器，它们可能会或不会使用这些配置来决定开启相应特性。

## `processor` 配置插件提供的处理器

`type: string`

`default: -`

有些插件会提供处理器，处理器可以从一些不是 `.js` 的文件中提取 JavaScript 代码然后再交给 ESLint 来检测。或者处理器可以在预处理中转换 JavaScript 代码以达到某些目的。

属性值为 `插件名/处理器名`，比如：

```js
module.exports = {
  plugins: ['a-plugin'],
  processor: 'a-plugin/a-processor',
}
```

以上配置启用了插件 `a-plugin` 以及插件提供的处理器 `a-processor` 。

也可以仅为指定的某类文件启用处理器：

```js
module.exports = {
  plugins: ['a-plugin'],
  overrides: [
    {
      files: ['*.md'],
      processor: 'a-plugin/markdown',
    },
  ],
}
```

上例中，仅对 `*.md` 文件使用 `a-plugin` 插件提供的处理器 `markdown` 。

处理器可以将那些从非 `.js` 文件中提取出来的 JavaScript 代码生成命名代码块，比如 `0.js`, `1.js` 。 ESLint 会将这些文件当作原始文件的子文件处理，所以可以为这部分提取出来的 JavaScript 指定单独的配置，像这样：

```js
module.exports = {
  plugins: ['a-plugin'], // 使用插件 a-plugin
  overrides: [
    {
      files: ['*.md'], // 匹配所有 .md 文件
      processor: 'a-plugin/markdown', // 用插件的 markdown 处理器处理匹配的文件
    },
    {
      files: ['**/*.md/*.js'], // 匹配所有 .md 文件下的 .js 子文件
      rules: { // 对匹配的子文件应用额外的 rules 代码规则
        'strict': 'off',
      },
    },
  ],
}
```

上例中，针对从 `.md` 文件中提取出来的 JavaScript 代码块，使用了额外的 `rules` 选项来检查这部分代码是否符合规范。

ESLint 检查指定的代码块路径（上例中是 `'**/*.md/*.js'`）是否有匹配项，并忽略那些不匹配的代码块路径，所以如果想要使用 ESLint 来检测那些从非 `.js` 文件中提取出的代码块，一定要给出正确的路径。

## `env` 代码环境，以便于检查是否有预定义的全局变量

`type: object`

`default: {}`

指定源代码所处的环境，以便于 ESLint 知道所使用的全局变量是在这些环境下存在。

比如 browser 下的变量， Node 中不一定有， 反之 Node 中的变量 browser 中也不一定有。还有比如 ECMAScript 新版中有可能增加了一些全局变量，如果不指定，直接在代码中使用，那么 ESLint 就会认为使用了未定义的变量。

所有环境都没有互斥的，所以可以一次定义多个环境。

以下代码配置源代码的环境同时包括浏览器，Node，以及 es2020：

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
}
```

这样，在源代码中使用了这三种环境中的任意全局变量都不会被 ESLint 报错了。

也可以在某文件中以注释来指定当前文件环境：

```js
/* eslint-env browser, node, es2020 */
```

环境列表：

- `browser` 浏览器环境全局变量
- `node` Node.js 全局变量及作用域
- `commonjs` CommonJS 全局变量及作用域 (用于 Browserify/WebPack 打包的仅在浏览器运行的代码)
- `shared-node-browser` Node.js 和 Browser 通用全局变量。
- `es6` 包含 modules 以外的所有 ES6 特性(将会自动设置 `parserOptions.ecmaVersion = 6`)。
- `es2017` 包含所有 ES2017 特性并自动设置 `parserOptions.ecmaVersion = 8`
- `es2020` 包含所有 ES2020 特性并自动设置 `parserOptions.ecmaVersion = 11`
- `worker` web workers 全局变量
- `amd` - defines require() and define() as global variables as per the amd spec.
- `mocha` 包含所有 Mocha 的全局变量
- `jasmine` 包含所有 Jasmine(1.3 & 2.0) 的全局变量
- `jest` Jest 全局变量
- `phantomjs` - PhantomJS 全局变量
- `protractor` - Protractor 全局变量
- `qunit` - QUnit 全局变量
- `jquery` - jQuery 全局变量
- `prototypejs` - Prototype.js 全局变量
- `shelljs` - ShellJS 全局变量
- `meteor` - Meteor 全局变量
- `mongo` - MongoDB 全局变量
- `applescript` - AppleScript 全局变量
- `nashorn` - Java 8 Nashorn 全局变量
- `serviceworker` - Service Worker 全局变量
- `atomtest` - Atom test helper 全局变量
- `embertest` - Ember test helper 全局变量
- `webextensions` - WebExtensions 全局变量
- `greasemonkey` - GreaseMonkey 全局变量

如果想使用来自插件的环境，必须在 `plugins` 数组中指定插件名称，然后使用 `无前缀的插件名称/环境名称` 。

比如，使用 `eslint-plugin-example` 插件提供的自定义环境：

```js
module.exports = {
  plugins: ['example'],
  env: {
    'example/custom': true,
  },
}
```

## `globals` 指定将会用到的全局变量

`type: object`

`default: {}`

如果在一个文件中访问当前文件未定义的变量，配置项 `rules['no-undef']` 将警告使用了未定义的变量。如果访问的变量是自定义的全局变量，但又不存在于在指定的 `env` 环境中，那就需要手动告诉 ESLint 哪些是全局变量，以便于 ESLint 不会报错。

配置项 `globals` 对象的 key 表示全局变量名，value 设置为可写 `'writable'` 或只读 `'readonly'` 。

```js
module.exports = {
  globals: {
    'var1': 'writable',
    'var2': 'readonly',
  },
}
```

以注释的方式指定全局变量

```js
/* global var1: writable, var2: readonly */
```

还可以通过 `globals` 配置项指定要禁用的全局变量，比如指定了 `env.es6 === true` 但是要禁用 `Promise` 时，可以这样设置：

```js
module.exports = {
  globals: {
    'Promise': 'off',
  },
}
```

历史版本中，值可以设置为 `false` 或 `readable` 表示只读，等同于 `'readonly'` 。同样地，`true` 或 `writeable` 表示可写，等同于 `'writable'`。但旧值已被遗弃，不应该再被使用。

## `plugins` 指定要使用的插件

`type: Array<string>`

`default: []`

ESLint 支持第三方插件，使用 npm 安装即可在配置中调用。

ESLint 插件名都是以 `eslint-plugin-*` 开头的，但是在 plugins 中配置时可以省略前缀。

比如，要使用 `eslint-plugin-plugin1` 和 `eslint-plugin-plugin2` 插件：

安装插件：

```bash
npm i -D eslint-plugin-plugin1 eslint-plugin-plugin2
```

在配置文件中使用：

```js
module.exports = {
  plugins: [
    'plugin1',
    'eslint-plugin-plugin2',
  ],
}
```

注意：

- 插件路径是相对于配置文件所在路径进行解析的。也就是说，ESLint 会像用户在配置文件中运行 `require('eslint-plugin-name')` 那样加载插件。

- 通过配置项 `extends` 加载的基本配置文件中有使用 `plugins` 时，加载这些 `plugins` 并不是相对于基本配置文件的，而是相对于 ESLint 进程的工作目录。比如：

  1. 从 `project/.eslintrc.js` 中配置了 `extends: ['eslint-config-foo']`
  2. 在 `eslint-config-foo` 中配置了 `plugins: ['eslint-plugin-bar']`
  3. ESLint 会从 `project/node_modules/` 中或祖先目录中去查找 `eslint-plugin-bar`，而不会从 `project/node_modules/eslint-config-foo/node_modules/` 去查找。因此，配置文件和基本配置中的每个插件都是唯一的。

### 使用插件时的名称约定 (Naming Convention)

对于有或没有作用域的包，都可以省略 `eslint-plugin-` 前缀

#### 直接包含插件时

无作用域的包：

```js
module.exports = {
  plugins: [
    'jquery', // 表示 eslint-plugin-jquery
  ],
}
```

有作用域的包：

```js
module.exports = {
  plugins: [
    '@jquery/jquery', // 表示 @jquery/eslint-plugin-jquery
    '@foobar', // 表示 @foobar/eslint-plugin
  ],
}
```

#### 使用插件提供的 `rules/env/extends` 选项时

- `eslint-plugin-foo` → `foo/a-rule`
- `@foo/eslint-plugin` → `@foo/a-config`
- `@foo/eslint-plugin-bar` → `@foo/bar/a-environment`

比如：

```js
module.exports = {
  plugins: [
    'jquery', // eslint-plugin-jquery
    '@foo/foo', // @foo/eslint-plugin-foo
    '@bar', // @bar/eslint-plugin
  ],
  extends: [
    'plugin:@foo/foo/recommended',
    'plugin:@bar/recommended',
  ],
  rules: {
    'jquery/a-rule': 'error',
    '@foo/foo/some-rule': 'error',
    '@bar/another-rule': 'error',
  },
  env: {
    'jquery/jquery': true,
    '@foo/foo/env-foo': true,
    '@bar/env-bar': true,
  },
}

```

## `rules` 检查代码使用规则

rules 包含大量规则，每条规则都可以配置为如下等级：

- `'off'` 或 `0` 关闭此规则的报告
- `'warn'` 或 `1` 报告为警告提醒信息，不会改变 exit code
- `'error'` 或 `2` 报告为错误信息，报错触发时 exit code 变为 `1`

可以通过注释或者配置文件添加 rules 。比如：

```js
/* eslint eqeqeq: 'off', curly: 'error' */
```

上例配置了 `rules['eqeqeq']` 关闭， `rules['curly']` 报告为错误信息，下例是完全等效的写法：

```js
/* eslint eqeqeq: 0, curly: 2 */
```

当一个规则接收额外的配置项时，可以写成数组的形式，数组第一个元素永远都表示规则警告等级（数字或字符串），额外配置从第二个参数开始配置：

```js
/* eslint quotes: [2, 'single'], curly: 2 */
```

上例配置了 `rules['quotes']` 警告等级为 `2` ，并传入额外配置项 `'single'`

配置后还可以加入配置规则的备注描述信息，方便告诉其他人看到为什么要配置这些规则。

通过连续两个或以上的 `-` 符号分隔开：

```js
/* eslint quotes: [2, 'single'], curly: 2 -- Why add this rule? */

/* eslint quotes: [2, 'single'], curly: 2
--------
Why add this rule?
*/

/* eslint quotes: [2, 'single'], curly: 2
 * --------
 * Why add this rule?
 */
```

通过配置文件写入配置项：

```js
module.exports = {
  rules: {
    'strict': [2, 'safe'],
    'no-var': [2],
    'no-duplicate-imports': [2, {
      includeExports: true
    }],
  },
}
```

如果要配置在插件中定义的规则，写为 `插件名/规则ID` ，比如:

```js
module.exports = {
  plugins: [
    'plugin1'
  ],
  rules: {
    'strict': [2, 'safe'],
    'plugin1/custom-rule': [2],
  },
}
```

同样地，在注释中也可以使用插件提供的规则

```js
/* eslint 'plugin1/custom-rule': [2] */
```

## 通过内联注释禁用规则

### 临时在一段代码中禁用 eslint 插件

```js
/* eslint-disable */

alert('foo')

/* eslint-enable */
```

### 临时在一段代码中禁用指定的规则

```js
/* eslint-disable no-alert, no-console */

alert('foo')
console.log('bar')

/* eslint-enable no-alert, no-console */
```

### 当前文件禁用 eslint

```js
/* eslint-disable */

alert('foo')
```

### 当前文件禁用指定的规则

```js
/* eslint-disable no-alert */

alert('foo')
```

### 针对某一行禁用 eslint

```js
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */
```

### 针对某一行禁用一项指定的规则

```js
alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

alert('foo'); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert('foo');
```

### 针对某一行禁用多项指定的规则

```js
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');
```

以上的所有方法对插件提供的规则同样有效，同样是 `插件名/规则ID`，比如：

```js
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```

和注释启用规则时添加备注信息一样，注释禁用规则也可以添加备注信息，告诉其他人为什么这里要禁用规则，以免其他人不明白。

```js
// eslint-disable-next-line no-console -- Why disable this rules?
console.log('hello');
```

注意：在文件中使用注释禁用警告时，只是告诉 ESLint 不要报告这一部分代码违规了，然而，ESLint 仍然会解析整个文件所有代码，因此即便是禁用了警告的那一段代码，仍然需要是语法有效的 JavaScript 代码。

### 通过配置文件 overrides 配置项，对一组文件禁用规则

```js
module.exports = {
  rules: {
    'no-var': [2],
  },
  overrides: [
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {
        'no-var': [0],
      },
    },
  ],
}
```

上例中，匹配所有文件名结尾为 `-test.js` 和 `*.spec.js` 的文件，对它们单独配置了 `rules` 规则，将 `rules['no-var']` 设置为禁用警告。

### 配置内联注释的行为

#### 禁用内联注释

```js
module.exports = {
  noInlineConfig: true, // 禁用所有内联注释
}
```

#### 报告未使用的 `eslint-disable` 注释

```js
module.exports = {
  reportUnusedDisableDirectives: true, // 报告未使用的 ESLint 禁用注释
}
```

#### Adding Shared Settings

ESLint 支持在配置文件中添加共享设置。您可以将 `settings` 对象添加到 ESLint 配置文件中，它将被提供给每个将要执行的规则。如果您正在添加自定义规则，并希望它们能够访问相同的信息，并且易于配置，那么这可能非常有用。

```js
module.exports = {
  settings: {
    sharedData: 'Hello',
  },
}
```

## `extends` 扩展配置文件

`type: string | string[]`

`default: -`

一个配置文件可以扩展另一个配置文件，`extends` 属性值可以是:

- 字符串，指定配置文件的路径（比如 `'./configs/eslint/index.js'`），或可共享配置的名称（比如 `'eslint: recommendation'`，或`'eslint:all'`）
- 数组，包括多个字符串配置文件或可共享配置名称，数组指定的每一个配置文件扩展它前面的配置。

ESLint 会递归地扩展配置，因此基本配置（被 `extends` 的配置）依然可以有一个 `extends` 属性。但是，不管是哪里出现的 `extends` 属性，相对路径和可共享配置名都是从配置文件出现的位置（通常是项目根目录）解析的。

`rules` 属性可以执行以下任何操作来扩展或覆盖 `rules`:

- 添加额外的规则

- 只改变规则的警告严重级别但不改变配置选项，比如：

  - 基础配置: `'eqeqeq': ['error', 'allow-null']`
  - 派生配置: `'eqeqeq': 'warn'`
  - 实际应用: `'eqeqeq': ['warn', 'allow-null']`

- 完全覆盖继承的规则:

  - 基础配置: `'quotes': ['error', 'single', 'avoid-escape']`
  - 派生配置: `'quotes': ['error', 'single']`
  - 实际应用: `'quotes': ['error', 'single']`

### `extends` 共享配置 `eslint:recommended`

共享配置 `eslint:recommended` 是一组包括了常见问题的核心规则，它包含了 `https://eslint.org/docs/rules/` 这个页面的所有打勾的规则，这个推荐的规则集只会在 ESLint 的主要版本中更改。

```js
module.exports = {
  extends: 'eslint:recommended',
  rules: {
    // 修改或新增其他规则配置
  },
}
```

### `extends` 一个可共享配置包

可共享配置包（sharable configuration）也就是一个 npm 包，这些包命名都是 `eslint-config-*` 这样的，但是在 `extends` 中使用时可以省略 `eslint-config-` 前缀。

比如，使用 `eslint-config-standard` 作为基础配置：

```bash
npm install -D eslint-config-standard
```

```js
module.exports = {
  extends: 'standard', // 或者写全称：eslint-config-standard
  rules: {
    // 修改或新增其他规则配置
  },
}
```

### `extends` 插件（plugin ）提供的配置文件

plugin 也是 npm 包，命名则是 `eslint-plugin-*` 这样的，同样地，在使用的时候也可以省略 `eslint-plugin-` 前缀。

`extends` 属性值可以包括：

- `plugin:`
- npm 包名，比如 `react`
- `/`
- 配置名，比如 `recommended`

```js
module.exports = {
  plugins: ['react']
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'react/no-set-state': 0,
  },
}
```

### `extends` 另一个配置文件

配置文件也可以 `extends` 另一个配置文件，可以是绝对或相对的基础配置文件路径，ESLint 会从加载的配置文件开始解析加载相对路径的配置文件

```js
module.exports = {
  extends: [
    './configs/eslint/PossibleErrors.js',
  ],
  rules: {
    // 修改或新增其他规则配置
  },
}
```

### `extends` 共享配置 `eslint:all`

`extends` 属性值可以是 `'eslint:all'` ，以启用当前安装的 ESLint 版本中的所有核心规则。核心规则集会在 ESLint 的任何大小版本中修改，所以也不建议用在生产环境中。

```js
module.exports = {
  extends: 'eslint:all',
  rules: {
    // 修改或新增其他规则配置
  },
}
```

## Glob 模式配置

### 忽略文件和目录

#### 通过 `ignorePatterns` 配置项忽略文件和目录

```js
module.exports = {
  ignorePatterns: ['temp.js', '**/vendor/*.js'],
}
```

#### 通过 `.eslintignore` 文件忽略文件和目录

可以在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略指定的文件和目录。 `.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。例如，以下将忽略所有的 JavaScript 文件：

```bash
**/*.js
```

当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找 `.eslintignore` 文件。如果发现了这个文件，当遍历目录时，将会忽略指定的文件和目录。一次只有一个 `.eslintignore` 文件会被使用，所以，不是当前工作目录下的 `.eslintignore` 文件将不会被用到。

Globs 匹配使用 node-ignore，所以大量可用的特性有：

- 以 `#` 开头的行被视为注释，不会有任何影响
- 路径相对于当前工作目录为准
- 以 `!` 开头的行为取反模式，但它将会包含前面的行中已忽略的 pattern
- 忽略模式依照 `.gitignore` 规范

路径必须使用正斜杠（`/`），而不能使用反斜杠（`\`）

插件默认拥有的隐式忽略规则：

- `node_modules/`
- 点文件/目录（`.eslintrc.*`除外），以点 `.` 开头的文件或目录

#### 通过 `package.json` 添加根属性 `eslintIgnore`

```bash
"eslintIgnore": ["hello.js", "world.js"]
```
