<template>
    <div class="zxwnoumenom-body">
        <noumenon-title :title="this.title">
            <noumenon-button slot="children"></noumenon-button>
        </noumenon-title>

        <div>
            <!-- <p>{{$route.params.id}}</p>-->
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
                <span v-model="father.person_name,father.person_id">{{father.person_name}}---{{father.person_id}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">母：</span>
                <span v-model="mother.person_name,mother.person_id">{{mother.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">子：</span>
                <span v-model="son.person_name,son.person_id">{{son.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">女：</span>
                <span v-model="daughter.person_name,daughter.person_id">{{daughter.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">兄弟：</span>
                <span v-model="brother.person_name,brother.person_id">{{brother.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">姐妹：</span>
                <span v-model="sister.person_name,sister.person_id">{{sister.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">师：</span>
                <span v-model="teacher.person_name,teacher.person_id">{{teacher.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">学生：</span>
                <span v-model="student.person_name,student.person_id">{{student.person_name}}</span>
            </div>

            <div class="row">
                <span class="col-md-2">友：</span>
                <span v-model="friend.person_name,friend.person_id">{{friend.person_name}}</span>
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
   /* let Mock = require('mockjs');

    //显示用户列表
    Mock.mock('/ancient_books/get_person_by_id.action?id=111','get',{
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
        "relations|9": [
            {
                "relation_type|4": 1,
                "relation_id|1-100": 1,
                "person_id_100-1000": 1,
                "person_name": "@FIRST"
            }
        ]
    });*/

    import noumenonTitle from '../../../component/noumenon-title.vue';
    import noumenonButton from '../../../component/noumenon-button.vue';
    export default{
        created(){
            //Vuex得到具体人物ID
            //this.id = this.$route.params.id;
            console.log('id='+this.id);
            this.personInfo();
        },

        components:{
            noumenonTitle,
            noumenonButton
        },

        data(){
            return{
                id:1,
                title:'',
                person_url:'/ancient_books/get_person_by_id.action',
                person_object:{}, //get请求的对象
                person_content:{},  //成功回调后的对象
                relations:[],

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
            successId(response){
                console.log("ggggf");
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

                            this.father.relation_type=response.body.relations[i].relation_type;
                                this.father.relation_id=response.body.relations[i].relation_id;
                                this.father.person_id=response.body.relations[i].person_id;
                                this.father.person_name=response.body.relations[i].person_name;

                    } else if (response.body.relations[i].relation_type === 5) {

                           this.mother.relation_type=response.body.relations[i].relation_type;
                               this.mother.relation_id=response.body.relations[i].relation_id;
                               this.mother.person_id=response.body.relations[i].person_id;
                               this.mother.person_name=response.body.relations[i].person_name;

                    } else if (response.body.relations[i].relation_type === 6) {
                        this.son.relation_type=response.body.relations[i].relation_type;
                            this.son.relation_id=response.body.relations[i].relation_id;
                            this.son.person_id=response.body.relations[i].person_id;
                            this.son.person_name=response.body.relations[i].person_name;

                    } else if (response.body.relations[i].relation_type === 7) {
                            this.daughter.relation_type=response.body.relations[i].relation_type;
                            this.daughter.relation_id=response.body.relations[i].relation_id;
                                this.daughter.person_id=response.body.relations[i].person_id;
                                this.daughter.person_name=response.body.relations[i].person_name;
                    } else if(response.body.relations[i].relation_type === 8) {
                           this.brother.relation_type=response.body.relations[i].relation_type;
                           this.brother.relation_id=response.body.relations[i].relation_id;
                           this.brother.person_id=response.body.relations[i].person_id;
                               this.brother.person_name=response.body.relations[i].person_name;
                    } else if(response.body.relations[i].relation_type === 9) {
                            this.sister.relation_type=response.body.relations[i].relation_type;
                                this.sister.relation_id=response.body.relations[i].relation_id;
                                this.sister.person_id=response.body.relations[i].person_id;
                                this.sister.person_name=response.body.relations[i].person_name;
                    } else if(response.body.relations[i].relation_type === 10) {

                            this.teacher.relation_type=response.body.relations[i].relation_type;
                        this.teacher.relation_id=response.body.relations[i].relation_id;
                        this.teacher.person_id= response.body.relations[i].person_id;
                        this.teacher.person_name=response.body.relations[i].person_name;
                    } else if(response.body.relations[i].relation_type === 11) {
                        this.student.relation_type=response.body.relations[i].relation_type;
                        this.student.relation_id=response.body.relations[i].relation_id;
                            this.student.person_id=response.body.relations[i].person_id;
                            this.student.person_name=response.body.relations[i].person_name;
                    } else if(response.body.relations[i].relation_type === 12) {

                        this.friend.relation_type=response.body.relations[i].relation_type;
                        this.friend.relation_id=response.body.relations[i].relation_id;
                            this.friend.person_id=response.body.relations[i].person_id;
                            this.friend.person_name=response.body.relations[i].person_name;

                    }
                }
                   /* this.person_content.relations.push({
                        relation_type: response.body.relations.relation_type,
                        relation_id: response.body.relations.relation_id,
                        person_id: response.body.relations.person_id,
                        person_name: response.body.relations.person_name
                    })*/
            },

            failId(){
                console.log("具体显示人物失败");
            },

            personInfo(){
                this.person_object.value = '?id='+this.id;
                let new_url = this.person_url + this.person_object.value;
                this.httpJson(new_url,'get',this.person_object,this.successId,this.failId);
            }
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