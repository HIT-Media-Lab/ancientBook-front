<template>
    <!--本体重复模态框-->
    <modal :show_modal="show_repeat" v-on:fireclose="close_modal" class="zxw-modal-character">
        <div slot="header" class="zxw-character-header">
        </div>

        <div slot="body" class="zxw-time-body">
            <p class="zxw-repeat-info1">很抱歉</p>
            <p class="zxw-repeat-info2">
                {{repeat_noumenon}}
                <button @click="goto_noumenon()" style="color:#a50000; font-weight: bold;">{{repeat_name}}</button>
                已存在
            </p>
        </div>
        <div slot="footer" class="zxw-search-footer">
            <button class="zxwnoumenom-button zxw-search-cancel zxw-repeat-btn" @click="close_modal">关闭</button>
        </div>
    </modal>
</template>

<script>
    import modal from './modal.vue';
    export default{
        components:{
            modal
        },

        props:['show_repeat','repeat_name','repeat_id','repeat_noumenon'],

        methods:{
            /*关闭模态框*/
            close_modal(){
                this.$emit('close_modal');
            },

            goto_noumenon(){
                if(this.repeat_noumenon === '人物本体'){

                    this.$router.push({name:'char_detail',params:{nouId:this.repeat_id}});

                } else if(this.repeat_noumenon === '机构本体'){

                    this.$router.push({name:'ins_detail',params:{nouId:this.repeat_id}});
                } else if(this.repeat_noumenon === '地点本体'){

                    this.$router.push({name:'pla_detail',params:{nouId:this.repeat_id}});
                } else if(this.repeat_noumenon === '术语本体'){

                    this.$router.push({name:'terms_detail',params:{nouId:this.repeat_id}});
                } else if(this.repeat_noumenon === '职官本体'){

                    this.$router.push({name:'off_detail',params:{nouId:this.repeat_id}});
                } else if(this.repeat_noumenon === '时间本体'){

                    this.$router.push({name:'time_detail',params:{nouId:this.repeat_id}});
                }

            }
        },

        watch:{
            'show_repeat':function(){
                if(this.show_repeat === true){
                    this.$store.commit('change_fork',false);
                } else {
                    this.$store.commit('change_fork',true);
                }
            }
        }
    }
</script>

<style>
    .zxw-repeat-info1{
        margin: 10px 0 15px 170px;
    }

    .zxw-repeat-info2{
        margin: 0 0 0 80px;
    }

    .zxw-repeat-btn{
        margin:0 160px 20px 0;
    }
</style>