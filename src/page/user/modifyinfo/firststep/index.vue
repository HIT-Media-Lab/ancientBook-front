<template>

    <div class="ry-upload">
        <!--模块名称-->
        <div class="width950 center">
            <h3 style="display:inline-block">1输入古籍名称</h3>
            <button class="float-right ry-btn-cancel-upload" @click="cancel_upload">取消编辑</button>
        </div>

        <div class="width1000 center">
            <img src="../../../../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <div class="width950 center">
            <h3 style="display:inline-block" class="float-left">古籍规范名称：</h3>
            <h4 style="display:inline-block" class="float-left ry-book-name">{{first_layer_info.type_name}}</h4>
            <div class="ry-4layers" style="display:inline-block">
                <p>{{book_info1}}</p>
                <p>{{book_info2}}</p>
                <p>{{book_info3}}</p>
                <p>{{book_info4}}</p>
            </div>
        </div>

        <div class="width800 center ry-form-upload">

            <!--4层导航按钮-->
            <div class="ry-menu-bar">
                <ul id="layer-head">
                    <li id="layer-head-variety" @click="click_variety"><span v-show="variety_text">品种层</span><img v-show="variety_pic" src="../../../../assets/img/picture-button/variety.png" height="31" width="134"/></li>
                    <li id="layer-head-edition" @click="click_edition"><span v-show="edition_text">版本层</span><img v-show="edition_pic" src="../../../../assets/img/picture-button/edition.png" height="30" width="133"/></li>
                    <li id="layer-head-impression" @click="click_impression"><span v-show="impression_text">印次层</span><img v-show="impression_pic" src="../../../../assets/img/picture-button/impression.png" height="30" width="133"/></li>
                    <li id="layer-head-copy" @click="click_copy"><span v-show="copy_text">复本层</span><img v-show="copy_pic" src="../../../../assets/img/picture-button/copy.png" height="30" width="133"/></li>
                </ul>
            </div>

            <div id="layer-body" class="ry-form-body">

                <!--品种层-->
                <div id="variety-layer" class="layer-input div-now">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star">*</span>
                                    <label>书名:</label>
                                </div>
                                <div class="col-md-4">
                                    <input id="bookName" v-model="first_layer_info.type_name">
                                </div>

                                <label class="col-md-2">别名:</label>
                                <div class="col-md-4">
                                    <input v-model="first_layer_info.type_other_name" placeholder="多值属性用逗号隔开">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">存佚类型:</label>
                                <div class="col-md-4">
                                    <select id="ry-type-save">
                                        <option>不详</option>
                                        <option>存</option>
                                        <option>佚</option>
                                        <option>残</option>
                                        <option>疑</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">品种级别：</label>
                                <div class="col-md-4">
                                    <select id="ry-type-level">
                                        <option>不详</option>
                                        <option>丛书总目</option>
                                        <option>丛书子目</option>
                                        <option>单行本</option>
                                        <option>合订本总目</option>
                                        <option>合订本子目</option>
                                    </select>
                                </div>

                                <label class="col-md-2">英译：</label>
                                <div class="col-md-4">
                                    <input v-model="first_layer_info.english">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">提要信息：</label>
                                <div class="col-md-4">
                                    <input id="ry-input-info" v-model="first_layer_info.type_summary">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">标准分类：</label>
                                <div class="col-md-3">
                                    <select id="ry-select-b" @change="">
                                        <option v-for="item in menu_eight">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select id="ry-select-l" @click="get_lei_item()" @change="">
                                        <option v-for="item in lei_items">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select id="ry-select-s" @click="get_shu_item()">
                                        <option v-for="item in shu_items">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div class="form-variety" v-for="(item,index) in variety_item">
                            <div class="row">
                                <div class="col-md-2 float-right">
                                    <button id="btn-add-copy" class="ry-btn-add" @click="add_new_box_v(index)" v-show="variety_item[index].value_add">添加</button>
                                </div>
                                <div class="col-md-2 float-right">
                                    <button id="btn-delete-copy" class="ry-btn-del" @click="del_new_box_v(index)" v-show="variety_item[index].value_del">删除</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任开始时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_birth_v()" v-model="item.begin_time_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任结束时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_dead_v()" v-model="item.end_time_name">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任地点：</label>
                                <div class="col-md-4">
                                    <input readonly @click="open_location_v()" v-model="item.location_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者名称:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_character_v()" v-model="item.name_name">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者类型：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-v-type" @click="get_index_v()" @change="change_type_v()">
                                        <option>不详</option>
                                        <option>责任人</option>
                                        <option>责任机构</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任行为：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-v-action">
                                        <option v-for="item in menu_nine">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>确定性：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-v-confirm">
                                        <option>不详</option>
                                        <option>确定</option>
                                        <option>题</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任说明：</label>
                                <div class="col-md-4">
                                    <input v-model="first_layer_info.explain">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <time_modal :time_modal="this.time_modal_v1" v-on:success_time="birth_time_v()" v-on:close_modal="close_birth_v()"></time_modal>
                        <time_modal :time_modal="this.time_modal_v2" v-on:success_time="dead_time_v()" v-on:close_modal="close_dead_v()"></time_modal>
                        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal_v" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_location_v()" v-on:add_noumenon_relations="add_location_v()"></search_modal>
                        <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal_v" :noumenon_number="this.noumenon_number_v" :repeat_arr="[]" v-on:close_modal="close_character_v()" v-on:add_noumenon_relations="add_character_v()"></search_modal>
                    </div>
                </div>

                <!--版本层-->
                <div id="edition-layer" class="layer-input">
                    <div id="edition" class="form-center">
                        <div>
                            <div class="row">
                                <label class="col-md-2">版本类型：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-edition-type">
                                        <option v-for="item in menu_ten">{{item.chinese_name}}</option>
                                    </select>
                                </div>

                                <label class="col-md-2">版本时代：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-age">
                                        <option v-for="item in menu_eleven">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">载体形式：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-support">
                                        <option v-for="item in menu_twelve">{{item.chinese_name}}</option>
                                    </select>
                                </div>

                                <label class="col-md-2">装帧形式：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-binding">
                                        <option v-for="item in menu_thirteen">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">板框长度：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_frame_length">
                                </div>

                                <label class="col-md-2">板框宽度：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_frame_width">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">开本长度：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_format_length">
                                </div>

                                <label class="col-md-2">开本宽度：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_format_width">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">牌记内容：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_paiji_content">
                                </div>

                                <label class="col-md-2">牌记位置:</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_paiji_location">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">半页行数：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_half_page_line_number">
                                </div>

                                <label class="col-md-2">每行字数：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_page_line_number">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">双行小字字数：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_double_page_number">
                                </div>

                                <label class="col-md-2">鱼尾样式：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-fish">
                                        <option v-for="item in menu_fourteen">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">边栏样式：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-side">
                                        <option v-for="item in menu_fifteen">{{item.chinese_name}}</option>
                                    </select>
                                </div>

                                <label class="col-md-2">分栏：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-divide">
                                        <option v-for="item in menu_sixteen">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">书口样式：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-book">
                                        <option v-for="item in menu_seventeen">{{item.chinese_name}}</option>
                                    </select>
                                </div>

                                <label class="col-md-2">版心內容：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_banxin_content">
                                </div>
                            </div>


                            <div class="row">
                                <label class="col-md-2">有无书耳：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_youshuwuer">
                                </div>

                                <label class="col-md-2">有无夹注：</label>
                                <div class="col-md-4">
                                    <select id="ry-e-comment">
                                        <option>不详</option>
                                        <option>有</option>
                                        <option>无</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">卷数:</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.version_volume">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div class="form-edition" v-for="(item,index) in edition_item">
                            <div class="row">
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-add" @click="add_new_box_e(index)" v-show="edition_item[index].value_add">添加</button>
                                </div>
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-del" @click="del_new_box_e(index)" v-show="edition_item[index].value_del">刪除</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任开始时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_birth_e()" v-model="item.begin_time_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任结束时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_dead_e()" v-model="item.end_time_name">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任地点：</label>
                                <div class="col-md-4">
                                    <input readonly @click="open_location_e()" v-model="item.location_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者名称:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_character_e()" v-model="item.name_name">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者类型：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-e-type" @click="get_index_e()" @change="change_type_e()">
                                        <option>不详</option>
                                        <option>责任人</option>
                                        <option>责任机构</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任行为：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-e-action">
                                        <option v-for="item in menu_nineteen">{{item.chinese_name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>确定性：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-e-confirm">
                                        <option>不详</option>
                                        <option>确定</option>
                                        <option>题</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任说明：</label>
                                <div class="col-md-4">
                                    <input v-model="item.explain">
                                </div>
                            </div>

                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <time_modal :time_modal="this.time_modal_e1" v-on:success_time="birth_time_e()" v-on:close_modal="close_birth_e()"></time_modal>
                        <time_modal :time_modal="this.time_modal_e2" v-on:success_time="dead_time_e()" v-on:close_modal="close_dead_e()"></time_modal>
                        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal_e" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_location_e()" v-on:add_noumenon_relations="add_location_e()"></search_modal>
                        <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal_e" :noumenon_number="this.noumenon_number_e" :repeat_arr="[]" v-on:close_modal="close_character_e()" v-on:add_noumenon_relations="add_character_e()"></search_modal>
                    </div>
                </div>

                <!--印次层-->
                <div id="impression-layer" class="layer-input">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <label class="col-md-2">印刷类型：</label>
                                <div class="col-md-4">
                                    <select id="ry-i-print">
                                        <option>不详</option>
                                        <option>墨印</option>
                                        <option>朱印</option>
                                        <option>蓝印</option>
                                        <option>绿印</option>
                                        <option>套印</option>
                                        <option>双色套印</option>
                                        <option>三色套印</option>
                                        <option>四色套印</option>
                                        <option>四色以上套印</option>
                                    </select>
                                </div>

                                <label class="col-md-2">印次：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.printing_number">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div class="form-impression" v-for="(item,index) in impression_item">
                            <div class="row">
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-add" @click="add_new_box_i(index)" v-show="impression_item[index].value_add">添加</button>
                                </div>
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-del" @click="del_new_box_i(index)" v-show="impression_item[index].value_del">删除</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任开始时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_birth_i()" v-model="item.begin_time_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任结束时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_dead_i()" v-model="item.end_time_name">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任地点：</label>
                                <div class="col-md-4">
                                    <input readonly @click="open_location_i()" v-model="item.location_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者名称:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_character_i()" v-model="item.name_name">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者类型：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-i-type" @click="get_index_i()" @change="change_type_i()">
                                        <option>不详</option>
                                        <option>责任人</option>
                                        <option>责任机构</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任行为：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-i-action">
                                        <option>初印</option>
                                        <option>重印</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>确定性：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-i-confirm">
                                        <option>不详</option>
                                        <option>确定</option>
                                        <option>题</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任说明：</label>
                                <div class="col-md-4">
                                    <input v-model="item.explain">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <time_modal :time_modal="this.time_modal_i1" v-on:success_time="birth_time_i()" v-on:close_modal="close_birth_i()"></time_modal>
                        <time_modal :time_modal="this.time_modal_i2" v-on:success_time="dead_time_i()" v-on:close_modal="close_dead_i()"></time_modal>
                        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal_i" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_location_i()" v-on:add_noumenon_relations="add_location_i()"></search_modal>
                        <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal_i" :noumenon_number="this.noumenon_number_i" :repeat_arr="[]" v-on:close_modal="close_character_i()" v-on:add_noumenon_relations="add_character_i()"></search_modal>
                    </div>
                </div>

                <!--复本层-->
                <div id="copy-layer" class="layer-input">
                    <div class="form-center">
                        <div>
                            <div class="row">
                                <label class="col-md-2">册数：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.duplicate_book_count">
                                </div>

                                <label class="col-md-2">完整性：</label>
                                <div class="col-md-4">
                                    <select id="ry-c-complete">
                                        <option>不详</option>
                                        <option>全</option>
                                        <option>残</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">品级：</label>
                                <div class="col-md-4">
                                    <select id="ry-c-level">
                                        <option>不详</option>
                                        <option>一级甲等</option>
                                        <option>一级乙等</option>
                                        <option>一级丙等</option>
                                        <option>二级甲等</option>
                                        <option>二级乙等</option>
                                        <option>二级丙等</option>
                                        <option>三级甲等</option>
                                        <option>三级乙等</option>
                                        <option>三级丙等</option>
                                        <option>四级</option>
                                    </select>
                                </div>

                                <label class="col-md-2">附件信息：</label>
                                <div class="col-md-4">
                                    <input v-model="three_layers_info.duplicate_attachment">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <div class="form-copy" v-for="(item,index) in copy_item">
                            <div class="row">
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-add" @click="add_new_box_c(index)" v-show="copy_item[index].value_add">添加</button>
                                </div>
                                <div class="col-md-2 float-right">
                                    <button class="ry-btn-del" @click="del_new_box_c(index)" v-show="copy_item[index].value_del">删除</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任开始时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_birth_c()" v-model="item.begin_time_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任结束时间:</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_dead_c()" v-model="item.end_time_name">
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任地点：</label>
                                <div class="col-md-4">
                                    <input readonly @click="open_location_c()" v-model="item.location_name">
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者名称：</label>
                                </div>
                                <div class="col-md-4">
                                    <input readonly @click="open_character_c()" v-model="item.name_name">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任者类型：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-c-type" @click="get_index_c()" @change="change_type_c()">
                                        <option>不详</option>
                                        <option>责任人</option>
                                        <option>责任机构</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>责任行为：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-c-action">
                                        <option>赠</option>
                                        <option>藏</option>
                                        <option>装</option>
                                        <option>购</option>
                                        <option>题签</option>
                                        <option>题跋</option>
                                        <option>过录</option>
                                        <option>批注</option>
                                        <option>批校</option>
                                        <option>补目</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-2">
                                    <span class="star"></span>
                                    <label>确定性：</label>
                                </div>
                                <div class="col-md-4">
                                    <select class="ry-c-confirm">
                                        <option>不详</option>
                                        <option>确定</option>
                                        <option>题</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label class="col-md-2">责任说明：</label>
                                <div class="col-md-4">
                                    <input v-model="item.explain">
                                </div>
                            </div>
                        </div>

                        <div>
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="6" width="843"/>
                        </div>

                        <time_modal :time_modal="this.time_modal_c1" v-on:success_time="birth_time_c()" v-on:close_modal="close_birth_c()"></time_modal>
                        <time_modal :time_modal="this.time_modal_c2" v-on:success_time="dead_time_c()" v-on:close_modal="close_dead_c()"></time_modal>
                        <search_modal :search_url="this.search_location" :noumenon_modal="this.location_modal_c" :noumenon_number="7" :repeat_arr="[]" v-on:close_modal="close_location_c()" v-on:add_noumenon_relations="add_location_c()"></search_modal>
                        <search_modal :search_url="this.search_person" :noumenon_modal="this.character_modal_c" :noumenon_number="this.noumenon_number_c" :repeat_arr="[]" v-on:close_modal="close_character_c()" v-on:add_noumenon_relations="add_character_c()"></search_modal>
                    </div>
                </div>

            </div>
            <div>
                <h3>古籍简介</h3>
                <p>{{book_all_info.summary}}</p>
            </div>
            <div>
                <button class="float-right ry-btn-next-step" @click="confirm_modify">确定</button>
                <button class="float-right ry-btn-keep-modify" @click="next_page">继续编辑图文</button>
                <label class="float-right"><input id="ry-one-pri" type="checkbox" name="private" class="ry-check-pri">私密上传</label>
            </div>
        </div>

    </div>

</template>

<script>
    import time_modal from '../../../../component/time-modal.vue';
    import search_modal from '../../../../component/search_noumenon.vue';

    export default{
        components:{
            time_modal,
            search_modal,
        },

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
                book_info3:'',
                book_info4:'',

                //4层按钮显隐元素
                variety_text : false,
                variety_pic : true,
                edition_text : true,
                edition_pic : false,
                impression_text : true,
                impression_pic : false,
                copy_text : true,
                copy_pic : false,

                //下拉菜单
                lei_items : [],
                shu_items : [],
                menu_eight : [],
                menu_nine : [],
                menu_ten : [],
                menu_eleven : [],
                menu_twelve : [],
                menu_thirteen : [],
                menu_fourteen : [],
                menu_fifteen : [],
                menu_sixteen : [],
                menu_seventeen : [],
                menu_nineteen : [],

                //3层责任者信息
                variety_item : [],
                edition_item : [],
                impression_item : [],
                copy_item : [],
                edition_responsibility : [],
                impression_responsibility : [],
                copy_responsibility : [],

                //模态框
                index_v : 0,
                index_e : 0,
                index_i : 0,
                index_c : 0,
                noumenon_number_v : 0,
                noumenon_number_e : 0,
                noumenon_number_i : 0,
                noumenon_number_c : 0,
                search_person:'',
                search_location:'/ancient_books/get_location_list_by_name.action',
                time_modal_v1 : false,
                time_modal_v2 : false,
                location_modal_v : false,
                character_modal_v : false,
                time_modal_e1 : false,
                time_modal_e2 : false,
                location_modal_e : false,
                character_modal_e : false,
                time_modal_i1 : false,
                time_modal_i2 : false,
                location_modal_i : false,
                character_modal_i : false,
                time_modal_c1 : false,
                time_modal_c2 : false,
                location_modal_c : false,
                character_modal_c : false,

                upload_one_info : {
                    pri : 0,
                    standard_name : '',
                    name : '',
                },
            }
        },

        created : function () {
            this.ancient_book_id = this.$route.params.ancient_book_id;
            this.get_ancient_books_all_info();

            this.get_menu_eight();
            this.get_menu_nine();
            this.get_menu_ten();
            this.get_menu_eleven();
            this.get_menu_twelve();
            this.get_menu_thirteen();
            this.get_menu_fourteen();
            this.get_menu_fifteen();
            this.get_menu_sixteen();
            this.get_menu_seventeen();
            this.get_menu_nineteen();
        },

        mounted : function () {
            this.change_module();
        },

        beforeRouteLeave (to, from, next) {

            next();
        },

        watch:{
            $route(){

            }
        },

        methods : {
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
                    this.create_vresponsibility_info
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
                    this.edition_responsibility_info();
                    this.impression_responsibility_info();
                    this.copy_responsibility_info();
                }
            },

            fail_get_three_layers_info() {
                console.log ("fail get 3 layers info!");
            },


            /**
             * get请求得到下拉菜单信息
             */
            get_lei_item() {
                var bu = document.getElementById("ry-select-b");
                var bu_index = bu.selectedIndex + 1;
                var url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=' + bu_index + '&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_lei_items , this.fail_get_lei_items);
            },

            success_get_lei_items(response) {
                console.log ("success get lei items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.lei_items.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_lei_items() {
                console.log ("fail get lei items!");
            },


            get_shu_item() {
                var bu = document.getElementById("ry-select-b");
                var lei = document.getElementById("ry-select-l");
                var bu_index = bu.selectedIndex + 1;
                var lei_index = lei.selectedIndex + 1;
                var url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=' + bu_index + '&&item_2_id=' + lei_index
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_shu_items , this.fail_get_shu_items);
            },

            success_get_shu_items(response) {
                console.log ("success get shu items ");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.shu_items.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_shu_items() {
                console.log ("fail get shu items!");
            },


            get_menu_eight() {
                var url = '/ancient_books/get_menu_items.action?model_id=8&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_eight , this.fail_get_menu_eight);
            },

            success_get_menu_eight(response) {
                console.log ("success get menu eight");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_eight.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_eight() {
                console.log ("fail get menu eight!");
            },


            get_menu_nine() {
                var url = '/ancient_books/get_menu_items.action?model_id=9&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_nine , this.fail_get_menu_nine);
            },

            success_get_menu_nine(response) {
                console.log ("success get menu nine");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_nine.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_nine() {
                console.log ("fail get menu nine!");
            },


            get_menu_ten() {
                var url = '/ancient_books/get_menu_items.action?model_id=10&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_ten , this.fail_get_menu_ten);
            },

            success_get_menu_ten(response) {
                console.log ("success get menu ten");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_ten.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_ten() {
                console.log ("fail get menu ten!");
            },


            get_menu_eleven() {
                var url = '/ancient_books/get_menu_items.action?model_id=11&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_eleven , this.fail_get_menu_eleven);
            },

            success_get_menu_eleven(response) {
                console.log ("success get menu eleven");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_eleven.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_eleven() {
                console.log ("fail get menu eleven!");
            },


            get_menu_twelve() {
                var url = '/ancient_books/get_menu_items.action?model_id=12&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_twelve , this.fail_get_menu_twelve);
            },

            success_get_menu_twelve(response) {
                console.log ("success get menu twelve");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_twelve.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_twelve() {
                console.log ("fail get menu twelve!");
            },


            get_menu_thirteen() {
                var url = '/ancient_books/get_menu_items.action?model_id=13&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_thirteen , this.fail_get_menu_thirteen);
            },

            success_get_menu_thirteen(response) {
                console.log ("success get menu thirteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_thirteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_thirteen() {
                console.log ("fail get menu thirteen!");
            },


            get_menu_fourteen() {
                var url = '/ancient_books/get_menu_items.action?model_id=14&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_fourteen , this.fail_get_menu_fourteen);
            },

            success_get_menu_fourteen(response) {
                console.log ("success get menu fourteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_fourteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_fourteen() {
                console.log ("fail get menu fourteen!");
            },


            get_menu_fifteen() {
                var url = '/ancient_books/get_menu_items.action?model_id=15&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_fifteen , this.fail_get_menu_fifteen);
            },

            success_get_menu_fifteen(response) {
                console.log ("success get menu fifteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_fifteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_fifteen() {
                console.log ("fail get menu fifteen!");
            },


            get_menu_sixteen() {
                var url = '/ancient_books/get_menu_items.action?model_id=16&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_sixteen , this.fail_get_menu_sixteen);
            },

            success_get_menu_sixteen(response) {
                console.log ("success get menu sixteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_sixteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_sixteen() {
                console.log ("fail get menu sixteen!");
            },


            get_menu_seventeen() {
                var url = '/ancient_books/get_menu_items.action?model_id=17&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_seventeen , this.fail_get_menu_seventeen);
            },

            success_get_menu_seventeen(response) {
                console.log ("success get menu seventeen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_seventeen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_seventeen() {
                console.log ("fail get menu seventeen!");
            },


            get_menu_nineteen() {
                var url = '/ancient_books/get_menu_items.action?model_id=19&&item_1_id=0&&item_2_id=0';
                var obj = {};
                this.http_json (url , 'get' , obj , this.success_get_menu_nineteen , this.fail_get_menu_nineteen);
            },

            success_get_menu_nineteen(response) {
                console.log ("success get menu nineteen");
                //将后端数据显示在前端页面里
                if (response.body.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    for (var j = 0; j <= response.body.length-1; j++) {
                        this.menu_nineteen.push({
                            chinese_name: response.body[j].chinese_name
                        });
                    }
                }
            },

            fail_get_menu_nineteen() {
                console.log ("fail get menu nineteen!");
            },


            /**
             * 责任者类型改变
             */
            change_type_v() {
                var types = document.getElementsByClassName("ry-v-type");
                if (types[this.index_v].selectedIndex == 0) {
                    this.search_person = '';
                    this.noumenon_number_v = 0;
                }
                else if (types[this.index_v].selectedIndex == 1) {
                    this.search_person = '/ancient_books/get_person_list_by_name.action';
                    this.noumenon_number_v = 1;
                }
                else if (types[this.index_v].selectedIndex == 2) {
                    this.search_person = '/ancient_books/get_institution_list_by_name.action';
                    this.noumenon_number_v = 6;
                }
            },

            change_type_e() {
                var types = document.getElementsByClassName("ry-e-type");
                if (types[this.index_e].selectedIndex == 0) {
                    this.search_person = '';
                    this.noumenon_number_e = 0;
                }
                else if (types[this.index_e].selectedIndex == 1) {
                    this.search_person = '/ancient_books/get_person_list_by_name.action';
                    this.noumenon_number_e = 1;
                }
                else if (types[this.index_e].selectedIndex == 2) {
                    this.search_person = '/ancient_books/get_institution_list_by_name.action';
                    this.noumenon_number_e = 6;
                }
            },

            change_type_i() {
                var types = document.getElementsByClassName("ry-i-type");
                if (types[this.index_i].selectedIndex == 0) {
                    this.search_person = '';
                    this.noumenon_number_i = 0;
                }
                else if (types[this.index_i].selectedIndex == 1) {
                    this.search_person = '/ancient_books/get_person_list_by_name.action';
                    this.noumenon_number_i = 1;
                }
                else if (types[this.index_i].selectedIndex == 2) {
                    this.search_person = '/ancient_books/get_institution_list_by_name.action';
                    this.noumenon_number_i = 6;
                }
            },

            change_type_c() {
                var types = document.getElementsByClassName("ry-c-type");
                if (types[this.index_c].selectedIndex == 0) {
                    this.search_person = '';
                    this.noumenon_number_c = 0;
                }
                else if (types[this.index_c].selectedIndex == 1) {
                    this.search_person = '/ancient_books/get_person_list_by_name.action';
                    this.noumenon_number_c = 1;
                }
                else if (types[this.index_c].selectedIndex == 2) {
                    this.search_person = '/ancient_books/get_institution_list_by_name.action';
                    this.noumenon_number_c = 6;
                }
            },


            /**
             * 设置默认首选项
             */
            default_selections_variety() {
                var type_save = document.getElementById("ry-type-save");
                type_save.selectedIndex = this.first_layer_info.type_save - 1;
                var type_level = document.getElementById("ry-type-level");
                type_level.selectedIndex = this.first_layer_info.type_level - 1;
                var bu = document.getElementById("ry-select-b");
                bu.selectedIndex = this.first_layer_info.type_bu - 1;
                var lei = document.getElementById("ry-select-l");
                lei.selectedIndex = this.first_layer_info.type_lei - 1;
                var shu = document.getElementById("ry-select-s");
                shu.selectedIndex = this.first_layer_info.type_shu - 1;

                var vm = this;
                var types = document.getElementsByClassName("ry-v-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = vm.first_layer_info.responsibility_infos[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-v-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = vm.first_layer_info.responsibility_infos[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-v-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = vm.first_layer_info.responsibility_infos[j].confirm - 1;
                }
            },

            default_selections_edition() {
                var e_type = document.getElementById("ry-e-edition-type");
                e_type.selectedIndex = this.three_layers_info.version_type - 1;
                var age = document.getElementById("ry-e-age");
                age.selectedIndex = this.three_layers_info.version_age - 1;
                var support = document.getElementById("ry-e-support");
                support.selectedIndex = this.three_layers_info.version_support - 1;
                var binding = document.getElementById("ry-e-binding");
                binding.selectedIndex = this.three_layers_info.version_binding - 1;
                var fish = document.getElementById("ry-e-fish");
                fish.selectedIndex = this.three_layers_info.version_yuwei - 1;
                var side = document.getElementById("ry-e-side");
                side.selectedIndex = this.three_layers_info.version_bianlan - 1;
                var divide = document.getElementById("ry-e-divide");
                divide.selectedIndex = this.three_layers_info.version_fenlan - 1;
                var book = document.getElementById("ry-e-book");
                book.selectedIndex = this.three_layers_info.version_shukou - 1;
                var comment = document.getElementById("ry-e-comment");
                comment.selectedIndex = this.three_layers_info.version_youwujiazhu - 1;

                var vm = this;
                var types = document.getElementsByClassName("ry-e-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = vm.edition_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-e-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = vm.edition_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-e-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = vm.edition_responsibility[j].confirm - 1;
                }
            },

            default_selections_impression() {
                var print = document.getElementById("ry-i-print");
                print.selectedIndex =this.three_layers_info.printing_type - 1;

                var vm = this;
                var types = document.getElementsByClassName("ry-i-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = vm.impression_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-i-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = vm.impression_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-i-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = vm.impression_responsibility[j].confirm - 1;
                }
            },

            default_selections_copy() {
                var complete = document.getElementById("ry-c-complete");
                complete.selectedIndex = this.three_layers_info.duplicate_complete - 1;
                var level = document.getElementById("ry-c-level");
                level.selectedIndex = this.three_layers_info.duplicate_level - 1;

                var vm = this;
                var types = document.getElementsByClassName("ry-c-type");
                for (var i = 0; i < types.length; i ++) {
                    types[i].selectedIndex = vm.copy_responsibility[i].type - 1;
                }

                var actions = document.getElementsByClassName("ry-c-action");
                for (var k = 0; k < actions.length; k ++) {
                    actions[k].selectedIndex = vm.copy_responsibility[k].action - 1;
                }

                var confirms = document.getElementsByClassName("ry-c-confirm");
                for (var j = 0; j < confirms.length; j ++) {
                    confirms[j].selectedIndex = vm.copy_responsibility[j].confirm - 1;
                }
            },


            /**
             * 3层责任者信息分类
             */
            edition_responsibility_info() {
                var vm = this;
                for (var i = 0; i < this.three_layers_info.responsibility_infos.length; i++) {
                    if (this.three_layers_info.responsibility_infos[i].level == 2) {
                        vm.edition_responsibility.push(this.three_layers_info.responsibility_infos[i])
                    }
                }
            },

            impression_responsibility_info() {
                var vm = this;
                for (var i = 0; i < this.three_layers_info.responsibility_infos.length; i++) {
                    if (this.three_layers_info.responsibility_infos[i].level == 3) {
                        vm.impression_responsibility.push(this.three_layers_info.responsibility_infos[i])
                    }
                }
            },

            copy_responsibility_info() {
                var vm = this;
                for (var i = 0; i < this.three_layers_info.responsibility_infos.length; i++) {
                    if (this.three_layers_info.responsibility_infos[i].level == 4) {
                        vm.copy_responsibility.push(this.three_layers_info.responsibility_infos[i])
                    }
                }
            },


            /**
             * 获得4层责任者信息本地数组
             */
            create_vresponsibility_info() {
                var vm = this;

                var length1 = vm.first_layer_info.responsibility_infos.length;
                for (var i = 0; i < length1 - 1; i++) {
                    vm.variety_item[i].order = vm.first_layer_info.responsibility_infos[i].order;
                    vm.variety_item[i].location_id = vm.first_layer_info.responsibility_infos[i].location_id;
                    vm.variety_item[i].location_name = vm.first_layer_info.responsibility_infos[i].location_name;
                    vm.variety_item[i].name_id = vm.first_layer_info.responsibility_infos[i].name_id;
                    vm.variety_item[i].name_name = vm.first_layer_info.responsibility_infos[i].name_name;
                    vm.variety_item[i].begin_time_id = vm.first_layer_info.responsibility_infos[i].begin_time_id;
                    vm.variety_item[i].begin_time_name = vm.first_layer_info.responsibility_infos[i].begin_time_name;
                    vm.variety_item[i].end_time_id = vm.first_layer_info.responsibility_infos[i].end_time_id;
                    vm.variety_item[i].end_time_name = vm.first_layer_info.responsibility_infos[i].end_time_name;
                    vm.variety_item[i].explain = vm.first_layer_info.responsibility_infos[i].explain;
                    vm.variety_item[i].action = document.getElementsByClassName("ry-v-action")[i].selectedIndex;
                    vm.variety_item[i].confirm = document.getElementsByClassName("ry-v-confirm")[i].selectedIndex;
                    vm.variety_item[i].type = document.getElementsByClassName("ry-v-type")[i].selectedIndex;
                    vm.variety_item[i].value_add = false;
                    vm.variety_item[i].value_del = false;
                }
                vm.variety_item[length1 - 1].order = vm.first_layer_info.responsibility_infos[length1 - 1].order;
                vm.variety_item[length1 - 1].location_id = vm.first_layer_info.responsibility_infos[length1 - 1].location_id;
                vm.variety_item[length1 - 1].location_name = vm.first_layer_info.responsibility_infos[length1 - 1].location_name;
                vm.variety_item[length1 - 1].name_id = vm.first_layer_info.responsibility_infos[length1 - 1].name_id;
                vm.variety_item[length1 - 1].name_name = vm.first_layer_info.responsibility_infos[length1 - 1].name_name;
                vm.variety_item[length1 - 1].begin_time_id = vm.first_layer_info.responsibility_infos[length1 - 1].begin_time_id;
                vm.variety_item[length1 - 1].begin_time_name = vm.first_layer_info.responsibility_infos[length1 - 1].begin_time_name;
                vm.variety_item[length1 - 1].end_time_id = vm.first_layer_info.responsibility_infos[length1 - 1].end_time_id;
                vm.variety_item[length1 - 1].end_time_name = vm.first_layer_info.responsibility_infos[length1 - 1].end_time_name;
                vm.variety_item[length1 - 1].explain = vm.first_layer_info.responsibility_infos[length1 - 1].explain;
                vm.variety_item[length1 - 1].action = document.getElementsByClassName("ry-v-action")[length1 - 1].selectedIndex;
                vm.variety_item[length1 - 1].confirm = document.getElementsByClassName("ry-v-confirm")[length1 - 1].selectedIndex;
                vm.variety_item[length1 - 1].type = document.getElementsByClassName("ry-v-type")[length1 - 1].selectedIndex;
                vm.variety_item[length1 - 1].value_add = true;
                vm.variety_item[length1 - 1].value_del = true;
            },

            create_3responsibility_info() {
                var vm = this;

                var length2 = vm.edition_responsibility.length;
                for (var j = 0; j < length2 - 1; j++) {
                    vm.edition_item[j].order = vm.edition_responsibility[j].order;
                    vm.edition_item[j].location_name = vm.edition_responsibility[j].location_name;
                    vm.edition_item[j].name_name = vm.edition_responsibility[j].name_name;
                    vm.edition_item[j].begin_time_name = vm.edition_responsibility[j].begin_time_name;
                    vm.edition_item[j].end_time_name = vm.edition_responsibility[j].end_time_name;
                    vm.edition_item[j].explain = vm.edition_responsibility[j].explain;
                    vm.edition_item[j].value_add = false;
                    vm.edition_item[j].value_del = false;
                }
                vm.edition_item[length2 - 1].location_name = vm.edition_responsibility[length2 - 1].location_name;
                vm.edition_item[length2 - 1].name_name = vm.edition_responsibility[length2 - 1].name_name;
                vm.edition_item[length2 - 1].begin_time_name = vm.edition_responsibility[length2 - 1].begin_time_name;
                vm.edition_item[length2 - 1].end_time_name = vm.edition_responsibility[length2 - 1].end_time_name;
                vm.edition_item[length2 - 1].explain = vm.edition_responsibility[length2 - 1].explain;
                vm.edition_item[length2 - 1].value_add = true;
                vm.edition_item[length2 - 1].value_del = true;

                var length3 = vm.impression_responsibility.length;
                for (var k = 0; k < length3 - 1; k++) {
                    vm.impression_item[k].order = vm.impression_responsibility[k].order;
                    vm.impression_item[k].location_name = vm.impression_responsibility[k].location_name;
                    vm.impression_item[k].name_name = vm.impression_responsibility[k].name_name;
                    vm.impression_item[k].begin_time_name = vm.impression_responsibility[k].begin_time_name;
                    vm.impression_item[k].end_time_name = vm.impression_responsibility[k].end_time_name;
                    vm.impression_item[k].explain = vm.impression_responsibility[k].explain;
                    vm.impression_item[k].value_add = false;
                    vm.impression_item[k].value_del = false;
                }
                vm.impression_item[length3 - 1].location_name = vm.impression_responsibility[length3 - 1].location_name;
                vm.impression_item[length3 - 1].name_name = vm.impression_responsibility[length3 - 1].name_name;
                vm.impression_item[length3 - 1].begin_time_name = vm.impression_responsibility[length3 - 1].begin_time_name;
                vm.impression_item[length3 - 1].end_time_name = vm.impression_responsibility[length3 - 1].end_time_name;
                vm.impression_item[length3 - 1].explain = vm.impression_responsibility[length3 - 1].explain;
                vm.impression_item[length3 - 1].value_add = true;
                vm.impression_item[length3 - 1].value_del = true;

                var length4 = vm.copy_responsibility.length;
                for (var m = 0; m < length4 - 1; m++) {
                    vm.copy_item[m].order = vm.copy_responsibility[m].order;
                    vm.copy_item[m].location_name = vm.copy_responsibility[m].location_name;
                    vm.copy_item[m].name_name = vm.copy_responsibility[m].name_name;
                    vm.copy_item[m].begin_time_name = vm.copy_responsibility[m].begin_time_name;
                    vm.copy_item[m].end_time_name = vm.copy_responsibility[m].end_time_name;
                    vm.copy_item[m].explain = vm.copy_responsibility[m].explain;
                    vm.copy_item[m].value_add = false;
                    vm.copy_item[m].value_del = false;
                }
                vm.copy_item[length4 - 1].location_name = vm.copy_responsibility[length4 - 1].location_name;
                vm.copy_item[length4 - 1].name_name = vm.copy_responsibility[length4 - 1].name_name;
                vm.copy_item[length4 - 1].begin_time_name = vm.copy_responsibility[length4 - 1].begin_time_name;
                vm.copy_item[length4 - 1].end_time_name = vm.copy_responsibility[length4 - 1].end_time_name;
                vm.copy_item[length4 - 1].explain = vm.copy_responsibility[length4 - 1].explain;
                vm.copy_item[length4 - 1].value_add = true;
                vm.copy_item[length4 - 1].value_del = true;
            },


            /**
             * 获得责任数组指数
             */
            get_index_v() {
                var divs = document.getElementsByClassName("form-variety");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index_v = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },

            get_index_e() {
                var divs = document.getElementsByClassName("form-edition");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index_e = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },

            get_index_i() {
                var divs = document.getElementsByClassName("form-impression");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index_i = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },

            get_index_c() {
                var divs = document.getElementsByClassName("form-copy");
                for (var i = 0; i < divs.length; i++) {
                    divs[i].setAttribute("data-i", i);
                }
                this.index_c = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-i");
            },


            /**
             * 添加责任信息
             */
            add_new_box_v(p) {
                this.variety_item[p].value_add = false;
                this.variety_item[p].value_del = false;
                this.variety_item.push({
                    value_add : true,
                    value_del : true,
                    location_name : '',
                    name_name : '',
                    begin_time : '',
                    end_time : '',
                    explain : '',
                });
            },

            add_new_box_e(p) {
                this.edition_item[p].value_add = false;
                this.edition_item[p].value_del = false;
                this.edition_item.push({
                    value_add : true,
                    value_del : true,
                    location_name : '',
                    name_name : '',
                    begin_time : '',
                    end_time : '',
                    explain : '',
                });
            },

            add_new_box_i(p) {
                this.impression_item[p].value_add = false;
                this.impression_item[p].value_del = false;
                this.impression_item.push({
                    value_add : true,
                    value_del : true,
                    location_name : '',
                    name_name : '',
                    begin_time : '',
                    end_time : '',
                    explain : '',
                });
            },

            add_new_box_c(p) {
                this.copy_item[p].value_add = false;
                this.copy_item[p].value_del = false;
                this.copy_item.push({
                    value_add : true,
                    value_del : true,
                    location_name : '',
                    name_name : '',
                    begin_time : '',
                    end_time : '',
                    explain : '',
                });
            },



            /**
             * 删除责任信息
             */
            del_new_box_v(p) {
                if (p == 1) {
                    this.variety_item[p-1].value_add = true;
                    this.variety_item[p-1].value_del = false;
                }
                else{
                    this.variety_item[p-1].value_add = true;
                    this.variety_item[p-1].value_del = true;
                }
                this.variety_item.pop();
            },

            del_new_box_e(p) {
                if (p == 1) {
                    this.edition_item[p-1].value_add = true;
                    this.edition_item[p-1].value_del = false;
                }
                else{
                    this.edition_item[p-1].value_add = true;
                    this.edition_item[p-1].value_del = true;
                }
                this.edition_item.pop();
            },

            del_new_box_i(p) {
                if (p == 1) {
                    this.impression_item[p-1].value_add = true;
                    this.impression_item[p-1].value_del = false;
                }
                else{
                    this.impression_item[p-1].value_add = true;
                    this.impression_item[p-1].value_del = true;
                }
                this.impression_item.pop();
            },

            del_new_box_c(p) {
                if (p == 1) {
                    this.copy_item[p-1].value_add = true;
                    this.copy_item[p-1].value_del = false;
                }
                else{
                    this.copy_item[p-1].value_add = true;
                    this.copy_item[p-1].value_del = true;
                }
                this.copy_item.pop();
            },


            /**
             * 责任开始时间
             */
            //品种层
            open_birth_v() {
                this.get_index_v();
                this.time_modal_v1 = true;
            },

            birth_time_v(p) {
                this.variety_item[this.index_v].begin_time_id = p.time_id;
                this.variety_item[this.index_v].begin_time_name = p.standard_name;
                this.close_birth_v();
            },

            close_birth_v() {
                this.time_modal_v1 = false;
            },

            //版本层
            open_birth_e() {
                this.get_index_e();
                this.time_modal_e1 = true;
            },

            birth_time_e(p) {
                this.edition_item[this.index_e].begin_time_id = p.time_id;
                this.edition_item[this.index_e].begin_time_name = p.standard_name;
                this.close_birth_e();
            },

            close_birth_e() {
                this.time_modal_e1 = false;
            },

            //印次层
            open_birth_i() {
                this.get_index_i();
                this.time_modal_i1 = true;
            },

            birth_time_i(p) {
                this.impression_item[this.index_i].begin_time_id = p.time_id;
                this.impression_item[this.index_i].begin_time_name = p.standard_name;
                this.close_birth_i();
            },

            close_birth_i() {
                this.time_modal_i1 = false;
            },

            //复本层
            open_birth_c() {
                this.get_index_c();
                this.time_modal_c1 = true;
            },

            birth_time_c(p) {
                this.copy_item[this.index_c].begin_time_id = p.time_id;
                this.copy_item[this.index_c].begin_time_name = p.standard_name;
                this.close_birth_c();
            },

            close_birth_c() {
                this.time_modal_c1 = false;
            },


            /**
             * 责任结束时间
             */
            //品种层
            open_dead_v() {
                this.get_index_v();
                this.time_modal_v2 = true;
            },

            dead_time_v(q) {
                this.variety_item[this.index_v].end_time_id = q.time_id;
                this.variety_item[this.index_v].end_time_name = q.standard_name;
                this.close_dead_v();
            },

            close_dead_v() {
                this.time_modal_v2 = false;
            },

            //版本层
            open_dead_e() {
                this.get_index_e();
                this.time_modal_e2 = true;
            },

            dead_time_e(q) {
                this.edition_item[this.index_e].end_time_id = q.time_id;
                this.edition_item[this.index_e].end_time_name = q.standard_name;
                this.close_dead_e();
            },

            close_dead_e() {
                this.time_modal_e2 = false;
            },

            //印次层
            open_dead_i() {
                this.get_index_i();
                this.time_modal_i2 = true;
            },

            dead_time_i(q) {
                this.impression_item[this.index_i].end_time_id = q.time_id;
                this.impression_item[this.index_i].end_time_name = q.standard_name;
                this.close_dead_i();
            },

            close_dead_i() {
                this.time_modal_i2 = false;
            },

            //复本层
            open_dead_c() {
                this.get_index_c();
                this.time_modal_c2 = true;
            },

            dead_time_c(q) {
                this.copy_item[this.index_c].end_time_id = q.time_id;
                this.copy_item[this.index_c].end_time_name = q.standard_name;
                this.close_dead_c();
            },

            close_dead_c() {
                this.time_modal_c2 = false;
            },


            /**
             * 责任地点
             */
            //品种层
            open_location_v() {
                this.get_index_v();
                this.location_modal_v = true;
            },

            add_location_v(p) {
                this.variety_item[this.index_v].location_id = p.noumenon_id;
                this.variety_item[this.index_v].location_name = p.standard_name;
            },

            close_location_v(){
                this.location_modal_v = false;
            },

            //版本层
            open_location_e() {
                this.get_index_e();
                this.location_modal_e = true;
            },

            add_location_e(p) {
                this.edition_item[this.index_e].location_id = p.noumenon_id;
                this.edition_item[this.index_e].location_name = p.standard_name;
            },

            close_location_e(){
                this.location_modal_e = false;
            },

            //印次层
            open_location_i() {
                this.get_index_i();
                this.location_modal_i = true;
            },

            add_location_i(p) {
                this.impression_item[this.index_i].location_id = p.noumenon_id;
                this.impression_item[this.index_i].location_name = p.standard_name;
            },

            close_location_i(){
                this.location_modal_i = false;
            },

            //复本层
            open_location_c() {
                this.get_index_c();
                this.location_modal_c = true;
            },

            add_location_c(p) {
                this.copy_item[this.index_c].location_id = p.noumenon_id;
                this.copy_item[this.index_c].location_name = p.standard_name;
            },

            close_location_c(){
                this.location_modal_c = false;
            },


            /**
             * 责任者名称
             */
            //品种层
            open_character_v(){
                this.get_index_v();
                this.character_modal_v = true;
            },

            add_character_v(p){
                this.variety_item[this.index_v].name_id = p.noumenon_id;
                this.variety_item[this.index_v].name_name = p.standard_name;
            },

            close_character_v(){
                this.character_modal_v = false;
            },

            //版本层
            open_character_e(){
                this.get_index_e();
                this.character_modal_e = true;
            },

            add_character_e(p){
                this.edition_item[this.index_e].name_id = p.noumenon_id;
                this.edition_item[this.index_e].name_name = p.standard_name;
            },

            close_character_e(){
                this.character_modal_e = false;
            },

            //印次层
            open_character_i(){
                this.get_index_i();
                this.character_modal_i = true;
            },

            add_character_i(p){
                this.impression_item[this.index_i].name_id = p.noumenon_id;
                this.impression_item[this.index_i].name_name = p.standard_name;
            },

            close_character_i(){
                this.character_modal_i = false;
            },

            //复本层
            open_character_c(){
                this.get_index_c();
                this.character_modal_c = true;
            },

            add_character_c(p){
                this.copy_item[this.index_c].name_id = p.noumenon_id;
                this.copy_item[this.index_c].name_name = p.standard_name;
            },

            close_character_c(){
                this.character_modal_c = false;
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
                    variety.className = "layer-input";
                    edition.className = "layer-input";
                    impression.className = "layer-input div-now";
                    copy.className = "layer-input";
                };
                copy_head.onclick = function () {
                    variety.className = "layer-input";
                    edition.className = "layer-input";
                    impression.className = "layer-input";
                    copy.className = "layer-input div-now";
                }
            },


            /**
             * 确定修改
             */
            confirm_modify() {
                var delet_responsibility_infos = [];
                var add_responsibility_infos = [];
                for (var i = 0; i < this.literature_info.responsibility_infos.length; i++) {
                    delet_responsibility_infos.push(this.first_layer_info.responsibility_infos[i].responsibility_info_id)
                }
                for (var j = 0; j < this.literature_info.responsibility_infos.length; j++) {
                    delet_responsibility_infos.push(this.three_layers_info.responsibility_infos[j].responsibility_info_id)
                }
                for (var k = 0; k < this.variety_item.length; k++) {
                    add_responsibility_infos.push(this.variety_item[k])
                }
                for (var m = 0; m < this.edition_item.length; m++) {
                    add_responsibility_infos.push(this.edition_item[m])
                }
                for (var n = 0; n < this.impression_item.length; n++) {
                    add_responsibility_infos.push(this.impression_item[n])
                }
                for (var o = 0; o < this.copy_item.length; o++) {
                    add_responsibility_infos.push(this.copy_item[o])
                }

                var obj = {};
                obj.literature_id = this.book_all_info.literature_id;
                obj.english = this.first_layer_info.english;
                obj.type_name = this.first_layer_info.type_name;
                obj.type_other_name = this.first_layer_info.type_other_name;
                obj.type_save = this.first_layer_info.type_save;
                obj.type_level = this.first_layer_info.type_level;
                obj.type_bu = this.first_layer_info.type_bu;
                obj.type_lei = this.first_layer_info.type_lei;
                obj.type_shu = this.first_layer_info.type_shu;
                obj.type_summary = this.first_layer_info.type_summary;
                obj.literature_standard_name = this.first_layer_info.literature_standard_name;

                obj.ancient_book_info_id = this.book_all_info.ancient_book_info_id;
                obj.version_volume = parseInt(this.three_layers_info.version_volume);
                obj.version_type = this.three_layers_info.version_type;
                obj.version_age = this.three_layers_info.version_age;
                obj.version_support = this.three_layers_info.version_support;
                obj.version_binding = this.three_layers_info.version_binding;
                obj.version_frame_length = parseInt(this.three_layers_info.version_frame_length);
                obj.version_frame_width = parseInt(this.three_layers_info.version_frame_width);
                obj.version_format_length = parseInt(this.three_layers_info.version_format_length);
                obj.version_format_width = parseInt(this.three_layers_info.version_format_width);
                obj.version_paiji_content = this.three_layers_info.version_paiji_content;
                obj.version_paiji_location = this.three_layers_info.version_paiji_location;
                obj.version_half_page_line_number = parseInt(this.three_layers_info.version_half_page_line_number);
                obj.version_page_line_number = parseInt(this.three_layers_info.version_page_line_number);
                obj.version_yuwei = this.three_layers_info.version_yuwei;
                obj.version_double_page_number = parseInt(this.three_layers_info.version_double_page_number);
                obj.version_bianlan = this.three_layers_info.version_bianlan;
                obj.version_fenlan = this.three_layers_info.version_fenlan;
                obj.version_shukou = this.three_layers_info.version_shukou;
                obj.version_banxin_content = this.three_layers_info.version_banxin_content;
                obj.version_youshuwuer = this.three_layers_info.version_youshuwuer;
                obj.version_youwujiazhu = this.three_layers_info.version_youwujiazhu;
                obj.printing_type = this.three_layers_info.printing_type;
                obj.printing_number = this.three_layers_info.printing_number;
                obj.duplicate_book_count = parseInt(this.three_layers_info.duplicate_book_count);
                obj.duplicate_level = this.three_layers_info.duplicate_level;
                obj.duplicate_complete = this.three_layers_info.duplicate_complete;
                obj.duplicate_attachment = this.three_layers_info.duplicate_attachment;

                obj.ancient_book_id = this.ancient_book_id;
                obj.name = this.first_layer_info.type_name;
                obj.standard_name = this.first_layer_info.standard_name;
                obj.pri = this.upload_one_info.pri;
                obj.summary = this.book_all_info.summary;

                obj.delet_responsibility_infos = delet_responsibility_infos;

                for (var p = 0; p < add_responsibility_infos.length; p++) {
                    obj.add_responsibility_infos.push({
                        order : add_responsibility_infos[p].order,
                        location_id : add_responsibility_infos[p].location_id,
                        person_id : add_responsibility_infos[p].person_id,
                        begin_time : add_responsibility_infos[p].begin_time,
                        end_time : add_responsibility_infos[p].end_time,
                        action : add_responsibility_infos[p].action,
                        explain : add_responsibility_infos[p].explain,
                        confirm : add_responsibility_infos[p].confirm,
                        type : add_responsibility_infos[p].type,
                        level : add_responsibility_infos[p].level
                    })
                }
                obj.add_responsibility_infos = add_responsibility_infos;
                this.before_http(obj);
                this.http_json('/ancient_books/modify_ancient_book_all_info_with_literature.action' , 'post' , obj , this.success_post_add , this.fail_post_add);
            },

            success_post_edit(response) {
                if (response.body.result === 1) {
                    console.log ("修改古籍成功!");
                    window.location.reload();   //  重新加载
                }
                else if (response.body.result === 0) {
                    console.log ("修改古籍失败");
                }
            },

            fail_post_edit() {
                console.log("修改古籍请求发送失败");
            },


            /**
             * 下一步
             */
            next_page() {
                if (this.first_layer_info.type_name == '') {
                    alert("请填写书名");
                }
                else if (this.first_layer_info.responsibility_infos[0].begin_time_name == '') {
                    alert("请填写品种层责任开始时间");
                }
                else if (this.first_layer_info.responsibility_infos[0].end_time_name == '') {
                    alert("请填写品种层责任结束时间");
                }
                else if (this.first_layer_info.responsibility_infos[0].name_name == '') {
                    alert("请填写品种层责任者名称");
                }
                else if (this.edition_item[0].begin_time_name == '') {
                    alert("请填写版本层责任开始时间");
                }
                else if (this.edition_item[0].end_time_name == '') {
                    alert("请填写版本层责任结束时间");
                }
                else if (this.edition_item[0].name_name == '') {
                    alert("请填写版本层责任者名称");
                }
                else if (this.impression_item[0].begin_time_name == '') {
                    alert("请填写印次层责任开始时间");
                }
                else if (this.impression_item[0].end_time_name == '') {
                    alert("请填写印次层责任结束时间");
                }
                else if (this.impression_item[0].name_name == '') {
                    alert("请填写印次层责任者名称");
                }
                else if (this.copy_item.copy_responsibility[0].begin_time_name == '') {
                    alert("请填写复本层责任开始时间");
                }
                else if (this.copy_item.copy_responsibility[0].end_time_name == '') {
                    alert("请填写复本层责任结束时间");
                }
                else if (this.copy_item.copy_responsibility[0].name_name == '') {
                    alert("请填写复本层责任者名称");
                }
                else{
                    this.confirm_modify();
                    this.$router.push({path: '/user/modify2'});
                }
            },


            cancel_upload() {
                this.$router.push({path: '/user'});
            }
        }
    }
</script>

<style>
    .ry-btn-keep-modify{
        color: white;
        margin-left: 50px;
        width: 142px;
        height: 47px;
        background-image: url("../../../../assets/img/button/build-button.png");
    }
</style>

