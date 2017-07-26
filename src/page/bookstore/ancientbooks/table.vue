<template>
    <div>
        <h3>目录</h3>
        <div>
            <div v-for="(item,index) in book_all_info.catalogue">
                <div>
                    <span>册{{item.book_count}}</span>
                    <span>{{item.book_name}}</span>
                </div>
                <div>
                    <span v-for="volume in book_all_info.catalogue[index].volume" @click="go_to(item.book_count,volume.volume_count,volume.begin_page)">卷{{volume.volume_count}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return{
                book_all_info : {},
                book : 0,
                volume : 0,
                page : 0,
                ancient_book_id : '',
            }
        },

        props: ['bookid'],

        created : function () {
            this.$store.commit("save_book_all_info",this.book_all_info);
        },

        mounted : function () {
            this.$store.commit("save_book_all_info",this.book_all_info);
        },

        methods : {
            go_to(book,volume,page) {
                this.book = book;
                this.volume = volume;
                this.page = page;
                this.ancient_book_id = this.bookid;

                this.$route.params.book = this.book;
                this.$route.params.volume = this.volume;
                this.$route.params.page = this.page;
                this.$route.params.ancient_book_id = this.ancient_book_id;

                this.$router.push({name:'ancientbook', params: this.$route.params});
            }
        }
    }
</script>