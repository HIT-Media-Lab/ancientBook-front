<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.ins_content.standard_name">
            <noumenon_button slot="children" :noumenon_number="6"></noumenon_button>
        </noumenon_title>

        <div class=" zxw-characterbody">
            <p class="zxwspan-length">机构名：</p>
            <p class="zxw-info-width" v-model="ins_content.name">{{ins_content.name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">英译：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.english === ''">不详</p>
            <p class="zxw-info-width" v-model="ins_content.english" v-else>{{ins_content.english}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">机构类型：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.type_number === null ||ins_content.type_number === 0">不详</p>
            <p class="zxw-info-width" v-model="ins_content.type[ins_content.type_number]" v-else>{{ins_content.type[ins_content.type_number]}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">别名：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.other_name === ''">不详</p>
            <span class="zxw-info-width" v-model="ins_content.other_name" v-else>{{ins_content.other_name}}</span>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">主管职：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.chief_office_name === ''">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-model="ins_content.chief_office_id,ins_content.chief_office_name" @click="go_chief_office()" v-else>{{ins_content.chief_office_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">副官职：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.vice_office_name === ''">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-model="ins_content.vice_office_id,ins_content.vice_office_name" @click="go_vice_office()" v-else>{{ins_content.vice_office_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">起始时间：</p>
            <button class="zxwbtn-info zxw-info-width" v-model="ins_content.begin_time_name,ins_content.begin_time_id" @click="go_begin_time()">{{ins_content.begin_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">终止时间：</p>
            <button class="zxwbtn-info zxw-info-width" v-model="ins_content.end_time_name,ins_content.end_time_id" @click="go_end_time()">{{ins_content.end_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">上级机构：</p>
            <p class="zxw-info-width zxw-null" v-if="ins_content.parent_body_name === ''">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-model="ins_content.parent_body_id,ins_content.parent_body_name" @click="to_ins()" v-else>{{ins_content.parent_body_name}}</button>
        </div>

        <template v-if="ins_content.remark_1_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="ins_content.remark_1_name">{{ins_content.remark_1_name}} :</p>
                <p class="zxwspan-length-content" v-model="ins_content.remark_1">{{ins_content.remark_1}}</p>
            </div>
        </template>

        <template v-if="ins_content.remark_2_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="ins_content.remark_2_name">{{ins_content.remark_2_name}} :</p>
                <p class="zxwspan-length-content" v-model="ins_content.remark_2">{{ins_content.remark_2}}</p>
            </div>
        </template>
        <button  class="zxwnoumenom-button zxwdelete-character" @click="open_delete_ins()">删除本体</button>

        <delete_modal :open_modal="open_modal" :delete_warning="'确认删除本体?'" v-on:close_modal="close_modal" v-on:delete_info="delete_ins"></delete_modal>
        <fail_delete :show_info="show_info" v-on:close_modal="close_fail_delete" :tip="'该本体已被其他本体引用,无法删除'"></fail_delete>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
    //显示用户列表
    Mock.mock('/ancient_books/get_institution_by_id.action?id=1','get',{
        "status|200":200,
        "standard_name": "兵部尚书（唐朝）",
        "type|1":1,
        "english": "ShangShu",
        "name": "兵部尚书",
        "other_name": "尚书",
        "chief_office_id|44":44,
        "chief_office_name":'司令',
        "vice_office_id|444":444,
        "vice_office_name":'副元帅',
        "begin_time_id|1": 1,
        "begin_time_name": "唐朝",
        "end_time_id|2": 2,
        "end_time_name": "宋朝",
        "parent_body_id|4444": 4444,
        "parent_body_name": '尚书省',
        "remark_1": "",
        "remark_2": "三省六部",
        "remark_1_name": "",
        "remark_2_name": "谏书"

    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import fail_delete from '../../../component/warning_noumenon.vue';
    export default{
        created(){
            this.ins_info();
        },
        components:{
            noumenon_title,
            noumenon_button,
            delete_modal,
            fail_delete
        },
        data(){
            return{
                title:'',
                get_ins_url:'/ancient_books/get_institution_by_id.action',
                delete_ins_url:'/ancient_books/delete_institution_by_id.action',
                ins_content:{
                    standard_name: '',
                    english: '',
                    name: '',
                    type:['','全部机构','皇室机构','中央机构','地方机构','民间机构'],
                    type_number:0,
                    other_name: '',
                    chief_office_id:'',
                    chief_office_name: '',
                    vice_office_id: '',
                    vice_office_name:'',
                    begin_time_id:'',
                    begin_time_name: '',
                    end_time_id: '',
                    end_time_name: '',
                    parent_body_id: '',
                    parent_body_name:'',
                    remark_1: '',
                    remark_2: '',
                    remark_1_name:'',
                    remark_2_name: ''
                },  //成功回调后的对象
                show_info:false,
                delete_info:'',
                open_modal:false
            }
        },

        watch:{
            $route(){
                this.ins_content.standard_name = '';
                this.ins_content.name = '';
                this.ins_content.type_number = 0;
                this.ins_content.english = '';
                this.ins_content.other_name = '';
                this.ins_content.chief_office_id = '';
                this.ins_content.chief_office_name = '';
                this.ins_content.vice_office_id= '';
                this.ins_content.vice_office_name = '';
                this.ins_content.begin_time_id = '';
                this.ins_content.begin_time_name = '';
                this.ins_content.end_time_id = '';
                this.ins_content.end_time_name = '';
                this.ins_content.parent_body_id='';
                this.ins_content.parent_body_name='';
                this.ins_content.remark_1_name = '';
                this.ins_content.remark_2_name = '';
                this.ins_content.remark_1 = '';
                this.ins_content.remark_2 = '';
                this.ins_info();
            }
        },

        methods:{
            success_id(response){
                this.ins_content.standard_name = response.body.standard_name;
                this.ins_content.name = response.body.name;
                this.ins_content.type_number=response.body.type;
                this.ins_content.english = response.body.english;
                this.ins_content.other_name = response.body.other_name;
                this.ins_content.chief_office_id = response.body.chief_office_id;
                this.ins_content.chief_office_name = response.body.chief_office_name;
                this.ins_content.vice_office_id = response.body.vice_office_id;
                this.ins_content.vice_office_name = response.body.vice_office_name;
                this.ins_content.begin_time_id = response.body.begin_time_id;
                this.ins_content.begin_time_name = response.body.begin_time_name;
                this.ins_content.end_time_id = response.body.end_time_id;
                this.ins_content.end_time_name = response.body.end_time_name;
                this.ins_content.parent_body_id=response.body.parent_body_id;
                this.ins_content.parent_body_name=response.body.parent_body_name;
                this.ins_content.remark_1_name = response.body.remark_1_name;
                this.ins_content.remark_2_name = response.body.remark_2_name;
                this.ins_content.remark_1 = response.body.remark_1;
                this.ins_content.remark_2 = response.body.remark_2;
                console.log('ins_content: '+JSON.stringify(this.ins_content));
            },

            fail_id(response){
                console.log("具体显示机构失败");
            },

            ins_info(){
                let ins_object={};
                let new_url = this.get_ins_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',ins_object,this.success_id,this.fail_id);
            },

            open_delete_ins(){
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
            },

            delete_ins(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_ins_url,'post',delete_object,this.success_delete,this.fail_delete);
            },

            success_delete(response){
                this.$router.push({path:'/noumenon'});
            },

            fail_delete(response){
                this.open_modal = false;
                this.show_info = true;
            },

            to_ins(){
                this.$router.push({name:'ins_detail',params:{nouId:this.ins_content.parent_body_id}});
            },

            go_chief_office(){
                this.$router.push({name:'off_detail',params:{nouId:this.ins_content.chief_office_id}});
            },

            go_vice_office(){
                this.$router.push({name:'off_detail',params:{nouId:this.ins_content.vice_office_id}});
            },

            go_begin_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.ins_content.begin_time_id}});
            },

            go_end_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.ins_content.end_time_id}});
            },

            close_fail_delete(){
                this.show_info = false;
            }
        }
    }
</script>