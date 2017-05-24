<template>
    <div class="noumenom">
   <navigation_bar></navigation_bar>
        <noumenom></noumenom>
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