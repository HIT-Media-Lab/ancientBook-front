<template>
  <div id="app" class="app" onload="onload_token()">
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
  export default{
        components:{home,search,login},
      data(){

        },
      methods:{
          onload_token(){
                  this.$http.get('/ancient_books/getToken.action').then(function (response){
                      console.log("成功得到token");
                      this.Token=response.token
                  })
          }
      }
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