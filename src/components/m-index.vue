<template>
    <!-- mobile -->
    <div class='m-index'>
            <div class="m-index" :style="{
                'height': showme ? '100vh' : 'auto',
                'overflow-y': showme ? 'hidden' : 'auto'
            }">
                <header>
                    <a href="./"><p>{{ name }}'s Blog</p></a>
                    <small class="update">--{{ updateDate }}更新:)</small>
                </header>
                
                <div class="articles">
                    <div class="article" :key=idx v-for="(e, idx) in theArticles[currentIndex]">
                        <router-link :to="{path:'toledo',query:{ title: e.title }}" class="title" target="_blank"><p>{{ e.title }}</p></router-link>
                        <p class="time">{{ e.time }}</p>
                        <div :class="{ 'tags' : e.tags[0]!=='' }" >
                            <router-link to="" v-for="(t, idx) in e.tags" :key="idx"><p>{{ t }}</p></router-link> 
                        </div>
                    </div>
                </div>
                <footer>
                    <div class="page" :key=idx v-for="(e, idx) in totalPages">
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
                <div class="github"><a href="https://matteokjh.github.io/" target='_blank'><span></span><p style='border: none;'>旧博客：</p><p>matteokjh.github.io</p></a></div>
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
            movement2: -353
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

<style lang="css" scoped>
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
.m-index {
    width: 100vw;
    height: auto;
    position: relative;
    overflow-x: hidden;
}
header {
    position: relative;
    padding: 5vh 10vw;
    text-align: left;    
    width: 80vw;
    border-bottom: 1px dotted #aaa;
}
header p {
    font-size: 25px;
}
.github p {
    border-bottom:1px solid #e6e6e6;
}
.github:last-child {
    margin-bottom: 10vh;
}
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
    color: #aaa;
}
.articles {
    width: 100%;
}
.article {
    position: relative;
    padding: 5vw 0vh;
    border-bottom: 1px solid #eee;
    text-align: left;
}
.article:last-child {
    border-bottom: none;
}
.title p {
    display: inline;
    font-size: 16px;
    margin-left: 5vw;
}
.time {
    font-size: .5rem;
    position: absolute;
    right: 3%;
    bottom: 5%;
    color: #aaa;
    opacity: 1;
}
.tags {
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
    margin: 0 5vw;
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
.activated {
    color: #aaa;
}
.showmebtn {    
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
    position: absolute;
    z-index: 999;
    right: -100vw;
    top: 0;
    width: 100vw;
    height: 100%;
    background-color: #2d2d2d;
    transition: all .5s;
    overflow: scroll;
}
.m-aboutme p{
    color: #e6e6e6;
    font-size: 15px;
    line-height: initial;
    display: inline-block;
}
footer {
    display: block;
    user-select: none;
    height: 5vh;
    padding: 2vh 5vw;
    bottom: 0;
    background-color: white;
    border-top: 1px dotted #aaa;
    text-align: left;
}
.page {
    display: inline-block;
    font-size: 1.5rem;
    margin: 0 2vw;
    cursor: pointer;
    border-bottom: 2px solid rgba(200,200,200,0);
    opacity: .8;
}
</style>

