<template>
    <div>
        <p class="j-book-word" v-model="search_number">为您找到{{search_number}}条相关的古籍信息</p>
        <div class="j-searched-book" v-for="item in content">
            <div class="j-shi1">
                <router-link to="/bookstore/book_info">
                    <img src="../../assets/img/古籍封面1.jpg" alt="搜索古籍" class="j-book-img1">
                </router-link>
                <div class="j-book1-word">
                    <router-link to="/bookstore/book_info">
                        <p class="j-book1-word1" >{{item.name}}</p>
                    </router-link>
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
            this.get_search();
        },
        watch:{
            $route(){
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
                search_url: '/ancient_books/get_ancient_books_list_by_name.action'
            }
        },
        methods:{
            get_search(){
                this.search_content = this.$store.getters.get_search_content;
                let url = this.search_url + '?name=' + this.search_content + '&&page_count=' + this.$route.params.pageId;
                this.http_json( url, 'get', url, this.success1, this.fail1)
            },
            success1(response){
                this.search_number = response.body.total_number;
                this.total_page = response.body.total_page;
                console.log(this.content.length);
                for (let i = 0; i < response.body.content; i++){
//                    this.content[i].name =  response.body.content[i].name;
//                    this.content[i].id =  response.body.content[i].id;
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
                    console.log(this.content);
                }
            },
            fail1(){

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
        display: inline-block;
        margin-left: 35px;
    }
    .j-book1-word1{
        color: #0f0f0f;
        text-decoration: underline;
        margin-bottom: 20px;
        font-weight: 900;
        display: inline-block;
    }
    .j-book1-word1:hover{
        color: brown;
    }
</style>