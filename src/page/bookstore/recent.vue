<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>
        <div v-for="item in recent_book" class="j-picture-name">
            <img v-bind:id=item.id src="" class="j-picture" alt="最近古籍">
            <p style="color: #0f0f0f; text-align: center">{{item.standardName}}</p>
        </div>
    </div>
</template>

<script>
    import recent_title from '../../component/noumenon-title.vue'
    export default{
        components:{
            recent_title
        },
//        created: function () {
//            this.get_id();
//        },
        data(){
            return{
                title: '最近',
                recent_book: [],
                book_id: [],
                book_name: [],
                id_url:'/ancient_books/get_recient_ancient_book_list.action',
                picture_url: '/ancient_books/get_picture_by_id.action',
                picture_page_url: "/ancient_books/get_page_id_by_jcy.action",
                book_cover:{},
                page_id: '',
            }
        },
        methods: {
//            get_id(){
//                this.http_json(this.id_url, 'get',{}, this.success_id, this.fail_id);
//                console.log("最近");
//            },
//            success_id(response){
//                for (let i = 0; i < response.body.length; i++) {
//                    let id_url = '';
//                    console.log("获得最近古籍没问题");
//                    this.recent_book[i] = response.body[i];
//                    this.book_cover = {
//                        'book': '1',
//                        'volume': '1',
//                        'page': '1',
//                        'ancient_book_id': response.body[i].id
//                    };
//                    this.http_json(this.picture_page_url, 'get', this.book_cover, this.success_page, this.fail_id);
//                    id_url = this.picture_url + '?page_id=' + this.page_id;
//                    document.getElementById(response.body[i].id).src = id_url;
//                    console.log("得到最近成功")
//                }
//            },
//            fail_id(){
//
//            },
//            success_page(response){
//                this.page_id = response.id
//            },

            push_success(){

            }
        }
    }
</script>

<style>
    .j-recent{
        height: auto;
    }
    .j-recent-bar{
        margin: 0 auto;
    }
    .j-picture-name{
        margin-top: 20px;
        margin-left: 60px;
        width: 200px;
        display: inline-block;
    }
    .j-picture{
        width: 200px;
        height: 200px;
    }
</style>
