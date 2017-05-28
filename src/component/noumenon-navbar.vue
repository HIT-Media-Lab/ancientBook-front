<template>
    <div class="zxwnoumenon-bar">
        <div class="zxwbar-img">
            <div class="zxwbar-header">

                <router-link to="/noumenon/character">
                    <h5 class="zxwbar-title">人物</h5>
                </router-link>

                <router-link to="/noumenon/literature">
                    <h5 class="zxwbar-title">文献</h5>
                </router-link>

                <router-link to="/noumenon/terms">
                    <h5 class="zxwbar-title">术语</h5>
                </router-link>

                <router-link to="/noumenon/time">
                    <h5 class="zxwbar-title">时间</h5>
                </router-link>

                <router-link to="/noumenon/institution">
                    <h5 class="zxwbar-title">职官</h5>
                </router-link>

                <router-link to="/noumenon/office">
                <h5 class="zxwbar-title">机构</h5>
                </router-link>

                <router-link to="/noumenon/place">
                    <h5 class="zxwbar-title">地名</h5>
                </router-link>

                <router-link to="/noumenon/build">
                    <h5 class="zxwbar-title">新建本体</h5>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script></script>

<style>
    .zxwnoumenon-bar{
        padding-top: 2em;
    }
    .zxwbar-img {
        background-repeat:no-repeat;
        background-position:center;
        background-image: url("../assets/img/本体库背景.png");
        background-size: 800px 65px;
    }
    .zxwbar-header{
        padding-left: 50px;
    }
    .zxwbar-title{
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        display:inline-block;
        background-color: transparent;
        border-color: transparent;
        font-size: 15px;
        width:80px;
    }
</style>