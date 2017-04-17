<template>
  <div id="app">
    <login></login>
    <router-view></router-view>
    <search></search>
    <store></store>
  </div>
</template>

<script>
    import store from './store.vue'
    import  search from  './component/search/search.vue'
    import  login from  './login.vue'
  export default{
        components:{store,search,login}
  }
</script>

<style>

</style>