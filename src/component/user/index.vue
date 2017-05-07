<template>
    <div class="user">
        <div>
            <div>
               <router-link to="/upload_step1">
                   <img src="../../assets/img/u456.png" class="upload_img">
                   <span class="upload_word"> 上 传</span>
               </router-link>
            </div>
            <div>
                <router-link to="/mybook_index">
                    <img src="../../assets/img/u463.png" class="mybook_img">
                    <span class="mybook_word">我的古籍</span>
                </router-link>
            </div>
            <div>
                <router-link to="/mycollection">
                    <img src="../../assets/img/u468.png" class="mycollection_img">
                    <span class="mycollection_word">我的收藏</span>
                </router-link>
            </div>
            <div>
                <router-link to="/myoffer_noumenon_edit">
                    <img src="../../assets/img/u485.png" class="myoffer_img">
                    <span class="myoffer_word">我的贡献</span>
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>

</script>

<style>
    .user{
        position: absolute;
        top: 250px;
    }
    .upload_img{
        position: absolute;
         left: 300px;
    }
    .upload_word{
        position: absolute;
        left: 305px;
        top: 55px;
        width: 50px;
    }
    .mybook_img{
        position: absolute;
        left: 600px;
    }
    .mybook_word{
        position: absolute;
        left: 590px;
        top: 55px;
        width: 70px;
    }
    .mycollection_img{
        position: absolute;
        left: 900px;
    }
    .mycollection_word{
        position: absolute;
        left: 890px;
        top: 55px;
        width: 70px;
    }
    .myoffer_img{
        position: absolute;
        left: 1200px;
    }
    .myoffer_word{
        position: absolute;
        left: 1195px;
        top: 55px;
        width: 70px;
    }
</style>