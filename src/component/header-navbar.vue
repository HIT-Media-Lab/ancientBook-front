<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <!--顶端固定不变的导航条-->
    <div id="store" class="store">
        <div class="head-bar">
            <button class="bookstore">
                <router-link to="/bookstore" style="color: white">古籍库</router-link>
            </button>
            <button class="noumenon-store">
                <router-link to="/noumenon" style="color: white">本体库</router-link>
            </button>
            <input placeholder=" 请输入你要搜索的内容" class="search-input" v-model="sort_box" v-on:keydown.enter="enter">
            <button class="search-btn" @click="search">搜索</button>
            <img src="../assets/img/头像.png" class="user-img" @click="show_login">
            <span class="user-name" @click="show_login">{{name}}</span>
        </div>
        <div class="down-box" @click="hide" v-show="sort_box.length!=0">
            <ul>
                <li class="sort-box1">
                    <router-link to="/search_index" >
                        搜古籍：{{sort_box}}
                    </router-link>
                </li>
                <li class="sort-box2">
                    <router-link to="/search_index">
                        搜本体：{{sort_box}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="login-box">
            <login_modal :show_modal.sync = "show_modal" @fireclose = "show_modal = false">
                <header class="dialog-header" slot="header">
                    <h3 class="dialog-title">登 录</h3>
                </header>
                <div class="dialog-body" slot="body">
                        <div class="input-ac-pwd">
                            <div class="input-ac">
                                <span class="text1">账 号</span>
                                <input type="text" class="username" v-model="account" @blur="check()" id="username" v-bind:class="{ warnborder: Active1 }">
                            </div>
                            <div class="input-password">
                                <span class="text2">密 码</span>
                                <input type="password" class="password" v-model="pwd" @blur="check()" id="pwd" v-bind:class="{ warnborder: Active2 }">
                            </div>
                            <div class="warning-login">
                                <span id="warning" v-model="warning">{{warning}}</span>
                            </div>
                        </div>
                        <div class="code">
                            <input type="text" placeholder="验证码" class="verification-code-input" v-model="v">
                            <img src="" id="v_picture" class="code-img" onclick="this.src=this.src+'?'+(new Date()).getTime()" alt="验证码">
                        </div>
                        <div class="auto">
                            <!--验证码获取位置-->
                            <input type="checkbox" id="save-password"  class="save-password-checkbox" @click="auto()">
                            <span class="save-password-word" >自动登录</span>
                        </div>
                        <button class="login-button" @click="login()" v-bind:disabled="disabled">登  录</button>
                </div>

                <footer class="dialog-footer" slot="footer">
                    <!--<button class="btn" @click="close_dialog">关闭</button>-->
                </footer>
            </login_modal>
        </div>
    </div>
</template>

<script type="text/javascript">
    import login_modal from  '../component/modal.vue'
    import store from '../store/index'
    export default{
        components:{
            login_modal
        },
        data(){
            return{
                sort_box:'',
                url: '/ancient_books/logout.action',
                name:'登录',
                show_modal: false,

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
            show_login(){
                this.show_modal = true;
            },
            close_dialog () {
                this.show_modal = false;
            },
            open_dialog () {
                this.show_modal = true;
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
            test1(){
                localStorage.setItem('user',JSON.stringify("user"));
            },
            test2(){
                localStorage.setItem('user',JSON.stringify("admin"));
            },
            test3(){
                localStorage.setItem('user',JSON.stringify("guest"));
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


            create_v_picture(){
                document.getElementById("v_picture").src='/ancient_books/get_v_picture.action';
            },

            auto() {
                this.auto = !this.auto
            },
            //登录的回调函数
            login_success(response){
                if (response.body.su == 1) {
//                     this.$store.commit('change_admin');
                    localStorage.setItem('user',JSON.stringify("admin"));
                    this.$router.push({path: '/admin'});
                    console.log("登录成功后的全局Token"+this.$store.getters.GetToken)
                }
                if (response.body.su == 0) {
//                     this.$store.commit('change_user');
                    localStorage.setItem('user',JSON.stringify("user"));
                    this.$router.push({path: '/user'});
                }
            },
            //登陆失败函数
            login_fail(response){
                document.getElementById("v_picture").src='/ancient_books/get_v_picture.action'+'?'+(new Date()).getTime();
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
                this.httpJson(this.login_url,'post',this.object,this.login_success,this.login_fail);
            },
            //得到验证码图片
//         GetCode() {
//             this.$http.get(this.code_url).then(function () {
//             })
//         },
            //自动登录
            auto_login() {
                this.$http.get(this. autologin_url).then(function (response) {
                    if (response.body.result==1) {
                        if (response.body.su == 1)
//                         this.$store.commit('change_user');
                            localStorage.setItem('user',JSON.stringify("user"));
                        this.$router.push({path: '/user'});
                        if (response.body.su = 0)
                            localStorage.setItem('user',JSON.stringify("admin"));
                        this.$router.push({path: '/admin'});
                    }
                    if (response.body.result==0)
                        localStorage.setItem('user',JSON.stringify("guest"));
                    this.$router.push({path: '/login'});
                },function () {
//                 alert("error")
                })
            }

        },
    }
</script>

<style>
    .store{
        margin-top: 25px;
        height: 70px;
        width: 100%;
    }
    .head-bar{
        margin-left: 400px;
        width: 850px;
    }
    .bookstore{
        background-image: url("../assets/img/墨点按钮.png");
        border: none;
        background-color: transparent;
        width: 135px;
        height: 56px;
    }
    .noumenon-store{
        margin-left: 47px;
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
        background-color: transparent;
        /*display: inline-block;*/
    }
    .user-name{
        padding: 5px;
        width:100px;
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
        margin-left: 760px;
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
    .warnborder{
        border:2px solid red;
    }
    .head{
        margin-left: 615px;
        margin-top: 120px;
        width: 300px;
        letter-spacing: 20px;
        font-size: 20px;
    }
    .login{
        background-color: #d9d9d9;
        width: 300px;
        height: 320px;
        margin-left: 590px;
        margin-top: 20px;
    }
    .input-ac-pwd{
        margin: 30px;
        display: inline-block;
    }
    .input-ac{
        margin-bottom: 10px;
    }
    .input-password{
        margin-top: 20px;
    }

    .text1{
    }
    .username{
        margin-left: 20px;
    }
    .text2{
        /*margin-left: -70px;*/
    }
    .password{
        margin-left: 20px;
    }
    .code{
        margin-top: -30px;
        margin-left: 60px;
    }
    .verification-code-input{
        height: 30px;
        width: 76px;
        text-align: center;
    }
    .code-img{
        margin-left: 30px;
        width: 76px;
        height: 30px;
        vertical-align:bottom;
        border: none;
    }
    .auto{
        margin-left: 60px;
        margin-top: 10px;
    }
    .save-password-checkbox{
        vertical-align: text-bottom;
    }
    .save-password-word{
        font-size: 12px;
    }
    .login-button{

        margin-top: 20px;
        margin-left: 75px;
        width: 160px;
        height: 30px;
        color: gray;
        background-color: white;
        border: none;
    }
</style>