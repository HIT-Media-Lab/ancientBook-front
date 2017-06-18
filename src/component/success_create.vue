<template>
    <div>
        <modal :show_modal="show_info" class="zxw-modal-character">
            <div slot="header" class="zxw-character-header">
            </div>
            <div slot="body" class="zxw-time-body">

                <p class="zxw-success-create">创建成功</p>
            </div>
        </modal>
    </div>
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

    .zxw-success-create{
        width: 100px;
        margin:0 10% 0 25%;
    }

</style>