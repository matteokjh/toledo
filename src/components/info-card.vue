<template>
    <div class="info-card" v-if='!isMobile'>
        <transition name='btn'>
        <div class="showmebtn" v-show ='showbtn' @click="$emit('changeShowme')" :style="{
            'right': movement2+410+'px'
        }"></div>
        </transition>
        <div class="aboutme" :style="{
            'right': movement2+'px'
        }">
            <div class="avatar"></div>
            <div class="name">Mattéo Kwong</div>
            <div class="quote"  @click="$emit('showQuote')">「 Valar Morghulis 」</div>
            <div class="location"><span></span><p>广东·广州</p></div>
            <div class="mail"><span></span><p>429797371@qq.com</p></div>
            <div class="mail"><span></span><p>matteokjh@hotmail.fr</p></div>
            <div class="github"><a href="https://matteokjh.github.io/" target='_blank'><span></span><p>旧博客：matteokjh.github.io</p></a></div>
            <div class="github"><a href="https://github.com/matteokjh" target='_blank'><span></span><p>github.com/matteokjh</p></a></div>
        </div>
        <transition name='mask'>
            <div class="mask" @click="$emit('offmask')" v-show='showme'></div>
        </transition>
    </div>

    <!-- mobile -->
    <div class="m-info-card" v-else>
        <div class="showmebtn"  @click="$emit('changeShowme')"></div>
        <div class="m-aboutme" :style="{
            'right': movement2+'vw'
        }">
            <span class="back"  @click="$emit('offmask')"></span>
            <div class="avatar"></div>
            <div class="name">Mattéo Kwong</div>
            <div class="quote">「 Valar Morghulis 」</div>
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
    name: 'info-card',
    props: [
        "showbtn",
        "movement2",
        "showme",
        "showQuote",
        "offmask",
        "changeShowme",
        "isMobile"
    ],
    mounted(){
        
    }
}
</script>

<style lang="css" scoped>
/*mobile*/
.m-info-card .back {
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
.m-info-card .github p {
    border-bottom:1px solid #e6e6e6;
}
.m-info-card .github:last-child {
    margin-bottom: 10vh;
}
.m-info-card .avatar {
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
.m-info-card .name {
    font-size: 20px;
    text-shadow: 0 0 5px #b5b5b5;
    user-select: none;
    text-align: center;
    color: #e6e6e6;
}
.m-info-card .quote {
    margin: 30px;
    padding: 40px 0;
    border-top: 10px solid #555;
    border-bottom: 10px solid #555;
    user-select: none;
    cursor: pointer;
    text-align: center;
    color: #e6e6e6;
}
.m-info-card .location,.m-info-card .mail,.m-info-card .github {
    margin: 15px 30px;
    text-align: left;
}
 .m-info-card .location span,.m-info-card  .github span,.m-info-card  .mail span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    vertical-align: middle;
    margin-right: 3px;
}
.m-info-card .showmebtn {    
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
.m-info-card .m-aboutme {
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
.m-info-card .m-aboutme p{
    color: #e6e6e6;
    font-size: 15px;
    line-height: initial;
    display: inline-block;
}
</style>

<style lang="css" scoped>
.showmebtn {
  position: fixed;
  top: 20px;
  right: 60px;
  width: 60px;
  height: 40px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  background-image: url("../assets/menu.png");
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  transition: all 0.5s;
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
  transition: all 0.5s;
  box-shadow: 0px 0 1px 1px #2d2d2d;
}
.aboutme p {
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
  transition: all 0.5s;
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
.avatar {
  background-image: url("../assets/avatar.jpg");
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
.location,
.mail,
.github {
  margin: 15px 30px;
  text-align: left;
}
.location span,
.github span,
.mail span {
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
  background-image: url("../assets/icon-location.png");
}
.github span {
  background-image: url("../assets/github.png");
}
.mail span {
  background-image: url("../assets/mail.png");
}
.location p,
.mail p,
.github p {
  display: inline-block;
  height: 20px;
  vertical-align: middle;
}
.github a {
  display: block;
}
.github p {
  transition: all 0.3s;
  border-bottom: 1px solid transparent;
}
.github p:hover {
  border-bottom: 1px solid #e6e6e6;
}
.btn-enter {
  opacity: 0;
}
.btn-enter-to {
  opacity: 1;
}
</style>