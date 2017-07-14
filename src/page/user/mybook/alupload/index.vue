<template>
    <div style="width: ">
        <recent_title class="j-alup-bar" :title="this.title"></recent_title>
        <div class="j-alup">

        </div>
    </div>
</template>

<script>
    import recent_title from '../../../../component/noumenon-title.vue'
    export default{
        components:{
            recent_title
        },
        data(){
            return{
                title: '已上传古籍'
            }
        },
        methods:{

        }
    }
</script>

<style>
    .j-alup-bar{
        margin: -65px auto
    }
    .j-alup{
        margin: 80px auto;
        width: 900px ;
        height: auto ;
    }
</style>