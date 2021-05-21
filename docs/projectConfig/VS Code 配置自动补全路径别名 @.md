# VS Code 配置自动补全路径别名 @

## Path Intellisense

- 安装 Path Intellisense 插件
- 配置 VS Code 的配置文件 settings.json 加入：

    ```js
      "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src",
        "~@": "${workspaceRoot}/src",
      },
    ```

- 项目根目录创建 `jsconfig.json` 并写入：

    ```js
        {
          "compilerOptions": {
            "target": "es5",
            "baseUrl": "./",
            "paths": {
              "@/*": ["src/*"],
            }
          },
          "exclude": ["node_modules"]
        }
    ```

# Path Autocomplete 插件

配置 VS Code settings.json

```js
    "path-autocomplete.pathMappings": {
        "@": "${folder}/src",
        "~@": "${folder}/src",
    },
```

jsconfig.json

```js
{
  "compilerOptions": {
    "target": "esnext",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
    }
  },
  "exclude": ["node_modules"]
}
```
