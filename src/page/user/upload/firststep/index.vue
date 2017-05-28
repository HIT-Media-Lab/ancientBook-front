<!--<template>-->

    <!--<div>-->
        <!--&lt;!&ndash;模块名称&ndash;&gt;-->
        <!--<div>-->
            <!--<h2>1輸入古籍信息</h2>-->
            <!--<button>調用其他信息</button>-->
            <!--<button>取消上傳</button>-->
        <!--</div>-->

        <!--<div>-->
            <!--<h3>古籍規範名稱：</h3>-->
            <!--<h3>書名</h3>-->
            <!--<div>-->
                <!--<p>[品種層]責任結束時間-朝代 + 責任者 + 責任行為</p>-->
                <!--<p>[版本層]責任結束時間-朝代 + 責任者 + 責任行為</p>-->
                <!--<p>[印次層]責任結束時間-朝代 + 責任者 + 責任行為</p>-->
                <!--<p>[複本層]責任結束時間-朝代 + 責任者 + 責任行為</p>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div>-->
            <!--<menu_bar></menu_bar>-->
            <!--<div id="layer-body"><varieties_layer></varieties_layer></div>-->
        <!--</div>-->

        <!--<label><input type="checkbox" name="private"/>私密上傳</label>-->

        <!--<div>-->
            <!--<button>下一步</button>-->
        <!--</div>-->

    <!--</div>-->


<!--</template>-->

<!--<script>-->
    <!--import book_invoke from './book_invoke.vue';-->
    <!--import copy_layer from './copy_layer.vue';-->
    <!--import edition_layer from './edition_layer.vue';-->
    <!--import impression_layer from './impression_layer.vue';-->
    <!--import varieties_layer from './varieties_layer.vue';-->
    <!--import menu_bar from '../../../share-component/menu_bar.vue';-->
    <!--export default{-->
        <!--components:{-->
            <!--book_invoke,-->
            <!--copy_layer,-->
            <!--edition_layer,-->
            <!--impression_layer,-->
            <!--varieties_layer,-->
            <!--menu_bar,-->
        <!--},-->

        <!--data() {-->
            <!--return{-->
                <!--get_menu_items : {},-->
                <!--menuIndex : 0,-->
                <!--menuItems : [],-->
            <!--}-->

        <!--},-->

        <!--created : function () {-->
            <!--get_menuItems()-->
        <!--},-->

        <!--mounted : function () {-->
            <!--change_layer();-->
        <!--},-->

        <!--methods : {-->

            <!--/**-->
             <!--* 获得下拉菜单内容-->
             <!--*/-->
            <!--get_menuItems() {-->
                <!--for (i = 4; i <= 23; i++) {-->
                    <!--this.get_menu_items.model_id = i;-->
                    <!--this.get_menu_items.item_1_id = 0;-->
                    <!--this.get_menu_items.item_2_id = 0;-->
                    <!--this.HttpJson ('/ancient_books/get_menu_items.action' , 'get' , this.get_menu_items , this.success_get_menuItems , this.fail_get_menuItems);-->
                <!--}-->
            <!--},-->

            <!--success_get_menuItems(response) {-->
                <!--console.log ("success get menu items ");-->
                <!--//将后端数据显示在前端页面里-->
                <!--if (response.body.length === 0) {-->
                    <!--console.log ("没有返回数组！");-->
                <!--}-->
                <!--else {-->
                    <!--for (j = 0; j <= response.body.length-1; j++) {-->
                        <!--this.menuItems[this.menuIndex].push({-->
                            <!--model_id: response.body[j].model_id,-->
                            <!--chinese_name: response.body[j].chinese_name-->
                        <!--});-->
                    <!--}-->
                    <!--this.menuIndex += 1;-->
                <!--}-->
            <!--},-->

            <!--fail_get_menuItems() {-->
                <!--console.log ("fail get menu items!");-->
            <!--},-->


            <!--/**-->
             <!--* 4层信息切换-->
             <!--*/-->
            <!--change_layer() {-->
                <!--var layerHead = document.getElementById("layer-head");-->
                <!--var layerBody = document.getElementById("layer-body");-->
                <!--layerHead.onclick = function (ev) {-->
                    <!--var ev = ev || window.event;-->
                    <!--var target = ev.target || ev.srcElement;-->
                    <!--if (target.nodeName.toLocaleLowerCase() == 'li') {-->
                        <!--switch(target.id) {-->
                            <!--case 'layer-head-variety' :-->
                                <!--layerBody.innerHTML = '<varieties_layer></varieties_layer>';-->
                                <!--break;-->
                            <!--case 'layer-head-edition' :-->
                                <!--layerBody.innerHTML = '<edition_layer></edition_layer>';-->
                                <!--break;-->
                            <!--case 'layer-head-impression' :-->
                                <!--layerBody.innerHTML = '<impression_layer></impression_layer>';-->
                                <!--break;-->
                            <!--case 'layer-head-copy' :-->
                                <!--layerBody.innerHTML = '<copy_layer></copy_layer>';-->
                                <!--break;-->
                        <!--}-->
                    <!--}-->
                <!--}-->
            <!--},-->


        <!--}-->
    <!--}-->
<!--</script>-->