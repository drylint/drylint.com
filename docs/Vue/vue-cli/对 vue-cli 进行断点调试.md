# 对 vue-cli 打包过程进行断点调试

[https://blog.csdn.net/connie_1990/article/details/104779602](https://blog.csdn.net/connie_1990/article/details/104779602)

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "serve"
            ],
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
}
```

在这里，我们使用开发工具vscode，工具怎么使用这里就不描述了，直接进入主题。

vue-cli 调试配置

项目准备

下载vue-cli 项目

进入vue-cli\packages@vue\cli 目录，查看cli包文件，执行命令 npm i

配置launch.json

```json
  {
      "type": "node",
      "request": "launch",
      "name": "vue-cli",
      "skipFiles": [
          "<node_internals>/**"
      ],
      "program": "${workspaceRoot}/vue-cli/packages/@vue/cli/bin/vue.js",
      "args": ["create", "hello-world"]
  }
```

这里的效果相当于直接在终端输入命令 vue create hello-world，创建一个hello-world项目。
进入文件vue-cli\packages@vue\cli\lib\create.js，设置断点，运行可以进入断点。

vue-cli-service 调试配置

准备项目

使用vue-cli 创建一个初始项目

vue create hello-world

配置launch.json

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "debug"
            ],
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
}
```

此处采用运行时的方式，因为我们平常调用vue-cli-serve的命令时，通常是使用package.json中的npm run serve，所以这里也是采用通过npm的方式调用，runtimeArgs中的 "run-script"是固定的，不可以修改，"debug"可以修改为任意名称，需要和package.json中的脚本名称对应即可。

配置package.json

```json
    "scripts": {
        "debug": "node --inspect-brk=9229 ./node_modules/@vue/cli-service/bin/vue-cli-service.js serve"
    }
```

scripts 中增加debug命令，–inspect-brk配置的端口需要与launch.json中port保持一致即可。然后点击vscode中的运行，debug窗口中会执行D:\Program Files\nodejs\npm.cmd run-script debug 命令。
然后在./node_modules/@vue/cli-service/bin/vue-cli-service.js 文件中打断点，就可以进入断点了。

其实平常我们运行npm run serve 的命令，实际上系统也是会node_modules.bin中寻找vue-cli-service.cmd来执行，本质上最后还是进入了文件./node_modules/@vue/cli-service/bin/vue-cli-service.js，调试的时候直接进入这个文件即可。
