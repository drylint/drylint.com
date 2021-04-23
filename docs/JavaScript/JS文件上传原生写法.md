# 原生 js 上传文件示例

```js
function easyUpload(){
  var input = document.createElement("input");
  input.type = "file";
  input.click();
  input.onchange = function(){
    var file = input.files[0];
    var form = new FormData();
    form.append("file", file); // 第一个参数是后台读取的请求key值
    form.append("fileName", file.name);
    form.append("other", "666666"); // 实际业务的其他请求参数
    var xhr = new XMLHttpRequest();
    var action = "http://localhost:8080/upload.do"; // 上传服务的接口地址
    xhr.open("POST", action);
    xhr.send(form); // 发送表单数据
    xhr.onreadystatechange = function(){
      if(xhr.readyState==4 && xhr.status==200){
        var resultObj = JSON.parse(xhr.responseText);
        // 处理返回的数据......
      }
    }
  }
}
```
