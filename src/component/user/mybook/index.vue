<template>
   <div class="userbar">
       <user_navigation_bar></user_navigation_bar>
   </div>
</template>

<script>
   import user_navigation_bar from  '../user_bar.vue'
   export default{
       components:{user_navigation_bar}
   }
</script>
<style>
   .userbar{
      position: absolute;
      top: 200px;
      left: 200px;;
   }
</style>