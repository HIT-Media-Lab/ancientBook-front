<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/create-step2.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：人名（出生时间）</p>
        <div class="zxw-character-row">
            <label class="zxw-character-span zxw-must-write">人名：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">氏：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span zxw-must-write">出生时间：</label>
            <button  class="zxw-character-input zxw-character-input-margin" readonly @click="open_birth()"  v-model="birth_value"></button>
            <label class="zxw-character-span zxw-must-write">死亡时间：</label>
            <button class="zxw-character-input zxw-character-input-margin" readonly @click="open_dead()" v-model="dead_value"></button>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">父：</label>
            <input type="button" class="zxw-character-input zxw-character-input-margin" @click="open_character()">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">子：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">兄弟：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">师：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">友：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div v-for="(item ,index) in add_data">
            <input type="text" class="zxw-character-input-head zxw-character-input" v-model="add_data[index].remark_name">
            <input type="text" class="zxw-character-input" maxlength="20" name="index" v-model="add_data[index].remark">
            <button class="zxw-add-button" @click="add_tip(index)" v-show="add_data[index].value">添加</button>
        </div>


        <div class="zxw-build-step2-btn">
            <router-link to="/build">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <router-link to="/charthree">
                <button class="zxw-nextbtn zxw-nextbtn-length">下一步</button>
            </router-link>
        </div>

        <time_modal :time_modal="this.time_modal_1" v-on:success_time="birth_time" v-on:close_modal="close_birth()"></time_modal>
        <time_modal :time_modal="this.time_modal_2" v-on:success_time="dead_time" v-on:close_modal="close_dead()"></time_modal>
        <character_modal :character_modal="this.character_modal" v-on:close_modal="close_character()"></character_modal>

    </div>
</template>

<script>
    import create_word from '../../../../component/create-word.vue';
    import time_modal from '../../../../component/time-modal.vue';
    import character_modal from '../../../../component/search_character.vue';
    export default{
        created(){
            this.prams = this.$route.name;
        },

        components:{
            create_word,
            time_modal,
            character_modal
        },

        data(){
            return{
                prams:'',
                time_modal_1:false,
                time_modal_2:false,
                character_modal:false,
                input_content:{
                    standard_name:'',
                    person_name:'',
                    xing:'',
                    shi:'',
                    zi:'',
                    other_name:'',
                    birth_time_id:'',
                    death_time_id:'',
                    //remark_1_name:'',
                    //remark_2_name:'',
                    //remark_1:'',
                    //remark_2:'',
                    english:'',
                    location_id:''
                },
                person_relations:[],
                birth_value:'',
                dead_value:'',
                add_data:[{value:true}],
                remark_name:[],
                remark:[]
            }
        },

        methods:{
            open_birth(){
                this.time_modal_1 = true;
            },

            birth_time(p){
                this.input_content.birth_time_id = p.time_id;
                this.birth_value = p.content;
            },

            close_birth(){
                this.time_modal_1 = false;
            },

            open_dead(){
                this.time_modal_2 = true;
            },

            dead_time(q){
                this.input_content.dead_time_id = q.time_id;
                this.dead_value = q.content;
            },

            close_dead(){
                this.time_modal_2 = false;
            },

            add_tip(p){
                console.log(p);
                this.add_data[p].value = false;
                this.remark_name.push(this.add_data[p].remark_name);
                this.remark.push(this.add_data[p].remark);
                console.log(JSON.stringify(this.remark_name+"----"+this.remark));
                this.add_data.push({
                    value:true
                });
                console.log(this.add_data.length+JSON.stringify(this.add_data));
            },

            open_character(){
                this.character_modal = true;
            },

            close_character(){
                this.character_modal = false;
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
        margin:42px 0 34px 0;
        color:#a50000;
    }

    /*输入框样式*/
    .zxw-character-input{
        border: 2px solid black;
        background-color: transparent;
        height:30px;
        width:220px;
    }

    /*输入框间距*/
    .zxw-character-input-margin{
        margin:0 250px 0 0;
    }


    /*备注输入头的样式*/
    .zxw-character-input-head{
        margin:0 30px 10px 0;
        width:70px;
    }

    /*label与输入框之间的距离*/
    .zxw-character-span{
        width:100px;
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
</style>