<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.title">
            <noumenon_button slot="children"></noumenon_button>
        </noumenon_title>

            <div class=" zxw-characterbody">
                <p class="zxwspan-length">人名：</p>
                <p class="zxwspan-length" v-model="person_content.name">{{person_content.name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">英译：</p>
                <p class="zxwspan-length" v-model="person_content.english">{{person_content.english}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">姓：</p>
                <span class="zxwspan-length" v-model="person_content.xing">{{person_content.xing}}</span>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">氏：</p>
                <p class="zxwspan-length" v-model="person_content.shi">{{person_content.shi}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">字：</p>
                <p class="zxwspan-length" v-model="person_content.zi">{{person_content.zi}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">别名：</p>
                <p class="zxwspan-length" v-model="person_content.other_name">{{person_content.other_name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">出生时间：</p>
                <p class="zxwspan-length" v-model="person_content.birth_time_name,person_content.birth_time_id">{{person_content.birth_time_name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">死亡时间：</p>
                <p class="zxwspan-length" v-model="person_content.death_time_name,person_content.death_time_id">{{person_content.death_time_name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">籍贯：</p>
                <p class="zxwspan-length" v-model="person_content.jiguan_location_id,person_content.jiguan_location_name">{{person_content.jiguan_location_name}}</p>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length">父：</p>
                <template v-if="father.length > 0">
                    <button class="zxwbtn-info zxwspan-length" v-model="father[0]"  @click="person_info(father[0].person_id)">{{father[0].person_name}}</button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">母：</p>
                <template v-if="mother.length > 0">
                    <button class="zxwbtn-info zxwspan-length" v-model="mother[0]" @click="person_info(mother[0].person_id)">{{mother[0].person_name}}</button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">子：</p>
                <template v-if="son.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in son" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="son.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">女：</p>
                <template v-if="daughter.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in daughter" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="daughter.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">兄弟：</p>
                <template v-if="brother.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in brother" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="brother.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">姐妹：</p>
                <template v-if="sister.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in sister" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="sister.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">师：</p>
                <template v-if="teacher.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in teacher" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="teacher.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">学生：</p>
                <template v-if="student.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in student" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="student.length > 1">;</span></button>
                </template>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length">友：</p>
                <template v-if="friend.length > 0">
                    <button class="zxwbtn-info zxwspan-length"  v-for="(item,index) in friend" @click="person_info(item.person_id)">{{item.person_name}} <span v-if="friend.length > 1">;</span></button>
                </template>
            </div>

            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="person_content.remark_1_name">{{person_content.remark_1_name}}<span v-if="person_content.remark_1_name !=='' ">:</span></p>
                <p class="zxwspan-length" v-model="person_content.remark_1">{{person_content.remark_1}}</p>
            </div>
            <div class="zxw-infospan">
                <p class="zxwspan-length" v-model="person_content.remark_2_name">{{person_content.remark_2_name}}<span v-if="person_content.remark_2_name !=='' ">:</span></p>
                <p class="zxwspan-length" v-model="person_content.remark_2">{{person_content.remark_2}}</p>
            </div>
            <button  class="zxwnoumenom-button zxwdelete-character" @click="delete_character()">删除本体</button>
        </div>
</template>

<script>
    let Mock = require('mockjs');
     //显示用户列表
     Mock.mock('/ancient_books/get_person_by_id.action?id=1','get',{
     "status|200":200,
     "standard_name":'鹿晗（西周）',
         "name":'鹿晗',
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
     "remark_1_name|1": 1,
     "remark_2_name": "",
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
             "person_name": '鹿晗'
         },
         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": '迪丽热巴'
         },
         {
             "relation_type|6": 1,
             "relation_id|1-100": 1,
             "person_id|100-1000": 1,
             "person_name": '陈赫'
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
            this.person_info();
        },
        components:{
            noumenon_title,
            noumenon_button
        },
        data(){
            return{
                title:'',
                get_person_url:'/ancient_books/get_person_by_id.action',
                delete_character_url:'/ancient_books/delete_person_by_id.action',
                person_content:{},  //成功回调后的对象
                father:[],
                mother:[],
                son:[],
                daughter:[],
                brother:[],
                sister:[],
                teacher:[],
                student:[],
                friend:[],
                show_info:false,
                delete_info:''
            }
        },
        methods:{
            success_id(response){
                //存在前端显示的数组里
                this.title = response.body.standard_name;
                this.person_content.standard_name = response.body.standard_name;
                this.person_content.name = response.body.name;
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
                if(response.body.relations.length > 0) {
                    for (let i = 0; i < response.body.relations.length; i++) {
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

                        } else if (response.body.relations[i].relation_type === 8) {
                            this.brother.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.brother));

                        } else if (response.body.relations[i].relation_type === 9) {
                            this.sister.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.sister));

                        } else if (response.body.relations[i].relation_type === 10) {
                            this.teacher.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.teacher));

                        } else if (response.body.relations[i].relation_type === 11) {
                            this.student.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.student));

                        } else if (response.body.relations[i].relation_type === 12) {
                            this.friend.push({
                                relation_type: response.body.relations[i].relation_type,
                                relation_id: response.body.relations[i].relation_id,
                                person_id: response.body.relations[i].person_id,
                                person_name: response.body.relations[i].person_name
                            });
                            console.log(JSON.stringify(this.friend));
                        }
                    }
                }
                console.log(JSON.stringify(this.person_content));
            },

            fail_id(response){
                console.log("具体显示人物失败");
            },

            person_info(){
                let person_object={};
                let new_url = this.get_person_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',person_object,this.success_id,this.fail_id);
            },

            success_delete(response){
                if(response.body.result === 1){
                    this.$router.push({path:'/noumenon'});
                } else {
                    //this.$router.match()
                    //this.show_info =true;
                    //this.delete_info = response.body.info;
                }
            },

            fail_delete(response){
                console.log("")
            },

            delete_character(){
                let delete_object = {};
                delete_object.id = this.$route.params.nouId;
                this.http_json(this.delete_character_url,'post',this.success_delete,this.fail_delete);
            }
        }
    }
</script>

<style>
    /*人物本体详情内容与标题距离*/
    .zxw-characterbody{
        margin:40px 0 0 40px;
    }

    /*删除本体button距离*/
    .zxwdelete-character{
        width:140px;
        height:45px;
        margin: 37px 0 0 30px;
    }

    /*详情内的button*/
    .zxwbtn-info{
        text-align: left;
        background-color: transparent;
        border-style: none;
    }

    /*各内容之间的间距*/
    .zxw-infospan {
        margin: 17px 0 0 40px;
    }


    .zxwspan-length{
        font-weight: bold;
        width:100px;
        display:inline-block;
    }
</style>