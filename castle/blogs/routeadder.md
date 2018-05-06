---
title: routeadder
date: 2018-01-21 21:59:30
tags: vue 
categories: npm packages
---
1.vue简易的前端路由添加器
2.如何发布自己的npm包

<!-- more -->
<hr>

# 1.routeAdder
<small>基于<strong>tplser</strong><strong>then-fs</strong></small>

 平时的vue项目或者demo涉及到多个路由的话就无法避免地需要手动添加组件（*.vue）以及更新路由文件（router/index.js）,
 频繁地这么操作看起来很麻烦，于是就有了routeAdder.
 <a href="https://github.com/matteokjh/routeAdder">routeAdd代码</a>
使用教程在wiki.  
:)

## 核心文件

### router.js-tpl
![](/img/routeadd1.png)
虽然不是我写的但我想说写出来的人是个天才:)
<small>p.s.作者是tplser模板引擎的制作人</small>


### routerGenerator.js

核心思想是“读取 component 目录下的Vue文件并生成路由文件 最后写入到 target 里”
调用了 router.js-tpl.
![](/img/routeadd2.png)
作者同上.

### routeToFile.js

![](/img/routeadd3.png)
![](/img/routeadd4.png)
↑本人写的比较简单的部分.
简而言之就是在components/里生成*.vue文件.

### routeadd.js

![](/img/routeadd5.png)
入口文件，获取输入的变量(路由名称)，包含正则匹配。

## 运行
运行前需要在package.json的script对象加:
```javascript
 "routeadd": "node ./node_modules/routeadd/routeAdd.js" //启动入口文件
```
然后才能运行
```bash
npm run routeadd routeName # routeName为自定义路由名称
```
成功之后应该是：
![](/img/routeadd6.png)
p.s.项目首页路由名称需要是index.

<hr>

# 2.如何发布自己的npm包

### 注册npmjs账号
<a href="https://www.npmjs.com">官网地址</a>
<small>注意邮箱验证!!!</small>

### 打开项目所在位置bash

```bash
npm login # 登陆--密码--邮箱
```

```bash
# registry
npm config set registry http://registry.npmjs.org
# 安装卡住也许是因为没有设置这个（国内被墙所以才卡住的吧）
```

```bash
npm publish # 最后一步
```
finished. 
:)
<hr>