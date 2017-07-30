<template>

    <!--版本层-->
    <div class="layer-input">
        <div id="edition" class="form-center">
            <div>
                <div class="row">
                    <label class="col-md-2">版本类型：</label>
                    <div class="col-md-4">{{three_layers_info.version_type_name}}</div>

                    <label class="col-md-2">版本时代：</label>
                    <div class="col-md-4">{{three_layers_info.version_age_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">载体形式：</label>
                    <div class="col-md-4">{{three_layers_info.version_support_name}}</div>

                    <label class="col-md-2">装帧形式：</label>
                    <div class="col-md-4">{{three_layers_info.version_binding_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">板框长度：</label>
                    <div class="col-md-4">{{three_layers_info.version_frame_length}}</div>

                    <label class="col-md-2">板框宽度：</label>
                    <div class="col-md-4">{{three_layers_info.version_frame_width}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">开本长度：</label>
                    <div class="col-md-4">{{three_layers_info.version_format_length}}</div>

                    <label class="col-md-2">开本宽度：</label>
                    <div class="col-md-4">{{three_layers_info.version_format_width}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">牌记内容：</label>
                    <div class="col-md-4">{{three_layers_info.version_paiji_content}}</div>

                    <label class="col-md-2">牌记位置:</label>
                    <div class="col-md-4">{{three_layers_info.version_paiji_location}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">半页行数：</label>
                    <div class="col-md-4">{{three_layers_info.version_half_page_line_number}}</div>

                    <label class="col-md-2">每行字数：</label>
                    <div class="col-md-4">{{three_layers_info.version_page_line_number}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">双行小字字数：</label>
                    <div class="col-md-4">{{three_layers_info.version_double_page_number}}</div>

                    <label class="col-md-2">鱼尾样式：</label>
                    <div class="col-md-4">{{three_layers_info.version_yuwei_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">边栏样式：</label>
                    <div class="col-md-4">{{three_layers_info.version_bianlan_name}}</div>

                    <label class="col-md-2">分栏：</label>
                    <div class="col-md-4">{{three_layers_info.version_fenlan_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">书口样式：</label>
                    <div class="col-md-4">{{three_layers_info.version_shukou_name}}</div>

                    <label class="col-md-2">版心内容：</label>
                    <div class="col-md-4">{{three_layers_info.version_banxin_content}}</div>
                </div>


                <div class="row">
                    <label class="col-md-2">有无书耳：</label>
                    <div class="col-md-4">{{three_layers_info.version_youshuwuer}}</div>

                    <label class="col-md-2">有无夹注：</label>
                    <div class="col-md-4">{{three_layers_info.version_youwujiazhu_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">卷数:</label>
                    <div class="col-md-4">{{three_layers_info.version_volume}}</div>
                </div>
            </div>

            <div>
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>

            <div id="form-edition" v-for="item in edition_responsibility">
                <div class="row">
                    <div class="col-md-2">
                        <label>责任开始时间:</label>
                    </div>
                    <div class="col-md-4">{{item.begin_time_name}}</div>

                    <div class="col-md-2">
                        <label>责任结束时间:</label>
                    </div>
                    <div class="col-md-4">{{item.end_time_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">责任地点：</label>
                    <div class="col-md-4">{{item.location_name}}</div>

                    <div class="col-md-2">
                        <label>责任者名称:</label>
                    </div>
                    <div class="col-md-4">{{item.name_name}}</div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label>责任者类型：</label>
                    </div>
                    <div class="col-md-4">{{item.type_name}}</div>

                    <div class="col-md-2">
                        <label>责任行为：</label>
                    </div>
                    <div class="col-md-4">{{item.action_name}}</div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <label>确定性：</label>
                    </div>
                    <div class="col-md-4">{{item.confirm_name}}</div>
                </div>

                <div class="row">
                    <label class="col-md-2">责任说明：</label>
                    <div class="col-md-4">{{item.explain}}</div>
                </div>

            </div>

            <div>
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default{
        data() {
            return{
                ancient_book_id : '',
                book_all_info : {},
                first_layer_info : {},
                three_layers_info : {},
                edition_responsibility : [],
            }
        },

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
            },


            classify_responsibility_info() {
                var vm = this;
                for (var i = 0; i < three_layers_info.responsibility_infos.length; i++) {
                    if (three_layers_info.responsibility_infos[i].level == 2) {
                        vm.edition_responsibility.push(three_layers_info.responsibility_infos[i])
                    }
                }
            }
        },
    }
</script>