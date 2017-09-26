<template>
    <div class="ry-ancient-book">

        <!--目录-->
        <div class="width1000 center">
            <p>{{page_info.bu_name}}/{{page_info.lei_name}}/<a style="color: red" @click="go_to_shu()">{{page_info.shu_name}}</a>/<a style="color: red" @click="go_to_book()">{{page_info.name}}</a>/册{{page_info.ce}}{{page_info.book_name}}/卷{{page_info.juan}}</p>
            <img src="../assets/img/no-use-picture/ink-line-long.png" height="7" width="974"/>
        </div>

        <!--按鈕欄-->
        <div class="width1000 center">
            <button class="float-right next-one" @click="next_key">下一处</button>
            <button class="float-right last-one" @click="last_key">上一处</button>
            <input type="text" class="ry-search" placeholder="请输入关键字" v-model="search_key" @change="key_array()">
        </div>

        <!--图文-->
        <div class="width1000 center">

            <!--文本工作台-->
            <div id="workspace-text" class="float-right">

                <!--文本工作台3个版本导航按钮-->
                <div id="workspace-text-head">
                    <ul class="ry-module-bar float-right">
                        <!--class值为空表示未激活板块，class值为li-now表示激活板块-->
                        <li id="mark-head">本体标记</li>
                        <img style="display: block" class="float-right" src="../assets/img/picture-button/screen-button.png" height="31" width="6"/>
                        <li id="comment-head">批注版</li>
                        <img style="display: block" class="float-right" src="../assets/img/picture-button/screen-button.png" height="31" width="6"/>
                        <li id="edit-head" class="li-now">修订版</li>
                    </ul>
                </div>

                <!--文本工作台主体-->
                <div id="workspace-text-body">

                    <!--class值为div表示未激活板块，class值为div-now表示激活板块-->

                    <!--本体标记版块-->
                    <div id="mark" class="div">
                        <!--文本主体-->
                        <p class="body-text" id="text-mark" @click="text_mark_onclick()"></p>
                        <!--本体种类选择菜单-->
                        <select id="ry-select-mark-type" class="ry-select" @click="select_noumenon_type()">
                            <option>全部</option>
                            <option>人物</option>
                            <option>地点</option>
                            <option>职官</option>
                            <option>时间</option>
                            <option>机构</option>
                            <option>术语</option>
                            <option>文献</option>
                        </select>
                        <!--标记本体按钮，选中文本后激活显示，点击弹出标记本体模态框-->
                        <button class="ry-btn-cancel-add-comment" data-toggle="modal" data-target="#layer-mark-noumenon" id="btn-mark-noumenon" style="visibility: hidden" @click="btn_mark_noumenon_onclick()">标记本体</button>
                    </div>

                    <!--批注版块-->
                    <div id="comment" class="div">
                        <!--文本主体-->
                        <div class="body-text" id="text-comment" @click="text_comment_onclick()"></div>
                        <!--添加批注按钮，选中文本后激活显示，点击弹出添加批注模态框-->
                        <button class="ry-btn-cancel-add-comment" id="btn-add-comment" style="visibility: hidden" @click="btn_add_comment_onclick()">添加批注</button>
                    </div>

                    <!--修订板块-->
                    <div id="edit" class="div div-now">
                        <!--文本主体-->
                        <div id="ry-edit-text" class="body-text">{{content}}</div>
                        <br>
                        <br>
                        <br>
                        <!--查看修订记录-->
                        <button class="ry-btn-edit-record" data-toggle="modal" data-target="#layer-edit-record" id="btn-edit-record" @click="edit_record_onclick()">修订记录</button>
                        <button class="ry-btn-edit" id="btn-edit" @click="btn_edit_onclick()">修订</button>
                    </div>
                </div>

                <!--修订记录模态框-->
                <div>
                    <modal :show_modal.sync = "edit_record_modal" @fireclose = "edit_record_modal = false" class="ry-modal-border">
                        <div class="width600 ry-height400 dialog-body ry-scroll" slot="body">
                            <h4 style="text-align: center">修订记录</h4>
                            <div v-for="item in edit_record">
                                <p>修訂者：{{item.username_edit_record}}</p>
                                <p>修訂時間：{{item.time_edit_record}}</p>
                                <p>修訂信息：{{item.commit_edit_record}}</p>
                                <p>修訂版本：{{item.version_edit_record}}</p>
                                <hr>
                            </div>
                            <button class="ry-btn-confirm-edit-record-modal" @click="close_edit_record_modal()">确定</button>
                        </div>
                    </modal>
                </div>

                <!--修订模态框-->
                <div>
                    <modal :show_modal.sync = "edit_modal" @fireclose = "edit_modal = false" class="ry-modal-border">
                        <div class="width600 dialog-body" slot="body">
                            <h4 class="modal-title" style="text-align: center">修订</h4>
                            <div id="text-edit" class="body-text" contentEditable="true"></div>
                            <br>
                            <br>
                            <br>
                            <img src="../assets/img/no-use-picture/ink-line-long.png" height="6" width="600"/>
                            <!--修订信息编辑框标题-->
                            <h5>修订信息:</h5>
                            <!--修订信息编辑框-->
                            <div id="textarea-editInfo" contentEditable="true" style="height: 100px"></div>
                            <button class="ry-btn-confirm-edit-record-modal" @click="btn_confirm_edit_onclick()">确定</button>
                        </div>
                    </modal>
                </div>

                <!--添加批注模态框-->
                <div>
                    <modal :show_modal.sync = "add_comment_modal" @fireclose = "add_comment_modal = false" class="ry-modal-border">
                        <div class="dialog-body" slot="body">
                            <span>选中内容：{{target_add_comment}}</span>
                            <p>添加批注：</p>
                            <textarea id="textarea-addComment"></textarea>
                            <div class="ry-modal-add-comment-box">
                                <input id="check-private" type="checkbox" value="选为私密">选为私密
                                <button class="ry-btn-cancel-add-comment" data-dismiss="modal" @click="btn_cancel_add_comment_onclick()">取消</button>
                                <button class="ry-btn-confirm-add-comment" data-dismiss="modal" @click="btn_confirm_add_comment_onclick()">确定</button>
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
                                <button class="ry-btn-cancel-add-comment float-right" @click="btn_confirm_delete_comment_onclick">删除</button>
                            </div>
                        </div>
                    </modal>
                </div>

                <!--标记本体模态框-->
                <div>
                    <modal :show_modal.sync = "add_mark_modal" @fireclose = "add_mark_modal = false" class="ry-modal-border">
                        <div class="dialog-body" slot="body">
                            本体类型：
                            <select id="ry-noumenon-type-select" class="ry-type-select">
                                <option>人物</option>
                                <option>地点</option>
                                <option>职官</option>
                                <option>时间</option>
                                <option>机构</option>
                                <option>术语</option>
                                <option>文献</option>
                            </select>
                            <input id="ry-noumenon-input" type="text" class="ry-input-search" placeholder="请输入本体名查找"><button class="ry-btn-search-pic" @click="btn_search_noumenon_onclick()"></button>
                            <div class="ry-add-mark-modal-box">
                                <h3 style="margin-top: 80px" v-show="before_search">请在搜索框中输入本体规范名称进行搜索</h3>

                                <!--显示搜索成功的结果-->
                                <div class="zxw-search-success" v-for="(result,index) in search_noumenon_content">
                                    <p class="zxw-search-result">{{result.standard_name}}</p>
                                    <button class="zxw-prebtn zxw-character-add" v-model="index" @click="btn_add_mark_onclick(index)">添加</button>
                                </div>

                                <!--显示搜索失败的结果-->
                                <div class="zxw-fail-tip" v-show="fail_tip">
                                    <p>很抱歉，未搜索到本体：{{noumenon_search_content}}</p>
                                    <p><span class="zxw-search-p-tip">您可以</span>
                                        <button class="zxw-prebtn zxw-search-create" @click="btn_create_noumenon">创建本体</button>
                                    </p>
                                </div>
                            </div>
                            <button class="ry-btn-cancel-add-comment" style="margin-left: 330px;" @click="btn_create_noumenon">创建本体</button>
                            <button class="ry-btn-cancel-add-comment" @click="close_add_mark_modal()">取消</button>
                        </div>
                    </modal>
                </div>


            </div>

            <!--图片工作台-->
            <div>
                <div class="float-right ry-hide-picture"><img src="../assets/img/picture-button/more.png" height="130" width="29"/></div>
                <div class="ry-picture-work"><img id="ry-picture-work" style="height:470px; width: 470px;"/></div>
            </div>
        </div>

        <!--目录模态框-->
        <div>
            <modal :show_modal.sync = "catalogue_modal" @fireclose = "catalogue_modal = false" class="ry-modal-border ry-modal-menu">
                <div class="dialog-body" slot="body">
                    <div v-for="(item,index) in book_all_info.catalogue">
                        <div>册{{item.book_count}}{{item.book_name}}</div>
                        <div>
                            <a class="ry-menu" v-for="volume in book_all_info.catalogue[index].volume" @click="go_to(item.book_count,volume.volume_count,volume.begin_page)">卷{{volume.volume_count}}</a>
                        </div>
                    </div>
                </div>
            </modal>
        </div>

        <!--底按鈕欄-->
        <div class="width1000 center">
            <img src="../assets/img/no-use-picture/ink-line-long.png" height="4" width="974"/>
            <div class="ry-bottom-bar">
                <page_button class="float-right" :max=this.total_page></page_button>
                <button class="ry-btn-menu" @click="catalogue_onclick()">目录</button>
            </div>
        </div>

    </div>
</template>



<script type="text/javascript">
    import modal from  '../component/modal.vue'
    import page_button from '../component/paginator.vue'
    export default{
        components:{
            modal,
            page_button
        },

        data() {
            return{
                search_key : '',
                now_index : 0,
                key_position : [],
                //  本体标记模态框
                before_search : true,
                fail_tip:false,

                add_comment_modal : false,
                get_comment_modal : false,
                add_mark_modal : false,
                catalogue_modal : false,
                edit_record_modal : false,
                edit_modal : false,
                now_target : '',
                now_content : '',

                get_content_obj : {},
                content : '',
                book : 1,
                volume : 1,
                page : 1,
                page_bind : 1,
                total_page : 1,
                ancient_book_id : '',
                page_id : '',
                page_info : {},
                book_all_info : {},

                get_comment_obj : {},
                comment : [],
                id_comment : '',
                target_comment : '',
                begin_comment : '',
                end_comment : '',
                content_comment : '',

                get_mark_obj : {},
                mark : [],

                get_edit_record_obj : {},
                page_count_edit_record : 1,
                edit_record : [],
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
                page_count_search_noumenon : 1,
                noumenon_search_url : '',
                total_page_search_noumenon : 0,
                search_noumenon_content : [],
            }
        },

        watch:{
            $route(){
                this.ancient_book_id = this.$route.params.book_name;
                this.page = this.$route.params.pageId;
                this.volume = this.$route.params.volume;
                this.book = this.$route.params.book;

                for (var i = 0; i < this.book_all_info.catalogue.length; i++){
                    for (var j = 0; j < this.book_all_info.catalogue[i].volume.length; j++){
                        var key = 0;
                        if (this.book_all_info.catalogue[i].volume[j + 1]){
                            if (this.page >= this.book_all_info.catalogue[i].volume[j].begin_page && this.page < this.book_all_info.catalogue[i].volume[j + 1].begin_page){
                                this.volume = this.book_all_info.catalogue[i].volume[j].volume_count;
                                this.$router.push({name:'ancientbook',params:{
                                    book_name : this.ancient_book_id,
                                    book : this.book,
                                    volume : this.volume,
                                    pageId : this.page
                                }});
                                this.get_page_id();
                                this.get_ancient_books_all_info();
                                key = 1;
                                break;
                            }
                        }

                        else{
                            if (!this.book_all_info.catalogue[i + 1]){
                                this.volume = this.book_all_info.catalogue[i].volume[j].volume_count;
                                this.book = i + 1;
                                this.$router.push({name:'ancientbook',params:{
                                    book_name : this.ancient_book_id,
                                    book : this.book,
                                    volume : this.volume,
                                    pageId : this.page
                                }});
                                this.get_page_id();
                                this.get_ancient_books_all_info();
                                key = 1;
                                break;
                            }
                            else{
                                if (this.page >= this.book_all_info.catalogue[i].volume[j].begin_page && this.page < this.book_all_info.catalogue[i + 1].volume[0].begin_page){
                                    this.volume = j + 1;
                                    this.book = i + 1;
                                    this.$router.push({name:'ancientbook',params:{
                                        book_name : this.ancient_book_id,
                                        book : this.book,
                                        volume : this.volume,
                                        pageId : this.page
                                    }});
                                    this.get_page_id();
                                    this.get_ancient_books_all_info();
                                    key = 1;
                                    break;
                                }
                            }
                        }
                    }
                    if (key == 1){
                        break;
                    }
                }
            }
        },

        created : function () {
            this.book = this.$route.params.book;
            this.volume = this.$route.params.volume;
            this.page = this.$route.params.pageId;
            this.ancient_book_id = this.$route.params.book_name;
            this.get_page_id();
            this.get_ancient_books_all_info();
        },

        mounted : function () {
            this.change_module();
        },

        methods: {
            /**
             * 获取page_id
             */
            get_page_id() {
                var url = '/ancient_books/get_page_id_by_jcy.action?book=' + this.book + '&&volume=' + this.volume + '&&page=' + this.page + '&&ancient_book_id=' + this.ancient_book_id;
                var get_page_id = '';
                this.http_json (url , 'get' , get_page_id , this.success_get_page_id , this.fail_get_page_id);
            },

            success_get_page_id(response) {
                this.page_id = response.body.id;
                this.get_page_info();
                this.get_picture();
                this.get_comment();
            },

            fail_get_page_id() {
                console.log("fail get page_id!");
            },


            /**
             * 获取部类属卷册页
             */
            get_page_info() {
                var url = '/ancient_books/get_page_by_id.action?page_id=' + this.page_id;
                var get_obj = '';
                this.http_json (url , 'get' , get_obj , this.success_get_page_info , this.fail_get_page_info)
            },

            success_get_page_info(response) {
                this.page_info = response.body;
            },

            fail_get_page_info() {
                console.log("fail get page_info!");
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
                    this.total_page = response.body.total_page;
                }
            },

            fail_get_ancient_books_all_info() {
                console.log ("fail get books all info!");
            },


            /**
             * 获取图片内容请求
             */
            get_picture() {
                var img = document.getElementById("ry-picture-work");
                if (img.src){
                    img.removeAttribute("src")
                }
                let url = '/ancient_books/get_picture_by_id.action?page_id=' + this.page_id;
                img.src = url;
            },


            /**
             * 获取文本内容请求
             */
            get_text() {
                var url = '/ancient_books/get_text.action?page_id=' + this.page_id;
                this.http_json (url , 'get' , this.get_content_obj , this.success_get_text , this.fail_get_text);
            },

            success_get_text (response) {
                console.log ("success get contents");
                //将后端数据显示在前端页面里
                if (response.body.content.length === 0) {
                    console.log("没有返回文本");
                    document.getElementById("text-comment").innerHTML = '';
                    document.getElementById("text-mark").innerHTML = '';
                    document.getElementById("ry-edit-text").innerHTML = '';
                }
                else {
                    this.content = response.body.content;
                    this.get_edit();
                    this.renew_mark();
                    this.renew_comment();
                }
            },

            fail_get_text() {
                console.log("fail get contents!");
            },


            /**
             * 获取一页批注信息请求
             */
            get_comment() {
                var url = '/ancient_books/get_comment_list_by_page_id.action?page_id=' + this.page_id;
                this.http_json (url , 'get' , this.get_comment_obj , this.success_get_comment , this.fail_get_comment);
            },

            success_get_comment(response) {
                console.log("success get comments");
                for (var i = 0; i <= response.body.length - 1; i++) {
                    this.comment.push({
                        id_comment: response.body[i].id,
                        target_comment: response.body[i].target,
                        begin_comment: response.body[i].begin,
                        end_comment: response.body[i].end,
                        content_comment: response.body[i].content,
                    });
                }
                this.get_mark();
            },

            fail_get_comment() {
                console.log("fail get comments!");
            },


            /**
             * 获取一页标记信息请求
             */
            get_mark() {
                var url = '/ancient_books/get_mark_list_by_page_id.action?page_id=' + this.page_id;
                this.http_json (url , 'get' , this.get_mark_obj , this.success_get_mark , this.fail_get_mark);
            },

            success_get_mark(response) {
                console.log("success get marks ");
                for (var i = 0; i <= response.body.length - 1; i++) {
                    this.mark.push({
                        id_mark: response.body[i].id,
                        noumenon_type: response.body[i].noumenon_type,
                        noumenon_id: response.body[i].noumenon_id,
                        begin_mark: response.body[i].begin,
                        end_mark: response.body[i].end,
                        target_mark: response.body[i].target,
                    });
                }
                this.get_text();

            },

            fail_get_mark() {
                console.log("fail get marks!");
            },


            /**
             * 通过属名称跳转到输的内容
             */
            go_to_shu(){
                this.$route.params.bu_id = this.page_info.bu;
                this.$route.params.lei_id = this.page_info.lei;
                this.$route.params.shu_id = this.page_info.shu;
                this.$route.params.bu = this.page_info.bu_name;
                this.$route.params.lei = this.page_info.lei_name;
                this.$route.params.shu = this.page_info.shu_name;
                this.$route.params.pageId = 1;
                this.$router.push({name:'sort_book',params: this.$route.params})
            },


            /**
             * 通过古籍名称跳转到古籍目录页
             */
            go_to_book(){
                this.$router.push({name:'book_info',params:{
                    ancient_book_id : this.ancient_book_id
                }})
            },


            /**
             * 获得每页的修订记录列表
             */
            get_edit_record() {
                this.edit_record = [];
                var url = '/ancient_books/get_ancient_book_modify_log_by_page.action?page_id=' + this.page_id + '&&page_count=' +this.page_count_edit_record;
                this.http_json (url , 'get' , this.get_edit_record_obj , this.success_get_edit_record , this.fail_get_edit_record);
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
             * 添加本体标记搜索本体
             */
            get_noumenon_search() {
                var url = this.noumenon_search_url + '?name=' + this.noumenon_search_content + '&&page_count=' + this.page_count_search_noumenon;
                this.http_json (url , 'get' , this.noumenon_search_obj , this.success_get_noumenon_search , this.fail_get_noumenon_search);
            },

            success_get_noumenon_search(response) {
                console.log ("success get noumenon search ");
                //将后端数据显示在前端页面里
                if (response.body.content.length !== 0) {
                    this.total_page_search_noumenon = response.body.total_page;
                    for (var i = 0; i <= response.body.content.length-1; i++) {
                        this.search_noumenon_content.push({
                            standard_name: response.body.content[i].standard_name,
                            type_id: response.body.content[i].type_id,
                            noumenon_id: response.body.content[i].noumenon_id,
                        });
                    }
                }
                else {
                    this.fail_tip = true;
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
                this.http_json('/ancient_books/modify_page_content.action' , 'post' , this.edit_text_obj , this.success_post_edit , this.fail_post_edit);
            },

            success_post_edit(response) {
                if (response.body.result === 1) {
                    console.log ("success edit!");
                    alert("成功修订");
                    this.get_page_id();   //  重新加载
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
                this.update_cm_obj.comments_delete = this.comments_delete;
                this.update_cm_obj.comments_modify = this.comments_modify;
                this.update_cm_obj.marks_delete = this.marks_delete;
                this.update_cm_obj.marks_modify = this.marks_modify;
                this.http_json('/ancient_books/update_marks_comment.action' , 'post' , this.update_cm_obj , this.success_update_cm , this.fail_update_cm);
            },

            success_update_cm(response) {
                if (response.body.result === 1) {
                    console.log("success update CM!");
                    this.post_edit();    //  修改古籍文本内容请求
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
                this.http_json('/ancient_books/add_comment.action' , 'post' , this.add_comment_obj , this.success_add_comment , this.fail_add_comment);
            },

            success_add_comment(response) {
                if (response.body.result === 1) {
                    console.log("success add comment!");
                    alert("成功添加批注");
                    this.get_page_id();
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
                this.http_json('/ancient_books/add_mark.action' , 'post' , this.add_mark_obj , this.success_add_mark , this.fail_add_mark);
            },

            success_add_mark(response) {
                if (response.body.result === 1) {
                    console.log("success add mark!");
                    alert("成功添加标记");
                    this.get_page_id();
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
                this.http_json('/ancient_books/delete_mark.action' , 'post' , this.delete_mark_obj , this.success_delete_mark , this.fail_delete_mark);
            },

            success_delete_mark(response) {
                if (response.body.result === 1) {
                    console.log("success delete mark!");
                    alert("成功删除标记");
                    this.get_page_id();
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
                this.http_json('/ancient_books/delete_comment.action' , 'post' , this.delete_comment_obj , this.success_delete_comment , this.fail_delete_comment);
            },

            success_delete_comment(response) {
                if (response.body.result === 1) {
                    console.log("success delete comment!");
                    alert("成功删除批注");
                    this.get_page_id();
                }
            },

            fail_delete_comment() {
                console.log("fail delete comment!");
            },


            /**
             * 关键字检索
             */
            key_array() {
                this.key_position = [];
                this.key_position_comment = [];
                this.key_position_mark = [];
                if(this.search_key != '') {
                    var pos = this.content.indexOf(this.search_key);
                    while (pos > -1) {
                        this.key_position.push(pos);
                        this.key_position_comment.push(pos);
                        this.key_position_mark.push(pos);
                        pos = this.content.indexOf(this.search_key , pos + 1);
                    }
                    this.renew_text();
                    this.renew_text_comment();
                    this.renew_text_mark();
                }
                else if(this.search_key == '') {
                    this.renew_text();
                    this.renew_text_comment();
                    this.renew_text_mark();
                }
            },

            renew_text() {
                var length = this.search_key.length;
                var div = document.getElementById("ry-edit-text");
                div.innerText = '';

                //文本逐字遍历
                for (var i = 0; i < this.content.length; i++) {
                    //按顺序依次获得文本中的字
                    var p = this.content.charAt(i);

                    //该字在搜索关键字中
                    if (i >= this.key_position[this.now_index] && i < this.key_position[this.now_index] + length) {
                        var span1 = document.createElement("span");
                        var text1 = document.createTextNode(p);
                        span1.appendChild(text1);
                        span1.setAttribute("class", "ry-search-key");
                        div.appendChild(span1);
                    }

                    //该字不在搜索关键字中
                    else{
                        var span2 = document.createElement("span");
                        var text2 = document.createTextNode(p);
                        span2.appendChild(text2);
                        div.appendChild(span2);
                    }
                }
            },

            renew_text_comment() {
                var comment = document.getElementById("text-comment");
                comment.innerHTML = '';
                this.renew_comment();
                var length = this.search_key.length;
                var comment_text = document.getElementsByClassName("ry-comment-text");

                //文本逐字遍历
                for (var i = 0; i < comment_text.length; i++) {
                    //该字在搜索关键字中
                    if (i >= this.key_position[this.now_index] && i < this.key_position[this.now_index] + length) {
                        comment_text[i].setAttribute("style","color: red")
                    }
                }
            },

            renew_text_mark() {
                var mark = document.getElementById("text-mark");
                mark.innerHTML = '';
                this.renew_mark();
                var length = this.search_key.length;
                var mark_text = mark.getElementsByTagName("span");

                //文本逐字遍历
                for (var i = 0; i < mark_text.length; i++) {
                    //该字在搜索关键字中
                    if (i >= this.key_position[this.now_index] && i < this.key_position[this.now_index] + length) {
                        mark_text[i].setAttribute("style","color: red")
                    }
                }
            },

            last_key() {
                if (this.now_index == 0) {
                    alert("这是第一处")
                }
                else{
                    this.now_index = this.now_index - 1;
                    this.renew_text();
                    this.renew_text_comment();
                    this.renew_text_mark()
                }
            },

            next_key(){
                if (this.now_index == this.key_position.length - 1) {
                    alert("这是最后一处")
                }
                else{
                    this.now_index = this.now_index + 1;
                    this.renew_text();
                    this.renew_text_comment();
                    this.renew_text_mark()
                }
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
                this.$store.commit('change_fork',true);
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
                    this.edit_modal = false;
                }
            },


            /**
             * 修订记录按钮事件
             */
            edit_record_onclick() {
                this.get_edit_record();
                this.edit_record_modal = true;
                this.$store.commit('change_fork',true);
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
                    var begin = sel.anchorNode.parentNode.id;
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
                            this.$store.commit('change_fork',true);
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
                this.$store.commit('change_fork',true);
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
                }
                this.add_comment_modal = false;
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
                this.post_delete_comment();
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
                    var begin = sel.anchorNode.parentNode.id;
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
                else if (window.getSelection().getRangeAt(0).toString().length == 0) {
                    var cli = window.getSelection().focusNode.parentNode.id;
                    var click = parseInt(cli)+1;
                    for (var k = 0; k < this.mark.length; k++) {
                        //该点击节点不在该条标记内
                        if (click <= this.mark[k].begin_mark || click > this.mark[k].end_mark) {
                            continue;
                        }
                        //该点击在该条标记内
                        if (click > this.mark[k].begin_mark && click <= this.mark[k].end_mark) {
                            if (this.mark[k].noumenon_type == 1){
                                this.$router.push({name:'char_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 2){
                                this.$router.push({name:'lit_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 3){
                                this.$router.push({name:'terms_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 4){
                                this.$router.push({name:'time_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 5){
                                this.$router.push({name:'off_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 6){
                                this.$router.push({name:'ins_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            else if (this.mark[k].noumenon_type == 7){
                                this.$router.push({name:'pla_detail',params:{
                                    nouId:this.mark[k].noumenon_id
                                }})
                            }
                            break;
                        }
                    }
                }
            },


            /**
             * 标记本体按钮点击事件
             */
            btn_mark_noumenon_onclick() {
                this.add_mark_modal = true;
                this.$store.commit('change_fork',true);
                this.$store.commit('change_fork',true);
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
                this.get_noumenon_search();
                this.before_search = false;
            },

            /**
             * 标记本体模态框
             */
            close_add_mark_modal() {
                this.search_content = '';
                this.search_result.splice(0,this.search_result.length);
                this.before_search = false;
            },


            btn_create_noumenon() {
                this.$store.commit("get_create_one_selection",2);
                this.$router.push({path: '/build'});
            },

            /**
             * 添加标记按钮事件
             */
            btn_add_mark_onclick(index) {
                this.noumenon_type = this.search_noumenon_content[index].type_id;
                this.noumenon_id = this.search_noumenon_content[index].noumenon_id;
                this.post_add_mark();
                this.add_mark_modal = false;
            },


            /**
             * 目录按钮
             */
            catalogue_onclick() {
                this.catalogue_modal = true;
                this.$store.commit('change_fork',true);
            },

            go_to(book,volume,page) {
                this.$router.push({name:'ancientbook',params:{
                    book_name:this.ancient_book_id,
                    book:book,
                    volume:volume,
                    pageId:page
                }})
            },


//            /**
//             * 上一页按钮
//             */
//            last_page() {
//                if (this.page_bind = 1) {
//                    alert("这是第一页")
//                }
//                else if (this.page_bind = this.total_page) {
//                    alert("这是最后一页")
//                }
//                else{
//                    this.page = this.page - 1;
//                    this.page_bind = this.page_bind - 1;
//                    this.get_page_id();
//                    this.get_picture();
//                    this.get_text();
//                    this.get_edit();
//                    this.renew_mark();
//                    this.renew_comment();
//                }
//            },
//
//            /**
//             * 下一页按钮
//             */
//            next_page() {
//
//            },




            /**
             * 获得渲染修订版可跟踪文本方法
             * 初始化一个判断变量，依次遍历文本中每个字，并判断该字是否在标记和批注中，对不同情况赋值判断变量
             * 得出不同结果
             */
            get_edit() {
                var a = 0;
                var text_edit = document.getElementById("text-edit");
                text_edit.innerHTML = '';
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
                    //该字既不是标记也不是批注
                    if (a == 0) {
                        var span1 = document.createElement("span");
                        var text1 = document.createTextNode(p);
                        span1.appendChild(text1);
                        span1.setAttribute("id", "e" + i);
                        text_edit.appendChild(span1)
                    }
                    //该字只是标记
                    else if (a == 1) {
                        var span2 = document.createElement("span");
                        var text2 = document.createTextNode(p);
                        span2.appendChild(text2);
                        span2.setAttribute("id", "e" + i);
                        span2.setAttribute("class", "id=M" + this.mark[jtemp].id_mark);
                        text_edit.appendChild(span2);
                    }
                    //该字只是批注
                    else if (a == 2) {
                        var span3 = document.createElement("span");
                        var text3 = document.createTextNode(p);
                        span3.appendChild(text3);
                        span3.setAttribute("id", "e" + i);
                        span3.setAttribute("class", "id=C" + this.comment[ktemp].id_comment);
                        text_edit.appendChild(span3);
                    }
                    //该字既是标记又是批注
                    else if (a == 4) {
                        var span4 = document.createElement("span");
                        var text4 = document.createTextNode(p);
                        span4.appendChild(text4);
                        span4.setAttribute("id", "e" + i);
                        span4.setAttribute("class", "id=M" + this.mark[jtemp].id_mark + " id=C" + this.comment[ktemp].id_comment);
                        text_edit.appendChild(span4);
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
                var text_comment = document.getElementById("text-comment");
                text_comment.innerHTML = '';
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
                    //该字不是批注
                    if (a == 0) {
                        var span1 = document.createElement("span");
                        var text1 = document.createTextNode(p);
                        span1.appendChild(text1);
                        span1.setAttribute("id", i);
                        span1.setAttribute("class", "ry-comment-text");
                        text_comment.appendChild(span1);
                    }
                    //该字是批注
                    else if (a == 1) {
                        var span2 = document.createElement("span");
                        var text2 = document.createTextNode(p);
                        span2.appendChild(text2);
                        span2.setAttribute("id", i);
                        span2.setAttribute("class", "ry-comment ry-comment-text id=C" + this.comment[jtemp].id_comment);
                        text_comment.appendChild(span2);
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
                var text_mark = document.getElementById("text-mark");
                text_mark.innerHTML = '';
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
                        var has = span.hasAttribute("class");
                        if (index == 0 && has == true) {
                            span.setAttribute("class", "ry-mark id=M" + this.mark[jtemp].id_mark + " " + this.mark[jtemp].noumenon_type);
                        }
                        else if (index == this.mark[jtemp].noumenon_type && has == true) {
                            span.setAttribute("class", "ry-mark id=M" + this.mark[jtemp].id_mark + " " + this.mark[jtemp].noumenon_type);
                        }
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
                var text = '';
                var before_text = '';
                var before = '';
                var after = '';
                for (var i = 0; i < this.mark.length; i++) {
                    //依次获得每条标记碎片文字
                    var marks = text_edit.getElementsByClassName("id=M" + this.mark[i].id_mark);
                    if (marks.length != 0) {
                        //初始化每条标记内容
                        text = '';
                        var id = marks[0].getAttribute("id");
                        var index1 = id.charAt(1);
                        var index2 = id.charAt(2);
                        var index3 = id.charAt(3);
                        var index4 = id.charAt(4);
                        var index5 = id.charAt(5);
                        var str = index1 + index2 + index3 + index4 + index5;
                        var index = parseInt(str);
                        //遍历每条标记中的每个字
                        for (var j = 0; j < marks.length; j++) {
                            var mark_piece = marks[j].innerText;
                            //拼凑所有字为一条标记
                            text += mark_piece;
                        }
                        //获取该条新标记的位置
                        before_text = '';
                        for (var k = 0; k < index; k++) {
                            var node = document.getElementById("e" + k);
                            if (node) {
                                var piece = node.innerText;
                                before_text += piece;
                            }
                        }
                        var new_begin = before_text.length;
                        var new_end = new_begin + text.length;
                        before = '';
                        for (var n = 0; n < 5; n++) {
                            var b = text_edit.innerText.charAt(new_begin-5+n);
                            before += b;
                        }
                        after = '';
                        for (var m = 0; m < 5; m++) {
                            var e = text_edit.innerText.charAt(new_end+m);
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
                            });
                        }
                    }
                    if (marks.length == 0) {
                        this.marks_delete.push({
                            id: this.mark[i].id_mark
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
                var text = '';
                var before_text = '';
                for (var i = 0; i < this.comment.length; i++) {
                    //依次获得每条批注碎片文字
                    var comments = text_edit.getElementsByClassName("id=C" + this.comment[i].id_comment);
                    if (comments.length != 0) {
                        //初始化每条批注内容
                        text = '';
                        var id = comments[0].getAttribute("id");
                        var index1 = id.charAt(1);
                        var index2 = id.charAt(2);
                        var index3 = id.charAt(3);
                        var index4 = id.charAt(4);
                        var index5 = id.charAt(5);
                        var str = index1 + index2 + index3 + index4 + index5;
                        var index = parseInt(str);
                        //遍历每条批注中的每个字
                        for (var j = 0; j < comments.length; j++) {
                            var comment_piece = comments[j].innerText;
                            //拼凑所有字为一条批注
                            text += comment_piece;
                        }
                        //获取该条新标记的位置
                        before_text = '';
                        for (var k = 0; k < index; k++) {
                            var node = document.getElementById("e" + k);
                            if (node) {
                                var piece = node.innerText;
                                before_text += piece;
                            }
                        }
                        var new_begin = before_text.length;
                        var new_end = new_begin + text.length;
                        //标记被修改创建标记更新数组
                        if (text != this.comment[i].target_comment || new_begin != this.comment[i].begin_comment || new_end != this.comment[i].end_comment) {
                            this.comments_modify.push({
                                id: this.comment[i].id_comment,
                                target: text,
                                begin: new_begin,
                                end: new_end,
                            });
                        }
                    }
                    if (comments.length == 0) {
                        this.comments_delete.push({
                            id: this.comment[i].id_comment
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
        background-image: url("../assets/img/button/add-button.png");
    }
    
    .last-one{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
    }
    
    .ry-search{
        width: 232px;
        height: 50px;
        margin-left: 550px;
        padding-left: 20px;
        background-image: url("../assets/img/modal-box/search-input.png");
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
        background-image: url("../assets/img/picture-button/drop-box.png");
    }

    .ry-btn-menu{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
    }

    .ry-btn-go{
        color: white;
        width: 45px;
        height: 44px;
        background-image: url("../assets/img/button/go.png");
    }

    .ry-btn-last-page{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
    }

    .ry-btn-next-page{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
    }

    .ry-btn-edit{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
    }

    .ry-btn-edit-record{
        color: white;
        width: 103px;
        height: 44px;
        background-image: url("../assets/img/button/add-button.png");
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
        background-image: url("../assets/img/button/add-button.png");
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
        background-image: url("../assets/img/picture-button/screen-button.png");
    }

    .ry-btn-cancel-add-comment{
        width: 80px;
        height: 35px;
        background-image: url("../assets/img/button/delete-button.png");
    }

    .ry-btn-confirm-add-comment{
        width: 80px;
        height: 35px;
        background-image: url("../assets/img/button/delete-button.png");
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
        background-image: url("../assets/img/modal-box/search-input-black.png");
    }

    .ry-type-select{
        width: 82px;
        height: 36px;
        border: none;
        padding-left: 4px;
        background-image: url("../assets/img/picture-button/drop-box.png");
    }

    .ry-btn-search-pic{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-size: 100%;
        background-image: url("../assets/img/picture-button/magnifier.png");
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
        background-image: url("../assets/img/button/add-button.png");
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
        margin-top: 100px;
    }

    /*修订记录&批注内容编辑框*/
    .ry-ancient-book textarea{
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

    .ry-picture-work{
        width: 470px;
        height: 470px;
        background-size: 100%;
    }

    .ry-modal-menu{
        width: 450px;
        background-color: white;
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

    .ry-search-key{
        color: red;
    }

    .ry-scroll{
        overflow: auto;
    }

    .ry-height400{
        height: 400px;
    }
</style>