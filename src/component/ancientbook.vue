<template>
    <div class="ry-ancient-book">

        <!--目录-->
        <div class="width1000 center">
            <p>經部/總類/<span style="color: red">石經之屬</span>/<span style="color: red">詩經</span>/冊1冊名/卷1</p>
            <img src="../assets/img/墨水线上.png" height="7" width="974"/>
        </div>

        <!--按鈕欄-->
        <div class="width1000 center">
            <button class="float-right next-one">下一處</button>
            <button class="float-right last-one">上一處</button>
            <input type="text" class="ry-search" placeholder="請輸入關鍵字">
        </div>

        <!--图文-->
        <div class="width1000 center">

            <!--文本工作台-->
            <div id="workspace-text" class="float-right">

                <!--文本工作台3个版本导航按钮-->
                <div id="workspace-text-head">
                    <ul class="ry-module-bar float-right">
                        <!--class值为空表示未激活板块，class值为li-now表示激活板块-->
                        <li id="mark-head">本體標記</li>
                        <img style="display: block" class="float-right" src="../assets/img/本体标记/屏风按钮间隔.png" height="31" width="6"/>
                        <li id="comment-head">批註版</li>
                        <img style="display: block" class="float-right" src="../assets/img/本体标记/屏风按钮间隔.png" height="31" width="6"/>
                        <li id="edit-head" class="li-now">修訂版</li>
                    </ul>
                </div>

                <!--文本工作台主体-->
                <div id="workspace-text-body">

                    <!--class值为div表示未激活板块，class值为div-now表示激活板块-->

                    <!--本体标记版块-->
                    <div id="mark" class="div">
                        <!--文本标题-->
                        <h4>詩經卷一</h4>
                        <!--文本主体-->
                        <p class="body-text" id="text-mark" @click="text_mark_onclick()"></p>
                        <!--本体种类选择菜单-->
                        <select id="ry-select-mark-type" class="ry-select" @click="select_noumenon_type()">
                            <option>全部</option>
                            <option>人物</option>
                            <option>地點</option>
                            <option>職官</option>
                            <option>時間</option>
                            <option>機構</option>
                            <option>術語</option>
                            <option>文獻</option>
                        </select>
                        <!--标记本体按钮，选中文本后激活显示，点击弹出标记本体模态框-->
                        <button class="ry-btn-cancel-add-comment" data-toggle="modal" data-target="#layer-mark-noumenon" id="btn-mark-noumenon" style="visibility: hidden" @click="btn_mark_noumenon_onclick()">標記本體</button>
                    </div>

                    <!--批注版块-->
                    <div id="comment" class="div">
                        <!--文本标题-->
                        <h4>詩經卷一</h4>
                        <!--文本主体-->
                        <div class="body-text" id="text-comment" @click="text_comment_onclick()"></div>
                        <!--添加批注按钮，选中文本后激活显示，点击弹出添加批注模态框-->
                        <button class="ry-btn-cancel-add-comment" id="btn-add-comment" style="visibility: hidden" @click="btn_add_comment_onclick()">添加批註</button>
                    </div>

                    <!--修订板块-->
                    <div id="edit" class="div div-now">
                        <!--文本标题-->
                        <h4>詩經卷一</h4>
                        <!--文本主体-->
                        <div class="body-text">蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。</div>
                        <br>
                        <br>
                        <br>
                        <!--查看修订记录-->
                        <button class="ry-btn-edit-record" data-toggle="modal" data-target="#layer-edit-record" id="btn-edit-record" @click="edit_record_onclick()">修訂記錄</button>
                        <button class="ry-btn-edit" id="btn-edit" @click="btn_edit_onclick()">修訂</button>
                    </div>
                </div>

                <!--修订记录模态框-->
                <div>
                    <modal :show_modal.sync = "edit_record_modal" @fireclose = "edit_record_modal = false" class="ry-modal-border">
                        <div class="width600 dialog-body" slot="body">
                            <h4 style="text-align: center">修訂記錄</h4>
                            <div v-for="item in commit_edit_record">
                                <p>修訂者：{{item.username_edit_record}}</p>
                                <p>修訂時間：{{item.time_edit_record}}</p>
                                <p>修訂信息：{{item.commit_edit_record}}</p>
                                <p>修訂版本：{{item.version_edit_record}}</p>
                                <hr>
                            </div>
                            <button class="ry-btn-confirm-edit-record-modal" @click="close_edit_record_modal()">確定</button>
                        </div>
                    </modal>
                </div>

                <!--修订模态框-->
                <div>
                    <modal :show_modal.sync = "edit_modal" @fireclose = "edit_modal = false" class="ry-modal-border">
                        <div class="width600 dialog-body" slot="body">
                            <h4 class="modal-title" style="text-align: center">修訂</h4>
                            <div id="text-edit" class="body-text" contentEditable="true"></div>
                            <br>
                            <br>
                            <br>
                            <img src="../assets/img/上传1/中间墨线.png" height="6" width="600"/>
                            <!--修订信息编辑框标题-->
                            <h5>修訂信息:</h5>
                            <!--修订信息编辑框-->
                            <div id="textarea-editInfo" contentEditable="true" style="height: 100px"></div>
                            <button class="ry-btn-confirm-edit-record-modal" @click="btn_confirm_edit_onclick()">確定</button>
                        </div>
                    </modal>
                </div>

                <!--添加批注模态框-->
                <div>
                    <modal :show_modal.sync = "add_comment_modal" @fireclose = "add_comment_modal = false" class="ry-modal-border">
                        <div class="dialog-body" slot="body">
                            <span>選中內容：{{target_add_comment}}</span>
                            <p>添加批註：</p>
                            <textarea id="textarea-addComment"></textarea>
                            <div class="ry-modal-add-comment-box">
                                <input id="check-private" type="checkbox" value="選為私密">選為私密
                                <button class="ry-btn-cancel-add-comment" data-dismiss="modal" @click="btn_cancel_add_comment_onclick()">取消</button>
                                <button class="ry-btn-confirm-add-comment" data-dismiss="modal" @click="btn_confirm_add_comment_onclick()">確定</button>
                            </div>
                        </div>
                    </modal>
                </div>

                <!--查看批注模态框-->
                <div>
                    <modal :show_modal.sync = "get_comment_modal" @fireclose = "get_comment_modal = false" class="ry-modal-border">
                        <div class="width400 dialog-body"  slot="body">
                            <span>【{{now_target}}】</span><span>{{now_content}}</span>
                            <div>
                                <button class="ry-btn-cancel-add-comment float-right">删除</button>
                            </div>
                        </div>
                    </modal>
                </div>

                <!--标记本体模态框-->
                <div>
                    <modal :show_modal.sync = "add_mark_modal" @fireclose = "add_mark_modal = false" class="ry-modal-border">
                        <div class="dialog-body" slot="body">
                            本體類型：
                            <select id="ry-noumenon-type-select" class="ry-type-select">
                                <option>人物</option>
                                <option>地點</option>
                                <option>職官</option>
                                <option>時間</option>
                                <option>機構</option>
                                <option>術語</option>
                                <option>文獻</option>
                            </select>
                            <input id="ry-noumenon-input" type="text" class="ry-input-search" placeholder="請輸入本體名查找"><button class="ry-btn-search-pic" @click="btn_search_noumenon_onclick()"></button>
                            <div class="ry-add-mark-modal-box"><h3 style="margin-top: 80px">請在搜索框中輸入本體規範名稱進行搜索</h3></div>
                            <button class="ry-btn-cancel-add-comment" style="margin-left: 330px;" @click="btn_add_mark_onclick()">創建本體</button>
                            <button class="ry-btn-cancel-add-comment" @click="close_add_mark_modal()">取消</button>
                        </div>
                    </modal>
                </div>


            </div>

            <!--图片工作台-->
            <div>
                <div class="float-right ry-hide-picture"><img src="../assets/img/本体标记/更多标.png" height="130" width="29"/></div>
                <img src="../assets/img/u2099.png"/>
            </div>
        </div>

        <!--目录模态框-->
        <div>
            <modal :show_modal.sync = "catalogue_modal" @fireclose = "catalogue_modal = false" class="ry-modal-border">
                <div class="dialog-body" slot="body">
                    <div>册1册名</div>
                    <div class="row">
                        <a class="col-md-2">
                            卷1
                        </a>
                        <a class="col-md-2">
                            卷2
                        </a>
                        <a class="col-md-2">
                            卷3
                        </a>
                        <a class="col-md-2">
                            卷4
                        </a>
                        <a class="col-md-2">
                            卷5
                        </a>
                        <a class="col-md-2">
                            卷6
                        </a>
                    </div>
                    <div class="row">
                        <a class="col-md-2">
                            卷7
                        </a>
                        <a class="col-md-2">
                            卷8
                        </a>
                    </div>
                    <div>册2册名</div>
                    <div class="row">
                        <a class="col-md-2">
                            卷1
                        </a>
                        <a class="col-md-2">
                            卷2
                        </a>
                        <a class="col-md-2">
                            卷3
                        </a>
                        <a class="col-md-2">
                            卷4
                        </a>
                        <a class="col-md-2">
                            卷5
                        </a>
                        <a class="col-md-2">
                            卷6
                        </a>
                    </div>
                </div>
            </modal>
        </div>

        <!--底按鈕欄-->
        <div class="width1000 center">
            <img src="../assets/img/本体标记/墨水线 下.png" height="4" width="974"/>
            <div class="ry-bottom-bar">
                <button class="float-right ry-btn-next-page">下一</button>
                <button class="float-right ry-btn-go">GO</button>
                <div class="float-right ry-page">
                    <input class="ry-input-page">
                    <span>/</span>
                    <span>12</span>
                </div>
                <button class="float-right ry-btn-last-page">上一</button>
                <button class="ry-btn-menu" @click="catalogue_onclick()">目錄</button>
            </div>
        </div>

    </div>
</template>



<script type="text/javascript">
    import modal from  '../component/modal.vue'
    export default{
        components:{
            modal,
        },

        data() {
            return{
                add_comment_modal : false,
                get_comment_modal : false,
                add_mark_modal : false,
                catalogue_modal : false,
                edit_record_modal : false,
                edit_modal : false,
                now_target : '',
                now_content : '',

                get_content_obj : {},
                content : '蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。',
                page_id : 1,

                get_comment_obj : {},
                comment : [{id_comment:"654654",target_comment:"露为霜。",begin_comment:6,end_comment:10,content_comment:"123123"},{id_comment:"321321",target_comment:"，在水一",begin_comment:14,end_comment:18,content_comment:"456456"}],
                id_comment : '',
                target_comment : '',
                begin_comment : '',
                end_comment : '',
                content_comment : '',

                get_mark_obj : {},
                mark : [{id_mark:"123123",target_mark:"，白露为",begin_mark:4,end_mark:8,noumenon_type:1},{id_mark:"456456",target_mark:"伊人，在",begin_mark:12,end_mark:16,noumenon_type:2}],
                id_mark : '',
                noumenon_type : '',
                noumennon_id : '',
                begin_mark : '',
                end_mark : '',
                target_mark : '',

                get_edit_record_obj : {},
                edit_record : [],
                username_edit_record : '',
                time_edit_record : '',
                version_edit_record : '',
                commit_edit_record : [],
                total_page_edit_record : '',

                edit_text_obj : {},
                commit_obj : {},

                update_cm_obj : {},

                add_comment_obj : {},

                add_mark_obj : {},

                marks_modify : [],
                comments_modify : [],
                marks_delete : [],
                comments_delete : [],

                target_add_comment : '',
                content_add_comment : '',
                begin_add_comment : '',
                end_add_comment : '',
                pri : 0,

                target_add_mark : '',
                begin_add_mark : '',
                end_add_mark : '',
                noumenon_type : '',
                noumenon_id : '',
                before : '',
                after : '',

                delete_mark_obj : {},
                mark_id : '',

                delete_comment_obj : {},
                comment_id : '',

                noumenon_search_obj : {},
                noumenon_search_content : '',
                noumenon_search_url : '',
                total_page_search_noumenon : 0,
                search_noumenon_content : [],


//                a : 0,  //  选区第一个节点位置
//                b : 0,  //  选区最后一个节点位置
//                //后端传回JSON
//
//                //文本内容
//                content : "蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。";
//                //标记
//                mark : [{id_mark:"123123",target_mark:"，白露为",begin_mark:4,end_mark:8},{id_mark:"456456",target_mark:"伊人，在",begin_mark:12,end_mark:16}];
//                //批注
//                comment : [{id_comment:"654654",target_comment:"露为霜。",begin_comment:6,end_comment:10},{id_comment:"321321",target_comment:"，在水一",begin_comment:14,end_comment:18}];
            }
        },

        created : function () {
            this.get_text();
            this.get_comment();
            this.get_mark();
        },

        mounted : function () {
            this.change_module();
            this.get_edit();
            this.renew_mark();
            this.renew_comment();
        },

        methods: {
            /**
             * 获取文本内容请求
             */
            get_text() {
                this.get_content_obj.key = "page_id";
                this.get_content_obj.value = this.page_id;
                this.http_json ('/ancient_books/get_text.action' , 'get' , this.get_content_obj , this.success_get_text , this.fail_get_text);
            },

            success_get_text (response) {
                console.log ("success get contents");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log("没有返回文本");
                }
                else {
                    this.content = response.body.content;
                }
            },

            fail_get_text() {
                console.log("fail get contents!");
            },


            /**
             * 获取一页批注信息请求
             */
            get_comment() {
                this.get_comment_obj.key = "page_id";
                this.get_comment_obj.value = this.page_id;
                this.http_json ('/ancient_books/get_comment_list_by_page_id.action' , 'get' , this.get_comment_obj , this.success_get_comment , this.fail_get_comment);
            },

            success_get_comment(response) {
                console.log("success get comments");
                //将后端数据显示在前端页面里
                if( response.body.length === 0) {
                    console.log("没有返回数组！");
                }
                else {
                    for (var i = 0; i <= response.body.length-1; i++) {
                        this.comment.push({
                            id_comment: response.body[i].id,
                            target_comment: response.body[i].target,
                            begin_comment: response.body[i].begin,
                            end_comment: response.body[i].end,
                            content_comment: response.body[i].content,
                        });
                    }
                }
            },

            fail_get_comment() {
                console.log("fail get comments!");
            },


            /**
             * 获取一页标记信息请求
             */
            get_mark() {
                this.get_mark_obj.key = "page_id";
                this.get_mark_obj.value = this.page_id;
                this.http_json ('/ancient_books/get_mark_list_by_page_id.action' , 'get' , this.get_mark_obj , this.success_get_mark , this.fail_get_mark);
            },

            success_get_mark(response) {
                console.log("success get marks ");
                //将后端数据显示在前端页面里
                if( response.body.content.length === 0) {
                    console.log("没有返回数组！");
                }
                else {
                    for (var i = 0; i <= response.body.length-1; i++) {
                        this.mark.push({
                            id_mark: response.body[i].id,
                            noumenon_type: response.body[i].noumenon_type,
                            noumenon_id: response.body[i].noumenon_id,
                            begin_mark: response.body[i].begin,
                            end_mark: response.body[i].end,
                            target_mark: response.body[i].target,
                        });
                    }
                }
            },

            fail_get_mark() {
                console.log("fail get marks!");
            },


            /**
             * 获得每页的修订记录列表
             */
            get_edit_record() {
                this.get_edit_record_obj.key = "page_id";
                this.get_edit_record_obj.value = this.page_id;
                this.http_json ('/ancient_books/get_ancient_book_modify_log_by_page.action' , 'get' , this.get_edit_record_obj , this.success_get_edit_record , this.fail_get_edit_record);
            },

            success_get_edit_record(response) {
                console.log ("success get edit records");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    this.total_page_edit_record = response.body.total_page;
                    for (var i = 0; i <= response.body.content.length-1; i++) {
                        this.edit_record.push({
                            username_edit_record: response.body.content[i].user_name,
                            time_edit_record: response.body.content[i].time,
                            version_edit_record: response.body.content[i].version,
                            commit_edit_record: response.body.content[i].commit,
                        });
                    }
                }
            },

            fail_get_edit_record() {
                console.log ("fail get edit records!");
            },


            /**
             * 修改古籍文本内容POST请求
             */
            get_noumenon_search() {
                this.noumenon_search_obj.name = this.noumenon_search_content;
                this.noumenon_search_obj.page_count = 1;
                this.http_json (this.noumenon_search_url , 'get' , this.noumenon_search_obj , this.success_get_noumenon_search , this.fail_get_noumenon_search);
            },

            success_get_noumenon_search() {
                console.log ("success get noumenon search ");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    this.total_page_search_noumenon = response.body.total_page;
                    for (var i = 0; i <= response.body.content.length-1; i++) {
                        this.search_noumenon_content.push({
                            standard_name: response.body.content[i].standard_name,
                            type_id: response.body.content[i].type_id,
                            noumenon_id: response.body.content[i].noumenon_id,
                        });
                    }
                }
            },

            fail_get_noumenon_search() {
                console.log ("fail get noumenon search!");
            },

            /**
             * 修改古籍文本内容POST请求
             */
            post_edit() {
                this.edit_text_obj.page_id = this.page_id;
                this.edit_text_obj.content = this.content;
                this.edit_text_obj.commit = this.commit;
                this.before_http(this.edit_text);
                this.http_json('/ancient_books/modify_page_content.action' , 'post' , this.edit_text_obj , this.success_post_edit,this.fail_post_edit);
            },

            success_post_edit(response) {
                if (response.body.result === 1) {
                    console.log ("success edit!");
                    window.location.reload();   //  重新加载
                }
                else if (response.body.result === 0) {
                    console.log ("fail edit");
                }
            },

            fail_post_edit() {
                console.log("fail edit!");
            },


            /**
             * 批量更新标记批注POST请求
             */
            post_update_cm() {
                this.get_mark_change();
                this.get_comment_change();
                this.get_mark_delete();
                this.get_comment_delete();
                this.update_cm_obj.comments_delete = this.comments_delete;
                this.update_cm_obj.comments_modify = this.comments_modify;
                this.update_cm_obj.marks_delete = this.marks_delete;
                this.update_cm_obj.marks_modify = this.marks_modify;
                this.before_http(this.update_cm);
                this.http_json('/ancient_books/update_marks_comment.action' , 'post' , this.update_cm_obj , this.success_update_cm , this.fail_update_cm);
            },

            success_update_cm(response) {
                if (response.body.result === 1) {
                    console.log("success update CM!");
                }
                else if (response.body.result === 0) {
                    console.log("fail update CM");
                }
            },

            fail_update_cm() {
                console.log("fail update CM!");
            },


            /**
             * 增加一个批注POST请求
             */
            post_add_comment() {
                this.add_comment_obj.page_id = this.page_id;
                this.add_comment_obj.target = this.target_add_comment;
                this.add_comment_obj.content = this.content_add_comment;
                this.add_comment_obj.begin = this.begin_add_comment;
                this.add_comment_obj.end = this.end_add_comment;
                this.add_comment_obj.pri = this.pri;
                this.before_http(this.add_comment_obj);
                this.http_json('/ancient_books/add_comment.action' , 'post' , this.add_comment_obj , this.success_add_comment , this.fail_add_comment);
            },

            success_add_comment(response) {
                if (response.body.result === 1) {
                    console.log("success add comment!");
                }
                else if (response.body.result === 0) {
                    console.log("fail add comment");
                }
            },

            fail_add_comment() {
                console.log("fail add comment!");
            },


            /**
             * 增加一个标记POST请求
             */
            post_add_mark() {
                this.add_mark_obj.page_id = this.page_id;
                this.add_mark_obj.target = this.target_add_mark;
                this.add_mark_obj.begin = this.begin_add_mark;
                this.add_mark_obj.end = this.end_add_mark;
                this.add_mark_obj.noumenon_type = this.noumenon_type;
                this.add_mark_obj.noumenon_id = this.noumenon_id;
                this.add_mark_obj.before = this.before;
                this.add_mark_obj.after = this.after;
                this.before_http(this.add_mark_obj);
                this.http_json('/ancient_books/add_mark.action' , 'post' , this.add_mark_obj , this.success_add_mark , this.fail_add_mark);
            },

            success_add_mark(response) {
                if (response.body.result === 1) {
                    console.log("success add mark!");
                }
                else if (response.body.result === 0) {
                    console.log("fail add mark");
                }
            },

            fail_add_mark() {
                console.log("fail add mark!");
            },


            /**
             * 通过标记id删除标记
             */
            post_delete_mark() {
                this.delete_mark_obj.mark_id = this.mark_id;
                this.before_http(this.delete_mark);
                this.http_json('/ancient_books/delete_mark.action' , 'post' , this.delete_mark_obj , this.success_delete_mark , this.fail_delete_mark);
            },

            success_delete_mark(response) {
                if (response.body.result === 1) {
                    console.log("success delete mark!");
                }
                else if (response.body.result === 0) {
                    console.log("fail delete mark");
                }
            },

            fail_delete_mark() {
                console.log("fail delete mark!");
            },


            /**
             * 通过批注id删除批注
             */
            post_delete_comment() {
                this.delete_comment_obj.comment_id = this.comment_id;
                this.before_http(this.delete_comment_obj);
                this.http_json('/ancient_books/delete_comment.action' , 'post' , this.delete_comment_obj , this.success_delete_comment , this.fail_delete_comment);
            },

            success_delete_comment(response) {
                if (response.body.result === 1) {
                    console.log("success delete comment!");
                }
                else if (response.body.result === 0) {
                    console.log("fail delete comment");
                }
            },

            fail_delete_comment() {
                console.log("fail delete comment!");
            },


            /**
             * 3个模块切换功能，通过赋予被激活模块class属性来控制模块的切换
             */
            change_module() {
                var edit_head = document.getElementById("edit-head");
                var comment_head = document.getElementById("comment-head");
                var mark_head = document.getElementById("mark-head");
                var edit = document.getElementById("edit");
                var comment = document.getElementById("comment");
                var mark = document.getElementById("mark");
                edit_head.onclick = function () {
                    edit_head.className = "li-now";
                    comment_head.className = "";
                    mark_head.className = "";
                    edit.className = "div-now div";
                    comment.className = "div";
                    mark.className = "div";
                };
                comment_head.onclick = function () {
                    edit_head.className = "";
                    comment_head.className = "li-now";
                    mark_head.className = "";
                    edit.className = "div";
                    comment.className = "div-now div";
                    mark.className = "div";
                };
                mark_head.onclick = function () {
                    edit_head.className = "";
                    comment_head.className = "";
                    mark_head.className = "li-now";
                    edit.className = "div";
                    comment.className = "div";
                    mark.className = "div-now div";
                }
            },


            /**
             * 修订按钮点击事件
             */
            btn_edit_onclick() {
                this.edit_modal = true;
            },


            /**
             * 确认修订按钮点击事件
             */
            btn_confirm_edit_onclick() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                //  未做修改判断
                if (this.content == text_edit.innerText) {
                    alert("您未做任何修改！")
                }
                //  未填写修订信息判断
                else if (text.innerText == "") {
                    alert("請填寫修訂信息！")
                }
                else {
                    this.content = text_edit.innerText;
                    this.commit = text.innerText;
                    this.post_update_cm();   //  批量更新批注标记
                    this.post_edit();    //  修改古籍文本内容请求
                    window.location.reload();
                }
            },


            /**
             * 修订记录按钮事件
             */
            edit_record_onclick() {
                this.get_edit_record();
                this.edit_record_modal = true;
            },

            /**
             * 修订记录按钮事件
             */
            close_edit_record_modal() {
                this.edit_record_modal = false;
            },

            /**
             * 批注文本选取添加批注操作
             */
            text_comment_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-add-comment").style.visibility = "visible"; //  添加批注按钮显示
                    var sel = window.getSelection();
                    var begin = sel.anchorNode.parentNode.id
                    this.begin_add_comment = parseInt(begin);
                    var end = sel.focusNode.parentNode.id;
                    this.end_add_comment = parseInt(end)+1;
                    var range = window.getSelection().getRangeAt(0);    //  获得选区
                    this.target_add_comment = range.toString();
                }
                else if (window.getSelection().getRangeAt(0).toString().length == 0) {
                    var cli = window.getSelection().focusNode.parentNode.id;
                    var click = parseInt(cli)+1;
                    for (var j = 0; j < this.comment.length; j++) {
                        //该点击节点不在该条批注内
                        if (click < this.comment[j].begin_comment || click >= this.comment[j].end_comment) {
                            continue;
                        }
                        //该点击在该条批注内
                        if (click >= this.comment[j].begin_comment && click < this.comment[j].end_comment) {
                            this.get_comment_modal = true;
                            this.now_target = this.comment[j].target_comment;
                            this.now_content = this.comment[j].content_comment;
                            this.comment_id = this.comment[j].id_comment;
                            break;
                        }
                    }
                }
            },


            /**
             * 添加批注按钮事件
             */
            btn_add_comment_onclick() {
                this.add_comment_modal = true;
                var btn_add_comment = document.getElementById("btn-add-comment");
                btn_add_comment.style.visibility = "hidden";  //  添加批注按钮隐藏
            },


            /**
             * 确认添加批注按钮事件
             */
            btn_confirm_add_comment_onclick() {
                var textarea_add_comment = document.getElementById("textarea-addComment");    //  获得添加批注编辑框
                if (textarea_add_comment.value.length == 0) { //  判断未编辑批注信息
                    alert("您未生成批註內容！");
                }
                //  添加批注后渲染属性并获得位置
                else {
                    var checkbox = document.getElementById("check-private");
                    if (checkbox.checked == true) {
                        this.pri = 1;
                    }
                    else if (checkbox.checked == false) {
                        this.pri = 0;
                    }
                    this.content_add_comment = textarea_add_comment.value;
                    this.post_add_comment();
                    window.location.reload();
                }
            },

            /**
             * 取消添加批注事件
             */
            btn_cancel_add_comment_onclick() {
                var textarea_add_comment = document.getElementById("textarea-addComment");    //  获得添加批注编辑框
                textarea_add_comment.value = null;
                this.add_comment_modal = false;
            },

            /**
             * 删除批注按钮
             */
            btn_confirm_delete_comment_onclick() {
                post_delete_comment();
            },


            /**
             * 选择本体类别
             */
            select_noumenon_type() {
                var text = document.getElementById("text-mark");
                text.innerHTML = "";
                this.renew_mark()
            },

            /**
             * 选中标记文本事件
             */
            text_mark_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-mark-noumenon").style.visibility = "visible";
                    var sel = window.getSelection();
                    var begin = sel.anchorNode.parentNode.id
                    this.begin_add_mark = parseInt(begin);
                    var end = sel.focusNode.parentNode.id;
                    this.end_add_mark = parseInt(end)+1;
                    var range = window.getSelection().getRangeAt(0);    //  获得选区
                    this.target_add_mark = range.toString();
                    var text_mark = document.getElementById("text-mark");
                    for (var i = 0; i < 5; i++) {
                        var b = text_mark.innerText.charAt(this.begin_add_mark-5+i);
                        this.before += b;
                    }
                    for (var j = 0; j < 5; j++) {
                        var e = text_mark.innerText.charAt(this.end_add_mark+j);
                        this.after += e;
                    }
                }
            },

            /**
             * 标记本体按钮点击事件
             */
            btn_mark_noumenon_onclick() {
                this.add_mark_modal = true;
                var btn_mark_noumenon = document.getElementById("btn-mark-noumenon");
                btn_mark_noumenon.style.visibility = "hidden";    //  标记本体按钮隐藏
            },

            /**
             * 搜索本体
             */
            btn_search_noumenon_onclick() {
                var select = document.getElementById("ry-noumenon-type-select");
                var index = select.selectedIndex;
                if (index ==0) {
                    this.noumenon_search_url = "/ancient_books/get_person_list_by_name.action";
                }
                else if (index == 1) {
                    this.noumenon_search_url = "/ancient_books/get_location_list_by_name.action";
                }
                else if (index == 2) {
                    this.noumenon_search_url = "/ancient_books/get_office_list_by_name.action";
                }
                else if (index == 3) {
                    this.noumenon_search_url = "";
                }
                else if (index == 4) {
                    this.noumenon_search_url = "/ancient_books/get_institution_list_by_name.action";
                }
                else if (index == 5) {
                    this.noumenon_search_url = "/ancient_books/get_technical_list_by_name.action";
                }
                else if (index == 6) {
                    this.noumenon_search_url = "/ancient_books/get_literature_list_by_name.action";
                }
                var name = document.getElementById("ry-noumenon-input");
                this.noumenon_search_content = name.value;
                this.post_delete_comment();
            },

            /**
             * 添加标记按钮事件
             */
            btn_add_mark_onclick() {
                this.post_add_mark();
                this.add_mark_modal = false;
            },

            /**
             * 目录按钮
             */
            catalogue_onclick() {
                this.catalogue_modal = true;
            },



            /**
             * 获得渲染修订版可跟踪文本方法
             * 初始化一个判断变量，依次遍历文本中每个字，并判断该字是否在标记和批注中，对不同情况赋值判断变量
             * 得出不同结果
             */
            get_edit() {
                var a = 0;
                //文本逐字遍历
                for (var i = 0; i < this.content.length; i++) {
                    //按顺序依次获得文本中的字
                    var p = this.content.charAt(i);
                    //标记下标初始化
                    var jtemp = 0;
                    //批注下标初始化
                    var ktemp = 0;
                    //标记数组遍历
                    for (var j = 0; j < this.mark.length; j++) {
                        //该字不在该条标记内
                        if (i < this.mark[j].begin_mark || i >= this.mark[j].end_mark) {
                            a = 0;
                            jtemp = j;
                            continue;
                        }
                        //该字在该条标记内
                        if (i >= this.mark[j].begin_mark && i < this.mark[j].end_mark) {
                            a = 1;
                            jtemp = j;
                            break;
                        }
                    }
                    //批注数组遍历
                    for (var k = 0; k < this.comment.length; k++) {
                        //该字不在该条批注内，判断变量a值为0
                        if (i < this.comment[k].begin_comment || i >= this.comment[k].end_comment) {
                            continue;
                        }
                        //该字在该条批注内
                        if (i >= this.comment[k].begin_comment && i < this.comment[k].end_comment) {
                            //该字不是标记
                            if (a == 0) {
                                a = 2;
                                ktemp = k;
                            }
                            //该字是标记
                            if (a == 1) {
                                a = 4;
                                ktemp = k;
                            }
                            break;
                        }
                    }
                    var text_edit = document.getElementById("text-edit");
                    //该字既不是标记也不是批注
                    if (a == 0) {
                        var text = document.createTextNode(p);
                        text_edit.appendChild(text)
                    }
                    //该字只是标记
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=M" + this.mark[jtemp].id_mark);
                        text_edit.appendChild(span);
                    }
                    //该字只是批注
                    else if (a == 2) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=C" + this.comment[ktemp].id_comment);
                        text_edit.appendChild(span);
                    }
                    //该字既是标记又是批注
                    else if (a == 4) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=M" + this.mark[jtemp].id_mark + " id=C" + this.comment[ktemp].id_comment);
                        text_edit.appendChild(span);
                    }
                }
            },


            /**
             * 获得渲染批注版可跟踪文本方法
             * 初始化一个判断变量，逐字遍历确定是否为批注
             */
            renew_comment() {
                //判断变量赋值
                var a = 0;
                //文本逐字遍历
                for (var i = 0; i < this.content.length; i++) {
                    //按顺序依次获得文本中的字
                    var p = this.content.charAt(i);
                    //批注下标初始化
                    var jtemp = 0;
                    //批注数组遍历
                    for (var j = 0; j < this.comment.length; j++) {
                        //该字不在该条批注内
                        if (i < this.comment[j].begin_comment || i >= this.comment[j].end_comment) {
                            a = 0;
                            jtemp = j;
                            continue;
                        }
                        //该字在该条批注内
                        if (i >= this.comment[j].begin_comment && i < this.comment[j].end_comment) {
                            a = 1;
                            jtemp = j;
                            break;
                        }
                    }
                    var text_comment = document.getElementById("text-comment");
                    //该字不是批注
                    if (a == 0) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("id", i);
                        text_comment.appendChild(span);
                    }
                    //该字是批注
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("id", i);
                        span.setAttribute("class", "ry-comment id=C" + this.comment[jtemp].id_comment);
                        text_comment.appendChild(span);
                    }
                }
            },


            /**
             * 获得渲染本体标记版可跟踪文本方法
             * 初始化一个判断变量，逐字遍历确定是否为标记
             */
            renew_mark() {
                //判断变量赋值
                var a = 0;
                var type = document.getElementById("ry-select-mark-type");
                var index = type.selectedIndex;
                //文本逐字遍历
                for (var i = 0; i < this.content.length; i++) {
                    //按顺序依次获得文本中的字
                    var p = this.content.charAt(i);
                    //标记下标初始化
                    var jtemp = 0;
                    //标记数组遍历
                    for (var j = 0; j < this.mark.length; j++) {
                        //该字不在该条标记内
                        if (i < this.mark[j].begin_mark || i >= this.mark[j].end_mark) {
                            a = 0;
                            jtemp = j;
                            continue;
                        }
                        //该字在该条标记内
                        if (i >= this.mark[j].begin_mark && i < this.mark[j].end_mark) {
                            a = 1;
                            jtemp = j;
                            break;
                        }
                    }
                    var text_mark = document.getElementById("text-mark");
                    var span = document.createElement("span");
                    var text = document.createTextNode(p);
                    //该字不是标记
                    if (a == 0) {
                        span.appendChild(text);
                        span.setAttribute("id", i);
                        text_mark.appendChild(span);
                    }
                    //该字是标记
                    else if (a == 1) {
                        span.appendChild(text);
                        span.setAttribute("id", i);
                        span.setAttribute("class", "id=M" + this.mark[jtemp].id_mark + " " + this.mark[jtemp].noumenon_type);
                        text_mark.appendChild(span);
                    }
                    var has = span.hasAttribute("class");
                    if (index == 0 && has == true) {
                        span.setAttribute("class", "ry-mark id=M" + this.mark[jtemp].id_mark + " " + this.mark[jtemp].noumenon_type);
                    }
                    if (index == this.mark[jtemp].noumenon_type && has == true) {
                        span.setAttribute("class", "ry-mark id=M" + this.mark[jtemp].id_mark + " " + this.mark[jtemp].noumenon_type);
                    }
                }
            },


            /**
             * 获得更改标记JSON
             * 将碎片拼接，依次比较对应target，begin，end
             */
            get_mark_change() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                //遍历标记数组
                for (var i = 0; i < this.mark.length; i++) {
                    //依次获得每条标记碎片文字
                    var marks = document.getElementsByClassName("id=M" + this.mark[i].id_mark);
                    //初始化每条标记内容
                    var text = '';
                    //遍历每条标记中的每个字
                    for (var j = 0; j < marks.length; j++) {
                        var mark_piece = marks[j].innerText;
                        //拼凑所有字为一条标记
                        text += mark_piece;
                    }
                    //获取该条新标记的位置
                    var new_begin = (text_edit.innerText).indexOf(text);
                    var new_end = new_begin + text.length;
                    var before = '';
                    for (var k = 0; k < 5; k++) {
                        var b = text_edit.innerText.charAt(new_begin-5+k);
                        before += b;
                    }
                    var after = '';
                    for (var m = 0; m < 5; m++) {
                        var e = text_edit.innerText.charAt(new_end+1+m);
                        after += e;
                    }
                    //标记被修改创建标记更新数组
                    if (text != this.mark[i].target_mark || new_begin != this.mark[i].begin_mark || new_end != this.mark[i].end_mark) {
                        this.marks_modify.push({
                            id: this.mark[i].id_mark,
                            target: text,
                            begin: new_begin,
                            end: new_end,
                            before: before,
                            after: after,
                        })
                    }
                }
            },


            /**
             * 获得更改批注JSON
             * 将碎片拼接，依次比较对应target，begin，end
             */
            get_comment_change() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                //遍历批注数组
                for (var i = 0; i < this.comment.length; i++) {
                    //依次获得每条批注碎片文字
                    var comments = document.getElementsByClassName("id=C" + this.comment[i].id_comment);
                    //初始化每条批注内容
                    var text = '';
                    //遍历每条批注中的每个字
                    for (var j = 0; j < comments.length; j++) {
                        var comment_piece = comments[j].innerText;
                        //拼凑所有字为一条批注
                        text += comment_piece;
                    }
                    //获取该条新批注的位置
                    var new_begin = (text_edit.innerText).indexOf(text);
                    var new_end = new_begin + text.length;
                    //批注被修改创建批注更新数组
                    if (text != this.comment[i].target_comment || new_begin != this.comment[i].begin_comment || new_end != this.comment[i].end_comment) {
                        this.comments_modify.push({
                            id: this.comment[i].id_comment,
                            target: text,
                            begin: new_begin,
                            end: new_end,
                        })
                    }
                }
            },


            /**
             * 获得删除批注数组
             */
            get_comment_delete() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                //遍历批注数组
                for (var i = 0; i < this.comment.length; i++) {
                    //依次获得每条批注碎片文字
                    var comments = text_edit.getElementsByClassName("id=C" + this.comment[i].id);
                    //向删除批注数组中添加元素
                    if (comments.length == 0) {
                        this.comments_delete.push({
                            id: this.comment[i].id
                        })
                    }
                }
            },


            /**
             * 获得删除标记数组
             */
            get_mark_delete() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                //遍历标记数组
                for (var i = 0; i < this.mark.length; i++) {
                    //依次获得每条标记碎片文字
                    var marks = text_edit.getElementsByClassName("id=M" + this.mark[i].id);
                    // 向删除标记数组添加元素
                    if (marks.length == 0) {
                        this.marks_delete.push({
                            id: this.mark[i].id
                        })
                    }
                }
            },
        }
    }
</script>



<style>
    /*通配选择器消除默认内外边距*/
    *{
        padding: 0;
        margin: 0;
    }

    .width400{
        width: 400px;
    }

    .width1000{
        width: 1000px;
    }

    .ry-ancient-book button{
        border: transparent;
    }

    .ry-ancient-book input{
        border: none;

    }
    
    .next-one{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/下一处按钮.png");
    }
    
    .last-one{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/上一处按钮.png");
    }
    
    .ry-search{
        width: 232px;
        height: 50px;
        margin-left: 550px;
        padding-left: 20px;
        background-image: url("../assets/img/search-input.png");
    }

    .ry-select{
        width: 82px;
        height: 32px;
        border: none;
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        background-image: url("../assets/img/本体标记/下拉菜单.png");
    }

    .ry-btn-menu{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/本体标记/目录.png");
    }

    .ry-btn-go{
        color: white;
        width: 45px;
        height: 44px;
        background-image: url("../assets/img/本体标记/go.png");
    }

    .ry-btn-last-page{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/本体标记/上一.png");
    }

    .ry-btn-next-page{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/本体标记/下一.png");
    }

    .ry-btn-edit{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/修订/修订按钮.png");
    }

    .ry-btn-edit-record{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/修订/修订记录按钮.png");
    }

    .ry-input-page{
        background-color: transparent;
        width: 33px;
    }

    .ry-page{
        padding-top: 12px;
        padding-left: 8px;
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/本体标记/卷数.png");
    }

    .ry-hide-picture{
        margin-top: 120px;
        margin-right: 20px;
    }

    .ry-bottom-bar{
        margin-top: 10px;
    }

    .ry-module-bar{
        padding-right: 8px;
        padding-top: 5px;
        width: 299px;
        height: 47px;
        background-image: url("../assets/img/本体标记/屏风按钮.png");
    }

    .ry-btn-cancel-add-comment{
        width: 80px;
        height: 35px;
        background-image: url("../assets/img/批注交互/删除按钮.png");
    }

    .ry-btn-confirm-add-comment{
        width: 80px;
        height: 35px;
        background-image: url("../assets/img/批注交互/删除按钮.png");
    }

    .ry-modal-add-comment-box{
        padding-left: 160px;
    }

    .ry-modal-border{
        border:solid red 2px;
    }

    .ry-modal-padding{
        padding-top : 40px;
        padding-bottom: 10px;
        padding-right :15px;
        padding-left: 10px;
    }

    .ry-input-search{
        width: 300px;
        height: 36px;
        padding-left: 4px;
        margin-left: 20px;
        background-image: url("../assets/img/本体标记交互/搜索框.png");
    }

    .ry-type-select{
        width: 82px;
        height: 36px;
        border: none;
        padding-left: 4px;
        background-image: url("../assets/img/本体标记交互/本体筛选.png");
    }

    .ry-btn-search-pic{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-size: 100%;
        background-image: url("../assets/img/本体标记交互/搜索放大镜.png");
    }

    .ry-add-mark-modal-box{
        height: 100px;
        text-align: center;
    }

    .ry-btn-confirm-edit-record-modal{
        color: white;
        width: 103px;
        height: 44px;
        margin-left: 440px;
        background-size: 100%;
        background-image: url("../assets/img/上传1/下一步按钮.png");
    }
    

    /*图文对照文字工作台div*/
    #workspace-text{
        width: 450px;
        height: 470px;
        padding: 10px;
        position: relative;
    }

    /*图文对照文字工作台li标签（3个版本切换导航栏）*/
    #workspace-text li{
        list-style: none;
        float: right;
        margin: 5px;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 82px;
        text-align: center;
        line-height: 30px;
        font-size: large;
    }

    /*3个版本中选定版本li标签导航栏*/
    #workspace-text-head li.li-now{
        color: red;
        text-decoration: underline;
    }

    /*图文对照工作台主体*/
    #workspace-text-body {
        clear: both;
        padding-left: 50px;;
    }

    /*图文对照工作台主体div标签（3个版本的3个div）*/
    #workspace-text-body > div {
        display: none;
    }

    /*3个版本中选定的版本主体*/
    #workspace-text-body > div.div-now {
        display: block;
    }

    /*修订记录按钮*/
    #btn-edit-record{
        position: absolute;
        left: 170px;
        bottom: 0px;
    }

    /*修订按钮*/
    #btn-edit{
        position: absolute;
        right: 20px;
        bottom: 0px;
    }

    /*取消修订按钮*/
    #btn-cancel-edit{
        position: absolute;
        right: 100px;
        bottom: 50px;
    }

    /*确定修订按钮*/
    #btn-confirm-edit{
        position: absolute;
        right: 50px;
        bottom: 50px;
    }

    /*添加批注按钮*/
    #btn-add-comment{
        position: absolute;
        right: 50px;
        bottom: 50px;
    }

    /*标记本体按钮*/
    #btn-mark-noumenon{
        position: absolute;
        right: 50px;
        bottom: 50px;
    }

    /*本体标记板块筛选标记种类下拉菜单*/
    #ry-select-mark-type {
        position: absolute;
        right: 20px;
        top: 80px;
    }

    /*文本内容*/
    .body-text{
        margin-top: 40px;
    }

    /*修订记录&批注内容编辑框*/
    textarea{
        position: relative;
        top: 30px;
        width: 250px;
    }

    /*修订信息编辑框*/
    #textarea-editInfo{
        position: relative;
        top: 0px;
    }

    /*批注内容编辑框*/
    #textarea-addComment{
        width: 400px;
        height: 200px;
        position: static;
    }

    /*批注字体样式*/
    .ry-comment{
        cursor: pointer;
        font-weight: bold;
        color: red;
    }

    /*标记字体样式*/
    .ry-mark{
        cursor: pointer;
        text-decoration: underline;
        color: red;
    }
</style>