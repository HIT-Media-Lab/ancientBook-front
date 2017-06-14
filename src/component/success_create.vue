<template>
<<<<<<< HEAD
    <modal :show_modal="show_info">
        
=======
    <modal :show_modal="show_info" class="zxw-modal-character">
        <div slot="header" class="zxw-character-header">
        </div>
        <div slot="body" class="zxw-time-body">

           <p class="zxw-success-create">创建成功</p>
        </div>
>>>>>>> 64280ff421a1f1c3587733aac6158c10ae043ce2
    </modal>
</template>

<script>
    import modal from '../component/modal.vue';
    export default{
        components:{
            modal
        },
        props:['show_info'],

        data(){
            return {

            }
        }
    }
</script>

<style>
<<<<<<< HEAD
=======
    .zxw-success-create{
        width: 100px;
        margin:0 10% 0 25%;
    }
>>>>>>> 64280ff421a1f1c3587733aac6158c10ae043ce2

</style>