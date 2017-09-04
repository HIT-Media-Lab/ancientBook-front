<template>
    <modal :show_modal="this.noumenon_modal" v-on:fireclose="this.close_modal" class="zxw-modal-character">
        <div slot="header" class="zxw-character-header">
            <span>添加关系属性</span>
        </div>

        <div slot="body" class="zxw-noumenon-body">
            <div class="zxw-search-header">
                <input class="zxw-search-input" type="search" v-model="search_content">
                <button class="zxw-search-icon" @click="search_noumenon()" v-bind:disabled="search_content === ''"></button>
            </div>
            <p class="zxw-search-tip" v-if="show_tip === true">请在输入框中输入本体规范名称进行搜索</p>

            <!--显示搜索失败的结果-->
            <div class="zxw-fail-tip" v-if="search_result.length === 0 && fail_tip === true">
                <p style="width:340px">很抱歉，未搜索到本体：{{fail_search_name}}</p>
                <p style="width:340px;">
                    <span class="zxw-search-p-tip">您可以</span>
                    <button class="zxw-prebtn" @click="new_noumenon_window()">创建本体</button>
                </p>
            </div>

            <!--显示搜索成功的结果-->
            <div class="zxw-search-success" v-for="(result,index) in search_result" v-else>
                <p class="zxw-search-result">{{result.standard_name}}</p>
                <button class="zxw-prebtn zxw-character-add"  @click="add_noumenon_relations(index)" v-model="index" :="repeat_array" :disabled="forbidden_btn">添加</button>
            </div>

        </div>

        <div slot="footer" class="zxw-search-footer">
            <button class="zxwnoumenom-button zxw-search-cancel" @click="close_modal">取消</button>
            <button class="zxw-prebtn zxw-search-create" v-show="create_btn" @click="new_noumenon_window()">创建本体</button>
        </div>

    </modal>
</template>

<script>
    /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/get_person_list_by_name.action?name=zxw&&page_count=1','get', {
        "status|200":200,
        "content":[],
    });

    Mock.mock('/ancient_books/get_person_list_by_name.action?name=lsm&&page_count=1','get', {
        "content":[
            {
                "standard_name":"李世民(1996西周韩国)",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            },
            {
                "standard_name":"李世民",
                "type_id|1":1,
                "name":'李世明啊',
                "noumenon_id|100":100
            }
        ]
    });

    Mock.mock('/ancient_books/get_person_list_by_name.action?name=lh&&page_count=1','get', {
        "content":[
            {
                "standard_name":"鹿晗(西周韩国哈二十七年十二月三十一日)",
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
                "standard_name":"陈赫(1996西周韩国)",
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

   Mock.mock('/ancient_books/get_location_list_by_name.action?name=ty&&page_count=1','get', {
       "content":[
           {
               "standard_name":"太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原太原",
               "noumenon_id|25":25
           },
           {
               "standard_name":"太原",
               "noumenon_id|25":25
           },
           {
               "standard_name":"太原",
               "noumenon_id|25":100
           },
           {"standard_name":"太原",
               "noumenon_id|25":100
           },
           {
               "standard_name":"太原",
               "noumenon_id|25":100
           },
           {
               "standard_name":"太原",
               "noumenon_id|25":100
           },
           {
               "standard_name":"太原",
               "noumenon_id|25":100
           }
       ]
   });

   Mock.mock('/ancient_books/get_location_list_by_name.action?name=hrb&&page_count=1','get', {
       "content":[
           {
               "standard_name":"哈尔滨",
               "noumenon_id|26":26
           }
       ]
   });

    Mock.mock('/ancient_books/get_office_list_by_name.action?name=bbss&&page_count=1','get', {
        "content":[
            {
                "standard_name":"兵部尚书兵部尚书兵部尚书兵部尚书兵部尚书兵部尚",
                "noumenon_id|27":27
            },
            {
                "standard_name":"兵部尚书",
                "noumenon_id|27":27
            },
            {
                "standard_name":"兵部尚书",
                "noumenon_id|27":27
            },
            {
                "standard_name":"兵部尚书",
                "noumenon_id|27":27
            },
            {
                "standard_name":"兵部尚书",
                "noumenon_id|27":27
            },
            {
                "standard_name": "兵部尚书",
                "noumenon_id|27": 27
            }
        ]
    });

    Mock.mock('/ancient_books/get_office_list_by_name.action?name=jy&&page_count=1','get', {
        "content":[ {
            "standard_name":"军营",
            "noumenon_id|30":28
        },
            {
                "standard_name":"军营",
                "noumenon_id|30":28
            }]
    });

    Mock.mock('/ancient_books/get_institution_list_by_name.action?name=bb&&page_count=1','get', {
        "content":[
            {
                "standard_name":"兵部兵部兵部兵部v兵部兵部v兵部v兵部v兵部兵部兵部兵部兵部兵部兵部",
                "noumenon_id|27":28
            },
            {
                "standard_name":"兵部",
                "noumenon_id|27":28
            }
        ]
    });*/

    import modal from "../component/modal.vue";
    export default{
        watch:{
            'noumenon_modal':function(){
                if(this.noumenon_modal === true){
                    this.$store.commit('change_fork',true);
                }
            }
        },

        components:{
            modal
        },
        props:['search_url','noumenon_modal','noumenon_number','repeat_arr'],//noumenon_number:本体对应的序号 1.人物本体 2.文献本体 3.术语本体 4.时间本体（未配置路由） 5.职官本体 6.机构本体 7.地名本体

        data(){
            return {
                show_tip:true,
                fail_tip:false,
                create_btn:true,
                search_content:'',
                search_result:[],
                forbidden_btn:false,
                fail_search_name:''
            }
        },

        methods:{

            /*关闭模态框*/
            close_modal(){
                this.$emit('close_modal');
                this.search_content = '';
                this.search_result.splice(0,this.search_result.length);
                this.show_tip = true;
                this.fail_tip = false;
                this.create_btn = true;
                this.forbidden_btn = false;
            },

            /*搜索本体*/
            success_search(response){
                this.show_tip = false;
                this.search_result.splice(0,this.search_result.length);
                if(response.body.content.length !== 0) {
                    if(response.body.content.length <= 5) {
                        for (let i = 0; i < response.body.content.length; i++) {
                            if(response.body.content[i].type_id === 1){
                                this.search_result.push({
                                    type_id:response.body.content[i].type_id,
                                    name:response.body.content[i].name,
                                    standard_name: response.body.content[i].standard_name,
                                    noumenon_id: response.body.content[i].noumenon_id
                                })
                            } else{
                                this.search_result.push({
                                    type_id:response.body.content[i].type_id,
                                    standard_name: response.body.content[i].standard_name,
                                    noumenon_id: response.body.content[i].noumenon_id
                                })
                            }
                        }
                        console.log(JSON.stringify(this.search_result));
                    } else {
                        for (let i = 0; i < 5; i++) {
                            if(response.body.content[i].type_id === 1){
                                this.search_result.push({
                                    type_id:response.body.content[i].type_id,
                                    name:response.body.content[i].name,
                                    standard_name: response.body.content[i].standard_name,
                                    noumenon_id: response.body.content[i].noumenon_id
                                })
                            } else{
                                this.search_result.push({
                                    type_id:response.body.content[i].type_id,
                                    standard_name: response.body.content[i].standard_name,
                                    noumenon_id: response.body.content[i].noumenon_id
                                })
                            }
                        }
                        console.log(JSON.stringify(this.search_result));
                    }
                } else {
                    this.fail_search_name = this.search_content;
                    this.fail_tip = true;
                    this.create_btn = false;
                }

            },

            fail_search(){
                console.log("根据名称获取人物列表失败");
            },

            search_noumenon(){
                let search_object = {};
                let new_url = this.search_url+'?name='+this.search_content+'&&page_count=1';
                this.http_json(new_url,'get',search_object,this.success_search,this.fail_search);
            },

            /*添加搜索的本体*/
            add_noumenon_relations(q){
                console.log(q+':this.search_result:'+JSON.stringify(this.search_result[q]));
                if(this.search_result[q].type_id === 1){
                    this.$store.commit('post_character_data',this.search_result[q].name);
                }
                this.$emit('add_noumenon_relations',this.search_result[q]);
                this.close_modal();
            },

            new_noumenon_window(){
                if(this.noumenon_number === 1){
                    window.open("/chartwo");
                } else if(this.noumenon_number === 2){
                    window.open("/littwo");
                } else if(this.noumenon_number === 3){
                    window.open("/termstwo");
                } else if(this.noumenon_number === 5){
                    window.open("/offtwo");
                } else if(this.noumenon_number === 6){
                    window.open("/instwo");
                } else if(this.noumenon_number === 7){
                    window.open("/platwo");
                }
            }
        },
        computed:{
            repeat_array(){
                console.log('search repeat: '+JSON.stringify(this.repeat_arr));
                for(let i =0;i < this.search_result.length;i++ ){
                    if(this.repeat_arr.indexOf(this.search_result[i].standard_name) !== -1){
                        this.forbidden_btn =true;
                    } else {
                        this.forbidden_btn = false;
                    }
                }
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
        width:320px;
        height:35px;
        float:left;
        margin:0 0 0 5px;
    }

    .zxw-search-icon{
        background-image: url("../assets/img/picture-button/magnifier.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        width:20px;
        height:20px;
        margin:5px 10px 0 0;
        float: right;
    }

    .zxw-search-tip{
        width:300px;
        margin:30px 50px 30px 50px;
        font-size:16px;
    }

    .zxw-search-create{
        width:80px;
        height:50px;
        float:right;
        font-size: 18px;
    }

    .zxw-search-cancel{
        width:80px;
        height:50px;
        float:right;
        margin-right: 20px;
        background-size: 80px 40px;
    }

    .zxw-search-footer{
        width:400px;
        height:80px;
        padding-top: 10px;
        margin: 0 20px 0 0;
    }

    .zxw-modal-character{
        width:400px;
    }

    .zxw-character-header{
        color:gainsboro;
        font-size: 18px;
        text-align: center;
        background-image: url("../assets/img/no-use-picture/modal-header.png");
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
        font-size: 18px;
    }

    .zxw-search-result{
        display: inline-block;
        width:200px;
        margin:0 80px 0 15px;
        font-size: 18px;
    }

    .zxw-fail-tip{
        width:340px;
        margin:50px auto 0 60px;
    }

    .zxw-search-p-tip{
        color:grey;
    }

    .zxw-noumenon-body{
        margin-top: 24px;
        width: 800px;
    }
</style>