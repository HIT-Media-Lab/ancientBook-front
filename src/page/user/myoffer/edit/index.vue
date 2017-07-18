<template>
    <div class="all">
        <recent_title class="j-edit-bar" :title="'我的贡献/本体编辑' + '（共' + this.count + '条）'">
            <select class="j-edit-select" v-model="sort_name" slot="children" @change="go_to_sort">
                <option>全部本体</option>
                <option>人物本体</option>
                <option>文献本体</option>
                <option>术语本体</option>
                <option>时间本体</option>
                <option>职官本体</option>
                <option>机构本体</option>
                <option>地点本体</option>
            </select>
        </recent_title>
        <div class="j-edit">
            <table class="table table-bordered j-table-box">
                <thead>
                <tr>
                    <th style="width: 400px">本体名称</th>
                    <th style="width: 200px">贡献</th>
                    <th style="width: 200px">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in content"> <!--v-for循环数据里的数组数据-->
                    <td class="j-edit-table" style="width: 400px" :title="item.standard_name">{{item.standard_name}} {{item.noumenon_type}}</td>
                    <td class="j-edit-table" style="width: 200px" :title="item.standard_name">{{item.edit_type}}</td>
                    <td class="j-edit-table" style="width: 200px" :title="item.standard_name">{{item.time}}</td>
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
            if (this.$route.params.content == '全部本体'){
                this.content = [];
                let item = this.all_edit_url + '?page_count=' + this.$route.params.pageId;
                this.http_json(item, 'get', item, this.edit_all_success, this.edit_all_fail);
            }else {
                this.sort();
            }
        },
        watch:{
            $route(){
                if (this.$route.params.content == '全部本体'){
                    this.content = [];
                    let item = this.all_edit_url + '?page_count=' + this.$route.params.pageId;
                    this.http_json(item, 'get', item, this.edit_all_success, this.edit_all_fail);
                }else {
                    this.sort();
                }
            }
        },
        data(){
            return{
                all_edit_url: '/ancient_books/get_noumenon_log_by_user.action',
                sort_edit_url: '/ancient_books/get_noumenon_log_by_user_class.action',
                total_page: 1,
                count: 0,
                content: [],
                type: 0,
                sort_name: '全部本体'
            }
        },
        methods:{
            edit_all_success(response){
                this.total_page = response.body.total_page;
                this.count = response.body.count;
                for (let i = 0; i < response.body.content.length; i++){
                    let edit_type = '';
                    let type = '';
                    if (response.body.content[i].operation_type == 1){
                        edit_type = '创建本体';
                    }else if (response.body.content[i].operation_type == 0){
                        edit_type = '编辑本体';
                    }
                    if (response.body.content[i].noumenon_type == 1){
                        type = ' 【人物】';
                    }else if (response.body.content[i].noumenon_type == 2){
                        type = ' 【文献】';
                    }else if (response.body.content[i].noumenon_type == 3){
                        type = ' 【术语】';
                    }else if (response.body.content[i].noumenon_type == 4){
                        type = ' 【时间】';
                    }else if (response.body.content[i].noumenon_type == 5){
                        type = ' 【职官】';
                    }else if (response.body.content[i].noumenon_type == 6){
                        type = ' 【机构】';
                    }else if (response.body.content[i].noumenon_type == 7){
                        type = ' 【地点】';
                    }
                    this.content.push ({
                        standard_name: response.body.content[i].standard_name,
                        edit_type: edit_type,
                        time: response.body.content[i].time,
                        noumenon_type: type,
                        noumenon_id: response.body.content[i].noumenon_id
                    })
                }
            },
            edit_all_fail(){

            },
            go_to_sort(){
                this.content = [];
                console.log(this.sort_name);
                if (this.sort_name == '全部本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '全部本体';
                    this.$router.push({name: 'edit', params:this.$route.params})
                }else if (this.sort_name == '人物本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '人物本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 1
                }else if (this.sort_name == '文献本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '文献本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 2
                }else if (this.sort_name == '术语本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '术语本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 3
                }else if (this.sort_name == '时间本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '时间本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 4
                }else if (this.sort_name == '职官本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '职官本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 5
                }else if (this.sort_name == '机构本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '机构本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 6
                }else if (this.sort_name == '地点本体'){
                    this.$route.params.pageId = 1;
                    this.$route.params.content = '地点本体';
                    this.$router.push({name: 'edit', params:this.$route.params});
                    this.type = 7
                }
            },
            sort(){
                let url = this.sort_edit_url + '?type=' + this.type + '&&page_count=' + this.$route.params.pageId;
                this.http_json(url, 'get', url, this.edit_sort_success, this.edit_all_fail)
            },

            edit_sort_success(response){
                this.count = response.body.count;
                this.total_page = response.body.total_page;
                for (let i = 0; i < response.body.content.length; i++){
                    let edit_type = '';
                    let type = '';
                    if (response.body.content[i].operation_type == 1){
                        edit_type = '创建本体';
                    }else if (response.body.content[i].operation_type == 0){
                        edit_type = '编辑本体';
                    }
                    if (this.$route.params.content == '人物本体'){
                        type = ' 【人物】';
                    }else if (this.$route.params.content == '文献本体'){
                        type = ' 【文献】';
                    }else if (this.$route.params.content == '术语本体'){
                        type = ' 【术语】';
                    }else if (this.$route.params.content == '时间本体'){
                        type = ' 【时间】';
                    }else if (this.$route.params.content == '职官本体'){
                        type = ' 【职官】';
                    }else if (this.$route.params.content == '机构本体'){
                        type = ' 【机构】';
                    }else if (this.$route.params.content == '地点本体'){
                        type = ' 【地点】';
                    }
                    this.content.push ({
                        standard_name: response.body.content[i].standard_name,
                        edit_type: edit_type,
                        time: response.body.content[i].time,
                        noumenon_type: type,
                        noumenon_id: response.body.content[i].noumenon_id
                    })
                }
            }
        }
    }
</script>

<style>
    .j-edit-bar{
        margin: -65px auto
    }
    .j-edit-select{
        margin-top: 70px;
        float: right;
    }
    .j-edit{
        margin: 110px auto  40px  auto;
        width: 900px ;
        height: auto ;
    }
    .j-table-box {
        width:900px;
        table-layout: fixed;    /*表格每个宽度确定*/
        text-align: center;
    }
    .j-edit-table{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis
    }
</style>