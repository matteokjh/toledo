---
title: Caster's blog
date: 2018-05-07 1:01:01
tags: vue
categories: vue
---
<!-- more --> 
<small>此贴记录博客开发大大小小的问题</small>
<hr>

#### 1.axios
<a href="https://www.jianshu.com/p/3ab216fa185c">Vue 简书：2.0封装axios笔记</a>
ajax用.
<hr>

#### 2. md-parser
<a href="https://segmentfault.com/a/1190000006730986?utm_source=tuicool&utm_medium=referral">sf:markdown 编译原理</a>

```bash
npm i markdown-it --save # 安装解析器
```

```bash
npm i highlight.js # 高亮
```

```javascript
//引用，高亮
var md = require('markdown-it')({
    highlight: function(str, lang) {
        if(lang && hljs.getLanguage(lang)){
            return hljs.highlight(lang, str).value;
        }
    },
    html: true
});

```
高亮要在前端加：
```html
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">  
    <!--<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>-->
```
后者不需要因为在后台install了highlight.js
<hr>

#### 3. promise
<a href="http://es6.ruanyifeng.com/#docs/promise">阮一峰：Promise对象</a>
<hr>

#### 4.布局

```css
overflow-x: auto; /*水平若超过就显示滚动条*/
```
```htmlbars
<body>
```
<hr>

#### 5. 图片相关
```markdown
![](url) 
```
这种置入方式比较好，但是注意路径，
我的image放在static里，那就写 ‘/static/img/name.png’

<hr>

#### 6.自适应相关
媒体查询




<hr>

## 现存问题：

#### 1. 格式
![](/static/img/blog1.png)
文章开头必须有这个东西。
<hr>

#### 2.tag页以及categories页未完成
<hr>

#### 3.样式等等...
<hr>

以上.