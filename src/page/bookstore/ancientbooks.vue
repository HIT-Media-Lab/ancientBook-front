<template>
    <div class="j-sortbook">
        <p class="j-bls">
            <span v-model="bu">{{bu}}/</span>
            <span v-model="lei">{{lei}}/</span>
            <span v-model="shu">{{shu}}</span>
        </p>
        <div class="j-bls-book1">
            <a style="color: #8a6d3b;" v-for="(item,index) in books">
                <p class="j-bls-bookname" @click="go_to_book(item.ancient_book_id)">{{index+1}}、{{item.standard_name}}</p>
            </a>
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
                bu: '',
                lei:'',
                shu:'',
                book_url:'/ancient_books/search_ancient_book_by_bls.action',
                total_page: 1,
                books:[]
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
                this.books = [];
                if (this.$route.params.bu_id == undefined || this.$route.params.lei_id == undefined || this.$route.params.shu_id == undefined){
                    this.$router.push({path: '/bookstore'})
                }else {
                    let item = this.book_url + "?bu=" + this.$route.params.bu_id +"&&lei=" + this.$route.params.lei_id + "&&shu=" + this.$route.params.shu_id + "&&page_count=" + this.$route.params.pageId;
                    this.bu = this.$route.params.bu;
                    this.lei = this.$route.params.lei;
                    this.shu = this.$route.params.shu;
                    this.http_json(item, 'get', item, this.success1, this.fail1)
                }
            },
            success1(response){
                this.total_page = response.body.total_page;
                this.books = response.body.content;
            },
            fail1(){

            },
            go_to_book(id){
                this.$route.params.ancient_book_id = id;
                this.$router.push({name: 'book_info', params: this.$route.params});
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
        margin-left: 10px;
        margin-top: 35px;
    }
    .j-bls-book2{
        display: inline-block;
        margin-left: 180px;
        margin-top: 35px;
    }
    .j-bls-bookname{
        margin-bottom: 5px;
    }
    .j-bls-bookname:hover{
        color: #a50000;
    }
    .j-bls-page{
        margin-top: 50px;
        margin-left: auto;
    }
</style>