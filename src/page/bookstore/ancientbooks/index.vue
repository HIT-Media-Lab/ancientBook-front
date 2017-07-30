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

            <!--4层按钮-->
            <div class="ry-menu-bar">
                <ul id="layer-head">
                    <li id="layer-head-variety" @click="click_variety"><span v-show="variety_text">品种层</span><img v-show="variety_pic" src="../../../assets/img/picture-button/variety.png" height="31" width="134"/></li>
                    <li id="layer-head-edition" @click="click_edition"><span v-show="edition_text">版本层</span><img v-show="edition_pic" src="../../../assets/img/picture-button/edition.png" height="30" width="133"/></li>
                    <li id="layer-head-impression" @click="click_impression"><span v-show="impression_text">印次层</span><img v-show="impression_pic" src="../../../assets/img/picture-button/impression.png" height="30" width="133"/></li>
                    <li id="layer-head-copy" @click="click_copy"><span v-show="copy_text">复本层</span><img v-show="copy_pic" src="../../../assets/img/picture-button/copy.png" height="30" width="133"/></li>
                </ul>
            </div>

            <div id="layer-body" class="ry-form-body">

                <!--品种层-->
                <div id="variety-layer" class="layer-input div-now">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>书名:</label>
                                </div>
                                <div class="col-md-4">{{first_layer_info.type_name}}</div>

                                <label class="col-md-2">别名:</label>
                                <div class="col-md-4">{{first_layer_info.type_other_name}}</div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">存佚类型:</label>
                                <div class="col-md-4">{{first_layer_info.type_save_name}}</div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">品种级别：</label>
                                <div class="col-md-4">{{first_layer_info.type_level_name}}</div>

                                <label class="col-md-2">英译：</label>
                                <div class="col-md-4">{{first_layer_info.english}}</div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">提要信息：</label>
                                <div class="col-md-4">{{first_layer_info.type_summary}}</div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">标准分类：</label>
                                <div class="col-md-3">{{first_layer_info.type_bu_name}}</div>
                                <div class="col-md-3">{{first_layer_info.type_lei_name}}</div>
                                <div class="col-md-4">{{first_layer_info.type_shu_name}}</div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div id="form-variety" v-for="item in first_layer_info.responsibility_infos">
                            <div class="row">
                                <div class="col-md-2">
                                    <label>责任开始时间:</label>
                                </div>
                                <div class="col-md-4">{{item.begin_time_name}}</div>

                                <div class="col-md-2">
                                    <label>责任结束时间：</label>
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

                <!--版本层-->
                <div id="edition-layer" class="layer-input">
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

                <!--印次层-->
                <div id="impression-layer" class="layer-input">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <label class="col-md-2">印刷类型：</label>
                                <div class="col-md-4">{{three_layers_info.printing_type_name}}</div>

                                <label class="col-md-2">印次：</label>
                                <div class="col-md-4">{{three_layers_info.printing_number}}</div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div id="form-impression" v-for="item in impression_responsibility">
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

                <!--复本层-->
                <div id="copy-layer" class="layer-input">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <label class="col-md-2">册数：</label>
                                <div class="col-md-4">{{three_layers_info.duplicate_book_count}}</div>

                                <label class="col-md-2">完整性：</label>
                                <div class="col-md-4">{{three_layers_info.duplicate_complete_name}}</div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">品级：</label>
                                <div class="col-md-4">{{three_layers_info.duplicate_level_name}}</div>

                                <label class="col-md-2">附件信息：</label>
                                <div class="col-md-4">{{three_layers_info.duplicate_attachment}}</div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div id="form-copy" v-for="item in copy_responsibility">
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

            </div>
            <div>
                <h3>古籍简介</h3>
                <p>{{book_all_info.summary}}</p>
            </div>
            <div>
                <img src="../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
            </div>
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
        data() {
            return{
                //请求得到数据
                ancient_book_id : '',
                book_all_info : {},
                first_layer_info : {},
                three_layers_info : {},

                //规范名称打散
                book_info_split: [],
                book_info1:'',
                book_info2:'',

                //4层按钮显隐元素
                variety_text : false,
                variety_pic : true,
                edition_text :true,
                edition_pic : false,
                impression_text : true,
                impression_pic : false,
                copy_text : true,
                copy_pic : false,

                //3层责任者信息
                edition_responsibility : [],
                impression_responsibility : [],
                copy_responsibility : [],

                //目录参数
                book : 0,
                volume : 0,
                page : 0,
            }
        },

        created : function () {
            this.get_ancient_book_id();
            this.get_ancient_books_all_info();
        },

        mounted : function () {
            this.edition_responsibility_info();
            this.impression_responsibility_info();
            this.copy_responsibility_info();
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


            /**
             * 4层导航栏按钮显隐元素控制
             */
            click_variety() {
                this.variety_text = false;
                this.variety_pic = true;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_edition() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = false;
                this.edition_pic = true;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_impression() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = false;
                this.impression_pic = true;
                this.copy_text = true;
                this.copy_pic = false;
            },
            click_copy() {
                this.variety_text = true;
                this.variety_pic = false;
                this.edition_text = true;
                this.edition_pic = false;
                this.impression_text = true;
                this.impression_pic = false;
                this.copy_text = false;
                this.copy_pic = true;
            },


            /**
             * 4层模块的切换
             */
            change_module() {
                var variety_head = document.getElementById("layer-head-variety");
                var edition_head = document.getElementById("layer-head-edition");
                var impression_head = document.getElementById("layer-head-impression");
                var copy_head = document.getElementById("layer-head-copy");

                var variety = document.getElementById("variety-layer");
                var edition = document.getElementById("edition-layer");
                var impression = document.getElementById("impression-layer");
                var copy = document.getElementById("copy-layer");

                variety_head.onclick = function () {
                    variety.className = "layer-input div-now";
                    edition.className = "layer-input";
                    impression.className = "layer-input";
                    copy.className = "layer-input";
                };
                edition_head.onclick = function () {
                    variety.className = "layer-input";
                    edition.className = "layer-input div-now";
                    impression.className = "layer-input";
                    copy.className = "layer-input";
                };
                impression_head.onclick = function () {
                    variety.className = "layer-input div-now";
                    edition.className = "layer-input";
                    impression.className = "layer-input div-now";
                    copy.className = "layer-input";
                };
                copy_head.onclick = function () {
                    variety.className = "layer-input div-now";
                    edition.className = "layer-input";
                    impression.className = "layer-input";
                    copy.className = "layer-input div-now";
                }
            },


            /**
             * 3层责任者信息分类
             */
            edition_responsibility_info() {
                var vm = this;
                for (var i = 0; i < three_layers_info.responsibility_infos.length; i++) {
                    if (three_layers_info.responsibility_infos[i].level == 2) {
                        vm.edition_responsibility.push(three_layers_info.responsibility_infos[i])
                    }
                }
            },

            impression_responsibility_info() {
                var vm = this;
                for (var i = 0; i < three_layers_info.responsibility_infos.length; i++) {
                    if (three_layers_info.responsibility_infos[i].level == 3) {
                        vm.impression_responsibility.push(three_layers_info.responsibility_infos[i])
                    }
                }
            },

            copy_responsibility_info() {
                var vm = this;
                for (var i = 0; i < three_layers_info.responsibility_infos.length; i++) {
                    if (three_layers_info.responsibility_infos[i].level == 4) {
                        vm.copy_responsibility.push(three_layers_info.responsibility_infos[i])
                    }
                }
            },


            /**
             * 目录跳转到图文对照
             */
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

<style>
    .ry-menu-bar input{
        background-color: transparent;
    }

    #layer-head li{
        margin-top:15px;
        color: white;
        font-size: large;
        list-style: none;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 194px;
        text-align: center;
        line-height: 30px;
    }

    #layer-head li:visited{
        text-decoration: underline;
    }

    #layer-body > div {
        display: none;
    }

    #layer-body > div.div-now {
        display: block;
    }
</style>