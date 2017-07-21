<template>
    <div>
        <p class="j-book-word" v-model="search_number">为您找到{{search_number}}条相关的古籍信息</p>
        <div class="j-searched-book" v-for="item in content">
            <div class="j-shi1">
                <a>
                    <img :id="item.id" alt="搜索古籍" class="j-book-img1" @click="go_to_book(item.id)">
                </a>
                <div class="j-book1-word">
                    <a>
                        <p class="j-book1-word1" :title="item.name" @click="go_to_book(item.id)">{{item.name}}</p>
                    </a>
                    <p>{{item.book_info1}}</p>
                    <p>{{item.book_info2}}</p>
                    <p>{{item.book_info3}}</p>
                    <p>{{item.book_info4}}</p>
                </div>
            </div>
        </div>
        <page_button :max=this.total_page></page_button>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
          page_button
        },
        created(){
            this.i = 0;
            this.get_search();
        },
        watch:{
            $route(){
                this.i = 0;
                this.get_search();
            }
        },
        data(){
            return{
                content: [],
                book_info: '',
                book_info_split: [],
                book_info1:'',
                book_info2:'',
                book_info3:'',
                book_info4:'',
                search_number: 0,
                search_content: '',
                total_page: 1,
                search_url: '/ancient_books/get_ancient_books_list_by_name.action',
                picture_id_url: '/ancient_books/get_page_id_by_jcy.action',
                picture_url: '/ancient_books/get_picture_by_id.action',
                i: 0
            }
        },
        methods:{
            change(a,b){
                if (a.name.length < b.name.length){
                    return -1
                }else {
                    return 1
                }
            },
            get_search(){
                this.search_content = this.$route.params.content;
                let url = this.search_url + '?name=' + this.search_content + '&&page_count=' + this.$route.params.pageId;
                this.http_json( url, 'get', url, this.success1, this.fail1)
            },
            success1(response){
                this.search_number = response.body.total_number;
                this.total_page = response.body.total_page;

                for (let i = 0; i < response.body.content.length; i++){
                    this.book_info_split = response.body.content[i].standard_name.split('[');
                    if (this.book_info_split.length > 1){
                        this.book_info1 = '[' + this.book_info_split[1];
                        this.book_info2 = '[' + this.book_info_split[2];
                        this.book_info3 = '[' + this.book_info_split[3];
                        this.book_info4 = '[' + this.book_info_split[4];
                    }else {
                        this.book_info_split = response.body.content[i].standard_name.split('【');
                        this.book_info1 = '【' + this.book_info_split[1];
                        this.book_info2 = '【' + this.book_info_split[2];
                        this.book_info3 = '【' + this.book_info_split[3];
                        this.book_info4 = '【' + this.book_info_split[4];
                    }
                    this.content.push({
                        name: response.body.content[i].name,
                        id: response.body.content[i].id,
                        book_info1: this.book_info1,
                        book_info2: this.book_info2,
                        book_info3: this.book_info3,
                        book_info4: this.book_info4
                    });
                    let item = this.picture_id_url + '?book=1' + '&&volume=1'+'&&page=1' + '&&ancient_book_id=' + response.body.content[i].id;
                    this.http_json(item, 'get', item, this.success_pic, this.fail_pic);
                }
            },
            fail1(){

            },
            success_pic(response){
                let url = this.picture_url + '?page_id=' + response.body.id;
                document.getElementById(this.content[this.i].id).setAttribute("src", url);
                this.i = this.i +1;
            },
            fail_pic(){

            },
            go_to_book(id){
                this.$store.commit('push_ancient_book_id', id);
                this.$router.push({path: '/bookstore/book_info'});
            }
        }
    }
</script>

<style>
    .j-shi1{
        margin-bottom: 50px;
    }
    .j-book-word{
        display: inline-block;
        margin-top: 30px;
    }
    .j-searched-book{
        margin-top: 30px;
    }
    .j-book-img1{
        width: 200px;
        vertical-align: top;
    }
    .j-book1-word{
        margin-top: 30px;
        display: inline-block;
        margin-left: 35px;
    }
    .j-book1-word1{
        color: #0f0f0f;
        text-decoration: underline;
        margin-bottom: 20px;
        font-weight: 900;
        display: inline-block;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .j-book1-word1:hover{
        color: brown;
    }
</style>