<template>
    <div :class="{
        'n-wrapper': 1,
        'mobile': isMobile,
        'notMobile': !isMobile
    }">
        <div class="night-watch" @click="$emit('changeNight')">
            <div class="bg1" :style="{
                'transform': 'translateX('+ (+state)*50+'%)'
            }"></div>
        </div>
        <span class="moon"></span>
        <span class="sun"></span>
        <span :style="{
            'transform': 'translateX('+ (+state)*100+'%)'
        }" class="circle"></span>
    </div>
</template>

<script>
export default {
    props: [
        "changeNight",
        "state",
        "isMobile"
    ]
}
</script>

<style lang="css" scoped>
.mobile {
    position: absolute;
    bottom: 5px;
    width: 40px;
    height: 20px;
    left: 10vw;
}
.mobile .night-watch {
    width: 38px;
    height: 19px;
    position: absolute;
    background-color: #282c35;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #eee;
    overflow: hidden;
    
}
.mobile .bg1 {
    width: 40px;
    height: 28px;
    border-radius: 20px;
    background-color: #fff;
    transition: all .3s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    
}

</style>

<style lang="css" scoped>
.notMobile {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 20px;
    right: 0;
}
.notMobile .night-watch {
    width: 41px;
    height: 19px;
    position: absolute;
    background-color: #282c35;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #eee;
    overflow: hidden;
}
.notMobile .bg1 {
    width: 42px;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
    transition: all .3s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.circle {
    width: 21px;
    height: 20px;
    display: block;
    box-shadow: 0 0 1px 1px #cbcbcb;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    transition: all .3s;
    left: 0;
    pointer-events: none;
}
.moon {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url('../assets/moon.png');
    position: absolute;
    left: 0;
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
}
.sun {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url('../assets/sun.png');
    position: absolute;
    right: 0;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;

}
</style>