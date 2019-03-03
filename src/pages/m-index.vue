<template>
    <!-- mobile -->
    <div :class="{
        'm-index': 1,
        'night': state,
        'day': !state
    }">
            <div class="m-index" :style="{
                'height': showme ? '100vh' : 'auto',
                'overflow-y': showme ? 'hidden' : 'auto'
            }">
                <header>
                    <a href="./"><p>{{ name }}'s Blog</p></a>
                    <small class="update">--{{ updateDate }}更新:)</small>
                    <night-mode
                        :state='state'
                        :isMobile='true'
                        @changeNight='changeNight()'
                    ></night-mode>
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


            <info-card 
                :showbtn='showbtn' 
                :movement2='movement2' 
                :showme='showme'
                :isMobile='isMobile'
                @offmask='moffmask()'
                @changeShowme='mchangeShowme()'
            ></info-card>
    </div>
</template>

<script>
import infoCard from '@/components/info-card'
import nightMode from '@/components/night-mode'
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
            isMobile: true,
            state: JSON.parse(localStorage.getItem('night')) //夜间模式
        }
    },
    components: {
        "info-card": infoCard,
        "night-mode": nightMode
    },
    methods: {
        jump: function(idx){
            this.currentIndex = idx;
        },
        mchangeShowme(){
            this.showme = true;
            this.movement2 = 0;
        },
        moffmask(){
            this.showme = false;
            this.movement2 = -100;
        },
        changeNight(){
            this.state = !this.state
            localStorage.setItem('night',this.state)
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
.m-index.night {
    --bg: #282c35;
    --textNormal: hsla(0,0%,100%,0.88);
    --menu: url("../assets/menu2.png");
    --tag: rgb(148, 148, 148);
}
.m-index.day {
    --bg: #fff;
    --textNormal: #222;
    --menu: url("../assets/menu.png");
    --tag: rgb(148, 148, 148);

}
.m-index {
    width: 100vw;
    height: auto;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    background-color: var(--bg);
    transition: all .3s;
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
p {
    color: var(--textNormal);
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
    background-color: var(--tag);
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

footer {
    display: block;
    user-select: none;
    height: 5vh;
    padding: 2vh 5vw 4vh 5vw;
    bottom: 0;
    background-color: transparent;
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
    color: var(--textNormal);
}
</style>

