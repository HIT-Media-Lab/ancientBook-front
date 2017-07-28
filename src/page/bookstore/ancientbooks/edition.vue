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
                three_layers_info : {},
                edition_responsibility : [],
            }
        },

        created : function () {
            this.three_layers_info = this.$store.getters.get_three_layers_info;
        },

        mounted : function () {
            this.three_layers_info = this.$store.getters.get_three_layers_info;
            this.classify_responsibility_info();
        },

        methods : {
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