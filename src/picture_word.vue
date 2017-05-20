<!--<template>-->
    <!--&lt;!&ndash;图文对照文本工作台&ndash;&gt;-->
    <!--<div id="workspace-text">-->

        <!--&lt;!&ndash;文本工作台3个版本导航按钮&ndash;&gt;-->
        <!--<div id="workspace-text-head">-->
            <!--<ul>-->
                <!--&lt;!&ndash;class值为空表示未激活板块，class值为li-now表示激活板块&ndash;&gt;-->
                <!--<li>本體標記</li>-->
                <!--<li>批註版</li>-->
                <!--<li class="li-now">修訂版</li>-->
            <!--</ul>-->
        <!--</div>-->

        <!--&lt;!&ndash;文本工作台主体&ndash;&gt;-->
        <!--<div id="workspace-text-body">-->

            <!--&lt;!&ndash;class值为div表示未激活板块，class值为div-now表示激活板块&ndash;&gt;-->

            <!--&lt;!&ndash;本体标记版块&ndash;&gt;-->
            <!--<div class="div">-->
                <!--&lt;!&ndash;文本标题&ndash;&gt;-->
                <!--<h4>詩經卷一</h4>-->
                <!--&lt;!&ndash;文本主体&ndash;&gt;-->
                <!--<p class="body-text" id="text-mark" @click="textMark_onclick()"></p>-->
                <!--&lt;!&ndash;本体种类选择菜单&ndash;&gt;-->
                <!--<select id="select-markType">-->
                    <!--<option>篩選</option>-->
                    <!--<option>人物</option>-->
                    <!--<option>地點</option>-->
                    <!--<option>職官</option>-->
                    <!--<option>時間</option>-->
                    <!--<option>機構</option>-->
                    <!--<option>術語</option>-->
                    <!--<option>文獻</option>-->
                <!--</select>-->
                <!--&lt;!&ndash;标记本体按钮，选中文本后激活显示，点击弹出标记本体模态框&ndash;&gt;-->
                <!--<button class="btn btn-info" data-toggle="modal" data-target="#layer-mark-noumenon" id="btn-mark-noumenon" style="visibility: hidden" @click="btnMarkNoumenon_onclick()">標記本體</button>-->
            <!--</div>-->

            <!--&lt;!&ndash;批注版块&ndash;&gt;-->
            <!--<div class="div">-->
                <!--&lt;!&ndash;文本标题&ndash;&gt;-->
                <!--<h4>詩經卷一</h4>-->
                <!--&lt;!&ndash;文本主体&ndash;&gt;-->
                <!--<div class="body-text" id="text-comment" @click="textComment_onclick()"></div>-->
                <!--&lt;!&ndash;添加批注按钮，选中文本后激活显示，点击弹出添加批注模态框&ndash;&gt;-->
                <!--<button class="btn btn-info" data-toggle="modal" data-target="#layer-add-comment" id="btn-add-comment" style="visibility: hidden" @click="btnAddComment_onclick()">添加批註</button>-->
            <!--</div>-->

            <!--&lt;!&ndash;修订板块&ndash;&gt;-->
            <!--<div class="div div-now">-->
                <!--&lt;!&ndash;文本标题&ndash;&gt;-->
                <!--<h4>詩經卷一</h4>-->
                <!--&lt;!&ndash;文本主体&ndash;&gt;-->
                <!--<div class="body-text" id="text-edit" contentEditable="false"></div>-->
                <!--<br>-->
                <!--<br>-->
                <!--<br>-->
                <!--&lt;!&ndash;修订信息编辑框标题&ndash;&gt;-->
                <!--<h5 id="label" style="visibility: hidden">請填寫修訂信息:</h5>-->
                <!--&lt;!&ndash;修订信息编辑框&ndash;&gt;-->
                <!--<textarea id="textarea-editInfo" style="visibility: hidden"></textarea>-->
                <!--&lt;!&ndash;点击修订后弹出的按钮&ndash;&gt;-->
                <!--<button id="btn-cancel-edit" class="btn btn-danger" style="visibility: hidden" @click="btnCancelEdit_onclick()">取消</button>-->
                <!--<button id="btn-confirm-edit" class="btn btn-success" style="visibility: hidden" @click="btnConfirmEdit_onclick()">確定</button>-->
                <!--&lt;!&ndash;查看修订记录&ndash;&gt;-->
                <!--<button class="btn btn-primary" data-toggle="modal" data-target="#layer-edit-record" id="btn-edit-record">修訂記錄</button>-->
                <!--<button class="btn btn-info" id="btn-edit" @click="btnEdit_onclick()">修訂</button>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;修订记录模态框&ndash;&gt;-->
        <!--<div role="dialog" class="modal fade bs-example-modal-sm" id="layer-edit-record">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal">-->
                            <!--<span>&times;</span>-->
                        <!--</button>-->
                        <!--<h4 class="modal-title">修訂記錄</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body text-tight">-->
                        <!--<div>-->
                            <!--<p>修訂者：</p>-->
                            <!--<p>修訂時間：</p>-->
                            <!--<p>修訂信息：</p>-->
                            <!--<p>修訂版本：</p>-->
                            <!--<hr>-->
                        <!--</div>-->
                        <!--<button class="btn btn-success btn-sm" data-dismiss="modal">確定</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;添加批注模态框&ndash;&gt;-->
        <!--<div role="dialog" class="modal fade bs-example-modal-sm" id="layer-add-comment">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<h4 class="modal-title">選中內容：示例文本</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body text-tight">-->
                        <!--<p>添加批註：</p>-->
                        <!--<textarea id="textarea-addComment"></textarea>-->
                        <!--<br>-->
                        <!--<input type="checkbox" value="選為私密">選為私密-->
                        <!--<br>-->
                        <!--<br>-->
                        <!--<button class="btn btn-warning btn-sm" data-dismiss="modal" id="btn-cancel-add-comment" @click="btnCancelAddComment_onclick()">取消</button>-->
                        <!--<button class="btn btn-success btn-sm" data-dismiss="modal" id="btn-confirm-add-comment" @click="btnConfirmAddComment_onclick()">確定</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;查看批注模态框&ndash;&gt;-->
        <!--<div role="dialog" class="modal fade bs-example-modal-sm" id="layer-comment-record">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal">-->
                            <!--<span>&times;</span>-->
                        <!--</button>-->
                        <!--<h4 class="modal-title">批註內容</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body text-tight">-->
                        <!--<table class="table table-bordered table-hover">-->
                            <!--<tr class="text-left">-->
                                <!--<td></td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td class="text-right">-->
                                    <!--<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#layer-delete">删除</button>-->
                                <!--</td>-->
                            <!--</tr>-->
                        <!--</table>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;标记本体模态框&ndash;&gt;-->
        <!--<div role="dialog" class="modal fade bs-example-modal-sm" id="layer-mark-noumenon">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button id="btn-cross-cancelAddMark" type="button" class="close" data-dismiss="modal" @click="btnCrossCancelAddMark_onclick()">-->
                            <!--&times;-->
                        <!--</button>-->
                    <!--</div>-->
                    <!--<div class="modal-body text-tight">-->
                        <!--本體類型：-->
                        <!--<select>-->
                            <!--<option>篩選</option>-->
                            <!--<option>人物</option>-->
                            <!--<option>地點</option>-->
                            <!--<option>職官</option>-->
                            <!--<option>時間</option>-->
                            <!--<option>機構</option>-->
                            <!--<option>術語</option>-->
                            <!--<option>文獻</option>-->
                        <!--</select>-->
                        <!--<input type="text"><button>搜索</button>-->
                        <!--<button class="btn btn-info btn-sm" data-dismiss="modal" id="btn-add-mark" @click="btnAddMark_onclick() ">添加</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash;删除确认模态框&ndash;&gt;-->
        <!--<div role="dialog" class="modal fade bs-example-modal-sm" id="layer-delete">-->
            <!--<div class="modal-dialog">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal">-->
                            <!--<span>&times;</span>-->
                        <!--</button>-->
                        <!--<h4 class="modal-title">确认删除吗</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body text-tight">-->
                        <!--<button class="btn btn-default btn-sm" data-dismiss="modal">取消</button>-->
                        <!--<button id="btn-confirm-cancel" class="btn btn-danger btn-sm" data-dismiss="modal" @click="btnConfirmCancel_onclick()">确认</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->



<!--<script type="text/javascript">-->
    <!--export default{-->

<!--//        data(){-->
<!--//            return{-->
<!--//                rangeString : "",   //  选区所在节点字符串初始化-->
<!--//                a : 0,  //  选区第一个节点位置-->
<!--//                b : 0,  //  选区最后一个节点位置-->
<!--//                //后端传回JSON-->
<!--//-->
<!--//                //文本内容-->
<!--//                content : "蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。";-->
<!--//                //标记-->
<!--//                mark : [{id:"123123",target:"，白露为",begin:4,end:8},{id:"456456",target:"伊人，在",begin:12,end:16}];-->
<!--//                //批注-->
<!--//                comment : [{id:"654654",target:"露为霜。",begin:6,end:10},{id:"321321",target:"，在水一",begin:14,end:18}];-->
<!--//            }-->
<!--//        },-->

        <!--created: function () {-->
            <!--this.changeHead();-->
            <!--this.getEdit();-->
            <!--this.getMark();-->
            <!--this.getComment();-->
        <!--},-->

        <!--methods: {-->

            <!--/**-->
            <!--* 点击切换到对应模块-->
            <!--*/-->
            <!--changeHead(){-->
                <!--var heads = document.getElementById("workspace-text-head").getElementsByTagName("li");-->
                <!--for (var i = 0; i < heads.length; i++) {-->
                    <!--heads[i].onclick = function () {-->
                        <!--change(this);-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 3个模块切换功能，通过赋予被激活模块class属性来控制模块的切换-->
            <!--*/-->
            <!--change(obj) {-->
                <!--//    获取3个模块的导航按钮及主体块div-->
                <!--var heads = document.getElementById("workspace-text-head").getElementsByTagName("li");-->
                <!--var divs = document.getElementById("workspace-text-body").getElementsByClassName("div");-->
                <!--for (var i = 0; i < heads.length; i++) {-->
                    <!--if (heads[i] == obj) {-->
                        <!--heads[i].className = "li-now";-->
                        <!--divs[i].className = "div-now div";-->
                    <!--}-->
                    <!--else {-->
                        <!--heads[i].className = "";-->
                        <!--divs[i].className = "div";-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 修订按钮点击事件-->
            <!--*/-->
            <!--btnEdit_onclick() {-->
                <!--var textEdit = document.getElementById("text-edit");    //  修订版文本-->
                <!--var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮-->
                <!--var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮-->
                <!--var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框-->
                <!--var label = document.getElementById("label");   //  修订信息编辑框标题-->
                <!--btnCancelEdit.style.visibility = "visible";    //   取消修订按钮显示-->
                <!--btnConfirmEdit.style.visibility = "visible";    //  确认修订按钮显示-->
                <!--text.style.visibility = "visible";  //  修订信息编辑框显示-->
                <!--label.style.visibility = "visible";    //   修订信息编辑框标题显示-->
                <!--textEdit.contentEditable = true;    //  修订文本可编辑-->
            <!--},-->


            <!--/**-->
            <!--* 取消修订按钮点击事件-->
            <!--*/-->
            <!--btnCancelEdit_onclick() {-->
                <!--var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮-->
                <!--var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮-->
                <!--var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框-->
                <!--var label = document.getElementById("label");   //  修订信息编辑框标题-->
                <!--window.location.reload();   //  重新加载-->
                <!--btnCancelEdit.style.visibility = "hidden";  //  取消修订按钮隐藏-->
                <!--btnConfirmEdit.style.visibility = "hidden"; //  确认修订按钮隐藏-->
                <!--text.style.visibility = "hidden";   //  修订信息编辑框隐藏-->
                <!--label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏-->
            <!--},-->


            <!--/**-->
            <!--* 确认修订按钮点击事件-->
            <!--*/-->
            <!--btnConfirmEdit_onclick() {-->
                <!--var textEdit = document.getElementById("text-edit");    //  修订版文本-->
                <!--var text = document.getElementById("textarea-editInfo");    //  修订信息编辑框-->
                <!--var btnCancelEdit = document.getElementById("btn-cancel-edit");  //  取消修订按钮-->
                <!--var btnConfirmEdit = document.getElementById("btn-confirm-edit");    //  确认修订按钮-->
                <!--var label = document.getElementById("label");   //  修订信息编辑框标题-->
                <!--//  未做修改判断-->
                <!--if (content == textEdit.innerText) {-->
                    <!--alert("您未做任何修改！")-->
                <!--}-->
                <!--//  未填写修订信息判断-->
                <!--else if (text.value == "") {-->
                    <!--alert("請填寫修訂信息！")-->
                <!--}-->
                <!--btnCancelEdit.style.visibility = "hidden";  //  取消修订按钮隐藏-->
                <!--btnConfirmEdit.style.visibility = "hidden";  // 确认修订按钮隐藏-->
                <!--text.style.visibility = "hidden";   //  修订信息编辑框隐藏-->
                <!--label.style.visibility = "hidden";  //  修订信息编辑框标题隐藏-->
                <!--textEdit.contentEditable = false;   //  修订文本不可编辑-->
                <!--console.log(getMarkChange());  //  获得更改标记方法-->
                <!--console.log(getCommentChange());    // 获得更改批注方法-->
            <!--},-->


            <!--/**-->
            <!--* 获取选区所在节点字符串-->
            <!--*/-->
    <!--//        rangeData() {-->
    <!--//            var data = window.getSelection().anchorNode.data;-->
    <!--//            return data;-->
    <!--//        },-->


            <!--/**-->
            <!--* 批注文本选取添加批注操作-->
            <!--*/-->
            <!--textComment_onclick() {-->
                <!--if (window.getSelection().getRangeAt(0).toString().length != 0) {-->
                    <!--document.getElementById("btn-add-comment").style.visibility = "visible"; //  添加批注按钮显示-->
                <!--}-->
                <!--var sel = window.getSelection();-->
                <!--this.a = sel.anchorNode.parentNode.attributes.getNamedItem("id");-->
                <!--this.b = sel.focusNode.parentNode.attributes.getNamedItem("id");-->
                <!--console.log(this.a);-->
                <!--console.log(this.b);-->
            <!--},-->


            <!--/**-->
            <!--* 添加批注按钮事件-->
            <!--*/-->
            <!--btnAddComment_onclick() {-->
                <!--var btnAddComment = document.getElementById("btn-add-comment");-->
                <!--btnAddComment.style.visibility = "hidden";  //  添加批注按钮隐藏-->
    <!--//            var range = window.getSelection().getRangeAt(0);    //  获得选区-->
    <!--//            var span = document.createElement("span");  //  创建span标签-->
    <!--//            range.surroundContents(span);   //  为选区添加span标-->
            <!--},-->


            <!--/**-->
            <!--* 确认添加批注按钮事件-->
            <!--*/-->
            <!--btnConfirmAddComment_onclick() {-->
    <!--//            var spans = document.getElementById("text-comment").getElementsByTagName("span");   //  获得批注文本中的span标签-->
                <!--var textareaAddComment = document.getElementById("textarea-addComment");    //  获得添加批注编辑框-->
                <!--if (textareaAddComment.value.length == 0) { //  判断未编辑批注信息-->
                    <!--alert("您未生成批註內容！");-->
    <!--//                for (var i = 0; i < spans.length; i++) {-->
    <!--//                    var has = spans[i].hasAttribute("class");-->
    <!--//                    //  没有class的span标签转为纯文本-->
    <!--//                    if (has == false) {-->
    <!--//                        var inner = spans[i].innerHTML;-->
    <!--//                        var text = document.createTextNode(inner);-->
    <!--//                        spans[i].parentNode.replaceChild(text, spans[i]);-->
    <!--//                    }-->
    <!--//                }-->
                <!--}-->
                <!--//  添加批注后渲染属性并获得位置-->
                <!--else {-->
    <!--//                for (var i = 0; i < spans.length; i++) {-->
    <!--//                    var has = spans[i].hasAttribute("class");-->
    <!--//                    if (has == false) {-->
    <!--//                        spans[i].setAttribute("class", "comment");-->
    <!--//                        spans[i].setAttribute("data-toggle", "modal");-->
    <!--//                        spans[i].setAttribute("data-target", "#layer-comment-record");-->
    <!--//                    }-->
    <!--//                }-->
                    <!--window.location.reload()-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 选中标记文本事件-->
            <!--*/-->
            <!--textMark_onclick() {-->
                <!--if (window.getSelection().getRangeAt(0).toString().length != 0) {-->
                    <!--document.getElementById("btn-mark-noumenon").style.visibility = "visible";-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 取消添加批注事件-->
            <!--*/-->
            <!--btnCancelAddComment_onclick() {-->
                <!--var spans = document.getElementById("text-comment").getElementsByTagName("span");   //  获取批注文本中span标签-->
                <!--//  遍历将没有class属性的span复原为纯文本-->
                <!--for (var i = 0; i < spans.length; i++) {-->
                    <!--var has = spans[i].hasAttribute("class");-->
                    <!--if (has == false) {-->
                        <!--var inner = spans[i].innerHTML;-->
                        <!--var text = document.createTextNode(inner);-->
                        <!--spans[i].parentNode.replaceChild(text, spans[i]);-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 标记本体按钮点击事件-->
            <!--*/-->
            <!--btnMarkNoumenon_onclick() {-->
                <!--var btnMarkNoumenon = document.getElementById("btn-mark-noumenon");-->
                <!--btnMarkNoumenon.style.visibility = "hidden";    //  标记本体按钮隐藏-->
                <!--var range = window.getSelection().getRangeAt(0);    //  获得选区-->
                <!--var span = document.createElement("span");  //  创建span标签-->
                <!--range.surroundContents(span);    //  为选区添加span标签-->
            <!--},-->


            <!--/**-->
            <!--* 确认取消按钮事件-->
            <!--*/-->
            <!--btnConfirmCancel_onclick() {-->
                <!--var spans = document.getElementsByTagName("span");-->
            <!--},-->


            <!--/**-->
            <!--* 添加标记按钮事件-->
            <!--*/-->
            <!--btnAddMark_onclick() {-->
                <!--var spans = document.getElementById("text-mark").getElementsByTagName("span");  //  标记文本中获得span标签-->
                <!--//  遍历，为没有class的span添加mark类-->
                <!--for (var i = 0; i < spans.length; i++) {-->
                    <!--var has = spans[i].hasAttribute("class");-->
                    <!--if (has == false) {-->
                        <!--spans[i].setAttribute("class", "mark");-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 添加本体标记模态框的x按钮事件-->
            <!--*/-->
            <!--btnCrossCancelAddMark_onclick() {-->
                <!--var spans = document.getElementById("text-mark").getElementsByTagName("span");  //  标记文本中获取span标签-->
                <!--//  遍历将没有class属性的span复原为纯文本-->
                <!--for (var i = 0; i < spans.length; i++) {-->
                    <!--var has = spans[i].hasAttribute("class");-->
                    <!--if (has == false) {-->
                        <!--var inner = spans[i].innerHTML;-->
                        <!--var text = document.createTextNode(inner);-->
                        <!--spans[i].parentNode.replaceChild(text, spans[i]);-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 获得渲染修订版可跟踪文本方法-->
            <!--* 初始化一个判断变量，依次遍历文本中每个字，并判断该字是否在标记和批注中，对不同情况赋值判断变量-->
            <!--* 得出不同结果-->
            <!--*/-->
            <!--getEdit() {-->
                <!--var a = 0;-->
                <!--//文本逐字遍历-->
                <!--for (var i = 0; i < content.length; i++) {-->
                    <!--//按顺序依次获得文本中的字-->
                    <!--var p = content.charAt(i);-->
                    <!--//标记下标初始化-->
                    <!--var jtemp = 0;-->
                    <!--//批注下标初始化-->
                    <!--var ktemp = 0;-->
                    <!--//标记数组遍历-->
                    <!--for (var j = 0; j < mark.length; j++) {-->
                        <!--//该字不在该条标记内-->
                        <!--if (i < mark[j].begin || i >= mark[j].end) {-->
                            <!--a = 0;-->
                            <!--jtemp = j;-->
                            <!--continue;-->
                        <!--}-->
                        <!--//该字在该条标记内-->
                        <!--if (i >= mark[j].begin && i < mark[j].end) {-->
                            <!--a = 1;-->
                            <!--jtemp = j;-->
                            <!--break;-->
                        <!--}-->
                    <!--}-->
                    <!--//批注数组遍历-->
                    <!--for (var k = 0; k < comment.length; k++) {-->
                        <!--//该字不在该条批注内，判断变量a值为0-->
                        <!--if (i < comment[k].begin || i >= comment[k].end) {-->
                            <!--continue;-->
                        <!--}-->
                        <!--//该字在该条批注内-->
                        <!--if (i >= comment[k].begin && i < comment[k].end) {-->
                            <!--//该字不是标记-->
                            <!--if (a == 0) {-->
                                <!--a = 2;-->
                                <!--ktemp = k;-->
                            <!--}-->
                            <!--//该字是标记-->
                            <!--if (a == 1) {-->
                                <!--a = 4;-->
                                <!--ktemp = k;-->
                            <!--}-->
                            <!--break;-->
                        <!--}-->
                    <!--}-->
                    <!--var textEdit = document.getElementById("text-edit");-->
                    <!--//该字既不是标记也不是批注-->
                    <!--if (a == 0) {-->
                        <!--var text = document.createTextNode(p);-->
                        <!--textEdit.appendChild(text)-->
                    <!--}-->
                    <!--//该字只是标记-->
                    <!--else if (a == 1) {-->
                        <!--var span = document.createElement("span");-->
                        <!--var text = document.createTextNode(p);-->
                        <!--span.appendChild(text);-->
                        <!--span.setAttribute("class", "id=M" + mark[jtemp].id);-->
                        <!--textEdit.appendChild(span);-->
                    <!--}-->
                    <!--//该字只是批注-->
                    <!--else if (a == 2) {-->
                        <!--var span = document.createElement("span");-->
                        <!--var text = document.createTextNode(p);-->
                        <!--span.appendChild(text);-->
                        <!--span.setAttribute("class", "id=C" + comment[ktemp].id);-->
                        <!--textEdit.appendChild(span);-->
                    <!--}-->
                    <!--//该字既是标记又是批注-->
                    <!--else if (a == 4) {-->
                        <!--var span = document.createElement("span");-->
                        <!--var text = document.createTextNode(p);-->
                        <!--span.appendChild(text);-->
                        <!--span.setAttribute("class", "id=M" + mark[jtemp].id + " id=C" + comment[ktemp].id);-->
                        <!--textEdit.appendChild(span);-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 获得渲染批注版可跟踪文本方法-->
            <!--* 初始化一个判断变量，逐字遍历确定是否为批注-->
            <!--*/-->
            <!--getComment() {-->
                <!--//判断变量赋值-->
                <!--var a = 0;-->
                <!--//文本逐字遍历-->
                <!--for (var i = 0; i < content.length; i++) {-->
                    <!--//按顺序依次获得文本中的字-->
                    <!--var p = content.charAt(i);-->
                    <!--//批注下标初始化-->
                    <!--var jtemp = 0;-->
                    <!--//批注数组遍历-->
                    <!--for (var j = 0; j < comment.length; j++) {-->
                        <!--//该字不在该条批注内-->
                        <!--if (i < comment[j].begin || i >= comment[j].end) {-->
                            <!--a = 0;-->
                            <!--jtemp = j;-->
                            <!--continue;-->
                        <!--}-->
                        <!--//该字在该条批注内-->
                        <!--if (i >= comment[j].begin && i < comment[j].end) {-->
                            <!--a = 1;-->
                            <!--jtemp = j;-->
                            <!--break;-->
                        <!--}-->
                    <!--}-->
                    <!--var textComment = document.getElementById("text-comment");-->
                    <!--//该字不是批注-->
                    <!--if (a == 0) {-->
                        <!--var text = document.createTextNode(p);-->
                        <!--textComment.appendChild(text)-->
                    <!--}-->
                    <!--//该字是批注-->
                    <!--else if (a == 1) {-->
                        <!--var span = document.createElement("span");-->
                        <!--var text = document.createTextNode(p);-->
                        <!--span.appendChild(text);-->
                        <!--span.setAttribute("class", "comment id=C" + comment[jtemp].id);-->
                        <!--span.setAttribute("data-toggle", "modal");-->
                        <!--span.setAttribute("data-target", "#layer-comment-record");-->
                        <!--textComment.appendChild(span);-->
                    <!--}-->
                <!--}-->
            <!--},-->


            <!--/**-->
            <!--* 获得渲染本体标记版可跟踪文本方法-->
            <!--* 初始化一个判断变量，逐字遍历确定是否为标记-->
            <!--*/-->
            <!--getMark() {-->
                <!--//判断变量赋值-->
                <!--var a = 0;-->
                <!--//文本逐字遍历-->
                <!--for (var i = 0; i < content.length; i++) {-->
                    <!--//按顺序依次获得文本中的字-->
                    <!--var p = content.charAt(i);-->
                    <!--//标记下标初始化-->
                    <!--var jtemp = 0;-->
                    <!--//标记数组遍历-->
                    <!--for (var j = 0; j < mark.length; j++) {-->
                        <!--//该字不在该条标记内-->
                        <!--if (i < mark[j].begin || i >= mark[j].end) {-->
                            <!--a = 0;-->
                            <!--jtemp = j;-->
                            <!--continue;-->
                        <!--}-->
                        <!--//该字在该条标记内-->
                        <!--if (i >= mark[j].begin && i < mark[j].end) {-->
                            <!--a = 1;-->
                            <!--jtemp = j;-->
                            <!--break;-->
                        <!--}-->
                    <!--}-->
                    <!--var textMark = document.getElementById("text-mark");-->
                    <!--//该字不是标记-->
                    <!--if (a == 0) {-->
                        <!--var text = document.createTextNode(p);-->
                        <!--textMark.appendChild(text)-->
                    <!--}-->
                    <!--//该字是标记-->
                    <!--else if (a == 1) {-->
                        <!--var span = document.createElement("span");-->
                        <!--var text = document.createTextNode(p);-->
                        <!--span.appendChild(text);-->
                        <!--span.setAttribute("class", "mark id=M" + mark[jtemp].id);-->
                        <!--textMark.appendChild(span);-->
                    <!--}-->
                <!--}-->
            <!--},-->





            <!--/**-->
            <!--* 获得更改标记JSON-->
            <!--* 将碎片拼接，依次比较对应target，begin，end-->
            <!--*/-->
            <!--getMarkChange() {-->
                <!--//创建标记更新数组-->
                <!--var marks_modify = new Array();-->
                <!--//遍历标记数组-->
                <!--for (var i = 0; i < mark.length; i++) {-->
                    <!--//依次获得每条标记碎片文字-->
                    <!--var marks = document.getElementsByClassName("id=M" + mark[i].id);-->
                    <!--//初始化每条标记内容-->
                    <!--var text = '';-->
                    <!--//遍历每条标记中的每个字-->
                    <!--for (j = 0; j < marks.length; j++) {-->
                        <!--var markPiece = marks[j].innerText;-->
                        <!--//拼凑所有字为一条标记-->
                        <!--text += markPiece;-->
                        <!--}-->
                    <!--//获取该条新标记的位置-->
                    <!--var newBegin = (textEdit.innerText).indexOf(text);-->
                    <!--var newEnd = newBegin + text.length;-->
                    <!--//标记被修改创建标记更新数组-->
                    <!--if (text != mark[i].target || newBegin != mark[i].begin || newEnd != mark[i].end) {-->
                        <!--marks_modify.push("{id:" + mark[i].id + ",target:" + text + ",begin:" / +newBegin + ",end:" + newEnd + ",before:" + ",after:" + "}")-->
                    <!--}-->
                <!--}-->
                <!--return marks_modify;-->
            <!--},-->


            <!--/**-->
            <!--* 获得更改批注JSON-->
            <!--* 将碎片拼接，依次比较对应target，begin，end-->
            <!--*/-->
            <!--getCommentChange() {-->
                <!--//创建批注更新数组-->
                <!--var comments_modify = new Array();-->
                <!--//遍历批注数组-->
                <!--for (var i = 0; i < comment.length; i++) {-->
                    <!--//依次获得每条批注碎片文字-->
                    <!--var comments = document.getElementsByClassName("id=C" + comment[i].id);-->
                    <!--//初始化每条批注内容-->
                    <!--var text = '';-->
                    <!--//遍历每条批注中的每个字-->
                    <!--for (j = 0; j < comments.length; j++) {-->
                        <!--var commentPiece = comments[j].innerText;-->
                        <!--//拼凑所有字为一条批注-->
                        <!--text += commentPiece;-->
                    <!--}-->
                    <!--//获取该条新批注的位置-->
                    <!--var newBegin = (textEdit.innerText).indexOf(text);-->
                    <!--var newEnd = newBegin + text.length;-->
                    <!--//批注被修改创建批注更新数组-->
                    <!--if (text != comment[i].target || newBegin != comment[i].begin || newEnd != comment[i].end) {-->
                        <!--comments_modify.push("{id:" + comment[i].id + ",target:" + text + ",begin:" + newBegin + ",end" + newEnd + "}")-->
                    <!--}-->
                <!--}-->
                <!--return comments_modify;-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->



<!--<style>-->
    <!--/*通配选择器消除默认内外边距*/-->
    <!--*{-->
        <!--padding: 0;-->
        <!--margin: 0;-->
    <!--}-->

    <!--/*图文对照文字工作台div*/-->
    <!--#workspace-text{-->
        <!--width: 500px;-->
        <!--height: 500px;-->
        <!--padding: 10px;-->
        <!--border: 2px lightgray solid;-->
        <!--position: absolute;-->
    <!--}-->

    <!--/*图文对照文字工作台li标签（3个版本切换导航栏）*/-->
    <!--li{-->
        <!--list-style: none;-->
        <!--float: right;-->
        <!--margin: 5px;-->
        <!--cursor: pointer;-->
        <!--display: inline-block;-->
        <!--height: 30px;-->
        <!--width: 90px;-->
        <!--text-align: center;-->
        <!--background-color: lightgray;-->
        <!--line-height: 30px;-->
    <!--}-->

    <!--/*3个版本中选定版本li标签导航栏*/-->
    <!--#workspace-text-head li.li-now{-->
        <!--background-color: darkgray;-->
        <!--color: black;-->
        <!--font-weight: bold;-->
    <!--}-->

    <!--/*图文对照工作台主体*/-->
    <!--#workspace-text-body {-->
        <!--clear: both;-->
        <!--padding-left: 50px;;-->
    <!--}-->

    <!--/*图文对照工作台主体div标签（3个版本的3个div）*/-->
    <!--#workspace-text-body > div {-->
        <!--display: none;-->
    <!--}-->

    <!--/*3个版本中选定的版本主体*/-->
    <!--#workspace-text-body > div.div-now {-->
        <!--display: block;-->
    <!--}-->

    <!--/*修订记录按钮*/-->
    <!--#btn-edit-record{-->
        <!--position: absolute;-->
        <!--left: 50px;-->
        <!--bottom: 10px;-->
    <!--}-->

    <!--/*修订按钮*/-->
    <!--#btn-edit{-->
        <!--position: absolute;-->
        <!--right: 50px;-->
        <!--bottom: 10px;-->
    <!--}-->

    <!--/*取消修订按钮*/-->
    <!--#btn-cancel-edit{-->
        <!--position: absolute;-->
        <!--right: 100px;-->
        <!--bottom: 50px;-->
    <!--}-->

    <!--/*确定修订按钮*/-->
    <!--#btn-confirm-edit{-->
        <!--position: absolute;-->
        <!--right: 50px;-->
        <!--bottom: 50px;-->
    <!--}-->

    <!--/*添加批注按钮*/-->
    <!--#btn-add-comment{-->
        <!--position: absolute;-->
        <!--right: 50px;-->
        <!--bottom: 50px;-->
    <!--}-->

    <!--/*标记本体按钮*/-->
    <!--#btn-mark-noumenon{-->
        <!--position: absolute;-->
        <!--right: 50px;-->
        <!--bottom: 50px;-->
    <!--}-->

    <!--/*本体标记板块筛选标记种类下拉菜单*/-->
    <!--#select-markType {-->
        <!--position: absolute;-->
        <!--right: 20px;-->
        <!--top: 80px;-->
    <!--}-->

    <!--/*文本内容*/-->
    <!--.body-text{-->
        <!--margin-top: 40px;-->
    <!--}-->

    <!--/*修订记录&批注内容编辑框*/-->
    <!--textarea{-->
        <!--position: relative;-->
        <!--top: 30px;-->
        <!--width: 320px;-->
    <!--}-->

    <!--/*修订信息编辑框*/-->
    <!--#textarea-editInfo{-->
        <!--position: relative;-->
        <!--top: 0px;-->
    <!--}-->

    <!--/*批注内容编辑框*/-->
    <!--#textarea-addComment{-->
        <!--width: 500px;-->
        <!--height: 200px;-->
        <!--position: static;-->
    <!--}-->

    <!--/*批注字体样式*/-->
    <!--.comment{-->
        <!--cursor: pointer;-->
        <!--text-decoration: underline;-->
    <!--}-->

    <!--/*标记字体样式*/-->
    <!--.mark{-->
        <!--cursor: pointer;-->
        <!--font-weight: bold;-->
    <!--}-->
<!--</style>-->