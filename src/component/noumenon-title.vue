<template>
    <div>
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
        padding: 30px 0 5px 0;
        margin: 0 0 30px 0;
        border-bottom: 2px solid black;
    }
    .zxwnoumenom-title{
        font-size: 14px;
        margin:65px 0 0 0;
        display:inline-block;
    }
</style>

