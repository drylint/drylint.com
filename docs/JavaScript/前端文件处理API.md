# 前端文件处理 API

[toc]

本文整理自：

- [文件和二进制数据的操作](http://javascript.ruanyifeng.com/htmlapi/file.html)
- [ArrayBuffer 对象，Blob 对象](https://wangdoc.com/javascript/bom/arraybuffer.html)
- [File 对象，FileList 对象，FileReader 对象](https://wangdoc.com/javascript/bom/file.html)

> 本文所有代码均使用 TypeScript 编写。

历史上，JavaScript 无法处理二进制数据。如果一定要处理的话，只能使用 `charCodeAt()` 方法，一个个字节地从文字编码转成二进制数据，还有一种办法是将二进制数据转成 Base64 编码，再进行处理。这两种方法不仅速度慢，而且容易出错。ECMAScript 5 引入了 `Blob` 对象，允许直接操作二进制数据。

`Blob` 对象是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的 API ，用来操作文件。

浏览器对象模型 (BOM) 中，和文件相关的有以下对象：

- `ArrayBuffer` 对象，表示一段二进制数据，用来模拟内存里面的数据。
- `Blob` 对象：文件对象的基类。
- `File` 对象：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
- `FileList` 对象：`File` 对象的网页表单接口；
- `FileReader` 对象：负责将二进制数据读入内存内容；
- `URL` 对象：用于对二进制数据生成 URL 。

## `ArrayBuffer` 对象

`ArrayBuffer` 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。

这个对象是 ES6 才写入标准的，浏览器提供 `ArrayBuffer()` 构造函数，用来生成实例。它接受一个整数作为参数，表示这段二进制数据占用多少个字节。

```ts
// 实例对象 buffer 占用 8 个字节
const buffer = new ArrayBuffer(8)

// 唯一实例属性 byteLength ，表示当前实例占用的内存长度（单位字节）
console.log(buffer.byteLength) // 8

// 唯一实例方法 slice, 用于复制当前实例的一部分生成一个新的实例
// 两个参数分别为开始和结束，含头不含尾，第二个参数不传默认为实例长度 byteLength
const buffer2 = buffer.slice(0)
// 等同于
const buffer3 = buffer.slice(0, 8)

```

## `Blob` 对象 (Binary Large Object)

`Blob` (Binary Large Object)对象表示一个二进制文件的数据内容，提供了一系列操作接口。

它通常用来读写文件，比如一个图片文件的内容就可以通过 `Blob` 对象读写。

`Blob` 与 `ArrayBuffer` 的区别在于，它用于操作二进制文件，而 `ArrayBuffer` 用于操作内存。

其他操作二进制数据的 API (比如 `File` 对象) ，都是建立在 `Blob` 对象基础上的，继承了它的属性和方法。

生成 `Blob` 对象有两种方法：

- 使用 `Blob` 构造函数 `new Blob()`
- 对现有的 `Blob` 实例对象使用 `Blob.prototype.slice()` 方法切出一部分，切除来的这一部分将会是一个新的 `Blob` 实例对象。

第一种生成 `Blob` 实例的方法：`Blob` 构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是可选的，是一个配置对象，目前只有一个属性 `type` ，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。

`Blob` 构造函数类型定义：

```ts
// Blob 构造函数类型定义
declare var Blob: {
    prototype: Blob;
    new(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};
type BlobPart = BufferSource | Blob | string;

type BufferSource = ArrayBufferView | ArrayBuffer;

interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}

type EndingType = "native" | "transparent";

// Blob 实例类型定义
interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): NodeJS.ReadableStream;
    text(): Promise<string>;
}
```

生成一个 `Blob` 示例：

```ts
// 不传入参数
const blob = new Blob()
console.log(blob) // Blob {size: 0, type: ''}

// 传入空数组
const blob = new Blob([])
console.log(blob) // Blob {size: 0, type: ''}

// 传入字符串数组
const blob = new Blob(['hello'])
console.log(blob) // Blob {size: 5, type: ''}

const blob = new Blob(['hello', 'world'])
console.log(blob) // Blob {size: 10, type: ''}

const blob = new Blob(['hello world'])
console.log(blob) // Blob {size: 11, type: ''}

const blob = new Blob(['hello world'], {
  type: 'text/plain',
})
console.log(blob) // {size: 11, type: 'text/plain'}
```

由此可见，`Blob` 对象有两个只读属性：

- `size`: 二进制数据的大小，单位为字节(Byte)。
- `type`: 二进制数据的 [MIME](https://www.iana.org/assignments/media-types/media-types.xhtml) 类型，全部为小写，如果类型未知，则该值为空字符串。

生成一个 `Blob` 并自动下载到本地：

```ts
// 将一段文本生成一个 Blob 实例
const blob = new Blob(['hello world'])
// 创建一个 `<a>` 元素
const a = document.createElement('a')
// 使用 URL.createObjectURL() 方法对 Blob 实例创建一个可访问的 URL
a.href = URL.createObjectURL(blob)
// 指定文件下载名称
a.download = 'hello-world.txt'
// 执行下载
a.click()
```

如果不需要自动下载，可以将 `<a>` 元素放置在页面上，让用户点击下载。

第二种生成 `Blob` 实例的方法：调用现有 `Blob` 实例的 `slice()` 方法生成一个新的 `Blob` 实例

`slice()` 方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为 `0` ）、结束的字节位置（默认为 `size` 属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。

```ts
// 将下载 Blob 的功能封装为一个函数，第一个参数接收一个 Blob 实例，第二个参数是下载的文件名
const downloadBlob = (blob: Blob, fileName: string) => {
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = fileName
  a.click()
}

const blob = new Blob(['hello world']) // Blob {size: 11, type: ''}
const blob1 = blob.slice(0, 3) // Blob {size: 3, type: ''}
const blob2 = blob.slice(3) // Blob {size: 8, type: ''}

downloadBlob(blob, 'blob.txt') // 下载的 blob.txt 中的内容为： hello world
downloadBlob(blob1, 'blob1.txt') // 下载的 blob1.txt 中的内容为： hel
downloadBlob(blob2, 'blob2.txt') // 下载的 blob2.txt 中的内容为： lo world
```

应用此分割 `Blob` 的功能，可以在上传大文件时，将大文件分割成多个小文件，再将这些小文件各自进行上传。

比如以下函数，第一个参数接收一个 `Blob` 实例，第二个参数接收一个上传的异步函数，将 `Blob` 实例分割成 1M 大小的块之后再进行上传。

```ts
const uploadBlobSlice = (blob: Blob, uploadFn: (blob: Blob) => unknown) => {
  const BYTES_PER_CHUNK = 1024 * 1024 // 分割出的每个块的大小为 1M
  const SIZE = blob.size

  let start = 0
  let end = BYTES_PER_CHUNK

  while (start < SIZE) {
    uploadFn(blob.slice(start, end))
    start = end
    end = start + BYTES_PER_CHUNK
  }
}
```

在 Ajax 请求中，如果 `xhr.responseType` 设为 `'blob'` ，接收的响应结果就是二进制数据。

## `File` 对象

`File` 对象代表一个文件，用来读写文件信息。它继承了 `Blob` 对象，或者说是一种特殊的 `Blob` 对象，所有可以使用 `Blob` 对象的场合都可以使用它。

最常见的使用场合是表单的文件上传控件（`<input type="file">`），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 `File` 实例对象。

```ts
// <input id="fileItem" type="file">
const input = document.getElementById('fileItem') as HTMLInputElement
const file = input.files?.[0]
if (file) {
  console.log(file instanceof File) // true
}
```

`File` 构造函数：

浏览器原生提供一个 `File`构造函数，用来生成 `File` 实例对象。

`File` 构造函数类型定义：

```ts
// `File` 构造函数类型定义
declare var File: {
    prototype: File;
    new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

type BlobPart = BufferSource | Blob | string;

interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
}

interface BlobPropertyBag {
    endings?: EndingType;
    type?: string;
}

type EndingType = "native" | "transparent";

// File 实例对象类型定义
interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
    readonly webkitRelativePath: string;
}

interface Blob {
    readonly size: number;
    readonly type: string;
    arrayBuffer(): Promise<ArrayBuffer>;
    slice(start?: number, end?: number, contentType?: string): Blob;
    stream(): ReadableStream;
    text(): Promise<string>;
}

```

由类型定义可以看出，`File` 构造函数接受三个参数。

- 第一个参数，一个数组，成员可以是二进制对象或字符串，表示文件的内容。
- 第二个参数，字符串，表示文件名或文件路径。
- 第参个参数，配置对象，设置实例的属性。该参数可选。

第三个参数配置对象，可以设置两个属性。

- `type` 属性：字符串，表示实例对象的 MIME 类型，默认值为空字符串。
- `lastModified` 属性：时间戳，表示上次修改的时间，默认为 `Date.now()`。

生成一个文件实例：

```ts
// 生成一个空文件，没有内容
const file1 = new File([], 'file1.txt')

console.log(file1)
/*

lastModified: 1652252409455
name: "file1.txt"
size: 0
type: ""
webkitRelativePath: ""

*/

const file2 = new File(['hello world'], 'file2.txt', {
  type: 'text/plain',
})

console.log(file2)
/*

lastModified: 1652252420420
name: "file2.txt"
size: 11
type: "text/plain"
webkitRelativePath: ""

*/
```

`File` 实例对象有以下实例属性：

- `File.lastModified`: 最后修改时间，以时间戳表示
- `File.name`: 文件名或文件路径
- `File.size`: 文件大小 (单位字节 Byte)
- `File.type`: 文件的 MIME 类型

文件实例属性中，有一个被废弃的属性 `lastModifiedDate`, 是 `Date` 类型 表示的是最后修改的时间，现在使用数字类型的属性 `lastModified` 时间戳来表示最后修改时间。

还有就是，`webkitRelativePath` 属性是非标准属性。

`File` 对象没有自己的实例方法，但由于继承了 `Blob` 对象，因此可以使用 `Blob` 的实例方法 `slice()`。

## `FileList` 对象

`FileList` 对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 `File` 实例。

`FileList` 类型定义：

```ts
interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}
```

它主要出现在两个场合：

- 文件控件节点（`<input type="file">`）的 files 属性，返回一个 `FileList` 实例。
- 拖拉一组文件时，目标区的 `event.dataTransfer.files` 属性，返回一个 `FileList` 实例。

```ts
// <input id="fileItem" type="file">
const input = document.getElementById('fileItem') as HTMLInputElement
const { files } = input
if (files) {
  // 文件控件的 files 属性是一个 FileList 实例对象
  console.log(files instanceof FileList) // true
}
```

`FileList` 的实例属性主要是 `length`，表示包含多少个文件。

`FileList` 的实例方法主要是 `item()` ，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。但是，由于 `FileList` 的实例是一个类似数组的对象，可以直接用方括号运算符，即 `myFileList[0]` 等同于`myFileList.item(0)`，所以一般用不到 `item()` 方法。

## `FileReader` 对象

`FileReader` 对象用于读取 `File` 对象或 `Blob` 对象所包含的文件内容。

浏览器提供一个 `FileReader` 构造函数，用来生成 `FileReader` 实例对象。

```ts
const reader = new FileReader()
```

类型定义：

```ts
// FileReader 构造函数类型定义
declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
};

// FileReader 实例对象类型定义
interface FileReader extends EventTarget {
    readonly error: DOMException | null;
    onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onloadstart: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null;
    readonly readyState: number;
    readonly result: string | ArrayBuffer | null;
    abort(): void;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
    addEventListener<K extends keyof FileReaderEventMap>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof FileReaderEventMap>(type: K, listener: (this: FileReader, ev: FileReaderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

interface EventTarget {
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

interface DOMException extends Error {
    readonly code: number;
    readonly message: string;
    readonly name: string;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
}

interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly target: T | null;
    readonly total: number;
}
```

`FileReader` 实例对象有以下的实例属性：

- `FileReader.error` 属性：读取文件时产生的错误对象
- `FileReader.readyState` 属性：整数，表示读取文件时的当前状态。一共有三种可能的状态，`0` 表示尚未加载任何数据， `1` 表示数据正在加载， `2` 表示加载完成。
- `FileReader.result` 属性：读取完成后的文件内容，有可能是字符串，也可能是一个 `ArrayBuffer` 实例。
- `FileReader.onabort` 方法：`abort` 事件（用户终止读取操作）的监听函数，当读取中断或调用 `reader.abort()` 方法时触发。
- `FileReader.onerror` 方法：`error` 事件（读取错误）的监听函数，读取出错时触发。
- `FileReader.onload` 方法：`load` 事件（读取操作完成）的监听函数，读取成功后触发。通常在这个函数里面使用 result 属性，拿到文件内容。
- `FileReader.onloadstart` 方法：`loadstart` 事件（读取操作开始）的监听函数，读取将要开始时触发。
- `FileReader.onloadend` 方法：`loadend` 事件（读取操作结束）的监听函数，读取完成后触发，不管是否成功。触发顺序排在 `onload` 或 `onerror` 后面。
- `FileReader.onprogress` 方法：`progress` 事件（读取操作进行中）的监听函数，读取过程中周期性触发。

常见的一个场景，读取文件选择控件中用户选中的一个文件：

```ts
// <input type="file" onchange="onChange(event)">

const onChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const fileList = input.files
  if (fileList?.length) {
    const file = fileList[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      console.log(reader.result)
    })
    reader.readAsText(file)
  }
}
```

`FileReader` 实例对象有以下实例方法：

```ts
// FileReader 实例方法类型定义：
abort(): void;
readAsArrayBuffer(blob: Blob): void;
readAsBinaryString(blob: Blob): void;
readAsDataURL(blob: Blob): void;
readAsText(blob: Blob, encoding?: string): void;
```

读取文件的实例方法均接收 `Blob` 对象或 `File` 对象作为第一个参数，它们均是异步方法，在读取文件完成后会触发实例对象的 `onload` 事件，在 `onload` 方法中访问实例对象的 `result` 属性来获取读取结果。

- `FileReader.abort()`：终止读取操作， `readyState` 属性将变成 `2` 。
- `FileReader.readAsArrayBuffer()`：以 `ArrayBuffer` 的格式读取文件，读取完成后 result 属性将返回一个 `ArrayBuffer` 实例，这个实例是一个 类型化数组，即固定长度的二进制缓存数据。在文件操作时（比如将 JPEG 图像转为 PNG 图像），这个方法非常方便。
- `FileReader.readAsBinaryString()`：可以读取任意类型的文件，读取完成后，`result` 属性将返回原始的二进制字符串，该字符串每个字节包含一个 0 到 255 之间的整数。这个方法与 `XMLHttpRequest.sendAsBinary` 方法结合使用，就可以使用 JavaScript 上传任意文件到服务器。
- `FileReader.readAsDataURL()`：读取完成后，`result` 属性将返回一个 Data URL 格式(Base64 编码)的字符串，代表文件内容。对于图片文件，这个字符串可以用于 `<img>` 元素的 `src` 属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀 `data:*/*;base64,` 从字符串里删除以后，再进行解码。
- `FileReader.readAsText()`：用于读取文本文件，读取完成后，`result` 属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 `Blob` 实例，第二个参数是可选的，表示文本编码，默认为 `'UTF-8'`。

常见场景之预览选择控件中用户选中的图片：

```ts
// <input type="file" onchange="onChange(event)">
// <img id="preview-img">
const onChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const fileList = input.files
  if (fileList?.length) {
    const file = fileList[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const img = document.getElementById('preview-img') as HTMLImageElement
      img.src = reader.result as string
    })
    reader.readAsDataURL(file)
  }
}
```

监听 `FileReader` 实例对象的错误：

```ts
const reader = new FileReader()

reader.addEventListener('error', e => {
  const error = e.target?.error
  switch (error?.code) {
    case error?.NOT_FOUND_ERR:
      console.log('文件未找到！')
      break
    // ...other cases
    default:
      break
  }
})
```

监听 `FileReader` 实例对象读取文件的的进度：

```ts
const reader = new FileReader()

reader.addEventListener('progress', e => {
  if (e.lengthComputable) {
    const { loaded, total } = e
    const percentLoaded = Math.round((loaded / total) * 100)
    console.log(`当前读取进度：${percentLoaded}%`)
  }
})
```

显示用户拖拽和粘贴的图片：

```ts
// <img id="preview-img">
const img = document.getElementById('preview-img') as HTMLImageElement
const reader = new FileReader()
reader.addEventListener('load', () => {
  img.src = reader.result as string
})
// 此写法会失效？ img.addEventListener('dragover', () => false)
img.ondragover = () => false
img.addEventListener('drop', e => {
  e.stopPropagation()
  e.preventDefault()
  const files = e.dataTransfer?.files
  console.log(files)
  if (files) {
    reader.readAsDataURL(files[0])
  }
})

// 监听显示用户粘贴的图片
document.addEventListener('paste', e => {
  const items = e.clipboardData?.items
  if (items) {
    const item = items[0]
    if (item.kind === 'file' && item.type.startsWith('image')) {
      const file = item.getAsFile()
      file && reader.readAsDataURL(file)
    }
  }
  return false
})
```

## `URL` 对象

`URL` 对象用于生成指向 `File` 对象或 `Blob` 对象的 URL 。

`URL` 对象类型定义：

```ts
class URL {
  static createObjectURL(blob: Blob): string;
  static revokeObjectURL(objectUrl: string): void;
  constructor(input: string, base?: string | URL);
  hash: string;
  host: string;
  hostname: string;
  href: string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toString(): string;
  toJSON(): string;
}

class URLSearchParams implements Iterable<[string, string]> {
  constructor(init?: URLSearchParams | string | Record<string, string | ReadonlyArray<string>> | Iterable<[string, string]> | ReadonlyArray<[string, string]>);
  append(name: string, value: string): void;
  delete(name: string): void;
  entries(): IterableIterator<[string, string]>;
  forEach<TThis = this>(callback: (this: TThis, value: string, name: string, searchParams: URLSearchParams) => void, thisArg?: TThis): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string): boolean;
  keys(): IterableIterator<string>;
  set(name: string, value: string): void;
  sort(): void;
  toString(): string;
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}
```

`URL` 对象是一个类，它有两个静态方法，`createObjectURL()` 方法用于对一个 `Blob` 或 `File` 实例对象生成一个 URL ， `revokeObjectURL()` 用于将这个 URL 释放掉，若不主动释放，这个文件将会一直在内存中被引用。

`URL.createObjectURL()` 每执行一次，就会对一个文件生成一个随机 URL 引用，即使是同一个文件，每次也会生成完全不同的 URL 引用。

这个 URL 可以放置于任何通常可以放置 URL 的地方，比如 `<img>` 标签的 `src` 属性。

```ts
const blob = new Blob()
const blobURL = URL.createObjectURL(blob)
const blobURL2 = URL.createObjectURL(blob)
console.log(blobURL) // blob:http://localhost:8081/731047a6-9830-4411-8fed-d7b024dbdeff
console.log(blobURL2) // blob:http://localhost:8081/2aa4cb71-0178-4e9c-9707-63b06e23c370
```

生成的 URL 的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个 URL 就失效。除此之外，也可以手动调用 `URL.revokeObjectURL()` 方法，使 URL 失效。

```ts
URL.revokeObjectURL(blobURL)
URL.revokeObjectURL(blobURL2)
```

浏览器处理 `Blob` URL 就跟普通的 URL 一样，如果 `Blob` 对象不存在，返回 `404` 状态码；如果跨域请求，返回 `403` 状态码。`Blob` URL 只对 `GET` 请求有效，如果请求成功，返回 `200` 状态码。由于 `Blob` URL 就是普通 URL ，因此可以下载。

利用 `URL` 对象，可以实现预览 `input` 控件中选中的图片、视频等，也就可以不再使用 `FileReader` 来生成文件的 Base64 编码格式的 Data URL 了。

```ts
// <input type="file" onchange="onChange(event)">
// <img id="preview-img">
const onChange = (e: Event) => {
  const img = document.getElementById('preview-img') as HTMLImageElement
  const input = e.target as HTMLInputElement
  const fileList = input.files
  if (fileList?.length) {
    img.src = URL.createObjectURL(fileList[0])
  }
}
```
