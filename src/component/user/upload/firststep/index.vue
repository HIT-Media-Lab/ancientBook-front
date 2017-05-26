<template>

    <!--模块名称-->
    <div>
        <h2>1輸入古籍信息</h2>
        <button>調用其他信息</button>
        <button>取消上傳</button>
    </div>

    <div>
        <h3>古籍規範名稱：</h3>
        <h3>書名</h3>
        <div>
            <p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            <p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
        </div>
    </div>

    <label><input type="checkbox" name="private"/>私密上傳</label>

    <div>
        <button>下一步</button>
    </div>

</template>

<script>
    import book_invoke from './book_invoke.vue';
    import copy_layer from './copy_layer.vue';
    import edition_layer from './editon_layer.vue';
    import impression_layer from './impression_layer.vue';
    import varieties_layer from './varieties_layer.vue';
    export default{
        components:{
            book_invoke,
            copy_layer,
            edition_layer,
            impression_layer,
            varieties_layer,
        }
    }
</script>