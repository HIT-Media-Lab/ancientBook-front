<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.off_content.standard_name">
            <noumenon_button slot="children" :noumenon_number="5"></noumenon_button>
        </noumenon_title>

        <div class=" zxw-characterbody">
            <p class="zxwspan-length">职官名：</p>
            <p class="zxw-info-width" v-model="off_content.name">{{off_content.name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">英译：</p>
            <p class="zxw-info-width zxw-null" v-if="off_content.english === ''">不详</p>
            <p class="zxw-info-width" v-model="off_content.english" v-else>{{off_content.english}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">别名：</p>
            <p class="zxw-info-width zxw-null" v-if="off_content.other_name === ''">不详</p>
            <p class="zxw-info-width" v-model="off_content.other_name" v-else>{{off_content.other_name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">隶属机构：</p>
            <p class="zxw-info-width zxw-null" v-if="off_content.institution_name === ''">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-model="off_content.institution_name" @click="go_ins()" v-else>{{off_content.institution_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">起始时间：</p>
            <button class="zxwbtn-info zxw-info-width" v-model="off_content.begin_time_name,off_content.begin_time_id" @click="go_begin_time()">{{off_content.begin_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">终止时间：</p>
            <button class="zxwbtn-info zxw-info-width" v-model="off_content.end_time_name,off_content.end_time_id" @click="go_end_time()">{{off_content.end_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">上级职官：</p>
            <p class="zxw-info-width zxw-null" v-if="off_content.s_office_name === ''">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-model="off_content.s_office_id,off_content.s_office_name" @click="go_off()" v-else>{{off_content.s_office_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">品级：</p>
            <p class="zxw-info-width" v-model="selected_level">{{selected_level}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">所属朝代：</p>
            <p class="zxw-info-width zxw-null" v-if="off_content.dynasty === ''">不详</p>
            <p class="zxw-info-width" v-model="off_content.dynasty" v-else>{{off_content.dynasty}}</p>
        </div>


        <template v-if="off_content.remark_1_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="off_content.remark_1_name">{{off_content.remark_1_name}} :</p>
                <p class="zxwspan-length-content" v-model="off_content.remark_1">{{off_content.remark_1}}</p>
            </div>
        </template>

        <template v-if="off_content.remark_2_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="off_content.remark_2_name">{{off_content.remark_2_name}} :</p>
                <p class="zxwspan-length-content" v-model="off_content.remark_2">{{off_content.remark_2}}</p>
            </div>
        </template>
        <button  class="zxwnoumenom-button zxwdelete-character" @click="open_delete_off()">删除本体</button>

        <delete_modal :open_modal="open_modal" :delete_warning="'确认删除本体?'" v-on:close_modal="close_modal" v-on:delete_info="delete_off"></delete_modal>
        <fail_delete :show_info="show_info" v-on:close_modal="close_fail_delete"></fail_delete>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
     //显示用户列表
     Mock.mock('/ancient_books/get_office_by_id.action?id=1','get',{
     "status|200":200,
     "standard_name": "尚书(唐朝)",
     "english": "ShangShu",
     "name": "尚书",
     "other_name": "省长",
     "institution_id|12":12,
     "institution_name":"尚书省",
     "s_office_id|13":13,
     "s_office_name":"皇帝",
     "level|2":2,
     "dynasty":"唐朝",
     "begin_time_id|1": 1,
     "begin_time_name": "唐朝",
     "end_time_id|2": 2,
     "end_time_name": "隋朝",
     "remark_1": "",
     "remark_2": "三省六部",
     "remark_1_name": "",
     "remark_2_name": "谏书"
     });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=2&&item_1_id=0&&item_2_id=0','get', {
        "g":[
            {"model_id|2": 2,
                "item_1_id|1": 1,
                "chinese_name": "一级"
            },
            {"model_id|2": 2,
                "item_1_id|2": 2,
                "chinese_name": "二级"
            },
            {"model_id|2": 2,
                "item_1_id|3": 3,
                "chinese_name": "三级"
            },
            {"model_id|2": 2,
                "item_1_id|4": 4,
                "chinese_name": "四级"
            },
            {"model_id|2": 2,
                "item_1_id|5": 5,
                "chinese_name": "五级"
            }
        ]
    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import fail_delete from '../../../component/fail_delete_noumenon.vue';
    export default{
        created(){
            this.off_info();
        },
        components:{
            noumenon_title,
            noumenon_button,
            delete_modal,
            fail_delete
        },
        data(){
            return{
                get_off_url:'/ancient_books/get_office_by_id.action',
                delete_off_url:'/ancient_books/delete_office_by_id.action',
                level_url:'/ancient_books/get_menu_items.action',
                level_type:[],
                selected_level:'',
                off_content:{
                    standard_name: '',
                    english: '',
                    name: '',
                    institution_id:'',
                    institution_name:'',
                    other_name: '',
                    begin_time_id:'',
                    begin_time_name: '',
                    end_time_id: '',
                    end_time_name: '',
                    s_office_id:'',
                    s_office_name:'',
                    level:0,
                    dynasty:'',
                    remark_1: '',
                    remark_2: '',
                    remark_1_name:'',
                    remark_2_name: ''
                },  //成功回调后的对象
                show_info:false,
                open_modal:false
            }
        },

        watch:{
            $route(){
                this.off_content.standard_name = '';
                this.off_content.name = '';
                this.off_content.english = '';
                this.off_content.other_name = '';
                this.off_content.institution_id = '';
                this.off_content.institution_name = '';
                this.off_content.s_office_id = '';
                this.off_content.s_office_name = '';
                this.off_content.level = 0;
                this.off_content.dynasty = '';
                this.off_content.begin_time_id ='';
                this.off_content.begin_time_name = '';
                this.off_content.end_time_id = '';
                this.off_content.end_time_name = '';
                this.off_content.remark_1_name = '';
                this.off_content.remark_2_name = '';
                this.off_content.remark_1 = '';
                this.off_content.remark_2 = '';
            }
        },

        methods:{
            /*职官品级*/
            get_level_type(){
                let object ={};
                let new_url = this.level_url+'?model_id=2&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_level,this.fail_level);
            },

            success_level(response){
                for(let i =0;i < response.body.g.length;i++){
                    this.level_type.push({
                        item_1_id:response.body.g[i].item_1_id,
                        chinese_name:response.body.g[i].chinese_name
                    })
                }
                for(let i =0;i < this.level_type.length; i++){
                    if(this.off_content.level === this.level_type[i].item_1_id){
                        this.selected_level = this.level_type[i].chinese_name;
                    }
                }
            },

            fail_level(response){
                console.log("职官品级获取失败");
            },

            /*职官具体信息*/
            off_info(){
                let ins_object={};
                let new_url = this.get_off_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',ins_object,this.success_id,this.fail_id);
            },

            success_id(response){
                //存在前端显示的数组里
                this.off_content.standard_name = response.body.standard_name;
                this.off_content.name = response.body.name;
                this.off_content.english = response.body.english;
                this.off_content.other_name = response.body.other_name;
                this.off_content.institution_id = response.body.institution_id;
                this.off_content.institution_name = response.body.institution_name;
                this.off_content.s_office_id = response.body.s_office_id;
                this.off_content.s_office_name = response.body.s_office_name;
                this.off_content.level = response.body.level;
                this.off_content.dynasty = response.body.dynasty;
                this.off_content.begin_time_id = response.body.begin_time_id;
                this.off_content.begin_time_name = response.body.begin_time_name;
                this.off_content.end_time_id = response.body.end_time_id;
                this.off_content.end_time_name = response.body.end_time_name;
                this.off_content.remark_1_name = response.body.remark_1_name;
                this.off_content.remark_2_name = response.body.remark_2_name;
                this.off_content.remark_1 = response.body.remark_1;
                this.off_content.remark_2 = response.body.remark_2;
                console.log('off_content: '+JSON.stringify(this.off_content));
                this.get_level_type();
            },

            fail_id(response){
                console.log("具体显示职官失败");
            },

            /*删除职官*/
            open_delete_off(){
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
            },

            delete_off(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_off_url,'post',delete_object,this.success_delete,this.fail_delete);
            },

            success_delete(response){
                if(response.body.result === 1){
                    this.$router.push({path:'/noumenon'});
                }
            },

            fail_delete(response){
                this.open_modal = false;
                this.show_info = true;
            },

            /*上级职官*/
            go_off(){
                this.$router.push({name:'off_detail',params:{nouId:this.off_content.s_office_id}});
            },

            /*隶属机构*/
            go_ins(){
                this.$router.push({name:'ins_detail',params:{nouId:this.off_content.institution_id}});
            },

            go_begin_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.off_content.begin_time_id}});
            },

            go_end_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.off_content.end_time_id}});
            },

            close_fail_delete(){
                this.show_info = false;
            }
        }
    }
</script>