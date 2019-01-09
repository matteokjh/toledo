<!-- index.vue -->
<template>
    <transition name="slide">
        <div class="index">
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
</template>

<script>
export default {
    data (){
        return {
            currentIndex: 0,
            articlesPerPage: 7,
            name: 'Caster',
            updateDate: '2018-04-16',
            articles: [], //全部
            totalPages: 0,
            theArticles: [] //该页包含
        }
    },
    methods: {
        jump: function(idx){
            this.currentIndex = idx;
        }
    },
    mounted() {
        let origin = location.origin.split(':').splice(0,2).join(":");
        this.$http.get(origin + ':3003/users/getblogs')
        .then( response => {
            this.articles = response.data.data;
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
        })

        //出场动画

    }

}
</script>

<style scoped>
header {
    border-bottom: 1px dotted #aaa;
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

</style>