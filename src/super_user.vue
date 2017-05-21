
<!--定义组件-->
<template >
    <div  class="table-container">
        <!--正中间组件-->
        <div>

            <!--管理用户文字图片-->
            <div class="user-text">
                <img class="image" src="src/assets/img/毛笔.png" height="25" width="25"/>
                <span>管理用户</span>
            </div>

            <!--创建用户按钮-->
            <input type="button" class="btn-general create-user" value="创建用户"  @click="openDialog()">

            <!--用户信息表格-->
            <table class="table-box">
                <!--表格第一行表头-->
                <tr>
                    <th>用户名</th>
                    <th >账号</th>
                    <th>创建时间</th>
                    <th></th>
                </tr>

                <!--显示用户信息-->
                <tr v-for="(item,index) in user_data"> <!--v-for循环数据里的数组数据-->
                    <td>{{ item.user_name }}</td>
                    <td>{{item.account}}</td>
                    <td>{{item.time}}</td>
                    <td>
                        <input type="button" class="btn-general" value="修改" @click="openMotal(index)">    <!--v-on click 依据index实现删除功能（格式）-->
                        <input type="button" class="btn-general" value="删除" @click="deleteUsers(index)">
                    </td>
                </tr>
            </table>
        </div>

        <!--创建用户的模态框-->
        <div class="dialogs" v-bind:show.sync="show_create">
            <div class="dialog" v-bind:class="{ 'dialog-active': show_create }">
                <div class="dialog-content">

                    <header class="dialog-header">
                        <span class="dialog-title">普通用户创建</span>
                        <span class="close rotate iconfont icon-close" @click="closeDialog()">×</span><!--关闭图标-->
                    </header>

                    <div class="dialog-body" >
                        <div class="strap">
                            <span class="span-motal">用户名：</span>
                            <input type="text"  id="text1" class="input-motal" placeholder="输入2-10位中文、英文、数字" onfocus="this.placeholder=''" @blur="checkName('text1')"  v-model="user_name" v-bind:class="{warnBorder:this.is_active[0]}" >
                        </div>

                        <div class="strap">
                            <span class="span-motal">账号：</span>
                            <input type="text"  id="text2" class="input-motal"  placeholder="输入8-10位数字、英文" onfocus="this.placeholder=''" @blur="checkAccount('text2')" v-model="account" v-bind:class="{warnBorder:this.is_active[1]}">
                        </div>

                        <div class="strap">
                            <span class="span-motal">密码：</span>
                            <input type="password"  id="text3" class="input-motal" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="checkPwd('text3')" v-model="pwd" v-bind:class="{warnBorder:this.is_active[2]}">
                        </div>

                        <div>
                            <span class="span-motal">重复密码：</span>
                            <input type="password" id="text4" class="input-motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="dupPwd('text3','text4')" v-model="confirm_pwd" v-bind:class="{warnBorder:this.is_active[3]}" >
                        </div>
                    </div>
                    <footer class="dialog-footer" >
                        <!--提示信息-->
                        <p  class="warn-tip" v-model="tip">{{tip}}</p>
                        <!--按钮-->
                        <div>
                            <button class="btn-general" style="margin-right: 10%" @click="closeDialog()" tabindex="-1">取消</button>
                            <button class="btn-general "  @click="addMsg()" :disabled="add_if">创建</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>

        <!--修改的模态框-->
        <div class="dialogs" v-bind:show.sync="show_change">
            <div class="dialog" v-bind:class="{ 'dialog-active': show_change }">
                <div class="dialog-content">

                    <header class="dialog-header">
                        <span class="dialog-title">普通用户修改</span>
                        <span class="close rotate iconfont icon-close" @click="closeMotal()">×</span><!--关闭图标-->
                    </header>

                    <div class="dialog-body">
                        <div class="strap">
                            <span class="span-motal">账号:</span>
                            <input type="text" name="user_name" id="chan1" class="input-motal" v-model="back_account" readonly style="color: dimgrey;font-size: 15px;font-weight: 400;border-color: transparent;" tabindex="-1">
                        </div>

                        <div class="strap">
                            <span class="span-motal">用户名:</span>
                            <input type="text"  id="chan2" class="input-motal" v-model="back_username"  @change="checkName('chan2')" v-bind:class="{warnBorder:this.is_active[0]}">
                        </div >

                        <div class="strap">
                            <span class="span-motal">新密码:</span>
                            <input type="password"  id="chan3" class="input-motal" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="checkPwd('chan3')" v-model="pwd"  v-bind:class="{warnBorder:this.is_active[2]}" >
                        </div>

                        <div class="strap">
                            <span class="span-motal">重复密码:</span>
                            <input type="password" id="chan4" class="input-motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="dupPwd('chan3','chan4')" v-model="confirm_pwd" v-bind:class="{warnBorder:this.is_active[3]}">
                        </div>
                    </div>

                    <footer class="dialog-footer" slot="footer">
                        <!--提示信息-->
                        <span class="warn-tip" v-model="tip">{{tip}}</span>
                        <div>
                            <button class="btn-general" style="margin-right: 10%" @click="closeMotal()" tabindex="-1">取消</button>
                            <button class="btn-general" @click="confirmChange()" :disabled="add_if">修改</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>

        <!--翻页组件-->
        <page-component  :cur_max=this.max_page v-on:pre_page="preP" v-on:next_page="nextP" v-on:skip_page="skiP"></page-component>
    </div>
</template>


<script type="text/javascript">
    /* let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_user_list.action?page=1','get',{
        "content|20":[{
            'user_id|1-100':100,
            'name':'@FIRST',
            'account|10000000-1000000000':100000000,
            'time':'@DATETIME("yyyy-MM-dd HH:mm:ss")'
        }],
        'max_page|1-100':100
    });

    Mock.mock('/ancient_books/getToken.action','get',{
        'Token|1-100':100
    });*/
    import pageComponent from "./pageComponent.vue"
    export default{
        components:{ pageComponent },
        data(){
            return {
                show_create: false,
                show_change: false,

                tip: '',    //创建用户的错误提示
                is_active:[false,false,false,false],    //错误提示显示红色框
                add_if:true,    //判断是否执行 创建/修改 请求
                check_n:true,   //判断用户名是否重复
                check_a:false,   //判断账号是否重复

                user_data: [],
                user_name: '',
                account: '',
                pwd: '',
                confirm_pwd: '',
                back_index: '',
                back_username: '',
                back_account: '',
                get_url: '/ancient_books/get_user_list.action', //显示用户列表
                add_url: '/ancient_books/add_user.action',  //创建普通用户
                modify_url: '/ancient_books/modify_user.action',    //修改用户
                delete_url: '/ancient_books/delete_user_by_id.action',  //删除用户
                name_url:'/ancient_books/check_name.action',    //用户名重复
                account_url:'/ancient_books/check_account.action',    //账号重复

                page: 1,//当前页面
                max_page: 1,//总页数

                get_user: {},//显示用户数据对象
                add_user:{},//创建用户数据对象
                delete_user:{},//删除用户数据对象
                modify_user:{},//修改数据对象
                check_name:{}, //检查用户名是否重复
                check_account:{} //检查账号是否重复
            }
        },
        created: function () {
            console.log("super_user 已经created");
            this.getUsers(1);
            console.log("created时的全局token"+this.$store.getters.GetToken);
        },
        methods: {
            // get数据显示用户列表 成功地回调函数
            successGet(response){
                    console.log("success get users ");
                    //将后端数据显示在前端页面里
                    if( response.body.content.length === 0 ){
                        console.log("没有返回数组！");
                    }else {
                        this.max_page = response.body.max_page;
                        for ( let i = 0; i < response.body.content.length; i++ ){
                            this.user_data.push({
                                user_name: response.body.content[i].name,
                                account: response.body.content[i].account,
                                time:response.body.content[i].time,
                                user_id: response.body.content[i].user_id
                            });
                        }
                    }
            },

            failGet(){
                console.log("fail get users!");
            },

            //向后端发起请求获取用户数据列表，显示在前端页面
            getUsers(pages){
                this.get_user.key="page";
                this.get_user.value=pages;
                this.HttpGetForm(this.get_url,this.get_user,this.successGet, this.failGet);
            },

            //创建用户 post用户数据 success回调函数
            successAdd(response){
                if(response.body.result===1) {
                    console.log("success create!");
                    this.cleanData();
                    this.closeDialog(); //关闭创建用户的模态框
                }else if (response.body.result===0) {
                    console.log("fail create!");
                }
            },

            failAdd(){
                console.log("error create!");
            },

            //添加用户post请求数据的赋值
            createUsers(){
                //将用户信息放进请求对象里
                this.add_user.name = this.user_name;
                this.add_user.account = this.account;
                this.add_user.pwd = this.pwd;
                this.HttpPostForm(this.add_url, this.add_user, this.successAdd, this.failAdd);
            },

            //创建用户的模态框 系列函数
            openDialog(){
                this.show_create = true;
            },

            closeDialog() {
                this.show_create = false;
                this.user_name="";
                this.account="";
                this.pwd="";
                this.confirm_pwd="";
                this.tip="";
                this.is_active[0]=false;
                this.is_active[1]=false;
                this.is_active[2]=false;
                this.is_active[3]=false;
            },

            //用户名判断合法
            checkName(tag1){
                document.getElementById(tag1).placeholder ="输入2-10位中文、英文、数字";
                this.add_if = true;    //禁用按钮
                this.is_active[0]=false;

                let x = document.getElementById(tag1).value;
                let y;
                if( x.length !== 0){
                    y = this.checkname(x);
                    if( y === true ){
                        this.tip = "";
                        this.is_active[0]=false;
                        this.dupName(x);
                    } else {
                        this.tip = "输入2-10位中文、英文、数字";
                        this.add_if=true;
                        this.is_active[0]=true;
                    }
                }
            },

            //账号判断合法
            checkAccount(tag2){
                document.getElementById(tag2).placeholder = "输入8-10位数字、英文";
                this.add_if = true;    //禁用按钮
                this.is_active[1]=false;

                let x = document.getElementById(tag2).value;
                let y;
                if( x.length !== 0){
                    y = this.checkuser(x);
                    if( y === true ){
                        this.tip = "";
                        this.is_active[1]=false;
                        this.dupAccount();
                    } else {
                        this.tip = "输入8-10位数字、英文";
                        this.add_if=true;
                        this.is_active[1]=true;
                    }
                }
            },


            //密码判断合法
            checkPwd(tag3){
                document.getElementById(tag3).placeholder = "输入6-16位数字、英文";
                this.add_if = true;    //禁用按钮
                this.is_active[2]=false;

                let x = document.getElementById(tag3).value;
                let y;
                if( x.length !== 0){
                    y = this.checkpwd(x);
                    if( y === true ){
                        this.add_if = false;
                        this.tip = "";
                        this.is_active[2]=false;
                    } else {
                        this.tip = "输入6-16位数字、英文";
                        this.add_if=true;
                        this.is_active[2]=true;
                    }
                }
            },

            //失去焦点判断输入是否合法
           /* checkIn(tag1,placeholder_text,index){
                document.getElementById(tag1).placeholder =placeholder_text;
                this.add_if = true;    //禁用按钮
                this.is_active[index]=false;

                let x = document.getElementById(tag1).value;
                let y;
                //不为空时判断正则
                if ( x.length !== 0 ){
                    if( tag1 === "text1" || tag1 === "chan2" ){
                        y = this.checkname(x);
                    } else if( tag1 === "text2" ){
                        y = this.checkuser(x);
                    } else if( tag1 === "text3" || tag1 === "chan3" ){
                        y =this.checkpwd(x);
                    }

                    //是否匹配正则的返回值
                    if( y === true){
                        if(tag1 === "text1" || tag1 === "chan2"){
                            this.dupName(x);
                        } else if( tag1 === "text2" ){
                            this.dupAccount();
                        } else if( tag1 === "text3"){
                            this.add_if = false;
                        }
                        this.tip="";
                        this.is_active[index]=false;
                    } else {
                        this.tip=placeholder_text;
                        this.add_if=true;
                        this.is_active[index]=true;
                    }
                }
            },*/


            /*checkIn(tag1,placeholder_text,juge_text,index){
                let x=document.getElementById(tag1).value;
                if(x!==""){
                    if(x.match(juge_text)){
                        if(tag1 === "text1"){
                            this.dupName(x);
                        }else if( tag1 === "text2" ){
                            this.dupAccount();
                        }
                        this.tip="";
                        document.getElementById(tag1).placeholder =placeholder_text;
                        this.add_if=true;
                        this.is_active[index]=false;
                        //this.is_active[1]=false;
                        //this.is_active[2]=false;
                    }else{
                        this.tip=placeholder_text;
                        document.getElementById(tag1).placeholder = placeholder_text;
                        this.add_if=false;
                        this.is_active[index]=true;
                    }
                }else{
                    document.getElementById(tag1).placeholder =placeholder_text;
                    this.add_if=false;
                    this.is_active[index]=false;
                    //this.is_active[1]=false;
                    //this.is_active[2]=false;
                }
            }, */

            //重复输入密码确认
            dupPwd(tag1,tag2){
                document.getElementById(tag2).placeholder = "重复密码";
                this.add_if = true;
                this.is_active[3] = false;
                let x = document.getElementById(tag1).value;
                let y = document.getElementById(tag2).value;
                if(y.length !== 0){
                    if(y !== x){
                        this.tip="输入密码不一致！";
                        this.add_if = true;
                        this.is_active[3] = true;
                    }else{
                        this.tip = "";
                        this.add_if =false;
                        this.is_active[3] = false;
                    }
                }
            },

            //判断用户名是否重复
            successName(response){
                if( response.body.result === 1 ){
                    console.log("用户名不重复！");
                    this.add_if = false;    //按钮可以使用
                } else if( response.body.result === 0 ){
                    this.is_active[0]=true;
                    this.add_if = true;
                    this.tip="用户名已存在!";
                }
            },

            failName(){
              console.log("用户名重复请求错误");
            },

            dupName(n){
                    this.check_name.key = "name";
                    this.check_name.value = n;
                    this.HttpGetForm(this.name_url, this.check_name, this.successName, this.failName);
            },


            //判断账号是否重复
            successAccount(response){
                if( response.body.result === 1 ){
                    console.log("账号不重复！");
                    this.add_if = false;
                } else if( response.body.result === 0 ){
                    this.is_active[1]=true;
                    this.tip="账号已存在!";
                    this.add_if = true;
                }
            },

            failAccount(){
                console.log("账号重复请求错误");
            },

            dupAccount(){
                    this.check_account.key = "account";
                    this.check_account.value = this.account;
                    this.HttpGetForm(this.account_url, this.check_account, this.successAccount, this.failAccount);
            },

            //添加用户信息
            addMsg(){
                let x = document.getElementById("text1").value;
                let y = document.getElementById("text2").value;
                let z = document.getElementById("text3").value;
                let m = document.getElementById("text4").value;
                if (x === "" || y === "" || z === "" || m === "") {
                    //this.tip = "用户名、账号、密码等不能为空！";
                    this.add_if = true;
                } else {
                    this.checkName('text1');
                    this.checkAccount('text2');
                    this.checkPwd('text3');
                    this.dupPwd('text3','text4');
                    if ( this.add_if === false ) {
                        this.createUsers();
                    }
                }
            },
           /* addMsg(){
                let x = document.getElementById("text1").value;
                let y = document.getElementById("text2").value;
                let z = document.getElementById("text3").value;
                let m = document.getElementById("text4").value;
                if (x === "" || y === "" || z === "" || m === "") {
                    this.tip = "用户名、账号、密码等不能为空！"
                } else {
                   this.checkIn('text1','输入2-10位中文、英文、数字','[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$',0);
                   this.checkIn('text2','输入8-10位数字、英文','[a-zA-Z0-9]{8,10}$',1);
                   this.checkIn('text3','输入6-16位数字、英文','[a-zA-Z0-9_]{6,16}$',2);
                   this.checkPwd('text3','text4');
                    if ( this.add_if === true ) {
                        this.createUsers();
                    }
                }
            },*/

            //删除用户信息 success回调函数
            successDelete(response){
                if (response.body.result === 1) {
                    console.log("success delete");
                    this.cleanData();   //关闭模态框
                } else if (response.body.result === 0) {
                    console.log("fail delete");
                }
            },

            failDelete(){
                console.log("error delete");
            },

            deleteUsers(index){
                this.delete_user.user_id = this.user_data[index].user_id;
                this.HttpPostForm(this.delete_url,this.delete_user,this.successDelete,this.failDelete);
            },


            //修改用户信息 模态框系列
            openMotal(index){
                this.show_change = true;
                this.back_index = index;    //将修改行的索引传入便于后面发送该索引下的用户ID
                this.back_username = this.user_data[index].user_name;
                this.back_account = this.user_data[index].account;
            },

            closeMotal(){
                this.show_change=false;
                this.back_username='';
                this.back_account='';
                this.pwd='';
                this.confirm_pwd = '';
                this.back_index='';
                this.tip='';
                this.is_active[0]=false;
                this.is_active[2]=false;
                this.is_active[3]=false;
            },

            successModify(response){
                if( response.body.result === 1 ){
                    console.log("success modify!");
                    this.cleanData();
                    this.closeMotal();
                } else if( response.body.result === 0 ){
                    console.log("fail modify!");
                }
            },

            failModify(){
                console.log("error modify!");
            },

            //修改的请求函数
            modifyUsers(){
                this.modify_user.name=this.back_username;
                this.modify_user.pwd=this.pwd;
                this.modify_user.user_id=this.user_data[this.back_index].user_id;
                this.HttpPostForm(this.modify_url,this.modify_user,this.successModify,this.failModify);
            },

            //修改执行的函数
            confirmChange(){
                let x=document.getElementById("chan2").value;
                let y=document.getElementById("chan3").value;
                let z=document.getElementById("chan4").value;
                if (x === "" || y === "" || z === "" ) {
                    this.tip = "用户名、账号、密码等不能为空！"
                } else {
                    this.checkName('chan2');
                    this.checkPwd('chan3');
                    this.dupPwd('chan3','chan4');
                    if (this.add_if === true) {
                        this.modifyUsers();
                    }
                }
            },


            preP(){
                this.page = --this.page;
                this.cleanData();
                console.log("pre:"+this.page);
            },

            nextP(){
                this.page= ++this.page;
                this.cleanData();
                console.log("next:"+this.page);
            },

            skiP(p){
                this.page = p;
                this.cleanData();
                console.log("skip:" + this.page);
            },

            //清空原有数组数据,刷新页面
            cleanData(){
                this.user_data.splice(0, this.user_data.length);
                this.getUsers(this.page);
            }


        }
    }

</script>



<style>
    /*组件整个居中显示*/
    .table-container{
        padding-top: 60px;
        margin:auto;
        width: 52%;
        height:10%;
    }

    /*管理用户表格样式*/
    .table-box{
        background-color: #f7e1b5;  /*背景颜色*/
        border-style: solid;    /*表格整体边框线条样式*/
        border-color: sienna ;  /*表格边框颜色*/
        border-collapse: collapse;  /*内外边框重合*/
        vertical-align: middle;   /*表格边框内容居中*/
        width:800px;
        margin:auto;
        table-layout: fixed;    /*表格每个宽度确定*/

    }

    /*表格内部边框样式*/
   th,td{
        border-style: solid;    /*内边框线式*/
        border-color: sienna;  /*内边框的颜色*/
        text-align: center; /*内容居中*/
        height: 50px;/*表格宽度*/
        /*字体设置*/
        font-family: 楷体;
        color: dimgrey;
        font-size: 20px;
    }

    /*用户管理字与图片*/
    .user-text{
        text-align: left;

        /*字体设置*/
        font-family: 楷体;
        font-size: 20px;
        font-weight: bold;
        color: dimgrey;
    }

    /*按钮样式*/
    .btn-general{
        background-color:sienna;   /*按钮填充颜色*/
        color: #F2F2F2; /*按钮边框颜色*/
        width:70px;
        height: 28px;
        border-radius: 8px;
        border-color: transparent;
    }

    /*创建按钮的位置*/
    .create-user{
        margin-top: 1%;
        margin-bottom: 1%;
    }


    /*模态框输入框之间间距*/
    .strap{
        padding-bottom: 0.5em;
    }

    .dialog {
        width: 480px;
        position: fixed;
        left: 50%;
        top: 6em;
        transform: translateX(-50%);
        z-index: 2000;
        visibility: hidden;
        backface-visibility: hidden;
        perspective: 1300px;
    }

    .dialog-active{
        visibility: visible;
    }

    .dialog-active .dialog-content {
        position: relative;
        opacity: 1;
        transform: rotateY(0);
    }

    .dialog-active ~ .dialog-overlay {
        opacity: 1;
        visibility: visible;
    }

    .dialog-content {
        border-radius: 2px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: .5s ease-in-out;
        opacity: 0;
        transform-style: preserve-3d;
        transform: rotateY(-70deg);
    }

    .dialog-header {
        background: #fff;
        margin-top: 5%;
    }

    .dialog-title {
        color: dimgrey;
        font-size: 25px;
        font-family: 楷体;
        text-align: center;
        width:6em;
        margin-right:35%;
        margin-left: 34%;
        font-weight: 200;
        line-height: 1em;
        display: inline-block;
    }

    .dialog-body {
        padding: 2em;
    }

    .dialog-footer {
        padding: 3% 0;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .close {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: .5rem;
        right: .5rem;
        transition: .8s ease all;
         -moz-transition: .8s ease all;
         -webkit-transition: .8s ease all;
        border: none;
        border-radius: 3px;
        color: #333;
        text-decoration: none;
        box-sizing: border-box;
         -webkit-box-sizing: border-box;
    }

    .close:hover {
        transition: .8s ease all;
         -moz-transition: .8s ease all;
         -webkit-transition: .8s ease all;
    }

    .close .iconfont {
        font-size: 2rem;
        color: black;
    }

    .rotate {
        cursor: pointer;
    }

    .rotate:hover {
        transition: transform 1.0s ease;
         -moz-transition: -moz-transform 1.0s ease;
         -webkit-transition: -webkit-transform 1.0s ease ;
    }

    .close .iconfont {
        font-size: 2rem;
        color: black;
    }

    .iconfont {
        font-size: 33px;
        font-style: normal;

         -webkit-font-smoothing: antialiased;
         -webkit-text-stroke-width: 0.2px;
         -moz-osx-font-smoothing: grayscale;
    }
    .span-motal{
        font-family: 楷体;
        font-size: 20px;
        font-weight: bold;
        color: dimgrey;
        text-align:right;
        width: 6em;
        display: inline-block;
    }

    .input-motal{
        width:15em;
        margin-top: 0;
        text-align: center;
        display: inline;
        margin-left: 10%;
    }

    /*错误提示*/
    .warn-tip{
        color: #ff0000;
        font-size: 18px;
        text-align:center;
        font-family: 楷体;
    }

    /*错误提示红框*/
    .warnBorder {
        border: 2px solid red;
    }






</style>