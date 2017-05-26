<template>
    <div class="noumenon">
        <navigation_bar></navigation_bar>
        <noumenom></noumenom>
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