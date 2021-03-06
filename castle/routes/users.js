var express = require('express');
var router = express.Router();
var URL = require("url");
var getBlogs = require('./blog');
var User = require('./user');
var hljs = require('highlight.js');
var fs2 = require('fs');
var md = require('markdown-it')({
    highlight: function(str, lang) {
        if(lang && hljs.getLanguage(lang)){
            return hljs.highlight(lang, str).value;
        }
    },
    html: true
});


const fs = require('then-fs')
    , path = require('path')
    , COMPONENT = path.join('./blogs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



//获取博客，生成json,发给前端index（不获取内容）
router.get('/getblogs', (req,res) => {
    let title = req.query.title;
    if(title){
        getBlogs().then( blogList => {
            var idx = [];
            let title, time;
            //筛选获取博客信息
            blogList.forEach( e=> {
                let s = {};
                let summary = e.split('<!-- more -->')[0].split('\n');
                summary.forEach( e => {
                    if(e.indexOf('title') === 0)  {
                        title = e.split(': ')[1];
                    }
                    if(e.indexOf('date') === 0)  time = e.split(' ')[1];
                    s.title = title;
                    s.time = time;
                })
                idx.push(s);
            })
            function sorter(a,b){
                if(a.time > b.time) return -1;
                else if(a.time < b.time) return 1;
                else return 0;
            }
            idx.sort(sorter)
            let response = {
                status: 1, data: idx
            }
            res.json(response);
        });
    }else{
        getBlogs().then( blogList => {
            var infoList =[];
            //筛选获取博客信息
            blogList.forEach( e=> {
                let summary = e.split('<!-- more -->')[0].split('\n');
                let s = { title: '', time: '',mtime: '', tags: [], categories: [], detail: ''};
                summary.forEach( e => {
                    if(e.indexOf('title') === 0)  {
                        s.title = e.split(': ')[1];
                        // console.log(s.title);
                        fs.stat(`./${COMPONENT}/${s.title}.md`, (err, stats) => {
                            // console.log(s.title,stats);
                            s.mtime = stats.mtime.toLocaleString().split(" ")[0];
                        })
                    }
                    if(e.indexOf('date') === 0)  s.time = e.split(' ')[1];
                    if(e.indexOf('tags') === 0) s.tags = e.split(': ')[1].split(',');
                    if(e.indexOf('categories') === 0) s.categories = e.split(': ')[1].split(',');
                })
                infoList.push(s);
            })
            function sorter(a,b){
                if(a.time > b.time) return -1;
                else if(a.time < b.time) return 1;
                else return 0;
            }
            infoList.sort(sorter)
            // console.log(fs2.statSync(`./${COMPONENT}/`))
            // let updateTime = fs2.statSync(`./${COMPONENT}/`).mtimeMs.toString();
            let updateTime = fs2.statSync(`./${COMPONENT}/`).mtime.toLocaleDateString().replace(/-(\d)(?!\d)/g,'-0$1');
            
            let data = {
                infoList,
                updateTime
            }
            res.json(data);
        });
    }

    
    
})

//根据title获取文章内容给子页
router.get('/getdetails',(req,res) => {
    let title = req.query.title;
    var detail = {};
    fs.readFile(`${COMPONENT}/${title}.md`,'utf-8').then( e=>{
        let summary = e.split('<!-- more -->')[0].split('\n');
        summary.forEach( e => {
            if(e.indexOf('title') === 0)  detail.title = e.split(': ')[1];
            if(e.indexOf('date') === 0)  {
                detail.time = e.split(' ')[1];
                detail.excTime = e.split(' ')[2];
            };
            if(e.indexOf('tags') === 0) e.split(': ')[1] !== '' ? detail.tags = e.split(': ')[1].split(',') : [];
            if(e.indexOf('categories') === 0) e.split(': ')[1] !== '' ? detail.categories = e.split(': ')[1].split(','): [];
        })
        detail.detail = md.render(e.split('<!-- more -->')[1]);
        let response = {
            status: 1, data: detail
        }
        res.json(response);
    })
    
})

module.exports = router;
