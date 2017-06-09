<template>
    <!--登录组件-->
    <div class="index-page">
        <div class="head">
            <img src="../../../assets/img/logo.png" class="logo">
            <h3 class="web-name">兰台古籍研究平台</h3>
        </div>
        <div class="search-login">
            <input placeholder=" 请输入你要搜索的内容" class="search-input-login" v-model="sort_box" v-on:keydown.enter="enter">
            <button class="search-btn-login" @click="search">搜索</button>
        </div>
        <div class="drop-search-login" @click="hide" v-show="sort_box.length!=0">
            <ul>
                <li class="sort-box1-login">
                    <router-link to="/search_index" >
                        搜古籍：{{sort_box}}
                    </router-link>
                </li>
                <li class="sort-box2-login">
                    <router-link to="/search_index">
                        搜本体：{{sort_box}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
            <button @click="test1()">有用户权限</button>
            <button @click="test2()">有超级用户权限</button>
            <button @click="test3()">没用权限</button>
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
             autologin_url: '/ancient_books/get_user_info.action',
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
                     this.create_v_picture()
                 }
             },function () {
//                 alert("error")
             })
         },



     }
 }
</script>

<style>

    .web-name{
        display: inline;
    }
    .logo{
        width: 40px;
        height: 60px;
    }
    .head{
        margin-left: 615px;
        margin-top: 150px;
        width: 330px;
        letter-spacing: 10px;
        font-size: 20px;
    }
    .search-login{
        margin-left: 500px;
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
        margin-left: 500px;
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