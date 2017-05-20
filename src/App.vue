<template>
  <div id="app">
    <home></home>
    <router-view ></router-view>   <!--路由显示的位置-->
  </div>
</template>

<script>
    import home from './home.vue'
    import  search from  './component/search/search.vue'
    import  login from  './login.vue'
    export default{
        components:{
            home,
            search,
            login
        }
    }
</script>

<style>
<<<<<<< HEAD
=======
  .app{
    position: absolute;
    background-image:url("./assets/img/bg.png");
    height: 100%;
    width: 100%;
  }
>>>>>>> 4974a85eaeb9d26aa5ed3e6651c5661fab0e5324
</style>