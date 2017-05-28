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
</style>