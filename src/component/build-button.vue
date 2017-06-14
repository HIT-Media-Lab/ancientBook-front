<template>
    <div class="zxwbtn-float">
        <router-link to="/build">
            <button class="zxwnoumenom-button zxwnoumenom-button-margin">新建本体</button>
        </router-link>
    </div>
</template>
<style>
    .zxwnoumenom-button{
        background-image: url("../assets/img/build-button.png");
        background-repeat: no-repeat;
        background-position: center;
        border:none;
        color:white;
    }

    .zxwnoumenom-button-margin{
        margin:40px 40px 0 0;
        width:140px;
        height:45px;
    }

    .zxwbtn-float{
        float:right;
    }
</style>