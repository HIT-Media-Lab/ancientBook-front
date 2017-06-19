<template>
  <div id="app">
    <homebar></homebar>
    <router-view></router-view>   <!--路由显示的位置-->
  </div>
</template>

<script>
    import homebar from './component/header-navbar.vue'
    export default{
        components:{
            homebar,
        }
    }
</script>

<style>
  #app{
    margin: 0 auto;
  }
  @media screen and (min-width: 1201px) {
    #app {width: 1200px}
  }


  @media screen and (max-width: 1200px) {
    #app {width: 1000px}
  }


  @media screen and (max-width: 901px) {
    #app {width: 700px;}
  }


  @media screen and (max-width: 500px) {
    #app {width: 300px;}
  }

</style>