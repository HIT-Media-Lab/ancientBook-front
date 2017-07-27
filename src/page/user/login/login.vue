<!--home页面-->
<template>
    <div style="height: 360px">
        <div class="index-page">
            <div class="head">
                <img src="../../../assets/img/no-use-picture/logo.png" class="logo">
                <h3 class="web-name">兰台古籍研究平台</h3>
            </div>
            <div class="search-login">
                <input placeholder=" 请输入关键字搜索" class="search-input-login" v-model="sort_box" v-on:keydown.enter="search1">
                <button class="search-btn-login" @click="search1">搜 索</button>
            </div>
            <div class="drop-search-login" @click="hide" v-show="sort_box.length!=0">
                <ul>
                    <li class="sort-box1-login" :title="sort_box" @click="search1()" style="color: #0f0f0f">
                        搜古籍：{{sort_box}}
                    </li>
                    <li class="sort-box2-login" :title="sort_box" @click="search2()" style="color: #0f0f0f">
                        搜本体：{{sort_box}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="down-info">
            <img src="../../../assets/img/no-use-picture/ink-line-long.png" >
            <p class="down-info-p1">Cooperation by Chinese Academy of Sciences and the Department of New Media and Art</p>
            <p class="down-info-p2">@2017 Ancient Book Project</p>
        </div>
    </div>
</template>

<script type="text/javascript">
import store from '../../../store'
 export default{

     data(){
         return{
             sort_box:'',
             login_url: '/ancient_books/login.action',
             code_url: '/ancient_books/get_v_picture.action',
             judge_code_url: '/ancient_books/get_v_picture.action',
             autologin_url: '/ancient_books/get_user_info.action'
         }
     },
    created: function () {
        /**
         * 进入页面获得token
         */
        this.onload_token();
     },
     methods: {
         hide:function () {
             this.sort_box = ''
         },
         /**
          * 搜索古籍
          */
         search1:function () {
             if (this.sort_box == ''){
                 this.$router.push("/login");
             } else if (this.sort_box != '') {
                 this.$route.params.content = this.sort_box;
                 this.$route.params.pageId = 1;
                 this.$router.push({name: 'search_book', params: this.$route.params});
                 this.sort_box = '';
             }
         },
         /**
          * 搜索本体
          */
         search2: function () {
             this.$route.params.content = this.sort_box;
             this.$route.params.pageId = 1;
             if (this.sort_box != ''){
//                    this.$store.commit('push_search_content', this.sort_box);
                 this.$router.push({name: 'search_noumenon', params: this.$route.params});
                 this.sort_box = '';
             }
         },
         /**
          * 获得token
          */
         onload_token(){
             if (this.$store.getters.GetToken == ''){
                 this.$http.get('/ancient_books/getToken.action').then(function (response) {
                     console.log("成功得到token");
                     console.log(response.body.token);
                     this.$store.commit("change_token",response.body.token);
                     console.log(this.$store.getters.GetToken + " 第一次获得token");
                     if (this.$store.getters.GetToken != null){
                         this.auto_login();
                     }
                 },function () {
//                 alert("error")
                 })
             }
         },

         /**
          * 自动登录
          */
         auto_login() {
             this.$http.get(this.autologin_url).then(function (response) {
                 if (response.body.result == 1) {
                     if (response.body.su == 0){
                         localStorage.setItem('user',JSON.stringify("user"));
                         this.$router.push({path: '/user'});
                     }
                     if (response.body.su == 1){
                         console.log("跳到了admin");
                         localStorage.setItem('user',JSON.stringify("admin"));
                         this.$router.push({path: '/admin'});
                     }
                 }
                 if (response.body.result == 0){
                     localStorage.setItem('user',JSON.stringify("guest"));
                     this.$router.push({path: '/login'});
                 }
             },function () {
//                 alert("error")
             })
         }
     }
 }
</script>

<style>
    .index-page{
        width: 600px;
        height: 195px;
        margin: 150px auto;
    }
    .web-name{
        display: inline;
        font-size: 23px;
    }
    .logo{
        width: 40px;
        height: 60px;
    }
    .head{
        margin: 0 auto;
        width: 330px;
        letter-spacing: 10px;
        font-size: 20px;
    }
    .search-login{
        margin: 0 auto;
        width: 600px;
        height: 50px;
    }
    .search-input-login{
        padding-left: 20px;
        background-image: url("../../../assets/img/modal-box/search-input-big.png");
        background-color: transparent;
        background-size: 100%;
        background-repeat: no-repeat;
        border: none;
        width: 500px;
        height: 50px;
    }
    .search-btn-login{
        margin-left: -20px;
        background-image: url("../../../assets/img/button/search-button-big.png");
        background-repeat: no-repeat;
        background-size: 105%;
        color: white;
        height: 50px;
        width: 100px;
        border: none;
        background-color: transparent;
    }
    .drop-search-login{
        margin: 0 0;
        margin-top: -5px;
        padding-left: 20px;
        width: 500px;
        height: 90px;
        background-repeat: no-repeat;
        background-image: url("../../../assets/img/modal-box/search-drop-box.png");
        background-size: 100%;
    }
    .sort-box1-login{
        padding-top: 10px;
        list-style: none;
        font-size: 18px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .sort-box2-login{
        font-size: 18px;
        padding-top: 10px;
        list-style: none;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .down-info{
       margin: 0 auto 20px auto;
        width: 947px;

    }
    .down-info-p1{
        margin: 0 auto;
        width: 780px;
    }
    .down-info-p2{
        margin: 0 auto;
        width: 250px;
    }
</style>