<template>
    <div class="j-search-all">
        <ul class="nav nav-tabs">
            <li id="j-book-button" class="active" @click="remove_noumenon_link">
                <a data-toggle="tab">
                    古籍库
                </a>
            </li>
            <li id="j-noumenon-button" @click="remove_book_link">
                <a data-toggle="tab">
                    本体库
                </a>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        beforeRouteUpdate (to, from, next) {
            if (to.name == "search_book"){
                this.remove_noumenon();
                next();
            }else if(to.name == "search_noumenon") {
                this.remove_book();
                next();
            }else {
                next();
            }
        },
        data() {
            return{

            }
        },
        mounted() {
          this.change_button()
        },
        methods : {
            remove_book() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "";
                noumenon_button.className = "active";
            },
            remove_book_link() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "";
                noumenon_button.className = "active";
                this.this.$route.params.pageId = 1;
                this.$router.push({name: 'search_noumenon', params: this.$route.params})
            },
            remove_noumenon() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "active";
                noumenon_button.className = "";
            },
            remove_noumenon_link() {
                let book_button = document.getElementById("j-book-button");
                let noumenon_button = document.getElementById("j-noumenon-button");
                book_button.className = "active";
                noumenon_button.className = "";
                this.this.$route.params.pageId = 1;
                this.$router.push({name: 'search_book', params: this.$route.params})
            },
            change_button(){
                if(this.$route.name == "search_book"){
                    this.remove_noumenon()
                }else if(this.$route.name == "search_noumenon"){
                    this.remove_book()
                }
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