<template>
    <div>
        <div class="login" id="login">
                <input placeholder=" 用 户 名" type="text" class="username">
                <input placeholder=" 密 码" type="password" class="password">
            <div>
                <input type="checkbox" id="save_password"  class="save_password_checkbox">
                <span class="save_password_word" >保存密码</span>
            </div>
            <div>
                <input type="text"  class="verification_code_input">
                <input type="button" value="验证码" class="verification_code_button">
            </div>
                <input type="submit" value="登    录" class="login_button">
        </div>
        <div class="head">
            <p>古籍检索系统</p>
        </div>
    </div>
</template>

<style>

    .login{
        position:absolute;
        background-color: #d9d9d9;
        width: 200px;
        height: 230px;
        left: 600px;
        top: 200px;
    }
    .head{
        position: absolute;
        left: 580px;
        top: 150px;
        letter-spacing: 30px;
    }
    .username{
        margin: 20px;
        border: none;
    }
    .password{
        margin-left: 20px;
        border: none;
    }
    .save_password_checkbox{
        margin-top: 5px;
        margin-left: 20px;
        vertical-align:middle;
    }
    .save_password_word{
        font-size: 12px;
    }
    .verification_code_input{
        height: 19px;
        margin-left: 20px;
        margin-top: 10px;
        width: 76px;
        text-align: center;
        border: none;
    }
    .verification_code_button{
        height: 21px;
        vertical-align:bottom;
        background-color: white;
        color: gray;
        width: 76px;
        border: none;
    }
    .login_button{
        width: 160px;
        margin-left: 20px;
        color: gray;
        background-color: white;
        border: none;
        margin-top: 30px;
    }

</style>