<template>
    <!--登录组件-->
    <div>
        <div class="head">
            <span>古籍检索系统</span>
        </div>
        <div class="login">
            <div>
                <span class="text1">账 号</span>
                <input placeholder="输入8-10位英文、数字" type="text" class="username" v-model="account" id="username" @blur="check_in()">
                <span class="text2">密 码</span>
                <input placeholder="输入6-16位英文、数字" type="password" class="password" v-model="pwd" id="pwd" @blur="check_in()">
            </div>
            <div>
                <input type="checkbox" id="save_password"  class="save_password_checkbox" @click="Auto()">
                <span class="save_password_word" >自动登录</span>
            </div>
            <div>
                <input type="text" placeholder="验证码" class="verification_code_input" v-model="v">
                <!--<input type="button" value="验证码" class="verification_code_button" @click="GetCode()">-->
                <!--验证码获取位置-->
                <img src="code_url" class="code-img" onclick="this.src=this.src+'?'+(new Date()).getTime()" alt="验证码">
            </div>
            <button class="login_button" @click="Login()" v-bind:disabled="disabled">登  录</button>
            <!--<button @click="test">测试</button>-->
        </div>
        <div>
            <span id="warning" class="warning-1"></span>
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
             login_url:'/ancient_books/login.action',
             code_url:'/ancient_books/get_v_picture.action',
             judge_code_url:'/ancient_books/get_v_picture.action',
             autologin_url:'/ancient_books/get_user_info.action',
             account: '',
             pwd: '',
             v: '',
             disabled: true,
             auto: false,
             object: {}
         }
     },

     //组件刷新执行钩子
     mounted:function () {
         this.onload_token();
         this.AutoLogin()
     },

     methods: {
         test(){
            this.$store.commit("login_show")
         },
         // 网页启动得到token
         onload_token(){
             this.$http.get('/ancient_books/getToken.action').then(function (response) {
                 console.log("成功得到token");
                 this.Token = response.body.token;
                 return this.Token
             })
         },

         /**
          *  正则判断输入是否规范
          */
         check_in(){
             //获取输入框值
             //判断输入内容是否正确
              let x =this.account;
              let y=this.pwd;
             this.disabled=true;
             document.getElementById("warning").innerHTML = "";
             if (x.length != 0 || y.length != 0) {
                 if (x.length != 0 && y.length == 0){
                     if (x.match('[a-zA-Z0-9]{8,10}$') === null) {
                         document.getElementById("warning").innerHTML = "用户名格式错误，请输入8-10位英文、数字";
                     } else {
                         document.getElementById("warning").innerHTML = "";
                     }
                 }else if (x.length == 0 && y.length != 0) {
                     if (y.match('[a-zA-Z0-9_]{6,16}$') === null) {
                         document.getElementById("warning").innerHTML =  "密码格式错误，请输入6-16位英文、数字";
                     } else {
                         document.getElementById("warning").innerHTML = "";
                     }
                 }else if (x.length != 0 && y.length != 0) {
                     if (x.match('[a-zA-Z0-9]{8,10}$') === null) {
                         document.getElementById("warning").innerHTML = "用户名格式错误，请输入8-10位英文、数字";
                     } else if (y.match('[a-zA-Z0-9_]{6,16}$') === null) {
                         document.getElementById("warning").innerHTML =  "密码格式错误，请输入6-16位英文、数字";
                     }else {
                         document.getElementById("warning").innerHTML = "";
                         this.disabled=false
                     }
                 }
             }
         },

         Auto() {
           this.auto = !this.auto
         },
         //登录成功函数
         LoginSuccess(response){
             if (response.body.result == 0) {
//                 console.log("hhh1");
                 alert(response.body.info);
                 this.src=this.src+'?'+(new Date()).getTime()
             }
             if (response.body.result == 1) {
//                 console.log("hhh2");
                 if (response.body.su == 1) {
//                     console.log("hhh3");
                     this.$router.push({path: '/super_user'});
                 }
                 if (response.body.su == 0) {
//                     console.log("hhh4");
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
//             console.log('hhhh');
             // 与后端对接的vue-resource
             this.HttpPostForm(this.login_url,this.object,this.LoginSuccess,this.LoginFail);
         },

         //得到验证码图片
         GetCode() {
             this.$http.get(this.code_url).then(function () {
//                 console.log("hhh5");
             })
         },

         //自动登录
         AutoLogin() {
             this.$http.get(this. autologin_url).then(function (response) {
//                 console.log("hhh6");
                 if (response.body.result==1) {
//                     console.log("hhh7");
                     if (response.body.su == 1)
//                         console.log("hhh8");
                         this.$router.push({path: '/user'});
                     if (response.body.su = 0)
//                         console.log("hhh9");
                         this.$router.push({path: '/super_user'});
                 }
                 if (response.body.result==0)
//                     console.log("hhh10");
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
        border: none;
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
        border: none;
    }
    .save_password_checkbox{
        position: absolute;
        left: 40px;
        top: 159px;
    }
    .save_password_word{
        position: absolute;
        font-size: 12px;
        left: 60px;
        top: 160px;
    }
    .verification_code_input{
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
    .login_button{
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