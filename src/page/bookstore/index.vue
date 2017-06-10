<template>
    <div class="j-bookstore">
        <bookbar></bookbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import bookbar from '../../component/book-navbar.vue'
    export default{
        components:{
            bookbar
        }
    }
</script>

<style>
    .j-bookstore{
        width:1038px;
        margin:auto;
    }
</style>