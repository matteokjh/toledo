---
title: JS数据类型以及深浅拷贝
date: 2019-01-20 23:05:00
tags: js
categories: js
---
<!-- more --> 

初探，初探..

---

### 堆栈

栈(stack)：自动分配的内存空间，由系统自动释放；

堆(heap)：动态分配的内存，不一定会自动释放；

---

### JS数据类型

**基本数据类型(值类型)**：

Number、String、Boolean、Null、Undefined、Symbol(ES6)

基本数据类型存放在**栈**中，数据大小确定，按值存放，按值访问；

<br>

**引用数据类型**：Object

存放在**堆**中，其变量是存放在栈中的一个指针，指向堆内存；

```javascript
let a = [1,2,3,4,5];
let b = a; //传址，两者指向同一块堆内存
let c = a[2]; //传值

b[2] = 6; //它改变了原数组

console.log(c); //3，没变
console.log(a); //[1,2,6,4,5]

c = 7;

console.log(a); //[1,2,6,4,5]

b = [9,9,9,9,9]; //改变了b的指向
console.log(a); //[1,2,6,4,5]
```

#### 浅拷贝
在基本数据类型上独立开来，但是引用类型还是联系在一起；

实现方法：
```javascript
//方法一  Object.assign (ES6)
let a = {
    name: 'conoha',
    gg: [1,2,3]
}
let b = Object.assign({},a);
b.age = 18;
console.log(a.age) 
//undefined;原来a没有这个属性
b.gg[1] = 4;
console.log(a.gg); 
//[1,4,3]；a与b的联系体现在对象属性上
//注意验证这一点的时候不要b.gg = [3,4,5]
//这样子会让b.gg指向新数组(对象)，
//这样与a的关联会被打破；

//以防万一，顺便提一下直接赋值以免混淆
let c = a;
c.name = 'eczn';
console.log(a.name); //eczn
//直接赋值就无所谓对不对象属性了
```
这里b是a的浅拷贝，而c是等同于a(c === a)

所以c.name改变会影响a，c增加了属性在a也能体现(它们指向同一块堆内存)

而浅拷贝出来的b已经是**重新创建了新对象**，但是只复制一层对象的属性，不包括对象内的引用类型数据，所以在对象属性中看得到联系；

--

**Object.assign()**

既然提到了Object.assign：

1.它接收的第一个参数一定得是对象，如果不是会内部转换，遇到null、undefined等转换不了的就会报错；

2.源对象之后的参数位置如果遇到无法转换为对象的参数，会忽略它：

```javascript
let a = 'qwer';
let b = true;
let c = 100;

let obj = Object.assign({},a,b,c);
console.log(obj); //{0:"q",1:"w",2:"e",3:"r"}
```
首先第一个参数是空对象，所以没有报错，之后的参数a是String，会把每个字符当作一个属性，所以有0，1，2，3映射q、w、e、r；

但是属性b，c虽然可以转化为对象：

```javascript
Object(true);//[[PrimitiveValue]]: true
Object(100);//[[PrimitiveValue]]: 100
Object('qwer');//[[PrimitiveValue]]: "qwer" 
//{0: "q",1: "w",2: "e",3: "r"}
```
但是由于他们不可枚举(只有原始值)，所以被忽略了；

也就是说，Object.assign()不会合并不可枚举的属性(可以合并Symbol类型的属性)；

应用场景：clone、为对象添加属性和方法

--

实现浅拷贝的其他方法：

```javascript
//针对数组
let a = [1,2,3]
let b = a.slice();
b.push(4);
console.log(b); //[1,2,3,4]
console.log(a); //[1,2,3]
```
```javascript
let b = a.concat(); //数组
```
```javascript
let b = [...a];//ES6
```
```javascript
let b = shallowCopy(a);

function shallowCopy(obj){
    let newObj = {};
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
//hasOwnProperty()的作用是判断属性是不是自身属性，继承属性会返回false
```
p.s.由于hasOwnProperty方法没有防止同名属性，所以如果有坑：
```javascript
let foo = {
    hasOwnProperty: function(){
        return false;
    },
    bar: 'test'
};
foo.hasOwnProperty('bar'); //false
```
这样就会始终返回false(原来的方法被覆盖)，解决方法是：
```javascript
({}).hasOwnProperty.call(foo,'bar');//true
```

--

#### 深拷贝

顾名思义，也就是在浅拷贝的基础上，对象属性也能区分开，互相不影响的拷贝；

简单实现：
```javascript
function deepCopy(obj){
    let newObj = {};
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            if(typeof obj[prop] == 'object'){
                newObj[prop] = deepCopy(obj[prop])
            }else{
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}
```

暴力实现：

```javascript
function deepCopyJSON(obj){
    return JSON.parse(JSON.stringify(obj))
}
```
其它实现以目前本人的水平还无法参透

要理解这篇文章的内容想必要熟练掌握遍历，树，递归等.

[深拷贝的终极探索（90%的人都不知道）](https://juejin.im/post/5bc1ae9be51d450e8b140b0c)

---

最后提一下Symbol，它是ES6新增的基本值类型，表示独一无二的值，用函数生成，结构类似字符串；

```javascript
let a = Symbol('a');
let b = Symbol('a');

a == b ; // false
```

作用是避免同名属性的出现，防止某个对象的键被改写或者覆盖；

能够转化为Boolean,转化为其他类型则会报错：
```javascript
let a = Symbol();
Boolean(a); //true
Number(a); //TypeError
```
注意当Symbol用作表示独一无二属性时，不能用点运算符创建属性而应该用方括号：
```javascript
let a = Symbol();

//第一种写法
let obj = {}
obj[a] = 'test'; //work

//第二种写法
let obj = {
    [a]: 'test'
}//work

//第三种写法
let obj = {}
Object.defineProperty(obj,a,{value: 'test'});

//但是不能这样
obj.a = 'test';
obj[a]; //undefined
obj['a']; //'test',点运算符后面跟字符串，所以不会读取Symbol；
```
其他用途，包括switch语句内用等等..

更多用法以后写ES6再展开..

---

终了.

---

参考文章：

[JS基本数据类型和引用数据类型的区别及深浅拷贝](https://www.cnblogs.com/c2016c/articles/9328725.html)

[js的第七种数据类型](https://www.jianshu.com/p/eab46f1af003)

[typeof null 为什么等于 object?](https://www.cnblogs.com/wzybnzy/p/7232618.html?tdsourcetag=s_pcqq_aiomsg)

[JS中typeof与instanceof的区别](https://www.cnblogs.com/Trr-984688199/p/6180040.html)

[为什么用Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/youhong/p/6209054.html)

[JS显性数据类型转换和隐性数据类型转换](https://blog.csdn.net/gnail_oug/article/details/53135603)

[理解Object.defineProperty的作用](https://segmentfault.com/a/1190000007434923)

[js 深拷贝 vs 浅拷贝](https://juejin.im/post/59ac1c4ef265da248e75892b)

[深拷贝的终极探索（90%的人都不知道）](https://juejin.im/post/5bc1ae9be51d450e8b140b0c)

