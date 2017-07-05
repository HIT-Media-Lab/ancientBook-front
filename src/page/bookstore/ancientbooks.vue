<template>
    <div class="j-sortbook">
        <p class="j-bls">
            <!--经部/总类/正文之属-->
            <span v-model="bu">{{bu}}/</span>
            <span v-model="lei">{{lei}}/</span>
            <span v-model="shu">{{shu}}</span>
        </p>
        <div class="j-bls-book">
            <router-link to="/bookstore/book_info" style="color: #8a6d3b;">
                <p class="j-bls-bookname">1. 诗经(品种层责任者)</p>
            </router-link>
            <router-link to="/bookstore/book_info" style="color: #8a6d3b">
                <p class="j-bls-bookname">2. 山海经(品种层责任者)</p>
            </router-link>
        </div>
        <div class="j-bls-page">
            <page_button :max="total_page"></page_button>
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
                bu: 0,
                lei:0,
                shu:0,
                book_url:'/ancient_books/search_ancient_book_by_bls.action',
                total_page: 0,
                content_name:[],
                content_id:[]
            }
        },
        created: function () {
            this.get_bls();
        },
        methods: {
            get_bls(){
                this.bls = this.$store.getters.get_bls;
                let item = this.book_url + "?bu=" + this.bls.bu +"&&lei=" + this.bls.lei + "&&shu=" + this.bls.shu + "&&page_conut=" + "1";
                this.bu = this.bls.bu;
                this.lei = this.bls.lei;
                this.shu = this .bls.shu;
                this.http_json(this.book_url, 'get', item, this.success1, this.fail1)
            },
            success1(response){
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++){
                    this.content_name[i] = response.body.content[i].standard_name;
                    this.content_id[i] = response.body.content[i].ancient_book_id;
                }

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
    .j-bls-book{
        display: inline-block;
        margin-left: 45px;
        margin-top: 35px;
    }
    .j-bls-bookname{
        margin-bottom: 20px;
    }
    .j-bls-page{
        margin-top: 200px;
        margin-left: auto;
    }
</style>