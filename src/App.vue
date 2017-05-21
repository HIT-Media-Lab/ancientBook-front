<template>
  <div id="app">
    <home></home>
    <router-view ></router-view>   <!--路由显示的位置-->
  </div>
</template>

<script>
    import home from './home.vue'
    export default{
        components:{
            home,
        }
    }
</script>

<style>
</style>