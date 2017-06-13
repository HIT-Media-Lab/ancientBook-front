<template>
    <div class="user">
        <div class="j-head">
            <img src="../../assets/img/头像.png" class="j-userhead">
            <p class="j-simple-user">普通用户</p>
            <img src="../../assets/img/墨水线.png" class="j-user-line">
        </div>
        <div class="j-link">
            <router-link to="/user/upload1">
                <img src="../../assets/img/上传.png" class="upload_img">
            </router-link>
            <router-link to="/user/mybook" >
                <img src="../../assets/img/我的古籍.png" class="mybook_img">
            </router-link>
            <router-link to="/user/collection">
                <img src="../../assets/img/我的收藏.png" class="mycollection_img">
            </router-link>
            <router-link to="/user/offer">
                <img src="../../assets/img/我的贡献.png" class="myoffer_img">
            </router-link>
            <img src="../../assets/img/注销.png" class="logout" @click="logout()">
        </div>
    </div>
</template>

<script>
    import store from '../../store'
    export default{
        data(){
            return{

            }
        },
        methods:{
            logout(){
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
//                    alert("error")
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

    }
    .j-userhead{
        width: 80px;
        margin-left: 46%;
    }
    .j-simple-user{
        margin: 0 auto;
        width: 60px;
    }
    .j-link{
        letter-spacing:60px;
        margin: 0 auto;
        width: 750px;
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
</style>