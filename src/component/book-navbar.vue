<template>
    <div class="j-book-navbar">
        <select class="j-book-select">
            <option>经部</option>
        </select>
        <select class="j-book-select">
            <option>总类</option>
        </select>
        <select class="j-book-select">
            <option>石经之属</option>
        </select>

    </div>
</template>

<style>
    .j-book-navbar{
        background-image: url("../assets/img/navigation-bar.png");
        margin-top: 35px;
        background-repeat:no-repeat;
        background-position:center;
        width:1038px;
        height:68px;
    }
    .j-book-select{
        margin:21px 90px 40px;
        font-size: 20px;
        color: gainsboro;
        display: inline-block;
        background-color: transparent;
        border: none;

    }
</style>