<template>

    <div>

        <!--模块名称-->
        <div class="width800 center">
            <h2 style="display:inline-block">3編輯</h2>
            <button class="float-right">取消上傳</button>
        </div>

        <upload_edit class="width600 center"></upload_edit>

        <div class="width600 center">
            <button>添加</button>
        </div>

        <div class="width800 center">
            <paginator style="display: inline-block"></paginator>
            <paginator style="display: inline-block"></paginator>
        </div>

        <div class="width800 center">
            <button class="float-right">發佈</button>
            <button class="float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    import upload_edit from './upload-edit.vue';
    import paginator from '../../../../component/paginator.vue';
    export default{
        components:{
            upload_edit,
            paginator,
        },

        methods : {
            last_page() {
                this.$router.push({path: '/user/upload2'});
            },
        },
    }
</script>