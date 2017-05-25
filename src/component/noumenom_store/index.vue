<template>
    <div class="noumenom">
    <navigation_bar></navigation_bar>   <!--本体导航条-->
        <noumenom></noumenom>   <!--本体库页面内容-->
    </div>
</template>

<script>
    import navigation_bar from './navigation_bar.vue';
    import noumenom from './noumenom.vue';
    export default{
        components:{
            navigation_bar,
            noumenom
        }
    }
</script>

<style>
    .noumenom{
        width:800px;
        margin: auto;
    }
</style>