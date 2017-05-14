<template>
    <div class="user">
        <div class="">
               <router-link to="/upload_step1">
                   <img src="../../assets/img/u456.png" class="upload_img">
                   <span class="upload_word"> 上 传</span>
               </router-link>
        </div>
                <router-link to="/mybook_index" >
                    <img src="../../assets/img/u463.png" class="mybook_img">
                    <span class="mybook_word">我的古籍</span>
                </router-link>
                <router-link to="/my_collection_index">
                    <img src="../../assets/img/u468.png" class="mycollection_img">
                    <span class="mycollection_word">我的收藏</span>
                </router-link>
                <router-link to="/my_offer_index">
                    <img src="../../assets/img/u485.png" class="myoffer_img">
                    <span class="myoffer_word">我的贡献</span>
                </router-link>
    </div>
</template>

<script>

</script>

<style>
    .user{
        position: relative;
        height: 100%;
        margin-left: 300px;
        margin-right: 300px;
    }
    #upload{
        width: 50px;
        height: 100px;
    }
    .upload_img{
        height: auto;
        width: auto;
        /*margin-top: 300px;*/
    }
    .upload_word{
        margin-top: 30px;
        width: 50px;
        display: block;
    }
    .mybook_img{
        display: inline-block;
        width: auto;
        height: auto;
        margin-top:300px;
        margin-left: 312px;
    }
    .mybook_word{
        left: 590px;
        top: 55px;
        width: 70px;
    }
    .mycollection_img{
        width: auto;
        height: auto;
        display: inline-block;

        margin-left: 624px;
    }
    .mycollection_word{
        left: 890px;
        top: 55px;
        width: 70px;
    }
    .myoffer_img{
        display: inline-block;
        width: auto;
        height: auto;
        margin-left: 936px;
    }
    .myoffer_word{
        left: 1195px;
        top: 55px;
        width: 70px;
    }
</style>