<!-- toledo.vue -->
<template>
    <transition name="slide">
        <div class="toledo">
            <header>
                <a href="javascript:void(0)" onclick="location.reload()"><p>{{ title }}</p></a>
                <small class="time">--{{time}}发布:)</small>
            </header>
            <div v-html = 'raw' class="t-detail"></div>
            <footer>
                <router-link target="_blank" :to="{path:'toledo',query:{title: this.prev}}"><p v-if="this.prev">上一篇：{{ this.prev }}</p></router-link>
                <router-link target="_blank" :to="{path:'toledo',query:{title: this.next}}"><p v-if="this.next">下一篇: {{ this.next }}</p></router-link>
            </footer>

            <div id="container"></div>
        </div>
    </transition>
</template>

<script>
function blogCSS(){
    let a = document.getElementById('stretch')
    let b = document.getElementById('start')
    let c = document.getElementById('end')
    let d = document.getElementById('center')
    let hero = document.getElementsByClassName('grid')[1]
    a.onclick = function(){
        hero.style.justifyItems = 'stretch'
    }
    b.onclick = function(){
        hero.style.justifyItems = 'start'
    }
    c.onclick = function(){
        hero.style.justifyItems = 'end'
    }
    d.onclick = function(){
        hero.style.justifyItems = 'center'
    }
}
import 'gitment/style/default.css'
import Gitment from 'gitment'
export default {
    data (){
        return {
            title: this.$route.query.title,
            time: '',
            tags: [],
            categories: [],
            raw: '',
            indexList: [],
            prev: '',
            next: ''
        }
    },
    methods: {
        
    },
    mounted() {
        console.log("%c<font color='#f38181'>红</font>","color: #f38181");
        console.log("%c<font color='#fce38a'>黄</font>","color: #fce38a");
        console.log("%c<font color='#f08a5d'>橘</font>","color: #f08a5d");
        console.log("%c<font color='#a8d8ea'>蓝</font>","color: #a8d8ea");
        
        //临时放置博客内嵌函数
        // console.log(this.title)
        if(this.title === 'CSS布局'){
            setTimeout(function(){
                blogCSS();//CSS布局
            },500)
        }
        

        var ttt = 0;
        let origin = location.origin.split(':').splice(0,2).join(":");
        this.$http.get(origin+':3003/users/getdetails',{
            params: {
                title: this.title
            }
        }).then( e => {
            let data = e.data.data;
            document.title = data.title;
            this.title = data.title;
            this.time = data.time;
            ttt = data.time + data.excTime;
            // console.log(ttt)
            this.tags = data.tags;
            this.categories = data.categories;
            this.raw = data.detail;
        }).then( f=>{ //给markdown的链接加上_blank
            var links = document.links;
            for (var i = 0, linksLength = links.length; i < linksLength; i++) {
                if (links[i].hostname != window.location.hostname) {
                    links[i].target = '_blank';
                } 
            }
            // console.log(links)
        });
        this.$http.get(origin + ':3003/users/getblogs',{
            params: {
                title: this.title
            }
        }).then(e => {
            let data = e.data.data;
            let title = this.title;
            this.indexList = data;
            data.forEach( (e, idx)=>{
                if(e.title === title) {
                    this.prev = idx-1 >= 0 ? data[idx-1].title : '';
                    this.next = idx+1 < data.length ? data[idx+1].title : '';
                }
            })
        });


        //gitment init
        const myTheme = {
            render(state, instance) {
                const container = document.createElement('div')
                container.lang = "en-US"
                container.className = 'gitment-container gitment-root-container'
                
                // your custom component
                container.appendChild(instance.renderSomething(state, instance))
                
                container.appendChild(instance.renderHeader(state, instance))
                container.appendChild(instance.renderEditor(state, instance))
                container.appendChild(instance.renderComments(state, instance))
                container.appendChild(instance.renderFooter(state, instance))
                return container
            },
            renderSomething(state, instance) {
                const container = document.createElement('div')
                container.lang = "en-US"
                if (state.user.login) {
                    container.innerText = `Hello, ${state.user.login}`
                }
                return container
            }
        }    
        setTimeout(function(){
            // console.log(ttt)
            const gitment = new Gitment({
                id: ttt, // 可选，默认是location.href，用来区分不同的博客
                owner: 'matteokjh',//GitHub用户名/ID
                repo: 'gitmentRepo',//存放评论的github仓库名
                oauth: {
                    client_id: '90a192b7d9a6d0683485',
                    client_secret: 'b542c7239e8ab00298e229608e325064b4e9e815',
                    // redirect_uri: 'http://108.61.183.77',
                },
                theme: myTheme
            })
            gitment.render('container') 
        },1000)
        
    }
}
</script>

<style>
.hljs-params {
    color: #75715e;
}
header {
    border: none;
}

header p{
    font-size: 2rem;
}
h1 {
    font-size: 1.8rem;
    margin: 5% 0;
}
h2 {
    font-size: 1.5rem;
    margin: 5% 0;
}
h3 {
    font-size: 1.2rem;
    margin: 5% 0;
}
h4 {
    font-size: 1rem;
    margin: 5% 0;
}
h1:before,h2:before,h3:before {
    content: '# ';
}
p {
    line-height: 2em;
    color: #555;
    font-size: .8rem;
}
div {
    text-align: left;
}
blockquote {
    border-left: 4px solid #ddd;
    color: #666;
    padding-left: 15px;
    margin: 5% 0;
}
blockquote p {
    font-size: .9rem;
}
hr {
    margin: 40px 0;
    border: none;
    height: 3px;
    background-color: #ddd;
    background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 4px, transparent 8px);
}
pre {
    background-color: #f7f7f7;
    margin: 3% 0;
    padding: 3%;
    overflow-x: auto;
}
pre code {
    font-size: .8rem;
}
.hljs-comment {
    opacity: .6;
}
.hljs-name {
    color: #f92672;
}
.hljs-tag {
    color: #75715e;
}
.hljs-string {
    color: rgb(249, 145, 87);
}
.hljs-built_in {
    color: rgb(255, 204, 102);
}
.slide-enter {
    opacity: 0;
    transform: translate(-3%, -10%);
}
.slide-enter-active {
    transition: all .6s;
}
.slide-enter-to {
    opacity: 1;
    transform: translate(0);
}
header a, a.router-link-active {
    text-decoration: none;
    color: inherit;
}
a {
    display: block;
    text-decoration: underline;
    color: cornflowerblue;
}
.time {
    display: inline-block;
    position: absolute;
    right: 1%;
    bottom: 0;
    height: 20px;
    font-size: 13px;
    opacity: 0;
    transition: all .3s;
    user-select: none;
}
header:hover > small {
    opacity: .6;
}
.title {
    display: block;
    margin-left: 5%;
    text-align: left;
    font-size: 1.2rem;
    cursor: pointer;

}
.title:hover > p {
    border-bottom: 1px solid rgba(200,200,200,.8);
}
.title p {
    display: inline;
    transition: all .2s;
    border-bottom: 1px solid rgba(200,200,200,0);
}
.tags {
    user-select: none;
    width: 97%;
    font-size: .12px;
    text-align: left;
    margin-left: 3%;
    margin-top: 5%;
    margin-bottom: -5%;
}
.tags a {
    display: inline-block;
    user-select: none;
    border-radius: 10px;
    padding: 1% 3%;
    margin: 0 .5%;
    color: rgb(255,255,255);
    background-color: rgb(148,148,148);
    opacity: .4;
    transition: all .3s;
    cursor: pointer;
}
.tags a:hover {
    opacity: .6;
}
footer {
    display: flex;
    justify-content: space-between;
    user-select: none;
    height: 10%;
    margin: 10% auto;
    bottom: 0;
    background-color: white;
    border-top: 1px dotted #aaa;
    text-align: left;
}
footer p {
    display: inline;
    opacity: .6;
    transition: all .5s ease;
}
footer p:hover {
    opacity: 1;
}
img {
    max-width: 600px;
}
blockquote p {
    white-space: pre-wrap;
}
</style>