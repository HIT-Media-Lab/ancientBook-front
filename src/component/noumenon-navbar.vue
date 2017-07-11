<template>
    <div class="zxw-bar-img">
        <router-link to="/noumenon/time">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='time'"><!--时间未配置路由-->
            <span class="zxw-bar-title">时间</span>
        </router-link>

        <router-link to="/noumenon/place">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='place'||this.$route.name==='pla_detail'">
            <span class="zxw-bar-title">地名</span>
        </router-link>

        <router-link to="/noumenon/character/letter/A/page/1">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='character'||this.$route.name==='char_detail'">
            <span class="zxw-bar-title">人物</span>
        </router-link>

        <router-link to="/noumenon/office">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='institution'||this.$route.name==='ins_detail'">
            <span class="zxw-bar-title">机构</span>
        </router-link>

        <router-link to="/noumenon/institution">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='office'||this.$route.name==='off_detail'">
            <span class="zxw-bar-title">职官</span>
        </router-link>

        <router-link to="/noumenon/literature">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='literature'||this.$route.name==='lit_detail'">
            <span class="zxw-bar-title">文献</span>
        </router-link>

        <router-link to="/noumenon/terms">
            <img src="../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='terms'||this.$route.name==='terms_detail'">
            <span class="zxw-bar-title">术语</span>
        </router-link>

    </div>
</template>

<script>
    export default{

    }
</script>

<style>
    .zxw-bar-img {
        margin-top: 35px;
        background-repeat:no-repeat;
        background-position:center;
        background-image: url("../assets/img/navigation-bar.png");
        width:1038px;
        height:68px;
        padding-left: 55px;
        text-align: center;
    }

    .zxw-bar-title{
        margin:20px 90px 20px 0;
        font-size: 14px;
        color: gainsboro;
        display: inline-block;
    }

    .zxw-spot{
       width:25px;
       height:28px;
    }

</style>