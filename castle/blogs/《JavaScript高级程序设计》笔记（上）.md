---
title: 《JavaScript高级程序设计》笔记（上）
date: 2019-01-13 8:00:00
tags: 读书笔记
categories: js
---
<!-- more --> 

重温高程（前5章）

---

### Chapter 1.简介

born in 1995，区别于Java，是一门动态弱类型语言，虽然与Java一样都是面向对象的语言，但是JS的实现是基于原型的(prototype-based);
> 1.java是强类型且静态，基于类(class)来面向对象；
> 2.动态语言的意思是程序在运行的时候可以改变其结构：新的函数可以被引进，已有的函数可以被删除，类型检查是在运行时做的；（百度百科）
> 3.而Java等作为静态语言其类型是在编译时判断的；

JavaScript = ECMAScript(核心) + DOM(文档对象模型) + BOM(浏览器对象模型)

---

#### ECMAScript

European Computer Manufacturers Association

JavaScript遵循的标准，规定了核心语言功能:

> 1.语法
> 2.类型
> 3.语句
> 4.关键字
> 5.保留字
> 6.操作符
> 7.对象

---

#### DOM

起初针对XML，经过扩展应用于HTML的API，不仅仅服务于JS；

DOM把页面映射为一个多层节点结构,提供访问和操作网页内容的方法和接口；

DOM级别：

> 1.DOM1级：主要是映射文档的结构；
> 2.DOM2级：引入了新模块：视图、始间、样式、遍历和范围；
> 3.DOM3级：引入了统一的加载保存文档的方法Load and Save、新增了验证文档的方法、开始支持XML；

---

#### BOM

提供与浏览器交互的方法和接口；

只处理浏览器窗口和框架，没有标准，不同浏览器有不同实现，共同点就是window和navigator对象等；

---

### Chapter 2. script的引入

```html
<script type='text/javascript' async defer></script>
```
其中async 和 defer 比较少见，
> async: 异步(乱序)下载脚本但不妨碍页面中其他操作，据说是单独开了一个进程执行；
> 
> defer: 放在头部的script标签加这个相当于放在body底部，也是异步下载但是延迟执行；

 noscript 元素指定不支持JS（或者JS被禁用）的浏览器中显示的替代内容；

---

### Chapter 3. 基本概念

#### 标识符
=> 变量、函数、属性的名字

规定第一个字符必须是：字母 或 下划线_ 或 美元符$;

其他字符可以包含数字，不能拿保留字、关键字命名,不然会报Identifier Expected；


#### 严格模式
JS定义的一种不同的解析与执行模型
```javascript
"use strict";
//也可以在函数中：
function a(){
    "use strict";
}
```

### 数据类型

基本(值)类型、引用类型

typeof操作符：

返回值：'undefined'、'boolean'、'string'、'number'、'object'、'function';
```javascript
typeof null; //object
```

#### 1. 值类型
五个：
> 1.Undefined: 声明了但未赋值；
> 2.Null：表示一个空对象指针;
> 3.Boolean: true --- 非0 , false --- 0;
> 4.Number: +0 === -0, 0.1 + 0.2 == 0.3(false),无穷是Infinity,Infinity - Infinity = NaN;
> 4.NaN: 特殊的数值(Number)，用于表示本来要返回数值但未返回的情况；与任何值都不相等;
> 5.String：

isNaN('1') --- false; 
isNaN('a') --- true; 

```javascript
parseInt('123123blue') // 123123;
parseFloat('123blue') // 123;
parseFloat('0xa') // 0; 字符串的16进制；
parseFloat(0xa) // 10; 16进制；
String({}) // [object object]
```

#### 2.引用类型
Object

Object的每个实例都有：

> 1.constructor: 保存构造函数
> 2.hasOwnProperty: 检查是否有某个属性(字符串传参)
> 3.isPrototypeOf: 传入对象是否是当前对象的原型
> 4.toLocaleString: 返回字符串表示，与执行环境的地区相对应
> 5.toString
> 6.valueOf: 返回字符串、数值或布尔值表示

---

### Chapter 4.变量、作用域与内存问题

#### 变量

访问变量可以按值传递或者按引用传递，但是传递函数参数只能按值传递；

向参数传递引用类型的值的时候，会把该值在内存中的地址传给局部变量，所以内部的变化会印象外部；但即便这样，函数参数也还是按值传递:

```javascript
function setName(obj){
    obj.name = 'oobj';
    obj = new Object();
    obj.name = 'newObj';
}
let a = new Object();
a.name = 'a';
setName(a);
console.log(a); //'oobj' 而不是'newObj'
```

typeof 检测基本数据类型比较好用，而检测引用类型只会返object，没办法知道具体类型（如Array），所以用 instanceof 检测具体引用类型较好；

注意，instanceof 操作符只能操作变量（即左边一定要是变量），不能
```javascript
{} instanceof Object; //wrong! 会报错
let a = [];
a instanceof Array; //true

new Array() instanceof Array; //true 但是可以这样
```
另外还要注意，instanceof右边只能是Object，如果不是object会报错：

```javascript
let a; //undefined
a instanceof undefined; //报错！右边不是Object;
```
同时还要注意，instanceof左边的变量也要是Object，不然会报错：
```javascript
let a = 123; //基本值类型Number
a instanceof Number; //false，因为a不是对象；

//但如果这样
let a = new Number(123);
a instanceof Number; //true
```

#### 执行环境上下文
Execution Context , *'最为重要的一个概念'*

每个上下文都有与之关联的 **变量对象**(variable object)

代码在环境中执行的时候，会创建 变量对象 的一个**作用域链**(scope chain)

作用域链保证上下文有序访问它有权访问的所有变量和函数，

作用域链最前端的一定是当前执行的代码所在的环境，最末端的一定是全局对象window；

如果是在函数内，则**活动对象**就是变量对象；

```javascript
var color = 'blue';

function changeColor(){
    console.log(color)
    var color = 'red';
    console.log(color)
}

changeColor(); //undefined , red
```
color未传入函数中，局部变量color未定义所以undefined；


```javascript
var color = 'blue';
function getColor(){
    return color;
}
conosole.log(getColor()) //blue
```

这里return的color在局部未定义，但全局中找到，所以返回blue;

如果没有写var、let声明变量，则变量会自动加到全局；

延长作用域链：try-catch的catch、with; 

#### 垃圾收集

标记清除：变量进入环境、离开环境的时候分别给一个mark；

---

### Chapter 5.引用类型

#### Object

-- 

#### Array

value instanceof Array 的问题在于如果有多个不同的框架内的Array构造函数不一样的话，判断会失准；

解决方案是使用Array.isArray()方法；

sort排序对象的key values：

```javascript
function compare(a,b){
    if(a.num > b.num){
        return 1;
    }else if(a.num < b.num){
        return -1;
    }else return 0;
}
let a = [{num: 1},{num: 3},{num: 2}];

a.sort(compare);
console.log(a); // [{num:1},{num:2},{num:3}]
```

reverse()和sort()都会改变原数组；

一些数组方法：

> 1.转换方法：toString(), valueOf(), toLocaleString();
> 2.栈方法：push()、pop();
> 3.队列方法：shift()、unshift();
> 4.重排序方法：sort()、reverse();
> 5.操作方法：concat()、slice()、splice();
> 6.位置方法：indexOf()、lastIndexOf(); - 一个从前往后，一个从后往前
> 7.迭代方法：every、filter、some、forEach、map；
> 8.归并方法：reduce、reduceRight；一个从前往后，一个从后往前

--

#### Date

```javascript
getFullYear();
getMonth(); //记得加1
getDate();
```

--

#### RegExp

g - global,全局模式，应用于所有字符串而不是找到一个就停止；

i - 不区分大小写模式；

m - 多行模式；

--

#### Function

函数声明有提升，函数表达式没有：

```javascript
console.log(sum(10,10))
function sum(a,b){ //声明
    return a + b;
}
//20
```
```javascript
console.log(sum(10,10))
var sum = function(a,b){//函数表达式
    return a + b;
}
//报错
```

callee 和 caller：

callee是arguments的属性，而caller是函数对象的属性，指向调用当前函数的函数，如果是全局，它的值是null；

函数属性：length、prototype

**call**、**apply**、**bind**：

apply可传入数组，call只能一个一个传；bind创建一个函数实例，其this会绑定传到新函数；

--

#### 基本包装类型

Boolean、Number、String，这三个特殊引用类型对应相应的基本值类型；

trim() - 删除字符串前后缀空格(不改变原字符串)

---

to be continued..
