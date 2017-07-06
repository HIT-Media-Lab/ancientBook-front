<template>
    <div class="j-sortbook">
        <p class="j-bls">
            <span v-model="bu">{{bu}}/</span>
            <span v-model="lei">{{lei}}/</span>
            <span v-model="shu">{{shu}}</span>
        </p>
        <div class="j-bls-book1">
            <router-link to="/bookstore/book_info" style="color: #8a6d3b;" v-for="item in books">
                <p class="j-bls-bookname">{{item}}</p>
            </router-link>
        </div>
        <div class="j-bls-page">
            <page_button :max=this.total_page></page_button>
        </div>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
            page_button
        },
        data(){
            return{
                bls: {},
                bls_name: {},
                bu: '',
                lei:'',
                shu:'',
                book_url:'/ancient_books/search_ancient_book_by_bls.action',
                total_page: 0,
                content_name:[],
                content_id:[],
                books:[],
            }
        },
        created: function () {
            this.get_bls();
        },
        watch:{
            $route(){
                this.get_bls();
            }
        },
        methods: {
            get_bls(){
                this.bls = this.$store.getters.get_bls;
                this.bls_name = this.$store.getters.get_bls_name;
                let item = this.book_url + "?bu=" + this.bls.bu +"&&lei=" + this.bls.lei + "&&shu=" + this.bls.shu + "&&page_conut=" + this.$route.params.pageId;
                this.bu = this.bls_name.bu;
                this.lei = this.bls_name.lei;
                this.shu = this .bls_name.shu;
                this.http_json(item, 'get', item, this.success1, this.fail1)
            },
            success1(response){
                this.books = [];
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++){
                    this.content_name[i] = response.body.content[i].standard_name;
                    this.content_id[i] = response.body.content[i].ancient_book_id;
                }
                for (let i = 0; i < 20; i++){
                    this.books[i] = this.content_name[i];
                    console.log(this.content_name[i]);
                    console.log(this.books[i]);
                }
                console.log(this.books);
            },
            fail1(){

            }
        }
    }
</script>

<style>
    .j-sortbook{
        margin: 0 auto;
        width: 900px;
        height: 500px;
    }
    .j-bls{
        margin-top: 20px;
        font-size: 20px;
    }
    .j-bls-book1{
        display: inline-block;
        margin-left: 180px;
        margin-top: 35px;
    }
    .j-bls-book2{
        display: inline-block;
        margin-left: 180px;
        margin-top: 35px;
    }
    .j-bls-bookname{
        margin-bottom: 20px;
    }
    .j-bls-page{
        margin-top: 50px;
        margin-left: auto;
    }
</style>