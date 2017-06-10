<template>

    <div class="ry-upload-three">

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">3編輯</h3>
            <button class="float-right ry-btn-cancel-upload">取消上傳</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
        </div>

        <upload_edit class="width800 center"></upload_edit>

        <!--底按鈕欄-->
        <div class="width1000 center">
            <div class="ry-bottom-bar">
                <button class="float-right ry-btn-next-page">下一卷</button>
                <button class="float-right ry-btn-go">GO</button>
                <div class="float-right ry-page">
                    <input class="ry-input-page">
                    <span>/</span>
                    <span>80</span>
                </div>
                <button class="float-right ry-btn-last-page">上一卷</button>
                <button class="ry-btn-last-page">上一冊</button>
                <div style="display: inline-block" class="ry-page">
                    <input class="ry-input-page">
                    <span>/</span>
                    <span>80</span>
                </div>
                <button class="ry-btn-go">GO</button>
                <button class="ry-btn-next-page">下一冊</button>
            </div>
        </div>

        <div class="width1000 center">
            <button class="ry-btn-submit float-right">發佈</button>
            <button class="ry-btn-last-step3 float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    import upload_edit from './upload-edit.vue';
    export default{
        components:{
            upload_edit,
        },

        methods : {
            last_page() {
                this.$router.push({path: '/user/upload2'});
            },
        },
    }
</script>

<style>
    .ry-upload-three button{
        background-color: transparent;
        border: none;
    }

    .ry-btn-submit{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传2/下一步.png");
    }

    .ry-btn-last-step3{
        color: white;
        width: 127px;
        height: 54px;
        background-image: url("../../../../assets/img/上传2/下一步.png");
    }
</style>