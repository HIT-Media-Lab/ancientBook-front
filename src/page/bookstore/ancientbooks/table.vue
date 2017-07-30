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
                first_layer_info : {},
                three_layers_info : {},
                book_all_info : {},
                book : 0,
                volume : 0,
                page : 0,
                ancient_book_id : '',
            }
        },

        props: ['bookid'],

        created : function () {
            this.get_ancient_book_id();
            this.get_ancient_books_all_info();
        },

        mounted : function () {

        },

        methods : {
            /**
             * 通过路由获得古籍id
             */
            get_ancient_book_id() {
                this.ancient_book_id = this.$route.params.ancient_book_id;
            },


            /**
             * 发送古籍id，get请求得到4层信息id
             */
            get_ancient_books_all_info() {
                var get_obj = {};
                let url = '/ancient_books/get_ancient_books_all_info_by_id.action?ancient_book_id=' + this.ancient_book_id;
                this.http_json (url , 'get' , get_obj , this.success_get_ancient_books_all_info , this.fail_get_ancient_books_all_info);
            },

            success_get_ancient_books_all_info(response) {
                console.log ("success get books all info");
                if (response.body.length === 0) {
                    console.log ("返回空对象");
                }
                else{
                    this.book_all_info = response.body;

                    var get_obj1 = {};
                    let url1 = '/ancient_books/get_literature_by_id.action?id=' + this.book_all_info.literature_id;
                    this.http_json (url1 , 'get' , get_obj1 , this.success_get_first_layer_info , this.fail_get_first_layer_info);

                    var get_obj = {};
                    let url = '/ancient_books/get_ancient_book_info_by_id.action?id=' + this.book_all_info.ancient_book_info_id;
                    this.http_json (url , 'get' , get_obj , this.success_get_three_layers_info , this.fail_get_three_layers_info);
                }
            },

            fail_get_ancient_books_all_info() {
                console.log ("fail get books all info!");
            },


            /**
             * get请求得到第一层信息
             */
            success_get_first_layer_info(response) {
                console.log ("success get first layer info");
                if (response.body.length === 0) {
                    console.log ("返回空对象");
                }
                else{
                    this.first_layer_info = response.body;
                }
            },

            fail_get_first_layer_info() {
                console.log ("fail get first layer info!");
            },


            /**
             * get请求得到另外三层信息
             */
            success_get_three_layers_info(response) {
                console.log ("success get 3 layers info");
                if (response.body === '') {
                    console.log ("返回空对象");
                }
                else{
                    this.three_layers_info = response.body;
                }
            },

            fail_get_three_layers_info() {
                console.log ("fail get 3 layers info!");
            },

            
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