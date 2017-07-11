<template>
    <modal :show_modal="this.character_modal" v-on:fireclose="this.close_modal" class="zxw-modal-character">
        <div slot="header" class="zxw-character-header">
            <span>添加关系属性</span>
        </div>

        <div slot="body" class="zxw-time-body">
            <div class="zxw-search-header">
                <input class="zxw-search-input" type="search" v-model="search_content">
                <button class="zxw-search-icon" @click="search_character()" v-bind:disabled="search_content === ''"></button>
            </div>
            <p class="zxw-search-tip" v-if="show_tip === true">请在输入框中输入本体规范名称进行搜索</p>

            <!--显示搜索成功的结果-->
            <div class="zxw-search-success" v-for="(result,index) in search_result">
                <p class="zxw-search-result">{{result.standard_name}}</p>
                <button class="zxw-prebtn zxw-character-add"  @click="add_person_relations(index)" v-model="index">添加</button>
            </div>

            <!--显示搜索失败的结果-->
            <div class="zxw-fail-tip" v-show="fail_tip">
                <p>很抱歉，未搜索到本体：{{search_content}}</p>
                <p><span class="zxw-search-p-tip">您可以</span>
                    <button class="zxw-prebtn zxw-search-create" @click="new_character()">创建本体</button>
                </p>
            </div>
        </div>

        <div slot="footer" class="zxw-search-footer">
            <button class="zxw-prebtn zxw-search-create" v-show="create_btn" @click="new_character()">创建本体</button>
            <button class="zxwnoumenom-button zxw-search-cancel" @click="close_modal">取消</button>
        </div>

    </modal>
</template>

<script>
   let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_person_list_by_name.action?name=lsm&&page_count=1','get', {
        "content":[
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "noumenon_id|100":100
            }
        ]
    });

    Mock.mock('/ancient_books/get_person_list_by_name.action?name=lh&&page_count=1','get', {
        "content":[
            {
                "standard_name":"鹿晗",
                "noumenon_id|200":50
            },
            {
                "standard_name":"鹿晗",
                "noumenon_id|200":50
            },
            {
                "standard_name":"鹿晗",
                "noumenon_id|200":50
            },
        ]
    });

    Mock.mock('/ancient_books/get_person_list_by_name.action?name=dc&&page_count=1','get', {
        "content":[
            {
                "standard_name":"邓超(1996西周韩国)",
                "noumenon_id|100":50
            },
            {
                "standard_name":"邓超(1996西周韩国)",
                "noumenon_id|100":50
            },
            {
                "standard_name":"邓超(1996西周韩国)",
                "noumenon_id|100":50
            },
        ]
    });

    Mock.mock('/ancient_books/get_person_list_by_name.action?name=ch&&page_count=1','get', {
        "content":[
            {
                "standard_name":"陈赫",
                "noumenon_id|150":50
            },
            {
                "standard_name":"陈赫",
                "noumenon_id|150":50
            },
            {
                "standard_name":"陈赫",
                "noumenon_id|150":50
            },
        ]
    });

    import modal from "../component/modal.vue";
    export default{
        components:{
            modal
        },
        props:['character_modal'],

        data(){
            return {
                show_tip:true,
                fail_tip:false,
                create_btn:true,
                search_content:'',
                search_url:'/ancient_books/get_person_list_by_name.action',
                search_result:[]
            }
        },

        methods:{

            /*关闭模态框*/
            close_modal(){
                this.$emit('close_modal');
                this.search_content = '';
                this.search_result.splice(0,this.search_result.length);
                this.show_tip = false;
            },

            /*搜索本体*/
            success_search(response){
                this.show_tip = false;
                this.search_result.splice(0,this.search_result.length);
                if(response.body.content.length !== 0) {
                    if(response.body.content.length <= 5) {
                        for (let i = 0; i < response.body.content.length; i++) {
                            this.search_result.push({
                                standard_name: response.body.content[i].standard_name,
                                noumenon_id: response.body.content[i].noumenon_id
                            })
                        }
                        console.log(JSON.stringify(this.search_result));
                    } else {
                        for (let i = 0; i < 5; i++) {
                            this.search_result.push({
                                standard_name: response.body.content[i].standard_name,
                                noumenon_id: response.body.content[i].noumenon_id
                            })
                        }
                        console.log(JSON.stringify(this.search_result));
                    }
                } else {
                    this.fail_tip = true;
                    this.create_btn = false;
                }

            },

            fail_search(){
                console.log("根据人名获取人物列表失败");
            },

            search_character(){
                let search_object = {};
                let new_url = this.search_url+'?name='+this.search_content+'&&page_count=1';
                this.http_json(new_url,'get',search_object,this.success_search,this.fail_search);
            },

            /*添加搜索的本体*/
            add_person_relations(q){
                console.log(q+':this.search_result:'+JSON.stringify(this.search_result[q]));
                this.$emit('add_person_relations',this.search_result[q]);
                this.close_modal();
            },

            new_character(){
                window.open("/chartwo");
            }
        }
    }
</script>

<style>
    .zxw-search-header{
        border:2px solid;
        width:360px;
        height:35px;
        margin:0 0 0 3%;
    }
    .zxw-search-input{
        background-color: transparent;
        border:none;
        font-size:15px;
        width:260px;
        height:35px;
        float:left;
        margin:0 0 0 5px;
    }

    .zxw-search-icon{
        background-image: url("../assets/img/big-mirror.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        width:20px;
        height:20px;
        margin:5px 10px 0 0;
        float: right;
    }

    .zxw-search-tip{
        width:230px;
        margin:50px 50px 0 100px;
        font-size:12px;
    }

    .zxw-search-create{
        width:80px;
        height:50px;
    }

    .zxw-search-cancel{
        width:80px;
        height:50px;
        background-size: 80px 40px;
    }

    .zxw-search-footer{
        float:right;
        margin: 0 20px 0 0;
    }

    .zxw-modal-character{
        width:400px;
        background-repeat: no-repeat;
        background-size:400px auto;
    }

    .zxw-character-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../assets/img/弹框标题.png");
        background-size: contain;
        background-color: transparent;
        width:400px;
        height:50px;
        padding:10px 0 0 0;
    }

    .zxw-search-success{
        width:380px;
        margin:0 10px 0 10px;
    }
    .zxw-character-add{
        width:60px;
        height:30px;
    }

    .zxw-search-result{
        display: inline-block;
        width:200px;
        margin:0 80px 0 15px;
    }

    .zxw-fail-tip{
        font-size: 12px;
        width:160px;
        margin:50px 50px 0 120px;
    }

    .zxw-search-p-tip{
        color:grey;
    }
</style>