<template>
<!--翻页键-->
<div class="page-box">
    <input type="button" class="btn-pages" style="margin-left: 0;" value="上一页" @click="pre_page()" v-bind:disable="ban_1">
    <span class="text_pages" v-model="cur_max">
        <input type="text" id="skip" class="text_input" v-model="cur_page" @blur="skip_page()">/{{cur_max}}
    </span>
    <input type="button" class="btn-pages" style="margin-right: 0;" value="下一页" @click="next_page()" v-bind:disable="ban_2">
</div>
</template>

<script>
    export default{
        data(){
           return {
               cur_page:1, //当前页数
               ban_1:false, //按钮在第一页时禁用
               ban_2:false, //在最后一页禁用
           }
        },
        props:[ 'cur_max' ],//请求传回的总页数
        methods: {
            //上一页函数
            pre_page(){
                if (this.cur_page === 1) {
                    this.ban_1 = true;
                } else if (this.cur_page > 1 && this.cur_page <= this.cur_max) {
                    this.ban_1 = false;
                    this.cur_page = --this.cur_page;
                }
                this.$emit('pre_page');
            },

            //下一页函数
            next_page(){
                if (this.cur_page === this.cur_max) {
                    this.ban_2 = true;
                } else if (this.cur_page >= 1 && this.cur_page < this.cur_max) {
                    this.ban_2 = false;
                    this.cur_page = ++this.cur_page;
                }
                this.$emit('next_page');
            },

            //跳转页面
            skip_page(){
                if(this.cur_page >= 1 && this.cur_page <= this.cur_max ){
                    this.$emit('skip_page',this.cur_page);
                }

            }
        }
    }
</script>

<style>
    /*组件位置*/
    .page-box{
        margin:auto;
        height:10%;
        width: 52%;
        padding: 3em 18% 1em 18%;
        clear: both;
        display: block;
        font-family: 楷体;
        font-size: 15px;
        text-align: center;
    }

    /*按钮样式*/
    .btn-pages{
        background-color:transparent ; /*按钮填充颜色*/
        color:darkgrey; /*按钮边框颜色*/
        border-radius: 8px;
        border: 2px solid;
        width:70px;
        height: 28px;
    }

    /*页数显示位置*/
    .text_pages{
        padding-right: 1em;
        padding-left: 1em;
        color: dimgrey;
        border-color: dimgrey;
    }

    /*输入页数文本框样式*/
    .text_input{
        height: 20px;
        width:35px;
        background-color: transparent;
        text-align: center;
    }



</style>