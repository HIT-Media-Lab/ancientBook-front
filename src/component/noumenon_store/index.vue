<template>
    <div class="noumenon">
    <navigation_bar></navigation_bar>   <!--本体导航条-->
        <noumenon></noumenon>   <!--本体库页面内容-->
        <router-view></router-view>
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