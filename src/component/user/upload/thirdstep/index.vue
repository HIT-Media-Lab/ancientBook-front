<template>

    <div>

        <!--模块名称-->
        <div>
            <h2>3編輯</h2>
            <button>取消上傳</button>
        </div>

        <upload_edit></upload_edit>

        <div>
            <button>添加</button>
        </div>

        <div>

            <div>
                <span>冊數</span>
                <button>上一冊</button>
                <span></span>
                <button>下一冊</button>
            </div>

            <div>
                <span>卷數</span>
                <button>上一卷</button>
                <span></span>
                <button>下一卷</button>
            </div>

        </div>

        <div>
            <div>
                <button>上一步</button>
            </div>
            <div>
                <button>發佈</button>
            </div>
        </div>
        
    </div>

</template>

<script>
    import upload_edit from './upload_edit.vue';
    export default{
        components:{
            upload_edit,
        }
    }
</script>