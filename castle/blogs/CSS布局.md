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

<div class='grid' style='display:grid;grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; background-color: #fff;width: 300px;height: 300px;grid-column-gap:3px;grid-row-gap:3px;'>
    <div style='background-color: #f8b595; background-image:url(/static/img/grid1.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ff6464; background-image:url(/static/img/grid2.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ffdede; background-image:url(/static/img/grid3.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #ff8264; background-image:url(/static/img/grid4.png);background-repeat:no-repeat;background-size: cover;'></div>
    <div style='background-color: #fb90b7; background-image:url(/static/img/grid5.png);background-repeat:no-repeat;background-size: cover;'></div>
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










参考文章：

[张鑫旭：写给自己看的display:grid布局教程](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)