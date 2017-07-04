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
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_character.english">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.xing">
            <label class="zxw-character-span">氏：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.shi">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.zi">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.other_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">出生时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.birth_standard_name">
            <label class="zxw-character-span">死亡时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.death_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.location">
            <label class="zxw-character-span">父：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.father_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.mother_standard_name">
            <label class="zxw-character-span">子：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.son_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.daughter_standard_name">
            <label class="zxw-character-span">兄弟：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.brother_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.sister_standard_name">
            <label class="zxw-character-span">师：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.teacher_standard_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.student_standard_name">
            <label class="zxw-character-span">友：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.friend_standard_name">
        </div>

        <div>
            <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_1">
        </div>

        <div>
            <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_character.remark_2">
        </div>

        <div class="zxw-build-step2-btn">
            <router-link to="/chartwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()" v-bind:disabled="this.$store.getters.get_build_character.length === 0">确认</button>
        </div>

        <success_create :show_info="show_info"></success_create>
    </div>
</template>

<script>
    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    export default{
        components:{
            create_word,
            success_create
        },

        created(){
            this.prams = this.$route.name;
        },

        computed:{
            show_remark(){
                if( this.$store.getters.get_build_character.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_character.remark_1_name+':';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_character.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_character.remark_2_name+':';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                prams:'',
                show_info:false,
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
                //this.show_info=true;
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
                    alert('this.$store.getters.get_build_character.father !== {}');
                }

                if(JSON.stringify(this.$store.getters.get_build_character.mother) !== "{}"){
                    this.create_character.person_relations.push(
                        this.$store.getters.get_build_character.mother
                    );
                    alert('this.$store.getters.get_build_character.father !== {}');
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
    }
</style>