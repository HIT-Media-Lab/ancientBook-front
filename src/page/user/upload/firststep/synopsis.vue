<template>

    <!--古籍简介-->
    <div>
        <h4>古籍簡介</h4>
        <div id="book-info" class="height100" contenteditable="true">诗经》是我国第一部诗歌总集，共收入自西周初年至春秋中叶大约五百多年的诗歌三百零五篇。《诗经》共分风（160篇）、雅（105篇）、颂（40篇）三大部分。它们都得名于音乐。“风”的意义就是声调。古人所谓《秦风》、《魏风》、《郑风》，就如现在我们说陕西调、山西调、河南调、“雅”是正的意思。周代人把正声叫做雅乐，犹如清代人把昆腔叫做雅部，带有一种尊崇的意味。大雅小雅可能是根据年代先后而分的。“颂”是用于宗庙祭的乐歌。</div>
    </div>

</template>

<style>
    .height100{
        height: 100px;
    }
</style>

<script>
    export default{
        watch:{
            $route(){
                this.get_book_summary();
                this.$store.commit("get_book_summary",this.summary);
            }
        },

        data() {
            return{
                summary : ''
            }
        },

        methods : {
            get_book_summary() {
                var book_info = document.getElementById("book-info");
                this.summary = book_info.value;
            }
        }

    }
</script>