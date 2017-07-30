<!--我的贡献，我的古籍，我的收藏，上传的父组件-->
<template>
    <div>
        <user_bar></user_bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import user_bar from '../../component/user_bar.vue'
    export default{
        components: {
            user_bar
        }
    }
</script>