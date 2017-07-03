<template>
    <!--翻页键-->
    <div class="page-box">
        <button  class="btn-pages"  @click="prePage()" v-bind:disable="ban_1" tabindex="-1">上一页</button>

        <div class="btn-pages text-pages">
            <input  type="text" class="text-input" v-model="cur_page"  tabindex="-1" v-bind:disable="ban_3"><label class="zxw-label" v-model="max">/{{max}}</label>
        </div>

        <button class="btn-pages btn-go"  @click="skiPage()" tabindex="-1">GO</button>
        <button class="btn-pages"   @click="nextPage()" v-bind:disable="ban_2" tabindex="-1">下一页</button>
    </div>
</template>

<script>
    export default{
        watch:{
            $route(){
               // this.cur_page = this.$route.params.pageId;
            }
        },

        data(){
            return {
                cur_page: 1, //当前页数
                ban_1: false, //按钮在第一页时禁用
                ban_2: false, //在最后一页禁用
                ban_3: false
            }
        },
        props: ['max'],//请求传回的总页数
        methods: {
            //上一页函数
            prePage(){
                if (this.page === 1) {
                    this.ban_1 = true;
                } else if (this.cur_page > 1 && this.cur_page <= this.max) {
                    this.ban_1 = false;
                    this.cur_page = --this.cur_page;
                    this.gotoPage();
                }
            },

            //下一页函数
            nextPage(){
                if (this.cur_page === this.max) {
                    this.ban_2 = true;
                } else if (this.cur_page >= 1 && this.cur_page < this.max) {
                    this.ban_2 = false;
                    this.cur_page = ++this.cur_page;
                    this.gotoPage();
                }
            },

            //跳转页面
            skiPage(){
                if(this.cur_page >= 1 && this.cur_page <= this.max ){
                    this.gotoPage();
                } else {
                    this.ban_3 = true;
                }
            },

            gotoPage(){
                this.$route.params.pageId = this.cur_page;
                this.$router.push({name: this.$route.name, params: this.$route.params});
            }
        }
    }
</script>

<style>
    /*组件位置*/
    .page-box{
        margin: 26px 0 10px 0;
        display: block;
        text-align: center;
    }

    /*按钮样式*/
    .btn-pages{
        background-image: url("../assets/img/pre-page.png");
        background-repeat: no-repeat;
        background-color: transparent;
        background-position: center;
        border-style: none;
        width: 120px;
        height: 43px;
        color: gainsboro;
    }

    .btn-go{
        width:45px;
        height:43px;
        background-size: 100% 100%;
        margin:0 11px 0 0;
        display: inline-block;
    }

    /*页数显示位置*/
    .text-pages{
        display: inline-block;
        margin:0 -10px 0 11px;
    }

    /*输入页数文本框样式*/
    .text-input{
        width:25px;
        background-color: transparent;
        border-style: none;
        text-align: right;
    }

    .zxw-label{
        margin: 10px 5px 0 0;
    }
</style>