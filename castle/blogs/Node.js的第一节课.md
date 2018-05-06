---
title: Node.js的第一节课
date: 2017-10-28 16:59:58
tags: Node.js,aaa,bbb,cc
categories: Node.js， php
---
初体验
<!-- more -->
<hr>

>Node.js自带 REPL ---交互式解释器<br>
R for Read<br>
E for Eval <br>
P for Print<br>
L for Loop<br>


### 基本
加载url模块
```javascript
var url = require('url')
```

#### url.parse
```javascript
var a = 'https://coding.net/user?name=matteokjh'
```

```javascript
var a_URL = url.parse(a) //字符串格式化函数
```
返回值
```javascript
> a_URL
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'coding.net',
  port: null,
  hostname: 'coding.net',
  hash: null,
  search: '?name=matteokjh',
  query: 'name=matteokjh',
  pathname: '/user/index.html',
  path: '/user/index.html?name=matteokjh',
  href: 'https://coding.net/user/index.html?name=matteokjh' }
>
```
其中

>protocol：协议<br>
slashes：暂时理解为双斜杠<br>
host：主机<br>
hostname：主机名(域名)<br>
search：‘？’以及后面跟的字符串<br>
query：search去掉问号<br>
pathname：路径名<br>
path：路径 + search<br>
>href：url全称<br>

<hr>

### index.js
介绍基本格式
```bash
$ cat index.js
```
```javascript
// index.js
// 引入模块，类似include
var url = require('url');
var http = require('http');
var PORT = 8088;

//创建服务器
//listen作用是监听当有请求访问localhost:8088的时候 会执行里面的函数
//函数作为参数是JS一大特征，是函数式编程的体现
http.createServer(function(req,res){
    //解析请求
    //使用url模块解析
    var t_url = url.parse(req.url);
    var pathname = t_url.pathname;

    //输出一下
    console.log("Request for "+ pathname + " received. ");
    console.log(t_url);

    //响应部分
    res.writeHead(404,{'Content-type': 'text/html'});
    res.write('No Page!');
    res.end();//发送响应

}).listen(PORT)

console.log(`Server running at http://127.0.0.1:${PORT}/`);
// console.log("Server running at http://127.0.0.1:"+PORT+"/");
```
<hr>

### index.js(续)
文件读取
```javascript
var fs = require('fs'); //File System
```
```javascript
if(pathname ==='/index.html' || pathname==='/'){
    //index.html,重定向
    var data = fs.readFileSync('index.html');//异步读取--readFile为同步
    console.log(data.toString());//此处data为ASCII码格式

    res.writeHead(200,{'Content-type':'text/html'});
    res.write(data);
}else if(pathname.startsWith('/pages')){
    //子页
    var temp = pathname;
    var pos = temp.lastIndexOf('/');
    var filePath = temp.substring(pos+1);

    var data = fs.readFileSync('pages/'+filePath);
    res.writeHead(200,{'Content-type':'text/html'});
    res.write(data);
}else{
    res.writeHead(404,{'Content-type':'text/html'});
    res.write("404 NotFound!");
}
res.end();//发送响应
```
<hr>

### index.js(终)
模板渲染，重定向
```javascript
var ejs = require('ejs'); // Embedded JavaScript(嵌入式JavaScript),为第三方包
var querstring = require('querystring'); // 查询字符串，GET方法内
```
```javascript
if(filePath === 'blog.html'){
    //ejs实例
    var data = fs.readFileSync('pages/'+filePath);
    result = ejs.render(data.toString(),{
        list: blogList
    })//JSON对象

    res.writeHead(200,{'Content-type':'text/html'});
    res.write(result);
}
```

```javascript
if(pathname ==='/addBlog'){
    //按钮提交即刻渲染路由
    var fontData = querstring.parse(t_url.query); 
    //title=aaa&username=admin
    blogList.push(fontData.title);
    res.writeHead(302,{//重定向
        'Location': '/pages/blog.html'
    })
}
```
html部分
```html
<body>
    <p>This is blog.html</p>
    <form action="/addBlog">
        <textarea name="title"></textarea>
        <button type="submit">添加</button>        
    </form>
    <ul>
        <!--ejs模板语法-->
        <% list.forEach(function(e){ %>
        <li><%= e %></li>
        <% }); %>
    </ul>

</body>
```
<hr>
终了.
