<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/create-step2.png" class="zxwcreate-img">
        <create-word :prams="this.prams"></create-word>

        <p class="zxw-create-character">本体名称：人名（出生时间）</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">人名：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly>
            <label class="zxw-character-span">英译：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姓：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">氏：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">字：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">出生时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">死亡时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">籍贯：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">父：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">母：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">子：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">女：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">兄弟：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">姐妹：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">师：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">学生：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
            <label class="zxw-character-span">友：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <div>
            <label class="zxw-character-span"></label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly>
        </div>

        <router-link to="/chartwo">
            <button class="zxw-prebtn zxw-prebtn-margin">上一步</button>
        </router-link>

        <button class="zxw-nextbtn" @click="open_confirm()">确认</button>
    </div>
</template>

<script>
    import createWord from '../../../../component/create-word.vue';
    export default{
        created(){
            this.prams = this.$route.name;
        },

        components:{
            createWord
        },

        data(){
            return{
                prams:''
            }
        },

        methods:{
            open_confirm(){

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
    }
</style>