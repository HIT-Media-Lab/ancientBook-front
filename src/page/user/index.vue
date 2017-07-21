<template>
    <div class="user">
        <div class="j-head">
            <div style="width: 180px;margin: 0 auto">
                <img src="../../assets/img/picture-button/avatar.png" class="j-userhead" @click="go_to_modify">
                <span class="j-simple-user" @click="go_to_modify" v-model="name">{{name}}</span>
            </div>
            <div class="j-user-line">
                <img src="../../assets/img/no-use-picture/ink-line-long.png" >
            </div>
        </div>
        <div class="j-link">
            <router-link to="/user/upload1">
                <img src="../../assets/img/picture-button/user-upload.png" class="upload_img">
            </router-link>
            <router-link to="/user_info/mybook" >
                <img src="../../assets/img/picture-button/user-mybook.png" class="mybook_img">
            </router-link>
            <router-link to="/user_info/collection/page/1">
                <img src="../../assets/img/picture-button/user-my-collection.png" class="mycollection_img">
            </router-link>
            <router-link to="/user_info/edit/全部本体/page/1">
                <img src="../../assets/img/picture-button/user-myoffer.png" class="myoffer_img">
            </router-link>
            <img src="../../assets/img/picture-button/user-logout.png" class="logout" @click="logout()">
        </div>
    </div>
</template>

<script>
    import store from '../../store'
    import bus from '../../lib/bus'
    export default{
        created(){
            this.http_json(this.get_info_url, 'get', {}, this.success_info, this.fail_info)
        },
        data(){
            return{
                get_info_url: '/ancient_books/get_user_info.action',
                name: ''
            }
        },
        methods:{
            success_info(response){
                this.name = response.body.name;
            },
            go_to_modify(){
                this.$router.push("/modify_info");
            },
            fail_info(){

            },
            logout(){
                this.$http.get('/ancient_books/logout.action').then(function () {
                    localStorage.setItem('user', JSON.stringify("guest"));
                    this.$http.get('/ancient_books/getToken.action').then(function (response) {
                        console.log("注销后得到token");
                        this.$store.commit("change_token",response.body.token);
                        console.log(this.$store.getters.GetToken + " 注销后获得token");
                    },function () {

                    });
                    this.$router.push({path: '/login'});
                    bus.$emit('change_name','登录')
                }, function () {

                })
            }
        }
    }
</script>

<style>
    .user{
        width: 1035px;
        margin: 0 auto;
    }
    .j-head{
        width: 1035px;
        margin: 80px auto;
    }
    .j-user-line{
        width: 974px;
        margin: 0 auto;
    }
    .j-userhead{
        width: 80px;
        margin: 0 auto;
    }
    .j-simple-user{
        margin-left: 15px ;
        width: auto;
        font-weight:700;
        font-style:normal;
        font-size:20px;
        color:#999999;
    }
    .j-link{
        letter-spacing:60px;
        margin: 0 auto;
        width: 760px;
    }
    .upload_img{
        width: 95px;
    }
    .mybook_img{
        width: 95px;
    }
    .mycollection_img{
        width: 95px;
    }
    .myoffer_img{
        width: 95px;
    }
    .logout{
        width: 95px;
    }
    .all{
        width: 950px;
        margin: 0 auto;
    }
</style>