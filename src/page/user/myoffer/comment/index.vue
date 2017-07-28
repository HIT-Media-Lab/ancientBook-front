<template>
    <div class="all">
        <recent_title class="j-comment-bar" :title="'我的贡献/批注' + '（共' + this.count + '条）'">
            <select class="j-comment-select" v-model="sort_name" slot="children" @change="go_to_sort">
                <option class="j-option">公开批注</option>
                <option class="j-option">私密批注</option>
            </select>
        </recent_title>
        <div class="j-comment">
            <table class="table table-bordered j-table-box">
                <thead>
                <tr>
                    <th style="width: 200px">批注对象</th>
                    <th style="width: 400px">批注内容</th>
                    <th style="width: 200px">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in content"> <!--v-for循环数据里的数组数据-->
                    <td class="j-comment-table" style="width: 200px" :title="item.standard_name" @click="go_to_book(item.page_id)">{{item.target}}</td>
                    <td class="j-comment-table" style="width: 400px" :title="item.standard_name" @click="go_to_book(item.page_id)">{{item.content}}</td>
                    <td class="j-comment-table" style="width: 200px" :title="item.standard_name">{{item.time}}</td>
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
            this.sort_name = this.$route.params.content;
            this.content = [];
            if (this.sort_name == '公开批注'){
                let item = this.all_comment_url + '?page_count=' + this.$route.params.pageId + '&&pri=' + 0;
                this.http_json(item, 'get', item, this.comment_all_success, this.comment_all_fail);
            } else if (this.sort_name == '私密批注'){
                let item = this.all_comment_url + '?page_count=' + this.$route.params.pageId + '&&pri=' + 1;
                this.http_json(item, 'get', item, this.comment_all_success, this.comment_all_fail);
            }
        },
        watch:{
            $route(){
                this.sort_name = this.$route.params.content;
                this.content = [];
                if (this.sort_name == '公开批注'){
                    let item = this.all_comment_url + '?page_count=' + this.$route.params.pageId + '&&pri=' + 0;
                    this.http_json(item, 'get', item, this.comment_all_success, this.comment_all_fail);
                } else if (this.sort_name == '私密批注'){
                    let item = this.all_comment_url + '?page_count=' + this.$route.params.pageId + '&&pri=' + 1;
                    this.http_json(item, 'get', item, this.comment_all_success, this.comment_all_fail);
                }
            }
        },
        data(){
            return{
                all_comment_url: '/ancient_books/get_comment_list_by_user.action',
                page_id_url: '/ancient_books/get_page_by_id.action',
                total_page: 1,
                count: 0,
                content: [],
                sort_name: '公开批注',
                page_id: ''
            }
        },
        methods:{
            comment_all_success(response){
                this.total_page = response.body.total_page;
                this.count = response.body.count;
                this.content = response.body.content;
            },
            comment_all_fail(){

            },
            go_to_sort(){
                this.content = [];
                if (this.sort_name == '公开批注'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '公开批注';
                    this.$router.push({name: 'comment', params:this.$route.params})
                }else if (this.sort_name == '私密批注'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '私密批注';
                    this.$router.push({name: 'comment', params:this.$route.params});
                }
            },
            go_to_book(page_id){
                let url = this.page_id_url + '?page_id=' + page_id;
                this.page_id = page_id;
                this.http_json(url, 'get', url, this.page_success, this.page_fail);
            },
            page_success(response){
                this.$route.params.page_id = this.page_id;
                this.$route.params.book_name = response.body.name;
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
    .j-comment-bar{
        margin: -65px auto
    }
    .j-comment-select{
        margin-top: 70px;
        float: right;
    }
    .j-comment{
        margin: 110px auto  40px  auto;
        width: 900px ;
        height: auto ;
    }
    .j-table-box {
        width:900px;
        table-layout: fixed;    /*表格每个宽度确定*/
        text-align: center;
    }
    .j-comment-table{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
</style>