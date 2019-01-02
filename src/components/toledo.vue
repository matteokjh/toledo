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
    mounted() {
        console.log("%c<font color='#f38181'>红</font>","color: #f38181");
        console.log("%c<font color='#fce38a'>黄</font>","color: #fce38a");
        console.log("%c<font color='#f08a5d'>橘</font>","color: #f08a5d");
        console.log("%c<font color='#a8d8ea'>蓝</font>","color: #a8d8ea");

        let origin = location.origin.split(':').splice(0,2).join(":");
        this.$http.get(origin+':3000/users/getdetails',{
            params: {
                title: this.title
            }
        }).then( e => {
            let data = e.data.data;
            document.title = data.title;
            this.title = data.title;
            this.time = data.time;
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
        this.$http.get(origin + ':3000/users/getblogs',{
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