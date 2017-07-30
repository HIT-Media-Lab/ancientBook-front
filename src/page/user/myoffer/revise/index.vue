<!--修订页面-->
<template>
    <div class="all">
        <recent_title class="j-revise-bar" :title="'我的贡献/修订' + '（共' + this.count + '条）'"></recent_title>
        <div class="j-revise">
            <table class="table table-bordered j-table-box">
                <thead>
                <tr>
                    <th style="width: 400px">修订对象</th>
                    <th style="width: 200px">修订版本</th>
                    <th style="width: 200px">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in content"> <!--v-for循环数据里的数组数据-->
                    <td class="j-revise-table all-link" style="width: 400px" :title="item.standard_name" @click="go_to_book(item.page_id, item.ancient_book_standard_name)">{{item.ancient_book_standard_name}}</td>
                    <td class="j-revise-table" style="width: 200px" :title="item.standard_name">{{item.version}}</td>
                    <td class="j-revise-table" style="width: 200px" :title="item.standard_name">{{item.time}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <page_button :max = this.total_page></page_button>
    </div>
</template>

<script>

    import recent_title from '../../../../component/noumenon-title.vue'
    import page_button from '../../../../component/paginator.vue'
    export default{
        components:{
            recent_title,
            page_button
        },
        created(){
            /**
             *获得修订列表
             */
            this.content = [];
            let item = this.all_revise_url + '?page_count=' + this.$route.params.pageId;
            this.http_json(item, 'get', item, this.revise_all_success, this.revise_all_fail);
        },
        watch:{
            $route(){
                this.content = [];
                let item = this.all_revise_url + '?page_count=' + this.$route.params.pageId;
                this.http_json(item, 'get', item, this.revise_all_success, this.revise_all_fail);
            }
        },
        data(){
            return{
                all_revise_url: '/ancient_books/get_ancient_book_modify_log_by_user.action',
                page_id_url: '/ancient_books/get_page_by_id.action',
                total_page: 1,
                count: 0,
                content: [],
                page_id: '',
                standard_name: ''

            }
        },
        methods:{
            revise_all_success(response){
                this.total_page = response.body.total_page;
                this.count = response.body.count;
                this.content = response.body.content;
            },
            revise_all_fail(){

            },
            /**
             *获取page_id
             */
            go_to_book(page_id, standard_name){
                let url = this.page_id_url + '?page_id=' + page_id;
                this.page_id = page_id;
                this.standard_name = standard_name;
                this.http_json(url, 'get', url, this.page_success, this.page_fail);
            },
            /**
             *跳转到图文对照页面
             */
            page_success(response){
                this.$route.params.page_id = this.page_id;
                this.$route.params.book_name = this.standard_name;
                this.$route.params.book = response.body.ce;
                this.$route.params.volume = response.body.juan;
                this.$route.params.pageId = response.body.ye;
                this.$router.push({name: 'ancientbook', params: this.$route.params});
            },
            page_fail(){

            }
        }
    }
</script>

<style>
    .j-revise-bar{
        margin: -65px auto
    }
    .j-revise{
        margin: 110px auto  40px  auto;
        width: 900px ;
        height: auto ;
    }
    .j-table-box {
        width:900px;
        table-layout: fixed;
        text-align: center;
    }
    .j-revise-table{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
</style>