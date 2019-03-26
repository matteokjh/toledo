<template>

  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
    margin: 0;
    padding: 0;
    font-family: consolas;
}
body {
    height: 100%;
    margin: 0 auto;
    background-color: white;
    position: relative;
    overflow-x: hidden;
}
header {
    position: relative;
    font-size: 30px;
    padding: 5% 10%;
    text-align: left;
    user-select: none;
}
header a:hover > p {
    border-bottom: 2px solid rgba(200,200,200,1);
}
header p {
    display: inline;
    cursor: pointer;
    transition: all .3s;
    border-bottom: 2px solid rgba(200,200,200,0);
}
::-webkit-scrollbar {
    /* 高宽对应横竖滚动条 */
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track  
{  
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  /*滚动条的背景区域的圆角*/
    background-color: #eee;/*滚动条的背景颜色*/  
}  
::-webkit-scrollbar-thumb  
{  
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    border-radius: 10px;  /*滚动条的圆角*/
    background-color: #ddd;  /*滚动条的背景颜色*/
}
</style>
