<template>
    <!--古籍简介-->
    <div>
        <h4>古籍简介</h4>
        <input id="book-info" class="height100 width800" v-model="summary">
    </div>
</template>

<style>
    .height100{
        height: 100px;
    }
</style>

<script>
    export default{
        data() {
            return{
                summary : ''
            }
        },

        created : function () {
            this.summary = this.$store.getters.get_book_summary;
        },

        beforeDestroy : function() {
            this.$store.commit("get_book_summary",this.summary);
        },

        methods : {

        }

    }
</script>