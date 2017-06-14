<template>
    <div class="j-sortbook">
        <p class="j-bls">经部/总类/正文之属</p>
        <div class="j-bls-book">
            <router-link to="/bookstore/book_info" style="color: #8a6d3b;">
                <p class="j-bls-bookname">1. 诗经(品种层责任者)</p>
            </router-link>
            <router-link to="/bookstore/book_info" style="color: #8a6d3b">
                <p class="j-bls-bookname">2. 山海经(品种层责任者)</p>
            </router-link>
        </div>
        <div class="j-bls-page">
            <page_button></page_button>
        </div>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
            page_button
        }
    }
</script>

<style>
    .j-sortbook{
        margin: 0 auto;
        width: 900px;
        height: 500px;
    }
    .j-bls{
        margin-top: 20px;
        font-size: 20px;
    }
    .j-bls-book{
        display: inline-block;
        margin-left: 45px;
        margin-top: 35px;
    }
    .j-bls-bookname{
        margin-bottom: 20px;
    }
    .j-bls-page{
        margin-top: 200px;
        margin-left: auto;
    }
</style>