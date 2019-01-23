---
title: Scope & Closure
date: 2019-01-24 23:05:00
tags: js
categories: js
---
<!-- more --> 

作用域链以及闭包.

---

### 1. EC & VO

**执行环境(Execution Context => EC)**

so called '最为重要的概念' in JS高程第三版.

- 定义了变量或函数有权访问的其他数据并决定他们各自的行为.

与之关联，每个EC都有一个**变量对象(Variable Object => VO)**.

EC中定义的所有函数和变量都在VO里；

**全局执行环境**：最外围，在web浏览器中相当于window全局对象，关闭网页或浏览器时销毁；

**函数的执行环境**：函数环境随着代码执行入栈，出栈（环境栈）；

---

### 2. Scope Chain

全局环境中的变量谁都能访问，但是全局作用域++一般情况下++只能访问全局变量；

**作用域链**控制变量的访问权限；

每次进入一个EC，都会创建一条属于当前EC的SC，SC是所有能访问的VO的集合；

最前端当然就是当前EC的VO，就近原则；而最后一个当然也就是全局变量对象；

标识符解析沿着SC一步一步找，最后找到全局都找不到的话就会报错；

**一个经典例子**：
```javascript
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
```
结果是输出1，为什么JS不会顺理成章地输出我们期望看到的2呢？

这是因为JS采用**词法作用域**而非**动态作用域**（如果采用后者就能如愿输出2了）

#### 词法作用域

又称静态作用域；

上面那题的过程是：

1.做预解析，function和变量提升，此时作用域链已经生成；

2.开始执行代码bar();

3.var了value为2（局部），然后执行foo（）；

4.foo中收到console命令，开始在作用域链找value，自己的EC找不到，直接找全局，所以打印1；

看来bar不算是foo的外部函数作用域，所以根本不找bar；

外部函数作用域应该是要嵌套才算，修改代码如下就能够输出2：
```javascript
var value = 1;
function bar(){
    var value = 2
    foo()
    function foo() {
        console.log(value);//2
    }
}
```

---

### 3. Hoisting

提升，有**变量提升**和**函数提升**；

**变量提升**：
```javascript
let a = 'window'
function hoisting(){
    console.log(a);
    var a = 'inside'
}
hoisting(); //undefined
console.log(a); //window
```
虽然console.log在var a前面，但是因为函数的作用域链最前端是函数的活动对象(Active Object)，所以会先找函数内部的a，此时a还未赋值，只是在当前环境里先声明了而已，所以undefined，这就叫作变量提升；

另外一种函数提升大家都很熟悉的啦，就不多说了~

**等等！**

差点忘了说let的特殊情况了：

看看这个就懂了：[var let变量提升引发的思考](https://www.jianshu.com/p/b87d620185f2)

```javascript
let x = 'global'
{
  console.log(x) // Uncaught ReferenceError: x is not defined
  let x = 1
}
```
如果把内部的let改为var，会打印undefined，但是如果是let，则会报错；

并不是因为let不存在变量提升，恰恰相反，**let也是存在变量提升的**！只不过let的提升没有包括变量的**初始化**；

文章里说，var声明的变量，[创建、初始化]两个过程都是提升的，所以console的时候已经初始化为undefined；

function的提升是[创建、初始化、赋值]三个过程都有提升，而let只有创建是提升的，初始化未提升，所以会报错！

遗憾的是我没找到任何能证明console的时候let的变量已经创建了的方法...

---

### 4.Closure

闭包：有权访问另一个函数作用域中的变量的函数（JS高程第三版）；

闭包能提高函数的自由度，灵活性，但也牺牲了性能；



























---

参考文章：

[JavaScript中作用域和作用域链的简单理解（变量提升）](https://www.cnblogs.com/buchongming/p/5858026.html)
[]()
[]()
[]()
[]()
[]()
[]()
[]()
[]()
[]()