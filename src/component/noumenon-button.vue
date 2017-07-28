<template>
    <div class="zxwbtn-margin">
        <button class="zxwnoumenom-button zxwnoumenom-button-margin" @click="goto_edit(noumenon_number)">编辑本体</button>
        <button class="zxwnoumenom-button zxwnoumenom-button-margin zxwbtn-padding">查看本体标记</button>
    </div>
</template>

<script>
 export default{
     props:['noumenon_number'],
         methods:{
         goto_edit(p){
             let id = this.$route.params.nouId;
             if (p === 1){   //人物

                 this.$router.push({name:'char_edit',params:{nouId:id}})

             } else if (p === 2){//文献

                 this.$router.push({name:'lit_edit',nouId:id})

             } else if (p === 3){//术语

                 this.$router.push({name:'terms_edit',nouId:id})

             } else if (p === 4){//时间

                 this.$router.push({name:'time_edit',nouId:id})

             } else if (p === 5){//职官

                 this.$router.push({name:'off_edit',nouId:id})

             } else if (p === 6){//机构

                 this.$router.push({name:'ins_edit',nouId:id})

             } else if (p === 7){//地名

                 this.$router.push({name:'pla_edit',nouId:id})
             }
         }
     }
 }
</script>

<style>
    .zxwbtn-margin{
        float:right;
    }
    .zxwbtn-padding{
        margin-right: 10px;
    }

</style>