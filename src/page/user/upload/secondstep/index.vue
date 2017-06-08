<template>

    <div>

        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">2上傳圖文</h3>
            <button class="float-right ry-btn-cancel-upload">取消上傳</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/本体标记/墨水线上.png" height="7" width="974"/>
        </div>

        <upload id="upload2" class="width600 center"></upload>

    </div>

</template>

<script>
    import upload from './upload.vue';
    export default{
        components:{
            upload,
        },
    }
</script>

<style>

</style>