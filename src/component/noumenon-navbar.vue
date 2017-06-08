<template>
    <div class="zxw-bar-img">
        <router-link to="/noumenon/time">
            <span class="zxw-bar-title">时间</span>
        </router-link>

        <router-link to="/noumenon/place">
            <span class="zxw-bar-title">地名</span>
        </router-link>

        <router-link to="/noumenon/character/letter/a/page/1">
            <span class="zxw-bar-title">人物</span>
        </router-link>

        <router-link to="/noumenon/office">
            <span class="zxw-bar-title">机构</span>
        </router-link>

        <router-link to="/noumenon/institution">
            <span class="zxw-bar-title">职官</span>
        </router-link>

        <router-link to="/noumenon/literature">
            <span class="zxw-bar-title">文献</span>
        </router-link>

        <router-link to="/noumenon/terms">
            <span class="zxw-bar-title">术语</span>
        </router-link>

    </div>
</template>

<script></script>

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
</style>