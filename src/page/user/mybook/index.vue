<template>
    <div class="zxw-bar-img ">
      <!-- <user_navigation_bar></user_navigation_bar>-->
       <div class="zxw-bar-img">
           <router-link to="/noumenon/time">
               <img src="../../../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='alupload'">
               <span class="zxw-userbar-title">上传</span>
           </router-link>

           <router-link to="/noumenon/place">
               <img src="../../../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='place'||this.$route.name==='pla_detail'">
               <span class="zxw-userbar-title">我的古籍</span>
           </router-link>

           <router-link to="/noumenon/character/letter/A/page/1">
               <img src="../../../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='character'||this.$route.name==='char_detail'">
               <span class="zxw-userbar-title">我的收藏</span>
           </router-link>

           <router-link to="/noumenon/office">
               <img src="../../../assets/img/spot.png" class="zxw-spot" v-show="this.$route.name==='office'||this.$route.name==='off_detail'">
               <span class="zxw-userbar-title">我的贡献</span>
           </router-link>

       </div>
    </div>
</template>

<script>
   import user_navigation_bar from  '../../../component/user-bar.vue'
   export default{
       components:{user_navigation_bar}
   }
</script>
<style>
   .zxw-userbar-title{
       margin:20px 90px 20px 0;
       font-size: 16px;
       color: gainsboro;
       display: inline-block;
   }
</style>