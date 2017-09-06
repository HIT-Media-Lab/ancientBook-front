<template>
    <div>
        <div class="zxwcreate">
            <p class="zxwcreate-title">新建本体</p>
            <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
            <create_word :prams="this.prams"></create_word>
        </div>

        <p class="zxw-create-literature">本体名称：{{this.$store.getters.get_build_lit.standard_name}}</p>

        <div class="zxw-lit-top">
            <div class="zxw-lit-bottom">
                <div class="zxw-lit-centre">
                    <div class="zxw-lit-content">
                        <!--文献版本层信息固有信息-->
                        <div class="zxw-lit-layer">
                            <label class="zxw-lit-label">书名:</label>
                            <p class="zxw-lit-info zxw-lit-info-margin" v-model="this.$store.getters.get_build_lit.type_name">{{this.$store.getters.get_build_lit.type_name}}</p>
                            <label class="zxw-lit-label">别名:</label>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.type_other_name === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.type_other_name" v-else>{{this.$store.getters.get_build_lit.type_other_name}}</p>
                        </div>

                        <div class="zxw-lit-layer">
                            <label class="zxw-lit-label">存佚类型：</label>
                            <p class="zxw-lit-info zxw-lit-info-margin zxw-null" v-if="this.$store.getters.get_build_lit.selected_save.chinese_name === ''">不详</p>
                            <p class="zxw-lit-info zxw-lit-info-margin" v-model="this.$store.getters.get_build_lit.selected_save.chinese_name" v-else>{{this.$store.getters.get_build_lit.selected_save.chinese_name}}</p>
                            <label class="zxw-lit-label">品种级别:</label>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.selected_level.chinese_name === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.selected_level.chinese_name" v-else>{{this.$store.getters.get_build_lit.selected_level.chinese_name}}</p>

                        </div>

                        <div class="zxw-lit-layer">
                            <label class="zxw-lit-label">英译：</label>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.english === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.english" v-else>{{this.$store.getters.get_build_lit.english}}</p>
                        </div>

                        <div class="zxw-lit-layer">
                            <label class="zxw-lit-label">提要信息:</label>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.type_summary === ''">不详</p>
                            <div class="zxw-lit-summery"  v-model="this.$store.getters.get_build_lit.type_summary" v-else>{{this.$store.getters.get_build_lit.type_summary}}</div>
                        </div>
                        <div>
                            <label class="zxw-lit-label">标准分类:</label>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.selected_bu.chinese_name === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.selected_bu.chinese_name" v-else>{{this.$store.getters.get_build_lit.selected_bu.chinese_name}}</p>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.selected_lei.chinese_name === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.selected_lei.chinese_name" v-else>{{this.$store.getters.get_build_lit.selected_lei.chinese_name}}</p>
                            <p class="zxw-lit-info zxw-null" v-if="this.$store.getters.get_build_lit.selected_shu.chinese_name === ''">不详</p>
                            <p class="zxw-lit-info" v-model="this.$store.getters.get_build_lit.selected_shu.chinese_name" v-else>{{this.$store.getters.get_build_lit.selected_shu.chinese_name}}</p>
                        </div>

                        <!--文献版本层信息循坏添加信息-->
                        <div v-for="item in this.$store.getters.get_build_lit.varieties_arr">
                            <img src="../../../../assets/img/no-use-picture/ink-line.png" height="5" width="673"/>
                            <div class="zxw-lit-layer">
                                <label class="zxw-lit-type-label">责任顺序:</label>
                                <p class="zxw-lit-info zxw-lit-info-margin" v-model="item.level">{{item.level}}</p>
                            </div>

                            <div class="zxw-lit-layer">
                                <label class="zxw-lit-type-label">责任开始时间:</label>
                                <p class="zxw-lit-info zxw-lit-type-label-margin" v-model="item.begin_standard_time">{{item.begin_standard_time}}</p>
                                <label class="zxw-lit-type-label">责任结束时间:</label>
                                <p class="zxw-lit-info" v-model="item.end_standard_time">{{item.end_standard_time}}</p>
                            </div>

                            <div class="zxw-lit-layer">
                                <label class="zxw-lit-type-label">责任地点:</label>
                                <p class="zxw-lit-info zxw-lit-type-label-margin zxw-null" v-if="item.location_standard_name === ''">不详</p>
                                <button class="zxw-lit-info zxw-lit-type-label-margin"  v-model="item.location_standard_name" v-else>{{item.location_standard_name}}</button>
                                <label class="zxw-lit-type-label">责任者名称：</label>
                                <button class="zxw-lit-info" v-model="item.character_standard_name">{{item.character_standard_name}}</button>
                            </div>

                            <div class="zxw-lit-layer">
                                <label class="zxw-lit-type-label">责任者类型:</label>
                                <p class="zxw-lit-info zxw-lit-type-label-margin" v-model="item.selected_type_name.chinese_name">{{item.selected_type_name.chinese_name}}</p>
                                <label class="zxw-lit-type-label">责任行为：</label>
                                <p class="zxw-lit-info" v-model="item.selected_action.chinese_name">{{item.selected_action.chinese_name}}</p>
                            </div>

                            <div class="zxw-lit-layer">
                                <label class="zxw-lit-type-label">确定性:</label>
                                <p class="zxw-lit-info" v-model="item.selected_confirm.chinese_name">{{item.selected_confirm.chinese_name}}</p>
                            </div>

                            <div>
                                <label class="zxw-lit-type-label">责任说明:</label>
                                <p class="zxw-lit-info zxw-null" v-if="item.explain === ''">不详</p>
                                <p class="zxw-lit-summery" v-model="item.explain" v-else>{{item.explain}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="zxw-build-step2-btn">
            <router-link to="/littwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()">确认</button>
        </div>

        <success_create :show_info="this.show_info"></success_create>
    </div>
</template>

<script>
    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    export default{
        components:{
            create_word,
            success_create
        },
        created(){
            this.prams = this.$route.name;
        },

        data(){
            return{
                prams:'',
                create_lit_url:'/ancient_books/add_literature.action',
                show_info:false
            }
        },
        methods:{
            open_confirm(){
                let object ={};
                object.standard_name = this.$store.getters.get_build_lit.standard_name;
                object.type_summary = this.$store.getters.get_build_lit.type_summary;
                object.type_shu = this.$store.getters.get_build_lit.selected_shu.item_3_id;
                object.type_lei = this.$store.getters.get_build_lit.selected_lei.item_2_id;
                object.type_bu = this.$store.getters.get_build_lit.selected_bu.item_1_id;
                object.type_level = this.$store.getters.get_build_lit.selected_level.item_1_id;
                object.type_save = this.$store.getters.get_build_lit.selected_save.item_1_id;
                object.type_other_name = this.$store.getters.get_build_lit.type_other_name;
                object.type_name = this.$store.getters.get_build_lit.type_name;
                object.english = this.$store.getters.get_build_lit.english;
                object.responsibility_infos = [];
                for(let i = 0;i < this.$store.getters.get_build_lit.varieties_arr.length;i++){
                    if(this.$store.getters.get_build_lit.varieties_arr[i].selected_type_name.chinese_name === '不详'){
                        object.responsibility_infos.push({
                            location_id:this.$store.getters.get_build_lit.varieties_arr[i].location_id,
                            begin_time_id:this.$store.getters.get_build_lit.varieties_arr[i].begin_time_id,
                            end_time_id:this.$store.getters.get_build_lit.varieties_arr[i].end_time_id,
                            order:this.$store.getters.get_build_lit.varieties_arr[i].order,
                            action:this.$store.getters.get_build_lit.varieties_arr[i].selected_action.item_1_id,
                            explain:this.$store.getters.get_build_lit.varieties_arr[i].explain,
                            confirm:this.$store.getters.get_build_lit.varieties_arr[i].selected_confirm.item_1_id,
                            type:this.$store.getters.get_build_lit.varieties_arr[i].selected_type_name.item_1_id,
                            level:1
                        })
                    } else{
                        object.responsibility_infos.push({
                            location_id:this.$store.getters.get_build_lit.varieties_arr[i].location_id,
                            name_id:this.$store.getters.get_build_lit.varieties_arr[i].character_id,
                            begin_time_id:this.$store.getters.get_build_lit.varieties_arr[i].begin_time_id,
                            end_time_id:this.$store.getters.get_build_lit.varieties_arr[i].end_time_id,
                            order:this.$store.getters.get_build_lit.varieties_arr[i].order,
                            action:this.$store.getters.get_build_lit.varieties_arr[i].selected_action.item_1_id,
                            explain:this.$store.getters.get_build_lit.varieties_arr[i].explain,
                            confirm:this.$store.getters.get_build_lit.varieties_arr[i].selected_confirm.item_1_id,
                            type:this.$store.getters.get_build_lit.varieties_arr[i].selected_type_name.item_1_id,
                            level:1
                        })
                    }
                }
                console.log('数组里的东西： '+JSON.stringify(object.responsibility_infos));
                this.http_json(this.create_lit_url,'post',object,this.success_create_lit,this.fail_create_lit);
            },

            success_create_lit(response){
                this.show_info=true;
                this.$router.push({name:'lit_detail',params:{nouId:response.body.id}});
            },

            fail_create_lit(){
                console.log("创建文献本体失败");
            }
        },

        beforeRouteLeave (to, from, next){
            if(to.name !== 'littwo') {
                //清空Vuex
                this.$store.getters.get_build_lit.standard_name = '';
                this.$store.getters.get_build_lit.type_name = '';
                this.$store.getters.get_build_lit.type_other_name='';
                this.$store.getters.get_build_lit.type_summary = '';
                this.$store.getters.get_build_lit.english='';
                this.$store.getters.get_build_lit.selected_save.item_1_id=0;
                this.$store.getters.get_build_lit.selected_save.chinese_name='';
                this.$store.getters.get_build_lit.selected_level.item_1_id=0;
                this.$store.getters.get_build_lit.selected_level.chinese_name='';
                this.$store.getters.get_build_lit.selected_shu.chinese_name='';
                this.$store.getters.get_build_lit.selected_shu.item_3_id=0;
                this.$store.getters.get_build_lit.selected_lei.chinese_name='';
                this.$store.getters.get_build_lit.selected_lei.item_2_id=0;
                this.$store.getters.get_build_lit.selected_bu.chinese_name='';
                this.$store.getters.get_build_lit.selected_bu.item_1_id=0;
                this.$store.getters.get_build_lit.varieties_arr.splice(0,this.$store.getters.get_build_lit.varieties_arr.length);

                //模态框自动关闭
                if(this.show_info === true){
                    window.setTimeout(function () {
                        this.show_info = false;
                        next();
                    }, 1500);

                } else{
                    next();
                }

            } else{
                next();
            }

        },
    }
</script>

<style>

</style>