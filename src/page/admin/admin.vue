<!--定义组件-->
<template>
    <div>

        <noumenon_title class="zxw-admin-title" :title="this.title">
            <div slot="children" class="zxwbtn-margin">
                <button slot="children" class="zxwnoumenom-button zxwnoumenom-button-margin"  @click="downback()">注销</button>
                <button slot="children" class="zxwnoumenom-button zxwnoumenom-button-margin"  @click="open_dialog()">创建用户</button>
            </div>
        </noumenon_title>

        <!--用户信息表格-->
        <table class="table table-bordered zxw-table-box">
                <thead>
                <tr>
                    <th>用户名</th>
                    <th >账号</th>
                    <th>创建时间</th>
                    <th></th>
                </tr>
                </thead>

            <tbody>
                <tr v-for="(item,index) in user_data"> <!--v-for循环数据里的数组数据-->
                    <td>{{item.user_name }}</td>
                    <td>{{item.account}}</td>
                    <td>{{item.time}}</td>
                    <td>
                        <img src="../../assets/img/admin-icon/change-icon.png" width="20px" height="20px">
                        <button class="zxw-btn-general" @click="open_motal(index)">修改</button>
                        <img src="../../assets/img/admin-icon/delete-icon.png" width="18px" height="18px">
                        <button class="zxw-btn-general"  @click="delete_users(index)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <modal :show_modal="this.show_create" v-on:fireclose="close_dialog()">
            <div slot="header" class="zxw-time-header">
                <span>创建用户</span>
            </div>

            <div slot="body" class="zxw-modal-body">
                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">账号：</label>
                    <input type="text" id="text2" class="zxw-input-text" placeholder="输入8-10位数字、英文" onfocus="this.placeholder=''" @blur="if_account('text2')" v-model="account" v-bind:class="{warnBorder:this.is_active[1]}">
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">用户名：</label>
                    <input type="text" id="text1" class="zxw-input-text" placeholder="输入2-10位中文、英文、数字" onfocus="this.placeholder=''" @blur="if_name('text1')"  v-model="user_name" v-bind:class="{warnBorder:this.is_active[0]}" >
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">密码：</label>
                    <input type="password" id="text3" class="zxw-input-text" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="if_pwd('text3')" v-model="pwd" v-bind:class="{warnBorder:this.is_active[2]}">
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">重复密码：</label>
                    <input type="password" id="text4" class="zxw-input-text" placeholder="重复密码" onfocus="this.placeholder=''" @blur="dup_pwd('text3','text4')" v-model="confirm_pwd" v-bind:class="{warnBorder:this.is_active[3]}" >
                </div>
            </div>

            <div slot="footer" class="zxw-modal-footer">
                <p  class="warn-tip" v-model="tip">{{tip}}</p>
                <div class="zxw-admin-modal-footerbtn">
                    <button class="zxw-prebtn zxw-modal-btn-margin"  @click="close_dialog()" tabindex="-1">取消</button>
                    <button class="zxw-nextbtn zxw-modal-btn-margin" @click="add_msg()" :disabled="add_if">创建</button>
                </div>

            </div>
        </modal>


        <modal :show_modal="this.show_change" v-on:fireclose="close_motal()">
            <div slot="header" class="zxw-time-header">
                <span>编辑用户</span>
            </div>

            <div slot="body" class="zxw-modal-body">
                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">账号：</label>
                    <input type="text" name="user_name" id="chan1" class="zxw-input-account" v-model="back_account" readonly  tabindex="-1">
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">用户名：</label>
                    <input type="text"  id="chan2" class="zxw-input-text" v-model="back_username"  @change="if_name('chan2')" v-bind:class="{warnBorder:this.is_active[0]}">
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">新密码：</label>
                    <input type="password"  id="chan3" class="zxw-input-text" placeholder="输入6-16位数字、英文"  onfocus="this.placeholder=''" @blur="if_pwd('chan3')" v-model="pwd"  v-bind:class="{warnBorder:this.is_active[2]}" >
                </div>

                <div class="zxw-modal-margin">
                    <label class="zxw-modal-label">重复密码：</label>
                    <input type="password" id="chan4" class="zxw-input-text" placeholder="重复密码" onfocus="this.placeholder=''" @blur="dup_pwd('chan3','chan4')" v-model="confirm_pwd" v-bind:class="{warnBorder:this.is_active[3]}">
                </div>
            </div>

            <div slot="footer" class="zxw-modal-footer">
                <p  class="warn-tip" v-model="tip">{{tip}}</p>
                <div class="zxw-admin-modal-footerbtn">
                    <button class="zxw-prebtn zxw-modal-btn-margin"  @click="close_motal()" tabindex="-1">取消</button>
                    <button class="zxw-nextbtn zxw-modal-btn-margin" @click="confirm_change()" :disabled="add_if">修改</button>
                </div>

            </div>
        </modal>

        <!--翻页组件-->
        <paginator :max=this.max_page></paginator>

    </div>
</template>


<script type="text/javascript">
    /*let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_user_list.action?page=1','get',{
        "status|200":200,
        "content|3":[{
            'user_id|1-100':100,
            'name':'@FIRST',
            'account|10000000-1000000000':100000000,
            'time':'@DATETIME("yyyy-MM-dd HH:mm:ss")'
        }],
        'max_page|1-100':100
    });

    Mock.mock('/ancient_books/get_user_list.action?page=2','get',{
        "status|200":200,
        "content|3":[{
            'user_id|1-100':100,
            'name':'@FIRST',
            'account|10000000-1000000000':100000000,
            'time':'@DATETIME("yyyy-MM-dd HH:mm:ss")'
        }],
        'max_page|1-100':100
    });*/

    import paginator from "../../component/paginator.vue";
    import noumenon_title from "../../component/noumenon-title.vue";
    import modal from "../../component/modal.vue";
    export default{
        watch: {
            $route(){
                this.get_users();
            }
        },

        components: {
            paginator,
            noumenon_title,
            modal
        },
        data(){
            return {
                title: '用户管理',
                show_create: false,
                show_change: false,

                tip: '',    //创建用户的错误提示
                is_active: [false, false, false, false],    //错误提示显示红色框
                add_if: true,    //判断是否执行 创建/修改 请求
                check_n: true,   //判断用户名是否重复
                check_a: false,   //判断账号是否重复

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
                name_url: '/ancient_books/check_name.action',    //用户名重复
                account_url: '/ancient_books/check_account.action',    //账号重复

                page: 1,//当前页面
                max_page: 3,//总页数
                router_name: 'admin',

                get_user: {},//显示用户数据对象
                add_user: {},//创建用户数据对象
                delete_user: {},//删除用户数据对象
                modify_user: {},//修改数据对象
                cheif_name: {}, //检查用户名是否重复
                cheif_account: {} //检查账号是否重复
            }
        },

        created: function () {
            this.get_users();
        },

        methods: {
            //创建用户的模态框 系列函数
            open_dialog(){
                this.show_create = true;
            },

            close_dialog() {
                this.show_create = false;
                this.user_name = "";
                this.account = "";
                this.pwd = "";
                this.confirm_pwd = "";
                this.tip = "";
                this.is_active[0] = false;
                this.is_active[1] = false;
                this.is_active[2] = false;
                this.is_active[3] = false;
            },

            // get数据显示用户列表 成功地回调函数
            success_get(response){
                console.log("success get users ");
                this.max_page = response.body.max_page;
                for (let i = 0; i < response.body.content.length; i++) {
                    this.user_data.push({
                        user_name: response.body.content[i].name,
                        account: response.body.content[i].account,
                        time: response.body.content[i].time,
                        user_id: response.body.content[i].user_id
                    });
                }
            },

            fail_get(response){
                console.log("没有返回数组！");
            },

            //向后端发起请求获取用户数据列表，显示在前端页面
            get_users(){
                this.get_user.value = '?page=' + this.$route.params.pageId;
                let new_url = this.get_url + this.get_user.value;
                this.clean_data();
                this.http_json(new_url, 'get', this.get_user, this.success_get, this.fail_get);
            },

            //创建用户 post用户数据 success回调函数
            success_add(response){
                console.log("success create!");
                this.clean_data();
                this.get_users();
                this.close_dialog(); //关闭创建用户的模态框
            },

            fail_add(response){
                console.log("fail create!");
            },

            //添加用户post请求数据的赋值
            create_users(){
                //将用户信息放进请求对象里
                this.add_user.name = this.user_name;
                this.add_user.account = this.account;
                this.add_user.pwd = this.pwd;
                this.http_json(this.add_url, 'post', this.add_user, this.success_add, this.fail_add);
            },


            //用户名判断合法
            if_name(tag1){
                document.getElementById(tag1).placeholder = "输入2-10位中文、英文、数字";
                this.add_if = true;    //禁用按钮
                this.is_active[0] = false;

                let x = document.getElementById(tag1).value;
                let y;
                if (x.length !== 0) {
                    y = this.check_name(x);
                    if (y === true) {
                        this.tip = "";
                        this.is_active[0] = false;
                        this.dup_name(x);
                    } else {
                        this.tip = "输入2-10位中文、英文、数字";
                        this.add_if = true;
                        this.is_active[0] = true;
                    }
                }
            },

            //账号判断合法
            if_account(tag2){
                document.getElementById(tag2).placeholder = "输入8-10位数字、英文";
                this.add_if = true;    //禁用按钮
                this.is_active[1] = false;

                let x = document.getElementById(tag2).value;
                let y;
                if (x.length !== 0) {
                    y = this.check_user(x);
                    if (y === true) {
                        this.tip = "";
                        this.is_active[1] = false;
                        this.dup_account();
                    } else {
                        this.tip = "输入8-10位数字、英文";
                        this.add_if = true;
                        this.is_active[1] = true;
                    }
                }
            },


            //密码判断合法
            if_pwd(tag3){
                document.getElementById(tag3).placeholder = "输入6-16位数字、英文";
                this.add_if = true;    //禁用按钮
                this.is_active[2] = false;

                let x = document.getElementById(tag3).value;
                let y;
                if (x.length !== 0) {
                    y = this.check_pwd(x);
                    if (y === true) {
                        this.add_if = false;
                        this.tip = "";
                        this.is_active[2] = false;
                    } else {
                        this.tip = "输入6-16位数字、英文";
                        this.add_if = true;
                        this.is_active[2] = true;
                    }
                }
            },

            //重复输入密码确认
            dup_pwd(tag1, tag2){
                document.getElementById(tag2).placeholder = "重复密码";
                this.add_if = true;
                this.is_active[3] = false;
                let x = document.getElementById(tag1).value;
                let y = document.getElementById(tag2).value;
                if (y.length !== 0) {
                    if (y !== x) {
                        this.tip = "输入密码不一致！";
                        this.add_if = true;
                        this.is_active[3] = true;
                    } else {
                        this.tip = "";
                        this.add_if = false;
                        this.is_active[3] = false;
                    }
                }
            },

            //判断用户名是否重复
            success_name(response){
                console.log("用户名不重复！");
                this.add_if = false;    //按钮可以使用
            },

            fail_name(response){
                this.is_active[0] = true;
                this.add_if = true;
                this.tip = "用户名已存在!";
            },

            dup_name(n){
                this.cheif_name.value = "?name=" + n;
                let new_url = this.name_url + this.cheif_name.value;
                this.http_json(new_url, 'get', this.cheif_name, this.success_name, this.fail_name);
            },


            //判断账号是否重复
            success_account(response){
                console.log("账号不重复！");
                this.add_if = false;
            },

            fail_account(response){
                this.is_active[1] = true;
                this.tip = "账号已存在!";
                this.add_if = true;
            },

            dup_account(){
                this.cheif_account.value = "?account=" + this.account;
                let new_url = this.account_url + this.cheif_account.value;
                this.http_json(new_url, 'get', this.cheif_account, this.success_account, this.fail_account);
            },

            //添加用户信息
            add_msg(){
                let x = document.getElementById("text1").value;
                let y = document.getElementById("text2").value;
                let z = document.getElementById("text3").value;
                let m = document.getElementById("text4").value;
                if (x === "" || y === "" || z === "" || m === "") {
                    //this.tip = "用户名、账号、密码等不能为空！";
                    this.add_if = true;
                } else {
                    this.if_name('text1');
                    this.if_account('text2');
                    this.if_pwd('text3');
                    this.dup_pwd('text3', 'text4');
                    if (this.add_if === false) {
                        this.create_users();
                    }
                }
            },

            //删除用户信息 success回调函数
            success_delete(response){
                console.log("success delete");
                this.clean_data();   //清空数组
                this.get_users();
            },

            fail_delete(response){
                console.log("fail delete");
            },

            delete_users(index){
                this.delete_user.user_id = this.user_data[index].user_id;
                this.http_json(this.delete_url, 'post', this.delete_user, this.success_delete, this.fail_delete);
            },


            //修改用户信息 模态框系列
            open_motal(index){
                this.show_change = true;
                this.back_index = index;    //将修改行的索引传入便于后面发送该索引下的用户ID
                this.back_username = this.user_data[index].user_name;
                this.back_account = this.user_data[index].account;
            },

            close_motal(){
                this.show_change = false;
                this.back_username = '';
                this.back_account = '';
                this.pwd = '';
                this.confirm_pwd = '';
                this.back_index = '';
                this.tip = '';
                this.is_active[0] = false;
                this.is_active[2] = false;
                this.is_active[3] = false;
            },

            success_modify(response){
                console.log("success modify!");
                this.clean_data();
                this.get_users();
                this.close_motal();
            },

            fail_modify(response){
                console.log("fail modify!");
            },

            //修改的请求函数
            modify_users(){
                this.modify_user.name = this.back_username;
                this.modify_user.pwd = this.pwd;
                this.modify_user.user_id = this.user_data[this.back_index].user_id;
                this.http_json(this.modify_url, 'post', this.modify_user, this.success_modify, this.fail_modify);
            },

            //修改执行的函数
            confirm_change(){
                let x = document.getElementById("chan2").value;
                let y = document.getElementById("chan3").value;
                let z = document.getElementById("chan4").value;
                if (x === "" || y === "" || z === "") {
                    this.tip = "用户名、账号、密码等不能为空！"
                } else {
                    this.if_name('chan2');
                    this.if_pwd('chan3');
                    this.dup_pwd('chan3', 'chan4');
                    if (this.add_if === false) {
                        this.modify_users();
                    }
                }
            },

            clean_data(){
                this.user_data.splice(0, this.user_data.length);
            },

            downback(){
                this.$http.get('/ancient_books/logout.action').then(function () {
                    alert("注销成功");
                    localStorage.setItem('user', JSON.stringify("guest"));
                    this.$http.get('/ancient_books/getToken.action').then(function (response) {
                        console.log("注销后得到token");
                        this.$store.commit("change_token",response.body.token);
                        console.log(this.$store.getters.GetToken + " 注销后获得token");
                    },function () {
//                 alert("error")
                    });
                    this.$router.push({path: '/login'});
                }, function () {
                    alert("error")
                })
            }
        }
    }

</script>



<style>
    .zxw-admin-title{
        margin:20px 0 20px 330px;
    }

    .zxw-btn-admin{
        float:right;
    }

    thead tr th{
        background-color: #a50000;
        color: gainsboro;
        text-align: center;
    }

    tbody tr:nth-child(even) {
        background-color: #f7e8d6;
    }


    /*管理用户表格样式*/
    .zxw-table-box {
        width:940px;
        table-layout: fixed;    /*表格每个宽度确定*/
        text-align: center;
        margin:0 0 0 330px;
    }

    .zxw-btn-general{
        background-color: transparent;
        border: none;
        color:#a50000;
        margin:0 20px 0 0;
    }

    .zxw-modal-body{
        margin:50px 0 0 0;
    }

    .zxw-modal-margin{
        margin:0 0 20px 0;
    }

    .zxw-modal-label{
        margin:0 10px 0 20px;
        text-align: right;
        width:100px;
        font-size: 15px;
    }

    .zxw-input-text{
        width:220px;
        height:28px;
        background-color: transparent;
        border: 2px solid black;
        text-align: center;
    }

    .zxw-admin-modal-footerbtn{
        margin:0 0 0 180px;
    }
    .zxw-modal-btn-margin{
        width:100px;
        height:40px;
        margin:0 5px 0 0;
    }

    .warn-tip{
        color: #a50000;
        font-size: 14px;
        text-align:center;
        margin:10px 0 10px 0;
    }

    .warnBorder {
        border: 2px solid #a50000;
    }

    .zxw-input-account{
        width:220px;
        height:28px;
        text-align: center;
        background: transparent;
        border: none;
    }

    .zxw-admin-btn-length{
        width:140px;
        height:45px;
    }
    /*.dialog {*/
        /*width: 480px;*/
        /*position: fixed;*/
        /*left: 50%;*/
        /*top: 6em;*/
        /*transform: translateX(-50%);*/
        /*z-index: 2000;*/
        /*visibility: hidden;*/
        /*backface-visibility: hidden;*/
        /*perspective: 1300px;*/
    /*}*/

    /*.dialog-active{*/
        /*visibility: visible;*/
    /*}*/

    /*.dialog-active .dialog-content {*/
        /*position: relative;*/
        /*opacity: 1;*/
        /*transform: rotateY(0);*/
    /*}*/

    /*.dialog-active ~ .dialog-overlay {*/
        /*opacity: 1;*/
        /*visibility: visible;*/
    /*}*/

    /*.dialog-content {*/
        /*border-radius: 2px;*/
        /*background: #fff;*/
        /*overflow: hidden;*/
        /*box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
        /*transition: .5s ease-in-out;*/
        /*opacity: 0;*/
        /*transform-style: preserve-3d;*/
        /*transform: rotateY(-70deg);*/
    /*}*/

    /*.dialog-header {*/
        /*background: #fff;*/
        /*margin-top: 5%;*/
    /*}*/

    /*.dialog-title {*/
        /*color: dimgrey;*/
        /*font-size: 25px;*/
        /*font-family: 楷体;*/
        /*text-align: center;*/
        /*width:6em;*/
        /*margin-right:35%;*/
        /*margin-left: 34%;*/
        /*font-weight: 200;*/
        /*line-height: 1em;*/
        /*display: inline-block;*/
    /*}*/

    /*.dialog-body {*/
        /*padding: 2em;*/
    /*}*/

    /*.dialog-footer {*/
        /*padding: 3% 0;*/
        /*text-align: center;*/
        /*border-top: 1px solid rgba(0, 0, 0, 0.1);*/
    /*}*/

    /*.close {*/
        /*display: inline-block;*/
        /*width: 2rem;*/
        /*height: 2rem;*/
        /*position: absolute;*/
        /*top: .5rem;*/
        /*right: .5rem;*/
        /*transition: .8s ease all;*/
          /*-moz-transition: .8s ease all;*/
          /*-webkit-transition: .8s ease all;*/
        /*border: none;*/
        /*border-radius: 3px;*/
        /*color: #333;*/
        /*text-decoration: none;*/
        /*box-sizing: border-box;*/
          /*-webkit-box-sizing: border-box;*/
    /*}*/

    /*.close:hover {*/
        /*transition: .8s ease all;*/
          /*-moz-transition: .8s ease all;*/
          /*-webkit-transition: .8s ease all;*/
    /*}*/

    /*.close .iconfont {*/
        /*font-size: 2rem;*/
        /*color: black;*/
    /*}*/

    /*.rotate {*/
        /*cursor: pointer;*/
    /*}*/

    /*.rotate:hover {*/
        /*transition: transform 1.0s ease;*/
          /*-moz-transition: -moz-transform 1.0s ease;*/
          /*-webkit-transition: -webkit-transform 1.0s ease ;*/
    /*}*/

    /*.close .iconfont {*/
        /*font-size: 2rem;*/
        /*color: black;*/
    /*}*/

    /*.iconfont {*/
        /*font-size: 33px;*/
        /*font-style: normal;*/

          /*-webkit-font-smoothing: antialiased;*/
          /*-webkit-text-stroke-width: 0.2px;*/
          /*-moz-osx-font-smoothing: grayscale;*/
    /*}*/
    /*.span-motal{*/
        /*font-family: 楷体;*/
        /*font-size: 20px;*/
        /*font-weight: bold;*/
        /*color: dimgrey;*/
        /*text-align:right;*/
        /*width: 6em;*/
        /*display: inline-block;*/
    /*}*/

    /*.input-motal{*/
        /*width:15em;*/
        /*margin-top: 0;*/
        /*text-align: center;*/
        /*display: inline;*/
        /*margin-left: 10%;*/
    /*}*/

    /*!*错误提示*!*/
    /**/

    /*!*错误提示红框*!*/
    /**/






</style>