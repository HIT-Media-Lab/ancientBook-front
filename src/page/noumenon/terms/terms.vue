<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.terms_content.standard_name">
            <noumenon_button slot="children" :noumenon_number="3"></noumenon_button>
        </noumenon_title>

        <div class=" zxw-characterbody">
            <p class="zxwspan-length">术语名称：</p>
            <p class="zxw-detail-info" v-model="terms_content.name">{{terms_content.name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">学科：</p>
            <p class="zxw-detail-info" v-model="selected_course">{{selected_course}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">学科小类：</p>
            <p class="zxwspan-length zxw-null" v-if="terms_content.course_subdivision === null">不详</p>
            <p class="zxw-detail-info" style="width:auto;" v-else>未有具体数据</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">起始时间：</p>
            <button class="zxwbtn-info zxw-detail-info" v-model="terms_content.begin_time_name,terms_content.begin_time_id" @click="go_begin_time()">{{terms_content.begin_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">终止时间：</p>
            <button class="zxwbtn-info zxw-detail-info" v-model="terms_content.end_time_name,terms_content.end_time_id" @click="go_end_time()">{{terms_content.end_time_name}}</button>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">别名：</p>
            <p class="zxwspan-length zxw-null" v-if="terms_content.other_name === ''">不详</p>
            <p class="zxw-detail-info" v-model="terms_content.other_name" v-else>{{terms_content.other_name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">英译：</p>
            <p class="zxwspan-length zxw-null" v-if="terms_content.english === ''">不详</p>
            <p class="zxw-detail-info" v-model="terms_content.english" v-else>{{terms_content.english}}</p>
        </div>


        <div class="zxw-infospan">
            <p class="zxwspan-length">解释：</p>
            <p class="zxwspan-length zxw-null" v-if="terms_content.explain === ''">不详</p>
            <p class="zxw-detail-info" style="width:auto;" v-model="terms_content.explain" v-else>{{terms_content.explain}}</p>
        </div>

        <template v-if="terms_content.remark_1_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="terms_content.remark_1_name">{{terms_content.remark_1_name}} :</p>
                <p class="zxwspan-length-content" v-model="terms_content.remark_1">{{terms_content.remark_1}}</p>
            </div>
        </template>

        <template v-if="terms_content.remark_2_name !== ''">
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="terms_content.remark_2_name">{{terms_content.remark_2_name}} :</p>
                <p class="zxwspan-length-content" v-model="terms_content.remark_2">{{terms_content.remark_2}}</p>
            </div>
        </template>
        <button  class="zxwnoumenom-button zxwdelete-character" @click="delete_terms()">删除本体</button>
    </div>
</template>

<script>
    /*let Mock = require('mockjs');
    //显示用户列表
    Mock.mock('/ancient_books/get_technical_by_id.action?id=1','get',{
        "status|200":200,
        "standard_name": "水电工(语文)",
        "name":"水电工",
        "course|3":3,
        "course_subdivision|1":1,
        "english": "Shuidiangong",
        "other_name": "",
        "begin_time_id|1": 1,
        "begin_time_name": "唐朝",
        "end_time_id|2": 2,
        "end_time_name": "宋朝",
        "remark_1": "天文学",
        "remark_2": "",
        "remark_1_name": "不知道",
        "remark_2_name": "",
        "explain":"发送给您樊城区股vehnrbf喝温热后体内合成过年好吧"

    });

    Mock.mock('/ancient_books/get_menu_items.action?model_id=3&&item_1_id=0&&item_2_id=0','get',{
        "status|200":200,
        "g":[
            {
                "item_1_id|1":1,
                "chinese_name":"天文"

            },
            {
                "item_1_id|2":2,
                "chinese_name":"物理"

            },
            {
                "item_1_id|3":33,
                "chinese_name":"语文"

            },]

    });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    export default{
        created(){
            this.get_course_arr();
        },
        components:{
            noumenon_title,
            noumenon_button
        },
        data(){
            return{
                get_terms_url:'/ancient_books/get_technical_by_id.action',
                delete_terms_url:'/ancient_books/delete_literature_by_id.action',
                get_course_url:'/ancient_books/get_menu_items.action',
                terms_content:{
                    standard_name: '',
                    english: '',
                    name: '',
                    course:0,
                    course_subdivision:1,
                    other_name: '',
                    begin_time_id:'',
                    begin_time_name: '',
                    end_time_id: '',
                    end_time_name: '',
                    explain:'',
                    remark_1: '',
                    remark_2: '',
                    remark_1_name:'',
                    remark_2_name: ''
                },
                course_arr:[],
                selected_course:''
            }
        },

        /*watch:{
            $route(){
                this.terms_content.standard_name = '';
                this.terms_content.name = '';
                this.terms_content.english = '';
                this.terms_content.other_name = '';
                this.terms_content.course = 0;
                this.terms_content.course_subdivision = 0;
                this.terms_content.begin_time_id = '';
                this.terms_content.begin_time_name = '';
                this.terms_content.end_time_id = '';
                this.terms_content.end_time_name = '';
                this.terms_content.remark_1_name = '';
                this.terms_content.remark_2_name = '';
                this.terms_content.remark_1 = '';
                this.terms_content.remark_2 = '';
                this.terms_content.explain = '';
                this.course_arr.splice(1,this.course_arr.length);
                this.terms_info();
            }
        },*/

        methods:{

            success_id(response){
                //存在前端显示的数组里
                this.terms_content.standard_name = response.body.standard_name;
                this.terms_content.name = response.body.name;
                this.terms_content.english = response.body.english;
                this.terms_content.other_name = response.body.other_name;
                this.terms_content.begin_time_id = response.body.begin_time_id;
                this.terms_content.begin_time_name = response.body.begin_time_name;
                this.terms_content.end_time_id = response.body.end_time_id;
                this.terms_content.end_time_name = response.body.end_time_name;
                this.terms_content.remark_1_name = response.body.remark_1_name;
                this.terms_content.remark_2_name = response.body.remark_2_name;
                this.terms_content.remark_1 = response.body.remark_1;
                this.terms_content.remark_2 = response.body.remark_2;
                this.terms_content.explain = response.body.explain;
                this.terms_content.course = response.body.course;
                this.terms_content.course_subdivision = response.body.course_subdivision;
                if(this.terms_content.course !== null){
                    for(let i = 0; i < this.course_arr.length;i++){
                        if(this.terms_content.course === this.course_arr[i].item_1_id){
                            this.selected_course = this.course_arr[i].chinese_name;
                        }
                    }
                }
                console.log('terms_content: '+JSON.stringify(this.terms_content));
                console.log('selected_course: '+this.selected_course);
            },

            fail_id(response){
                console.log("具体显示术语失败");
            },

            terms_info(){
                let terms_object={};
                let new_url = this.get_terms_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',terms_object,this.success_id,this.fail_id);
            },

            success_delete(response){
                if(response.body.result === 1){
                    this.$router.push({path:'/noumenon'});
                }
            },

            fail_delete(response){
                console.log("删除本体失败");
            },

            delete_terms(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_terms_url,'post',delete_object,this.success_delete,this.fail_delete);
            },


            go_begin_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.terms_content.begin_time_id}});
            },

            go_end_time(){
                this.$router.push({name:'time_detail',params:{nouId:this.terms_content.end_time_id}});
            },

            get_course_arr(){
                let object = {};
                let new_url = this.get_course_url+'?model_id=3&&item_1_id=0&&item_2_id=0';
                this.http_json(new_url,'get',object,this.success_course,this.fail_course);
            },

            success_course(response){
                for(let i = 0; i < response.body.g.length;i++){
                    this.course_arr.push({
                        item_1_id:response.body.g[i].item_1_id,
                        chinese_name:response.body.g[i].chinese_name
                    })
                }
                console.log('course_arr: '+JSON.stringify(this.course_arr));
                this.terms_info();
            },

            fail_course(response){
                console.log("学科获取失败");
            }
        }
    }
</script>