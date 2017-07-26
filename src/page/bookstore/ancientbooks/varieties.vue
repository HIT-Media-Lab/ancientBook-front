<template>

    <!--品种层-->
    <div class="layer-input">
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

</template>

<script>
    export default{
        data() {
            return{
                first_layer_info : {},
            }
        },

        created : function () {
            this.first_layer_info = this.$store.getters.get_first_layer_info;
        },

        mounted : function () {
            this.first_layer_info = this.$store.getters.get_first_layer_info;
        },

    }
</script>