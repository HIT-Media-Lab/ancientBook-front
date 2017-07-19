<template>
    <div class="zxwnoumenom-header">
        <span class="zxwnoumenom-title" v-model="title">{{title}}</span>
        <slot name="children"></slot>
    </div>
</template>

<script>
    export default{
        props:['title']
    }
</script>

<style>
    .zxwnoumenom-header{
        background-image: url("../assets/img/no-use-picture/ink-line-long.png");
        background-repeat:no-repeat;
        background-position: bottom;
        padding-bottom: 10px;
        width:950px;
        margin:auto;
    }
    .zxwnoumenom-title{
        font-size: 18px;
        margin:65px 0 5px 0;
        display:inline-block;
        font-weight: bold;
    }


</style>

