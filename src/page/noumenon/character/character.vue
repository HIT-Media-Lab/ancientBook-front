<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.title">
            <noumenon_button slot="children"></noumenon_button>
        </noumenon_title>

        <div>
            <div class="row">
                <span class="col-md-2">人名：</span>
                <span v-model="person_content.standard_name">{{person_content.standard_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">英译：</span>
                <span v-model="person_content.english">{{person_content.english}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">姓：</span>
                <span v-model="person_content.xing">{{person_content.xing}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">氏：</span>
                <span v-model="person_content.shi">{{person_content.shi}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">字：</span>
                <span v-model="person_content.zi">{{person_content.zi}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">别名：</span>
                <span v-model="person_content.other_name">{{person_content.other_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">出生时间：</span>
                <span v-model="person_content.birth_time_name,person_content.birth_time_id">{{person_content.birth_time_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">死亡时间：</span>
                <span v-model="person_content.death_time_name,person_content.death_time_id">{{person_content.death_time_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">籍贯：</span>
                <span v-model="person_content.jiguan_location_id,person_content.jiguan_location_name">{{person_content.jiguan_location_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">父：</span>
                <span v-model="father[0].person_name">{{father[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">母：</span>
                <span v-model="mother[0].person_name">{{mother[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">子：</span>
                <span v-model="son[0].person_name">{{son[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">女：</span>
                <span v-model="daughter[0].person_name">{{daughter[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">兄弟：</span>
                <span v-model="brother[0].person_name">{{brother[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">姐妹：</span>
                <span v-model="sister[0].person_name">{{sister[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">师：</span>
                <span v-model="teacher[0].person_name">{{teacher[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">学生：</span>
                <span v-model="student[0].person_name">{{student[0].person_name}}</span>
            </div>
            <div class="row">
                <span class="col-md-2">友：</span>
                <span v-model="friend[0].person_name">{{friend[0].person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2" v-model="person_content.remark_1_name">{{person_content.remark_1_name}}</span>
                <span v-model="person_content.remark_1">{{person_content.remark_1}}</span>
            </div>
            <div class="row">
                <span class="col-md-2" v-model="person_content.remark_2_name">{{person_content.remark_2_name}}</span>
                <span v-model="person_content.remark_2">{{person_content.remark_2}}</span>
            </div>
            <button  class="zxwdelete-character">删除本体</button>
        </div>
    </div>
</template>

<script>
     let Mock = require('mockjs');
     //显示用户列表
     Mock.mock('/ancient_books/get_person_by_id.action?id=37','get',{
     "status|200":200,
     "standard_name|5":5,
     "english|6": 6,
     "xing|5": 5,
     "shi|5": 5,
     "zi|5":5,
     "other_name|7":7,
     "birth_time_id|19962526": 1,
     "birth_time_name|1996": 1,
     "death_time_id|0": 0,
     "death_time_name|0": 0,
     "jiguan_location_id|555":1,
     "jiguan_location_name|555":1,
     "remark_1_name|1": 2,
     "remark_2_name|2": 2,
     "remark_1|111":1,
     "remark_2|222": 1,
     "relations": [{
            "relation_type|4": 1,
            "relation_id|1-100": 1,
            "person_id|100-1000": 1,
            "person_name|10000": 1
         },
         {
             "relation_type|5": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|7": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|8": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|9": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|10": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         },
         {
             "relation_type|11": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name|10000": 1
         }]
     });
    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    export default{
        created(){
            //Vuex得到具体人物ID
            this.person_info();
        },
        components:{
            noumenon_title,
            noumenon_button
        },
        data(){
            return{
                title:'',
                person_url:'/ancient_books/get_person_by_id.action',
                person_object:{}, //get请求的对象
                person_content:{},  //成功回调后的对象
                father:[],
                mother:[],
                son:[],
                daughter:[],
                brother:[],
                sister:[],
                teacher:[],
                student:[],
                friend:[]
            }
        },
        methods:{
            success_id(response){
                //存在前端显示的数组里
                this.title = response.body.standard_name+'('+response.body.birth_time_name+')';
                this.person_content.standard_name = response.body.standard_name;
                this.person_content.english = response.body.english;
                this.person_content.xing = response.body.xing;
                this.person_content.shi = response.body.shi;
                this.person_content.zi = response.body.zi;
                this.person_content.other_name = response.body.other_name;
                this.person_content.birth_time_id = response.body.birth_time_id;
                this.person_content.birth_time_name = response.body.birth_time_name;
                this.person_content.death_time_id = response.body.death_time_id;
                this.person_content.death_time_name = response.body.death_time_name;
                this.person_content.jiguan_location_id = response.body.jiguan_location_id;
                this.person_content.jiguan_location_name = response.body.jiguan_location_name;
                this.person_content.remark_1_name = response.body.remark_1_name;
                this.person_content.remark_2_name = response.body.remark_2_name;
                this.person_content.remark_1 = response.body.remark_1;
                this.person_content.remark_2 = response.body.remark_2;
                for(let i = 0; i < response.body.relations.length; i++) {
                    if (response.body.relations[i].relation_type === 4) {
                        this.father.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.father));

                    } else if (response.body.relations[i].relation_type === 5) {
                        this.mother.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.mother));

                    } else if (response.body.relations[i].relation_type === 6) {
                        this.son.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.son));

                   } else if (response.body.relations[i].relation_type === 7) {
                        this.daughter.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.daughter));

                    } else if(response.body.relations[i].relation_type === 8) {
                        this.brother.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.brother));

                    } else if(response.body.relations[i].relation_type === 9) {
                        this.sister.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.sister));
                        /*this.sister.relation_type=response.body.relations[i].relation_type;
                        this.sister.relation_id=response.body.relations[i].relation_id;
                        this.sister.person_id=response.body.relations[i].person_id;
                        this.sister.person_name=response.body.relations[i].person_name;*/

                    } else if(response.body.relations[i].relation_type === 10) {
                        this.teacher.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.teacher));

                  } else if(response.body.relations[i].relation_type === 11) {
                        this.student.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.student));

                    } else if(response.body.relations[i].relation_type === 12) {
                        this.friend.push({
                            relation_type: response.body.relations[i].relation_type,
                            relation_id: response.body.relations[i].relation_id,
                            person_id: response.body.relations[i].person_id,
                            person_name: response.body.relations[i].person_name
                        });
                        console.log(JSON.stringify(this.friend));
                    }
                }
                //this.check_info();
            },

            fail_id(response){
                console.log("具体显示人物失败");
            },

            person_info(){
                this.person_object.value = '?id='+this.$route.params.nouId;
                let new_url = this.person_url + this.person_object.value;
                this.http_json(new_url,'get',this.person_object,this.success_id,this.fail_id);
            },

            /*check_info(){
                if (this.father.length === 0) {
                    this.father[0].person_name = '未填写';
                }
                if (this.mother.length === 0) {
                    this.mother[0].person_name = '未填写';
                }
                if (this.son.length === 0) {
                    this.son[0].person_name = '未填写';
                }
                if (this.daughter.length === 0) {
                    this.daughter[0].person_name = '未填写';
                }
                if (this.brother.length === 0 ) {
                    this.brother[0].person_name = '未填写';
                }
                if (this.sister.length === 0) {
                    this.sister[0].person_name = '未填写';
                }
                if (this.teacher.length === 0) {
                    this.teacher[0].person_name = '未填写';
                }
                if (this.student.length === 0) {
                    this.student[0].person_name = '未填写';
                }
                if (this.friend.length === 0) {
                    this.friend[0].person_name = '未填写';
                }
            }*/
        }
    }
</script>

<style>


    .zxwdelete-character{
        background-color: transparent;
        border-style: none;
        color:firebrick;
        float: right;
    }

</style>