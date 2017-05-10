<template>
  <div id="app" class="app">
    <!--<login></login>-->
    <router-view></router-view>
    <search></search>
    <home></home>
  </div>
</template>

<script>
    import home from './home.vue'
    import  search from  './component/search/search.vue'
    import  login from  './login.vue'
//    window.onload=function a() {
//        this.$http.get('/ancient_books/getToken.action').then(function (response){
//            this.Token=response.token
//        })
//    };
  export default{
        components:{home,search,login}
  }
</script>

<style>
  .app{
    position: absolute;
    background-image:url("./assets/img/bg.png");
    height: 100%;
    width: 100%;
  }
</style>