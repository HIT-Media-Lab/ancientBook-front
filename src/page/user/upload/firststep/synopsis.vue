<template>

    <!--古籍简介-->
    <div>
        <h4>古籍簡介</h4>
        <div id="book-info" class="height100" contenteditable="true">{{summary}}</div>
    </div>

</template>

<style>
    .height100{
        height: 100px;
    }
</style>

<script>
    export default{
        created : function () {
            this.summary = this.$store.getters.get_book_summary;
        },

        beforeDestroy : function() {
            this.$store.commit("get_book_summary",this.summary)
        },

        data() {
            return{
                summary : ''
            }
        },

        methods : {

        }

    }
</script>