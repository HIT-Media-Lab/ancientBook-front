<template>
    <!--图文对照文本工作台-->
    <div id="workspace-text">

        <!--文本工作台3个版本导航按钮-->
        <div id="workspace-text-head">
            <ul>
                <!--class值为空表示未激活板块，class值为li-now表示激活板块-->
                <li id="mark-head">本體標記</li>
                <li id="comment-head">批註版</li>
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
                <p class="body-text" id="text-mark" @click="textMark_onclick()"></p>
                <!--本体种类选择菜单-->
                <select id="select-markType">
                    <option>篩選</option>
                    <option>人物</option>
                    <option>地點</option>
                    <option>職官</option>
                    <option>時間</option>
                    <option>機構</option>
                    <option>術語</option>
                    <option>文獻</option>
                </select>
                <!--标记本体按钮，选中文本后激活显示，点击弹出标记本体模态框-->
                <button class="btn btn-info" data-toggle="modal" data-target="#layer-mark-noumenon" id="btn-mark-noumenon" style="visibility: hidden" @click="btnMarkNoumenon_onclick()">標記本體</button>
            </div>

            <!--批注版块-->
            <div id="comment" class="div">
                <!--文本标题-->
                <h4>詩經卷一</h4>
                <!--文本主体-->
                <div class="body-text" id="text-comment" @click="textComment_onclick()"></div>
                <!--添加批注按钮，选中文本后激活显示，点击弹出添加批注模态框-->
                <button class="btn btn-info" data-toggle="modal" data-target="#layer-add-comment" id="btn-add-comment" style="visibility: hidden" @click="btnAddComment_onclick()">添加批註</button>
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
                <button id="btn-cancel-edit" class="btn btn-danger" style="visibility: hidden" @click="btnCancelEdit_onclick()">取消</button>
                <button id="btn-confirm-edit" class="btn btn-success" style="visibility: hidden" @click="btnConfirmEdit_onclick()">確定</button>
                <!--查看修订记录-->
                <button class="btn btn-primary" data-toggle="modal" data-target="#layer-edit-record" id="btn-edit-record" @click="editRecord_onclick()">修訂記錄</button>
                <button class="btn btn-info" id="btn-edit" @click="btnEdit_onclick()">修訂</button>
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
                        <div v-for="item in editRecord">
                            <p>修訂者：{{item.user_name_editRecord}}</p>
                            <p>修訂時間：{{item.time_editRecord}}</p>
                            <p>修訂信息：{{item.commit_editRecord}}</p>
                            <p>修訂版本：{{item.version_editRecord}}</p>
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
                        <button class="btn btn-warning btn-sm" data-dismiss="modal" id="btn-cancel-add-comment" @click="btnCancelAddComment_onclick()">取消</button>
                        <button class="btn btn-success btn-sm" data-dismiss="modal" id="btn-confirm-add-comment" @click="btnConfirmAddComment_onclick()">確定</button>
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
                        <button id="btn-cross-cancelAddMark" type="button" class="close" data-dismiss="modal" @click="btnCrossCancelAddMark_onclick()">
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
                        <button class="btn btn-info btn-sm" data-dismiss="modal" id="btn-add-mark" @click="btnAddMark_onclick() ">添加</button>
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
                        <button id="btn-confirm-cancel" class="btn btn-danger btn-sm" data-dismiss="modal" @click="btnConfirmDeleteComment_onclick()">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script type="text/javascript">
    export default{

        data() {
            return{
                get_content : {},
                content : '',
                page_id : 1,

                get_comment : {},
                comment : [],
                id_comment : '',
                target_comment : '',
                begin_comment : '',
                end_comment : '',
                content_comment : '',

                get_mark : {},
                mark : [],
                id_mark : '',
                noumenon_type : '',
                noumennon_id : '',
                begin_mark : '',
                end_mark : '',
                target_mark : '',

                get_edit_record : {},
                editRecord : [],
                user_name_editRecord : '',
                time_editRecord : '',
                version_editRecord : '',
                commit_editRecord : '',
                total_page_editRecord : '',

                edit_text : {},
                commit : {},

                update_CM : {},

                add_comment : {},

                add_mark : {},

                marks_modify : [],
                comments_modify : [],
                marks_delete : [],
                comments_delete : [],

                target_addC : '',
                content_addC : '',
                begin_addC : '',
                end_addC : '',
                pri : '',

                target_addM : '',
                begin_addM : '',
                end_addM : '',
                noumenon_type : '',
                noumenon_id : '',
                before : '',
                after : '',

                delete_mark : {},
                mark_id : '',

                delete_comment : {},
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
            this.getText(pageId);
            this.getCommentGet(pageId);
            this.getMarkGet(pageId);
        },

        mounted : function () {
            this.change_module();
            this.getEdit();
            this.getMark();
            this.getComment();
        },

        methods: {

            /**
             * 获取文本内容请求
             */
            getText(pageId) {
                this.get_content.key = "page_id";
                this.get_content.value = pageId;
                this.HttpGetJson ('/ancient_books/get_text.action' , this.get_content , this.success_getText , this.fail_getText);
            },

            success_getText (response) {
                console.log ("success get contents");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log("没有返回文本");
                }
                else {
                    this.content = response.body.content;
                }
            },

            fail_getText() {
                console.log("fail get contents!");
            },


            /**
             * 获取一页批注信息请求
             */
            getCommentGet(pageId) {
                this.get_comment.key = "page_id";
                this.get_comment.value = pageId;
                this.HttpGetJson ('/ancient_books/get_comment_list_by_page_id.action' , this.get_comment , this.success_getComment , this.fail_getComment);
            },

            success_getComment(response) {
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

            fail_getComment() {
                console.log("fail get comments!");
            },


            /**
             * 获取一页标记信息请求
             */
            getMarkGet(pageId) {
                this.get_mark.key = "page_id";
                this.get_mark.value = pageId;
                this.HttpGetJson ('/ancient_books/get_mark_list_by_page_id.action' , this.get_mark , this.success_getMark , this.fail_getMark);
            },

            success_getMark(response) {
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

            fail_getMark() {
                console.log("fail get marks!");
            },


            /**
             * 获得每页的修订记录列表
             */
            get_editRecord(pageId) {
                this.get_edit_record.key = "page_id";
                this.get_edit_record.value = pageId;
                this.HttpGetJson ('/ancient_books/get_ancient_book_modify_log_by_page.action' , this.get_edit_record , this.success_get_editRecord , this.fail_get_editRecord);
            },

            success_get_editRecord(response) {
                console.log ("success get edit records ");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log ("没有返回数组！");
                }
                else {
                    this.total_page_editRecord = response.body.total_page;
                    for (let i = 0; i <= response.body.content.length-1; i++) {
                        this.editRecord.push({
                            user_name_editRecord: response.body.content[i].user_name,
                            time_editRecord: response.body.content[i].time,
                            version_editRecord: response.body.content[i].version,
                            commit_editRecord: response.body.content[i].commit,
                        });
                    }
                }
            },

            fail_get_editRecord() {
                console.log ("fail get edit records!");
            },


            /**
             * 修改古籍文本内容POST请求
             */
            post_edit() {
                this.edit_text.page_id = this.page_id;
                this.edit_text.content = this.content;
                this.edit_text.commit = this.commit;
                this.BeforeHttp(this.edit_text);
                this.HttpPostJson('/ancient_books/modify_page_content.action' , this.edit_text , this.success_post_edit,this.fail_post_edit);
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
            post_update_CM() {
                this.getMarkChange();
                this.getCommentChange();
                this.getMarkDelete();
                this.getCommentDelete();
                this.update_CM.comments_delete = this.comments_delete;
                this.update_CM.comments_modify = this.comments_modify;
                this.update_CM.marks_delete = this.marks_delete;
                this.update_CM.marks_modify = this.marks_modify;
                this.BeforeHttp(this.update_CM);
                this.HttpPostJson('/ancient_books/update_marks_comment.action' , this.update_CM , this.success_update_CM , this.fail_update_CM);
            },

            success_update_CM(response) {
                if (response.body.result === 1) {
                    console.log("success update CM!");
                }
                else if (response.body.result === 0) {
                    console.log("fail update CM");
                }
            },

            fail_update_CM() {
                console.log("fail update CM!");
            },


            /**
             * 增加一个批注POST请求
             */
            post_add_comment() {
                this.add_comment.page_id = this.page_id;
                this.add_comment.target = this.target_addC;
                this.add_comment.content = this.content_addC;
                this.add_comment.begin = this.begin_addC;
                this.add_comment.end = this.end_addC;
                this.add_comment.pri = this.pri;
                this.BeforeHttp(this.add_comment);
                this.HttpPostJson('/ancient_books/add_comment.action' , this.add_comment , this.success_add_comment , this.fail_add_comment);
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
                this.add_mark.page_id = this.page_id;
                this.add_mark.target = this.target_addM;
                this.add_mark.begin = this.begin_addM;
                this.add_mark.end = this.end_addM;
                this.add_mark.noumenon_type = this.noumenon_type;
                this.add_mark.noumenon_id = this.noumenon_id;
                this.add_mark.before = this.before;
                this.add_mark.after = this.after;
                this.BeforeHttp(this.add_mark);
                this.HttpPostJson('/ancient_books/add_mark.action' , this.add_mark , this.success_add_mark , this.fail_add_mark);
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
                this.delete_mark.mark_id = this.mark_id;
                this.BeforeHttp(this.delete_mark);
                this.HttpPostJson('/ancient_books/delete_mark.action' , this.delete_mark , this.success_delete_mark , this.fail_delete_mark);
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
                this.delete_comment.comment_id = this.comment_id;
                this.BeforeHttp(this.delete_comment);
                this.HttpPostJson('/ancient_books/delete_comment.action' , this.delete_comment , this.success_delete_comment , this.fail_delete_comment);
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
                var editHead = document.getElementById("edit-head");
                var commentHead = document.getElementById("comment-head");
                var markHead = document.getElementById("mark-head");
                var edit = document.getElementById("edit");
                var comment = document.getElementById("comment");
                var mark = document.getElementById("mark");
                editHead.onclick = function () {
                    editHead.className = "li-now";
                    commentHead.className = "";
                    markHead.className = "";
                    edit.className = "div-now div";
                    comment.className = "div";
                    mark.className = "div";
                };
                commentHead.onclick = function () {
                    editHead.className = "";
                    commentHead.className = "li-now";
                    markHead.className = "";
                    edit.className = "div";
                    comment.className = "div-now div";
                    mark.className = "div";
                };
                markHead.onclick = function () {
                    editHead.className = "";
                    commentHead.className = "";
                    markHead.className = "li-now";
                    edit.className = "div";
                    comment.className = "div";
                    mark.className = "div-now div";
                }
            },


            /**
             * 修订按钮点击事件
             */
            btnEdit_onclick() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
                var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var label = document.getElementById("label");   //  修订信息编辑框标题
                btnCancelEdit.style.visibility = "visible";    //   取消修订按钮显示
                btnConfirmEdit.style.visibility = "visible";    //  确认修订按钮显示
                text.style.visibility = "visible";  //  修订信息编辑框显示
                label.style.visibility = "visible";    //   修订信息编辑框标题显示
                textEdit.contentEditable = true;    //  修订文本可编辑
            },


            /**
             * 取消修订按钮点击事件
             */
            btnCancelEdit_onclick() {
                var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var label = document.getElementById("label");   //  修订信息编辑框标题
                window.location.reload();   //  重新加载
                btnCancelEdit.style.visibility = "hidden";  //  取消修订按钮隐藏
                btnConfirmEdit.style.visibility = "hidden"; //  确认修订按钮隐藏
                text.style.visibility = "hidden";   //  修订信息编辑框隐藏
                label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏
            },


            /**
             * 确认修订按钮点击事件
             */
            btnConfirmEdit_onclick() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
                var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框
                var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮
                var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮
                var label = document.getElementById("label");   //  修订信息编辑框标题
                //  未做修改判断
                if (content == textEdit.innerText) {
                    alert("您未做任何修改！")
                }
                //  未填写修订信息判断
                else if (text.value == "") {
                    alert("請填寫修訂信息！")
                }
                else {
                    btnCancelEdit.style.visibility = "hidden";  //  取消修订按钮隐藏
                    btnConfirmEdit.style.visibility = "hidden";  // 确认修订按钮隐藏
                    text.style.visibility = "hidden";   //  修订信息编辑框隐藏
                    label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏
                    textEdit.contentEditable = false;   //  修订文本不可编辑
                    this.commit = text.innerText;
                    post_update_CM();   //  批量更新批注标记
                    post_edit();    //  修改古籍文本内容请求
                }
            },


            /**
             * 修订记录按钮事件
             */
            editRecord_onclick() {
                this.get_editRecord(pageId);
            },


            /**
             * 批注文本选取添加批注操作
             */
            textComment_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-add-comment").style.visibility = "visible"; //  添加批注按钮显示
                }
                var sel = window.getSelection();
                this.begin_addC = sel.anchorNode.parentNode.id;
                this.end_addC = sel.focusNode.parentNode.id + 1;
            },


            /**
             * 添加批注按钮事件
             */
            btnAddComment_onclick() {
                var btnAddComment = document.getElementById("btn-add-comment");
                btnAddComment.style.visibility = "hidden";  //  添加批注按钮隐藏
                var range = window.getSelection().getRangeAt(0);    //  获得选区
                var span = document.createElement("span");  //  创建span标签
                range.surroundContents(span);   //  为选区添加span标
                this.target_addC = range;
            },


            /**
             * 确认添加批注按钮事件
             */
            btnConfirmAddComment_onclick() {
                var spans = document.getElementById("text-comment").getElementsByTagName("span");   //  获得批注文本中的span标签
                var textareaAddComment = document.getElementById("textarea-addComment");    //  获得添加批注编辑框
                if (textareaAddComment.value.length == 0) { //  判断未编辑批注信息
                    alert("您未生成批註內容！");
                    this.target_addC = '';
                    this.begin_addC = '';
                    this.end_addC = '';
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
                    this.content_addC = textareaAddComment.innerText;
                    post_add_comment();
                    window.location.reload()
                }
            },


            /**
             * 选中标记文本事件
             */
            textMark_onclick() {
                if (window.getSelection().getRangeAt(0).toString().length != 0) {
                    document.getElementById("btn-mark-noumenon").style.visibility = "visible";
                }
                var sel = window.getSelection();
                this.begin_addM = sel.anchorNode.parentNode.id;
                this.end_addM = sel.focusNode.parentNode.id + 1;
                var textMark = document.getElementById("text-mark");
                for (i = 0; i < 5; i++) {
                    var b = textMark.innerText.charAt(this.begin_addM-5+k);
                    this.before += b;
                }
                for (j = 0; j < 5; j++) {
                    var e = textMark.innerText.charAt(this.end_addM+1+m);
                    this.after += e;
                }
            },


            /**
             * 取消添加批注事件
             */
            btnCancelAddComment_onclick() {
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
                this.begin_addM = '';
                this.end_addM = '';
                this.before = '';
                this.after = '';
            },


            /**
             * 标记本体按钮点击事件
             */
            btnMarkNoumenon_onclick() {
                var btnMarkNoumenon = document.getElementById("btn-mark-noumenon");
                btnMarkNoumenon.style.visibility = "hidden";    //  标记本体按钮隐藏
                var range = window.getSelection().getRangeAt(0);    //  获得选区
                var span = document.createElement("span");  //  创建span标签
                range.surroundContents(span);    //  为选区添加span标签
                this.target_addM = range;
            },


            /**
             * 确认取消按钮事件
             */
            btnConfirmDeleteComment_onclick() {
                post_delete_comment();
            },


            /**
             * 添加标记按钮事件
             */
            btnAddMark_onclick() {
                post_add_mark();
                window.location.reload()
            },


            /**
             * 添加本体标记模态框的x按钮事件
             */
            btnCrossCancelAddMark_onclick() {
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
                this.begin_addM = '';
                this.end_addM = '';
                this.before = '';
                this.after = '';
            },


            /**
             * 获得渲染修订版可跟踪文本方法
             * 初始化一个判断变量，依次遍历文本中每个字，并判断该字是否在标记和批注中，对不同情况赋值判断变量
             * 得出不同结果
             */
            getEdit() {
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
                    var textEdit = document.getElementById("text-edit");
                    //该字既不是标记也不是批注
                    if (a == 0) {
                        var text = document.createTextNode(p);
                        textEdit.appendChild(text)
                    }
                    //该字只是标记
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=M" + this.mark[jtemp].id_mark);
                        textEdit.appendChild(span);
                    }
                    //该字只是批注
                    else if (a == 2) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=C" + this.comment[ktemp].id_comment);
                        textEdit.appendChild(span);
                    }
                    //该字既是标记又是批注
                    else if (a == 4) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "id=M" + this.mark[jtemp].id_mark + " id=C" + this.comment[ktemp].id_comment);
                        textEdit.appendChild(span);
                    }
                }
            },


            /**
             * 获得渲染批注版可跟踪文本方法
             * 初始化一个判断变量，逐字遍历确定是否为批注
             */
            getComment() {
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
                    var textComment = document.getElementById("text-comment");
                    //该字不是批注
                    if (a == 0) {
                        var text = document.createTextNode(p);
                        textComment.appendChild(text)
                    }
                    //该字是批注
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "comment id=C" + this.comment[jtemp].id_comment);
                        span.setAttribute("data-toggle", "modal");
                        span.setAttribute("data-target", "#layer-comment-record");
                        textComment.appendChild(span);
                    }
                }
            },


            /**
             * 获得渲染本体标记版可跟踪文本方法
             * 初始化一个判断变量，逐字遍历确定是否为标记
             */
            getMark() {
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
                    var textMark = document.getElementById("text-mark");
                    //该字不是标记
                    if (a == 0) {
                        var text = document.createTextNode(p);
                        textMark.appendChild(text)
                    }
                    //该字是标记
                    else if (a == 1) {
                        var span = document.createElement("span");
                        var text = document.createTextNode(p);
                        span.appendChild(text);
                        span.setAttribute("class", "mark id=M" + this.mark[jtemp].id_mark);
                        textMark.appendChild(span);
                    }
                }
            },





            /**
             * 获得更改标记JSON
             * 将碎片拼接，依次比较对应target，begin，end
             */
            getMarkChange() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
                //遍历标记数组
                for (var i = 0; i < this.mark.length; i++) {
                    //依次获得每条标记碎片文字
                    var marks = document.getElementsByClassName("id=M" + this.mark[i].id_mark);
                    //初始化每条标记内容
                    var text = '';
                    //遍历每条标记中的每个字
                    for (j = 0; j < marks.length; j++) {
                        var markPiece = marks[j].innerText;
                        //拼凑所有字为一条标记
                        text += markPiece;
                    }
                    //获取该条新标记的位置
                    var newBegin = (textEdit.innerText).indexOf(text);
                    var newEnd = newBegin + text.length;
                    var before = '';
                    for (k = 0; k < 5; k++) {
                        var b = textEdit.innerText.charAt(newBegin-5+k);
                        before += b;
                    }
                    var after = '';
                    for (m = 0; m < 5; m++) {
                        var e = textEdit.innerText.charAt(newEnd+1+m);
                        after += e;
                    }
                    //标记被修改创建标记更新数组
                    if (text != this.mark[i].target_mark || newBegin != this.mark[i].begin_mark || newEnd != this.mark[i].end_mark) {
                        marks_modify.push({
                            id: this.mark[i].id_mark,
                            target: text,
                            begin: newBegin,
                            end: newEnd,
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
            getCommentChange() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
                //遍历批注数组
                for (var i = 0; i < this.comment.length; i++) {
                    //依次获得每条批注碎片文字
                    var comments = document.getElementsByClassName("id=C" + this.comment[i].id_comment);
                    //初始化每条批注内容
                    var text = '';
                    //遍历每条批注中的每个字
                    for (j = 0; j < comments.length; j++) {
                        var commentPiece = comments[j].innerText;
                        //拼凑所有字为一条批注
                        text += commentPiece;
                    }
                    //获取该条新批注的位置
                    var newBegin = (textEdit.innerText).indexOf(text);
                    var newEnd = newBegin + text.length;
                    //批注被修改创建批注更新数组
                    if (text != this.comment[i].target_comment || newBegin != this.comment[i].begin_comment || newEnd != this.comment[i].end_comment) {
                        comments_modify.push({
                            id: this.comment[i].id_comment,
                            target: text,
                            begin: newBegin,
                            end: newEnd,
                        })
                    }
                }
            },


            /**
             * 获得删除批注数组
             */
            getCommentDelete() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
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
            getMarkDelete() {
                var textEdit = document.getElementById("text-edit");    //  修订版文本
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

    /*图文对照文字工作台div*/
    #workspace-text{
        width: 500px;
        height: 500px;
        padding: 10px;
        border: 2px lightgray solid;
        position: relative;
    }

    /*图文对照文字工作台li标签（3个版本切换导航栏）*/
    li{
        list-style: none;
        float: right;
        margin: 5px;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        width: 90px;
        text-align: center;
        background-color: lightgray;
        line-height: 30px;
    }

    /*3个版本中选定版本li标签导航栏*/
    #workspace-text-head li.li-now{
        background-color: darkgray;
        color: black;
        font-weight: bold;
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
        left: 50px;
        bottom: 10px;
    }

    /*修订按钮*/
    #btn-edit{
        position: absolute;
        right: 50px;
        bottom: 10px;
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