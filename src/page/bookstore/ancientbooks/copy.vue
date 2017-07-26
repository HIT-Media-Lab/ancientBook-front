<template>

    <!--复本层-->
    <div class="layer-input">
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

</template>

<script>
    export default{
        data() {
            return{
                three_layers_info : {},
                copy_responsibility : [],
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
                    if (three_layers_info.responsibility_infos[i].level == 4) {
                        vm.copy_responsibility.push(three_layers_info.responsibility_infos[i])
                    }
                }
            }
        }
    }
</script>
