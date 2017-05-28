<template>
    <div class="noumenon-bar">
        <div class="bar-img">
            <div class="bar-header">
                <button class="bar-title" @click="characterIndex()">人物</button>
                <button class="bar-title">文献</button>
                <button class="bar-title">术语</button>
                <button class="bar-title">时间</button>
                <button class="bar-title">职官</button>
                <button class="bar-title">机构</button>
                <button class="bar-title">地名</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            characterIndex(){
                this.$router.push({path:'/charater_noumenon'});
            }
        }
    }
</script>
<style>
    .noumenon-bar{
        padding-top: 2em;
    }
    .bar-img {
        background-repeat:no-repeat;
        background-position:center;
        background-image: url("../assets/img/本体库背景.png");
        background-size: 800px 65px;
    }
    .bar-header{
        padding-left: 50px;
    }
    .bar-title{
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        display:inline-block;
        background-color: transparent;
        border-color: transparent;
        font-size: 15px;
        width:80px;
    }
</style>