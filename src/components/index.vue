<!-- index.vue -->
<template>
    <div v-if='!isMobile'>
        <transition name="slide">
            <div class="index" v-show='show' :style="{
                'transform': 'translateX('+movement1+'px)'
            }">
                <header>
                    <a href="./"><p>{{ name }}'s Blog</p></a>
                    <small class="update">--{{ updateDate }}更新:)</small>
                </header>
                
                <div class="articles">
                    <div class="article" v-for="(e, idx) in theArticles[currentIndex]">
                        <router-link :to="{path:'toledo',query:{ title: e.title }}" class="title" target="_blank"><p>{{ e.title }}</p></router-link>
                        <p class="time">{{ e.time }}</p>
                        <div :class="{ 'tags' : e.tags[0]!=='' }" >
                            <router-link to="" v-for="(t, idx) in e.tags" :key="idx"><p>{{ t }}</p></router-link> 
                        </div>
                    </div>
                </div>
                <footer>
                    <div class="page" v-for="(e, idx) in totalPages">
                        <span @click ="jump(idx)" :class= "idx === currentIndex ? 'activated' : '' ">{{ idx }}</span>
                    </div>
                </footer>
            </div>
        </transition>
        <transition name='btn'>
           <div class="showmebtn" v-show ='showbtn' @click='changeShowme()' :style="{
                'right': movement2+410+'px'
            }"></div>
        </transition>
        <div class="aboutme" :style="{
            'right': movement2+'px'
        }">
            <div class="avatar"></div>
            <div class="name">Mattéo Kwong</div>
            <div class="quote" @click='showQuote()'>「 Valar Morghulis 」</div>
            <div class="location"><span></span><p>广东·广州</p></div>
            <div class="mail"><span></span><p>429797371@qq.com</p></div>
            <div class="mail"><span></span><p>matteokjh@hotmail.fr</p></div>
            <div class="github"><a href="https://matteokjh.github.io/" target='_blank'><span></span><p>旧博客：matteokjh.github.io</p></a></div>
            <div class="github"><a href="https://github.com/matteokjh" target='_blank'><span></span><p>github.com/matteokjh</p></a></div>
        </div>
        <transition name='mask'>
            <div class="mask" @click='offmask()' v-show='showme'></div>
        </transition>
    </div>

    <!-- mobile -->
    <div v-else class='ccc' :style="{
        'overflow': showme ? 'hidden' : 'auto'
    }">
            <div class="m-index" v-show='show'>
                <header>
                    <a href="./"><p>{{ name }}'s Blog</p></a>
                    <small class="update">--{{ updateDate }}更新:)</small>
                </header>
                
                <div class="articles">
                    <div class="article" v-for="(e, idx) in theArticles[currentIndex]">
                        <router-link :to="{path:'toledo',query:{ title: e.title }}" class="title" target="_blank"><p>{{ e.title }}</p></router-link>
                        <p class="time">{{ e.time }}</p>
                        <div :class="{ 'tags' : e.tags[0]!=='' }" >
                            <router-link to="" v-for="(t, idx) in e.tags" :key="idx"><p>{{ t }}</p></router-link> 
                        </div>
                    </div>
                </div>
                <footer>
                    <div class="page" v-for="(e, idx) in totalPages">
                        <span @click ="jump(idx)" :class= "idx === currentIndex ? 'activated' : '' ">{{ idx }}</span>
                    </div>
                </footer>
            </div>
            <div class="showmebtn" @click='mchangeShowme()'></div>
            <div class="m-aboutme" :style="{
                'right': movement2+'vw'
            }">
                <span class="back" @click='moffmask()'></span>
                <div class="avatar"></div>
                <div class="name">Mattéo Kwong</div>
                <div class="quote" @click='showQuote()'>「 Valar Morghulis 」</div>
                <div class="location"><span></span><p>广东·广州</p></div>
                <div class="mail"><span></span><p>429797371@qq.com</p></div>
                <div class="mail"><span></span><p>matteokjh@hotmail.fr</p></div>
                <div class="github"><a href="https://matteokjh.github.io/" target='_blank'><span></span><p>旧博客：matteokjh.github.io</p></a></div>
                <div class="github"><a href="https://github.com/matteokjh" target='_blank'><span></span><p>github.com/matteokjh</p></a></div>
            </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            currentIndex: 0,
            articlesPerPage: 7,
            name: 'Caster',
            updateDate: '2019-02-26',
            articles: [], //全部
            totalPages: 0,
            theArticles: [], //该页包含
            show: false,
            showme: false,
            showbtn: false,
            movement1: '',
            movement2: -353,
            isMobile: ''
        }
    },
    methods: {
        jump: function(idx){
            this.currentIndex = idx;
        },
        changeShowme(){
            this.showme = true;
            this.movement1 = -150;
            this.movement2 = 0;
        },
        offmask(){
            this.showme = false;
            this.movement1 = 0;
            this.movement2 = -353;
        },
        showQuote(){
            console.log('Valar Dohaeris')
        },
        mchangeShowme(){
            this.showme = true;
            this.movement2 = 0;
        },
        moffmask(){
            this.showme = false;
            this.movement2 = -100;
        }

    },
    mounted() {
        // let origin = location.origin.split(':').splice(0,2).join(":");
        // origin = origin.replace('https','http');
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        let isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
        this.isMobile = isIphone || isAndroid;

        let origin = 'https://api.sulpures.com/'
        this.$http.get(origin + 'users/getblogs')
        .then( response => {
            this.articles = response.data.data;
            // console.log(this.articles)
            let total = this.articles.length;
            this.totalPages = Math.ceil(total/this.articlesPerPage);
            var pageArticles = [];
            let a = [];
            for( let i=0; i<this.totalPages; i++){
                if( i === this.totalPages - 1){
                    let b = [];
                    for(let j = i*this.articlesPerPage; j < this.articles.length; j++)
                        b.push(this.articles[j]);
                    a.push(b)
                }else {
                    let b = [];
                    for( let j = 0; j < this.articlesPerPage; j++){
                        
                        b.push(this.articles[i*this.articlesPerPage + j]);
                    }
                    a.push(b)
                }
            }
            this.theArticles = a;
            this.show = true;
            setTimeout(e=>{
                this.showbtn = true;
            },1000)

            
        })

        //出场动画

    }

}
</script>

<style scoped>
.back {
    background-image: url('../assets/left-arrow.png');
    width: 25px;
    height: 25px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    float: left;
    margin: 15px;
    transform: rotate(180deg);
}
.ccc {
    width: 100vw;
    height: 100vh;
    position: relative;
}
.m-index header {
    position: relative;
    font-size: 25px;
    padding: 5vh 10vw;
    text-align: left;    
    width: 80vw;
    border-bottom: 1px dotted #aaa;

}
.m-aboutme .avatar {
    background-image: url('../assets/avatar.jpg');
    width: 120px;
    height: 120px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 80px auto 20px auto;
    box-shadow: 0 0 3px 3px #333;
    border-radius: 5px;
}
.m-aboutme .name {
    font-size: 20px;
    text-shadow: 0 0 5px #b5b5b5;
    user-select: none;
    text-align: center;
    color: #e6e6e6;
}
.m-aboutme .quote {
    margin: 30px;
    padding: 40px 0;
    border-top: 10px solid #555;
    border-bottom: 10px solid #555;
    user-select: none;
    cursor: pointer;
    text-align: center;
    color: #e6e6e6;
}
.m-aboutme .location,.m-aboutme .mail,.m-aboutme .github {
    margin: 15px 30px;
    text-align: left;
}
.m-aboutme .location span, .m-aboutme .github span, .m-aboutme .mail span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    vertical-align: middle;
    margin-right: 3px;
}

a {
    text-decoration: none;
    color: inherit;
}
.m-index .update {
    display: inline-block;
    position: absolute;
    right: 1%;
    bottom: 0;
    height: 20px;
    font-size: 13px;
    opacity: 1;
}
.articles {
    width: 100%;
}
.m-index .article {
    position: relative;
    padding: 5vw 0vh;
    border-bottom: 1px solid #eee;
}
.article:last-child {
    border-bottom: none;
}
.m-index .title p {
    display: inline;
    font-size: 14px;
}
.m-index .time {
    font-size: .5rem;
    position: absolute;
    right: 3%;
    bottom: 5%;
    color: #aaa;
    opacity: 1;
}
.article:hover > .time {
    opacity: 1;
}
.m-index .tags {
    width: 97%;
    font-size: .12px;
    text-align: left;
    margin-left: 3vw;
    margin-top: 3vh;
    margin-bottom: -1vh;
}
.m-index .tags a {
    display: inline-block;
    user-select: none;
    border-radius: 10px;
    padding: 0 3%;
    margin: 0 .5%;
    background-color: rgb(148,148,148);
    opacity: .4;
    transition: all .3s;
    cursor: pointer;
}
.m-index .tags a p {
    line-height: 2em;
    color: rgb(255,255,255);
    font-size: .8rem;
}
.tags a:hover {
    opacity: .6;
}
.activated {
    color: #aaa;
}
.m-index + .showmebtn {    
    position: absolute;
    top: 5vh;
    right: 7vw;
    width: 15vw;
    height: 5vh;
    background-image: url('../assets/menu.png');
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
}
.m-aboutme {
    position: fixed;
    z-index: 999;
    right: -100vw;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #2d2d2d;
    transition: all .5s;
    overflow: scroll;
}
.m-aboutme p{
    color: #e6e6e6;
    font-size: 15px;
    line-height: initial;
}
</style>

<style scoped>
.avatar {
    background-image: url('../assets/avatar.jpg');
    width: 120px;
    height: 120px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 80px auto 20px auto;
    box-shadow: 0 0 3px 3px #333;
    border-radius: 5px;
}
.name {
    font-size: 20px;
    text-shadow: 0 0 5px #b5b5b5;
    user-select: none;
    text-align: center;
    color: #e6e6e6;
}
.quote {
    margin: 30px;
    padding: 40px 0;
    border-top: 10px solid #555;
    border-bottom: 10px solid #555;
    user-select: none;
    cursor: pointer;
    text-align: center;
    color: #e6e6e6;
}
.location,.mail,.github {
    margin: 15px 30px;
    text-align: left;
}
.location span, .github span, .mail span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    vertical-align: middle;
    margin-right: 3px;
}
.location span {
    background-image: url('../assets/icon-location.png');
}
.github span {
    background-image: url('../assets/github.png');
}
.mail span  {
    background-image: url('../assets/mail.png');
}
.location p, .mail p, .github p {
    display: inline-block;
    height: 20px;
    vertical-align: middle;
}
.github a {
    display: block;
}
.github p {
    transition: all .3s;
    border-bottom: 1px solid transparent;
}
.github p:hover {
    border-bottom: 1px solid #e6e6e6;
}
.index {
    transition: transform .5s;
    transition-delay: .2s;
}
header {
    border-bottom: 1px dotted #aaa;
}
.slide-enter {
    opacity: 0;
    transform: translate(-10px, -50px);
}
.slide-enter-active {
    transition: all .6s;
}
.slide-enter-to {
    opacity: 1;
    transform: translate(0);
}
.btn-enter {
    opacity: 0;
}
.btn-enter-to {
    opacity: 1;
}
a {
    text-decoration: none;
    color: inherit;
}
.update {
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
.articles {
    width: 100%;
}
.article {
    position: relative;
    padding: 5% 25% 5% 5%;
    border-bottom: 1px solid #eee;
}
.article:last-child {
    border-bottom: none;
}
.title {
    display: block;
    margin-left: 5%;
    text-align: left;
    cursor: pointer;

}
.title:hover > p {
    border-bottom: 1px solid rgba(200,200,200,.8);
}
.title p {
    display: inline;
    font-size: 1.2rem;
    transition: all .2s;
    border-bottom: 1px solid rgba(200,200,200,0);
}
.time {
    user-select: none;
    font-size: .5rem;
    position: absolute;
    right: 3%;
    bottom: 5%;
    color: #aaa;
    opacity: 0;
    transition: all .3s;
}
.article:hover > .time {
    opacity: 1;
}
.tags {
    user-select: none;
    width: 97%;
    font-size: .12px;
    text-align: left;
    margin-left: 4%;
    margin-top: 5%;
    margin-bottom: -5%;
}
.tags a {
    display: inline-block;
    user-select: none;
    border-radius: 10px;
    padding: 0 3%;
    margin: 0 .5%;
    background-color: rgb(148,148,148);
    opacity: .4;
    transition: all .3s;
    cursor: pointer;
}
.tags a p {
    line-height: 2em;
    color: rgb(255,255,255);
    font-size: .8rem;
}
.tags a:hover {
    opacity: .6;
}
footer {
    display: block;
    user-select: none;
    height: 10%;
    margin: 0 auto;
    padding: 5% 8%;
    bottom: 0;
    background-color: white;
    border-top: 1px dotted #aaa;
    text-align: left;
}
.page {
    display: inline-block;
    font-size: 1.5rem;
    margin: 0 1%;
    padding: 0 0%;
    cursor: pointer;
    border-bottom: 2px solid rgba(200,200,200,0);
    opacity: .8;
    transition: all .3s;
}
.page:hover {
    border-bottom: 2px solid rgba(200,200,200,.8);
}
.activated {
    color: #aaa;
}
.showmebtn {
    position: fixed;
    top: 20px;;
    right: 60px;
    width: 60px;
    height: 40px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 5px;
    background-image: url('../assets/menu.png');
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    transition: all .5s;
}
.showmebtn:hover {
    border: 1px solid #bbb;
    box-shadow: 0 0 1px 1px #eee;
}
.aboutme {
    position: fixed;
    z-index: 999;
    right: -353px;
    top: 0;
    width: 350px;
    height: 100vh;
    background-color: #2d2d2d;
    transition: all .5s;
    box-shadow: 0px 0 1px 1px #2d2d2d;
}
.aboutme p{
    color: #e6e6e6;
    font-size: 15px;
    line-height: initial;
}
.mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(103, 97, 97, 0.4);
    transition: all .5s;
}
.mask-enter {
    opacity: 0;
}
.mask-enter-to {
    opacity: 1;
}
.mask-leave-to {
    opacity: 0;
}

</style>