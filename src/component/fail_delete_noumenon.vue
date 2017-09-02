<template>
    <modal :show_modal="show_info" v-on:fireclose="close_modal" class="zxw-success-create-body">
        <div slot="body" style="height:230px">
            <img src="../assets/img/modal-box/warning_img.png" class="zxw-success-create-icon">
            <p class="zxw-fail-delete">该本体已被其他本体引用，无法删除</p>
        </div>
    </modal>
</template>

<script>
    import modal from '../component/modal.vue';
    export default{
        components:{
            modal
        },
        props:['show_info'],
        created(){
            this.$store.commit('change_fork',true);
        },
        methods:{
            close_modal(){
                this.$emit('close_modal');
            }
        }
    }
</script>

<style>
    .zxw-fail-delete{
        width: 350px;
        margin:20px 0 30px 40px;
    }
</style>