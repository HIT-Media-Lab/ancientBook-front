<template>
    <div class="zxw-bar-img">
        <router-link to="/noumenon/time">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='time'||this.$route.name==='time_detail'||this.$route.name==='time_edit'"><!--时间未配置路由-->
            <span class="zxw-bar-title">时间</span>
        </router-link>

        <router-link to="/noumenon/place/letter/A/page/1/">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='place'||this.$route.name==='pla_detail'||this.$route.name==='pla_edit'">
            <span class="zxw-bar-title">地名</span>
        </router-link>

        <router-link to="/noumenon/character/letter/A/page/1">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='character'||this.$route.name==='char_detail'||this.$route.name==='char_edit'">
            <span class="zxw-bar-title">人物</span>
        </router-link>

        <router-link to="/noumenon/institution/letter/A/page/1">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='institution'||this.$route.name==='ins_detail'||this.$route.name==='ins_edit'">
            <span class="zxw-bar-title">机构</span>
        </router-link>

        <router-link to="/noumenon/office/letter/A/page/1">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='office'||this.$route.name==='off_detail'||this.$route.name==='off_edit'">
            <span class="zxw-bar-title">职官</span>
        </router-link>

        <router-link to="/noumenon/literature">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='literature'||this.$route.name==='lit_detail'||this.$route.name==='lit_edit'">
            <span class="zxw-bar-title">文献</span>
        </router-link>

        <router-link to="/noumenon/terms">
            <img src="../assets/img/no-use-picture/spot.png" class="zxw-spot" v-show="this.$route.name==='terms'||this.$route.name==='terms_detail'||this.$route.name==='terms_edit'">
            <span class="zxw-bar-title">术语</span>
        </router-link>

    </div>
</template>

<script>

</script>

<style>
    .zxw-bar-img {
        margin-top: 35px;
        background-repeat:no-repeat;
        background-position:center;
        background-image: url("../assets/img/no-use-picture/navigation-bar.png");
        width:1038px;
        height:68px;
        padding-left: 55px;
        text-align: center;
    }

    .zxw-bar-title{
        margin:20px 90px 20px 0;
        font-size: 18px;
        color: gainsboro;
        display: inline-block;
    }

    .zxw-spot{
       width:25px;
       height:28px;
    }

</style>