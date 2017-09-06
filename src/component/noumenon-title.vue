<template>
    <div class="zxwnoumenom-header">
        <span class="zxwnoumenom-title" v-model="title" @click="to_noumenon_details()">{{title}}</span>
        <slot name="children"></slot>
    </div>
</template>

<script>
    export default{
        props:['title'],
        methods:{
            to_noumenon_details(){
                this.$emit('to_noumenon_details');
            }
        }
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
        font-size: 20px;
        margin:65px 0 5px 0;
        display:inline-block;
        font-weight: bold;
    }


    /*本体标记位置处添加抓手按钮*/
    .zxw-cursor-title{
        cursor: pointer;
    }



</style>

