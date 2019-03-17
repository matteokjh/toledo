---
title: Chrome new tab
date: 2019-03-17 16:33:00
tags: chrome
categories: chrome
---


<!-- more --> 
<small>一个很简单的新标签页, 做成插件 并发布</small>
<hr>

### why

为什么要自己做，原因是最喜欢的标签页插件：[Home - New Tab Page](https://chrome.google.com/webstore/detail/home-new-tab-page/ehhkfhegcenpfoanmgfpfhnmdmflkbgk)

不知道什么原因经常用不了（貌似是要翻墙），然后又说什么违反chrome条例blablabla..

总之就是经常崩，用不了，于是就想仿照它的界面自己写一个简单的。

(同样是标签页的插件 [Infinity](https://chrome.google.com/webstore/detail/infinity-new-tab-pro/nnnkddnnlpamobajfibfdgfnbcnkgngh) 虽然会稳定很多，不会崩，但是个人觉得不好看)

---

### brief introduction

项目地址：[https://github.com/matteokjh/my-chrome-new-tab](https://github.com/matteokjh/my-chrome-new-tab)

界面简单，就几个本人常用的link

![](/static/img/newtab3.png)

之后有余力可能会试试自定义添加link，调整位置，删除，天气，备忘录 等等等等...

文件结构也很简单，关键就是manifest.json:

![](/static/img/newtab2.png);

其中的icon,要重点说说..

![](/static/img/newtab4.png)

> 1.16x16 浏览器右上角的小图标
> 2.32x32 应该是避免不支持48size
> 3.48x48 扩展程序管理页面的 icon
> 4.128x128 商店的大图标，需要注意这个图标它说需要留四周透明，要求 96x96实体区域，周围有16宽的透明区域，要求真严格..这个我是用ps简单搞了一下才搞定..
总之准备以上四个size的图片就ok了

写页面的过程中一般打开**扩展程序** => **添加未压缩的扩展程序** 来调试;

写好之后就可以把整个文件夹压缩成zip(一定得是zip)，如果上了git仓库，文件夹中有.git的话要设置忽略压缩，不然文件会变得很大且没必要;

压缩好zip之后,登陆这里：

**google开发者个人中心**：[https://chrome.google.com/webstore/developer/dashboard](https://chrome.google.com/webstore/developer/dashboard)

本来在全世界发布扩展程序是要收一次性$5.00的注册费的（以防诈骗）,不知道为什么我可以直接添加那个zip然后填好信息之后发布...

(也许是这个原因):

![](/static/img/newtab1.png)

hhh

发布更新等待时间5-60mins不等...

然后就能添加了！（虽然在商店找不到）

![](/static/img/newtab5.png)

这里是成品链接：

[https://chrome.google.com/webstore/detail/sulpures/dngbegodaeenjeobdnoghjmhconcgjlp](https://chrome.google.com/webstore/detail/sulpures/dngbegodaeenjeobdnoghjmhconcgjlp)

---

#### 其它需要注意的地方

强调：版本更新需要手动修改manifest.json的version（比之前大）！

---

结语：

1. 其实并不是说一定要发布，但是使用开发者模式添加写好的demo之后，只要关掉浏览器重新开，就会被删除；

2. 留意到**扩展程序**页面有个‘**打包扩展程序**’按钮，这个的作用是生成crx文件和pem密钥，虽然最终浏览器插件都是crx格式，但是如果是想发布上去商店是不需要上传crx的，而是需要上传zip压缩包，所以个人认为这个按钮没有什么作用(对于我的新标签页来说)
3. 你可能会好奇为什么不直接打包扩展程序成crx，然后直接本地导入(拖进去就行了)，这样的确不需要发布就能看到这个插件，但是会有‘该插件未发布所以没法判断安全性’的报错，所以不给你用；网上解决此类问题的方法（设置本地组策略白名单）均不奏效，还坑了我不少时间去装安全组的模板管理模块(家庭版windows没有)，所以最后还是妥协了去了解发布流程，真庆幸不需要钱就能发布；

---

参考文章：

[chrome.tabs](https://developer.chrome.com/extensions/tabs)

官方文档：[chrome: What are extensions?](https://developer.chrome.com/extensions)

[Change Chrome New Tab Page to local file
](https://superuser.com/questions/907234/change-chrome-new-tab-page-to-local-file)