<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.location_content.standard_name">
            <noumenon_button slot="children" :noumenon_number="7"></noumenon_button>
        </noumenon_title>

       <div class=" zxw-characterbody">
            <p class="zxwspan-length">地名：</p>
            <p class="zxw-info-width" v-model="location_content.name">{{location_content.name}}</p>
        </div>

        <div class="zxw-infospan">
           <p class="zxwspan-length">英译：</p>
           <p class="zxw-info-width zxw-null" v-if="location_content.english === ''">不详</p>
           <p class="zxw-info-width" v-model="location_content.english" v-else>{{location_content.english}}</p>
       </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">别名：</p>
            <p class="zxw-info-width zxw-null" v-if="location_content.other_name === ''">不详</p>
            <span class="zxw-info-width" v-model="location_content.other_name" v-else>{{location_content.other_name}}</span>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">经度：</p>
            <p class="zxw-info-width zxw-null" v-if="location_content.longitude === ''">不详</p>
            <p class="zxw-info-width" v-model="location_content.longitude" v-else>{{location_content.longitude}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">纬度：</p>
            <p class="zxw-info-width zxw-null" v-if="location_content.latitude === ''">不详</p>
            <p class="zxw-info-width" v-model="location_content.latitude" v-else>{{location_content.latitude}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">今所在：</p>
            <p class="zxw-info-width zxw-null" v-if="location_content.location_today === ''">不详</p>
            <p class="zxw-info-width" v-model="location_content.location_today" v-else>{{location_content.location_today}}</p>
        </div>

        <div class="zxw-infospan">
             <p class="zxwspan-length">起始时间：</p>
             <button class="zxwbtn-info zxw-info-width" v-model="location_content.begin_time_name,location_content.begin_time_id" @click="go_begin_time()">{{location_content.begin_time_name}}</button>
         </div>

         <div class="zxw-infospan">
             <p class="zxwspan-length">终止时间：</p>
             <button class="zxwbtn-info zxw-info-width" v-model="location_content.end_time_name,location_content.end_time_id" @click="go_end_time()">{{location_content.end_time_name}}</button>
         </div>

         <div class="zxw-infospan">
             <p class="zxwspan-length">上级地名：</p>
             <p class="zxw-info-width zxw-null" v-if="location_content.s_location_name === ''">不详</p>
             <button class="zxwbtn-info zxw-info-width" v-model="location_content.s_location_id,location_content.s_location_name" @click="go_s_location()" v-else>{{location_content.s_location_name}}</button>
         </div>

         <div class="zxw-infospan">
             <p class="zxwspan-length">下级地名 ：</p>
             <p class="zxw-info-width zxw-null" v-if="location_content.l_location_name === '' ">不详</p>
             <button class="zxwbtn-info zxw-info-width" v-model="location_content.l_location_name,location_content.l_location_id" @click="go_l_location()"  v-else>{{location_content.l_location_name}}</button>
         </div>
         <div class="zxw-infospan">
            <p class="zxwspan-length">治所：</p>
            <p class="zxw-info-width zxw-null" v-if="location_content.seat.length === 0">不详</p>
            <button class="zxwbtn-info zxw-info-width" v-for="(item,index) in location_content.seat" @click="to_place(item.location_id)" v-else>{{item.location_name}}<span v-if="location_content.seat.length > 1"> ;</span></button>
        </div>

        <template v-if="location_content.remark_1_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="location_content.remark_1_name">{{location_content.remark_1_name}} :</p>
                <p class="zxwspan-length-content" v-model="location_content.remark_1">{{location_content.remark_1}}</p>
            </div>
        </template>

        <template v-if="location_content.remark_2_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="location_content.remark_2_name">{{location_content.remark_2_name}} :</p>
                <p class="zxwspan-length-content" v-model="location_content.remark_2">{{location_content.remark_2}}</p>
            </div>
        </template>
        <button  class="zxwnoumenom-button zxwdelete-character" @click="open_delete_place()">删除本体</button>

        <delete_modal :open_modal="open_modal" :delete_warning="'确认删除本体?'" v-on:close_modal="close_modal" v-on:delete_info="delete_place"></delete_modal>
        <fail_delete :show_info="show_info" v-on:close_modal="close_fail_delete" :tip="'该本体已被其他本体引用,无法删除'"></fail_delete>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
     //显示用户列表
     Mock.mock('/ancient_books/get_location_by_id.action?id=2','get',{
     "status|200":200,
             "standard_name": "晋阳（唐）",
             "english": "Taiyuan",
             "name": "太原",
             "other_name": "龙城",
             "longitude": 114,
             "latitude": 38,
             "location_today": "太原",
             "begin_time_id|1": 1,
             "begin_time_name": "唐朝",
             "end_time_id|2": 2,
             "end_time_name": "宋朝",
             "s_location_id|11": 11,
             "s_location_name": "山西省",
             "l_location_id|12":12,
             "l_location_name": "迎泽区",
         "seat": [
        {
            "relation_id|7":7,
            "location_id|3": 3,
            "location_name": "小店"
        },
        {
            "relation_id|7":7,
            "location_id|4": 4,
            "location_name": "万柏林"
        },
        {
            "relation_id|7":7,
            "location_id|5": 5,
            "location_name": "杏花岭"
        }],
        "remark_1": "",
        "remark_2": "并州",
        "remark_1_name": "",
        "remark_2_name": "古城"

     });

    Mock.mock('/ancient_books/get_location_by_id.action?id=3','get',{
        "status|200":200,
        "standard_name": "哈尔滨（2017）",
        "english": "Harbin",
        "name": "哈尔滨",
        "other_name": "冰城",
        "longitude": 120,
        "latitude": 40,
        "location_today": "哈尔滨",
        "begin_time_id|3": 3,
        "begin_time_name": "唐朝",
        "end_time_id|4": 4,
        "end_time_name": "宋朝",
        "s_location_id|33": 33,
        "s_location_name": "黑龙江省",
        "l_location_id|44":44,
        "l_location_name": "南岗区",
        "seat|2": [
            {
                "location_id|5": 5,
                "location_name": "大直街"
            },
            {
                "location_id|6": 6,
                "location_name": "道外"
            }],
        "remark_1": "俄罗斯",
        "remark_2": "最北",
        "remark_1_name": "",
        "remark_2_name": "哈哈"

    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    import delete_modal from '../../../component/delete_modal.vue';
    import fail_delete from '../../../component/warning_noumenon.vue';
    export default{
        created(){
            this.place_info();
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
                get_place_url:'/ancient_books/get_location_by_id.action',
                delete_place_url:'/ancient_books/delete_location_by_id.action',
                location_content:{
                    standard_name: '',
                    english: '',
                    name: '',
                    other_name: '',
                    longitude:'',
                    latitude: '',
                    location_today: '',
                    begin_time_id:'',
                    begin_time_name: '',
                    end_time_id: '',
                    end_time_name: '',
                    s_location_id: '',
                    s_location_name:'',
                    l_location_id:'',
                    l_location_name:'',
                    seat:[],
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
                this.location_content.standard_name = '';
                this.location_content.name = '';
                this.location_content.english = '';
                this.location_content.other_name = '';
                this.location_content.longitude = '';
                this.location_content.latitude = '';
                this.location_content.location_today = '';
                this.location_content.begin_time_id = '';
                this.location_content.begin_time_name = '';
                this.location_content.end_time_id = '';
                this.location_content.end_time_name = '';
                this.location_content.s_location_id = '';
                this.location_content.s_location_name = '';
                this.location_content.l_location_id = '';
                this.location_content.l_location_name = '';
                this.location_content.remark_1_name = '';
                this.location_content.remark_2_name = '';
                this.location_content.remark_1 = '';
                this.location_content.remark_2 = '';
                this.location_content.seat = [];
                this.place_info();
            }
        },

        methods:{
            success_id(response){
                //存在前端显示的数组里
                //this.title = response.body.standard_name;
                this.location_content.standard_name = response.body.standard_name;
                this.location_content.name = response.body.name;
                this.location_content.english = response.body.english;
                this.location_content.other_name = response.body.other_name;
                this.location_content.longitude = response.body.longitude;
                this.location_content.latitude = response.body.latitude;
                this.location_content.location_today = response.body.location_today;
                this.location_content.begin_time_id = response.body.begin_time_id;
                this.location_content.begin_time_name = response.body.begin_time_name;
                this.location_content.end_time_id = response.body.end_time_id;
                this.location_content.end_time_name = response.body.end_time_name;
                this.location_content.s_location_id = response.body.s_location_id;
                this.location_content.s_location_name = response.body.s_location_name;
                this.location_content.l_location_id = response.body.l_location_id;
                this.location_content.l_location_name = response.body.l_location_name;
                this.location_content.remark_1_name = response.body.remark_1_name;
                this.location_content.remark_2_name = response.body.remark_2_name;
                this.location_content.remark_1 = response.body.remark_1;
                this.location_content.remark_2 = response.body.remark_2;
                if(response.body.seat.length > 0){
                    for(let i = 0; i < response.body.seat.length;i++){
                        this.location_content.seat.push({
                            location_id:response.body.seat[i].location_id,
                            location_name:response.body.seat[i].location_name
                        })
                    }
                }
                console.log('location_content: '+JSON.stringify(this.location_content));
            },

            fail_id(response){
                console.log("具体显示地名失败");
            },

            place_info(){
                let place_object={};
                let new_url = this.get_place_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',place_object,this.success_id,this.fail_id);
            },

            open_delete_place(){
                this.open_modal = true;
            },

            close_modal(){
                this.open_modal = false;
            },

            delete_place(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_place_url,'post',delete_object,this.success_delete,this.fail_delete);
            },

            success_delete(response){
                this.$router.push({path:'/noumenon'});
            },

            fail_delete(response){
                this.open_modal = false;
                this.show_info = true;
            },

            to_place(p){
                this.$router.push({name:'pla_detail',params:{nouId:p}});
            },

            go_begin_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.location_content.begin_time_id}});
            },

            go_end_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.location_content.end_time_id}});
            },

            go_s_location(){
                this.$router.push({name:'pla_detail',params:{nouId:this.location_content.s_location_id}});
            },

            go_l_location(){
                this.$router.push({name:'pla_detail',params:{nouId:this.location_content.l_location_id}});
            },

            close_fail_delete(){
                this.show_info = false;
            }
        }
    }
</script>