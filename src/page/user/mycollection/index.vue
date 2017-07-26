<template>
    <div class="all">
        <recent_title class="j-collection-bar" :title="this.title"></recent_title>
        <div class="j-collection">
            <div class="j-collection-div" v-for="(item,index) in content">
                <div  v-on:mouseover="show_edit1(index)" v-on:mouseout="shut_edit1(index)">
                    <div class="show-edit1">
                        <img style="margin-left: 60px" src="../../../assets/img/picture-button/white-pen.png" @click="">
                        <img src="../../../assets/img/picture-button/white-cross.png" @click="delete_book(item.ancient_book_id)">
                    </div>
                    <img :id="item.ancient_book_id" class="j-collection-img" @click="go_to_bookinfo(item.ancient_book_id)">
                </div>
                <p class="j-collection-p" @click="go_to_bookinfo(item.ancient_book_id)" :title="item.standard_name">{{item.standard_name}}</p>
            </div>
        </div>
        <page_button :max=this.total_page></page_button>
    </div>
</template>

<script>
    import recent_title from '../../../component/noumenon-title.vue'
    import page_button from '../../../component/paginator.vue'
    export default{
        components:{
            recent_title,
            page_button
        },
        created(){
            this.i = 0;
            this.content = [];
            let url = this.collection_url + '?page=' + this.$route.params.pageId;
            this.http_json(url, 'get', url, this.collection_success, this.collection_fail);
        },
        watch:{
            $route(){
                this.i = 0;
                this.content = [];
                let url = this.collection_url + '?page=' + this.$route.params.pageId;
                this.http_json(url, 'get', url, this.collection_success, this.collection_fail);
            }
        },
        data(){
            return{
                collection_url:'/ancient_books/get_ancient_book_list_by_user_collection.action',
                picture_page_url: "/ancient_books/get_page_id_by_jcy.action",
                picture_url: '/ancient_books/get_picture_by_id.action',
                delete_url: '/ancient_books/delete_collection.action',
                title: '我的收藏',
                total_page: 1,
                i: 0,
                content: []
            }
        },
        methods:{
            go_to_bookinfo(id){
                this.$route.params.ancient_book_id = id;
                this.$router.push({name: 'book_info', params: this.$route.params});
            },
            show_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0.9;
            },
            shut_edit1(index){
                document.getElementsByClassName('show-edit1')[index].style.opacity = 0;
            },
            collection_success(response){
                this.total_page = response.body.total_page;
                this.content = response.body.content;
                for (let i = 0; i < response.body.length; i++){
                    let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.content[i].ancient_book_id;
                    this.http_json(item, 'get', item, this.collection_pic_success, this.collection_fail);
                }
            },
            collection_pic_success(response){
                let picture_id_url1 = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.content[this.i].ancient_book_id).setAttribute("src", picture_id_url1);
                this.i = this.i + 1;

            },
            collection_fail(){

            },
            delete_book(id){
                this.params.id = id;
                this.http_json(this.delete_url, 'post', this.params, this.delete_book_success, this.delete_book_fail)
            },
            delete_book_success(response){
                window.location.reload();
            },
            delete_book_fail(response){
                alert(response.body.info);
            }
        }
    }
</script>

<style>
    .j-collection-bar{
        margin: -65px auto
    }
    .j-collection{
        margin: 100px auto;
        width: 900px ;
        height: 760px ;
    }
    .j-collection-div{
        float: left;
        margin-left: 70px;
        width: 120px;
        height: auto;
    }
    .j-collection-img{
        width: 120px;
        height: 170px;
    }
    .j-collection-p{
        height: 20px;
        margin-top: 3px;
        padding-bottom: 15px;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>