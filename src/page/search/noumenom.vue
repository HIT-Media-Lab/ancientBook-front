<template>
    <div>
        <p class="j-noumenon-word" v-model="info_num">为您找到{{info_num}}条相关的本体信息</p>
        <div class="j-searched-noumenon" v-for="item in page_content">
            <router-link to="/noumenon/char_detail/1">
                <span class="j-w" @click="go_to_char_detail" :id="item.noumenon_id">{{item.standard_name}}  {{item.type}}</span>
            </router-link>
            <br/>
        </div>
        <page_button :max = this.total_page></page_button>
    </div>
</template>

<script>
    import page_button from '../../component/paginator.vue'
    export default {
        components:{
            page_button
        },
        created(){
            if (this.content.length == 0){
                let item = '';
                item = this.content_url + '?name=' + this.$route.params.content;
                this.http_json(item, 'get', item, this.success_noumenon, this.fail);
            }else{

            }
        },
        data(){
            return{
                info_num: 0,
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
            success_noumenon(response){
                console.log(response.body.content.length);
                for (let i = 0 ; i < response.body.content.length; i++){
                    let type = '';
                    if (response.body.content[i].type_id = 1){
                        type = '【人物】'
                    } else if(response.body.content[i].type_id = 2){
                        type = '【文献】'
                    } else if(response.body.content[i].type_id = 3){
                        type = '【术语】'
                    } else if(response.body.content[i].type_id = 5){
                        type = '【职官】'
                    } else if(response.body.content[i].type_id = 6){
                        type = '【机构】'
                    } else if(response.body.content[i].type_id = 7){
                        type = '【地点】'
                    }
                    this.content.push({
                        standard_name: response.body.content[i].standard_name,
                        type: type,
                        noumenon_id:response.body.content[i].noumenon_id
                    })
                }
                alert(this.content.length);
                this.info_num = this.content.length;
                this.total_page = Math.ceil(this.info_num/20);
                this.content.sort(this.change);
                let num = this.$route.params.pageId;
                for (let i = (num-1)*20; i < (num-1)*20+20; i++ ){
                    this.page_content.push({
                        standard_name: this.content[i].standard_name,
                        type: this.content[i].type,
                        noumenon_id: this.content[i].noumenon_id
                    })
                }
            },
            fail(){
                alert("获取信息失败");
            },
            go_to_char_detail(){
                this.$route.params.nouId = 1;
                this.$route.push({name: 'char_detail', params: this.$route.params})
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