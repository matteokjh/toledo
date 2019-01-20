---
title: Event Loop
date: 2019-01-19 22:28:00
tags: js
categories: js
---
<!-- more --> 

JS事件循环机制

---

#### 进程与线程

进程：cpu资源分配的基本单位；

线程：cpu资源调度的基本单位；

一个进程可以有多个线程，多线程单线程是基于一个进程上讨论的；

浏览器是多进程的，每打开一个页面，就开一个进程(任务管理器)，但也不是绝对，chrome会合并空白页进程：

![](/static/img/loop1.png)

![](/static/img/loop2.png)

 - 浏览器进程：主进程，负责网络资源下载、界面显示、与用户交互、其他页面的创建和销毁等；

 - GPU进程：最多一个，负责图形绘制等；
 
 - 第三方插件进程：每用到一个插件就创建一个，用的时候才创建；
 
 - 渲染进程：页面渲染进程，每个页面对应一个（非空），内部多线程，负责渲染页面、执行脚本、事件处理等； 
 

虽然多进程会使浏览器占用较多内存资源，但是多进程能够提升运行效率(多核优势)，避免某个页面或者插件崩溃而影响到其它页面，提高浏览器的稳定性；
 
其中，跟JS有关的进程就是渲染进程啦~

以下是该进程内部的线程：

#### 渲染进程

**1.GUI渲染线程：（Graphical User Interface）**

- 渲染浏览器界面，解析HTML、CSS，构建DOM树和RenderObject树，对于特定的object，浏览器还会renderLayer，没有layer的object默认从属父节点的layer；布局和绘制等；

- 当界面需要重绘(repaint)或者由于某种操作引发回流(reflow)的时候，该线程就会执行；

- 该线程与JS引擎线程互斥，JS引擎执行时该线程会被挂起，被保存在一个队列中等待JS引擎空闲时再立即被执行；

**2.JS引擎线程:**

- 又称JS内核，负责JS脚本程序的处理(V8);

- 该线程负责解析JS脚本，运行代码；

- 由于互斥关系，如果JS执行时间过长，会影响GUI渲染，导致加载阻塞；

**3.事件触发线程：**

- 浏览器另开的一个专负责事件循环的线程，协助JS引擎；

- 浏览器的一些异步请求（ajax）、settimeout、鼠标点击等来自其他线程的任务会添加到事件线程中；

- 当事件符合触发条件，该线程会把事件添加到待处理队列的队尾，等待JS引擎处理；

- 由于JS是单线程，所以才有待处理队列，排队等待JS空闲时一一处理；

**4.定时触发线程：**

- setTimeout、setInterval所在线程；

- 定时计数器不是JS引擎计数的，因为JS引擎是单线程，会影响计时准确；

- 所以通过该线程计时，计时完毕后添加到事件队列中等待JS引擎空闲后执行；

- W3C规定setTimeout低于4ms的时间间隔算为4ms；

**5.异步Http请求线程：**

- XMLHttpRequest在连接之后是通过浏览器新开一个线程请求；

- 如果检测到状态变更，如果设置了回调函数，异步线程会产生状态变更事件，将这个回调放入事件队列等待JS引擎空闲时执行；

<br>

**Web Worker**

由于JS的单线程，为了应对JS可能出现的cpu密集型计算，HTML5支持了web worker；

创建worker的时候，JS引擎会向浏览器申请一个子线程（是主进程建立的而不是JS线程，不能操作DOM）；

JS引擎线程与worker线程通过特定的方式通信(postMessage API);

web worker是一个子线程，sharedWorker是独立进程；

<br>

**load事件与DOMContentLoaded事件**

 - DOM加载完成时，不包括样式表和图片，会触发DOMContentLoaded事件；

 - 而onload事件触发时则表示页面上所有的DOM，样式表，脚本，图片都加载完成；

<br>

**CSS是由单独的下载线程异步下载**

css加载不会阻塞DOM树解析，但是会阻塞render树渲染(因为渲染需要等待css加载完毕，需要css的信息)

---

### Event Loop

 - JS有**同步任务**和**异步任务**

 - 同步任务在主线程执行，放在**执行栈**中

 - 事件触发线程管理一个**任务队列**，当异步任务有运行结果，就放在任务队列中；

 - 一旦执行栈空了，系统就会读取任务队列，将可运行的异步任务添加到执行栈中，开始执行；


![](/static/img/loop3.png)
事件循环图(引用参考文章)

<br>

**setTimeout和setInterval**

注意setTimeout和setInterval是由定时器线程控制，当计时完成后才会将特定事件入队：

```javascript
setTimeout(function(){
    console.log(1);
})

console.log(2);
```
先2后1；

虽然没设置时间，默认为0，但是w3c规定小于4ms的当作4ms，所以相当于等待4ms；

可是就算没有这个4ms，还是会先2，因为只有可执行栈(2先入栈)空了才会调任务队列的事件(1)进来；

由于setInterval容易产生累计效应：

如果上一次事件执行时间过长导致下一次interval到了上一次都还没执行完，就会gg；

<br>

参考文章的作者强烈推荐的一篇文章：

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

这篇文章的例子很好，也有动画展示，生动形象，看不懂英文也可以看得懂；

以下是对该文章两个比较突出的例子的解析：

例1：

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

//答案是
//script start
//script end
//promise1
//promise2
//setTimeout
```

热身题，错过一次不会再错..

重点是由Promise引出的micro task概念；

**macro task**：宏任务(task)，每次执行栈执行的代码就算一个宏任务；

**micro task**：微任务(job)，当前task结束后(下一个task开始前)立即执行的任务；

<br>

常用场景：

 - macrotask：主代码块、setTimeout、setInterval等(事件队列中的每一个都是)

 - microtask：Promise、process.nextTick，etc.

注意，node环境中，nextTick比Promise优先级要高；

另外，macrotask的事件放在事件队列中，由**事件触发线程**维护（只是维护，当要执行的时候是JS引擎从这里拿过去执行的）；

而microtask的所有微任务有一个微任务队列，是由**JS引擎**维护；

<br>

Epic Boss：
```html
<div class="outer">
  <div class="inner"></div>
</div>
```

```javascript
// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```
这个例子源于上面提到那篇生动的英文文章，由于我的博客对嵌入js不太友好，所以没办法动态演示(以后也许会写个demo集)，所以就简单解释一下作者的意思：

首先答案是：
```javascript
//点击inner
'click';
'promise'; //microtask
'mutate'; //microtask
'click'; //这里开始事件冒泡
'promise';
'mutate';
'timeout';//冒泡完就下一轮macrotask
'timeout';
```
注意，mutationObserver是html5开始支持的监听dom树变化的方法；

点击内部的元素：
1.首先console一个click；

2.遇到setTimeout把它的回调加入事件队列；

3.遇到Promise，放入microtask队列；

4.遇到setAttribute，把mutate放入microtask队列；

5.一轮macrotask走完，开始执行microtask：promise -> mutate；

6.事件冒泡到outer，执行1到5步相同操作；

7.开始新一轮macrotask， -> timeout；

8.同上

<br>

**Legend Boss**：

在上面的基础上在末尾加一句：
```javascript
inner.click();
```
这样做的变化是不直接做点击而是直接脚本执行：

1.开始执行inner.click()，放入执行栈;

2.触发onClick，放入执行栈；

3.-> click;

4.setTimeout放入task队列，promise放入microtask队列，mutate放入microtask队列；

5.onclick出栈，此时还不能执行微任务，因为执行栈中非空，还有inner.click()在栈中(应该是由于冒泡)

6.开始冒泡，执行第3、第4步，但是注意，当有一个mutation的microtask在pending的时候不会产生新的mutation，所以这里没有第二个mutation微任务;

7.onclick出栈，click也出栈，开始执行微任务！

8.promise -> mutate -> promise

9.执行下一轮macrotask，timeout -> timeout


最终答案是：
```javascript
'click';
'click';
'promise';
'mutate';
'promise';
'timeout';
'timeout';
```

最后提一下nextTick：
```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
}
```
简单来讲就是vue更新数据是异步的，直接获取拿到的数据还是改变前的数据(顺序在前，获取的时候还没改变)，而nextTick获取的是改变之后dom重渲染完后的数据；

使用场景就是如果在created、mounted有需要dom操作的地方，要放进nextTick回调里执行；

vue实现nextTick的方法是promise，polyfill是mutationObserver/setTimeout；

具体之后再展开；

---
结语：

1.17开始写，写完的时候，已经是1.19，比较多借鉴，比较少自己的见解；

另外，从今天开始，之后一个月也许会比较少更；

---

参考文章：

[JS浏览器事件循环机制](http://www.cnblogs.com/yqx0605xi/p/9267827.html)

[详解JavaScript中的Event Loop（事件循环）机制](https://www.cnblogs.com/cangqinglang/p/8967268.html)

[前端基础进阶（十二）：深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f)

较多参考：
[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)

[How JavaScript Timers Work](https://johnresig.com/blog/how-javascript-timers-work/)