<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../assets/img/create-step1.png" class="zxwcreate-img">
        <create-word :prams="this.prams"></create-word>
        <div class="zxw-noumenon-select">
            <span>选择本体类型：</span>
            <select class="zxw-select">
                <option v-for="item in noumenon_option">{{item}}</option>
            </select>
        </div>
        <router-link to="/chartwo">
            <button class="zxw-nextbtn zxw-nextbtn-margin zxw-nextbtn-length">下一步</button>
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
            prams:'',
            noumenon_option:['时间','地名','人物','机构','职官','文献','术语']
        }
    }

}
</script>

<style>
    .zxwcreate{
        margin:100px 0 0 300px;
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

    .zxw-nextbtn{
        background-image: url("../../../assets/img/create-next-step.png");
        background-color: transparent;
        border-style: none;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        color:gainsboro;
    }

    .zxw-nextbtn-margin{
        margin:0 0 0 400px;
    }

    .zxw-nextbtn-length{
        width:125px;
        height:55px;
    }
    .zxw-prebtn{
        background-image: url("../../../assets/img/create-pre-step.png");
        background-color: transparent;
        border-style: none;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        color:black;
    }
    .zxw-prebtn-margin{

        margin:0 15px 0 620px;
    }

    .zxw-prebtn-length{
        width:125px;
        height:55px;
    }

    .zxw-select{
        border:2px solid;
        background-color: transparent;
        width:100px;
        height:25px;
    }

</style>