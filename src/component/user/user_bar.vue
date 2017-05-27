<template>
    <div>
        <div class="upload">
            <router-link to="/upload_step1">
                <span>上  传</span>
            </router-link>
        </div>
        <div class="mybook">
            <router-link to="/mybook_index">
                <span>我的古籍</span>
            </router-link>
            <router-link to="/alupload_index">
                <li v-if="$route.path=='/mybook_index'">已上传</li>
            </router-link>
            <router-link to="/private_books_index">
                <li v-if="$route.path=='/mybook_index'">私密古籍</li>
            </router-link>
        </div>
        <div class="my_collection">
            <router-link to="/my_collection_index">
                <span>我的收藏</span>
            </router-link>
        </div>
        <div class="my_offer">
            <router-link to="/my_offer_index">
                <span>我的贡献</span>
            </router-link>
            <router-link to="/my_offer_index">
                <li v-if="$route.path=='/my_offer_index'">本体编辑</li>
            </router-link>
            <router-link to="/noumenon_mark">
                <li v-if="$route.path=='/my_offer_index'">本体标记</li>
            </router-link>
            <router-link to="/revise">
                <li v-if="$route.path=='/my_offer_index'">修订</li>
            </router-link>
            <router-link to="/comment">
                <li v-if="$route.path=='/my_offer_index'">批注</li>
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