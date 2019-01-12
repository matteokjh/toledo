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
html {
    max-width: 1920px;
    max-height: 1080px;
    overflow-X: hidden;
}
body {
    width: 600px;
    height: 100%;
    margin: 0 auto;
    background-color: white;
    position: relative;
}
header {
    position: relative;
    font-size: 2rem;
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
</style>
