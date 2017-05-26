<template>
<<<<<<< HEAD:src/component/noumenon_store/index.vue
    <div class="noumenon">
        <navigation_bar></navigation_bar>
        <noumenom></noumenom>
=======
    <div class="noumenom">
    <navigation_bar></navigation_bar>   <!--本体导航条-->
        <noumenom></noumenom>   <!--本体库页面内容-->
>>>>>>> 496cc6aebd1972dc80a358dba2d5a92b8eebb077:src/component/noumenom_store/index.vue
    </div>
</template>

<script>
    import navigation_bar from './navigation_bar.vue';
    import noumenon from './noumenon.vue';
    export default{
        components:{
            navigation_bar,
            noumenon
        }
    }
</script>

<style>
    .noumenon{
        width:800px;
        margin: auto;
    }
</style>