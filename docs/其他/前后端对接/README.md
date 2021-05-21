# 前后端对接统一规范

> 本文的约定内容若在实际业务的某些场景中无法遵循，请事先商议并更新此文档。

[toc]

## General 通用部分

名称 | 示例 | 备注
-- | -- | --
Request URL | `/api/xxxx/getUserInfo` | /小写路由/**小驼峰命名**方法 |
Request Method | `POST` | 所有接口统一使用 POST 方法 |
Status Code | `200` | 请求状态统一返回 200 |

## Request Headers 请求头

名称 | 示例 | 备注
-- | -- | --
content-type | `application/json;charset=UTF-8` | 统一使用 json 数据 |
Authorization | `<type> <credentials>` | 见后文详细描述 |

### Authorization 认证授权规范

统一在 HTTP 请求的 Header 头中增加 Authorization 字段，示例如下：
![enter image description here](/tdl/tfl/pictures/202101/tapd_43552441_1611542764_25.png)

- Authorization 代表认证
- Bearer 代表服务器端认证的方式
- signToken 代表包含用户信息的签名Token，一般使用JWT或ReferenceToken。

JS使用示例

```js
var data = JSON.stringify(objcet);
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.setRequestHeader("Authorization", "Bearer signToken");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(data);
```

## Request Payload 请求参数

统一传递 json 对象

示例一：

```json
{
  "id": 123
}
```

示例二：

```json
{
  "number": 123,
  "string": "hello",
  "object": {
    "key": "value"
  },
  "array": [
    "value1",
    "value2"
  ]
}

```

## Response Headers

略

## Response 一般响应说明

在服务器端需要尽量捕获所有错误，并进行统一返回。

参数名 | 参数类型 | 是否必须 | 参数说明
-- | -- | -- | --
`code` | int | 是 | 请求的状态码，默认和 http status 一致，自定义用附件补充
`msg` | string | 是 | 请求返回描述，可返回各种状态的语句，根据 code 判断显示
`isShowMsg` | boolean | 是 | 是否显示弹窗，根据业务需求设置
`data` | string | 是 | 返回数据
`time` | string | 是 | x 位时间戳(待定)

### code 响应的状态码

code | 描述
-- | --
200 | 成功
xxx | ...

### 返回消息体示例

```json
{
  "code": 200,
  "msg": "请求成功",
  "isShowMsg": true,
  "time": "1611305148",
  "data": {
    "id": 0,
    "name": "全部",
    "list": [
      {
        "id": 66,
        "name": "乐山叶儿耙",
        "banner": [
          "https://lsmsmp-1252100135.file.myqcloud.com/uploads/20200922/adeead2235907ee2de2b3ed52c200b0d.叶儿耙.jpg"
        ]
      },
      {
        "id": 67,
        "name": "乐山叶儿耙",
        "banner": [
          "https://lsmsmp-1252100135.file.myqcloud.com/uploads/20200922/adeead2235907ee2de2b3ed52c200b0d.叶儿耙.jpg"
        ]
      }
    ]
  }
}
```

## 其他约定

- 请求及响应字段统一使用**小驼峰**命名，比如 `pageSize` ，第三方的命名保持不变，比如微信 api 中使用的 `access_token` 保持下划线命名方式。

- 请求的字段尽可能与响应的字段保持一致，比如，响应的 `id` ，请求也使用 `id` ，响应的 `userId` ，请求也使用 `userId` 。

- 响应的某些数据不存在时，尽可能返回非 `null` 的数据类型, 比如，对象类型返回空对象 `{}` ，数组类型返回空数组 `[]` ，字符串类型返回空字符串 `''` 。

## 常见场景

### 登录

用户登录统一的请求参数及响应结果。

#### 登录请求参数

参数名| 参数类型 | 是否必须 | 参数说明 |
-- | -- | -- | -- |
`userAccount` | string | 是 | 用户帐号或手机号
`password` | string | 是 | 用户密码或手机动态验证码
`validpassword` | string | 否 | 图片验证码 用于帐号密码登录失败超过限定次数后
`loginWay` | number | 是 | 0 默认为密码登录 1 默认为手机动态码登录

#### 登录响应结果

参数名 | 参数类型 | 是否必须 | 参数说明 |
-- | -- | -- | -- |
`token` | string | 是 |
`tokenType` | string | 是 | Jwt/Refrence
`authType` | string | 是 | 默认值 barer
`expireInSeconds` | number | 是 | 过期时间
`refreshToken` | string | 是 | 刷新Token【待定】

### 分页

长列表分页请求的情况。

#### 分页请求参数

参数名| 参数类型 | 是否必须 | 参数说明 |
---|---|---|---|
page | number | 是 | 当前页
pageSize | number | 是 | 分页大小
condition | objcet | 否 | 查询条件

#### 分页请求示例

```http
GET /api/XYLinkMeetingRoom/pageList HTTP/1.1
Host: localhost:21025
Authorization: Bearer xxxxSignTokenXXXX
Content-Type: application/json
Content-Length: 87

{
  "page": 1,
  "pageSize": 50,
  "condition": {
    "name": "123"
  }
}
```

#### 分页响应结果

参数名| 参数类型 | 是否必须 | 参数说明 |
---|---|---|---|
total | number | 是 | 总数据数
list | array | 是 | 当前页的数据，无数据返回 `[]`

#### 分页响应示例

```json
{
  "code": 200,
  "msg": "",
  "isShowMsg": false,
  "data": {
    "total": 1000,
    "list": [
      {
        "aa": 123,
        "bb": 123
      }
    ]
  }
}

```

## 接口文档使用

暂定使用 [swagger](https://swagger.io/) 进行代码生成，模板还需优化

- 不接受使用 word 等文件方式的接口文档。
