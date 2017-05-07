<!--&lt;!&ndash;定义组件&ndash;&gt;-->
<!--<template >-->
    <!--<div id="user_box">-->

        <!--&lt;!&ndash;正中间组件&ndash;&gt;-->
        <!--<div id="table_container">-->

            <!--&lt;!&ndash;管理用户文字图片&ndash;&gt;-->
            <!--&lt;!&ndash;<div id="user_text">&ndash;&gt;-->
            <!--&lt;!&ndash;<img  src="../assets/img/管理界面/毛笔.png" height="50" width="50"/>&ndash;&gt;-->
            <!--&lt;!&ndash;<span class="span_user">管理用户</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->

            <!--&lt;!&ndash;创建用户按钮&ndash;&gt;-->
            <!--<div id="create_user">-->
                <!--<input type="button" class="btn_general" value="创建用户"  @click="open_dialog()">-->
            <!--</div>-->

            <!--&lt;!&ndash;用户信息表格&ndash;&gt;-->
            <!--<div id="table_box">-->
                <!--<form name="user_form">-->
                    <!--<table id="table_all">-->
                        <!--&lt;!&ndash;表格第一行表头&ndash;&gt;-->
                        <!--<tr>-->
                            <!--<th class="table_border">用户名</th>-->
                            <!--<th class="table_border">账号</th>-->
                            <!--<th class="table_border">密码</th>-->
                            <!--<th class="table_border"></th>-->
                        <!--</tr>-->

                        <!--&lt;!&ndash;显示用户信息&ndash;&gt;-->
                        <!--<tr v-for="(item,index) in userData"> &lt;!&ndash;v-for循环数据里的数组数据&ndash;&gt;-->
                            <!--<td class="table_border" >-->

                                <!--{{item.user_name}}-->
                            <!--</td>-->
                            <!--<td class="table_border">-->

                                <!--{{item.account}}-->
                            <!--</td>-->
                            <!--<td class="table_border">-->
                                <!--<input type="password" class="input_pwd" v-model="item.pwd" readonly>-->
                            <!--</td>-->
                            <!--<td class="table_border">-->
                                <!--<input type="button"  class="btn_general" value="修改" @click="open_chaDialog(index)">&lt;!&ndash;v-on click 依据index实现删除功能（格式）&ndash;&gt;-->
                                <!--<input type="button" class="btn_general" value="删除" @click="deleteUsers(index)">-->
                            <!--</td>-->
                        <!--</tr>-->
                    <!--</table>-->
                <!--</form>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;创建用户的模态框&ndash;&gt;-->
        <!--<div class="dialogs" v-bind:show.sync="show_create">-->
            <!--<div class="dialog" v-bind:class="{ 'dialog-active': show_create }">-->
                <!--<div class="dialog-content">-->

                    <!--<header class="dialog-header">-->
                        <!--<span class="dialog-title">普通用户创建</span>-->
                        <!--<span class="close rotate iconfont icon-close" @click="close_dialog()">×</span>&lt;!&ndash;关闭图标&ndash;&gt;-->
                    <!--</header>-->

                    <!--<div class="dialog-body" >-->
                        <!--<p>-->
                            <!--<span class="span_motal_1">用户名</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="text" name="user_name" id="text1" class="input_motal" placeholder="输入1-8位数字、字母、下划线" onfocus="this.placeholder=''" @blur=" check_in('text1','text2','text3','tip1')"  v-model="user_name">-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">账号</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="text"  name="account" id="text2" class="input_motal"  placeholder="输入1-8位数字、字母、下划线" onfocus="this.placeholder='' " @blur="check_in('text1','text2','text3','tip1') " v-model="account">-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password"  name="pwd" id="text3" class="input_motal" placeholder="输入1-8位数字、字母、下划线"  onfocus="this.placeholder='' " @blur="check_in('text1','text2','text3','tip1') " v-model="pwd" >-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">重复密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password" id="text4" class="input_motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="check_pwd('text3','text4','tip2')" v-model="confirm_pwd">-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<footer class="dialog-footer" slot="footer">-->
                        <!--&lt;!&ndash;提示信息&ndash;&gt;-->
                        <!--<div class="warning_text">-->
                            <!--<div>-->
                                <!--<span id="tip1" class="warning"></span>-->
                            <!--</div>-->
                            <!--<div>-->
                                <!--<span id="tip2" class="warning"></span>-->
                            <!--</div>-->
                            <!--<span id="tip3" class="warning"></span>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;按钮&ndash;&gt;-->
                        <!--<div>-->
                            <!--<button class="btn_general" style="margin-right: 10%" @click="close_dialog()">取消</button>-->
                            <!--<button class="btn_general"  @click="add_msg()">创建</button>-->
                        <!--</div>-->
                    <!--</footer>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="dialog-overlay"></div>-->
        <!--</div>-->


        <!--&lt;!&ndash;修改的模态框&ndash;&gt;-->
        <!--<div class="dialogs" v-bind:show.sync="show_change">-->
            <!--<div class="dialog" v-bind:class="{ 'dialog-active': show_change }">-->
                <!--<div class="dialog-content">-->

                    <!--<header class="dialog-header">-->
                        <!--<span class="dialog-title">普通用户修改</span>-->
                        <!--<span class="close rotate iconfont icon-close" @click="close_chaDialog()">×</span>&lt;!&ndash;关闭图标&ndash;&gt;-->
                    <!--</header>-->

                    <!--<div class="dialog-body">-->
                        <!--<p>-->
                            <!--<span class="span_motal_1">账号</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="text" name="user_name" id="chan1" class="input_motal" v-model="back_account" readonly style="color: dimgrey;font-size: 15px;font-weight: 400; ">-->
                        <!--</p>-->

                        <!--<p >-->
                            <!--<span class="span_motal_1">用户名</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="text"  name="account" id="chan2" class="input_motal" v-model="back_username"  >-->
                        <!--</p >-->

                        <!--<p >-->
                            <!--<span class="span_motal_1">新密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password"  name="pwd" id="chan3" class="input_motal" placeholder="输入1-8位数字、字母、下划线"  onfocus="this.placeholder=''" @blur="check_in('chan1','chan2','chan3','tip4')" v-model="pwd" >-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">重复密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password" id="chan4" class="input_motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="check_pwd('chan3','chan4','tip5')" v-model="confirm_pwd">-->
                        <!--</p>-->
                    <!--</div>-->

                    <!--<footer class="dialog-footer" slot="footer">-->
                        <!--&lt;!&ndash;提示信息&ndash;&gt;-->
                        <!--<div class="warning_text">-->
                            <!--<div>-->
                                <!--<span id="tip4" class="warning"></span>-->
                            <!--</div>-->
                            <!--<div>-->
                                <!--<span id="tip5" class="warning"></span>-->
                            <!--</div>-->
                            <!--<span id="tip6" class="warning"></span>-->
                        <!--</div>-->

                        <!--<div>-->
                            <!--<button class="btn_general" style="margin-right: 10%" @click="close_chaDialog()">取消</button>-->
                            <!--<button class="btn_general" @click="confirm_change()">修改</button>-->
                        <!--</div>-->
                    <!--</footer>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;翻页键&ndash;&gt;-->
        <!--<div class="box_pages" onfocus="page()">-->
            <!--<form>-->
                <!--<div class="box_pages1">-->
                    <!--<input type="button" class="btn_pages" id="pre_page" value="上一页">-->
                <!--</div>-->
                <!--<div class="box_pages2">-->
                    <!--<input type="button" class="btn_pages " value="1/5">-->
                <!--</div>-->
                <!--<div class="box_pages3">-->
                    <!--<input type="button" class="btn_pages" id="next_page" value="下一页"  >-->
                <!--</div>-->
            <!--</form>-->
        <!--</div>-->

    <!--</div>-->
<!--</template>-->


<!--<script type="text/javascript">-->

<!--//    let Mock = require('mockjs');-->
<!--//-->
<!--//    //显示用户列表-->
<!--//    Mock.mock('/ancient_books/get_user_list.action','get',{-->
<!--//        "content|20":[{-->
<!--//            'user_id|1-100':100,-->
<!--//            'name':'@FIRST',-->
<!--//            'account|1-100':100,-->
<!--//            'pwd|1-100':100-->
<!--//        }],-->
<!--//        'max_page|1-100':100-->
<!--//    });-->
<!--//-->
<!--//    Mock.mock('/ancient_books/getToken.action','get',{-->
<!--//        'token|1-100':100-->
<!--//    });-->
<!--//-->
<!--//    //超级用户创建普通用户-->
<!--//    Mock.mock('/ancient_books/add_user.action','post',{-->
<!--//        'random_result|0-1':1,-->
<!--//        'success': {-->
<!--//            'result': 1,-->
<!--//            'info': "添加成功",-->
<!--//            'user_id|1-100':100-->
<!--//        },-->
<!--//        'fail':{-->
<!--//            'result':0,-->
<!--//            'info':"添加失败"-->
<!--//        }-->
<!--//    });-->
<!--//-->
<!--//    //修改用户列表-->
<!--//    Mock.mock('/ancient_books/modify_user.action','post',{-->
<!--//        'random_result|0-1':1,-->
<!--//        'success': {-->
<!--//            'result': 1,-->
<!--//            'info': "修改成功",-->
<!--//            'token|1-100':100-->
<!--//        },-->
<!--//        'fail':{-->
<!--//            'result':0,-->
<!--//            'info':"修改失败"-->
<!--//        }-->
<!--//    });-->
<!--//-->
<!--//    //删除用户-->
<!--//    Mock.mock('/ancient_books/delete_user_by_id.action','post',{-->
<!--//        'random_result|0-1':1,-->
<!--//        'success': {-->
<!--//            'result': 1,-->
<!--//            'info': "删除成功",-->
<!--//            'token|1-100':100-->
<!--//        },-->
<!--//        'fail': {-->
<!--//            'result': 0,-->
<!--//            'info':"删除失败"-->
<!--//        }-->
<!--//    });-->

    <!--export default{-->
        <!--data(){-->
            <!--return {-->
                <!--show_create:false,-->
                <!--show_change:false,-->

                <!--userData: [],-->
                <!--user_name: '',-->
                <!--account: '',-->
                <!--pwd: '',-->
                <!--confirm_pwd:'',-->
                <!--back_index:'',-->
                <!--back_username:'',-->
                <!--back_account:'',-->
                <!--token_url:'/ancient_books/getToken.action',//获取token-->
                <!--token:'',                              //-->
                <!--get_url:'/ancient_books/get_user_list.action',//显示用户列表-->
                <!--post_url:'/ancient_books/add_user.action',//创建普通用户-->
                <!--modify_url:'/ancient_books/modify_user.action',//修改用户-->
                <!--delete_url:'/ancient_books/delete_user_by_id.action',//删除用户-->

                <!--page:'1',     //当前页面-->
                <!--lastPage:'',-->
                <!--direct:0,-->
                <!--max_page:'', //总页数-->
                <!--page_size:'20',//每页条数-->
                <!--len:'',      //总行数-->


            <!--}-->
        <!--},-->
        <!--mounted:function(){-->
            <!--this.getUsers();-->
        <!--},-->

        <!--methods: {-->
            <!--getUsers(){-->
                <!--//获取token-->
                <!--this.$http.get('/ancient_books/getToken.action').then(function (response) {-->
                    <!--this.token = response.body.token;-->
                    <!--console.log(JSON.stringify("token:" + response.body.token));-->
                    <!--console.log("success token!")-->
                <!--});-->

                <!--//获取用户显示信息-->
                <!--this.$http.get(this.get_url, [this.page]).then(function (response) {-->
                    <!--console.log(JSON.stringify(response.body, null, 4));-->
                    <!--console.log("success get users ");-->

                    <!--//将后端数据显示在前端页面里-->
                    <!--this.max_page = response.body.max_page;-->
                    <!--for (let i = 1; i <= 20; i++) {-->
                        <!--this.userData.push({-->
                            <!--user_name: response.body.content[i].name,-->
                            <!--account: response.body.content[i].account,-->
                            <!--pwd: response.body.content[i].pwd,-->
                            <!--user_id:response.body.content[i].user_id-->
                        <!--});-->
                    <!--}-->
                <!--});-->
            <!--},-->

            <!--createUsers(){-->
                <!--this.$http.post(this.post_url,{name:this.user_name,account:this.account,pwd:this.pwd,token:this.token}).then(function (response) {-->
                    <!--console.log(JSON.stringify(response.body.random_result));-->
                    <!--if(response.body.random_result===1)-->
                    <!--{-->
                        <!--console.log("success create!");-->
                        <!--console.log(JSON.stringify(response.body.success));-->
                        <!--this.userData.push({-->
                            <!--user_name: this.user_name,-->
                            <!--account: this.account,-->
                            <!--pwd: this.pwd,-->
                            <!--user_id: response.body.success.user_id-->
                        <!--});-->
                        <!--this.user_name = '';-->
                        <!--this.account = '';   //添加数据后，添加文本框清空-->
                        <!--this.pwd = '';-->
                        <!--this.confirm_pwd = '';-->
                        <!--this.show_create = false;-->

                    <!--}else if (response.body.random_result===0)-->
                    <!--{-->
                        <!--console.log("fail create!");-->
                        <!--console.log(JSON.stringify(response.body.fail));-->
                    <!--}-->
                <!--},function(response){-->
                    <!--console.log("error create!")-->
                <!--});-->
            <!--},-->
            <!--open_dialog(){-->
                <!--this.show_create = true;-->
                <!--this.user_name="";-->
                <!--this.account="";-->
                <!--this.pwd="";-->
                <!--this.confirm_pwd="";-->
            <!--},-->
            <!--close_dialog() {-->
                <!--this.show_create = false;-->
            <!--},-->

            <!--//失去焦点判断输入是否合法-->
            <!--check_in(tag1,tag2,tag3,tag4){-->
                <!--let x = document.getElementById(tag1).value;//获取输入框id-->
                <!--let y = document.getElementById(tag2).value;-->
                <!--let z = document.getElementById(tag3).value;-->
                <!--//获取输入框value-->
                <!--//判断输入内容是否正确-->
                <!--if (x.match("^[a-zA-Z0-9_]{0,17}$")===null||y.match("^[a-zA-Z0-9_]{0,17}$")===null||z.match("^[a-zA-Z0-9_]{0,17}$")===null) {-->
                    <!--// console.log("good");-->
                    <!--document.getElementById(tag4).innerHTML = "输入1-8位英文、数字、下划线";-->
                <!--} else {-->
                    <!--document.getElementById(tag1).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--document.getElementById(tag2).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--document.getElementById(tag3).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--document.getElementById(tag4).innerHTML = "";-->
                <!--}-->
            <!--},-->

            <!--//重复输入密码确认-->
            <!--check_pwd(tag1,tag2,tag3){-->
                <!--let x=document.getElementById(tag1).value;-->
                <!--let y=document.getElementById(tag2).value;-->
                <!--if(y!=x&&y!=null){-->
                    <!--document.getElementById(tag3).innerHTML="两次输入密码不一致！"-->
                <!--}else{-->
                    <!--document.getElementById(tag2).placeholder = "重复密码";-->
                    <!--document.getElementById(tag3).innerHTML=""-->
                <!--}-->
            <!--},-->

            <!--//添加用户信息-->
            <!--add_msg(){-->
                <!--let x = document.getElementById("text1").value;-->
                <!--let y = document.getElementById("text2").value;-->
                <!--let z = document.getElementById("text3").value;-->
                <!--let m = document.getElementById("text4").value;-->
                <!--let n = true;-->
                <!--if (x === "" || y === "" || z === "" || m === "") {-->
                    <!--document.getElementById("tip3").innerHTML = "用户名、账号、密码等不能为空！"-->
                <!--} else {-->

                    <!--if (x.match("^[a-zA-Z0-9_]{0,17}$") === null || y.match("^[a-zA-Z0-9_]{0,17}$") === null || z.match("^[a-zA-Z0-9_]{0,17}$") === null) {-->
                        <!--// console.log("good");-->
                        <!--document.getElementById("tip1").innerHTML = "输入1-18位英文、数字、下划线";-->
                        <!--n = false;-->
                    <!--} else {-->
                        <!--document.getElementById("text1").placeholder = "输入1-18位英文、数字、下划线";-->
                        <!--document.getElementById("text2").placeholder = "输入1-18位英文、数字、下划线";-->
                        <!--document.getElementById("text3").placeholder = "输入1-18位英文、数字、下划线";-->
                        <!--document.getElementById("tip1").innerHTML = "";-->
                    <!--}-->

                    <!--if (m != z) {-->
                        <!--document.getElementById("tip2").innerHTML = "两次输入密码不一致！";-->
                        <!--n = false;-->
                    <!--} else {-->
                        <!--document.getElementById("text4").placeholder = "重复密码";-->
                        <!--document.getElementById("tip2").innerHTML = ""-->
                    <!--}-->
                    <!--if (n===true) {-->
                        <!--//空数组里添加数据用push,注意this的使用-->
                        <!--this.createUsers();-->
                    <!--}-->
                <!--}-->
            <!--},-->

            <!--//删除用户信息-->
            <!--deleteUsers(index){-->
                <!--this.$http.post(this.delete_url,{user_id:this.userData[index].user_id,token:this.token}).then(function(response){-->
                    <!--if(response.body.random_result===1){-->
                        <!--console.log(JSON.stringify(response.body.success));-->
                        <!--this.userData.splice(index, 1); //删除数组里的部分数据用splice-->
                    <!--}else if(response.body.random_result===0){-->
                        <!--console.log(JSON.stringify(response.body.success))-->
                    <!--}-->
                <!--})-->

            <!--},-->


            <!--//修改用户信息-->

            <!--open_chaDialog(index){-->
                <!--this.show_change=true;-->
                <!--this.back_index = index;-->
                <!--this.back_username =this. userData[index].user_name;-->
                <!--this.back_account = this.userData[index].account;-->
            <!--},-->
            <!--close_chaDialog(){-->
                <!--this.show_change=false;-->
                <!--this.back_username='';-->
                <!--this.back_account='';-->
                <!--this.pwd='';-->
                <!--this.confirm_pwd = '';-->
                <!--this.back_index='';-->
            <!--},-->

            <!--modifyUsers(){-->
                <!--this.$http.post(this.modify_url,{name:this.back_username,pwd:this.pwd,user_id:this.userData[this.back_index].user_id,token:this.token}).then(function(response){-->
                    <!--console.log(JSON.stringify(response.body.random_result));-->
                    <!--if(response.body.random_result===1){-->
                        <!--console.log("success modify!");-->
                        <!--console.log(JSON.stringify(response.body.success));-->
                        <!--this.userData.splice(this.back_index,1,{user_name:this.back_username,account:this.userData[this.back_index].account,pwd:this.pwd});-->
                        <!--this.-->
                            <!--this.show_change=false;-->
                        <!--this.back_account='';-->
                        <!--this.back_index='';-->
                        <!--this.confirm_pwd='';-->
                        <!--this.pwd='';-->
                        <!--this.back_username='';-->
                    <!--} else if(response.body.random_result===0){-->
                        <!--console.log("fail modify!");-->
                        <!--console.log(JSON.stringify(response.body.fail));-->
                    <!--}-->
                <!--},function(response){-->
                    <!--console.log("error modify!");-->
                <!--})-->
            <!--},-->

            <!--//确认修改的模态框显示隐藏-->
            <!--confirm_change(){-->
                <!--// let x=document.getElementById("chan1").value;-->
                <!--let y=document.getElementById("chan2").value;-->
                <!--let z=document.getElementById("chan3").value;-->
                <!--let m=document.getElementById("chan4").value;-->
                <!--let n = true;-->
                <!--if (z === "" || m === ""||y==="") {-->
                    <!--document.getElementById("tip6").innerHTML = "用户名、密码等不能为空！"-->
                <!--} else {-->
                    <!--if (z.match("^[a-zA-Z0-9_]{0,17}$") === null||y.match("^[a-zA-Z0-9_]{0,17}$")===null) {-->

                        <!--document.getElementById("tip4").innerHTML = "输入1-18位英文、数字、下划线";-->
                        <!--n = false;-->
                    <!--} else {-->
                        <!--// document.getElementById("chan1").placeholder = "输入1-8位英文、数字、下划线";-->
                        <!--// document.getElementById("chan2").placeholder = "输入1-8位英文、数字、下划线";-->
                        <!--document.getElementById("chan3").placeholder = "输入1-18位英文、数字、下划线";-->
                        <!--document.getElementById("tip4").innerHTML = "";-->
                    <!--}-->

                    <!--if (m != z) {-->
                        <!--document.getElementById("tip5").innerHTML = "两次输入密码不一致！";-->
                        <!--n = false;-->
                    <!--} else {-->
                        <!--document.getElementById("chan4").placeholder = "重复密码";-->
                        <!--document.getElementById("tip5").innerHTML = ""-->
                    <!--}-->
                    <!--if (n===true) {-->
                        <!--this.modifyUsers();-->
                    <!--}-->
                <!--}-->
            <!--}-->
            <!--/*page(){-->
             <!--/* let pageSize = 3;    //每页显示的记录条数-->
             <!--let curPage=0;        //当前页-->
             <!--let lastPage;        //最后页-->
             <!--let direct=0;        //方向-->
             <!--let len;            //总行数-->
             <!--let page;            //总页数-->
             <!--let begin;-->
             <!--let end;*/-->
            <!--/*  $(document).ready(function display() {-->
             <!--len = $("#table_all tr").length - 1;    // 求这个表的总行数，剔除第一行介绍-->
             <!--this.max_page = this.len % this.page_size === 0 ? this.len / this.page_size : Math.floor(this.len / this.page_size) + 1;//根据记录条数，计算页数-->
             <!--// alert("page==="+page);-->
             <!--this.page = 1;    // 设置当前为第一页-->
             <!--displayPage(1);//显示第一页-->

             <!--$("#pre_page").click(function frontPage() {-->
             <!--this.direct = -1;-->
             <!--displayPage();-->
             <!--alert("pre page");-->
             <!--});-->
             <!--$("#next_page").click(function nextPage(){-->
             <!--// 下一页-->
             <!--this.direct=1;-->
             <!--displayPage();-->
             <!--alert("next page");-->

             <!--});-->
             <!--function displayPage(){-->
             <!--if (this.page <= 1 && this.direct === -1) {-->
             <!--this.direct = 0;-->
             <!--alert("已经是第一页了");-->
             <!--return;-->
             <!--} else if (this.page >= this.max_page && this.direct === 1) {-->
             <!--this.direct = 0;-->
             <!--alert("已经是最后一页了");-->
             <!--return;-->
             <!--}-->

             <!--this.lastPage = this.page;-->

             <!--// 修复当len=1时，curPage计算得0的bug-->
             <!--if (this.len > this.page_size) {-->
             <!--this.page = ((this.page + this.direct + this.len) % this.len);-->
             <!--} else {-->
             <!--this.page = 1;-->
             <!--}-->
             <!--}-->
             <!--});*/-->


            <!--//document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";        // 显示当前多少页-->

            <!--//begin=(curPage-1)*pageSize + 1;// 起始记录号-->
            <!--//end = begin + 1*pageSize - 1;    // 末尾记录号-->


            <!--/* if(end > len ) end=len;-->
             <!--$("#mytable tr").hide();    // 首先，设置这行为隐藏-->
             <!--$("#mytable tr").each(function(i){    // 然后，通过条件判断决定本行是否恢复显示-->
             <!--if((i>=begin && i<=end) || i==0 )//显示begin<=x<=end的记录-->
             <!--$(this).show();-->
             <!--});*/-->
        <!--}-->
    <!--}-->
<!--</script>-->



<!--<style>-->
    <!--/*组件整个的div样式,整个居中显示*/-->
    <!--#table_container{-->
        <!--position: relative;-->
        <!--top: 200px;-->
        <!--bottom: 0;-->
        <!--left: 0;-->
        <!--right: 0;-->
        <!--margin:auto;-->
        <!--height:10%;-->
        <!--width: 52%;-->
    <!--}-->
    <!--/*管理用户表格样式*/-->
    <!--#table_all{-->
        <!--background-color: #f7e1b5; /*背景颜色*/-->
        <!--border-style: solid;      /*表格整体边框线条样式*/-->
        <!--border-color: sienna ;    /*表格边框颜色*/-->
        <!--border-collapse: collapse; /*内外边框重合*/-->
        <!--vertical-align: middle;   /*表格边框内容居中*/-->
        <!--width:800px;-->
        <!--height: 15px;/*表格宽度*/-->
        <!--table-layout:fixed ;      /*表格样式、长度固定*/-->

    <!--}-->

    <!--/*表格内部边框样式*/-->
    <!--.table_border{-->
        <!--padding: 5px;/*内容与边框的距离*/-->
        <!--border-style: solid;/*内边框线式*/-->
        <!--border-color: sienna ;/*内边框的颜色*/-->
        <!--text-align: center;/*内容居中*/-->
        <!--font-family: 楷体;-->
        <!--color: dimgrey;-->
        <!--font-size: 20px;-->

    <!--}-->

    <!--/*按钮样式*/-->
    <!--.btn_general{-->
        <!--background-color:sienna ;/*按钮填充颜色*/-->
        <!--color: #F2F2F2;/*按钮边框颜色*/-->
        <!--width:70px;/*按钮与表格下底的宽度*/-->
        <!--height: 28px;-->
        <!--border-radius: 8px;-->
        <!--border-color: transparent;-->
    <!--}-->

    <!--/*用户管理字与图片*/-->
    <!--#user_text{-->
        <!--text-align: left;-->
    <!--}-->

    <!--img{-->
        <!--width: 3%;-->
        <!--height: 3%;-->
    <!--}-->
    <!--.span_user{-->
        <!--font-family: 楷体;-->
        <!--font-size: 20px;-->
        <!--font-weight: bold;-->
        <!--color: dimgrey;-->
    <!--}-->

    <!--#create_user{-->
        <!--margin-top: 1%;-->
        <!--margin-bottom: 1%;-->
    <!--}-->

    <!--.dialog {-->
        <!--width: 480px;-->
        <!--position: fixed;-->
        <!--left: 50%;-->
        <!--top: 6em;-->
        <!--transform: translateX(-50%);-->
        <!--z-index: 2000;-->
        <!--visibility: hidden;-->
        <!--backface-visibility: hidden;-->
        <!--perspective: 1300px;-->
    <!--}-->

    <!--.dialog-active{-->
        <!--visibility: visible;-->
    <!--}-->

    <!--.dialog-active .dialog-content {-->
        <!--position: relative;-->
        <!--opacity: 1;-->
        <!--transform: rotateY(0);-->
    <!--}-->

    <!--.dialog-active ~ .dialog-overlay {-->
        <!--opacity: 1;-->
        <!--visibility: visible;-->
    <!--}-->

    <!--.dialog-content {-->
        <!--border-radius: 2px;-->
        <!--background: #fff;-->
        <!--overflow: hidden;-->
        <!--box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);-->
        <!--transition: .5s ease-in-out;-->
        <!--opacity: 0;-->
        <!--transform-style: preserve-3d;-->
        <!--transform: rotateY(-70deg);-->
    <!--}-->

    <!--.dialog-header {-->
        <!--background: #fff;-->
        <!--margin-top: 3%;-->
    <!--}-->

    <!--.dialog-title {-->
        <!--color: dimgrey;-->
        <!--font-family: 楷体;-->
        <!--margin-left: 35%;-->
        <!--margin-right: 33%;-->
        <!--font-size: 25px;-->
        <!--text-align: center;-->
        <!--font-weight: 200;-->
        <!--line-height: 1em;-->

    <!--}-->

    <!--.dialog-body {-->
        <!--padding: 2em;-->
    <!--}-->

    <!--.dialog-footer {-->

        <!--padding: 3% 0;-->
        <!--text-align: center;-->
        <!--border-top: 1px solid rgba(0, 0, 0, 0.1);-->
    <!--}-->

    <!--.dialog-overlay {-->
        <!--content: "";-->
        <!--position: fixed;-->
        <!--visibility: hidden;-->
        <!--top: 0;-->
        <!--left: 0;-->
        <!--right: 0;-->
        <!--bottom: 0;-->
        <!--z-index: 1000;-->
        <!--opacity: 0;-->
        <!--background: rgba(0, 0, 0, 0.5);-->
        <!--transition: all .6s;-->
    <!--}-->

    <!--.close {-->
        <!--display: inline-block;-->
        <!--width: 2rem;-->
        <!--height: 2rem;-->
        <!--position: absolute;-->
        <!--top: .5rem;-->
        <!--right: .5rem;-->
        <!--transition: .8s ease all;-->
        <!-- -moz-transition: .8s ease all;-->
        <!-- -webkit-transition: .8s ease all;-->
        <!--border: none;-->
        <!--border-radius: 3px;-->
        <!--color: #333;-->
        <!--text-decoration: none;-->
        <!--box-sizing: border-box;-->
        <!-- -webkit-box-sizing: border-box;-->
    <!--}-->

    <!--.close:hover {-->
        <!--transition: .8s ease all;-->
        <!-- -moz-transition: .8s ease all;-->
        <!-- -webkit-transition: .8s ease all;-->
    <!--}-->

    <!--.close .iconfont {-->
        <!--font-size: 2rem;-->
        <!--color: black;-->
    <!--}-->

    <!--.rotate {-->
        <!--cursor: pointer;-->
    <!--}-->

    <!--.rotate:hover {-->
        <!--transition: transform 1.0s ease;-->
        <!-- -moz-transition: -moz-transform 1.0s ease;-->
        <!-- -webkit-transition: -webkit-transform 1.0s ease ;-->
    <!--}-->

    <!--.close .iconfont {-->
        <!--font-size: 2rem;-->
        <!--color: black;-->
    <!--}-->

    <!--.iconfont {-->
        <!--font-size: 33px;-->
        <!--font-style: normal;-->
        <!--margin-top: -0.8%;-->
        <!-- -webkit-font-smoothing: antialiased;-->
        <!-- -webkit-text-stroke-width: 0.2px;-->
        <!-- -moz-osx-font-smoothing: grayscale;-->
    <!--}-->
    <!--.span_motal_1{-->
        <!--font-family: 楷体;-->
        <!--font-size: 20px;-->
        <!--font-weight: bold;-->
        <!--color: dimgrey;-->

        <!--text-align:left;-->
        <!--margin-left: 10%;-->
    <!--}-->
    <!--.span_motal_2{-->
        <!--font-family: 楷体;-->
        <!--font-size: 20px;-->
        <!--font-weight: bold;-->
        <!--color: dimgrey;-->
        <!--left:34%;-->
        <!--position:fixed;-->
    <!--}-->
    <!--.input_motal{-->
        <!--width: 45%;-->
        <!--right: 15%;-->
        <!--position:fixed;-->
        <!--text-align: center;-->
    <!--}-->
    <!--.warning{-->
        <!--color: #ff0000;-->
        <!--font-size: 18px;-->
        <!--text-align:center;-->
        <!--font-family: 楷体;-->
    <!--}-->
    <!--.warning_text{-->
        <!--margin-bottom: 2%;-->
        <!--margin-top: 1%;-->
    <!--}-->
    <!--.input_pwd{-->
        <!--background: transparent;-->
        <!--border-top: 0px;-->
        <!--border-bottom: 0px;-->
        <!--border-right: 0px;-->
        <!--border-left: 0px;-->
        <!--text-align: center;-->
    <!--}-->
    <!--.btn_pages{-->
        <!--background-color:transparent ;/*按钮填充颜色*/-->
        <!--color: darkgrey;/*按钮边框颜色*/-->
        <!--width:70px;/*按钮与表格下底的宽度*/-->
        <!--height: 28px;-->
        <!--border-radius: 8px;-->
        <!--border-color: darkgrey;-->
        <!--font-family: 楷体;-->
        <!--font-size: 15px;-->
        <!--border: solid;-->
        <!--position: absolute;-->
    <!--}-->
    <!--.box_pages1{-->
        <!--margin-left: 38%;-->

    <!--}-->
    <!--.box_pages2{-->
        <!--margin-left: 46%;-->

    <!--}-->
    <!--.box_pages3{-->
        <!--margin-left: 54%;-->
    <!--}-->
    <!--.box_pages{-->
        <!--margin-top: 5%;-->
    <!--}-->
<!--</style>-->
