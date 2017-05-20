<template>
    <!--登录组件-->
    <div>
        <div class="head">
            <span>古籍检索系统</span>
        </div>
        <div class="login">
<<<<<<< HEAD
            <div class="input-ac-pwd">
                <div class="input-ac">
                    <span class="text1">账 号</span>
                    <input type="text" class="username" v-model="account" id="username" @blur="Check()" v-bind:class="{ warnborder: Active1 }">
                </div>
                <div class="input-pwd">
                    <span class="text2">密 码</span>
                    <input type="password" class="password" v-model="pwd" id="pwd" @blur="Check()" v-bind:class="{ warnborder: Active2 }">
                </div>
                <div class="warning-login">
                    <span id="warning" v-model="warning">{{warning}}</span>
                </div>
=======
            <div>
                <span class="text1">账 号</span>
                <input type="text" class="username" v-model="account" id="username" @blur="CheckLogin()" v-bind:class="{ warnborder: Active1 }">
                <span class="text2">密 码</span>
                <input type="password" class="password" v-model="pwd" id="pwd" @blur="CheckLogin()" v-bind:class="{ warnborder: Active2 }">
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
            </div>
            <div>
                <input type="checkbox" id="save-password"  class="save-password-checkbox" @click="Auto()">
                <span class="save-password-word" >自动登录</span>
            </div>
            <div>
                <input type="text" placeholder="验证码" class="verification-code-input" v-model="v">
                <!--验证码获取位置-->
                <img src="/ancient_books/get_v_picture.action" class="code-img" onclick="this.src=this.src+'?'+(new Date()).getTime()" alt="验证码">
            </div>
            <button class="login-button" @click="Login()" v-bind:disabled="disabled">登  录</button>
            <button @click="Test">测试</button>
        </div>
        <div>
            <span id="warning" class="warning-1" v-model="warning">{{warning}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
import store from './store'
//mock模拟数据
//let Mock=require('mockjs');
//Mock.mock(
//  '/ancient_books/login.action',{
//        "name": "姜鸿川",
//        "su|0-1": 0,
//        "result|0-1": 1,
//        "info": "密码错误或者账号不存在"
//    }
//);
 export default{

     data(){
         return{
             login_url: '/ancient_books/login.action',
             code_url: '/ancient_books/get_v_picture.action',
             judge_code_url: '/ancient_books/get_v_picture.action',
             autologin_url: '/ancient_books/get_user_info.action',
             warning:'',
             account: '',
             pwd: '',
             v: '',
             Active1:false,
             Active2:false,
             disabled: true,
             auto: false,
             object: {},
             show:''
         }
     },

     //组件刷新执行钩子
     mounted:function () {
         this.OnloadToken();
     },

     methods: {
<<<<<<< HEAD
         Test(){
             this.$store.state.Token="hhhhhh";
             alert(this.$store.state.Token);
//            this.$store.commit("login_show");
//             this.show=this.$store.getters.GetShow;
//             alert(this.show)
         },

         /**
          *  账号 正则判断输入是否规范
          */

         Check(){
             this.disabled=true;
             this.warning = "";
             this.Active1=false;
             this.Active2=false;
             let success1=this.checkuser(this.account);
             let success2=this.checkpwd(this.pwd);
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


//         /**
//          *  密码 正则判断输入是否规范
//          */
//
//         CheckPwd(){
//             this.disabled=true;
//             this.warning = "";
//             this.Active2=false;
//             let success2=this.checkpwd(this.pwd);
//             if (success2){
//                 this.warning= "";
//                 this.Active2=false;
//                 this.disabled=false;
//             }else {
//                 this.warning = "密码格式错误";
//                 this.Active2=true;
//             }
//         },
         CreateVPicture(){
             document.getElementById("v_picture").src='/ancient_books/get_v_picture.action';
         },

=======
//         Test(){
//            this.$store.commit("login_show")
//         },
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
         // 网页启动得到token
         OnloadToken(){
             this.$http.get('/ancient_books/getToken.action').then(function (response) {
                 console.log("成功得到token");
<<<<<<< HEAD
                 this.$store.state.Token = response.body.token;
                 console.log(this.$store.state.Token+" 第一次获得token");
                 if (this.$store.state.Token.length != 0){
                     this.AutoLogin();
                     this.CreateVPicture()
                 }
             },function () {
                 alert("error")
=======
                 this.Token = response.body.token;
                 console.log(this.Token);
                 this.AutoLogin();
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
             })
         },

         /**
          *  正则判断输入是否规范
          */
         CheckLogin(){
             //获取输入框值
             //判断输入内容是否正确
              let x =this.account;
              let y=this.pwd;
             this.disabled=true;
             this.warning = "";
             this.Active1=false;
             this.Active2=false;
             if (x.length != 0 || y.length != 0) {
                 if (x.length != 0 && y.length == 0){
                     if (x.match('[a-zA-Z0-9]{8,10}$') === null) {
                        this.warning = "用户名格式错误";
                        this.Active1=true;
                     } else {
                        this.warning= "";
                         this.Active1=false;
                     }
                 }else if (x.length == 0 && y.length != 0) {
                     if (y.match('[a-zA-Z0-9_]{6,16}$') === null) {
                         this.warning =  "密码格式错误";
                         this.Active2=true;
                     } else {
                         this.warning = "";
                         this.Active2=false;
                     }
                 }else if (x.length != 0 && y.length != 0) {
                     if (x.match('[a-zA-Z0-9]{8,10}$') === null) {
                         this.warning = "用户名格式错误";
                         this.Active1=true;
                     } else if (y.match('[a-zA-Z0-9_]{6,16}$') === null) {
                         this.warning =  "密码格式错误";
                         this.Active2=true;
                     }else {
                         this.warning = "";
                         this.Active1=false;
                         this.Active2=false;
                         this.disabled=false
                     }
                 }
             }
         },

         Auto() {
           this.auto = !this.auto
         },
         LoginSuccess(response){
             if (response.body.result == 0) {
                 alert(response.body.info);
             }
             if (response.body.result == 1) {
                 if (response.body.su == 1) {
                     this.$router.push({path: '/super_user'});
                 }
                 if (response.body.su == 0) {
                     this.$router.push({path: '/user'});
                 }
             }
         },
         //登陆失败函数
         LoginFail(){
           alert("error")
        },
         //点击登录按钮执行函数
         Login() {
             //给对象object内容赋值
             this.object.account=this.account;
             this.object.pwd=this.pwd;
             this.object.v=this.v;
             this.object.auto=this.auto;
             this.object.token=this.Token;
             console.log("全局token"+this.Token);
             console.log("login需要穿给后台的token"+this.object.token);
             // 与后端对接的vue-resource
             this.BeforeHttp(this.object);
             this.object.token=this.Token;
             this.HttpPostForm(this.login_url,this.object,this.LoginSuccess,this.LoginFail);
         },

         //得到验证码图片
         GetCode() {
             this.$http.get(this.code_url).then(function () {
             })
         },

         //自动登录
         AutoLogin() {
             this.$http.get(this. autologin_url).then(function (response) {
                 if (response.body.result==1) {
                     if (response.body.su == 1)
                         this.$router.push({path: '/user'});
                     if (response.body.su = 0)
                         this.$router.push({path: '/super_user'});
                 }
                 if (response.body.result==0)
                     this.$router.push({path: '/login'});
             },function () {
                 alert("error")
             })
         }
     }
 }
</script>

<style>
    .warning-1{
        position:absolute;
        width: 300px;
        height: 30px;
        font-size:12px;
        color:red;
        left: 615px;
        top: 270px;
    }
    .warnborder{
        border:2px solid red;
    }

    .login{
        background-color: #d9d9d9;
        width: 300px;
        height: 320px;
        left: 590px;
        top: 150px;
        position: relative;
    }
    .head{
        position: relative;
        left: 630px;
        top: 120px;
        width: 300px;
        letter-spacing: 20px;
        font-size: 20px;
    }
    .text1{
        position: absolute;
        left: 40px;
        top: 20px;
    }
    .username{
        position: absolute;
        left: 90px;
        top: 20px;
    }
    .text2{
        position: absolute;
        left: 40px;
        top: 60px;
    }
    .password{
        position: absolute;
        left: 90px;
        top: 60px;
    }
    .save-password-checkbox{
        position: absolute;
        left: 40px;
        top: 159px;
    }
    .save-password-word{
        position: absolute;
        font-size: 12px;
        left: 60px;
        top: 160px;
    }
    .verification-code-input{
        position: absolute;
        height: 30px;
        left: 65px;
        top: 120px;
        width: 76px;
        text-align: center;
        border: none;
    }
    .code-img{
        position:absolute;
        left: 165px;
        top: 120px;
        width: 76px;
        height: 30px;
        vertical-align:bottom;
        border: none;
    }
    .login-button{
        position: absolute;
        top: 200px;
        left: 80px;
        width: 160px;
        height: 30px;
        color: gray;
        background-color: white;
        border: none;
    }

</style>