<template>
  <div :class="{
        'm-toledo': 1,
        'night': state,
        'day': !state
    }" v-show="show">
    <header>
      <a href="javascript:void(0)" onclick="location.reload()">
        <p>{{ title }}</p>
      </a>
      <small class="time">--{{time}}发布:)</small>
      <night-mode
        :state='state'
        :isMobile='true'
        @changeNight='changeNight()'
      ></night-mode>
    </header>
    <div v-html="raw" class="m-t-detail"></div>
    <footer>
      <router-link target="_blank" :to="{path:'toledo',query:{title: this.prev}}">
        <p v-if="this.prev">上一篇：{{ this.prev }}</p>
      </router-link>
      <router-link target="_blank" :to="{path:'toledo',query:{title: this.next}}">
        <p v-if="this.next">下一篇: {{ this.next }}</p>
      </router-link>
    </footer>

    <div id="m-container"></div>
  </div>
</template>

<script>
import "gitment/style/default.css";
import Gitment from "gitment";
import nightMode from '@/components/night-mode'
export default {
  data() {
    return {
      title: this.$route.query.title,
      time: "",
      tags: [],
      categories: [],
      raw: "",
      indexList: [],
      prev: "",
      next: "",
      show: false,
      state: JSON.parse(localStorage.getItem('night')), //夜间模式
    };
  },
  components: {
      "night-mode": nightMode
  },
  methods: {
    changeNight(){
        this.state = !this.state
        localStorage.setItem('night',this.state)
    }
  },
  mounted() {
    //临时放置博客内嵌函数
    // console.log(this.title)
    if (this.title === "CSS布局") {
      setTimeout(function() {
        blogCSS(); //CSS布局
      }, 500);
    }

    this.show = true;

    var ttt = 0;
    // let origin = location.origin.split(':').splice(0,2).join(":");
    // origin = origin.replace('https','http');

    let origin = "https://api.sulpures.com/";
    this.$http
      .get(origin + "users/getdetails", {
        params: {
          title: this.title
        }
      })
      .then(e => {
        let data = e.data.data;
        document.title = data.title;
        this.title = data.title;
        this.time = data.time;
        ttt = data.time + data.excTime;
        // console.log(ttt)
        this.tags = data.tags;
        this.categories = data.categories;
        this.raw = data.detail;
      })
      .then(f => {
        //给markdown的链接加上_blank
        var links = document.links;
        for (var i = 0, linksLength = links.length; i < linksLength; i++) {
          if (links[i].hostname != window.location.hostname) {
            links[i].target = "_blank";
          }
        }
        // console.log(links)
      });
    this.$http
      .get(origin + "users/getblogs", {
        params: {
          title: this.title
        }
      })
      .then(e => {
        let data = e.data.data;
        let title = this.title;
        this.indexList = data;
        data.forEach((e, idx) => {
          if (e.title === title) {
            this.prev = idx - 1 >= 0 ? data[idx - 1].title : "";
            this.next = idx + 1 < data.length ? data[idx + 1].title : "";
          }
        });
      });

    //gitment init
    const myTheme = {
      render(state, instance) {
        const container = document.createElement("div");
        container.lang = "en-US";
        container.className = "gitment-container gitment-root-container";

        // your custom component
        container.appendChild(instance.renderSomething(state, instance));

        container.appendChild(instance.renderHeader(state, instance));
        container.appendChild(instance.renderEditor(state, instance));
        container.appendChild(instance.renderComments(state, instance));
        container.appendChild(instance.renderFooter(state, instance));
        return container;
      },
      renderSomething(state, instance) {
        const container = document.createElement("div");
        container.lang = "en-US";
        if (state.user.login) {
          container.innerText = `Hello, ${state.user.login}`;
        }
        return container;
      }
    };
    setTimeout(function() {
      // console.log(ttt)
      const gitment = new Gitment({
        id: ttt, // 可选，默认是location.href，用来区分不同的博客
        owner: "matteokjh", //GitHub用户名/ID
        repo: "gitmentRepo", //存放评论的github仓库名
        oauth: {
          client_id: "90a192b7d9a6d0683485",
          client_secret: "b542c7239e8ab00298e229608e325064b4e9e815"
          // redirect_uri: 'http://108.61.183.77',
        },
        theme: myTheme
      });
      gitment.render("m-container");
    }, 1000);
  }
};
</script>


<style lang="css">
.m-toledo.night {
    --bg: #282c35;
    --textNormal: hsla(0,0%,100%,0.88);
    --hr: #282c35;
    --inlineCode-bg: #222;
    --inlineCode-text: #e6e6e6;
    --menu: url("../assets/menu2.png");
    --tag: rgb(148, 148, 148);
    --comment: #63e555;
    --params: #92bcea;
}
.m-toledo.day {
    --bg: #fff;
    --textNormal: #222;
    --hr: #eee;
    --inlineCode-bg: #373c49;
    --inlineCode-text: #e6e6e6;
    --comment: #75715e;
    --menu: url("../assets/menu.png");
    --tag: rgb(148, 148, 148);
    --params: #75715e;

}
.m-toledo {
    transition: all .3s;
    background-color: var(--bg);
}
.m-toledo hr {
  margin: 5vh 0;
}
.m-t-detail {
  width: 90vw;
  padding: 0 5vw;
}
.m-toledo header {
  padding: 5vh 5vw;
  width: 90vw;
}
.m-toledo .time {
  display: inline-block;
  position: absolute;
  right: 5vw;
  bottom: 0;
  height: 20px;
  font-size: 13px;
  opacity: .4;
}
.m-toledo footer {
  padding: 0 2vw;
}
.m-toledo footer a {
  max-width: 50%;
}
.m-toledo footer p {
  font-size: 12px;
}
.m-toledo header p {
  font-size: 20px;
}
.hljs-params {
    color: var(--params);
    transition: all .3s;
}
#m-container {
  width: 90vw;
  height: 100vh;
  padding: 0 5vw;
}
.gitment-header-container * {
    color: #777;
}
.gitment-root-container p {
  font-size: 0.8rem;
}
.gitment-header-issue-link {
  font-size: 0.8rem;
  line-height: 3vh;
}
.gitment-editor-tabs > button {
  font-size: 0.8rem;
}
a.gitment-editor-footer-tip {
  display: none;
}
.gitment-editor-tab {
    padding: 2vh 2vw;

}
.gitment-editor-header {
  display: inline-block;
  width: 100%;
}
.gitment-editor-tabs {
  width: 40vw;
  display: inline-block;
  line-height: 0;
}
.gitment-editor-login {
  width: 20vw;
  font-size: 0.6rem;
  display: inline-block;
  float: none;
  margin: 0;
  transform: translateY(1vh);
}
a.gitment-header-issue-link {
    line-height: 3vh;
}
.gitment-footer-container {
    margin-bottom: 0;
    padding-bottom: 20px;
    color: var(--textNormal);
}
.gitment-editor-tab.gitment-selected {
    background-color: transparent;
    color: var(--textNormal);
}
.gitment-editor-tab {
    color: var(--textNormal)
}
.gitment-editor-login {
    position: absolute;
    right: 3px;
    top: 0;
    color: var(--textNormal);
}
.gitment-editor-body textarea {
    background-color: var(--bg)
}
.gitment-comment-header {
    background-color: var(--bg)

}
.gitment-container * {
    color: var(--textNormal);
}
</style>