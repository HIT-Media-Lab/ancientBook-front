<template>
        <modal>
            <span slot="header" class="zxw-time-header">时间本体</span>
            <div slot="body">
            <label>朝代：</label>
            <select></select>

            <label>年号：</label>
            <select></select>

            <label>年份：</label>
            <input type="text">

            <label>月：</label>
            <select></select>

            <label>日：</label>
            <select></select>

            <button class="zxw-time-add">添加</button>
            </div>
        </modal>
</template>

<script>
    import modal from '../component/modal.vue'
    export default{
        components:{
            modal
        }
    }
</script>

<style>
    .zxw-time-add{
        background-image: url("../assets/img/create-next-step.png");
        width:100px;
        height:20px;
        color:gainsboro;
    }

    .zxw-time-header{
        color:gainsboro;
    }
</style>