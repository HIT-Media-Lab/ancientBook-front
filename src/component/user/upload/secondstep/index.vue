<template>

    <div>

        <!--模块名称-->
        <div>
            <h2>2上傳圖文</h2>
            <button>取消上傳</button>
        </div>

        <upload></upload>

        <div>
            <p>请严格遵守命名规范上传文件，并保证对应图文文件的名称一致（可以仅上传图片文件）</p>
            <p>命名规范：“卷-页”，如“卷1-1.jpg”，“卷1-1.txt”</p>
            <p>若分AB页：“卷-页-A/B”，如“卷1-1-A.jpg”，“卷1-1-B.jpg”，“卷1-1-A.txt”，“卷1-1-B.txt”</p>
        </div>

        <div>
            <div>
                <button>下一步</button>
            </div>
            <div>
                <button>上一步</button>
            </div>
        </div>

    </div>

</template>

<script>
    import upload from './upload.vue';
    export default{
        components:{
            upload,
        }
    }
</script>