
<!--&lt;!&ndash;定义组件&ndash;&gt;-->
<!--<template >-->
    <!--<div id="user_box">-->

        <!--&lt;!&ndash;正中间组件&ndash;&gt;-->
        <!--<div id="table_container">-->

            <!--&lt;!&ndash;管理用户文字图片&ndash;&gt;-->
            <!--<div id="user_text">-->
                <!--<img class="image" src="src/assets/img/毛笔.png" height="50" width="50"/>-->
                <!--<span class="span_user">管理用户</span>-->
            <!--</div>-->

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
                               <!--<input type="password" class="input_pwd" value="********" readonly>-->

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
                            <!--<input type="text"  id="text1" class="input_motal" placeholder="输入2-10位中文、英文、数字" onfocus="this.placeholder=''" @blur="checkIn('text1','输入2-10位中文、英文、数字','[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$',isActive1=true)"  v-model="user_name" v-bind:class="{warnBorder:isActive1}">-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">账号</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="text"  id="text2" class="input_motal"  placeholder="输入8-10位数字、英文" onfocus="this.placeholder=''" @blur="checkIn('text2','输入8-10位数字、英文','[a-zA-Z0-9]{8,10}$',isActive2=true)" v-model="account" v-bind:class="{warnBorder:isActive2}">-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password"  id="text3" class="input_motal" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="checkIn('text3','输入6-16位数字、英文','[a-zA-Z0-9_]{6,16}$',isActive3=true)" v-model="pwd" v-bind:class="{warnBorder:isActive3}">-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">重复密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password" id="text4" class="input_motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="check_pwd('text3','text4',isActive4=true)" v-model="confirm_pwd" v-bind:class="{warnBorder:isActive4}">-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<footer class="dialog-footer" >-->
                        <!--&lt;!&ndash;提示信息&ndash;&gt;-->
                        <!--<p  class="warn_tip" v-model="tip">{{tip}}</p>-->
                        <!--&lt;!&ndash;按钮&ndash;&gt;-->
                        <!--<div>-->
                            <!--<button class="btn_general" style="margin-right: 10%" @click="close_dialog()">取消</button>-->
                            <!--<button class="btn_general "  @click="add_msg()">创建</button>-->
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
                            <!--<input type="text"  id="chan2" class="input_motal" v-model="back_username" @blur="checkIn('chan2','输入2-10位中文、英文、数字','[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$',isActive1=true)" v-bind:class="{warnBorder:isActive1}">-->
                        <!--</p >-->

                        <!--<p >-->
                            <!--<span class="span_motal_1">新密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password"  id="chan3" class="input_motal" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="checkIn('chan3','输入6-16位数字、英文','[a-zA-Z0-9_]{6,16}$',isActive3=true)" v-model="pwd"  v-bind:class="{warnBorder:isActive3}" >-->
                        <!--</p>-->

                        <!--<p>-->
                            <!--<span class="span_motal_1">重复密码</span>-->
                            <!--<span class="span_motal_2">:</span>-->
                            <!--<input type="password" id="chan4" class="input_motal" placeholder="重复密码" onfocus="this.placeholder=''" @blur="check_pwd('chan3','chan4',isActive4=true)" v-model="confirm_pwd" v-bind:class="{warnBorder:isActive4}">-->
                        <!--</p>-->
                    <!--</div>-->

                    <!--<footer class="dialog-footer" slot="footer">-->
                        <!--&lt;!&ndash;提示信息&ndash;&gt;-->
                        <!--<span class="warn_tip" v-model="tip">{{tip}}</span>-->
                        <!--<div>-->
                            <!--<button class="btn_general" style="margin-right: 10%" @click="close_chaDialog()">取消</button>-->
                            <!--<button class="btn_general" @click="confirm_change()">修改</button>-->
                        <!--</div>-->
                    <!--</footer>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;翻页键&ndash;&gt;-->
        <!--<div class="page-box">-->
            <!--<input class="btn_pages" style="margin-left: 0;" value="上一页" @click="pre_page()">-->
            <!--<span class="btn-pages" v-model="page;max_page">{{page}}/{{max_page}}</span>-->
            <!--<input class="btn_pages" style="margin-right: 0;" value="下一页" @click="next_page()">-->
        <!--</div>-->


    <!--</div>-->
<!--</template>-->


<!--<script type="text/javascript">-->
    <!--export default{-->
        <!--data(){-->
            <!--return {-->
                <!--show_create: false,-->
                <!--show_change: false,-->

                <!--tip: '',//创建用户的错误提示-->
                <!--isActive1:'', //绑定css属性，判断对错分别显示错误输入框-->
                <!--isActive2:false,-->
                <!--isActive3:false,-->
                <!--isActive4:false,-->
                <!--add_if:true,//判断是否执行创建/修改请求-->

                <!--userData: [],-->
                <!--user_name: '',-->
                <!--account: '',-->
                <!--pwd: '',-->
                <!--confirm_pwd: '',-->
                <!--back_index: '',-->
                <!--back_username: '',-->
                <!--back_account: '',-->
                <!--token_url: '/ancient_books/getToken.action',//获取token-->
                <!--token: '',                              //-->
                <!--get_url: '/ancient_books/get_user_list.action',//显示用户列表-->
                <!--post_url: '/ancient_books/add_user.action',//创建普通用户-->
                <!--modify_url: '/ancient_books/modify_user.action',//修改用户-->
                <!--delete_url: '/ancient_books/delete_user_by_id.action',//删除用户-->

                <!--page: 0,//当前页面-->
                <!--max_page: '',//总页数-->
                <!--info_total: 0,  //当前总条数-->
                <!--info_num: 20,//每页最多纪录数-->

                <!--get_user: {},//显示用户数据对象-->
                <!--post_user:{},//创建用户数据对象-->
                <!--delete_user:{},//删除用户数据对象-->
                <!--modify_user:{}//修改数据对象-->
            <!--}-->
        <!--},-->
        <!--mounted: function () {-->
            <!--this.getUsers(1);-->
        <!--},-->

        <!--methods: {-->
            <!--//显示用户列表 get数据-->
            <!--success_getUsers(response){-->
                <!--console.log(JSON.stringify(response.body, null, 4));-->
                <!--console.log("success get users ");-->
                <!--//将后端数据显示在前端页面里-->
                <!--this.max_page = response.body.max_page;-->
                <!--for (let i = 0; i <= 19; i++) {-->
                    <!--this.userData.push({-->
                        <!--user_name: response.body.content[i].name,-->
                        <!--account: response.body.content[i].account,-->
                        <!--user_id: response.body.content[i].user_id-->
                    <!--});-->
                <!--}-->
            <!--},-->

            <!--fail_getUsers(){-->
                <!--console.log("fail get users!");-->
            <!--},-->

            <!--getUsers(page){-->
                <!--this.get_user.page = page;-->
                <!--this.HttpGet(this.get_url, this.get_user, this.success_getUsers(response), this.fail_getUsers());-->
            <!--},-->

            <!--//获取用户显示信息-->
            <!--/*this.$http.get(this.get_url, [page]).then(function (response) {-->
                        <!--console.log(JSON.stringify(response.body, null, 4));-->
                        <!--console.log("success get users ");-->
                        <!--//将后端数据显示在前端页面里-->
                        <!--this.max_page = response.body.max_page;-->
                        <!--for (let i = 1; i <= 20; i++) {-->
                            <!--this.userData.push({-->
                                <!--user_name: response.body.content[i].name,-->
                                <!--account: response.body.content[i].account,-->
                                <!--user_id: response.body.content[i].user_id-->
                            <!--});-->
                        <!--}-->
                    <!--},function () {-->
                        <!--console.log("fail get users!");-->
                    <!--})-->
            <!--},*/-->

            <!--//创建用户 post用户数据-->
            <!--success_postUsers(response){-->
                <!--if(response.body.result===1)-->
                <!--{-->
                    <!--console.log(JSON.stringify(response.body));-->
                    <!--console.log("success create!");-->
                    <!--this.userData.push({-->
                        <!--user_name: this.user_name,-->
                        <!--account: this.account,-->
                        <!--pwd: this.pwd,-->
                        <!--user_id: response.body.user_id-->
                    <!--});-->
                    <!--this.info_total=this.userData.length;-->
                    <!--this.page=(this.info_total+ this.info_num-1)/this.info_num;-->
                    <!--this.getUsers(this.page);  //发送get请求刷新用户列表-->
                <!--}else if (response.body.result===0) {-->
                    <!--console.log(JSON.stringify(response.body));-->
                    <!--console.log("fail create!");-->
                <!--}-->
                <!--this.user_name = '';-->
                <!--this.account = '';   //添加数据后，添加文本框清空-->
                <!--this.pwd = '';-->
                <!--this.confirm_pwd = '';-->
                <!--this.show_create = false;-->
            <!--},-->

            <!--fail_postUsers(){-->
                <!--console.log("error create!");-->
            <!--},-->

            <!--createUsers(){-->
                <!--this.post_user.name=this.name;-->
                <!--this.post_user.account=this.account;-->
                <!--this.post_user.pwd=this.pwd;-->
                <!--this.HttpPost(this.post_url,this.post_user,this.success_postUsers(response),this.fail_postUsers());-->
            <!--},-->

            <!--/*createUsers(){-->
                    <!--this.$http.post(this.post_url,{name:this.user_name,account:this.account,pwd:this.pwd,token:this.token}).then(function (response) {-->
                        <!--if(response.body.result===1)-->
                        <!--{-->
                            <!--console.log(JSON.stringify(response.body));-->
                            <!--console.log(-->
                                <!--"success create!");-->
                            <!--this.userData.push({-->
                                <!--user_name: this-->
                                    <!--.user_name, account: this.account,-->
                                <!--pwd: this.pwd,-->
                                <!--user_id: response.body.user_id-->
                        <!--});-->
                            <!--this.info_total++;-->
                        <!--}else if (-->
                            <!--response.body.result===0) {-->
                            <!--console.log(JSON.stringify(response.body));-->
                            <!--console.log("fail create!");-->
                        <!--}-->
                    <!--},function (){-->
                      <!--console.log("error create!")-->
                    <!--});-->
            <!--},*/-->

            <!--open_dialog(){-->
                <!--this.show_create = true;-->
                <!--this.user_name="";-->
                <!--this.account="";-->
                <!--this.pwd="";-->
                <!--this.confirm_pwd="";-->
                <!--this.tip="";-->
                <!--this.isActive=false;-->
            <!--},-->
            <!--close_dialog() {-->
                <!--this.show_create = false;-->
            <!--},-->

            <!--//失去焦点判断输入是否合法-->
            <!--checkIn(tag1,placeholder_text,juge_text,style){-->
                <!--let x=document.getElementById(tag1).value;-->
                <!--if(x!==""){-->
                    <!--if(x.match(juge_text)){-->
                        <!--this.tip="";-->
                        <!--document.getElementById(tag1).placeholder =placeholder_text;-->
                        <!--this.isActive1=false;-->
                        <!--this.isActive2=false;-->
                        <!--this.isActive3=false;-->
                    <!--}else{-->
                        <!--this.tip=placeholder_text;-->
                        <!--document.getElementById(tag1).placeholder = placeholder_text;-->
                        <!--this.add_if=false;-->
                        <!--return style;-->
                    <!--}-->
                <!--}else{-->
                    <!--document.getElementById(tag1).placeholder =placeholder_text;-->
                    <!--this.isActive1=false;-->
                    <!--this.isActive2=false;-->
                    <!--this.isActive3=false;-->
                <!--}-->
            <!--},-->
          <!--/*  check_in(tag1,tag2,tag3,tag4){-->
                <!--//判断输入内容是否正确-->
               <!--let x = document.getElementById(tag1).value;//获取输入框id-->
               <!--let y = document.getElementById(tag2).value;-->
               <!--let z = document.getElementById(tag3).value;-->
              <!--//获取输入框value-->
              <!--//判断输入内容是否正确-->
              <!--if (x.match("^[a-zA-Z0-9_]{0,17}$")===null||y.match("^[a-zA-Z0-9_]{0,17}$")===null||z.match("^[a-zA-Z0-9_]{0,17}$")===null) {-->
             <!--// console.log("good");-->
              <!--document.getElementById(tag4).innerHTML = "输入1-8位英文、数字、下划线";-->
              <!--document.getElementById(tag1).placeholder = "输入1-8位英文、数字、下划线";-->
              <!--document.getElementById(tag2).placeholder = "输入1-8位英文、数字、下划线";-->
              <!--document.getElementById(tag3).placeholder = "输入1-8位英文、数字、下划线";-->
           <!--}else {-->
                    <!--document.getElementById(tag1).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--document.getElementById(tag2).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--document.getElementById(tag3).placeholder = "输入1-8位英文、数字、下划线";-->
                    <!--this.tip1= "";-->
                <!--}-->
            <!--},*/-->

            <!--//重复输入密码确认-->
            <!--check_pwd(tag1,tag2,style){-->
                <!--let x=document.getElementById(tag1).value;-->
                <!--let y=document.getElementById(tag2).value;-->
                <!--if(y!==""){-->
                    <!--if(y!==x){-->
                        <!--this.tip="输入密码不一致！";-->
                        <!--document.getElementById(tag2).placeholder = "重复密码";-->
                        <!--this.add_if=false;-->
                        <!--this.isActive4=false;-->
                    <!--}else{-->
                        <!--style=false;-->
                        <!--this.tip="";-->
                        <!--document.getElementById(tag2).placeholder = "重复密码";-->
                        <!--return style;-->
                    <!--}-->
                <!--}else{-->
                    <!--document.getElementById(tag2).placeholder = "重复密码";-->
                    <!--this.isActive4=false;-->
                <!--}-->
            <!--},-->

            <!--//添加用户信息-->
            <!--add_msg(){-->
                <!--let x = document.getElementById("text1").value;-->
                <!--let y = document.getElementById("text2").value;-->
                <!--let z = document.getElementById("text3").value;-->
                <!--let m = document.getElementById("text4").value;-->
                <!--if (x === "" || y === "" || z === "" || m === "") {-->
                   <!--this.tip = "用户名、账号、密码等不能为空！"-->
                <!--} else {-->
                    <!--this.checkIn('text1','输入2-10位中文、英文、数字','[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$',isActive1);-->
                    <!--this.checkIn('text2','输入8-10位数字、英文','[a-zA-Z0-9]{8,10}$',isActive2);-->
                    <!--this.checkIn('text3','输入6-16位数字、英文','[a-zA-Z0-9_]{6,16}$',isActive3);-->
                    <!--this.check_pwd('text3','text4',isActive4);-->
                    <!--if (this.add_if===true) {-->
                        <!--//空数组里添加数据用push,注意this的使用-->
                        <!--this.createUsers();-->
                    <!--}-->
                <!--}-->
            <!--},-->

            <!--//删除用户信息-->
            <!--success_delete(response){-->
                <!--if (response.body.result === 1) {-->
                    <!--console.log(JSON.stringify(response.body));-->
                    <!--console.log("success delete");-->
                    <!--this.userData.splice(index, 1);-->
                    <!--//删除数组里的部分数据用splice-->
                <!--} else if (response.body.result === 0) {-->
                    <!--console.log(JSON.stringify(response.body));console.log("fail delete");-->
                <!--}-->
            <!--},-->

            <!--fail_delete(){-->
                <!--console.log("error delete");-->
            <!--},-->

            <!--deleteUsers(index){-->
                <!--this.delete_user.user_id=this.userData[index].user_id;-->
                <!--this.HttpPost(this.delete_url,this.delete_user,success_delete(response),fail_delete());-->
            <!--},-->

          <!--/*  deleteUsers(index){-->
                    <!--this.$http.post(this.delete_url, {user_id: this.userData[index].user_id, token: this.token}).then(function (response) {-->
                        <!--if (response.body.result === 1) {-->
                            <!--console.log(JSON.stringify(response.body));-->
                            <!--console.log("success delete");-->
                            <!--this.userData.splice(index, 1);-->
                            <!--//删除数组里的部分数据用splice-->
                        <!--} else if (response.body.result === 0) {-->
                            <!--console.log(JSON.stringify(response.body));console.log("fail delete");-->
                        <!--}-->
                    <!--},function(){-->
                        <!--console.log("error delete");-->
                    <!--})-->
            <!--},*/-->


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

            <!--success_modify(response){-->
                <!--if(response.body.result===1){-->
                    <!--console.log(JSON.stringify(response.body));-->
                    <!--console.log("success modify!");-->
                    <!--this.userData.splice(this.back_index,1,{user_name:this.back_username,account:this.userData[this.back_index].account,pwd:this.pwd});-->
                <!--} else if(response.body.result===0){-->
                    <!--console.log("fail modify!");-->
                    <!--console.log(JSON.stringify(response.body));-->
                <!--}-->
                <!--this.show_change= false;-->
                <!--this.back_account='';-->
                <!--this.back_index='';-->
                <!--this.confirm_pwd='';-->
                <!--this.pwd='';-->
                <!--this.back_username='';-->
            <!--},-->

            <!--fail_modify(){-->
                <!--console.log("error modify!");-->
            <!--},-->

            <!--modifyUsers(){-->
                <!--this.modify_user.name=this.back_username;-->
                <!--this.modify_user.pwd=this.pwd;-->
                <!--this.modify_user.user_id=this.userData[this.back_index].user_id;-->
                <!--this.HttpPost(this.modify_url,this.modify_user,success_modify(response),fail_modify());-->
            <!--},-->
           <!--/* modifyUsers(){-->
                <!--this.$http.post(this.modify_url,{name:this.back_username,pwd:this.pwd,user_id:this.userData[this.back_index].user_id,token:this.token}).then(-->
                    <!--function(response){-->
                    <!--if(response.body.result===1){-->
                        <!--console.log(JSON.stringify(response.body));-->
                        <!--console.log("success modify!");-->
                        <!--this.userData.splice(this.back_index,1,{user_name:this.back_username,account:this.userData[this.back_index].account,pwd:this.pwd});-->
                        <!--this.show_change= false;-->
                        <!--this.back_account='';-->
                        <!--this.back_index='';-->
                        <!--this.confirm_pwd='';-->
                        <!--this.pwd='';-->
                        <!--this.back_username='';-->
                    <!--} else if(response.body.result===0){-->
                        <!--console.log("fail modify!");-->
                        <!--console.log(JSON.stringify(response.body));-->
                    <!--}-->
                <!--},function(){-->
                    <!--console.log("error modify!");-->
                <!--})-->
            <!--},*/ //确认修改的模态框显示隐藏-->

            <!--confirm_change(){-->
                <!--let x=document.getElementById("chan2").value;-->
                <!--let y=document.getElementById("chan3").value;-->
                <!--let z=document.getElementById("chan4").value;-->
                <!--if (x === "" || y === "" || z === "" || m === "") {-->
                    <!--this.tip = "用户名、账号、密码等不能为空！"-->
                <!--} else {-->
                    <!--this.checkIn('chan2','输入2-10位中文、英文、数字','[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$',isActive1);-->
                    <!--this.checkIn('chan3','输入6-16位数字、英文','[a-zA-Z0-9_]{6,16}$',isActive3);-->
                    <!--this.check_pwd('chan3','chan4',isActive4);-->
                    <!--if (this.add_if===true) {-->
                       <!--this.modifyUsers();-->
                    <!--}-->
                <!--}-->
            <!--},-->

            <!--pre_page(){-->
                <!--if(this.page!==1){-->
                    <!--this.getUsers(this,page++);-->
                <!--}-->
            <!--},-->

            <!--next_page(){-->
                <!--if(this.page<this.max_page&&this.page>=1){-->
                    <!--this.getUsers(this.page&#45;&#45;);-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--}-->

<!--</script>-->



<!--<style>-->
    <!--/*组件整个的div样式,整个居中显示*/-->
    <!--#table_container{-->
        <!--/*position: relative;*/-->
        <!--top: 40px;-->
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
        <!--width:70px;-->
        <!--height: 28px;-->
        <!--border-radius: 8px;-->
        <!--border-color: transparent;-->
    <!--}-->

    <!--/*用户管理字与图片*/-->
    <!--#user_text{-->
        <!--text-align: left;-->
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
        <!--/*position:fixed;*/-->
        <!--margin-left: 5%;-->
        <!--margin-right: 5%;-->
    <!--}-->
    <!--.input_motal{-->
        <!--width: 45%;-->
        <!--right: 15%;-->
        <!--position:fixed;-->
        <!--text-align: center;-->
    <!--}-->
    <!--.warn_tip{-->
        <!--color: #ff0000;-->
        <!--font-size: 18px;-->
        <!--text-align:center;-->
        <!--font-family: 楷体;-->
    <!--}-->

    <!--.warnBorder {-->
       <!--border: 2px solid red;-->
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
       <!--/* position: absolute;*/-->
    <!--}-->
    <!--.page-box{-->
        <!--text-align: center;-->
        <!--padding: 1em 0;-->
        <!--padding-top: 3em;-->
        <!--padding-right: 0px;-->
        <!--padding-bottom: 1em;-->
        <!--padding-left: 0px;-->
        <!--clear: both;-->
    <!--}-->


<!--</style>-->

