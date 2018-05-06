---
title: Githug
date: 2018-02-01 01:33:56
tags: git
categories: git
---
一个基于ruby的Github游戏
<!-- more -->
<hr>

# Githug Solution

## 安装
百度有教程，重点是要用cmder，要下载ruby环境

## Level 1
```bash
git init
```
## Level 2
```bash
git config -l 
# list and find name&email
```
![](/static/img/githug2.png)

## Level 3
```bash
git add .
```

## Level 4
```bash
git commit ...
```

## Level 5
```bash
git clone ...
```

## Level 6
```bash
git clone [url] [folder name]
```

## Level 7
```bash
vim .gitignore
# 编辑 *.swp
:wq
# 完成
```

## Level 8
```bash
vim .gitignore
# 编辑 *.a , !lib.a
git add .
git commit ...
```

## Level 9
```bash
git status
```

## Level 10
```bash
git status # 数commit的文件数其实就是add（绿色）文件数目
```

## Level 11
```bash
git status
# 发现有一个已经删除但是存在工作区的文件
git rm [file name]
```

## Level 12
```bash
git status
# 发现一个错误add上去的文件
git rm [file name] --cache
# 在暂存区删除文件但本地的文件还在
```

## Level 13
```bash
git stash # 储藏
```

## Level 14
```bash
git mv oldname newname
```

## Level 15
```bash
git mv filename newFolder # 一条命令等于三条
# mv filename newFolder
# git rm filename
# git add filename
```

## Level 16
```bash
git log # 输入hash
```

## Level 17
```bash
git tag new_tag [commit hash] # commit的hash串
# 一开始没写commit hash创建了一个空标签，不知道怎么添加commit hash进去于是只好删掉再输入
```

## Level 18
```bash
git status # 干净的branch
git tag # 发现有一个tag_to_be_pushed标签
git show tag_to_be_pushed # 有一个 First commit 的东西
git push origin tag_to_be_pushed # 尝试这样看行不行，结果成功了
```

## Level 19
```bash
git add .
git commit --amend # :q退出就好
# --amend 常用来修改branch顶端的commit（栈顶也就是最近一次commit）
# 也叫 追加提交 ，优点是不会产生新的commit id
```

## Level 20
```bash
# 修改commit时间至未来（修改git log显示时间）
git commit -m "nothing"
git commit --amend --date="Wed, 24 Jan 2018 21:59:00 +0800" 
# 这是date格式，不知道有没有更简单的写法
```

## Level 21
```bash
git reset [commit id] # 两个add退回一个不会，这里是都退回然后add一个
# 后来知道可以直接 git reset filename
```

## Level 22
```bash
# 引入 --soft 参数
git reset [commit id] --soft
# --soft 表示只把HEAD指针退回[commit id]的版本，但是index和working copy不变
# --hard 就是三个都变，因为working copy变化会影响work tree ，也就是可能丢失代码，所以不推荐
# --mixed（默认） 就是index和HEAD变化，working copy不变
# p.s.后来知道不用写【commit id】,可以直接写 git reset HEAD~1（HEAD^） 表示退回上一个版本。
```
<blockquote>
这里隆重介绍HEAD , index, 和 working copy
<ul>
	<li>HEAD：就是指当前commit的位置（头指针）</li>
	<li>index：指包含下一个commit的文件集（也就是即将commit的位置）</li>
	<li>working copy：当前工作区</li>
</ul>
所以说为什么 --hard可能导致代码丢失（因为影响了working copy）
</blockquote>

## Level 23
```bash
git checkout filename
# git chekout branchName filename
# git checkout master 本质是把master分支上的HEAD指针取出来，达到所谓的“切换分支”
# git checkout filename 获得当前分支该文件的修改前版本
```

## Level 24
```bash
git remote # 列出远程仓库名
git remote -v # 列出详细url
```
我们熟悉的 git remote add url
连接远程仓库w

## Level 25
“The remote repositories have a url associated to them.  Please enter the url of remote_location.”
```bash
git remote -v
```
列出了这几个东西：
![](/img/githug25.png)
我懵了，两个url哪个才是呢？
逐一尝试发现第二个才是正确答案，不解。

## Level 26
```bash
git pull origin master
```

## Level 27
```bash
git remote add origin url
```
 
## Level 28
```bash
git rebase origin/master 
# 与merge类似，同样是把master分支合并到当前分支
# git rebase 又称 衍合 ， 变基操作，本质上改变了commit的历史
# git pull 包含了两步操作：
# git fetch 和 git merge
# git fetch 就是 “取下目标的更新”，放在“.git/FETCH_HEAD”这里
# git 有tracking（跟踪）概念，把【来源】和【目标】绑在一起，以避免不必要的参数
```
关于merge 和 rebase， 这里讲的蛮清楚了
<a href="http://blog.csdn.net/wh_19910525/article/details/7554489">merge&rebase</a>
<blockquote>
简而言之，merge就是当你跟别人conflict的时候会生成一个新的“合并提交”,
而rebase不会，它会首先取消你的提交，把你的提交信息保存在.git/rebase中作为补丁（patch），
使你的个人分支（当前所在分支）变成新的origin分支，然后一个个添加补丁，这样你的commit树就会像一根线一样看起来整洁（因为补丁都依次排列在原分支后）
</blockquote>
p.s.使用rebase注意一条铁律：
<strong>一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行合并操作！</strong>
<li>因为rebase会经常使你或者其他人的分支变成新的origin，如果不小心是在master分支上rebase的话就会临时产生两个master，所以不允许在master上rebase。个人分支上rebase之后也需要在master分支merge过来，还不如git pull 方便。</li>
<li>还有就是如果rebase一次出现conflict，也需要解决多次冲突，而merge一次解决。</li>
<li>再者，就是许多项目严格按照版本迭代，如果项目有问题需要回滚一个版本，如果用rebase就gg了。rebase会打乱时间戳（自己的commit提到最上面无论时间是否是最近），merge不会打乱时间戳。</li>

## Level 29
这题试了无数次qwq
```bash
git diff
```
给我这么一段东西：
![](/static/img/githug29.png)
百度之后知道是
“-” 开头表示源文件
“+”开头表示目标文件
“@@”那一行表示<strong>差异小结</strong>的开始（注意！这一行下面一行才是差异的第一行！）
就是图中的	“erb  : success”为差异小结第一行，从这里开始数直到“  -  ”，“  +  ”符号出现，这里是第四行，然后加上差异出现位置23行，然后就理所当然得到27 ，（咦不对喔？立马用左右互搏之术得到正确答案26哈哈哈~）其实是我懵逼了，erb是第一行也是23行，所以其实就是26行（第四行就是增加3行）。


## Level 30
这关我并不知道怎么做，当成ctf了哈哈哈
```bash
git log
# 发现一堆二五仔提交，都是对那个文件的修改，每个人改一点，题目问password是谁改的。
```
commit信息里Bruce Banner说是他改的，但我输入不是，但不可能是他之后，只能是之前，往前推一个Spider man，答案正确。（完全就是蒙的）
```bash
git blame config.rb
# 后来知道可以这样来查看所有修改过的代码是谁修改的！这个命令太厉害了命名也恰到好处哈哈哈
```
![](/img/githug30.png)
想找哪一部分是谁写的简直不费吹灰之力~

## Level 31
```bash
git branch test_code
```

## Level 32
```bash
git branch my_branch
git checkout my_branch
```

## Level 33
```bash
git tag # list
git checkout tag_name
```

## Level 34
这题想不到解决办法，只好删掉branch再切tag
```bash
git branch -D v1.2 # -D强制删除
git checkout v1.2
```
网上正确做法是：
```bash
git checkout tags/v1.2
```

## Level 35
```bash
git checkout -b test_branch [commit_id]
# -b : 创建新分支并切换分支
```

## Level 36
```bash
git branch -d ...
```

## Level 37
```bash
git checkout test_branch
git push origin test_branch
```

## Level 38
```bash
git merge feature
```

## Level 39
```bash
git fetch 
# fetch 上面有提到
```

## Level 40
又是rebase，跟28关的提交略有不同，28关的rebase只有一个参数
```bash
git rebase master feature 
# 将feature分支的修改应用到 master上
# 就是给master打上feature这个补丁
```

## Level 41
这题用到了rebase 的 --onto 属性.
<a href="https://www.zhihu.com/question/60279937">知乎：git rebase 的 --onto选项的用法疑问？</a>

```bash
git rebase --onto master wrong read
```

```bash
# 用法：
git rebase --onto A B C
# B与C必须有共同的祖先commit
```
1.checkout到C
2.把B到C之间的commit写成一个文件存着
3.强制git reset --hard 到A（C的HEAD重置为A）
4.把 2 中的commit一个个添加到A，操作结束之后当前分支为C.


## Level 42
repack
```bash
git repack -d 
# repack教程说的.
# “After packing, if the newly created packs make some existing packs redundant, remove the redundant packs. Also run git prune-packed to remove redundant loose object files.”
```

## Level 43
 cherry-pick
```bash
git cherry-pick [commit-id]
# 把特定id的commit在master提交（新commit 的id不同但名字一样）
```

## Level 44
```bash
git grep TODO 
# 检索代码功能。列出了四个
```

## Level 45
这题好玩
```bash
git log
# First coommit 拼错了
git rebase -i HEAD~~~
# 编辑这个文件把first的那行的pick改成edit
git commit --amend
# 修改拼写错误
git rebase --continue
```

## Level 46
git rebase --abort 撤回！
```bash
git rebase -i HEAD^^^
# 将里面的三个pick改成s（squash），意思是将该commit合并到前一个commit。readme本身不用改
git commit --amend
git rebase --continue
```

## Level 47
```bash
git merge --squash [branch_name]
```
将特定分支所有commit合并

## Level 48
reorder
```bash
git rebase -i HEAD~~~
```
直接爆力修改顺序

## Level 49
bisect
厉害
```bash
git bisect start master [first commit_id]
# master就是HEAD所在commit也就是最新commit，bad commit。而first commit 一定是good commit。所以
git bisect run ruby prog.rb 5
# 提示说15是正确结果，于是找到第一个不是15的commit就是正确答案。
```

## Level 50
```bash
git add -e filename
# 删掉第二行就好
```

## Level 51
```bash
# 这题看git log时间一个个找的...
```

## Level 52
revert
```bash
git revert [bad_commit_id]
# revert的意思是不改变历史，“删除”特定commit，方法是新增commmit做特定commit的相反操作。
```

## Level 53
```bash
git reflog
# 列出所有历史
git checkout [restore_id]
# 找到该拿回来的commit_id
```

## Level 54
```bash
git diff
# 全保留就对了
```

## Level 55
submodule
```bash
git submodule add [url] [dir]
```

## Level 56
contribute
可以为官方仓库做贡献，比如出题什么的..
到这里已经结束了。
![](/img/githug56.png)
<hr>
我学到最重要的东西不只是github的许多之前未接触到的知识，而是，希望自己在将来的学习中能充当自己的debuger，常常告诉自己，一句游戏中出现过无数次的话：
<blockquote>Sorry, this solution is not quite right!</blockquote>
 finished.
 
-完成日期： 2018.02.01-