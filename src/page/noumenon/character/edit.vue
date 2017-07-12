<template>
    <div>
        <noumenon_title :title="edit_character_title"> </noumenon_title>
        <div style="margin-left:60px">
            <p class="zxw-create-character" v-bind="standard_title"  v-model="input_content.standard_name">本体名称：{{input_content.standard_name}}</p>
            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">人名：</label>
                <input id="person_name" type="text"  class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.person_name" v-bind:class="{'zxw-input-chinese':show_input}" :="repeat_nou_1">
                <label class="zxw-character-span">英译：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.english">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">姓：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.xing">
                <label class="zxw-character-span">氏：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.shi">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">字：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" v-model="input_content.zi">
                <label class="zxw-character-span">别名：</label>
                <input type="text" class="zxw-character-input" v-model="input_content.other_name">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span zxw-must-write">出生时间：</label>
                <input type="text" class="zxw-character-input zxw-edit-character-input-margin" readonly @click="open_birth()"  v-model="input_content.birth_standard_name">
                <label class="zxw-character-span zxw-must-write">死亡时间：</label>
                <input type="text" class="zxw-character-input" readonly @click="open_dead()" v-model="input_content.death_standard_name">
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">籍贯：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_location = true" @mouseout="show_location = false" v-if="input_content.location !== ''">
                            <span v-model="input_content.location" >{{input_content.location}}</span>
                            <button class="zxw-add-hover-img" v-show="show_location===true" @click="delete_location()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_location()"></button>
                </div>
                <label class="zxw-character-span">父：</label>
                <div  class="zxw-character-input">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_father = true" @mouseout="show_father = false" v-if="input_content.father.person_name !== ''">
                            <span v-model="input_content.father.person_name">{{input_content.father.person_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_father===true" @click="delete_father()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_father()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">母：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                        <span class="zxw-person-relation-span"  @mouseover="show_mother = true" @mouseout="show_mother = false" v-if="input_content.mother.person_name !== ''">
                            <span v-model="input_content.mother.person_name">{{input_content.mother.person_name}}</span>
                            <button class="zxw-add-hover-img" v-show="show_mother===true" @click="delete_mother()"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_mother()"></button>
                </div>
                <label class="zxw-character-span">子：</label>
                <div  class="zxw-character-input">
                    <div id="son" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.son_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.son_standard_name"  @mouseover="show_son=index" @mouseout="show_son =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_son === index" @click="delete_son(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_son()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">女：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div id="daughter" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.daughter_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.daughter_standard_name"  @mouseover="show_daughter=index" @mouseout="show_daughter =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_daughter === index" @click="delete_daughter(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_daughter()"></button>
                </div>
                <label class="zxw-character-span">兄弟：</label>
                <div  class="zxw-character-input">
                    <div id="brother" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.brother_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.brother_standard_name"  @mouseover="show_brother=index" @mouseout="show_brother =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_brother === index" @click="delete_brother(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_brother()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">姐妹：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div id="sister" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.sister_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.sister_standard_name"  @mouseover="show_sister=index" @mouseout="show_sister =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_sister === index" @click="delete_sister(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_sister()"></button>
                </div>
                <label class="zxw-character-span">师：</label>
                <div  class="zxw-character-input">
                    <div id="teacher" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.teacher_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.teacher_standard_name"  @mouseover="show_teacher=index" @mouseout="show_teacher =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_teacher === index" @click="delete_teacher(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_teacher()"></button>
                </div>
            </div>

            <div class="zxw-character-row">
                <label class="zxw-character-span">学生：</label>
                <div  class="zxw-character-input zxw-edit-character-input-margin">
                    <div id="student" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.student_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.student_standard_name"  @mouseover="show_student=index" @mouseout="show_student =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_student === index" @click="delete_student(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_student()"></button>
                </div>
                <label class="zxw-character-span">友：</label>
                <div  class="zxw-character-input">
                    <div id="friend" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" v-bind:contenteditable="input_content.friend_standard_name.length !== 0">
                        <span class="zxw-person-relation-span" v-for="(item,index) in input_content.friend_standard_name"  @mouseover="show_friend=index" @mouseout="show_friend =-1">
                            <span>{{item}}</span>
                            <button class="zxw-add-hover-img" v-show="show_friend === index" @click="delete_friend(index)"></button>
                        </span>
                    </div>
                    <button class="zxw-input-add-character" @click="open_friend()"></button>
                </div>
            </div>

            <div v-for="(item ,index) in add_data">
                <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
                <input type="text" class="zxw-character-input" v-bind:readonly="item.remark_name === ''&&item.remark === ''" v-model="item.remark">
                <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value" :disabled="add_data.length >=2">添加</button>
            </div>

            <div class="zxw-edit-btn">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length" @click="cancel_edit()">取消</button>
                <button class="zxw-nextbtn zxw-nextbtn-length" @click="finish_edit()" v-bind:disabled="input_content.birth_standard_name === ''|| input_content.death_standard_name === ''||input_content.person_name === ''|| show_input === true|| repeat_id !== '' ||add_data[0].remark_name === '' ||(add_data[1] !== undefined && add_data[1].remark_name === '' && add_data[1].remark !=='')"  >完成</button>
            </div>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>

        <search_modal :search_url="this.search_person" :noumenon_modal="this.father_modal" :noumenon_number="1"  v-on:close_modal="close_father" v-on:add_noumenon_relations="add_father"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.mother_modal" :noumenon_number="1" v-on:close_modal="close_mother" v-on:add_noumenon_relations="add_mother"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.son_modal" :noumenon_number="1" v-on:close_modal="close_son" v-on:add_noumenon_relations="add_son"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.daughter_modal" :noumenon_number="1" v-on:close_modal="close_daughter" v-on:add_noumenon_relations="add_daughter"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.brother_modal" :noumenon_number="1" v-on:close_modal="close_brother" v-on:add_noumenon_relations="add_brother"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.sister_modal" :noumenon_number="1" v-on:close_modal="close_sister" v-on:add_noumenon_relations="add_sister"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.teacher_modal" :noumenon_number="1" v-on:close_modal="close_teacher" v-on:add_noumenon_relations="add_teacher"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.student_modal" :noumenon_number="1" v-on:close_modal="close_student" v-on:add_noumenon_relations="add_student"></search_modal>
        <search_modal :search_url="this.search_person" :noumenon_modal="this.friend_modal" :noumenon_number="1" v-on:close_modal="close_friend" v-on:add_noumenon_relations="add_friend"></search_modal>

        <!--若人物本体规范已存在的模态框-->
        <repeat_modal :show_repeat="this.show_repeat" :repeat_name="this.input_content.standard_name" :repeat_id="this.repeat_id" :repeat_noumenon="this.repeat_noumenon" v-on:close_modal="close_repeat"></repeat_modal>

        <!--添加籍贯的模态框-->
        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal" :noumenon_number="7" v-on:close_modal="close_location" v-on:add_noumenon_relations="add_location"></search_modal>
    </div>
</template>

<script>
import noumenon_title from '../../../component/noumenon-title.vue';
import time_modal from '../../../component/time-modal.vue';
import search_modal from '../../../component/search_noumenon.vue';
import repeat_modal from '../../../component/repeat_modal.vue';

export default{
    created(){
        this.show_character();
    },

    components:{
        noumenon_title,
        time_modal,
        search_modal,
        repeat_modal,
    },

    computed:{
        standard_title(){
            if( this.input_content.birth_standard_name !== '' ){
                this.input_content.standard_name = this.input_content.person_name +'('+this.input_content.birth_standard_name+')';
            } else {
                this.input_content.standard_name = this.input_content.person_name;
            }
        },

        repeat_nou_1(){
            /*检查人名仅能输入中文*/
            if(this.input_content.person_name !== '') {
                if(!/^[\u4E00-\u9FA5]*$/.test(this.input_content.person_name)) {
                    this.show_input = true;
                } else {
                    this.show_input = false;
                }
            } else if(this.input_content.person_name === ''){
                this.show_input = false;
            }


            if(this.input_content.person_name !== '' && this.input_content.birth_standard_name !== ''&& this.show_input === false){
                let new_title = this.input_content.person_name+'('+this.input_content.birth_standard_name+')';
                if(new_title !== this.edit_character_title){
                    let repeat_object={};
                    let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=1';
                    this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
                }
            }
        }

    },

    data(){
        return {
            search_person:'/ancient_books/get_person_list_by_name.action',
            search_location:'/ancient_books/get_location_list_by_name.action',
            edit_character_title:'',
            character_url:'/ancient_books/get_person_by_id.action',
            show_location:false,
            show_input:false,
            show_father:false,
            show_mother:false,
            show_son:0,
            show_daughter:0,
            show_brother:0,
            show_sister:0,
            show_teacher:0,
            show_student:0,
            show_friend:0,
            prams:'',
            location_modal:false,
            time_modal_1:false,
            time_modal_2:false,
            father_modal:false,
            mother_modal:false,
            son_modal:false,
            daughter_modal:false,
            brother_modal:false,
            sister_modal:false,
            teacher_modal:false,
            student_modal:false,
            friend_modal:false,
            input_content:{
                standard_name:'',
                person_name:'',
                xing:'',
                shi:'',
                zi:'',
                other_name:'',
                birth_time_id:'',
                birth_standard_name:'',
                death_time_id:'',
                death_standard_name:'',
                remark_1_name:'',
                remark_2_name:'',
                remark_1:'',
                remark_2:'',
                english:'',
                location_id:'',
                location:'',
                father:{},
                mother:{},
                son:[],
                daughter:[],
                brother:[],
                sister:[],
                teacher:[],
                student:[],
                friend:[],
                son_standard_name:[],
                daughter_standard_name:[],
                brother_standard_name:[],
                sister_standard_name:[],
                teacher_standard_name:[],
                student_standard_name:[],
                friend_standard_name:[],
            },
            father_id:'',
            mother_id:'',
            add_data:[{
                value:true,
                remark_name:'',
                remark:''
            }],
            check_noumenon_repeat:'/ancient_books/check_noumenon_standard_name.action',
            show_repeat:false,
            repeat_id:'',
            repeat_noumenon:'人物本体',
            person_relations_delete:[],
            person_relations_modify:[],
            person_relations_add:[],
            modify_url:'/ancient_books/modify_person_by_id.action'
        }
    },
    methods:{

        /*根据id获取任务具体信息*/
        show_character(){
            let object = {};
            let new_url = this.character_url+'?id='+this.$route.params.nouId;
            this.http_json(new_url,'get',object,this.success_character,this.fail_character);
        },

        success_character(response){
            this.edit_character_title = response.body.standard_name;
            this.input_content.standard_name = response.body.standard_name;
            this.input_content.person_name = response.body.name;
            this.input_content.english = response.body.english;
            this.input_content.xing = response.body.xing;
            this.input_content.shi = response.body.shi;
            this.input_content.zi = response.body.zi;
            this.input_content.other_name = response.body.other_name;
            this.input_content.birth_time_id = response.body.birth_time_id;
            this.input_content.birth_standard_name = response.body.birth_time_name;
            this.input_content.death_time_id = response.body.death_time_id;
            this.input_content.death_standard_name = response.body.death_time_name;
            this.input_content.location_id = response.body.jiguan_location_id;
            this.input_content.location = response.body.jiguan_location_name;
            this.input_content.remark_1_name = response.body.remark_1_name;
            this.input_content.remark_2_name = response.body.remark_2_name;
            this.input_content.remark_1 = response.body.remark_1;
            this.input_content.remark_2 = response.body.remark_2;
            if(response.body.relations.length > 0){
                for(let i =0; i < response.body.relations.length; i++){
                    if(response.body.relations[i].relation_type === 4){

                        this.input_content.father.relation_type = response.body.relations[i].relation_type;
                        this.input_content.father.relation_id = response.body.relations[i].relation_id;
                        this.input_content.father.person_id = response.body.relations[i].person_id;
                        this.input_content.father.person_name = response.body.relations[i].person_name;
                        this.father_id = response.body.relations[i].person_id;

                    } else if(response.body.relations[i].relation_type === 5){

                        this.input_content.mother.relation_type = response.body.relations[i].relation_type;
                        this.input_content.mother.relation_id = response.body.relations[i].relation_id;
                        this.input_content.mother.person_id = response.body.relations[i].person_id;
                        this.input_content.mother.person_name = response.body.relations[i].person_name;
                        this.mother_id = response.body.relations[i].person_id;

                    } else if(response.body.relations[i].relation_type === 6){

                        this.input_content.son_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.son.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 7){

                        this.input_content.daughter_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.daughter.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 8){

                        this.input_content.brother_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.brother.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 9){

                        this.input_content.sister_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.sister.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 10){

                        this.input_content.teacher_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.teacher.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 11){

                        this.input_content.student_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.student.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });

                    } else if(response.body.relations[i].relation_type === 12){

                        this.input_content.friend_standard_name.push(response.body.relations[i].person_name);
                        this.input_content.friend.push({
                            relation_type:response.body.relations[i].relation_type,
                            relation_id:response.body.relations[i].relation_id,
                            person_id:response.body.relations[i].person_id,
                            person_name:response.body.relations[i].person_name
                        });
                    }
                }
            }
            this.add_data[0].remark_name = response.body.remark_1_name;
            this.add_data[0].remark = response.body.remark_1;
            if(response.body.remark_2_name !== ''){
                this.add_data[0].value = false;
                this.add_data.push({
                    value:true,
                    remark_name:response.body.remark_2_name,
                    remark:response.body.remark_2
                })
            }
            console.log('input_content: '+JSON.stringify(this.input_content));
            console.log('add_data: '+JSON.stringify(this.add_data));
        },

        fail_character(){
            console.log("获取信息失败");
        },

        /*本体是否重复*/
        repeat_nou_2(){
            if(this.input_content.person_name !== '' && this.input_content.birth_standard_name !== ''&& this.show_input === false){
                let repeat_object={};
                let new_url= this.check_noumenon_repeat+'?name='+this.input_content.standard_name+'&&type=1';
                this.http_json(new_url,'get',repeat_object,this.success_repeat,this.fail_repeat);
            }
        },

        success_repeat(response){
            if(response.body.result === 0){
                this.show_repeat = true;
                this.repeat_id = response.body.id;
                console.log("本体重复");
            } else if(response.body.result === 1){
                this.repeat_id = '';
                console.log("没有重复信息");
            }
        },

        fail_repeat(response){
            console.log("判断是否重复失败");
        },

        close_repeat(){
            this.show_repeat=false;
        },

        /*人物本体关系禁止键盘输入*/
        down_delete(){
            let c = event.keyCode;
            if (c === 8 || c === 46||c===32||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 105)||c === 106||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                event.returnValue = false;
            }
        },


        /*出生时间*/
        open_birth(){
            this.time_modal_1 = true;
        },

        birth_time(p){
            this.input_content.birth_time_id = p.time_id;
            this.input_content.birth_standard_name = p.standard_name;
            this.close_birth();
            this.repeat_nou_2();
        },

        close_birth(){
            this.time_modal_1 = false;
        },

        /*死亡时间*/
        open_dead(){
            this.time_modal_2 = true;
        },

        dead_time(q){
            this.input_content.death_time_id = q.time_id;
            this.input_content.death_standard_name=q.standard_name;
            this.close_dead();
        },

        close_dead(){
            this.time_modal_2 = false;
        },

        /*添加备注信息*/
        add_tip(p){
            if(this.add_data.length < 2){
                this.add_data[p].value = false;
                this.add_data.push({
                    value:true,
                    remark_name:'',
                    remark:''
                });
                console.log(this.add_data.length+JSON.stringify(this.add_data));
            }
        },

        /*关联籍贯*/
        open_location(){
            this.location_modal = true;
        },

        add_location(p){
            this.input_content.location_id = p.noumenon_id;
            this.input_content.location = p.standard_name;
            console.log('this.input_content.location_id: '+this.input_content.location_id);
            console.log('this.input_content.location: '+this.input_content.location);
        },

        delete_location(){
            this.input_content.location_id = '';
            this.input_content.location = '';
            console.log(JSON.stringify(this.input_content));
        },

        close_location(){
            this.location_modal = false;
        },


        /*关联父亲*/
        open_father(){
            this.father_modal = true;
        },

        add_father(p){
            this.input_content.father.person_id = p.noumenon_id;
            this.input_content.father.person_name = p.standard_name;
            console.log('修改的father:'+JSON.stringify(this.input_content.father));
        },

        delete_father(){
            this.input_content.father.person_name = '';
            this.input_content.father.person_id = '';
            console.log('删除的father: '+JSON.stringify(this.input_content.father));
        },

        close_father(){
            this.father_modal = false;
        },

        /*关联母亲*/
        open_mother(){
            this.mother_modal = true;
        },

        add_mother(p){
            this.input_content.mother.person_id = p.noumenon_id;
            this.input_content.mother.person_name = p.standard_name;
            console.log('修改的mother:'+JSON.stringify(this.input_content.mother));
        },

        delete_mother(){
            this.input_content.mother.person_name = '';
            this.input_content.mother.person_id = '';
            console.log('删除的mother: '+JSON.stringify(this.input_content.mother));
        },

        close_mother(){
            this.mother_modal = false;
        },

        /*关联儿子*/
        open_son(){
            this.son_modal = true;
        },

        add_son(p){

            this.input_content.son_standard_name.push(p.standard_name);
            this.input_content.son.push({
                relation_type:6,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('son_standard_name: '+JSON.stringify( this.input_content.son_standard_name));
            console.log('son: '+JSON.stringify(this.input_content.son));
        },

        delete_son(p){
            this.input_content.son_standard_name.splice(p,1);
            this.input_content.son[p].person_name = undefined;
            console.log('son_standard_name: '+JSON.stringify( this.input_content.son_standard_name));
            console.log('son: '+JSON.stringify(this.input_content.son));
        },

        close_son(){
            this.son_modal = false;
        },

        /*关联女儿*/
        open_daughter(){
            this.daughter_modal = true;
        },

        add_daughter(p){
            this.input_content.daughter_standard_name.push(p.standard_name);
            this.input_content.daughter.push({
                relation_type:7,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('daughter_standard_name: '+JSON.stringify(this.input_content.daughter_standard_name));
            console.log('daughter: '+JSON.stringify(this.input_content.daughter));
        },

        delete_daughter(p){
            this.input_content.daughter_standard_name.splice(p,1);
            this.input_content.daughter[p].person_name=undefined;
            console.log('daughter_standard_name: '+JSON.stringify(this.input_content.daughter_standard_name));
            console.log('daughter: '+JSON.stringify(this.input_content.daughter));
        },

        close_daughter(){
            this.daughter_modal = false;
        },


        /*关联兄弟*/
        open_brother(){
            this.brother_modal = true;
        },

        add_brother(p){
            this.input_content.brother_standard_name.push(p.standard_name);
            this.input_content.brother.push({
                relation_type:8,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('brother_standard_name: '+JSON.stringify(this.input_content.brother_standard_name));
            console.log('brother: '+JSON.stringify(this.input_content.brother));
        },

        delete_brother(p){
            this.input_content.brother_standard_name.splice(p,1);
            this.input_content.brother[p].person_name=undefined;
            console.log('brother_standard_name: '+JSON.stringify(this.input_content.brother_standard_name));
            console.log('brother: '+JSON.stringify(this.input_content.brother));
        },

        close_brother(){
            this.brother_modal = false;
        },

        /*关联姐妹*/
        open_sister(){
            this.sister_modal = true;
        },

        add_sister(p){
            this.input_content.sister_standard_name.push(p.standard_name);
            this.input_content.sister.push({
                relation_type:9,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('sister_standard_name: '+JSON.stringify(this.input_content.sister_standard_name));
            console.log('sister: '+JSON.stringify(this.input_content.sister));
        },

        delete_sister(p){
            this.input_content.sister_standard_name.splice(p,1);
            this.input_content.sister[p].person_name=undefined;
            console.log('sister_standard_name: '+JSON.stringify(this.input_content.sister_standard_name));
            console.log('sister: '+JSON.stringify(this.input_content.sister));
        },

        close_sister(){
            this.sister_modal = false;
        },

        /*关联师*/
        open_teacher(){
            this.teacher_modal = true;
        },

        add_teacher(p){
            this.input_content.teacher_standard_name.push(p.standard_name);
            this.input_content.teacher.push({
                relation_type:10,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('teacher_standard_name: '+JSON.stringify( this.input_content.teacher_standard_name));
            console.log('teacher: '+JSON.stringify(this.input_content.teacher));
        },

        delete_teacher(p){
            this.input_content.teacher_standard_name.splice(p,1);
            this.input_content.teacher[p].person_name=undefined;
            console.log('teacher_standard_name: '+JSON.stringify( this.input_content.teacher_standard_name));
            console.log('teacher: '+JSON.stringify(this.input_content.teacher));
        },

        close_teacher(){
            this.teacher_modal = false;
        },

        /*关联学生*/
        open_student(){
            this.student_modal = true;
        },

        add_student(p){
            this.input_content.student_standard_name.push(p.standard_name);
            this.input_content.student.push({
                relation_type:11,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('student_standard_name: '+JSON.stringify( this.input_content.student_standard_name));
            console.log('student: '+JSON.stringify(this.input_content.student));
        },

        delete_student(p){
            this.input_content.student_standard_name.splice(p,1);
            this.input_content.student[p].person_name=undefined;
            console.log('student_standard_name: '+JSON.stringify( this.input_content.student_standard_name));
            console.log('student: '+JSON.stringify(this.input_content.student));
        },

        close_student(){
            this.student_modal = false;
        },

        /*关联友*/
        open_friend(){
            this.friend_modal = true;
        },

        add_friend(p){
            this.input_content.friend_standard_name.push(p.standard_name);
            this.input_content.friend.push({
                relation_type:12,
                person_id:p.noumenon_id,
                person_name:p.standard_name
            });
            console.log('friend_standard_name:'+JSON.stringify(this.input_content.friend_standard_name));
            console.log('friend:'+JSON.stringify(this.input_content.friend));
        },

        delete_friend(p){
            this.input_content.friend_standard_name.splice(p,1);
            this.input_content.friend[p].person_name=undefined;
            console.log('friend_standard_name:'+JSON.stringify(this.input_content.friend_standard_name));
            console.log('friend:'+JSON.stringify(this.input_content.friend));
        },

        close_friend(){
            this.friend_modal = false;
        },

        cancel_edit(){
            this.$router.push({name:'char_detail',params:{nouId:this.$route.params.nouId}});
        },

        finish_edit(){
            if(this.input_content.father.person_id !== this.father_id){
                this.person_relations_modify.push({
                    relation_id:this.input_content.father.relation_id,
                    person_id:this.input_content.father.person_id
                })
            }

            if(this.input_content.mother.person_id !== this.mother_id){
                this.person_relations_modify.push({
                    relation_id:this.input_content.mother.relation_id,
                    person_id:this.input_content.mother.person_id
                })
            }

            for(let i = 0;i < this.input_content.son.length;i++){
                if(this.input_content.son[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.son[i].relation_id
                    })
                }
                if(this.input_content.son[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.son[i].relation_type,
                        person_id:this.input_content.son[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.daughter.length;i++){
                if(this.input_content.daughter[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.daughter[i].relation_id
                    })
                }
                if(this.input_content.daughter[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.daughter[i].relation_type,
                        person_id:this.input_content.daughter[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.brother.length;i++){
                if(this.input_content.brother[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.brother[i].relation_id
                    })
                }
                if(this.input_content.brother[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.brother[i].relation_type,
                        person_id:this.input_content.brother[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.sister.length;i++){
                if(this.input_content.sister[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.sister[i].relation_id
                    })
                }
                if(this.input_content.sister[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.sister[i].relation_type,
                        person_id:this.input_content.sister[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.teacher.length;i++){
                if(this.input_content.teacher[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.teacher[i].relation_id
                    })
                }
                if(this.input_content.teacher[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.teacher[i].relation_type,
                        person_id:this.input_content.teacher[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.student.length;i++){
                if(this.input_content.student[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.student[i].relation_id
                    })
                }
                if(this.input_content.student[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.student[i].relation_type,
                        person_id:this.input_content.student[i].person_id
                    })
                }
            }

            for(let i = 0;i < this.input_content.friend.length;i++){
                if(this.input_content.friend[i].person_name === undefined){
                    this.person_relations_delete.push({
                        relation_id:this.input_content.friend[i].relation_id
                    })
                }
                if(this.input_content.friend[i].relation_id === undefined){
                    this.person_relations_add.push({
                        relation_type:this.input_content.friend[i].relation_type,
                        person_id:this.input_content.friend[i].person_id
                    })
                }
            }

            let edit_object={};
            edit_object.id=this.$route.params.nouId;
            edit_object.standard_name=this.input_content.standard_name;
            edit_object.person_name=this.input_content.person_name;
            edit_object.xing=this.input_content.xing;
            edit_object.shi=this.input_content.shi;
            edit_object.zi=this.input_content.zi;
            edit_object.other_name=this.input_content.other_name;
            edit_object.birth_time_id=this.input_content.birth_time_id;
            edit_object.death_time_id=this.input_content.death_time_id;
            edit_object.remark_1_name=this.input_content.remark_1_name;
            edit_object.remark_2_name=this.input_content.remark_2_name;
            edit_object.remark_1=this.input_content.remark_1;
            edit_object.remark_2=this.input_content.remark_2;
            edit_object.english=this.input_content.english;
            edit_object.location_id=this.input_content.location_id;
            edit_object.person_relations_delete=this.person_relations_delete;
            edit_object.person_relations_modify=this.person_relations_modify;
            edit_object.person_relations_add=this.person_relations_add;
            console.log(JSON.stringify(edit_object));
            this.http_json(this.modify_url,'post',this.success_modify_char,this.fail_modify_char);
        },

        success_modify_char(response){
            if(response.body.result === 1){
                this.$router.push({name:'char_detail',params:{nouId:this.$route.params.nouId}});
            }
        },

        fail_modify_char(){
            console.log("修改人物本体失败");
        }
    }
}
</script>

<style>
   .zxw-edit-character-input-margin{
     margin-right:300px;
   }

    .zxw-edit-btn{
        float: right;
        margin:20px 50px 0 0;
    }

</style>