<template>
    <div class="j-modify">
        <div>
            <div style="width: 180px;margin: 0 auto">
                <img src="../assets/img/头像.png" class="j-userhead" >
                <span class="j-simple-user"  v-model="name">{{name}}</span>
            </div>
            <p class="j-modify-edit" @click="show_edit">编辑</p>
            <img src="../assets/img/墨水线.png" class="j-user-line" >
        </div>
        <div class="j-modify-info">
            <p>
                <span style="margin-left: 82px">用户类型：</span>
                <span style="margin-left: 10px" v-model="type">{{type}}</span>
            </p>
            <p style="margin: 15px auto">
                <span style="margin-left: 100px">账&nbsp&nbsp&nbsp号：</span>
                <span style="margin-left: 10px" v-model="account">{{account}}</span>
            </p>
            <p style="margin: 15px auto">
                <span style="margin-left: 99px">用户名：</span>
                <span style="margin-left: 10px" v-model="name">{{name}}</span>
            </p>
        </div>
        <div>
            <login_modal v-bind:show_modal.sync = show @fireclose = "cancel">
                <header class="dialog-header" slot="header">
                    <h3 class="dialog-title">用 户 编 辑</h3>
                </header>
                <div class="dialog-body" slot="body">
                    <div class="j-modify-body">
                        <div class="j-edit-pwd">
                            <span class="j-edit-pwd-span">用户名：</span>
                            <input type="text" placeholder="请输入您的新用户名" class="j-edit-pwd-input" v-model="new_name" @blur="check()" id="new_name" v-bind:class="{ warnborder: Active1 }">
                        </div>
                        <div class="j-edit-pwd">
                            <span class="j-edit-pwd-span">旧密码：</span>
                            <input type="text" placeholder="请输入您的旧密码" class="j-edit-pwd-input" v-model="old_pwd" @blur="check()" id="old_pwd" v-bind:class="{ warnborder: Active2 }">
                        </div>
                        <div class="j-edit-pwd">
                            <span class="j-edit-pwd-span">新密码：</span>
                            <input type="password" placeholder="请输入您的新密码" class="j-edit-pwd-input" v-model="new_pwd" @blur="check()" id="new_pwd" v-bind:class="{ warnborder: Active3 }">
                        </div>
                        <div class="j-edit-pwd">
                            <span class="j-edit-agapwd-span">重复密码：</span>
                            <input type="password" placeholder="请重复输入您的新密码" class="j-edit-pwd-input" v-model="twi_pwd" @blur="check()" id="twi_pwd" v-bind:class="{ warnborder: Active4 }">
                        </div>
                        <div class="j-modify-warning">
                            <span id="warning" v-model="warning">{{warning}}</span>
                        </div>
                    </div>
                    <footer class="j-modify-footer" slot="footer">
                        <button class="j-modify-cancel" @click="cancel" >取 消</button>
                        <button class="j-modify-enter" @click="confirm" v-bind:disabled="disabled">确 定</button>
                    </footer>
                </div>
            </login_modal>
        </div>
    </div>
</template>
<script>
    import login_modal from  '../component/modal.vue'
    import store from '../store/index'
    import bus from '../lib/bus'

    export default{
        components:{
            login_modal,
        },
        created(){
            this.http_json(this.get_info_url, 'get', {}, this.info_success, this.info_fail)
        },
        data(){
            return{
                name: '',
                account: '',
                type: '',
                new_name: '',
                old_pwd:'',
                twi_pwd:'',
                new_pwd: '',
                warning: '',
                Active1: false,
                Active2: false,
                Active3: false,
                Active4: false,
                disabled: true,
                show: false,
                modify_url: '/ancient_books/modify_user_self.action',
                get_info_url: '/ancient_books/get_user_info.action',
            }
        },
        methods: {
            info_success(response){
                this.name = response.body.name;
                this.account = response.body.account;
                if (response.body.su == 0){
                    this.type = '普通用户'
                }else if (response.body.su == 1){
                    this.type = '管理员'
                }
            },
            info_fail(){

            },
            show_edit(){
                this.show = true;
            },
            confirm(){
                let item = {
                    token: this.$store.getters.GetToken,
                    pwd: this.old_pwd,
                    new_name: this.new_name,
                    new_pwd: this.new_pwd
                };
                this.http_json(this.modify_url, 'post', item, this.confirm_sucess, this.confirm_fail)
            },
            confirm_sucess(response){
                if (response.body.result == 1){
                    alert(response.body.info);
                    this.name = this.new_name;
                    this.new_name = '';
                    this.old_pwd = '';
                    this.twi_pwd = '';
                    this.new_pwd = '';
                    this.warning = '';
                    this.Active1 = false;
                    this.Active2 = false;
                    this.Active3 = false;
                    this.Active4 = false;
                    this.disabled = false;
                    this.show = false;
                    alert("请重新登录");
                    localStorage.setItem('user', JSON.stringify("guest"));
                    this.$router.push('/login');
                    bus.$emit('change_name','登录')
                } else {
                    alert(response.body.info);
                }
            },
            confirm_fail(){

            },
            cancel(){
                this.new_name = '';
                this.old_pwd = '';
                this.twi_pwd = '';
                this.new_pwd = '';
                this.warning = '';
                this.Active1 = false;
                this.Active2 = false;
                this.Active3 = false;
                this.Active4 = false;
                this.disabled = false;
                this.show = false;
            },
            check(){
                this.disabled = false;
                this.warning = "";
                this.Active1=false;
                this.Active2=false;
                this.Active3=false;
                this.Active4=false;
                let success1=this.check_name(this.new_name);
                let success2=this.check_pwd(this.old_pwd);
                let success3=this.check_pwd(this.new_pwd);
                if (success1) {
                    this.warning = "";
                    this.Active1 = false;
                    this.disabled = false;
                    if (success2){
                        this.warning = "";
                        this.Active2 = false;
                        this.disabled = false;
                        if (success3) {
                            this.warning = "";
                            this.Active3 = false;
                            this.disabled = false;
                            if (this.twi_pwd == ''){
                                this.warning = "";
                                this.Active3 = false;
                                this.disabled = true;
                            } else {
                                if ( this.new_pwd == this.twi_pwd){
                                    this.warning = "";
                                    this.Active4 = false;
                                    this.disabled = false;
                                }else {
                                    this.warning = "两次输入的密码不相符";
                                    this.Active4 = true;
                                    this.disabled = true;
                                }
                            }
                        }else {
                            this.warning = '新密码格式错误';
                            this.Active3 = true;
                            this.disabled = true;
                        }
                    }else {
                        this.warning = '旧密码格式错误';
                        this.Active2 = true;
                        this.disabled = true;
                    }
                } else {
                    this.warning = '用户名格式错误';
                    this.Active1 = true;
                    this.disabled = true;
                }
            }
        }
    }
</script>

<style>
    .j-modify{
        width: 1035px;
        margin: 50px auto;

    }
    .j-modify-info{
        width: 300px;
        margin: 45px auto;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color:#999999;
    }
    .j-modify-edit{
        width: 40px;
        font-weight:700;
        font-style:normal;
        font-size:20px;
        color:#999999;
        float: right;
        margin-right: 50px;
    }
    .j-modify-body{
        width: 320px;
    }
    .j-edit-pwd{
        margin-top: 20px;
    }
    .j-edit-pwd-span{
        font-size: 18px;
        margin-left: 18px;
    }
    .j-edit-pwd-input{
        font-size: 18px;
        padding: 15px;
        width: 220px;
        height: 35px;
        border: 1.5px solid grey;
    }
    .j-edit-agapwd-span{
        font-size: 18px;
    }
    .j-modify-footer{
        margin-top: 20px;
    }
    .j-modify-warning{
        width: 300px;
        height: 30px;
        font-weight:500;
        font-style:normal;
        font-size:16px;
        color:red;
        margin-top: 10px;
    }
    .j-modify-cancel{
        margin-left: 10px;
        width: 127px;
        height: 54px;
        background: url("../assets/img/上传1/下一步按钮.png");
        font-size: 20px;
        color: white;
    }
    .j-modify-enter{
        margin-left: 40px;
        width: 127px;
        height: 54px;
        background: url("../assets/img/上传1/下一步按钮.png");
        font-size: 20px;
        color: white;
    }
    .warnborder {
        border: 2px solid red;
    }

</style>