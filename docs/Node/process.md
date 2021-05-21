# process

## process.argv 与 process.env.npm_config_argv

```bash
npm run build index index2 index3
```

运行文件中打印查看：

```js
console.log(Object.prototype.toString.call(process.argv)) // [object Array]
console.log(Object.prototype.toString.call(process.env.npm_config_argv)) // [object String]

console.log(process.argv)

// process.argv ，类型：[object Array]，将所有命令行的字符串放置于一个数组中

/*

[
  'C:\\Program Files\\nodejs\\node.exe',
  'G:\\codes\\jht\\vue_mpa_mobiles\\node_modules\\@vue\\cli-service\\bin\\vue-cli-service.js',
  'build',
  'index',
  'index2',
  'index3'
]

*/


console.log(process.env.npm_config_argv)

// process.env.npm_config_argv，类型：[object String]，是一个 JSON 字符串

/*
{"remain":["index","index2","index3"],"cooked":["run","build","index","index2","index3"],"original":["run","build","index","index2","index3"]}
*/


console.log(JSON.parse(process.env.npm_config_argv))

/*

{
  remain: [ 'index', 'index2', 'index3' ],
  cooked: [ 'run', 'build', 'index', 'index2', 'index3' ],
  original: [ 'run', 'build', 'index', 'index2', 'index3' ]
}

*/
```
