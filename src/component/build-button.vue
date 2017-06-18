<template>
    <button class="zxwnoumenom-button zxwnoumenom-button-margin zxwbtn-float" @click="go_create_one()">新建本体</button>
</template>

<script>
   export default{
       methods:{
           go_create_one(){
               if (this.$route.name ==='character'){
                   this.$store.commit('get_create_one_selection',2);

               } else if (this.$route.name === 'time'){
                   this.$store.commit('get_create_one_selection',0);

               } else if (this.$route.name === 'place'){
                   this.$store.commit('get_create_one_selection',1);

               } else if (this.$route.name ==='institution'){
                   this.$store.commit('get_create_one_selection',3);

               } else if (this.$route.name ==='office'){
                   this.$store.commit('get_create_one_selection',4);

               } else if (this.$route.name ==='literature'){
                   this.$store.commit('get_create_one_selection',5);

               } else if (this.$route.name ==='terms'){
                   this.$store.commit('get_create_one_selection',6);

               } else if (this.$route.name ==='recent'){
                   this.$store.commit('get_create_one_selection',7);

               }
               this.$router.push({ path:'/build'});
           }
       }
   }
</script>

<style>
    .zxwnoumenom-button{
        background-image: url("../assets/img/build-button.png");
        background-repeat: no-repeat;
        background-position: center;
        border:none;
        color:white;
    }

    .zxwnoumenom-button-margin{
        margin:40px 40px 0 0;
        width:140px;
        height:45px;
    }

    .zxwbtn-float{
        float:right;
    }
</style>