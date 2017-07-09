<template>
    <modal :show_modal="this.show_info" class="zxw-modal-character zxw-success-create-body">
        <div slot="body">
            <img src="../assets/img/success_create.png" class="zxw-success-create-icon">
            <span class="zxw-success-create">已成功创建本体</span>
        </div>
    </modal>
</template>

<script>
    import modal from '../component/modal.vue';
    export default{
        components:{
            modal
        },
        props:['show_info']
    }
</script>

<style>
    .zxw-success-create-body{
        background-image: url("../assets/img/success-create-background.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 400px 200px;
        height:200px;
        width:400px;
    }

    .zxw-success-create{
        width: 100px;
        margin:10px 130px 0 165px;
    }

    .zxw-success-create-icon{
        margin:50px 150px 20px 170px;
    }
</style>