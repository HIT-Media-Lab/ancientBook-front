`<template>
    <div class="all">
        <recent_title class="j-mybook-bar" :title="this.title"></recent_title>
        <div class="j-mybook">
            <p class="j-mybook-recent-name">最近</p>
            <div class="j-mybook-recent-img">
                <div class="j-mybook-recent-div" v-for="item in recent_mybook">
                    <img :id = "item.ancient_book_id" class="j-mybook-recent-img1" @click="go_to_bookinfo(item.ancient_book_id)">
                    <p class="j-mybook-p" @click="go_to_bookinfo(item.ancient_book_id)" :title="item.standard_name">{{item.standard_name}}</p>
                </div>
            </div>
            <p class="j-mybook-recent-name">已上传</p>
            <div class="j-mybook-al-img">
                <div class="j-mybook-recent-div" v-for="(item,index) in al_up_book">
                    <div v-on:mouseover="show_edit1(index)" v-on:mouseout="shut_edit1(index)">
                        <div class="show-edit1">
                            <img style="margin-left: 60px" src="../../../assets/img/picture-button/white-pen.png" @click="">
                            <img src="../../../assets/img/picture-button/white-cross.png">
                        </div>
                        <img :id = "item.ancient_book_id" class="j-mybook-recent-img1" @click="go_to_bookinfo(item.ancient_book_id)">
                    </div>
                    <p class="j-mybook-p" @click="go_to_bookinfo(item.ancient_book_id)" :title="item.standard_name">{{item.standard_name}}</p>
                </div>
                <div class="j-mybook-morelink" v-show="show_more1">
                    <span class="j-mybook-more" @click="go_to_more_upbook">更多</span>
                    <img src="../../../assets/img/picture-button/more_logo.png" @click="go_to_more_upbook">
                </div>
            </div>
            <p class="j-mybook-recent-name">私密古籍</p>
            <div class="j-mybook-al-img">
                <div class="j-mybook-recent-div" v-for="(item,index) in private_book">
                    <div>
                        <div class="show-edit2" v-on:mouseover="show_edit2(index)" v-on:mouseout="shut_edit2(index)">
                            <img style="margin-left: 60px" src="../../../assets/img/picture-button/white-pen.png">
                            <img src="../../../assets/img/picture-button/white-cross.png">
                        </div>
                        <img :id = "item.ancient_book_id + 's'" class="j-mybook-recent-img1" @click="go_to_bookinfo(item.ancient_book_id)">
                    </div>
                    <p class="j-mybook-p" @click="go_to_bookinfo(item.ancient_book_id)" :title="item.standard_name">{{item.standard_name}}</p>
                </div>
                <div class="j-mybook-morelink" v-show="show_more2">
                    <span class="j-mybook-more" @click="go_to_more_privatebook">更多</span>
                    <img src="../../../assets/img/picture-button/more_logo.png"  @click="go_to_more_privatebook">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../../store'
    import recent_title from '../../../component/noumenon-title.vue'
    export default{
        components: {
            recent_title
        },
        created(){
            this.recent_mybook = [];
            this.al_up_book = [];
            this.private_book = [];
            this.http_json(this.recent_mybook_url, 'get', {}, this.recbook_success, this.recbook_fail);
            this.http_json(this.upload_book_url, 'get', {}, this.up_success, this.recbook_fail);
            this.http_json(this.private_book_url, 'get', {}, this.private_get_success, this.recbook_fail)
        },
        data(){
            return{
                recent_mybook_url: '/ancient_books/get_recent_ancient_books_list_edited_by_user.action',
                upload_book_url: '/ancient_books/get_recient_ancient_books_list_by_user_upload.action',
                private_book_url: '/ancient_books/get_recent_private_ancient_books_by_user.action',
                picture_page_url: "/ancient_books/get_page_id_by_jcy.action",
                picture_url: '/ancient_books/get_picture_by_id.action',
                title: '我的古籍',
                recent_mybook: [],
                al_up_book: [],
                private_book: [],
                i: 0,
                j: 0,
                k: 0,
                show_more1: true,
                show_more2: true,
                name: ''
            }
        },
        methods: {
            show_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0.9;
            },
            shut_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0;
            },
            show_edit2(index){
                document.getElementsByClassName('show-edit2')[index].style.opacity = 0.9;
            },
            shut_edit2(index){
                document.getElementsByClassName('show-edit2')[index].style.opacity = 0;
            },
            go_to_bookinfo(item){
                this.$store.commit("push_ancient_book_id", item);
                this.$router.push({path: '/bookstore/book_info'});
            },
            go_to_more_privatebook(){
                this.$route.params.pageId = 1;
                this.$router.push({name: 'privatebook', params: this.$route.params});
            },
            go_to_more_upbook(){
                this.$route.params.pageId = 1;
                this.$router.push({name: 'alupload', params: this.$route.params});
            },
            recbook_success(response){
                this.recent_mybook = response.body.content;
                for (let i = 0; i < response.body.content.length; i++){
                    let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.recent_mybook[i].ancient_book_id;
                    this.http_json(item, 'get', item, this.success_page1, this.recbook_fail);
                }
            },
            up_success(response){
                this.al_up_book = response.body;
                if (response.body.length == 3){
                    this.show_more1 = true;
                }else{
                    this.show_more1 = false ;
                }
                for (let i = 0; i < response.body.length; i++){
                    let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.al_up_book[i].ancient_book_id;
                    this.http_json(item, 'get', item, this.success_page2, this.recbook_fail);
                }
            },
            private_get_success(response){
                this.private_book = response.body.content;
                console.log("hhh");
                if (response.body.content.length == 3){
                    this.show_more2 = true;
                }else {
                    this.show_more2 = false;
                }
                for (let a = 0; a < response.body.content.length; a++){
                    let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.private_book[a].ancient_book_id;
                    this.http_json(item, 'get', item, this.success_page3, this.recbook_fail);
                }
            },
            success_page1(response){
                let picture_id_url1 = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.recent_mybook[this.i].ancient_book_id).setAttribute("src", picture_id_url1);
                this.i = this.i + 1;
            },
            success_page2(response){
                let picture_id_url2 = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.al_up_book[this.j].ancient_book_id).setAttribute("src", picture_id_url2);
                this.j = this.j + 1;
            },
            success_page3(response){
                console.log(this.k);
                let picture_id_url3 = this.picture_url + '?page_id=' + response.body.id;
                console.log(picture_id_url3);
                document.getElementById(this.private_book[this.k].ancient_book_id + 's').setAttribute("src", picture_id_url3);
                this.k = this.k + 1;
            },
            recbook_fail(){

            }
        }
    }
</script>

<style>
    .j-mybook-bar{
        margin: -65px auto;
    }
    .j-mybook{
        margin: 80px auto;
        width: 900px ;
        height: auto ;
    }
    .j-mybook-recent-name{
        margin-left: 60px;
        width: 70px;
        font-weight:700;
        font-style:normal;
        font-size:16px;
        color: black;
    }
    .j-mybook-recent-img{
        margin-top: 10px;
        width: auto;
        height: 198px;
    }
    .j-mybook-recent-img1{
        width: 120px;
        height: 170px;
    }
    .j-mybook-recent-div{
        float: left;
        margin-left: 70px;
        width: 120px;
        height: auto;
    }
    .j-mybook-p{
        margin-top: 3px;
        color: #0f0f0f;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .j-mybook-al-img{
        margin-top: 10px;
        width: auto;
        height: 198px;
    }
    .j-mybook-more{
        font-weight: 600;
        font-style:normal;
        font-size:18px;
        color: black;
    }
    .j-mybook-morelink{
        height: 30px;
        display: inline-block;
        margin-top: 80px;
        margin-left: 80px;
    }
    .show-edit1{
        width: 120px;
        height: 30px;
        background-color: brown;
        opacity:0;
        position:absolute;
    }
    .show-edit2{
        width: 120px;
        height: 30px;
        background-color: brown;
        opacity:0;
        position:absolute;
    }
</style>


