<!--搜索本体结果页面-->
<template>
    <div>
        <p class="j-noumenon-word" v-model="info_num">为您找到{{info_num}}条相关的本体信息</p>
        <div class="j-searched-noumenon" v-for="item in page_content">
            <a class="j-w" @click="go_to_nou_detail(item.type, item.noumenon_id)" :id="item.noumenon_id">{{item.standard_name}}  {{item.type}}</a>
            <br/>
        </div>
        <page_button v-model="total_page" :max=this.total_page></page_button>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
            page_button
        },
        created(){
            /**
             * 获得对应所有本体
             */
            if (this.content.length == 0){
                let item = this.content_url + '?name=' + this.$route.params.content;
                this.http_json(item, 'get', item, this.success_noumenon, this.fail);
            } else {
                this.page_content = [];
                this.print_content();
            }
        },
        watch:{
            $route(){
                if (this.content.length == 0){
                    let item = this.content_url + '?name=' + this.$route.params.content;
                    this.http_json(item, 'get', item, this.success_noumenon, this.fail);
                } else {
                    this.page_content = [];
                    this.print_content();
                }
            }
        },
        data(){
            return{
                info_num: 1,
                total_page: 1,
                content: [],
                page_content: [],
                content_url: '/ancient_books/get_all_noumenon_searched.action',
                character_url: '/ancient_books/get_person_list_by_name.action',
                location_url: '/ancient_books/get_location_list_by_name.action',
                office_url: '/ancient_books/get_office_list_by_name.action',
                term_url: '/ancient_books/get_technical_list_by_name.action',
                institution_url: '/ancient_books/get_institution_list_by_name.action',
                literature_url: '/ancient_books/get_literature_list_by_name.action'

            }
        },
        methods:{
            change(a,b){
                if (a.standard_name.length < b.standard_name.length){
                    return -1
                }else {
                    return 1
                }
            },
            /**
             *对本体进行分类，分组，并按字符串的长短排序
             */
            success_noumenon(response){
                for (let i = 0 ; i < response.body.content.length; i++){
                    let type = '';
                    if (response.body.content[i].type_id == 1){
                        type = '【人物】'
                    }
                    if(response.body.content[i].type_id == 2){
                        type = '【文献】'
                    }
                    if(response.body.content[i].type_id == 3){
                        type = '【术语】'
                    }
                    if(response.body.content[i].type_id == 5){
                        type = '【职官】'
                    }
                    if(response.body.content[i].type_id == 6){
                        type = '【机构】'
                    }
                    if(response.body.content[i].type_id == 7){
                        type = '【地点】'
                    }
                    this.content.push({
                        standard_name: response.body.content[i].standard_name,
                        type: type,
                        noumenon_id:response.body.content[i].noumenon_id
                    })
                }
                this.info_num = response.body.content.length;
//                console.log(this.info_num);
                this.total_page = (this.info_num)/20 ;
                this.total_page = parseInt(this.total_page.toString());
//                console.log( this.total_page);
                if(this.info_num%20 != 0){
                    this.total_page ++;
                }
                if (this.total_page == 0){
                    this.total_page = 1;
                }
                this.content.sort(this.change);
                this.print_content();
            },
            fail(){

            },
            /**
             *前往对应的本体详情页面
             */
            go_to_nou_detail(type, noumenon_id){
                this.$route.params.nouId = noumenon_id;
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
            /**
             * 设定一页最多显示二十个本体
             */
            print_content(){
                let num = this.$route.params.pageId;
                for (let i = (num-1)*20; i < (num-1)*20+20; i++ ){
                    this.page_content.push({
                        standard_name: this.content[i].standard_name,
                        type: this.content[i].type,
                        noumenon_id: this.content[i].noumenon_id
                    })
                }
            }

        }
    }
</script>

<style>
    .j-noumenon-word{
        display: inline-block;
        margin-top: 30px;
    }
    .j-searched-noumenon {
        margin-top: 30px;
        text-decoration: underline;
    }
    .j-w{
        color: #0f0f0f;
        margin-bottom: 15px;
    }
    .j-w:hover{
        color: brown;
    }
</style>