<template>
<!--翻页键-->
<div class="page-box">
    <input class="btn_pages" style="margin-left: 0;" value="上一页" @click="pre_page()" v-bind:disable="ban_1">
    <span class="btn-pages" >{{ con_page }}/{{ con_max }}</span>
    <span>转到</span>
    <input type="text" class="btn_pages" v-model="in_page" @blur="skip_p()">
    <input class="btn_pages" style="margin-right: 0;" value="下一页" @click="next_page()" v-bind:disable="ban_2">
</div>
</template>

<script>
    export default{
        data(){
           return {
               in_page:0,//跳转输入数据
               ban_1:false,
               ban_2:false
           }
        },
        props:[
            'con_page',//当前页面
            'con_max',//总页数
        ],
        methods: {
            //上一页函数
            pre_page(){
                if (this.con_page === 1) {
                    this.ban_1 = true;
                } else if (this.con_page > 1 && this.con_page <= this.con_max) {
                    this.ban_1 = false;
                    this.con_page = this.con_page - 1;
                    this.$emit('pre_page');
                }
            },

            //下一页函数
            next_page(){
                if (this.con_page === this.con_max) {
                    this.ban_2 = true;
                } else if (this.con_page >= 1 && this.con_page <= this.con_max) {
                    this.ban_2 = false;
                    this.con_page = this.con_page + 1;
                    this.$emit('next_page');
                }
            },

            //跳转页面
            skip_p(){
                if(this.in_page >= 1 && this.in_page <= this.con_max){
                    if(this.in_page !== this.con_page){
                        this.con_page = this.in_page;
                        this.$emit('pre_page');
                    }
                }
            }
        }
    }
</script>

<style>

    .btn_pages{
        background-color:transparent ;/*按钮填充颜色*/
        color: darkgrey;/*按钮边框颜色*/
        width:70px;/*按钮与表格下底的宽度*/
        height: 28px;
        border-radius: 8px;
        border-color: darkgrey;
        font-family: 楷体;
        font-size: 15px;
        border: solid;
    }

    .page-box{
        text-align: center;
        padding: 1em 0;
        padding-top: 3em;
        padding-right: 0px;
        padding-bottom: 1em;
        padding-left: 0px;
        clear: both;
    }
</style>