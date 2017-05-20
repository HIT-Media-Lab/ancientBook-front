<template>
    <!--登录组件-->
    <div>
        <div class="head">
            <h3>古籍检索系统</h3>
        </div>
        <div class="login">
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
            </div>
            <div class="code">
                <input type="text" placeholder="验证码" class="verification-code-input" v-model="v">
                <img src="" id="v_picture" class="code-img" onclick="this.src=this.src+'?'+(new Date()).getTime()" alt="验证码">
            </div>
            <div class="auto">
                <!--验证码获取位置-->
                <input type="checkbox" id="save-password"  class="save-password-checkbox" @click="Auto()">
                <span class="save-password-word" >自动登录</span>
            </div>
            <button class="login-button" @click="Login()" v-bind:disabled="disabled">登  录</button>
            <button @click="Test">测试</button>
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
     beforeMount:function () {
         this.OnloadToken();
     },

     methods: {
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

         // 网页启动得到token
         OnloadToken(){
             this.$http.get('/ancient_books/getToken.action').then(function (response) {
                 console.log("成功得到token");
                 this.$store.state.Token = response.body.token;
                 console.log(this.$store.state.Token+" 第一次获得token");
                 if (this.$store.state.Token.length != 0){
                     this.AutoLogin();
                     this.CreateVPicture()
                 }
             },function () {
                 alert("error")
             })
         },

         Auto() {
           this.auto = !this.auto
         },
         //登录的回调函数
         LoginSuccess(response){
             if (response.body.result == 0) {
                 document.getElementById("v_picture").src='/ancient_books/get_v_picture.action'+'?'+(new Date()).getTime();
                 alert(response.body.info);
             }
             if (response.body.result == 1) {
                 if (response.body.su == 1) {
                     this.$router.push({path: '/super_user'});
                     console.log("登录成功后的全局Token"+this.Token)
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
             console.log("全局token"+this.Token);
             // 与后端对接的vue-resource
             this.HttpPostForm(this.login_url,this.object,this.LoginSuccess,this.LoginFail);
         },
         //得到验证码图片
//         GetCode() {
//             this.$http.get(this.code_url).then(function () {
//             })
//         },
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
    .input-pwd{
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
        border: none;
    }
    .code-img{
        margin-left: 30px;
        width: 76px;
        height: 30px;
        vertical-align:bottom;
        border: none;
    }
    .auto{
        margin-left: 50px;
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