<template>
    <div class="user">
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
            <img src="../../assets/img/注销.png" class="logout">
        </div>
    </div>
</template>

<script>
    import store from '../../store'
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style>
    .user{
        width: 600px;
        margin: 0 auto;
    }
    .j-link{
        letter-spacing:70px;
    }
    .upload_img{
        width: 10%;
        height: 10%;
    }
    .mybook_img{
        width: 10%;
        height: 10%;
    }
    .mycollection_img{
        width: 10%;
        height: 10%;
    }
    .myoffer_img{
        width: 10%;
        height: 10%;
    }
    .logout{
        width: 10%;
        height: 10%;
    }
</style>