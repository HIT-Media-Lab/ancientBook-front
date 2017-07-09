<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character" v-bind="standard_title" v-model="input_content.standard_name">本体名称：{{input_content.standard_name}}</p>
        <div class="zxw-character-row">
            <label class="zxw-character-span zxw-must-write">人名：</label>
            <input type="text"  class="zxw-character-input zxw-character-input-margin" v-model="input_content.person_name" @change="input_chinese()" v-bind:class="{'zxw-input-chinese':show_input}">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.english">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.xing">
            <label class="zxw-character-span">氏：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.shi">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.zi">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.other_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span zxw-must-write">出生时间：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" readonly @click="open_birth()"  v-model="input_content.birth_standard_name">
            <label class="zxw-character-span zxw-must-write">死亡时间：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" readonly @click="open_dead()" v-model="input_content.death_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin" v-model="input_content.location">
            <label class="zxw-character-span">父：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                    <span class="zxw-person-relation-span"  @mouseover="show_father = true" @mouseout="show_father = false" v-if="input_content.father_standard_name !== ''">
                        <span contenteditable="false" v-model="input_content.father_standard_name">{{input_content.father_standard_name}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_father===true" @click="delete_father()"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_father()"></button>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div class="zxw-div-input" placeholder="点击右侧按钮添加">
                    <span class="zxw-person-relation-span"  @mouseover="show_mother = true" @mouseout="show_mother = false" v-if="input_content.mother_standard_name !== ''">
                        <span contenteditable="false" v-model="input_content.mother_standard_name">{{input_content.mother_standard_name}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_mother===true" @click="delete_mother()"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_father()"></button>
            </div>
            <label class="zxw-character-span">子：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="son" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="son_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.son_standard_name"  @mouseover="show_son=index" @mouseout="show_son =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_son === index" @click="delete_son(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_son()"></button>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="daughter" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="daughter_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.daughter_standard_name"  @mouseover="show_daughter=index" @mouseout="show_daughter =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_daughter === index" @click="delete_daughter(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_daughter()"></button>
            </div>
            <label class="zxw-character-span">兄弟：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="brother" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="brother_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.brother_standard_name"  @mouseover="show_brother=index" @mouseout="show_brother =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_brother === index" @click="delete_brother(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_brother()"></button>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="sister" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="sister_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.sister_standard_name"  @mouseover="show_sister=index" @mouseout="show_sister =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_sister === index" @click="delete_sister(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_sister()"></button>
            </div>
            <label class="zxw-character-span">师：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="teacher" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="teacher_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.teacher_standard_name"  @mouseover="show_teacher=index" @mouseout="show_teacher =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_teacher === index" @click="delete_teacher(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_teacher()"></button>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="student" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="student_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.student_standard_name"  @mouseover="show_student=index" @mouseout="show_student =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_student === index" @click="delete_student(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_student()"></button>
            </div>
            <label class="zxw-character-span">友：</label>
            <div  class="zxw-character-input zxw-character-input-margin">
                <div id="friend" class="zxw-div-input" placeholder="点击右侧按钮添加"  @keydown="down_delete()" @mousedown="friend_edit()">
                    <span class="zxw-person-relation-span" v-for="(item,index) in input_content.friend_standard_name"  @mouseover="show_friend=index" @mouseout="show_friend =-1">
                        <span contenteditable="false">{{item}}</span>
                        <button class="zxw-add-hover-img" contenteditable="false" v-show="show_friend === index" @click="delete_friend(index)"></button>
                    </span>
                </div>
                <button class="zxw-input-add-character" @click="open_friend()"></button>
            </div>
        </div>

        <div v-for="(item ,index) in add_data">
            <input type="text" class="zxw-character-input-head zxw-character-input" v-model="item.remark_name">
            <input type="text" class="zxw-character-input" v-bind:disabled="item.remark_name === ''" v-model="item.remark">
            <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value">添加</button>
        </div>


        <div class="zxw-build-step2-btn">
            <router-link to="/build">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="next_step()" v-bind:disabled="input_content.birth_standard_name === ''|| input_content.death_standard_name === ''||input_content.person_name === ''|| show_input === true" >下一步</button>

        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>

        <character_modal :character_modal="this.father_modal"  v-on:close_modal="close_father" v-on:add_person_relations="add_father"></character_modal>
        <character_modal :character_modal="this.mother_modal" v-on:close_modal="close_mother" v-on:add_person_relations="add_mother"></character_modal>
        <character_modal :character_modal="this.son_modal" v-on:close_modal="close_son" v-on:add_person_relations="add_son"></character_modal>
        <character_modal :character_modal="this.daughter_modal" v-on:close_modal="close_daughter" v-on:add_person_relations="add_daughter"></character_modal>
        <character_modal :character_modal="this.brother_modal" v-on:close_modal="close_brother" v-on:add_person_relations="add_brother"></character_modal>
        <character_modal :character_modal="this.sister_modal" v-on:close_modal="close_sister" v-on:add_person_relations="add_sister"></character_modal>
        <character_modal :character_modal="this.teacher_modal" v-on:close_modal="close_teacher" v-on:add_person_relations="add_teacher"></character_modal>
        <character_modal :character_modal="this.student_modal" v-on:close_modal="close_student" v-on:add_person_relations="add_student"></character_modal>
        <character_modal :character_modal="this.friend_modal" v-on:close_modal="close_friend" v-on:add_person_relations="add_friend"></character_modal>

    </div>
</template>

<script>
    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import character_modal from '../../../../component/search_character.vue';
    export default{
        created(){
            this.prams = this.$route.name;
            this.show_character_info();

        },

        components:{
            create_word,
            time_modal,
            character_modal
        },

        computed:{
            standard_title(){
                if( this.input_content.birth_standard_name !== '' ){
                    this.input_content.standard_name = this.input_content.person_name +'('+this.input_content.birth_standard_name+')';
                } else {
                    this.input_content.standard_name = this.input_content.person_name;
                }
            }
        },

        data(){
            return{
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
                    father_standard_name:'',
                    mother_standard_name:'',
                    son_standard_name:[],
                    daughter_standard_name:[],
                    brother_standard_name:[],
                    sister_standard_name:[],
                    teacher_standard_name:[],
                    student_standard_name:[],
                    friend_standard_name:[],
                },
                add_data:[{
                    value:true,
                    remark_name:'',
                    remark:''
                    }]
            }
        },

        methods:{
            down_delete(){
                let c = event.keyCode;
                if (c === 8 || c === 46||c===32||(c >= 48 && c <= 57)||(c >= 65 && c <= 90)||(c >= 96 && c <= 105)||c === 106||(c >= 186 && c <= 192)||(c >= 219 && c <= 222)) {
                    event.returnValue = false;
                }
            },

            input_chinese(){
                if(this.input_content.person_name !== '') {
                    if(/[^\u0000-\u00FF]/.test(this.input_content.person_name) === false) {
                        this.show_input = true;
                    } else {
                        this.show_input = false;
                    }
                } else{
                    this.show_input = false;
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
                this.add_data[p].value = false;
                this.add_data.push({
                    value:true,
                    remark_name:'',
                    remark:''
                });
                console.log(this.add_data.length+JSON.stringify(this.add_data));
            },

            /*关联父亲*/
            open_father(){
                this.father_modal = true;
            },

            add_father(p){
                this.input_content.father.relation_type=4;
                this.input_content.father.person_id = p.noumenon_id;
                this.input_content.father_standard_name = p.standard_name;
                console.log('this.input_content.father_standard_name:'+JSON.stringify( this.input_content.father_standard_name));
                console.log('this.input_content.father:'+JSON.stringify(this.input_content.father));
            },

            delete_father(){
                this.input_content.father.person_id = undefined;
                this.input_content.father_standard_name = '';
                console.log(JSON.stringify(this.input_content));
            },

            close_father(){
                this.father_modal = false;
            },

            /*关联母亲*/
            open_mother(){
                this.mother_modal = true;
            },

            add_mother(p){
                this.input_content.mother.relation_type = 5;
                this.input_content.mother.person_id = p.noumenon_id;
                this.input_content.mother_standard_name = p.standard_name;
                console.log('this.input_content.mother_standard_name:'+JSON.stringify( this.input_content.mother_standard_name));
                console.log('this.input_content.mother:'+JSON.stringify(this.input_content.mother));
            },

            delete_mother(){
                this.input_content.mother.person_id = undefined;
                this.input_content.mother_standard_name = '';
                console.log(''+JSON.stringify(this.input_content));
            },

            close_mother(){
                this.mother_modal = false;
            },

            /*关联儿子*/
            open_son(){
                this.son_modal = true;
            },

            add_son(p){
                this.input_content.son.push({
                    relation_type:6,
                    person_id:p.noumenon_id
                });
                this.input_content.son_standard_name.push(p.standard_name);
                console.log('this.input_content.son_standard_name:'+JSON.stringify( this.input_content.son_standard_name));
                console.log('this.input_content.son:'+JSON.stringify(this.input_content.son));
            },

            delete_son(p){
                this.input_content.son_standard_name.splice(p,1);
                this.input_content.son.splice(p,1);
                console.log('splice son:'+JSON.stringify(this.input_content.son));
            },

            son_edit(){
                if (this.input_content.son_standard_name.length===0){
                    document.getElementById("son").contentEditable=false;
                }else{
                    document.getElementById("son").contentEditable=true;
                }
            },

            close_son(){
                this.son_modal = false;
            },

            /*关联女儿*/
            open_daughter(){
                this.daughter_modal = true;
            },

            add_daughter(p){
                this.input_content.daughter.push({
                    relation_type:7,
                    person_id:p.noumenon_id
                });
                this.input_content.daughter_standard_name.push(p.standard_name);
                console.log(' this.input_content.daughter_standard_name:'+JSON.stringify(this.input_content.daughter_standard_name));
                console.log('this.input_content.daughter:'+JSON.stringify(this.input_content.daughter));
            },

            delete_daughter(p){
                this.input_content.daughter_standard_name.splice(p,1);
                this.input_content.daughter.splice(p,1);
                console.log('splice daughter:'+JSON.stringify(this.input_content.daughter));
            },

            daughter_edit(){
                if(this.input_content.daughter_standard_name.length === 0){
                    document.getElementById("daughter").contentEditable=false;
                }else{
                    document.getElementById("daughter").contentEditable=true;
                }
            },

            close_daughter(){
                this.daughter_modal = false;
            },


            /*关联兄弟*/
            open_brother(){
                this.brother_modal = true;
            },

            add_brother(p){
                this.input_content.brother.push({
                    relation_type:8,
                    person_id:p.noumenon_id
                });
                this.input_content.brother_standard_name.push(p.standard_name);
                console.log('this.input_content.brother_standard_name:'+JSON.stringify(this.input_content.brother_standard_name));
                console.log('this.input_content.brother:'+JSON.stringify(this.input_content.brother));
            },

            delete_brother(p){
                this.input_content.brother_standard_name.splice(p,1);
                this.input_content.brother.splice(p,1);
                console.log('splice brother:'+JSON.stringify(this.input_content.brother));
            },

            brother_edit(){
                if(this.input_content.brother_standard_name.length === 0){
                    document.getElementById("brother").contentEditable=false;
                }else{
                    document.getElementById("brother").contentEditable=true;
                }
            },

            close_brother(){
                this.brother_modal = false;
            },

            /*关联姐妹*/
            open_sister(){
                this.sister_modal = true;
            },

            add_sister(p){
                this.input_content.sister.push({
                    relation_type:9,
                    person_id:p.noumenon_id
                });
                this.input_content.sister_standard_name.push(p.standard_name);
                console.log('this.input_content.sister_standard_name:'+JSON.stringify(this.input_content.sister_standard_name));
                console.log('this.input_content.sister:'+JSON.stringify(this.input_content.sister));
            },

            delete_sister(p){
                this.input_content.sister_standard_name.splice(p,1);
                this.input_content.sister.splice(p,1);
                console.log('splice sister:'+JSON.stringify(this.input_content.sister));
            },

            sister_edit(){
                if(this.input_content.sister_standard_name.length === 0){
                    document.getElementById("sister").contentEditable=false;
                }else{
                    document.getElementById("sister").contentEditable=true;
                }
            },

            close_sister(){
                this.sister_modal = false;
            },

            /*关联师*/
            open_teacher(){
                this.teacher_modal = true;
            },

            add_teacher(p){
                this.input_content.teacher.push({
                    relation_type:10,
                    person_id:p.noumenon_id
                });
                this.input_content.teacher_standard_name.push(p.standard_name);
                console.log('this.input_content.teacher_standard_name:'+JSON.stringify( this.input_content.teacher_standard_name));
                console.log('this.input_content.teacher:'+JSON.stringify(this.input_content.teacher));
            },

            delete_teacher(p){
                this.input_content.teacher_standard_name.splice(p,1);
                this.input_content.teacher.splice(p,1);
                console.log('splice teacher:'+JSON.stringify(this.input_content.teacher));
            },

            teacher_edit(){
                if(this.input_content.teacher_standard_name.length === 0){
                    document.getElementById("teacher").contentEditable=false;
                }else{
                    document.getElementById("teacher").contentEditable=true;
                }
            },

            close_teacher(){
                this.teacher_modal = false;
            },

            /*关联学生*/
            open_student(){
                this.student_modal = true;
            },

            add_student(p){
                this.input_content.student.push({
                    relation_type:11,
                    person_id:p.noumenon_id
                });
                this.input_content.student_standard_name.push(p.standard_name);
                console.log(' this.input_content.student_standard_name:'+JSON.stringify( this.input_content.student_standard_name));
                console.log('this.input_content.student:'+JSON.stringify(this.input_content.student));
            },

            delete_student(p){
                this.input_content.student_standard_name.splice(p,1);
                this.input_content.student.splice(p,1);
                console.log('splice student:'+JSON.stringify(this.input_content.student));
            },

            student_edit(){
                if(this.input_content.student_standard_name.length === 0){
                    document.getElementById("student").contentEditable=false;
                }else{
                    document.getElementById("student").contentEditable=true;
                }
            },

            close_student(){
                this.student_modal = false;
            },

            /*关联友*/
            open_friend(){
                this.friend_modal = true;
            },

            add_friend(p){
                this.input_content.friend.push({
                    relation_type:12,
                    person_id:p.noumenon_id
                });
                this.input_content.friend_standard_name.push(p.standard_name);
                console.log(' this.input_content.friend_standard_name:'+JSON.stringify(this.input_content.friend_standard_name));
                console.log('this.input_content.friend:'+JSON.stringify(this.input_content.friend));
            },

            delete_friend(p){
                this.input_content.friend_standard_name.splice(p,1);
                this.input_content.friend.splice(p,1);
                console.log('splice friend:'+JSON.stringify(this.input_content.friend));
            },

            friend_edit(){
                if(this.input_content.friend_standard_name.length === 0){
                    document.getElementById("friend").contentEditable=false;
                }else{
                    document.getElementById("friend").contentEditable=true;
                }
            },

            close_friend(){
                this.friend_modal = false;
            },

            /*下一步*/
            next_step(){
                console.log('add_data:'+JSON.stringify(this.add_data));
                this.input_content.remark_1_name = this.add_data[0].remark_name;
                this.input_content.remark_1 = this.add_data[0].remark;
                if(typeof this.add_data[1] !== 'undefined'){
                    this.input_content.remark_2_name = this.add_data[1].remark_name;
                    this.input_content.remark_2 = this.add_data[1].remark;
                }
                this.$store.commit("get_create_character",this.input_content);
                this.$router.push({path:'/charthree'});
            },

            /*第三步的“上一步”*/
            show_character_info(){
                this.input_content = this.$store.getters.get_build_character;
                this.add_data[0].remark_name = this.input_content.remark_1_name;
                this.add_data[0].remark = this.input_content.remark_1;
                if( this.input_content.remark_2_name !== ''|| this.input_content.remark_2 !== '') {
                    this.add_tip(0);
                    this.add_data[1].remark_name = this.input_content.remark_2_name;
                    this.add_data[1].remark = this.input_content.remark_2;
                }
            }
        }
    }
</script>

<style>
    /*控制每一行距*/
    .zxw-character-row{
       margin:0 0 20px 0;
    }

    /*新建第二部的题目*/
    .zxw-create-character{
        font-size: 18px;
        margin:42px 0 34px 0;
        color:#a50000;
        font-weight: bold ;
    }

    /*输入框样式*/
    .zxw-character-input{
        display:inline-block;
        border: 2px solid black;
        background-color: transparent;
        height:30px;
        width:220px;
        text-align: left;
        padding-left:5px;
    }

    /*输入框间距*/
    .zxw-character-input-margin{
        margin:0 200px 0 0;
    }


    /*备注输入头的样式*/
    .zxw-character-input-head{
        margin:0 15px 10px 0;
        width:65px;
    }

    /*label与输入框之间的距离*/
    .zxw-character-span{
        width:80px;
    }

    .zxw-must-write{
        color:#a50000;
    }

    /*添加按钮的间距*/
    .zxw-add-button{
        background-image: url("../../../../assets/img/add-button.png");
        background-color: transparent;
        border: none;
        width:100px;
        height:43px;
        color:gainsboro;
        margin:0 0 0 35px;
    }

    .zxw-build-step2-btn{
        float:right;
        margin:0 300px 0 0;
        position:relative;
    }

    .zxw-input-add-character{
        background-image: url("../../../../assets/img/add-character.png");
        background-repeat: no-repeat;
        background-position: right;
        background-size: 20px 20px;
        width:20px;
        height:20px;
        float:right;
        margin:3px 3px 0 0;
        position: static;
    }

    .zxw-person-relation-span{
        display:inline-block;
        margin:0 5px 0 0;
        padding:0 3px 0 3px;
        background-color: #f5dece;
    }

    .zxw-add-hover-img{
        background-image: url("../../../../assets/img/add-character-hover.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        width:10px;
        height:10px;
        float:right;
    }

    .zxw-input-chinese{
        border-color:#a50000;
    }

    .zxw-div-input{
        display:inline-block;
        width:185px;
        height:25px;
        padding:3px 0 0 0;
        outline: none;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow: hidden;
    }


    .zxw-div-input:empty::before{
        font-size: 13px;
        color:gray;
        content:attr(placeholder);
    }

</style>