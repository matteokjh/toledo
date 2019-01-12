---
title: CSS布局
date: 2019-01-11 12:25:17
tags: css
categories: css
---
<!-- more --> 

<hr>

<small>重温CSS布局</small>

---

### 1. Grid布局

<div class='grid' style='display:grid;grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; background-color: #fff;width: 300px;height: 300px;grid-column-gap:3px;grid-row-gap:3px;background-image:repeating-linear-gradient(-45deg, #fff, #fff 4px, #eee 4px, #eee 8px) ;'>
    <div style='background-color: #f8b595; background-image:url(/static/img/grid1.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ff6464; background-image:url(/static/img/grid2.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ffdede; background-image:url(/static/img/grid3.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ff8264; background-image:url(/static/img/grid4.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div id='siki' style='background-color: #fb90b7; background-image:url(/static/img/grid5.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ffaa64; background-image:url(/static/img/grid6.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #a2738c; background-image:url(/static/img/grid7.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #fff5a5; background-image:url(/static/img/grid8.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #f47c7c; background-image:url(/static/img/grid9.png);background-repeat:no-repeat;background-size: cover;'></div>
</div>

```css
.grid {
    display:grid;   
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    background-color: #fff;
    width: 500px;
    height: 500px;
    grid-column-gap:3px;
    grid-row-gap:3px;
}
```
fr就是fraction 分数 的意思，表示占用分配空间大小的对应比例，

如果有px跟fr混用，就用width减去px分配的单位再计算fr的比例;

fr加起来如果大于1，就说明肯定能占满width；

但当分配的宽度没占满width的时候，就会有一块多余空间，这时候就涉及到居中等问题了：

```css
.grid {
    display:grid;   
    grid-template-columns: 100px 100px; 
    grid-template-rows: 100px 100px; 
    background-image:repeating-linear-gradient(-45deg, #fff, #fff 4px, #eee 4px, #eee 8px) ;
    width: 400px;
    height: 400px;
    grid-column-gap:3px;
    grid-row-gap:3px;
}
```

以justify-items为例：

水平：

<style type='text/css'>
.grid-wrapper {
    user-select: none;
    position: relative;
    width: 100%;
    height: 400px;
}
.grid > div {
    background-color: #eee;
}

.grid > div div {
    width: 100px;
    height: 100px;
}
.label {
    position: absolute;
    right: 0;
    top: 10px;
    width: 150px;
    text-align: center;
}
.label > div {
    width: 75px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
    margin: 10px 0;
}
</style>

<div class='grid-wrapper'>
    <div class='label'>
        <div id='stretch'><p>stretch</p></div>
        <div id='start'><p>start</p></div>
        <div id='end'><p>end</p></div>
        <div id='center'><p>center</p></div>
    </div>
    <div class='grid' style='
        display:grid;
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        background-image:repeating-linear-gradient(-45deg, #fff, #fff 4px, #eee 4px, #eee 8px) ;
        width: 400px;
        height: 400px;
        grid-column-gap:3px;
        grid-row-gap:3px;
        justify-items: stretch;'
    >
        <div><div style='background-color: #f8b595'></div></div>
        <div><div style='background-color: #ff6464'></div></div>
        <div><div style='background-color: #ffdede'></div></div>
        <div><div style='background-color: #ff8264'></div></div>
    </div>
</div>



```css
.grid {
    justify-items: stretch | start | end | center;
    align-items: stretch | start | end | center;
    align-content: stretch | start | end | center | space-between | space-around | space-evenly;
    justify-content: stretch | start | end | center | space-between | space-around | space-evenly;
}
```
align-items、justify-items和align-content、justify-content的区别：

item是针对网格内的每个元素相对分配给它们的空间如果小了的话，该如何定位；

而content是整个容器的大小如果比分配总空间大，该如何定位；

简而言之就是一个大，一个小；（在flex布局貌似没有justify-items）

---

### 2. Flex布局

<style>
.flex-wrapper {
    display: flex;
    width: 300px;
    height: 300px;
    flex-wrap: wrap;
    user-select: none;
    border: 2px solid #eee;
    border-radius: 5px;
}
.row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.flex-wrapper > div {
    width: 98px;
    height: 98px;
    border: 1px solid #eee;
    border-radius: 3px;
    display: flex;
}

.flex-wrapper > div:nth-child(1){
    justify-content: center;
    align-items: center;
}

.flex-wrapper > div:nth-child(2){
    justify-content: space-between;
}
.flex-wrapper > div:nth-child(2) span:last-child{
    align-self: flex-end;
}

.flex-wrapper > div:nth-child(3){

}
.flex-wrapper > div:nth-child(3) span:nth-child(2){
    align-self: center;
}
.flex-wrapper > div:nth-child(3) span:nth-child(3){
    align-self: flex-end;
}

.flex-wrapper > div:nth-child(4){
    justify-content: space-between;
}
.flex-wrapper > div:nth-child(4) .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.flex-wrapper > div:nth-child(5) .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}
.flex-wrapper > div:nth-child(5) > span{
    flex-shrink: 0;
    align-self: center;
}

.flex-wrapper > div:nth-child(6){
    justify-content: space-between;
}
.flex-wrapper > div:nth-child(6) .row{
    flex-direction: column;
}

.flex-wrapper > div:nth-child(7){
    flex-direction: column;
    justify-content: space-between;
}
.flex-wrapper > div:nth-child(7) > span{
    flex-shrink: 0;
    align-self: center;
}

.flex-wrapper > div:nth-child(8) .row:nth-child(2) span:last-child{
    align-self: flex-end;
}


.flex-wrapper > div:nth-child(9){
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    width: 30px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 50%;
    display: block;
}
</style>

<div class='flex-wrapper'>
    <div><span class="item"></span></div>
    <div><span class="item"></span><span class="item"></span></div>
    <div><span class="item"></span><span class="item"></span><span class="item"></span></div>
    <div><div class='column'><span class="item"></span><span class="item"></div><div class='column'><span class="item"></span><span class="item"></div></span></div>
    <div><div class='row'><span class="item"></span><span class="item"></span></div><span class="item"></span><div class='row'><span class="item"></span><span class="item"></span></div></div>
    <div><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div></div>
    <div><span class="item"></span><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div></div>
    <div><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div><div class='row'><span class="item"></span><span class="item"></span></div><div class='row'><span class="item"></span><span class="item"></span><span class="item"></span></div></div>
    <div><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span><span class="item"></span></div>
</div>

容器：

> <font color='#f08a5d'>1.flex-direction</font>: [row|row-reverse|column|column-reverse] - 决定主轴方向；
> <font color='#f08a5d'>2.flex-wrap</font>: [nowrap|wrap|wrap-reverse] - 一条轴线排不下的话是否换行；
> <font color='#f08a5d'>3.flex-flow</font>: [ flex-direction || flex-wrap ] - 两者的简写； 
> <font color='#f08a5d'>4.justify-content</font>: [flex-start|flex-end|center|space-between
> |space-around] - 主轴上的对齐方式；
> <font color='#f08a5d'>5.align-items</font>: [flex-start|flex-end|center|baseline|stretch] - 交叉轴上的对齐方式； 
> <font color='#f08a5d'>6.align-content</font>: [flex-start|flex-end|center|space-between
> |space-around|stretch] - 定义多跟轴线的对齐方式，对一条轴线的情况不起作用；

子元素：

> <font color='#a8d8ea'>1.order</font>: [integer] - 定义排列顺序,数字从小到大；
> <font color='#a8d8ea'>2.flex-grow</font>: [number] - 定义放大比例，默认为0；
> <font color='#a8d8ea'>3.flex-shirink</font>: [number] - 定义缩小比例，默认为1，负值无效，当空间不足，设为0可以避免缩小； 
> <font color='#a8d8ea'>4.flex-basis</font>: [length] - 顾名思义，item的基础空间，默认为auto，浏览器根据这个计算是否有剩余空间；
> <font color='#a8d8ea'>5.flex</font>: [none || flex-grow flex-shrink flex-basis] - 建议三个写在一起，默认为0 1 auto；
> <font color='#a8d8ea'>6.align-self</font>: [auto|flex-start|flex-end|center|baseline|stretch] - 单个item与其他items可以有不同的对齐方式；

---

### 3. 圣杯 & 双飞翼布局

圣杯布局要求：

> 1.header,footer占满屏幕宽度，高度固定；
> 2.container是三栏布局；
> 3.left,right宽度固定,middle自适应填满区域；

经典的浮动实现：(个人认为核心是margin-left：-100%)

```html
<body>
    <header>header</header>
    <div class="container">
        <div class="middle">middle</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
    <footer>footer</footer>
</body>
```

```css
.sehai header, .sehai footer{
    height:50px;
    width:100%; 
    background-color: #ffe6eb;
    padding: 0;
    margin: 0;
    border: none;
}
.sehai .container div {
    margin: 0;
}
.sehai .container{
    height:200px;
    padding: 0 100px 0 150px;
}
.sehai .container>div{
    float: left;
}

.sehai .container  .left{
    width:150px;
    height:200px;
    background-color: #defcfc;
    margin-left: -100%;
    left: -150px;
    position: relative;
}

.sehai .container  .right{
    position: relative;
    width:100px;
    height:200px;
    margin-right: -100px;
    background-color: #cbf1f5;
}

.sehai .middle{
    float: left;
    height:200px;
    background-color: #a6e3e9;
    width: 100%;
}
```
<style>
.sehai header, .sehai footer{
    height:50px;
    width:100%; 
    background-color: #ffe6eb;
    padding: 0;
    margin: 0;
    border: none;
}
.sehai .container div {
    margin: 0;
}
.sehai .container{
    height:200px;
    padding: 0 100px 0 150px;
}
.sehai .container>div{
    float: left;
}

.sehai .container  .left{
    width:150px;
    height:200px;
    background-color: #defcfc;
    margin-left: -100%;
    left: -150px;
    position: relative;
}

.sehai .container  .right{
    position: relative;
    width:100px;
    height:200px;
    margin-right: -100px;
    background-color: #cbf1f5;
}

.sehai .middle{
    float: left;
    height:200px;
    background-color: #a6e3e9;
    width: 100%;
}
</style>

<div class='sehai'>
    <header>header</header>
    <div class="container">
        <div class="middle">middle</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
    <footer>footer</footer>
</div>

<br>

双飞翼：

圣杯的改进版，解决了圣杯布局main最小宽度不能小于left的缺点；

不需要设置relative，也不需要设置left/right，设置的是margin而不是padding了；

原理是给main包一层div，设置那层的float，main就被保护起来了，然后在main中设置margin；

```html
<div id="main-wrap" class="column">
      <div id="main">#main</div>
</div>
<div class="sub"></div>        
<div class="extra"></div>
```

```css
.main-wrap {        
    float: left;       
    width: 100%;   
 }  
 .sub {       
    float: left;        
    width: 190px;        
    margin-left: -100%;   
}   
.extra {        
    float: left;        
    width: 230px;        
    margin-left: -230px; 
 }
.main {    
    margin: 0 230px 0 190px;
}
```

---

### 4. 瀑布流

比较多用于文章排版；

核心： Multi-columns

```html
<div class='waterfall'>
    <div class='water'><span>1</span></div>
    <div class='water'><span>2</span></div>
    <div class='water'><span>3</span></div>
    <div class='water'><span>4</span></div>
    <div class='water'><span>5</span></div>
    <div class='water'><span>6</span></div>
    <div class='water'><span>7</span></div>
    <div class='water'><span>8</span></div>
    <div class='water'><span>9</span></div>
</div>
```
```css
.waterfall {
    column-count: 3;
    column-gap: 10px;
}
.water {
    break-inside: avoid;
    box-sizing: border-box;
    height: 100px;
    background-color: #eee;
    margin-bottom: 10px;
}
.water span {
    width: 20px;
    height: 20px;
    display: block;
    background-color: #ddd;
    line-height: 20px;
    text-align: center;
    color: #eee;
}
```


<style>
.waterfall {
    column-count: 3;
    column-gap: 10px;
}
.water {
    break-inside: avoid;
    box-sizing: border-box;
    height: 100px;
    background-color: #eee;
    margin-bottom: 10px;
}
.water span {
    width: 20px;
    height: 20px;
    display: block;
    background-color: #ddd;
    line-height: 20px;
    text-align: center;
    color: #eee;
}
</style>

<div class='waterfall'>
    <div class='water'><span>1</span></div>
    <div class='water'><span>2</span></div>
    <div class='water'><span>3</span></div>
    <div class='water'><span>4</span></div>
    <div class='water'><span>5</span></div>
    <div class='water'><span>6</span></div>
    <div class='water'><span>7</span></div>
    <div class='water'><span>8</span></div>
    <div class='water'><span>9</span></div>
</div>

这个多列貌似不能切成行..如果要按行顺序排列的话恐怕还是要js操作；

所以不适合实时的需要最新的最上面那种微博卡片之类的，而适合随机推送那种；


---

#### 盒模型

```css
/* 标准盒模型 */
.test {
    box-sizing: content-box;
}
/* IE盒模型 */
.test {
    box-sizing: border-box;
}
```

简而言之就是width的不同,标准盒模型的width不包括border和padding、而IE盒模型的width是把两者算进去的，

所以当我们需要比较固定精确的宽高的时候可以用border-box(有时候会忽略border、padding而设置width：100%导致撑开..)

<style type='text/css'>

.wrapper {
    margin: 10px 0 50px 0;
    display: flex;
    justify-content: center;
    user-select: none;
}
.a {
    width: 100px;
    height: 100px;
    background-color: #f4f3f3;
    display: inline-block;
}
.b {
    width: 100px;
    height: 100px;
    background-color: #cde8f6;
    margin: 0 100px;
    display: inline-block;
}
.aa {
    background-color: #b1bed5;
    height: 100px;
    width: 100px;
    box-sizing: content-box;
    border: 10px solid rgb(160,193,164);
    position: relative;
}
.bb {
    background-color: #bfd8d5;
    height: 100px;
    width: 100px;
    border: 10px solid rgb(166,204,164);
    box-sizing: border-box;
    position: relative;
}
.wrapper p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: fit-content;
}
.wrapper span {
    position: absolute;
    left: 50%;
    transform: translate( -50%,0);
    top: 110%;
    font-size: 12px;
    display: block;
    width: 98px;
    text-align: center;
    border-left: 1px solid #aaa;
    border-right: 1px solid #aaa;
}
.wrapper .ttt {
    width: 98px;
}
</style>

<div class='wrapper'>
    <div class="a">
        <div class="aa">
            <p>content-box</p>
            <span>width:100px</span>
        </div>
    </div>
    <div class="b">
        <div class="bb">
            <p>border-box</p>
            <span class='ttt'>width:100px</span>
        </div>
    </div>
</div>

---

#### BFC

Block Formatting Context,就是格式化块级上下文，一个独立的隔离的容器；

特点：

> 1.容器内部的div会在垂直方向一个接一个放置；
> 2.垂直方向上的距离由margin决定(和而不是较大者)；
> 3.bfc区域不会与float区域重叠； 
> 4.计算高度时，float元素也跟着一起计算；（清除浮动）
> 5.bfc是页面的一个独立容器，容器里的子元素不会影响外面，外面也影响不到里面；

产生条件：

> 1.浮动元素；
> 2.绝对、相对定位元素；
> 3.display: inline-block | table-cell | table-caption；
> 4.overflow除了hidden以外的值；

---

#### :nth-child(n) 和 :nth-of-type(n)

nth-child 是选择对应序号的子元素，看符不符合类型，符合就生效，不符合就不生效；

nth-of-type 是先根据类型选择子元素，再选择对应序号的元素；

两者都是找子元素集，有可能是多个的；

```html
<div class="container">
    <p>这是第一个子元素p1</p>
    <span>这是第二个子元素span1</span>
    <p>这是第三个子元素p2</p>
    <p>这是第四个子元素p3</p>
    <p>这是第五个子元素p4</p>
    <div>
        <p>这是第一个子元素p1</p>
        <p>这是第二个子元素p2</p>
        <p>这是第三个子元素p3</p>
    </div>
</div>
```

```css
.container {
    height: auto;
    padding-left: 20px;
    background-color: rgb(247,247,247);
}
p:nth-child(2){
    color: red;
}
p:nth-of-type(3){
    color: blue;
}
```

demo: 

<style>
.container {
    height: auto;
    padding-left: 20px;
    background-color: rgb(247,247,247);
}
.container div {
    margin-left: 10px;
}
.container p:nth-child(2){
    color: red;
}
.container p:nth-of-type(3){
    color: blue;
}
</style>
<div class="container">
    <p>这是第一个子元素p1</p>
    <span>这是第二个子元素span1</span>
    <p>这是第三个子元素p2</p>
    <p>这是第四个子元素p3</p>
    <p>这是第五个子元素p4</p>
    <div>
        <p>这是第一个子元素p1</p>
        <p>这是第二个子元素p2</p>
        <p>这是第三个子元素p3</p>
    </div>
</div>

---

结语：

在md里写html和css真麻烦！而且还写不了js！枯了qwq

---

参考文章：

[张鑫旭：写给自己看的display:grid布局教程](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)

[Chen_cong：CSS中的BFC详解](https://www.cnblogs.com/chen-cong/p/7862832.html)

[阮一峰：Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰：Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

[张君卓mytac: 超经典面试题：用多种方法实现圣杯布局和双飞翼布局](https://www.jianshu.com/p/2fe0e6953d0f)

[Shelley:CSS布局十八般武艺都在这里了](https://segmentfault.com/a/1190000008789039)

[纯CSS实现瀑布流布局](http://ju.outofmemory.cn/entry/310296)

---

以上.

