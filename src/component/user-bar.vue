<template>
    <div>
        <div class="upload">
            <router-link to="/user/upload1">
                <span>上  传</span>
            </router-link>
        </div>
        <div class="mybook">
            <router-link to="/user/mybook">
                <span>我的古籍</span>
            </router-link>
            <router-link to="/user/alupload">
                <li v-if="$route.path=='/user/mybook'">已上传</li>
            </router-link>
            <router-link to="/user/privatebook">
                <li v-if="$route.path=='/user/mybook'">私密古籍</li>
            </router-link>
        </div>
        <div class="my_collection">
            <router-link to="/user/collection">
                <span>我的收藏</span>
            </router-link>
        </div>
        <div class="my_offer">
            <router-link to="/user/offer">
                <span>我的贡献</span>
            </router-link>
            <router-link to="/user/offer">
                <li v-if="$route.path=='/user/offer'">本体编辑</li>
            </router-link>
            <router-link to="/user/mark">
                <li v-if="$route.path=='/user/offer'">本体标记</li>
            </router-link>
            <router-link to="/user/revise">
                <li v-if="$route.path=='/user/offer'">修订</li>
            </router-link>
            <router-link to="/user/comment">
                <li v-if="$route.path=='/user/offer'">批注</li>
            </router-link>
        </div>
    </div>
</template>

<script>
//    export default{
//        data(){}
//    }
</script>

<style>
    .upload{
        margin:5px;
        background-color: black;
    }
    .mybook{
        margin:5px;
        background-color: black;
    }
    .my_collection{
        margin:5px;
        background-color: black;
    }
    .my_offer{

        background-color: black;
        margin:5px;
    }
</style>