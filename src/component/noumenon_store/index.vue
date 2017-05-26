<template>
    <div class="noumenom">
    <navigation_bar></navigation_bar>   <!--本体导航条-->
        <noumenom></noumenom>   <!--本体库页面内容-->
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