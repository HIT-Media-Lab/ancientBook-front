<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_character.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">人名：</label>
            <input type="text" class="zxw-display-list-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.person_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class="zxw-display-list-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.xing === '' " >
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_character.xing" v-else>
            <label class="zxw-character-span">氏：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.shi === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.shi" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class="zxw-display-list-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.zi === '' " >
            <input type="text" class="zxw-character-input-content zxw-display-list-margin" readonly v-model="this.$store.getters.get_build_character.zi" v-else>
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.other_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.other_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">出生时间：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_character.birth_standard_name" @click="show_tooltipinfo_birth()" v-if="show_tooltip[0] === false">{{$store.getters.get_build_character.birth_standard_name}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_character.birth_standard_name" @click="show_tooltipinfo_birth()" v-if="show_tooltip[0] === true">{{$store.getters.get_build_character.birth_standard_name}}</p>

            <label class="zxw-character-span">死亡时间：</label>
            <p class="zxw-character-input-content zxw-display-cursor" v-model="this.$store.getters.get_build_character.death_standard_name" @click="show_tooltipinfo_death()" v-if="show_tooltip[1] === false">{{$store.getters.get_build_character.death_standard_name}}</p>
            <p class="zxw-display-list" v-model="this.$store.getters.get_build_character.death_standard_name" @click="show_tooltipinfo_death()" v-else>{{$store.getters.get_build_character.death_standard_name}}</p>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_character.location === '' ">不详</p>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_character.location" @click="show_tooltipinfo_location()" v-if="this.$store.getters.get_build_character.location !== '' && show_tooltip[2] === false">{{$store.getters.get_build_character.location}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_character.location" @click="show_tooltipinfo_location()" v-if="this.$store.getters.get_build_character.location !== '' && show_tooltip[2] === true">{{$store.getters.get_build_character.location}}</p>

            <label class="zxw-character-span">父：</label>
            <p class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_character.father_standard_name.length === 0 ">不详</p>
            <p class="zxw-character-input-content zxw-display-cursor" v-model="this.$store.getters.get_build_character.father_standard_name" @click="show_tooltipinfo_father()" v-if="$store.getters.get_build_character.father_standard_name !== '' && show_tooltip[3] === false">{{$store.getters.get_build_character.father_standard_name}}</p>
            <p class="zxw-display-list" v-model="this.$store.getters.get_build_character.father_standard_name" @click="show_tooltipinfo_father()" v-if="this.$store.getters.get_build_character.father_standard_name !== '' && show_tooltip[3]=== true">{{$store.getters.get_build_character.father_standard_name}}</p>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_character.mother_standard_name.length === 0 ">不详</p>
            <p class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" v-model="this.$store.getters.get_build_character.mother_standard_name" @click="show_tooltipinfo_mother()" v-if="$store.getters.get_build_character.mother_standard_name !== '' && show_tooltip[4] === false">{{$store.getters.get_build_character.mother_standard_name}}</p>
            <p class="zxw-display-list zxw-display-list-margin" v-model="this.$store.getters.get_build_character.mother_standard_name" @click="show_tooltipinfo_mother()" v-if="$store.getters.get_build_character.mother_standard_name !== '' && show_tooltip[4] === true">{{$store.getters.get_build_character.mother_standard_name}}</p>

            <label class="zxw-character-span">子：</label>
            <p    class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_character.son_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-cursor" @click="show_tooltipinfo_son()" v-if="$store.getters.get_build_character.son_standard_name.length > 0 && show_tooltip[5] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.son_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list"  @click="show_tooltipinfo_son()" v-if="$store.getters.get_build_character.son_standard_name.length > 0 && show_tooltip[5] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.son_standard_name">{{item}}</p>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <p    class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_character.daughter_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" @click="show_tooltipinfo_daughter()" v-if="$store.getters.get_build_character.daughter_standard_name.length > 0 && show_tooltip[6] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.daughter_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list zxw-display-list-margin"  @click="show_tooltipinfo_daughter()" v-if="$store.getters.get_build_character.daughter_standard_name.length > 0 && show_tooltip[6] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.daughter_standard_name">{{item}}</p>
            </div>

            <label class="zxw-character-span">兄弟：</label>
            <p    class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_character.brother_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-cursor" @click="show_tooltipinfo_brother()" v-if="$store.getters.get_build_character.brother_standard_name.length > 0 && show_tooltip[7] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.brother_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list"  @click="show_tooltipinfo_brother()" v-if="$store.getters.get_build_character.brother_standard_name.length > 0 && show_tooltip[7] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.brother_standard_name">{{item}}</p>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <p    class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_character.sister_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" @click="show_tooltipinfo_sister()" v-if="$store.getters.get_build_character.sister_standard_name.length > 0 && show_tooltip[8] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.sister_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list zxw-display-list-margin"  @click="show_tooltipinfo_sister()" v-if="$store.getters.get_build_character.sister_standard_name.length > 0 && show_tooltip[8] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.sister_standard_name">{{item}}</p>
            </div>

            <label class="zxw-character-span">师：</label>
            <p    class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_character.teacher_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-cursor" @click="show_tooltipinfo_teacher()" v-if="$store.getters.get_build_character.teacher_standard_name.length > 0 && show_tooltip[9] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.teacher_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list"  @click="show_tooltipinfo_teacher()" v-if="$store.getters.get_build_character.teacher_standard_name.length > 0 && show_tooltip[9] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.teacher_standard_name">{{item}}</p>
            </div>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <p    class="zxw-character-input-content zxw-display-list-margin zxw-null" v-if="this.$store.getters.get_build_character.student_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-list-margin zxw-display-cursor" @click="show_tooltipinfo_student()" v-if="$store.getters.get_build_character.student_standard_name.length > 0 && show_tooltip[10] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.student_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list zxw-display-list-margin"  @click="show_tooltipinfo_student()" v-if="$store.getters.get_build_character.student_standard_name.length > 0 && show_tooltip[10] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.student_standard_name">{{item}}</p>
            </div>

            <label class="zxw-character-span">友：</label>
            <p    class="zxw-character-input-content zxw-null" v-if="this.$store.getters.get_build_character.friend_standard_name.length === 0 ">不详</p>
            <div  class="zxw-character-input-content zxw-display-cursor" @click="show_tooltipinfo_friend()" v-if="$store.getters.get_build_character.friend_standard_name.length > 0 && show_tooltip[11] === false">
                <span class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.friend_standard_name">{{item}}</span>
            </div>
            <div class="zxw-display-list"  @click="show_tooltipinfo_friend()" v-if="$store.getters.get_build_character.friend_standard_name.length > 0 && show_tooltip[11] === true">
                <p class="zxw-display-content" v-for="item in this.$store.getters.get_build_character.friend_standard_name">{{item}}</p>
            </div>
        </div>

        <template v-if="this.$store.getters.get_build_character.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_character.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_2">
            </div>
        </template>

        <div class="zxw-build-step2-btn">
            <router-link to="/chartwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()">确认</button>
        </div>
        <success_create :show_info="show_info" ></success_create>
    </div>

</template>

<script>
   /*let Mock = require('mockjs');
    Mock.mock('/ancient_books/add_person.action','post', {
        "status|200":200,
        "result|1":1,
        "id|123":123
    });*/

    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    import modal from '../../../../component/modal.vue';
    export default{
        beforeRouteLeave (to, from, next){
            if(to.name !== 'charactertwo') {
                //清空Vuex
                this.$store.getters.get_build_character.standard_name = '';
                this.$store.getters.get_build_character.person_name = '';
                this.$store.getters.get_build_character.xing = '';
                this.$store.getters.get_build_character.shi = '';
                this.$store.getters.get_build_character.zi = '';
                this.$store.getters.get_build_character.other_name = '';
                this.$store.getters.get_build_character.birth_time_id = '';
                this.$store.getters.get_build_character.birth_standard_name = '';
                this.$store.getters.get_build_character.death_time_id = '';
                this.$store.getters.get_build_character.death_standard_name = '';
                this.$store.getters.get_build_character.remark_1_name = '';
                this.$store.getters.get_build_character.remark_2_name = '';
                this.$store.getters.get_build_character.remark_1 = '';
                this.$store.getters.get_build_character.remark_2 = '';
                this.$store.getters.get_build_character.english = '';
                this.$store.getters.get_build_character.location_id = '';
                this.$store.getters.get_build_character.location = '';
                this.$store.getters.get_build_character.father = {};
                this.$store.getters.get_build_character.mother = {};
                this.$store.getters.get_build_character.son.splice(0, this.$store.getters.get_build_character.son.length);
                this.$store.getters.get_build_character.daughter.splice(0, this.$store.getters.get_build_character.daughter.length);
                this.$store.getters.get_build_character.brother.splice(0, this.$store.getters.get_build_character.brother.length);
                this.$store.getters.get_build_character.sister.splice(0, this.$store.getters.get_build_character.sister.length);
                this.$store.getters.get_build_character.teacher.splice(0, this.$store.getters.get_build_character.teacher.length);
                this.$store.getters.get_build_character.student.splice(0, this.$store.getters.get_build_character.student.length);
                this.$store.getters.get_build_character.father_standard_name = '';
                this.$store.getters.get_build_character.mother_standard_name = '';
                this.$store.getters.get_build_character.friend.splice(0, this.$store.getters.get_build_character.friend.length);
                this.$store.getters.get_build_character.son_standard_name.splice(0, this.$store.getters.get_build_character.son_standard_name.length);
                this.$store.getters.get_build_character.daughter_standard_name.splice(0, this.$store.getters.get_build_character.daughter_standard_name.length);
                this.$store.getters.get_build_character.brother_standard_name.splice(0, this.$store.getters.get_build_character.brother_standard_name.length);
                this.$store.getters.get_build_character.sister_standard_name.splice(0, this.$store.getters.get_build_character.sister_standard_name.length);
                this.$store.getters.get_build_character.teacher.splice(0, this.$store.getters.get_build_character.teacher_standard_name.length);
                this.$store.getters.get_build_character.student.splice(0, this.$store.getters.get_build_character.student_standard_name.length);
                this.$store.getters.get_build_character.friend.splice(0, this.$store.getters.get_build_character.friend_standard_name.length);
                //模态框自动关闭
                if(this.show_info === true){
                    window.setTimeout(function () {
                        this.show_info = false;
                        next();
                    }, 1500);

                } else{
                    next();
                }

            } else{
                next();
            }

        },

        components:{
            create_word,
            success_create,
            modal
        },

        created(){
            this.prams = this.$route.name;
            this.$store.commit('change_fork',false);
        },

        computed:{
            compute_son_title(){
                let title = '';
                for(let i = 0;i < this.$store.getters.get_build_character.son_standard_name.length;i++){
                    title=title+this.$store.getters.get_build_character.son_standard_name[i]+'\n';
                }
                return title;
            },
            show_remark(){
                if( this.$store.getters.get_build_character.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_character.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_character.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_character.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                testz:[],
                show_tooltip:[false,false,false,false,false,false,false,false,false,false,false,false],
                prams:'',
                show_info:false,
                close_icon:true,
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_character:{person_relations:[]},
                create_character_url:'/ancient_books/add_person.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'char_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建人物本体失败");
            },

            open_confirm(){
                this.create_character.standard_name = this.$store.getters.get_build_character.standard_name;
                this.create_character.person_name = this.$store.getters.get_build_character.person_name;
                this.create_character.xing = this.$store.getters.get_build_character.xing;
                this.create_character.shi = this.$store.getters.get_build_character.shi;
                this.create_character.zi = this.$store.getters.get_build_character.zi;
                this.create_character.other_name = this.$store.getters.get_build_character.other_name;
                this.create_character.birth_time_id = this.$store.getters.get_build_character.birth_time_id;
                this.create_character.death_time_id = this.$store.getters.get_build_character.death_time_id;
                this.create_character.remark_1_name = this.$store.getters.get_build_character.remark_1_name;
                this.create_character.remark_1 = this.$store.getters.get_build_character.remark_1;
                this.create_character.remark_2_name = this.$store.getters.get_build_character.remark_2_name;
                this.create_character.remark_2 = this.$store.getters.get_build_character.remark_2;
                this.create_character.english = this.$store.getters.get_build_character.english;
                this.create_character.location_id = this.$store.getters.get_build_character.location_id;
                if(JSON.stringify(this.$store.getters.get_build_character.father) !== "{}"){
                    this.create_character.person_relations.push(
                        this.$store.getters.get_build_character.father
                    );
                }

                if(JSON.stringify(this.$store.getters.get_build_character.mother) !== "{}"){
                    this.create_character.person_relations.push(
                        this.$store.getters.get_build_character.mother
                    );
                }

                for (let f = 0;f < this.$store.getters.get_build_character.son.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.son[f]);
                }

                for (let d = 0;d < this.$store.getters.get_build_character.daughter.length; d++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.daughter[d]);
                }

                for (let f = 0;f < this.$store.getters.get_build_character.brother.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.brother[f]);
                }

                for (let f = 0;f < this.$store.getters.get_build_character.sister.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.sister[f]);
                }

                for (let f = 0;f < this.$store.getters.get_build_character.teacher.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.teacher[f]);
                }

                for (let f = 0;f < this.$store.getters.get_build_character.student.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.student[f]);
                }

                for (let f = 0;f < this.$store.getters.get_build_character.friend.length; f++){
                    this.create_character.person_relations.push(this.$store.getters.get_build_character.friend[f]);
                }
                this.http_json(this.create_character_url,'post',this.create_character,this.success_create,this.fail_create);
            },

            /*查看出生时间*/
            show_tooltipinfo_birth(){
                if(this.$store.getters.get_build_character.birth_standard_name !== '' && this.show_tooltip[0] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(0,1,true);
                } else if(this.$store.getters.get_build_character.birth_standard_name !== '' && this.show_tooltip[0] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(0,1,false);
                }
            },

            /*查看死亡时间*/
            show_tooltipinfo_death(){
                if(this.$store.getters.get_build_character.death_standard_name !== ''  && this.show_tooltip[1] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(1,1,true);
                } else if(this.$store.getters.get_build_character.death_standard_name !== ''  && this.show_tooltip[1] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(1,1,false);
                }
            },

            /*查看籍贯*/
            show_tooltipinfo_location(){
                if(this.$store.getters.get_build_character.location !== ''  && this.show_tooltip[2] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(2,1,true);
                } else if(this.$store.getters.get_build_character.location !== ''  && this.show_tooltip[2] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(2,1,false);
                }
            },

            /*查看父亲*/
            show_tooltipinfo_father(){
                if(this.$store.getters.get_build_character.father_standard_name !== ''  && this.show_tooltip[3] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(3,1,true);
                } else if(this.$store.getters.get_build_character.father !== ''  && this.show_tooltip[3] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(3,1,false);
                }
            },

            /*查看母亲*/
            show_tooltipinfo_mother(){
                if(this.$store.getters.get_build_character.mother_standard_name !== ''&& this.show_tooltip[4] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(4,1,true);
                } else if(this.$store.getters.get_build_character.mother_standard_name !== '' && this.show_tooltip[4] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(4,1,false);
                }
            },

            /*查看子*/
            show_tooltipinfo_son(){
                if(this.$store.getters.get_build_character.son_standard_name.length > 0 && this.show_tooltip[5] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(5,1,true);
                } else if(this.$store.getters.get_build_character.son_standard_name.length > 0&& this.show_tooltip[5] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(5,1,false);
                }
            },

            /*查看女儿*/
            show_tooltipinfo_daughter(){
                if(this.$store.getters.get_build_character.daughter_standard_name.length > 0  && this.show_tooltip[6] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(6,1,true);
                } else if(this.$store.getters.get_build_character.daughter_standard_name.length > 0  && this.show_tooltip[6] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(6,1,false);
                }
            },

            /*查看兄弟人物关系*/
            show_tooltipinfo_brother(){
                if(this.$store.getters.get_build_character.brother_standard_name.length > 0  && this.show_tooltip[7] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(7,1,true);
                } else if(this.$store.getters.get_build_character.brother_standard_name.length > 0  && this.show_tooltip[7] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(7,1,false);
                }
            },

            /*查看姐妹人物关系*/
            show_tooltipinfo_sister(){
                if(this.$store.getters.get_build_character.sister_standard_name.length > 0  && this.show_tooltip[8] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(8,1,true);
                } else if(this.$store.getters.get_build_character.sister_standard_name.length > 0  && this.show_tooltip[8] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(8,1,false);
                }
            },

            /*查看师人物关系*/
            show_tooltipinfo_teacher(){
                if(this.$store.getters.get_build_character.teacher_standard_name.length > 0  && this.show_tooltip[9] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(9,1,true);
                } else if(this.$store.getters.get_build_character.teacher_standard_name.length > 0  && this.show_tooltip[9] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(9,1,false);
                }
            },

            /*查看生人物关系*/
            show_tooltipinfo_student(){
                if(this.$store.getters.get_build_character.student_standard_name.length > 0  && this.show_tooltip[10] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(10,1,true);
                } else if(this.$store.getters.get_build_character.student_standard_name.length > 0  && this.show_tooltip[10] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(10,1,false);
                }
            },

            /*查看友人物关系*/
            show_tooltipinfo_friend(){
                if(this.$store.getters.get_build_character.friend_standard_name.length > 0  && this.show_tooltip[11] === false){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(11,1,true);
                } else if(this.$store.getters.get_build_character.friend_standard_name.length > 0  && this.show_tooltip[11] === true){
                    for(let i = 0;i < this.show_tooltip.length;i++){
                        this.show_tooltip[i] = false;
                    }
                    this.show_tooltip.splice(11,1,false);
                }
            }
        }
    }
</script>

<style>
    .zxw-character-input-content{
        display:inline-block;
        background-color: transparent;
        border-style: none;
        height:30px;
        width:310px;
        font-weight: bold;
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        vertical-align: top;
    }

    .zxw-null{
        color:darkgrey;
    }

    .zxw-display-cursor{
        cursor:pointer;
    }
    .zxw-display-list{
         font-size: 18px;
         width:310px;
         display:inline-block;
         vertical-align: top;
         font-weight: bold;
         cursor: pointer;
     }

    .zxw-display-list-margin{
       margin-right: 110px;
    }

    .zxw-display-content{
        font-size: 18px;
    }
</style>