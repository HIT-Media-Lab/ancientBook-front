<template>

    <div>

        <!--模块名称-->
        <div class="width800 center">
            <h2 style="display:inline-block">2上傳圖文</h2>
            <button class="float-right">取消上傳</button>
        </div>

        <upload class="width600 center"></upload>

        <div class="width600 center">
            <p>请严格遵守命名规范上传文件，并保证对应图文文件的名称一致（可以仅上传图片文件）</p>
            <p>命名规范：“卷-页”，如“卷1-1.jpg”，“卷1-1.txt”</p>
            <p>若分AB页：“卷-页-A/B”，如“卷1-1-A.jpg”，“卷1-1-B.jpg”，“卷1-1-A.txt”，“卷1-1-B.txt”</p>
        </div>

        <div class="width600 center">
            <button class="float-right" @click="next_page()">下一步</button>
            <button class="float-right" @click="last_page()">上一步</button>
        </div>

    </div>

</template>

<script>
    import upload from './upload.vue';
    export default{
        components:{
            upload,
        },

        methods :{
            next_page() {
                this.$router.push({path: '/user/upload3'});
            },
            last_page() {
                this.$router.push({path: '/user/upload1'});
            },
        },
    }
</script>