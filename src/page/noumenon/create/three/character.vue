<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_character.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">人名：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.person_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.english === '' " >
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.xing === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.xing" v-else>
            <label class="zxw-character-span">氏：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.shi === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.shi" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.zi === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.zi" v-else>
            <label class="zxw-character-span">别名：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.other_name === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.other_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">出生时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.birth_standard_name">
            <label class="zxw-character-span">死亡时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.death_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.location === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.location" v-else>
            <label class="zxw-character-span">父：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.father_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.father_standard_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.mother_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.mother_standard_name" v-else>
            <label class="zxw-character-span">子：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.son_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.son_standard_name" @mouseover="show_tooltipinfo_son()" @mouseout="close_tooltip_son()" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.daughter_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.daughter_standard_name" @mouseover="show_tooltipinfo_daughter()" @mouseout="close_tooltip_daughter()" v-else>
            <label class="zxw-character-span">兄弟：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.brother_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.brother_standard_name" @mouseover="show_tooltipinfo_brother()" @mouseout="close_tooltip_brother()" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.sister_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.sister_standard_name" @mouseover="show_tooltipinfo_sister()" @mouseout="close_tooltip_sister()" v-else>
            <label class="zxw-character-span">师：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.teacher_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.teacher_standard_name" @mouseover="show_tooltipinfo_teacher()" @mouseout="close_tooltip_teacher()" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.student_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.student_standard_name" @mouseover="show_tooltipinfo_student()" @mouseout="close_tooltip_student()" v-else>
            <label class="zxw-character-span">友：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_character.friend_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.friend_standard_name" @mouseover="show_tooltipinfo_friend()" @mouseout="close_tooltip_friend()" v-else>
        </div>

       <template v-if="this.$store.getters.get_build_character.remark_1 !== ''||this.$store.getters.get_build_character.remark_2 !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_1">
            </div>

            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_2">
            </div>
        </template>

        <div class="zxw-build-step2-btn">
            <router-link to="/chartwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()" v-bind:disabled="this.$store.getters.get_build_character.length === 0">确认</button>
        </div>
        <success_create id="show_info" :show_info="show_info"></success_create>
        <!--子的具体信息显示-->
        <modal :show_modal="show_tooltip_son" v-on:fireclose="close_tooltip_son" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header">
            </div>
            <div slot="body" class="zxw-relation-modal-body">
              <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.son_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--女的具体信息显示-->
        <modal :show_modal="show_tooltip_daughter" v-on:fireclose="close_tooltip_daughter" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.daughter_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--兄弟的具体信息显示-->
        <modal :show_modal="show_tooltip_brother" v-on:fireclose="close_tooltip_brother" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.brother_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--姐妹的具体信息显示-->
        <modal :show_modal="show_tooltip_sister" v-on:fireclose="close_tooltip_sister" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.sister_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--师的具体信息显示-->
        <modal :show_modal="show_tooltip_teacher" v-on:fireclose="close_tooltip_teacher" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.teacher_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--生的具体信息显示-->
        <modal :show_modal="show_tooltip_student" v-on:fireclose="close_tooltip_student" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.student_standard_name">{{item}}</p>
            </div>
        </modal>

        <!--友的具体信息显示-->
        <modal :show_modal="show_tooltip_friend" v-on:fireclose="close_tooltip_friend" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header"></div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_character.friend_standard_name">{{item}}</p>
            </div>
        </modal>
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
            //清空Vuex
            this.$store.getters.get_build_character.standard_name = '';
            this.$store.getters.get_build_character.person_name='';
            this.$store.getters.get_build_character.xing='';
            this.$store.getters.get_build_character.shi='';
            this.$store.getters.get_build_character.zi='';
            this.$store.getters.get_build_character.other_name='';
            this.$store.getters.get_build_character.birth_time_id='';
            this.$store.getters.get_build_character.birth_standard_name='';
            this.$store.getters.get_build_character.death_time_id='';
            this.$store.getters.get_build_character.death_standard_name='';
            this.$store.getters.get_build_character.remark_1_name='';
            this.$store.getters.get_build_character.remark_2_name='';
            this.$store.getters.get_build_character.remark_1='';
            this.$store.getters.get_build_character.remark_2='';
            this.$store.getters.get_build_character.english='';
            this.$store.getters.get_build_character.location_id='';
            this.$store.getters.get_build_character.location='';
            this.$store.getters.get_build_character.father={};
            this.$store.getters.get_build_character.mother={};
            this.$store.getters.get_build_character.son.splice(0,this.$store.getters.get_build_character.son.length);
            this.$store.getters.get_build_character.daughter.splice(0,this.$store.getters.get_build_character.daughter.length);
            this.$store.getters.get_build_character.brother.splice(0,this.$store.getters.get_build_character.brother.length);
            this.$store.getters.get_build_character.sister.splice(0,this.$store.getters.get_build_character.sister.length);
            this.$store.getters.get_build_character.teacher.splice(0,this.$store.getters.get_build_character.teacher.length);
            this.$store.getters.get_build_character.student.splice(0,this.$store.getters.get_build_character.student.length);
            this.$store.getters.get_build_character.father_standard_name='';
            this.$store.getters.get_build_character.mother_standard_name='';
            this.$store.getters.get_build_character.friend.splice(0,this.$store.getters.get_build_character.friend.length);
            this.$store.getters.get_build_character.son_standard_name.splice(0,this.$store.getters.get_build_character.son_standard_name.length);
            this.$store.getters.get_build_character.daughter_standard_name.splice(0,this.$store.getters.get_build_character.daughter_standard_name.length);
            this.$store.getters.get_build_character.brother_standard_name.splice(0,this.$store.getters.get_build_character.brother_standard_name.length);
            this.$store.getters.get_build_character.sister_standard_name.splice(0,this.$store.getters.get_build_character.sister_standard_name.length);
            this.$store.getters.get_build_character.teacher.splice(0,this.$store.getters.get_build_character.teacher_standard_name.length);
            this.$store.getters.get_build_character.student.splice(0,this.$store.getters.get_build_character.student_standard_name.length);
            this.$store.getters.get_build_character.friend.splice(0,this.$store.getters.get_build_character.friend_standard_name.length);

            //模态框自动关闭
            window.setTimeout(function(){
                document.getElementById("show_info").setAttribute('class','zxw-show-info');
                next();
            },500);
        },

        components:{
            create_word,
            success_create,
            modal
        },

        created(){
            this.prams = this.$route.name;
        },

        computed:{
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
                show_tooltip_son:false,
                show_tooltip_daughter:false,
                show_tooltip_brother:false,
                show_tooltip_sister:false,
                show_tooltip_teacher:false,
                show_tooltip_student:false,
                show_tooltip_friend:false,
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

            /*查看子的人物关系*/
            show_tooltipinfo_son(){
                if(this.$store.getters.get_build_character.son_standard_name.length !== 0){
                    this.show_tooltip_son = true;
                }
            },

            close_tooltip_son(){
                if(this.$store.getters.get_build_character.son_standard_name.length !== 0){
                    this.show_tooltip_son = false;
                }
            },

            /*查看女儿人物关系*/
            show_tooltipinfo_daughter(){
                if(this.$store.getters.get_build_character.daughter_standard_name.length !== 0){
                    this.show_tooltip_daughter = true;
                }
            },

            close_tooltip_daughter(){
                if(this.$store.getters.get_build_character.daughter_standard_name.length !== 0){
                    this.show_tooltip_daughter = false;
                }
            },

            /*查看兄弟人物关系*/
            show_tooltipinfo_brother(){
                if(this.$store.getters.get_build_character.brother_standard_name.length !== 0){
                    this.show_tooltip_brother = true;
                }
            },

            close_tooltip_brother(){
                if(this.$store.getters.get_build_character.brother_standard_name.length !== 0){
                    this.show_tooltip_brother = false;
                }
            },

            /*查看姐妹人物关系*/
            show_tooltipinfo_sister(){
                if(this.$store.getters.get_build_character.sister_standard_name.length !== 0){
                    this.show_tooltip_sister = true;
                }
            },

            close_tooltip_sister(){
                if(this.$store.getters.get_build_character.sister_standard_name.length !== 0){
                    this.show_tooltip_sister = false;
                }
            },

            /*查看师人物关系*/
            show_tooltipinfo_teacher(){
                if(this.$store.getters.get_build_character.teacher_standard_name.length !== 0){
                    this.show_tooltip_teacher = true;
                }
            },

            close_tooltip_teacher(){
                if(this.$store.getters.get_build_character.teacher_standard_name.length !== 0){
                    this.show_tooltip_teacher = false;
                }
            },

            /*查看生人物关系*/
            show_tooltipinfo_student(){
                if(this.$store.getters.get_build_character.student_standard_name.length !== 0){
                    this.show_tooltip_student = true;
                }
            },

            close_tooltip_student(){
                if(this.$store.getters.get_build_character.student_standard_name.length !== 0){
                    this.show_tooltip_student = false;
                }
            },

            /*查看友人物关系*/
            show_tooltipinfo_friend(){
                if(this.$store.getters.get_build_character.friend_standard_name.length !== 0){
                    this.show_tooltip_friend = true;
                }
            },

            close_tooltip_friend(){
                if(this.$store.getters.get_build_character.friend_standard_name.length !== 0){
                    this.show_tooltip_friend = false;
                }
            }
        }
    }
</script>

<style>
    .zxw-character-input-content{
        background-color: transparent;
        border-style: none;
        height:30px;
        width:220px;
        font-weight: bold;
        text-overflow: ellipsis;
    }

    .zxw-relation-modal-header{
        width:50px;
        height:15px;
    }


    .zxw-relation-info{
        margin:20px 0 10px 30px;
    }

    .zxw-relation-modal-body{
        margin-bottom: 20px;
    }
    .zxw-show-info{
        visibility: hidden;
    }

    .zxw-null{
        color:darkgrey;

    }
</style>