<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/create-step2.png" class="zxwcreate-img">
        <create-word :prams="this.prams"></create-word>

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
            <input type="text" class="zxw-character-input zxw-character-input-margin" @focus="go()">
            <label class="zxw-character-span zxw-must-write">死亡时间：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
            <label class="zxw-character-span">父：</label>
            <input type="text" class="zxw-character-input zxw-character-input-margin">
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

        <div>
            <input type="text" class="zxw-character-input-head zxw-character-input" >
            <input type="text" class="zxw-character-input" maxlength="20">
            <button class="zxw-add-button" @click="go()">添加</button>
        </div>

        <router-link to="/build">
            <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
        </router-link>

        <router-link to="/charthree">
            <button class="zxw-nextbtn zxw-nextbtn-length">下一步</button>
        </router-link>

        <time-modal :time_modal="this.time_modal1"></time-modal>
    </div>
</template>

<script>
    import createWord from '../../../../component/create-word.vue';
    import modal from '../../../../component/modal.vue';
    import timeModal from '../../../../component/time-modal.vue';
    export default{
        created(){
            this.prams = this.$route.name;
        },

        components:{
            createWord,
            modal,
            timeModal
        },

        data(){
            return{
                prams:'',
                time_modal1:false,
                input_content:{
                    standard_name:'',
                    person_name:'',
                    xing:'',
                    shi:'',
                    zi:'',
                    other_name:'',
                    birth_time_id:'',
                    death_time_id:'',
                    remark_1_name:'',
                    remark_2_name:'',
                    remark_1:'',
                    remark_2:'',
                    english:'',
                    location_id:''
                },
                person_relations:[]
            }
        },

        methods:{
            go(){
                this.time_modal1=true;
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
        margin:0 30px 0 0;
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
</style>