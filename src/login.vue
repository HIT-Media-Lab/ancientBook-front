<template>
    <div :autologin="AutoLogin">
        <div class="head">
            <span>古籍检索系统</span>
        </div>
        <div class="login">
            <div>
                <span class="text1">账 号</span>
                <input placeholder="输入8-11位英文、数字" type="text" class="username" v-model="account" id="username" @blur="check_in">
                <span class="text2">密 码</span>
                <input placeholder="输入8-11位英文、数字" type="password" class="password" v-model="pwd" id="pwd" @blur="check_in">
            </div>
            <div>
                <input type="checkbox" id="save_password"  class="save_password_checkbox" @click="Auto">
                <span class="save_password_word" >自动登录</span>
            </div>
            <div>
                <input type="text"  class="verification_code_input" v-model="v">
                <input type="button" value="验证码" class="verification_code_button" @click="GetCode">
            </div>
                <button   class="login_button" @click="Login">登  录</button>
        </div>
        <div class="warning_text">
            <div>
                <span id="warning" class="warning"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import store from './store'

 export default{

     data(){
         return{
             login_url:'/ancient_books/login.action',
             code_url:'/ancient_books/get_v_picture.action',
             judge_code_url:'/ancient_books/get_v_picture.action',
             autologin_url:'/ancient_books/get_user_info.action',
             get_token:'/ancient_books/getToken.action',
             account:'',
             pwd:'',
             v:'',
             object:{
                 account:this.account,
                 pwd:this.pwd,
                 v:this.v
             },
             auto:false
         }
     },
     methods:{
         check_in(){
             let x = document.getElementById("username").value;//获取输入框id
             let y = document.getElementById("pwd").value;
             //获取输入框value
             //判断输入内容是否正确
             if (x.match("^[a-zA-Z0-9_]{7,10}$")===null) {
                 document.getElementById("warning").innerHTML = "用户名错误，请输入8-11位英文、数字、下划线";
//                 this.account = null;
//                 this.pwd = null

             } else  if (y.match("^[a-zA-Z0-9_]{7,10}$")===null) {
                 document.getElementById("warning").innerHTML = "密码错误，请输入8-11位英文、数字、下划线";
//                 this.account = null;
//                 this.pwd = null

             }else {
//                 document.getElementById("username").placeholder = "输入8-11位英文、数字";
//                 document.getElementById("pwd").placeholder = "输入8-11位英文、数字";
                 document.getElementById("warning").innerHTML = "";
             }
         },

         Auto() {
           this.auto=!this.auto
         },
         LoginSuccess(response){
             if (response.result == 0)
                 alert(response.info);
             if (response.result == 1) {
                 if (response.su == 1)
                     this.$router.push({path: '/super_user'});
                 if (response.su == 0) {
                     if (response.v == 1)
                         this.$router.push({path: '/user'});
                     if (response.v == 0)
                         document.getElementById("warning").innerHTML = "验证码错误"
                 }
             }
         },
         LoginFail(){
           alert("error")
         },
         Login() {
//             this.$store.dispatch('login_show');
             this.HttpPost(this.login_url,this.object,this.LoginSuccess(),this.LoginFail());
         },
         GetCode() {
             this.$http.get(this.code_url).then(function () {

             })
         },
         AutoLogin() {
             this.$http.get(this. autologin_url).then(function (response) {
                 if (response.result==1)
                     if(response.su==1)
                        this.$router.push({path: '/user'});
                     if(response.su=0)
                         this.$router.push({path: '/super_user'});
                 if (response.result==0)
                     this.$router.push({path: '/login'});
             },function () {
                 alert("error")
             })
         }
     }
 }
</script>

<style>
    .warning{
        position:absolute;
        width: 300px;
        height: 30px;
        font-size: 12px;
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
        left: 40px;
        top: 120px;
        width: 76px;
        text-align: center;
        border: none;
    }
    .verification_code_button{
        position: absolute;
        left: 140px;
        top: 120px;
        height: 30px;
        vertical-align:bottom;
        background-color: white;
        color: gray;
        width: 76px;
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