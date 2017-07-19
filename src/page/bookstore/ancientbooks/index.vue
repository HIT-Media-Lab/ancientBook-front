<template>
    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">诗经</h3>
            <button class="float-right ry-btn-cancel-upload">加入收藏</button>
        </div>

        <div class="width1000 center">
            <img src="../../../assets/img/no-use-picture/ink-line.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍規範名稱：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">書名</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>
                <p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>
            </div>
        </div>

        <div class="width800 center ry-form-upload">
            <catalogueBar></catalogueBar>
            <div id="layer-body" class="ry-form-body">
                <router-view></router-view>
            </div>
            <div>
                <h3>古籍簡介</h3>
                <p>诗经》是我国第一部诗歌总集，共收入自西周初年至春秋中叶大约五百多年的诗歌三百零五篇。《诗经》共分风（160篇）、雅（105篇）、颂（40篇）三大部分。它们都得名于音乐。“风”的意义就是声调。古人所谓《秦风》、《魏风》、《郑风》，就如现在我们说陕西调、山西调、河南调、“雅”是正的意思。周代人把正声叫做雅乐，犹如清代人把昆腔叫做雅部，带有一种尊崇的意味。大雅小雅可能是根据年代先后而分的。“颂”是用于宗庙祭的乐歌。</p>
            </div>
            <div>
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>
            <catalogue></catalogue>
        </div>

    </div>
</template>

<script>
    import catalogue from './table.vue';
    import copy from './copy.vue';
    import edition from './edition.vue';
    import impression from './impression.vue';
    import varieties from './varieties.vue';
    import catalogueBar from './catalogue-bar.vue';
    export default{


        components:{
            catalogue,
            copy,
            edition,
            impression,
            varieties,
            catalogueBar,
        },
    }
</script>