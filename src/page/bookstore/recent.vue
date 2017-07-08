<template>
    <div class="j-recent">
        <recent_title class="j-recent-bar" :title="this.title"></recent_title>
        <div v-for="item in recent_book" class="j-picture-name" >
            <img id=item.id src="" class="j-picture" alt="最近古籍" @click="push_success()">
            <p style="color: #0f0f0f; text-align: center" @click="push_success()">{{item.standardName}}</p>
        </div>
    </div>
</template>

<script>
    import recent_title from '../../component/noumenon-title.vue'
    export default{
        components:{
            recent_title
        },
        created() {
            this.get_id();
//            window.setTimeout("get_picture()", 2000);
        },
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
                recent_id:'',
                length: 0
            }
        },
        methods: {
            get_id(){
                this.http_json(this.id_url, 'get',{}, this.success_id, this.fail_id);

            },
            success_id(response){
                this.recent_book = response.body;
                this.length = response.body.length;
                console.log(this.length);
//                for (let i = 0; i < response.body.length; i++) {
//                    let id_url = '';
////                    this.book_cover = {
////                        'book': '1',
////                        'volume': '1',
////                        'page': '1',
////                        'ancient_book_id': response.body[i].id
////                    };
//                  }
                this.get_picture();
            },
            get_picture(){
                console.log(this.length);
                for(let i = 0; i < this.length; i++) {
                    console.log( this.recent_book[i].id);
                    let item = this.picture_page_url + '?book=' + '1' + '&&volume=' + '1' + '&&page=' + '1' + '&&ancient_book_id=' + this.recent_book[i].id;
                    this.recent_id = this.recent_book[i].id;
                    this.http_json(item, 'get', item, this.success_page, this.fail_id);
                }
            },


            fail_id(){

            },
            success_page(response){
//                this.page_id = response.body.id;
                let id_url = '';
                id_url = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.recent_id).src = id_url;
            },

            push_success(){
                this.$router.push({path: '/bookstore/book_info'});
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
        margin-top: 40px;
        margin-left: 90px;
        width: 200px;
        display: inline-block;
    }
    .j-picture{
        width: 200px;
        height: 200px;
    }
</style>
