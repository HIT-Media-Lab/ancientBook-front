<template>
        <modal :show_modal="open_modal" v-on:fireclose="close_modal" class="zxw-delete">
            <div slot="header" class="zxw-character-header"></div>

            <div slot="body" class="zxw-delete-body">
                <img src="../assets/img/modal-box/warning_img.png" class="zxw-delete-icon">
                <p class="zxw-delete-warning-info" v-model="delete_warning">{{delete_warning}}</p>
            </div>
            <div slot="footer" class="zxw-delete-footer">
                <button class="zxw-nextbtn zxw-delete-btn" @click="delete_info()">确定</button>
                <button class="zxw-prebtn zxw-delete-btn" @click="close_modal()">关闭</button>
            </div>
        </modal>
</template>

<script>
    import modal from './modal.vue';
    export default{
        created(){
            this.$store.commit('change_fork',false)
        },
        props:['open_modal','delete_warning'],

        components:{
            modal
        },

        methods:{
            close_modal(){
                this.$emit('close_modal');
            },

            delete_info(){
                this.$emit('delete_info');
            }
        }
    }
</script>

<style>
    .zxw-delete{
        width: 400px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 400px auto;
    }

    .zxw-delete-body{
        margin-top: 10px;
    }

    .zxw-delete-icon{
        margin-top: 15px;
        margin-left: 160px;
        width:80px;
        height:80px;
    }

    .zxw-delete-warning-info{
        width: 200px;
        text-align: center;
        margin-left: 100px;
        margin-top: 10px;
    }

    .zxw-delete-footer{
        height: 70px;
        margin-top: 10px;
        margin-left: 120px;
    }

    .zxw-delete-btn{
        width:80px;
        height:50px;
    }

</style>