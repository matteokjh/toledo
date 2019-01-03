---
title: 非Hexo用户也能接入Gitment！
date: 2019-01-04 4:15:01
tags: blog
categories: blog
---
<!-- more --> 
<small>本篇介绍博客不是用Hexo的朋友接入Gitment评论系统的方法</small>

<hr>

#### Gitment概述

作者写的中文概述⬇
[孙士权：使用 GitHub Issues 搭建评论系统](https://imsun.net/posts/gitment-introduction/)

简而言之就是基于Github Issues的博客评论系统，评论的内容放在github一个仓库中，不同的博客中的评论放在仓库中的不同Issue里，根据Github自带的发Issue功能，Gitment也有相同的点赞，支持高亮等功能。

---

#### 1.注册 OAuth Application

根据作者提供的步骤，我们先要注册一个github里面的application，用于评论者通过OAuth授权登陆Github账号，是的Gitment仅支持Github账号登陆；

[注册OAuth Application](https://github.com/settings/applications/new)

![](/static/img/gitment3.png)

这里的Homepage URL我填的是博客地址，可以随便填，关键是最下面那个Authorization callback URL，这个回调url必须填博客地址，后面会用到；

注册之后，会给你一个Client ID 和 Client Secret，按照教程这两个东西之后要填在创建Gitment对象里；

---

#### 2.引入gitment

然后我的博客是Vue + Node(express)，我用的是npm引入：

```bash
npm i --save gitment
```

其他引入方式，包括主题自定义这些原作者的博客里(gitment的中文简介)说的很清楚了，下载好之后我在博客详情页里引入：

```javascript
import 'gitment/style/default.css'
import Gitment from 'gitment'
```

然后在mounted里：

![](/static/img/gitment4.png)

把相应的信息填进去就ok，那个redirect_uri不用填，意思是评论者跳去github授权登陆之后重定向到哪里，默认是当前路由所以不用填；

当然，图中我给gitment的div的id是container；值得注意的是那个id，一开始它说默认location.href所以我没理它，因为location.href应该足以区分不同的文章，但事实证明不是这样的，ttt是什么下面会说，接下来是先看看有没有渲染出来；

---

#### 3.Error: Comments Not Initialized

一开始看到这个的时候不是很惊讶，因为我查过每一篇博客都需要初始化一次，但是点击login授权登陆之后回来是会报错的：

[[object ProgressEvent] ](https://github.com/imsun/gitment/issues/170)

看这个Issue里面的人说的比较详细了，‘作者写的给使用者加CORS header的服务停止了’，所以访问github的api会报跨域错误；

解决方法是里面有人提到的自己搭一个服务

源代码：

![](/static/img/gitment5.png)

[项目地址](https://github.com/imsun/gh-oauth-server)

看上去是一个代理转发请求的服务，因为目前我还没有域名，没有证书，所以没有选择搭建这个，之后有了这些再搭；

现在我是用上面issue里自己实现这个服务的dalao提供的一个url，按照他说的方法把'node_modules/gitment/dist/gitment.js'中这个地方：

![](/static/img/gitment6.png)

替换为新url（这里我已经换了，直接找 https://gh-oauth.imsun.net 替换就好）

替换之后打包，部署到server，现在已经可以正常显示initialize按钮了！

![](/static/img/gitment.png)

---

#### 4.关于刚才提到过的id

initialize了一篇博客之后，我发觉事情有点不对劲，后面的博客都不用initialize直接可以评论了，我试着评论了一条，果然，全部文章用的是一个issue，也就是说所有文章的评论现在是一起的！我觉得也许是id的问题，就console了一下，原来我的博客的id是‘/’，因为我的title是写在query里面的，不是像hexo一样是一个子路由，所以我要思索一个每一篇文章都不一样的常量，来作为区分的id；

最终我选择了时间time，日期加上时分秒(字符串)，再把那个‘/’的issue关闭(对，issue能看到id),就可以每一篇博客分别初始化建立issue，愉快地评论了！

![](/static/img/gitment1.png)

---

#### gitment的一些缺陷

最大最大的缺陷就是评论会有些许延迟，也就是你发了评论立即刷新，是看不到刚才的评论的，要等好一会，我看了下github issues那边，评论之后能立刻出现，也就是说是api问题或者转发代理服务的问题；

其次是有时候会load comments很久都load不出来：

![](/static/img/gitment2.png)

还有就是别人讲的安全问题，说是client_id 和 client_secret是明文的，没有加密，容易被利用拿到GitHub授权去做一些事情，解决方案就是用小号接入gitment，不过我懒所以就不管了..


---

结语：半年前就想用Gitment了，毕竟各种评论系统（像多说，畅言，友言等）崩得太快，刚注册第二天就无期限终止服务，可见评论系统单独拿出来赚钱是不太可行，服务器成本很高，所以像Gitment这样借由Github Issues的0服务器成本的东西就会显得特别大众化，只是唯一缺点就是那个跨域功能需要有证书的域名转发才行，而原作者好像放弃了这个项目了，有点可惜，希望能出个解决方案，用别人的服务器转发总不太好。

<font color='#fff'>欢迎来评论啊哈哈哈~</font>

<br>

参考文章：
[Gitment评论功能接入踩坑教程](https://www.jianshu.com/p/57afa4844aaa)

---

以上.