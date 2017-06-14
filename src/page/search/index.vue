<template>
    <div class="j-search-all">
        <ul class="nav nav-tabs">
            <li id="j-book-button" class="active" @click="remove_noumenon">
                <router-link to="/search_index" data-toggle="tab">
                    古籍库
                </router-link>
            </li>
            <li id="j-noumenon-button" @click="remove_book">
                <router-link to="/search_index/search_noumenon" data-toggle="tab">
                    本体库
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        data() {
            return{

            }
        },
        methods : {
            remove_book() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "";
                noumenon_button.className = "active";
            },
            remove_noumenon() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "active";
                noumenon_button.className = "";
            }
        }
    }
</script>

<style>
    .j-search-all{
        margin: 50px auto;
        width: 1000px;
        height: 500px;
    }
    .j-search-button{
        padding: 10px;
        border: 1px solid black;
        border-bottom-color: transparent ;
    }
</style>