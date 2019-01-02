---
title: SSH登陆云服务器
date: 2019-01-03 2:44:01
tags: server
categories: server
---
<!-- more --> 
<small>时隔半年系列</small>
<hr>

#### 新年新气象
去年的腾讯云服务器到期了，今年试试vultr.

账号注册、登陆、充值（支持微信、支付宝）：[https://my.vultr.com/](https://my.vultr.com/)

deploy一个Tokyo的服务器，$3.50的应该够用，

![](/static/img/vultr1.png)

Deploy之后要注意，因为外国的ip可能会被国内ban，这时候要测试一下ip能否ping到，以及端口扫描一下tcp端口是否关闭；

[国外端口扫描](https://www.yougetsignal.com/tools/open-ports/)

[ping查询](https://tools.ipip.net/ping.php)

[国内端口扫描](http://tool.chinaz.com/port)

端口测试TCP（默认22），如果出现国外通过，国内不通过，就是说明该ip被国内ban了，需要deploy多台服务器，直到可以之后再删掉之前不可以的server（ip池会使你删掉server再deploy的话ip没有变化）；

---

#### PuTTY登陆
如果第一步没有完成，即ip能ping到但是国内检测tcp显示不可用的话，将无法用PuTTY登陆；

如图，起初没有想用SSH登陆，账号密码也挺好，关键是PuTTY经常会崩（记得screen），也就是经常要输密码，然后vultr的默认密码又是这样的：
```bash
 6xDI.N=1;cEa}-vcSq_=dq3R  #无论是PuTTY还是vultr自带的terminal都不能复制粘贴
```
所以我决定去SSH...

---

#### 1.创建SSH私钥（rsa）
登陆了之后在/root中：
```bash
输入：ssh-keygen -t rsa -b 4096 
# ssh --- Secure Shell
# ssh-keygen --- 生成密钥指令
# -t --- type[RSA|DSA]
# -b --- bit,密钥长度[rsa：min-768bit；default：2048bit]
```
之后会有提示：
```bash
Enter file in which to save the key (/root/.ssh/id_rsa): 
#输入保存密钥的位置（/root/.ssh/id_rsa）
#回车就好，跟默认路径；
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
#输入密钥的密码，也就是使用密钥的时候会需要你输入的密码
```
succeed.

```bash
/root/.ssh/id_rsa  => 私钥
/root/.ssh/id_rsa.pub  => 公钥
```

#### 2.在server上配置SSH
修改 /etc/ssh/sshd_config
```bash
RSAAuthentication yes #RSA认证
PubkeyAuthentication yes #开启公钥验证
AuthorizedKeysFile .ssh/authorized_keys #验证文件路径
PasswordAuthentication no #禁止密码认证
PermitEmptyPasswords no #禁止空密码
```
开启公钥认证，其他设置不太重要，因人而异（比如我想在手机用密码登陆，就不禁止密码认证），不过禁止的好处是更加安全。

这里要注意它验证公钥的路径，文件名应是公钥的名字，所以要把公钥的名字改成authorized_keys

#### 3.重启SSH服务
```bash
systemctl restart sshd
```
一开始我运行这个指令报错了，不明原因，查了一下发现可能是权限问题
[阿里云：SSH异常“Failed to start OpenSSH Server daemon”问题排查](https://yq.aliyun.com/articles/103191?t=t1)
```bash
chmod 600 .ssh/authorized_keys 
# 修改权限，600 = 6 + 0 + 0 = -rw------- ; -拥有者 | 群组 | 其他组
# r --- read -- 4(100);   w --- write -- 2(010); x --- execute -- 1(001);
```
改了之后ok了.

---

#### 4.PuTTY导入私钥

用FileZilla等软件连服务器把刚才的id_rsa文件传到电脑；

下载 PuTTYgen

打开，点击 Load ， All Files选择 刚才的文件；

点击 “Save private key”
<br>
![](/static/img/vultr2.png)
<br>
save后应是变成一个.ppk文件

然后，打开PuTTY，之前有save过Session的load一下，没有就填上IP，Port，session name，

切换到 SSH -> Auth，浏览找到你的ppk文件，切回sessions，最后 -> save，搞定.
<br>
![](/static/img/vultr3.png)

---

#### 5.finish

<br>

![](/static/img/vultr4.png)

<br>

里面那个passphrase就是之前那个使用密钥的密码

---

结语：虽然搞SSH登陆是怕输入密码麻烦，但其实SSH安全性比密码登陆高很多；即便如此，再强大SSH也有被爆破的一天，所以以后可能会试下改SSH的22端口.

<font color='#fff' style='user-select:none;'>
最后，祝愿看到这篇文章的人新年快乐，明确目标之后，要想得到接下来要做什么，并为之而付出。<br>
经常看到身边的人多么多么努力，然后变得怎么怎么厉害，自己虽然心里想着‘只要努力我也可以’，<br>
但其实[努力]是非常难能可贵的品质啊，要做到[努力]其实一点都不容易，是难以持之以恒的一件事.<br>
而之前的人生中的我，在努力这方面真是一塌糊涂啊..所以希望本人接下来能够一直坚持努力，去争取自己想要的生活.<br>
也衷心祝福看到这里的朋友，能够通过自己的努力去实现自己，发光发热ww
</font>

<br>

参考文章：
[Vultr VPS SSH连接不上？PuTTY密钥生成设置方法](https://www.chenweiliang.com/cwl-646.html)



---

以上.