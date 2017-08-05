<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_place.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">地名：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.location_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.other_name === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.other_name" v-else>
            <label class="zxw-character-span">经度：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.longitude === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.longitude" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">纬度：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.latitude === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.latitude" v-else>
            <label class="zxw-character-span">今所在：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.location_today === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.location_today" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">起始时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.begin_standard_time">
            <label class="zxw-character-span">终止时间：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.end_standard_time">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">上级地名：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.s_location_standard_name ===''">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.s_location" v-else>
            <label class="zxw-character-span">下级地名：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.l_location_standard_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_place.l_location" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">治所：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.seat_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.seat_standard_name" @mouseover="show_tooltipinfo_seat()" @mouseout="close_tooltip_seat()"  v-else>
        </div>

        <template v-if="this.$store.getters.get_build_place.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_place.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_place.remark_2">
            </div>
        </template>

        <div class="zxw-build-step2-btn">
            <router-link to="/platwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()">确认</button>
        </div>
        <success_create id="show_info_pla" :show_info="show_info"></success_create>
        <!--子的具体信息显示-->
        <modal :show_modal="show_tooltip_seat" v-on:fireclose="close_tooltip_seat" class="zxw-modal-character">
            <div slot="header" class="zxw-relation-modal-header">
            </div>
            <div slot="body" class="zxw-relation-modal-body">
                <p class="zxw-relation-info" v-for="item in this.$store.getters.get_build_place.seat_standard_name">{{item}}</p>
            </div>
        </modal>
    </div>

</template>

<script>
     /*let Mock = require('mockjs');
     Mock.mock('/ancient_books/add_person.action','post', {
     "status|200":200,
     "result|1":1,
     "id|123":123
     });*/


    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    import modal from '../../../../component/modal.vue';
    export default{
        beforeRouteLeave (to, from, next){
            if(to.name !== 'placetwo') {
                //清空Vuex
                this.$store.getters.get_build_place.standard_name = '';
                this.$store.getters.get_build_place.location_name = '';
                this.$store.getters.get_build_place.longitude = '';
                this.$store.getters.get_build_place.latitude = '';
                this.$store.getters.get_build_place.location_today = '';
                this.$store.getters.get_build_place.other_name = '';
                this.$store.getters.get_build_place.begin_time_id = '';
                this.$store.getters.get_build_place.begin_standard_time = '';
                this.$store.getters.get_build_place.end_time_id = '';
                this.$store.getters.get_build_place.end_standard_time = '';
                this.$store.getters.get_build_place.remark_1_name = '';
                this.$store.getters.get_build_place.remark_2_name = '';
                this.$store.getters.get_build_place.remark_1 = '';
                this.$store.getters.get_build_place.remark_2 = '';
                this.$store.getters.get_build_place.english = '';
                this.$store.getters.get_build_place.s_location_id = '';
                this.$store.getters.get_build_place.s_location_standard_name = '';
                this.$store.getters.get_build_place.l_location_id = '';
                this.$store.getters.get_build_place.l_location_standard_name = '';
                this.$store.getters.get_build_place.seat_id.splice(0, this.$store.getters.get_build_place.seat_id.length);
                this.$store.getters.get_build_place.seat_standard_name.splice(0, this.$store.getters.get_build_place.seat_standard_name.length);
                //模态框自动关闭
                window.setTimeout(function () {
                    document.getElementById("show_info_pla").setAttribute('class', 'zxw-show-info');
                    next();
                }, 500);
            } else {
                next();
            }

        },

        components:{
            create_word,
            success_create,
            modal
        },

        created(){
            this.prams = this.$route.name;
        },

        computed:{
            show_remark(){
                if( this.$store.getters.get_build_place.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_place.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_place.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_place.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                show_tooltip_seat:false,
                prams:'',
                show_info:false,
                close_icon:true,
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_place:{seat_id:[]},
                show_seat:[],
                create_place_url:'/ancient_books/add_location.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'pla_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建地点本体失败");
            },

            open_confirm(){
                this.create_place.standard_name = this.$store.getters.get_build_place.standard_name;
                this.create_place.location_name = this.$store.getters.get_build_place.location_name;
                this.create_place.longitude = this.$store.getters.get_build_place.longitude;
                this.create_place.latitude = this.$store.getters.get_build_place.latitude;
                this.create_place.location_today = this.$store.getters.get_build_place.location_today;
                this.create_place.other_name = this.$store.getters.get_build_place.other_name;
                this.create_place.begin_time_id = this.$store.getters.get_build_place.begin_time_id;
                this.create_place.end_time_id = this.$store.getters.get_build_place.end_time_id;
                this.create_place.remark_1_name = this.$store.getters.get_build_place.remark_1_name;
                this.create_place.remark_1 = this.$store.getters.get_build_place.remark_1;
                this.create_place.remark_2_name = this.$store.getters.get_build_place.remark_2_name;
                this.create_place.remark_2 = this.$store.getters.get_build_place.remark_2;
                this.create_place.english = this.$store.getters.get_build_place.english;
                this.create_place.s_location_id = this.$store.getters.get_build_place.s_location_id;
                this.create_place.l_location_id = this.$store.getters.get_build_place.l_location_id;

                for (let s = 0;s < this.$store.getters.get_build_place.seat_id.length; s++){
                    this.create_place.seat_id.push(this.$store.getters.get_build_place.seat_id[s]);
                }

                this.http_json(this.create_place_url,'post',this.create_place,this.success_create,this.fail_create);
            },

            /*查看治所*/
            show_tooltipinfo_seat(){
                if(this.$store.getters.get_build_place.seat_standard_name.length !== 0){
                    this.show_tooltip_seat = true;
                }
            },

            close_tooltip_seat(){
                if(this.$store.getters.get_build_place.seat_standard_name.length !== 0){
                    this.show_tooltip_seat = false;
                }
            }
        }
    }
</script>

<style>

</style>