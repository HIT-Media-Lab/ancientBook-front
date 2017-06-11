<template>
    <!--顶端固定不变的导航条-->
    <div id="store" class="store">
        <div class="head-bar">
            <router-link to="/bookstore" style="color: white">
                <button class="bookstore">古籍库 </button>
            </router-link>
            <router-link to="/noumenon" style="color: white; margin-left: 47px">
                <button class="noumenon-store">本体库</button>
            </router-link>
            <input placeholder=" 请输入关键字搜索" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
            <button class="search-btn" @click="search">搜 索</button>
            <img src="../assets/img/头像.png" class="user-img" @click="show_login">
            <span class="user-name" @click="show_login">{{name}}</span>
            <div class="down-box" @click="hide" v-show="sort_box.length!=0">
                <ul>
                    <li class="sort-box1">
                        <router-link to="/search_index" style="color: #0f0f0f">
                            搜古籍：{{sort_box}}
                        </router-link>
                    </li>
                    <li class="sort-box2">
                        <router-link to="/search_index" style="color: #0f0f0f">
                            搜本体：{{sort_box}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="login-box">
            <login_modal :show_modal.sync = "show_modal" @fireclose = "show_modal = false">
                <header class="dialog-header" slot="header">
                    <h3 class="dialog-title">登 录</h3>
                </header>
                <div class="dialog-body" slot="body">
                    <div class="input-ac-pwd">
                        <div class="input-ac">
                            <input type="text" placeholder="请输入您的账号" class="user-name-input" v-model="account" @blur="check()" id="username" v-bind:class="{ warnborder: Active1 }">
                        </div>
                        <div class="input-password">
                            <input type="password" placeholder="请输入您的密码" class="password-input" v-model="pwd" @blur="check()" id="pwd" v-bind:class="{ warnborder: Active2 }">
                        </div>
                        <div class="warning-login">
                            <span id="warning" v-model="warning">{{warning}}</span>
                        </div>
                    </div>
                    <div class="code">
                        <input type="text" placeholder="请输入验证码" class="verification-code-input" v-model="v">
                        <img src="" id="v_picture" class="code-img" alt="验证码">
                        <span class="cover-code" @click="coverCode()" >换一张</span>
                    </div>
                    <div class="auto">
                        <input type="checkbox" id="save-password"  class="save-password-checkbox" @click="auto()">
                        <span class="save-password-word" >自动登录</span>
                    </div>
                    <button class="login-button" @click="login()" v-bind:disabled="disabled">登  录</button>
                </div>
            </login_modal>
        </div>
        <div id="load">
            <loading v-show="showloading"></loading>
        </div>
    </div>
</template>

<script type="text/javascript">
    import bus from '../lib/bus'
    import login_modal from  '../component/modal.vue'
    import store from '../store/index'
    import loading from  '../component/loading.vue'
    export default{
        components:{
            login_modal,
            loading
        },
        created() {
          bus.$on('toggleLoading', (show) =>{
              this.showloading = show;
          });
          bus.$on('chang_name',(name) =>{
              this.name = name;
          });
        },
        //组件刷新执行钩子
        mounted(){
            this.onload_token();
            this.create_v_picture();
        },
        data(){
            return{

                sort_box:'',
                url: '/ancient_books/logout.action',
                name:'登录',
                show_modal: false,

                showloading: false,

                login_url: '/ancient_books/login.action',
                code_url: '/ancient_books/get_v_picture.action',
                judge_code_url: '/ancient_books/get_v_picture.action',
                autologin_url: '/ancient_books/get_user_info.action',
                warning:'',
                account: '',
                pwd: '',
                v: '',
                Active1: false,
                Active2: false,
                disabled: false,
                auto: false,
                object: {},
                show:''
            }
        },
        props:{
            show_modal: false
        },
        methods:{
            //注销
//            Logout:function () {
//                this.$http.get(this.url).then(function () {
//                    alert("注销成功");
//                    localStorage.setItem('user',JSON.stringify("guest"));
//                    this.$router.push({path: '/login'});
//                },function () {
//                    alert("error")
//                })
//            },
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
            },

            show_login(){
                let user_id = JSON.parse(localStorage.getItem('user'));
                if (user_id == 'guest'){
                    this.show_modal = true;
                }else if(user_id == 'user'){
                    this.$router.push({path: '/user'});
                }
            },
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
            /**
             *  账号 正则判断输入是否规范
             */

            check(){
                this.disabled = false;
                this.warning = "";
                this.Active1=false;
                this.Active2=false;
                let success1=this.check_user(this.account);
                let success2=this.check_pwd(this.pwd);
                if (success1 && success2){
                    this.warning= "";
                    this.Active1=false;
                    this.disabled=false;
                } else{
                    if (!success1) {
                        this.warning = "用户名格式错误";
                        this.Active1 = true;
                        this.disabled = true;
                    }else if(!success2){
                        this.warning =  "密码格式错误";
                        this.Active2=true;
                        this.disabled=true;
                    }
                }
            },
            coverCode(){
              document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime()
            },

            create_v_picture(){
                document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime();
            },

            auto() {
                this.auto = !this.auto
            },
            //登录的回调函数
            login_success(response){
                if (response.body.su == 1) {
                    localStorage.setItem('user',JSON.stringify("admin"));
                    this.$router.push({path: '/admin'});
                    console.log("登录成功后的全局Token"+this.$store.getters.GetToken);
                    this.name = '超级用户';
                    this.account = '';
                    this.pwd = '';
                    this.v = '';
                    document.getElementById("v_picture").src = this.code_url+'?'+(new Date()).getTime();
                }
                if (response.body.su == 0) {
                    localStorage.setItem('user',JSON.stringify("user"));
                    this.$router.push({path: '/user'});
                    this.name = '普通用户';
                    this.account = '';
                    this.pwd = '';
                    this.v = '';
                    document.getElementById("v_picture").src = this.code_url + '?' + (new Date()).getTime()
                }
            },
            //登陆失败函数
            login_fail(response){
                document.getElementById("v_picture").src = this.code_url + '?' + (new Date()).getTime();
                alert(response.body.info);
            },
            //点击登录按钮执行函数
            login() {
                //给对象object内容赋值
                this.object.account=this.account;
                this.object.pwd=this.pwd;
                this.object.v=this.v;
                this.object.auto=this.auto;
                console.log("全局token"+this.$store.getters.GetToken);
                // 与后端对接的vue-resource
                this.http_json(this.login_url,'post',this.object,this.login_success,this.login_fail);
            },
        }
    }
</script>

<style>
    .store{
        margin-top: 25px;
        height: 70px;
        width: 100%;
    }
    .head-bar{
        margin: 0 auto;
        width: 890px;
    }
    .bookstore{
        background-image: url("../assets/img/墨点按钮.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;
    }
    .noumenon-store{
        /*margin-left: 47px;*/
        background-image: url("../assets/img/墨点按钮.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;

    }
    .search-btn{
        background-image: url("../assets/img/搜索按钮小.png");
        background-repeat: no-repeat;
        width: 100px;
        height: 52px;
        border: none;
        margin-left: -15px;
        color: white;
        background-color: transparent;
        /*display: inline-block;*/
    }
    .user-name{
        padding: 5px;
        width:50px;
        height: 13px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
        text-align:center;
    }
    .user-img{
        margin-left: 30px;
        width: 50px;
        height: 50px;
    }
    .down-box{
        background-image: url("../assets/img/下拉框.png");
        background-size:100%;
        background-repeat: no-repeat;
        margin-left: 360px;
        margin-top: -9px;
        height: 43px;
        width: 290px;
    }
    .search-input{
        margin-left: 30px;
        padding-left: 20px;
        background-image: url("../assets/img/搜索框小.png");
        background-color: transparent;
        border: none;
        width: 280px;
        height: 50px;
    }
    .sort-box1{
        /*display: inline;*/
        margin-left: 10px;
        list-style: none;
        width: 178px;
    }
    .sort-box2{
        margin-left: 10px;
        list-style: none;
        width: 178px;
    }

    .warning-login{
        width: 300px;
        height: 30px;
        font-size:12px;
        color:red;
        margin-top: 10px;
    }
    .input-ac-pwd{
        width: 320px;
        margin-left: 10px;
        display: inline-block;
    }
    .input-ac{
        margin-bottom: 10px;
        width: 320px;
    }
    .input-password{
        margin-top: 20px;
        width: 320px;
    }

    .user-name-input{
        /*margin-left: 20px;*/
        font-size: 20px;
        padding: 15px;
        width: 320px;
        height: 45px;
        border: 1.5px solid grey;
        /*border-color: #0f0f0f;*/

    }
    .password-input{
        /*margin-left: 20px;*/
        font-size: 20px;
        padding: 15px;
        height: 45px;
        border: 1.5px solid grey;
        width: 320px;
    }
    .code{
        margin-top: -5px;
        margin-left: 10px;

    }
    .verification-code-input{
        border: 1.5px solid grey;
        font-size: 20px;
        height: 45px;
        width: 160px;
        text-align: center;
        vertical-align: text-bottom;
    }
    .code-img{
        margin-left: 10px;
        width: 76px;
        height: 45px;
        border: none;
        vertical-align: text-bottom;
    }
    .cover-code{
        margin-left: 10px;
    }
    .auto{
        margin-left: 10px;
        margin-top: 10px;
    }
    .save-password-checkbox{
        vertical-align: text-bottom;
        width: 20px;
        height: 20px;
    }
    .save-password-word{
        font-size: 15px;
        color: grey;
    }

    .login-button{
        margin-top: 8px;
        margin-left: 10px;
        width: 320px;
        height: 45px;
        color: white;
        background-image: url("../assets/img/登录按钮.png");
        background-repeat: no-repeat;
        background-size: 100%;
        border: none;
    }
    .dialog-header {
        margin-top: 5%;
        background-image: url("../assets/img/弹框标题.png");
        background-size:90%;
    }

    .dialog-title {
        color: white;
        font-size: 30px;
        font-family: 楷体;
        text-align: center;
        width:6em;
        margin-left: 110px;
        font-weight: 200;
        line-height: 1em;
        display: inline-block;
    }

    .dialog-body {
        padding: 2em;
    }
    /*错误提示红框*/
    .warnborder {
        border: 2px solid red;
    }
</style>