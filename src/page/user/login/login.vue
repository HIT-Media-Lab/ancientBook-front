<template>
    <!--登录组件-->
    <div class="index-page">
        <div class="head">
            <img src="../../../assets/img/logo.png" class="logo">
            <h3 class="web-name">兰台古籍研究平台</h3>
        </div>
        <div class="search-login">
            <input placeholder=" 请输入关键字搜索" class="search-input-login" v-model="sort_box" v-on:keydown.enter="enter">
            <button class="search-btn-login" @click="search">搜索</button>
        </div>
        <div class="drop-search-login" @click="hide" v-show="sort_box.length!=0">
            <ul>
                <li class="sort-box1-login">
                    <router-link to="/search_index" style="color: #0f0f0f">
                        搜古籍：{{sort_box}}
                    </router-link>
                </li>
                <li class="sort-box2-login">
                    <router-link to="/search_index" style="color: #0f0f0f">
                        搜本体：{{sort_box}}
                    </router-link>
                </li>
            </ul>
        </div>
        <button @click="test1()">有用户权限</button>
        <button @click="test2()">有超级用户权限</button>
        <button @click="test3()">没用权限</button>
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

     //组件刷新执行钩子
     beforeMount: function () {
         this.onload_token();
     },

     methods: {
//         Test(){
//             alert(this.token);
////             this.$store.state.Token="hhhhhh";
////             alert(this.$store.state.Token);
////            this.$store.commit("login_show");
////             this.show=this.$store.getters.GetShow;
////             alert(this.show)
//         },
         hide:function () {
             this.sort_box = ''
         },
         enter:function () {
             this.sort_box = '';
             this.$router.push({path: '/search'});
         },
         search:function () {
             if (this.sort_box != ''){
                 this.$router.push({path: '/search'});
             }
         },
         // 网页启动得到token
         onload_token(){
             this.$http.get('/ancient_books/getToken.action').then(function (response) {
                 console.log("成功得到token");
                 this.$store.commit("change_token",response.body.token);
                 console.log(this.$store.getters.GetToken + " 第一次获得token");
                 if (this.$store.getters.GetToken != null){
                     this.auto_login();
                 }
             },function () {
//                 alert("error")
             })
         },
         test1(){
             localStorage.setItem('user',JSON.stringify("user"));
         },
         test2(){
             localStorage.setItem('user',JSON.stringify("admin"));
         },
         test3(){
             localStorage.setItem('user',JSON.stringify("guest"));
         },

         //自动登录
         auto_login() {
             this.$http.get(this. autologin_url).then(function (response) {
                 if (response.body.result==1) {
                     if (response.body.su == 0){
                         localStorage.setItem('user',JSON.stringify("user"));
                         this.$router.push({path: '/user'});
                     }
                     if (response.body.su = 1){
                         localStorage.setItem('user',JSON.stringify("admin"));
                         this.$router.push({path: '/admin'});
                     }
                 }
                 if (response.body.result==0){
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
        margin: 150px auto;
    }
    .web-name{
        display: inline;
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
        background-image: url("../../../assets/img/搜索框大.png");
        background-color: transparent;
        background-size: 100%;
        background-repeat: no-repeat;
        border: none;
        width: 500px;
        height: 50px;
    }
    .search-btn-login{
        margin-left: -15px;
        background-image: url("../../../assets/img/搜索按钮大.png");
        background-repeat: no-repeat;
        background-size: 105%;
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
        background-image: url("../../../assets/img/下拉框.png");
        background-size: 100%;
    }
    .sort-box1-login{
        padding-top: 10px;
        list-style: none;
    }
    .sort-box2-login{
        padding-top: 10px;
        list-style: none;
    }
</style>