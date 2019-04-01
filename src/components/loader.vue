<template>
    <div class="loader">
        <p>加载中...(施工中！)</p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scoped>
.loader {
    position: fixed;
    display: flex;
    width: 300px;
    height: 300px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid #eee;
    justify-content: center;
    align-items: center;
    background-image: repeating-linear-gradient(45deg,#eee,#eee 10px, transparent 0, transparent 20px);
}
</style>