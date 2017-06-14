<template>
    <modal :show_modal="this.character_modal" v-on:fireclose="this.close" class="zxw-modal-character">
        <div slot="header" class="zxw-character-header">
            <span>添加关系属性</span>
        </div>
        <div slot="body" class="zxw-time-body">
            <div class="zxw-search-header">
                <input class="zxw-search-input" type="text" v-model="search_content">
                <button class="zxw-search-icon" @click="search_character()"></button>
            </div>
            <p class="zxw-search-tip" v-show="show_tip">请在输入框中输入本体规范名称进行搜索</p>

            <div class="zxw-search-success" v-for="(item,index) in search_result">
                <p class="zxw-search-result">{{item}}</p>
                <button class="zxw-prebtn zxw-character-add">添加</button>
            </div>
        </div>

        <div slot="footer" class="zxw-search-footer">
            <button class="zxw-prebtn zxw-search-create">创建本体</button>
            <button class="zxwnoumenom-button zxw-search-cancel">取消</button>
        </div>

    </modal>
</template>

<script>
    /*let Mock = require('mockjs');
    Mock.mock('http://localhost:8080/ancient_books/get_person_list_by_name.action?name=lsm&&page_count=1','get', {
        "content":[
            {"standard_name": "李世民",
                "noumenon_id|100-1000":1
            },
            {"standard_name": "李世民",
                "noumenon_id|100-1000":1
            },
            {"standard_name": "李世民",
                "noumenon_id|100-1000":1
            },
            {"standard_name": "李世民",
                "noumenon_id|100-1000":1
            },
            {"standard_name": "李世民",
                "noumenon_id|100-1000":1
            }
        ]
    });*/

    import modal from "../component/modal.vue";
    export default{
        components:{
            modal
        },
        props:['character_modal'],

        data(){
            return {
                show_tip:true,
                search_content:'',
                search_url:'/ancient_books/get_person_list_by_name.action',
                search_result:[]
            }
        },

        methods:{
            close(){
                this.$emit('close_modal',close);
            },

            success_search(response){
                if(response.body.content.length !== 0) {
                    this.show_tip = false;
                    for (let i = 0; i < response.body.content.length; i++) {
                        this.search_result.push({
                            standrad_name: response.body.content.standrad_name,
                            noumenon_id: response.body.content.noumenon_id
                        })
                    }
                } else {

                }

            },

            fail_search(){

            },

            search_character(){
                let new_url;
                let search_object = {};
                new_url = this.search_url+'?name='+this.search_content+'&&page_count=1';
                this.http_json(new_url,'get',search_object,this.success_search,this.fail_search);
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
        height:40px;
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
        width:100px;
        margin:0 50% 0 3%;
    }
</style>