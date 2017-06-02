<template>
    <div>

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
                        <select id="select-markType" class="ry-select">
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
                        <button class="btn btn-info" data-toggle="modal" data-target="#layer-mark-noumenon" id="btn-mark-noumenon" style="visibility: hidden" @click="btn_mark_noumenon_onclick()">標記本體</button>
                    </div>

                    <!--批注版块-->
                    <div id="comment" class="div">
                        <!--文本标题-->
                        <h4>詩經卷一</h4>
                        <!--文本主体-->
                        <div class="body-text" id="text-comment" @click="text_comment_onclick()"></div>
                        <!--添加批注按钮，选中文本后激活显示，点击弹出添加批注模态框-->
                        <button class="btn btn-info" data-toggle="modal" data-target="#layer-add-comment" id="btn-add-comment" style="visibility: hidden" @click="btn_add_comment_onclick()">添加批註</button>
                    </div>

                    <!--修订板块-->
                    <div id="edit" class="div div-now">
                        <!--文本标题-->
                        <h4>詩經卷一</h4>
                        <!--文本主体-->
                        <div class="body-text" id="text-edit" contentEditable="false"></div>
                        <br>
                        <br>
                        <br>
                        <!--修订信息编辑框标题-->
                        <h5 id="label" style="visibility: hidden">請填寫修訂信息:</h5>
                        <!--修订信息编辑框-->
                        <textarea id="textarea-editInfo" style="visibility: hidden"></textarea>
                        <!--点击修订后弹出的按钮-->
                        <button id="btn-cancel-edit" class="btn btn-danger" style="visibility: hidden" @click="btn_cancel_edit_onclick()">取消</button>
                        <button id="btn-confirm-edit" class="btn btn-success" style="visibility: hidden" @click="btn_confirm_edit_onclick()">確定</button>
                        <!--查看修订记录-->
                        <button class="ry-btn-edit-record" data-toggle="modal" data-target="#layer-edit-record" id="btn-edit-record" @click="edit_record_onclick()">修訂記錄</button>
                        <button class="ry-btn-edit" id="btn-edit" @click="btn_edit_onclick()">修訂</button>
                    </div>
                </div>

                <!--修订记录模态框-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="layer-edit-record">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4 class="modal-title">修訂記錄</h4>
                            </div>
                            <div class="modal-body text-tight">
                                <div v-for="item in edit_record">
                                    <p>修訂者：{{item.username_edit_record}}</p>
                                    <p>修訂時間：{{item.time_edit_record}}</p>
                                    <p>修訂信息：{{item.commit_edit_record}}</p>
                                    <p>修訂版本：{{item.version_edit_record}}</p>
                                    <hr>
                                </div>
                                <button class="btn btn-success btn-sm" data-dismiss="modal">確定</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--添加批注模态框-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="layer-add-comment">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">選中內容：示例文本</h4>
                            </div>
                            <div class="modal-body text-tight">
                                <p>添加批註：</p>
                                <textarea id="textarea-addComment"></textarea>
                                <br>
                                <input id="check-private" type="checkbox" value="選為私密">選為私密
                                <br>
                                <br>
                                <button class="btn btn-warning btn-sm" data-dismiss="modal" id="btn-cancel-add-comment" @click="btn_cancel_add_comment_onclick()">取消</button>
                                <button class="btn btn-success btn-sm" data-dismiss="modal" id="btn-confirm-add-comment" @click="btn_confirm_add_comment_onclick()">確定</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--查看批注模态框-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="layer-comment-record">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4 class="modal-title">批註內容</h4>
                            </div>
                            <div class="modal-body text-tight">
                                <table class="table table-bordered table-hover">
                                    <tr class="text-left">
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td class="text-right">
                                            <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#layer-delete">删除</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!--标记本体模态框-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="layer-mark-noumenon">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button id="btn-cross-cancelAddMark" type="button" class="close" data-dismiss="modal" @click="btn_cross_cancel_add_mark_onclick()">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body text-tight">
                                本體類型：
                                <select>
                                    <option>篩選</option>
                                    <option>人物</option>
                                    <option>地點</option>
                                    <option>職官</option>
                                    <option>時間</option>
                                    <option>機構</option>
                                    <option>術語</option>
                                    <option>文獻</option>
                                </select>
                                <input type="text"><button>搜索</button>
                                <button class="btn btn-info btn-sm" data-dismiss="modal" id="btn-add-mark" @click="btn_add_mark_onclick() ">添加</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--删除确认模态框-->
                <div role="dialog" class="modal fade bs-example-modal-sm" id="layer-delete">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                                <h4 class="modal-title">确认删除吗</h4>
                            </div>
                            <div class="modal-body text-tight">
                                <button class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
                                <button id="btn-confirm-cancel" class="btn btn-danger btn-sm" data-dismiss="modal" @click="btn_confirm_delete_comment_onclick()">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--图片工作台-->
            <div>
                <div class="float-right ry-hide-picture"><img src="../assets/img/本体标记/更多标.png" height="130" width="29"/></div>
                <img src="../assets/img/u2099.png"/>
            </div>
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
                    <span>MPage</span>
                </div>
                <button class="float-right ry-btn-last-page">上一</button>
                <button class="ry-btn-menu">目錄</button>
            </div>
        </div>

    </div>
</template>



<script type="text/javascript">
    export default{

        data() {
            return{
                get_content_obj : {},
                content : '蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。',
                page_id : 1,

                get_comment_obj : {},
                comment : [{id_comment:"654654",target_comment:"露为霜。",begin_comment:6,end_comment:10},{id_comment:"321321",target_comment:"，在水一",begin_comment:14,end_comment:18}],
                id_comment : '',
                target_comment : '',
                begin_comment : '',
                end_comment : '',
                content_comment : '',

                get_mark_obj : {},
                mark : [{id_mark:"123123",target_mark:"，白露为",begin_mark:4,end_mark:8},{id_mark:"456456",target_mark:"伊人，在",begin_mark:12,end_mark:16}],
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
                commit_edit_record : '',
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
                pri : '',

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
            this.get_text(pageId);
            this.get_comment(pageId);
            this.get_mark(pageId);
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
            get_text(pageId) {
                this.get_content_obj.key = "page_id";
                this.get_content_obj.value = pageId;
                this.HttpJson ('/ancient_books/get_text.action' , 'get' , this.get_content_obj , this.success_get_text , this.fail_get_text);
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
            get_comment(pageId) {
                this.get_comment_obj.key = "page_id";
                this.get_comment_obj.value = pageId;
                this.HttpJson ('/ancient_books/get_comment_list_by_page_id.action' , 'get' , this.get_comment_obj , this.success_get_comment , this.fail_get_comment);
            },

            success_get_comment(response) {
                console.log("success get comments ");
                //将后端数据显示在前端页面里
                if( response.body.length === 0) {
                    console.log("没有返回数组！");
                }
                else {
                    for (let i = 0; i <= response.body.length-1; i++) {
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
            get_mark(pageId) {
                this.get_mark_obj.key = "page_id";
                this.get_mark_obj.value = pageId;
                this.HttpJson ('/ancient_books/get_mark_list_by_page_id.action' , 'get' , this.get_mark_obj , this.success_get_mark , this.fail_get_mark);
            },

            success_get_mark(response) {
                console.log("success get marks ");
                //将后端数据显示在前端页面里
                if( response.body.content.length === 0) {
                    console.log("没有返回数组！");
                }
                else {
                    for (let i = 0; i <= response.body.length-1; i++) {
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
            get_edit_record(pageId) {
                this.get_edit_record_obj.key = "page_id";
                this.get_edit_record_obj.value = pageId;
                this.HttpJson ('/ancient_books/get_ancient_book_modify_log_by_page.action' , 'get' , this.get_edit_record_obj , this.success_get_edit_record , this.fail_get_edit_record);
            },

            success_get_edit_record(response) {
                console.log ("success get edit records ");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    this.total_page_editRecord = response.body.total_page;
                    for (let i = 0; i <= response.body.content.length-1; i++) {
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
            post_edit() {
                this.edit_text_obj.page_id = this.page_id;
                this.edit_text_obj.content = this.content;
                this.edit_text_obj.commit = this.commit;
                this.BeforeHttp(this.edit_text);
                this.HttpJson('/ancient_books/modify_page_content.action' , 'post' , this.edit_text_obj , this.success_post_edit,this.fail_post_edit);
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
                this.update_cm.comments_delete = this.comments_delete;
                this.update_cm.comments_modify = this.comments_modify;
                this.update_cm.marks_delete = this.marks_delete;
                this.update_cm.marks_modify = this.marks_modify;
                this.BeforeHttp(this.update_cm);
                this.HttpJson('/ancient_books/update_marks_comment.action' , 'post' , this.update_cm , this.success_update_cm , this.fail_update_cm);
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
                this.BeforeHttp(this.add_comment_obj);
                this.HttpJson('/ancient_books/add_comment.action' , 'post' , this.add_comment_obj , this.success_add_comment , this.fail_add_comment);
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
                this.BeforeHttp(this.add_mark_obj);
                this.HttpJson('/ancient_books/add_mark.action' , 'post' , this.add_mark_obj , this.success_add_mark , this.fail_add_mark);
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
                this.BeforeHttp(this.delete_mark);
                this.HttpJson('/ancient_books/delete_mark.action' , 'post' , this.delete_mark_obj , this.success_delete_mark , this.fail_delete_mark);
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
                this.BeforeHttp(this.delete_comment_obj);
                this.HttpJson('/ancient_books/delete_comment.action' , 'post' , this.delete_comment_obj , this.success_delete_comment , this.fail_delete_comment);
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
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                var btn_cancel_edit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btn_confirm_edit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var label = document.getElementById("label");   //  修订信息编辑框标题
                btn_cancel_edit.style.visibility = "visible";    //   取消修订按钮显示
                btn_confirm_edit.style.visibility = "visible";    //  确认修订按钮显示
                text.style.visibility = "visible";  //  修订信息编辑框显示
                label.style.visibility = "visible";    //   修订信息编辑框标题显示
                text_edit.contentEditable = true;    //  修订文本可编辑
            },


            /**
             * 取消修订按钮点击事件
             */
            btn_cancel_edit_onclick() {
                var btn_cancel_edit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btn_confirm_edit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var label = document.getElementById("label");   //  修订信息编辑框标题
                window.location.reload();   //  重新加载
                btn_cancel_edit.style.visibility = "hidden";  //  取消修订按钮隐藏
                btn_confirm_edit.style.visibility = "hidden"; //  确认修订按钮隐藏
                text.style.visibility = "hidden";   //  修订信息编辑框隐藏
                label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏
            },


            /**
             * 确认修订按钮点击事件
             */
            btn_confirm_edit_onclick() {
                var text_edit = document.getElementById("text-edit");    //  修订版文本
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var btn_cancel_edit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btn_confirm_edit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var label = document.getElementById("label");   //  修订信息编辑框标题
                //  未做修改判断
                if (content == text_edit.innerText) {
                    alert("您未做任何修改！")
                }
                //  未填写修订信息判断
                else if (text.value == "") {
                    alert("請填寫修訂信息！")
                }
                else {
                    btn_cancel_edit.style.visibility = "hidden";  //  取消修订按钮隐藏
                    btn_confirm_edit.style.visibility = "hidden";  // 确认修订按钮隐藏
                    text.style.visibility = "hidden";   //  修订信息编辑框隐藏
                    label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏
                    text_edit.contentEditable = false;   //  修订文本不可编辑
                    this.commit = text.innerText;
                    post_update_cm();   //  批量更新批注标记
                    post_edit();    //  修改古籍文本内容请求
                }
            },


            /**
             * 修订记录按钮事件
             */
            edit_record_onclick() {
                this.get_edit_record(pageId);
            },


            /**
             * 批注文本选取添加批注操作
             */
            text_comment_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-add-comment").style.visibility = "visible"; //  添加批注按钮显示
                }
                var sel = window.getSelection();
                this.begin_add_comment = sel.anchorNode.parentNode.id;
                this.end_add_comment = sel.focusNode.parentNode.id + 1;
            },


            /**
             * 添加批注按钮事件
             */
            btn_add_comment_onclick() {
                var btn_add_comment = document.getElementById("btn-add-comment");
                btn_add_comment.style.visibility = "hidden";  //  添加批注按钮隐藏
                var range = window.getSelection().getRangeAt(0);    //  获得选区
                var span = document.createElement("span");  //  创建span标签
                range.surroundContents(span);   //  为选区添加span标
                this.target_add_comment = range;
            },


            /**
             * 确认添加批注按钮事件
             */
            btn_confirm_add_comment_onclick() {
                var spans = document.getElementById("text-comment").getElementsByTagName("span");   //  获得批注文本中的span标签
                var textarea_add_comment = document.getElementById("textarea-addComment");    //  获得添加批注编辑框
                if (textarea_add_comment.value.length == 0) { //  判断未编辑批注信息
                    alert("您未生成批註內容！");
                    this.target_add_comment = '';
                    this.begin_add_comment = '';
                    this.end_add_comment = '';
                    for (var i = 0; i < spans.length; i++) {
                        var has = spans[i].hasAttribute("class");
                        //  没有class的span标签转为纯文本
                        if (has == false) {
                            var inner = spans[i].innerText;
                            var text = document.createTextNode(inner);
                            spans[i].parentNode.replaceChild(text, spans[i]);
                        }
                    }
                }
                //  添加批注后渲染属性并获得位置
                else {
                    var checkbox = document.getElementById("check-private");
                    if (checkbox.checked = true) {
                        this.pri = 1
                    }
                    else {
                        this.pri = 0
                    }
                    this.content_add_comment = textarea_add_comment.innerText;
                    post_add_comment();
                    window.location.reload()
                }
            },


            /**
             * 选中标记文本事件
             */
            text_mark_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-mark-noumenon").style.visibility = "visible";
                }
                var sel = window.getSelection();
                this.begin_add_mark = sel.anchorNode.parentNode.id;
                this.end_add_mark = sel.focusNode.parentNode.id + 1;
                var text_mark = document.getElementById("text-mark");
                for (i = 0; i < 5; i++) {
                    var b = text_mark.innerText.charAt(this.begin_add_mark-5+k);
                    this.before += b;
                }
                for (j = 0; j < 5; j++) {
                    var e = text_mark.innerText.charAt(this.end_add_mark+1+m);
                    this.after += e;
                }
            },


            /**
             * 取消添加批注事件
             */
            btn_cancel_add_comment_onclick() {
                var spans = document.getElementById("text-comment").getElementsByTagName("span");   //  获取批注文本中span标签
                //  遍历将没有class属性的span复原为纯文本
                for (var i = 0; i < spans.length; i++) {
                    var has = spans[i].hasAttribute("class");
                    if (has == false) {
                        var inner = spans[i].innerText;
                        var text = document.createTextNode(inner);
                        spans[i].parentNode.replaceChild(text, spans[i]);
                    }
                }
                this.begin_add_mark = '';
                this.end_add_mark = '';
                this.before = '';
                this.after = '';
            },


            /**
             * 标记本体按钮点击事件
             */
            btn_mark_noumenon_onclick() {
                var btn_mark_noumenon = document.getElementById("btn-mark-noumenon");
                btn_mark_noumenon.style.visibility = "hidden";    //  标记本体按钮隐藏
                var range = window.getSelection().getRangeAt(0);    //  获得选区
                var span = document.createElement("span");  //  创建span标签
                range.surroundContents(span);    //  为选区添加span标签
                this.target_add_mark = range;
            },


            /**
             * 确认取消按钮事件
             */
            btn_confirm_delete_comment_onclick() {
                post_delete_comment();
            },


            /**
             * 添加标记按钮事件
             */
            btn_add_mark_onclick() {
                post_add_mark();
                window.location.reload()
            },


            /**
             * 添加本体标记模态框的x按钮事件
             */
            btn_cross_cancel_add_mark_onclick() {
                var spans = document.getElementById("text-mark").getElementsByTagName("span");  //  标记文本中获取span标签
                //  遍历将没有class属性的span复原为纯文本
                for (var i = 0; i < spans.length; i++) {
                    var has = spans[i].hasAttribute("class");
                    if (has == false) {
                        var inner = spans[i].innerText;
                        var text = document.createTextNode(inner);
                        spans[i].parentNode.replaceChild(text, spans[i]);
                    }
                }
                this.begin_add_mark = '';
                this.end_add_mark = '';
                this.before = '';
                this.after = '';
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
                        var text = document.createTextNode(p);
                        text_comment.appendChild(text)
                    }
                    //该字是批注
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "comment id=C" + this.comment[jtemp].id_comment);
                        span.setAttribute("data-toggle", "modal");
                        span.setAttribute("data-target", "#layer-comment-record");
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
                    //该字不是标记
                    if (a == 0) {
                        var text = document.createTextNode(p);
                        text_mark.appendChild(text)
                    }
                    //该字是标记
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "mark id=M" + this.mark[jtemp].id_mark);
                        text_mark.appendChild(span);
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
                    for (j = 0; j < marks.length; j++) {
                        var mark_piece = marks[j].innerText;
                        //拼凑所有字为一条标记
                        text += mark_piece;
                    }
                    //获取该条新标记的位置
                    var new_begin = (text_edit.innerText).indexOf(text);
                    var new_end = new_begin + text.length;
                    var before = '';
                    for (k = 0; k < 5; k++) {
                        var b = text_edit.innerText.charAt(new_begin-5+k);
                        before += b;
                    }
                    var after = '';
                    for (m = 0; m < 5; m++) {
                        var e = text_edit.innerText.charAt(new_end+1+m);
                        after += e;
                    }
                    //标记被修改创建标记更新数组
                    if (text != this.mark[i].target_mark || new_begin != this.mark[i].begin_mark || new_end != this.mark[i].end_mark) {
                        marks_modify.push({
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
                    for (j = 0; j < comments.length; j++) {
                        var comment_piece = comments[j].innerText;
                        //拼凑所有字为一条批注
                        text += comment_piece;
                    }
                    //获取该条新批注的位置
                    var new_begin = (text_edit.innerText).indexOf(text);
                    var new_end = new_begin + text.length;
                    //批注被修改创建批注更新数组
                    if (text != this.comment[i].target_comment || new_begin != this.comment[i].begin_comment || new_end != this.comment[i].end_comment) {
                        comments_modify.push({
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
                    var comments = document.getElementsByClassName("id=C" + this.comment[i].id);
                    //向删除批注数组中添加元素
                    if (comments.length == 0) {
                        comments_delete.push({
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
                    var marks = document.getElementsByClassName("id=M" + this.mark[i].id);
                    // 向删除标记数组添加元素
                    if (marks.length == 0) {
                        marks_delete.push({
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

    .width1000{
        width: 1000px;
    }

    button{
        border: transparent;
    }

    input{
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
        background-image: url("../assets/img/搜索框.png");
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
    #select-markType {
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
        width: 320px;
    }

    /*修订信息编辑框*/
    #textarea-editInfo{
        position: relative;
        top: 0px;
    }

    /*批注内容编辑框*/
    #textarea-addComment{
        width: 500px;
        height: 200px;
        position: static;
    }

    /*批注字体样式*/
    .comment{
        cursor: pointer;
        text-decoration: underline;
    }

    /*标记字体样式*/
    .mark{
        cursor: pointer;
        font-weight: bold;
    }
</style>