<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../assets/img/create-step1.png" class="zxwcreate-img">
        <create-word :prams="this.prams"></create-word>
        <div class="zxw-noumenon-select">
            <span>选择本体类型：</span>
            <select class="zxw-select">
                <option>人物</option>
                <option>文献</option>
                <option>术语</option>
                <option>时间</option>
                <option>机构</option>
                <option>地名</option>
            </select>
        </div>
        <router-link to="/chartwo">
            <button class="zxw-nextbtn zxw-nextbtn-margin">下一步</button>
        </router-link>
    </div>
</template>

<script>
import createWord from '../../../component/create-word.vue'
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
    }

}
</script>

<style>
    .zxwcreate{
        margin:140px 0 0 300px;
    }

    .zxwcreate-title{
        font-size: 14px;
    }

    .zxwcreate-img{
        height:180px;
        width:800px;
        margin:0 0 0 80px;
    }

    .zxw-noumenon-select{
        margin: 60px 0 120px 350px;
    }

    .zxw-select{
        font-size: 12px;
        border: 2px solid black;
        border-top:none;
        border-left: none;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }

    .zxw-nextbtn{
        background-image: url("../../../assets/img/create-next-step.png");
        border-style: none;
        width:125px;
        height:55px;
        color:gainsboro;
    }

    .zxw-nextbtn-margin{
        margin:0 0 0 400px;
    }
    .zxw-prebtn{
        background-image: url("../../../assets/img/create-pre-step.png");
        border-style: none;
        width:125px;
        height:55px;
        color:black;
    }
    .zxw-prebtn-margin{
        margin:0 15px 0 620px;
    }

    .zxw-select{
        background-image: url("../../../assets/img/select-border.png");
        width:100px;
        height:25px;

    }

</style>