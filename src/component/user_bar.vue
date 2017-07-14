<template>
    <div class="j-bar-img">
        <router-link to="/user/upload1">
            <img src="../assets/img/spot.png" class="j-spot" v-show="this.$route.name == 'upload1'">
            <span class="j-userbar-title">上传</span>
        </router-link>
        <router-link to="/user_info/mybook">
            <img src="../assets/img/spot.png" class="j-spot" v-show="this.$route.name==='mybook'">
            <span class="j-userbar-title">我的古籍</span>
        </router-link>
        <router-link to="/user_info/collection">
            <img src="../assets/img/spot.png" class="j-spot" v-show="this.$route.name==='collection'">
            <span class="j-userbar-title">我的收藏</span>
        </router-link>
        <router-link to="/user_info/offer">
            <img src="../assets/img/spot.png" class="j-spot" v-show="this.$route.name==='edit'">
            <span class="j-userbar-title">我的贡献</span>
        </router-link>
    </div>
</template>


<script>
    export default{
    }
</script>
<style>
    .j-userbar-title{
        margin:20px 110px 20px 0;
        font-size: 16px;
        color: gainsboro;
        display: inline-block;
    }
    .j-bar-img{
        margin: 35px auto;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(../assets/img/navigation-bar.png);
        width: 1038px;
        height: 68px;
        padding-left: 55px;
        text-align: center;
    }
    .j-spot{
        width: 25px;
        height: 28px;
    }
</style>