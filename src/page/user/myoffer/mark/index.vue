<!--本体标记页面-->
<template>
    <div class="all">
        <recent_title class="j-mark-bar" :title="'我的贡献/本体标记' + '（共' + this.count + '条）'">
            <select class="j-mark-select" v-model="sort_name" slot="children" @change="go_to_sort">
                <option class="j-option">全部本体</option>
                <option class="j-option">人物本体</option>
                <option class="j-option">文献本体</option>
                <option class="j-option">术语本体</option>
                <option class="j-option">时间本体</option>
                <option class="j-option">职官本体</option>
                <option class="j-option">机构本体</option>
                <option class="j-option">地点本体</option>
            </select>
        </recent_title>
        <div class="j-mark">
            <table class="table table-bordered j-table-box">
                <thead>
                <tr>
                    <th style="width: 200px">本体名称</th>
                    <th style="width: 400px">文本内容</th>
                    <th style="width: 200px">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in content"> <!--v-for循环数据里的数组数据-->
                    <td class="j-mark-table all-link" style="width: 200px" :title="item.standard_name" @click="go_to_noumenon(item.noumenon_id,item.noumenon_type)">{{item.standard_name}} {{item.noumenon_type}}</td>
                    <td class="j-mark-table all-link" style="width: 400px" :title="item.target" @click="go_to_book(item.page_id)">{{item.target}}</td>
                    <td class="j-mark-table " style="width: 200px" :title="item.time">{{item.time}}</td>
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
             *根据不同本体获得本体标记列表
             */
            this.content = [];
            this.sort_name = this.$route.params.content;
            if (this.$route.params.content == '全部本体'){
                this.content = [];
                let item = this.all_mark_url + '?page_count=' + this.$route.params.pageId;
                this.http_json(item, 'get', item, this.mark_all_success, this.mark_all_fail);
            }else {
                this.sort();
            }
        },
        watch:{
            $route(){
                this.content = [];
                this.sort_name = this.$route.params.content;
                if (this.$route.params.content == '全部本体'){
                    this.content = [];
                    let item = this.all_mark_url + '?page_count=' + this.$route.params.pageId;
                    this.http_json(item, 'get', item, this.mark_all_success, this.mark_all_fail);
                }else {
                    this.sort();
                }
            }
        },
        data(){
            return{
                all_mark_url: '/ancient_books/get_mark_list_by_user.action',
                sort_mark_url: '/ancient_books/get_mark_list_by_user_class.action',
                page_id_url: '/ancient_books/get_page_by_id.action',
                total_page: 1,
                count: 0,
                content: [],
                type: 0,
                sort_name: '全部本体',
                page_id: ''
            }
        },
        methods:{
            /**
             *接收数据，本地储存
             */
            mark_all_success(response){
                this.total_page = response.body.total_page;
                this.count = response.body.count;
                for (let i = 0; i < response.body.content.length; i++){
                    let type = '';
                    if (response.body.content[i].noumenon_type == 1){
                        type = '【人物】';
                    }else if (response.body.content[i].noumenon_type == 2){
                        type = '【文献】';
                    }else if (response.body.content[i].noumenon_type == 3){
                        type = '【术语】';
                    }else if (response.body.content[i].noumenon_type == 4){
                        type = '【时间】';
                    }else if (response.body.content[i].noumenon_type == 5){
                        type = '【职官】';
                    }else if (response.body.content[i].noumenon_type == 6){
                        type = '【机构】';
                    }else if (response.body.content[i].noumenon_type == 7){
                        type = '【地点】';
                    }
                    this.content.push ({
                        standard_name: response.body.content[i].noumenon_name,
                        page_id: response.body.content[i].page_id,
                        mark_id: response.body.content[i].mark_id,
                        time: response.body.content[i].time,
                        target: response.body.content[i].target,
                        noumenon_type: type,
                        noumenon_id: response.body.content[i].noumenon_id
                    })
                }
            },
            mark_all_fail(){

            },
            /**
             *  根据选择的不同选项，跳转不同本体的路由
             */
            go_to_sort(){
                this.content = [];
                console.log(this.sort_name);
                if (this.sort_name == '全部本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '全部本体';
                    this.$router.push({name: 'mark', params:this.$route.params})
                }else if (this.sort_name == '人物本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '人物本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 1
                }else if (this.sort_name == '文献本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '文献本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 2
                }else if (this.sort_name == '术语本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '术语本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 3
                }else if (this.sort_name == '时间本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '时间本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 4
                }else if (this.sort_name == '职官本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '职官本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 5
                }else if (this.sort_name == '机构本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '机构本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 6
                }else if (this.sort_name == '地点本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '地点本体';
                    this.$router.push({name: 'mark', params:this.$route.params});
                    this.type = 7
                }
            },
            sort(){
                if (this.sort_name == '人物本体'){
                    this.type = 1
                }else if (this.sort_name == '文献本体'){
                    this.type = 2
                }else if (this.sort_name == '术语本体'){
                    this.type = 3
                }else if (this.sort_name == '时间本体'){
                    this.type = 4
                }else if (this.sort_name == '职官本体'){
                    this.type = 5
                }else if (this.sort_name == '机构本体'){
                    this.type = 6
                }else if (this.sort_name == '地点本体'){
                    this.type = 7
                }
                let url = this.sort_mark_url + '?type=' + this.type + '&&page_count=' + this.$route.params.pageId;
                this.http_json(url, 'get', url, this.mark_sort_success, this.mark_all_fail)
            },

            mark_sort_success(response){
                this.count = response.body.count;
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++){
                    let type = '';
                    if (this.$route.params.content == '人物本体'){
                        type = '【人物】';
                    }else if (this.$route.params.content == '文献本体'){
                        type = '【文献】';
                    }else if (this.$route.params.content == '术语本体'){
                        type = '【术语】';
                    }else if (this.$route.params.content == '时间本体'){
                        type = '【时间】';
                    }else if (this.$route.params.content == '职官本体'){
                        type = '【职官】';
                    }else if (this.$route.params.content == '机构本体'){
                        type = '【机构】';
                    }else if (this.$route.params.content == '地点本体'){
                        type = '【地点】';
                    }
                    this.content.push ({
                        standard_name: response.body.content[i].noumenon_name,
                        page_id: response.body.content[i].page_id,
                        mark_id: response.body.content[i].mark_id,
                        time: response.body.content[i].time,
                        target: response.body.content[i].target,
                        noumenon_type: type,
                        noumenon_id: response.body.content[i].noumenon_id
                    })
                }
            },
            /**
             *跳转到本体详情
             */
            go_to_noumenon(id, type){
                this.$route.params.nouId = id;
                if (type == '【人物】'){
                    this.$router.push({name: 'char_detail', params: this.$route.params});
                }else if (type == '【文献】'){
                    this.$router.push({name: 'lit_detail', params: this.$route.params});
                }else if (type == '【术语】'){
                    this.$router.push({name: 'terms_detail', params: this.$route.params});
                }else if (type == '【时间】'){
                    this.$router.push({name: 'time_detail', params: this.$route.params});
                }else if (type == '【职官】'){
                    this.$router.push({name: 'off_detail', params: this.$route.params});
                }else if (type == '【机构】'){
                    this.$router.push({name: 'ins_detail', params: this.$route.params});
                }else if (type == '【地点】') {
                    this.$router.push({name: 'pla_detail', params: this.$route.params});
                }
            },
            go_to_book(page_id){
                let url = this.page_id_url + '?page_id=' + page_id;
                this.page_id = page_id;
                this.http_json(url, 'get', url, this.page_id_success, this.page_id_fail);
            },
            page_id_success(response){
                this.$route.params.page_id = this.page_id;
                this.$route.params.book_name = response.body.ancient_book_id;
                this.$route.params.book = response.body.ce;
                this.$route.params.volume = response.body.juan;
                this.$route.params.pageId = response.body.ye;
                this.$router.push({name: 'ancientbook', params: this.$route.params});
            },
            page_id_fail(){

            }
        }
    }
</script>

<style>
    .j-mark-bar{
        margin: -65px auto
    }
    .j-mark-select{
        margin-top: 70px;
        float: right;
    }
    .j-mark{
        margin: 110px auto  40px  auto;
        width: 900px ;
        height: auto ;
    }
    .j-table-box {
        width:900px;
        table-layout: fixed;
        text-align: center;
    }
    .j-mark-table{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
</style>