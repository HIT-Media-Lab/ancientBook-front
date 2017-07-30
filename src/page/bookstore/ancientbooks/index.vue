<template>
    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">{{first_layer_info.type_name}}</h3>
            <button class="float-right ry-btn-cancel-upload">加入收藏</button>
        </div>

        <div class="width1000 center">
            <img src="../../../assets/img/no-use-picture/ink-line.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍规范名称：</h3>
            <h4 id="bookName" style="display:inline-block" class="float-left ry-book-name">{{book_all_info.name}}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p>{{book_info1}}</p>
                <p>{{book_info2}}</p>
                <p>{{book_info3}}</p>
                <p>{{book_info4}}</p>
            </div>
        </div>

        <div class="width800 center ry-form-upload">
            <catalogueBar></catalogueBar>
            <div id="layer-body" class="ry-form-body">
                <router-view></router-view>
            </div>
            <div>
                <h3>古籍简介</h3>
                <p>{{book_all_info.summary}}</p>
            </div>
            <div>
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>
            <catalogue :bookid="ancient_book_id"></catalogue>
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

        data() {
            return{
                ancient_book_id : '',
                book_all_info : {},
                first_layer_info : {},
                three_layers_info : {},

                book_info_split: [],
                book_info1:'',
                book_info2:'',
                book_info3:'',
                book_info4:'',

            }
        },

        created : function () {
            this.get_ancient_book_id();
            this.get_ancient_books_all_info();
            this.$store.commit("save_book_all_info",this.book_all_info);
            this.$store.commit("save_first_layer_info",this.first_layer_info);
            this.$store.commit("save_three_layers_info",this.three_layers_info);
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
                    this.book_info_split = response.body.standard_name.split('[');
                    if (this.book_info_split.length > 1){
                        this.book_info1 = '[' + this.book_info_split[1];
                        this.book_info2 = '[' + this.book_info_split[2];
                        this.book_info3 = '[' + this.book_info_split[3];
                        this.book_info4 = '[' + this.book_info_split[4];
                    }else {
                        this.book_info_split = response.body.content[i].standard_name.split('【');
                        this.book_info1 = '【' + this.book_info_split[1];
                        this.book_info2 = '【' + this.book_info_split[2];
                        this.book_info3 = '【' + this.book_info_split[3];
                        this.book_info4 = '【' + this.book_info_split[4];
                    }

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
            }

        }
    }
</script>