<template>
    <div>
        <noumenon_title :title="this.standard_name">
            <noumenon_button slot="children" :noumenon_number="2"></noumenon_button>
        </noumenon_title>
        <div class="zxw-lit-background">
            <!--文献版本层信息固有信息-->
            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">书名:</label>
                <p class="zxw-lit-info zxw-lit-info-margin" v-model="type_name">{{type_name}}</p>
                <label class="zxw-lit-label">别名:</label>
                <p class="zxw-lit-info zxw-null" v-if="type_other_name === ''">不详</p>
                <p class="zxw-lit-info" v-model="type_other_name" v-else>{{type_other_name}}</p>
            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">存佚类型：</label>
                <p class="zxw-lit-info zxw-lit-info-margin zxw-null" v-if="type_save_name === ''">不详</p>
                <p class="zxw-lit-info  zxw-lit-info-margin" v-model="type_save_name" v-else>{{type_save_name}}</p>
                <label class="zxw-lit-label">品种级别:</label>
                <p class="zxw-lit-info zxw-null" v-if="type_level_name === ''">不详</p>
                <p class="zxw-lit-info" v-model="type_level_name" v-else>{{type_level_name}}</p>

            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">英译：</label>
                <p class="zxw-lit-info zxw-null" v-if="english === ''">不详</p>
                <p class="zxw-lit-info" v-model="english" v-else>{{english}}</p>
            </div>

            <div class="zxw-lit-layer">
                <label class="zxw-lit-label">提要信息:</label>
                <p class="zxw-lit-info zxw-null" v-if="type_summary === ''">不详</p>
                <div class="zxw-lit-summery"  v-model="type_summary" v-else>{{type_summary}}</div>
            </div>
            <div>
                <label class="zxw-lit-label">标准分类:</label>
                <p class="zxw-lit-info zxw-null" v-if="type_bu_name === ''">不详</p>
                <p class="zxw-lit-info" v-model="type_bu_name">{{type_bu_name}}</p>
                <p class="zxw-lit-info zxw-null" v-if="type_lei_name === ''">不详</p>
                <p class="zxw-lit-info" v-model="type_lei_name" v-else>{{type_lei_name}}</p>
                <p class="zxw-lit-info zxw-null" v-if="type_shu_name === ''">不详</p>
                <p class="zxw-lit-info" v-model="type_shu_name" v-else>{{type_shu_name}}</p>
            </div>

            <!--文献版本层信息循坏添加信息-->
            <div v-for="item in responsibility_infos">
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="673"/>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">责任开始时间:</label>
                    <p class="zxw-lit-info zxw-lit-type-label-margin" v-model="item.begin_time_name">{{item.begin_time_name}}</p>
                    <label class="zxw-lit-type-label">责任结束时间:</label>
                    <p class="zxw-lit-info" v-model="item.end_time_name">{{item.end_time_name}}</p>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">责任地点:</label>
                    <p class="zxw-lit-info zxw-lit-type-label-margin zxw-null" v-if="item.location_name === ''">不详</p>
                    <button class="zxw-lit-info zxw-lit-type-label-margin"  v-model="item.location_name" v-else>{{item.location_name}}</button>
                    <label class="zxw-lit-type-label">责任者类型:</label>
                    <p class="zxw-lit-info" v-model="item.type_name">{{item.type_name}}</p>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">责任者名称：</label>
                    <button class="zxw-lit-info zxw-lit-type-label-margin" v-model="item.name_standard_name">{{item.name_standard_name}}</button>
                    <label class="zxw-lit-type-label">责任行为：</label>
                    <p class="zxw-lit-info" v-model="item.action_name">{{item.action_name}}</p>
                </div>

                <div class="zxw-lit-layer">
                    <label class="zxw-lit-type-label">确定性:</label>
                    <p class="zxw-lit-info" v-model="item.confirm_name">{{item.confirm_name}}</p>
                </div>

                <div>
                    <label class="zxw-lit-type-label">责任说明:</label>
                    <p class="zxw-lit-summery zxw-null" v-if="item.explain === ''">不详</p>
                    <p class="zxw-lit-summery" v-model="item.explain">{{item.explain}}</p>
                </div>
            </div>
        </div>
        <button  class="zxwnoumenom-button zxw-lit-delete" @click="open_delete_lit()">删除本体</button>

        <delete_modal :open_modal="open_modal" :delete_warning="'确认删除本体?'" v-on:close_modal="close_modal" v-on:delete_info="delete_lit"></delete_modal>
        <fail_delete :show_info="show_info" v-on:close_modal="close_fail_delete" :tip="'该本体已被其他本体引用,无法删除'"></fail_delete>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
    //显示用户列表
    Mock.mock('/ancient_books/get_literature_by_id.action?id=1','get',{
        "status|200":200,
        "standard_name":'书名([宋朝]陈赫责任行为1、[宋朝]陈赫责任行为1)',
        "type_name":'书名',
        "english": 'shuming',
        "type_other_name": '书名',
        "type_save|2":2,
        "type_save_name": '存',
        "type_level|1":1,
        "type_level_name":'不详',
        "type_bu|1":1,
        "type_bu_name":'部1',
        "type_lei|1":1,
        "type_lei_name": '类1',
        "type_shu|1":1,
        "type_shu_name": '属1',
        "type_summary": '提要信息；提要信息；提要信息；提要信息；提要信息；提要信息；提要信息；提要信息；提要信息；',
        "responsibility_infos": [
            {
                "responsibility_info_id|1":1,
                "location_id|25":25,
                "location_name":'太原',
                "name_id|150":150,
                "name_standard_name": '陈赫',
                "name_name":'陈赫',
                "begin_time_name": '宋朝',
                "begin_time_id|1":1,
                "end_time_name": '宋朝',
                "end_time_id|1":1,
                "end_time_chaodai":'宋朝',
                "action|1":1,
                "action_name":"责任行为1",
                "explain":'责任说明',
                "confirm|1":1,
                "confirm_name":'不详',
                "type|1":1,
                'type_name':'不详',
                "level|1":1,
                "order|1":1
            },
            {
                "responsibility_info_id|1":1,
                "location_id|25":25,
                "location_name":'太原',
                "name_id|150":150,
                "name_standard_name": '陈赫',
                "name_name":'陈赫',
                "begin_time_name": '宋朝',
                "begin_time_id|1":1,
                "end_time_chaodai":'宋朝',
                "end_time_name": '宋朝',
                "end_time_id|1":1,
                "action|1":1,
                "action_name":"责任行为1",
                "explain":'责任说明',
                "confirm|1":1,
                "confirm_name":'不详',
                "type|1":1,
                'type_name':'不详',
                "level|1":1,
                "order|2":2
            }]
    });*/


    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import fail_delete from '../../../component/warning_noumenon.vue';
    export default{
        created(){
            this.show_lit();
        },

        components:{
            noumenon_title,
            noumenon_button,
            delete_modal,
            fail_delete
        },

        data(){
            return{
                show_info:false,
                lit_url:'/ancient_books/get_literature_by_id.action',
                delete_lit_url:'/ancient_books/delete_literature_by_id.action',
                standard_name:'',
                type_name:'',
                type_other_name:'',
                english:'',
                type_save_name:'',
                type_level_name:'',
                type_summary:'',
                type_bu_name:'',
                type_lei_name:'',
                type_shu_name:'',
                responsibility_infos:[],
                open_modal:false
            }
        },

        methods: {
            show_lit(){
                let object = {};
                let new_url = this.lit_url + '?id=' + this.$route.params.nouId;
                this.http_json(new_url, 'get', object, this.success_lit, this.fail_lit);
            },

            success_lit(response){
                this.standard_name = response.body.standard_name;
                this.english = response.body.english;
                this.type_name = response.body.type_name;
                this.type_other_name = response.body.type_other_name;
                this.type_save_name = response.body.type_save_name;
                this.type_level_name = response.body.type_level_name;
                this.type_bu_name = response.body.type_bu_name;
                this.type_lei_name = response.body.type_lei_name;
                this.type_shu_name = response.body.type_shu_name;
                this.type_summary = response.body.type_summary;
                if (response.body.responsibility_infos.length > 0) {
                    for (let i = 0; i < response.body.responsibility_infos.length; i++) {
                        this.responsibility_infos.push(
                            response.body.responsibility_infos[i]
                        );
                    }
                }
            },

            fail_lit(){
                console.log("获取文献具体信息失败");
            },

            open_delete_lit(){
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
            },

            delete_lit(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_lit_url, 'post', delete_object, this.success_delete, this.fail_delete);
            },

            success_delete(response){
                this.$router.push({path: '/noumenon'});
            },

            fail_delete(response){
                this.open_modal = false;
                this.show_info = true;
            },

            close_fail_delete(){
                this.show_info = false;
            }
        }
    }
</script>

<style>
    .zxw-lit-background{
        background-image: url("../../../assets/img/modal-box/lit_box.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        width:773px;
        /*height:991px;*/
        height:auto;
        margin:20px auto 0 auto;
        padding: 50px 50px 50px 50px;
    }

    .zxw-lit-label{
       width:100px;
    }

    .zxw-lit-info{
        display: inline-block;
        width:175px;
        text-align: left;
    }
     .zxw-lit-info-margin{
         margin:0 90px 0 0;
     }

    .zxw-lit-layer{
        margin-bottom: 10px;
    }

    .zxw-lit-type-label{
        width:130px;
    }

    .zxw-lit-type-label-margin{
        margin:0 30px 0 0;
    }
    .zxw-lit-delete{
        width: 140px;
        height: 45px;
        margin: 15px 0 0 130px;
    }

    .zxw-lit-summery{
        display: inline-block;
        width:500px;
        height:auto;
        vertical-align: top;
    }
</style>