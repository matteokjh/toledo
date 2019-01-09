---
title: Node + Mongo 初体验
date: 2019-01-10 7:26:10
tags: node,mongodb,vue
categories: sql
---
<!-- more --> 
<small>试试node+mongo做我的sql课设.</small>
<hr>

#### 1.express

node我用express框架搭建服务端：

```bash
npm i express -g
npm i express-genersator -g
```
我之前下过所以不用了，直接
```bash
express [projectName] #supermuscle
cd [projectName]
npm install
npm start
```
![](/static/img/supermuscle1.png)

---

#### 2.MongoDB & Mongoose

本次选用的数据库以及nodeJS提供连接mongodb的一个库

[Mongo下载地址](https://www.mongodb.com/download-center/community)

然后是mongoose：
```
npm i mongoose --save
```

---

#### 3.开始写接口

文件目录：

![](/static/img/supermuscle4.png)

> backend/supermuscle/ : 
> 
> 'methods/'是一些计算方法;
>
> 'config/'放数据库链接的一些配置;
>
> './models/'放的是Schema对象的定义;
>
> 接口写在‘routes/’里,分了增删查改和登陆;



一些简单的增删查改：

```javascript
//以用户表为例
//add.js
router.post('/person', function(req, res, next) { // 增加职员
    User.find({}, function(err, allPeople){
        
        if(err){
            res.end('Error');
            return next();
        }
        if(
            // 999 最大 
            req.body.state === '999' ||
            //人事经理最大，但是不能任命/解雇人事经理
            req.body.state === 'hr-manager' &&
            (req.body.position === 'manager' && 
                req.body.department != 'hr' )||
            //人事职员只能任命其他部门的职员
            req.body.state === 'hr-clerk' && 
            req.body.position === 'clerk' && 
            req.body.department != 'hr'
        
        ){
            var user = new User({ //新建User对象
                uid: allPeople.length == 0 ? 1 : parseInt(getUid(allPeople,'uid')), //编号（所有部门一起唯一）
                username: req.body.username,
                sex: req.body.sex, //性别
                department: req.body.department, //部门
                indate: getFormedDate(), //入职日期
                outdate: '---',
                isFired: false,
                interviewer: req.body.interviewer,
                period: '0个月',
                salary: req.body.salary, //薪资
                position: req.body.position, //岗位： clerk --- 职员；manager --- 经理

            })
            // 插入操作
            user.save(function(err,theUser){
                if(err) console.log(err)
                //打印新增的人
                console.log('add/person:',theUser)
                User.find({},function(err, docs){
                    if(err){
                        res.end('Error');
                        return next();
                    }
                    //返回所有人员列表
                    res.json(docs.reverse())
                })
            })
        }else{
            res.json({
                code: 500,
                msg: '操作失败！权限不够！'
            })
        }
    })
    
});

```
```javascript
//以用户表为例
//delete.js
router.delete('/person',function(req,res,next){
    if(
        // 999 最大 
        req.body.state === '999' ||
        //人事经理最大，但是不能任命/解雇人事经理
        req.body.state === 'hr-manager' &&
        (req.body.position === 'manager' && 
            req.body.department != 'hr' )||
        //人事职员只能任命/解雇其他部门的职员
        req.body.state === 'hr-clerk' && 
        req.body.position === 'clerk' && 
        req.body.department != 'hr'
    ){
        User.remove({
            uid: req.body.uid
        },(err, data) =>{
            if(err) {
                res.end('Error');
                console.log(err)
            }
            else{
                User.find({},(err, docs)=>{
                    if(err) console.log(err)
                    else if(data.n == 0){
                        res.json({
                            code: 200,
                            msg: 'uid不存在!',
                            detail: data,
                            data: docs
                        })
                    }else{
                        res.json({
                            code: 200,
                            msg: '删除成功!',
                            detail: data,
                            data: docs
                        })
                    }
                })
            }
        })
    }else{
        res.json({
            code: 500,
            msg: '操作失败！权限不够！'
        })
    }
});

```
```javascript
//以用户表为例
//show.js
//按设置显示，未设置就全部显示
router.get('/optionman', function(req, res, next) {
    // Object.keys();
    console.log(req.body)
    User.find(req.body, (err,docs)=>{
        if(err) {
            res.end('error!');
            return next();
        }
        if(docs.length == 0){
            res.json({
                code: 2400,
                msg: '找不到记录！'
            })
        }else{
            console.log(docs);
            res.json(docs);
        }
        
    })

});

```
```javascript
//以用户表为例
//change.js
router.post('/person',(req,res)=>{
    // console.log(req.body.uid == req.body.changerId)
    if(
        //自己可以改自己
        req.body.uid == req.body.changerId || 
        // 999 最大 
        req.body.state === '999' ||
        //人事经理最大，但是不能任命/解雇人事经理
        req.body.state === 'hr-manager' &&
        (req.body.position === 'manager' && 
            req.body.department != 'hr' )||
        //人事职员只能任命其他部门的职员
        req.body.state === 'hr-clerk' && 
        req.body.position === 'clerk' && 
        req.body.department != 'hr'
    
    ){  
        var tochange = req.body;
        if(req.body.isFired == 'true'){//如果被炒鱿鱼了
            tochange.outdate = getFormedDate()
            tochange.period = getPeriod(tochange.indate,tochange.outdate)
        }else {
            tochange.outdate = '---'
        }
        
        User.update({uid:req.body.uid},tochange,(err,data)=>{
            if(err){
                res.end('error!')
                console.log(error)
            }else if(0){
                
            }else{
                res.json({
                    code: 200,
                    msg: '修改成功！',
                    data: tochange 
                })
            }
        })

        
    }else{
        res.json({
            code: 500,
            msg: '操作失败！权限不够！'
        })
    }
})

```
用postman调试：

![](/static/img/supermuscle2.png)
![](/static/img/supermuscle3.png)

商品，供应商相关操作类似.

前端方面没什么好说的，正常请求接口就行，但是！

要特别留意这里：

```javascript
this.$http.delete(`${backUrl}/delete/person`,{
    data: tochange //这里包一层data，不能直接传一个tochange对象
}).then(res=>{
    console.log(res);
    this.allUser.splice(idx,1);
})
```

axios的delete的请求参数要外面包一层data，不然后台接收到的是空的body！！！！！坑了我好一阵子...

另外，axios的get如果有请求参数的话要写成：

```javascript
this.$http.get(`${backUrl}/delete/person`,{
    params: tochange //这里写params，不是写data了.
}).then(res=>{
    //...
})
```

跟get方法的参数有关，获取用 req.query 而不是 req.body

---

#### 4.登陆 & 注册

特别说一下登陆注册

```javascript
router.post('/exists', function (req, res, next) {
    //判断uid是否存在以及是否已经有账号
    // console.log(req.body)
    //先判断uid
    User.find({
        uid: req.body.uid
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.end('error')
        } else {
            if (data.length == 0) {
                res.json({
                    code: 5000,
                    msg: 'uid不存在！'
                })
            } else {//再判断uid是否已经创建过账号
                
                    // console.log(data[0].isRegister)
                if (data[0].isRegister == true) {
                    res.json({
                        code: 5001,
                        msg: '该职员已注册过账号!'
                    })
                } else {//最后判断用户名是否已存在
                    Login.find({
                        username: req.body.username
                    }, (err, data2) => {
                        if (err) {
                            console.log(err)
                            res.end('error!');
                        } else {
                            console.log(data2)
                            if (data2.length == 0) {
                                //开始注册
                                let login = new Login({
                                    uid: req.body.uid,
                                    username: req.body.username,
                                    password: req.body.password
                                })
                                login.save(function(err, newUser){
                                    if(err){
                                        console.log(err);
                                        res.end('error');
                                    }else{
                                        console.log('注册成功！')
                                        // console.log(newUser)
                                        res.json({
                                            code: 2000,
                                            msg: '注册成功！',
                                            data: newUser
                                        })
                                        User.update({
                                            uid: req.body.uid,
                                        },{
                                            isRegister: true
                                        },(err,r)=>{
                                            if(err){
                                                console.log(err)
                                            }else{
                                                // console.log(r)
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.json({
                                    code: 5002,
                                    msg: '用户名已存在！'
                                })
                            }
                        }
                    })
                }
            }
        }
    })
});

```

这个判断逻辑麻烦到我怀疑是否有必要加入注册功能..

写法很复杂，如果有更好的方法请不吝赐教.

![](/static/img/supermuscle5.png)

(没有错，我没有弄加密.) ~~是因为懒~~

总之，注册成功之后就可以登陆啦~

```javascript
router.post('/login', function (req, res, next) {
    console.log(req.body)
    Login.find({
        username: req.body.username,
        password: req.body.password
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.end('error')
        } else {
            if (data.length == 0) {

                res.json({
                    code: 5000,
                    msg: '用户名或者密码不正确！'
                })
            } else {
                console.log(data)
                res.json(data)
            }
        }
    })
});

```

前端：
```javascript
//axios
submit(){//登陆
    if(this.username == "" || this.password == ""){
        this.showTips = '用户名或者密码不能为空！'
    }else{
        this.$http.post(`${backUrl}/login`,{
        username: this.username,
        password: this.password
        }).then(res=>{
            if(res.data.code == 2000){
               //权限值存入localStorage中
               window.localStorage.setItem('state',res.data.state)
                //index就是后台管理主页
                this.$router.push('/index')
            }else if(res.data.code == 5000) {
                this.showTips = '用户名或密码错误！';
            }
        })
    }
},

```
```javascript
  newUser(){//注册
	this.showTips = '';
	if(this.uid == "" || this.username == "" || this.password == ""){
		this.showTips = '必要信息不能为空！'
	}else { //backUrl === 服务器 url+port
		this.$http.post(`${backUrl}/exists`,{
			uid: parseInt(this.uid) == null ? 999999 : parseInt(this.uid),
			username: this.username,
			password: this.password
		}).then( res=>{
			this.showTips = res.data.msg
		})
	}
  },
```

另外，对于知道主页面路由是/index的用户，为了避免他们未登录的情况下直接访问，做了个小判断：

![](/static/img/supermuscle6.png)

还加了简单的登出操作（就是清空localStorage..



---

结语：

没有任何加密，非常不安全；

没有撤回操作的功能，误操作gg;

根据uid的计算方式，人员唯一标识uid有可能重复：删除最新那个人再添加就是重复了；

不允许跨部门操作，逻辑不够人性化；

没有做分页：

太赶，缺乏计划；

起初选用mongodb是因为它广泛应用于web，又有mongoose这种这么方便且对node友好的东西，非常好上手；

但是，由于mongodb不是一个关系型数据库，导致它在大型一点的场景基本就不会被考虑应用，（还是mysql稳）

也许也是为了掩盖我对数据库知识的薄弱，但无论如何，这门课程的课程设计完成了，我也从中学到了东西，这就足够了。

不过，接下来要开始认真了呢w

<font color='#fff' style='user-select:none;'>-那些闪闪发光的人啊，都是有迹可循的-</font>

---








<br>

参考文章：

[Mongo基础使用，以及在Express项目中使用Mongoose](https://www.cnblogs.com/winyh/p/6682032.html)

[使用express+mongoose开发简单的blog](https://www.jianshu.com/p/341ad8aede9e)



---

以上.