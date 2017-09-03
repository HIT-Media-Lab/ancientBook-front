<template>
    <modal :show_modal="show_info" v-on:fireclose="close_modal" class="zxw-success-create-body">
        <div slot="body" style="height:180px">
            <img src="../assets/img/modal-box/warning_img.png" class="zxw-success-create-icon">
            <p class="zxw-fail-delete" v-model="tip">{{tip}}</p>
        </div>
        <div slot="footer" class="zxw-search-footer">
            <button class="zxwnoumenom-button zxw-search-cancel zxw-repeat-btn" @click="close_modal">关闭</button>
        </div>
    </modal>
</template>

<script>
    import modal from '../component/modal.vue';
    export default{
        components:{
            modal
        },
        props:['show_info','tip'],
        created(){
            this.$store.commit('change_fork',false);
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
        text-align: center;
        width: 350px;
        margin:20px 0 30px 30px;
    }
</style>