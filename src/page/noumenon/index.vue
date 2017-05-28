<template>
    <div class="zxwnoumenon">
    <navigation_bar></navigation_bar>   <!--本体导航条-->
    <router-view></router-view>
    </div>
</template>

<script>
    import navigation_bar from '../../component/noumenon-navbar.vue';
    export default{
        components:{
            navigation_bar
        }
    }
</script>

<style>
    .zxwnoumenon{
        width:800px;
        margin: auto;
    }
</style>