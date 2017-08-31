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
            <input type="text" class="zxw-character-input-content zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.location_today" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">起始时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.begin_standard_time" @click="show_details_begin()">
            <label class="zxw-character-span">终止时间：</label>
            <input type="text" class="zxw-character-input-content zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.end_standard_time" @click="show_details_end()">
        </div>

        <!--时间具体信息查看-->
        <div class="zxw-character-row" v-if="show_details[0] === true || show_details[1] === true">
            <display_details class="zxw-display-details-top" :if_1="this.show_details[0] === true && this.$store.getters.get_build_place.begin_standard_time !== ''" :if_2="this.show_details[0] === false" :selected_details_1="1" :details_list="$store.getters.get_build_place.begin_standard_time" v-on:show_tipinfo="show_details_begin">
            </display_details>

            <display_details :if_1="show_details[1] === true && this.$store.getters.get_build_place.end_standard_time !== ''" :if_2="show_details[1] === false" :selected_details_1="1" :details_list="this.$store.getters.get_build_place.end_standard_time" v-on:show_tipinfo="show_details_end">
            </display_details>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">上级地名：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.s_location_standard_name ===''">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.s_location_standard_name" @click="show_details_s" v-else>
            <label class="zxw-character-span">下级地名：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.l_location_standard_name === '' " >
            <input type="text" class="zxw-character-input-content zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.l_location_standard_name" @click="show_details_l" v-else>
        </div>

        <!--地名具体信息查看-->
        <div class="zxw-character-row" v-if="show_details[2] === true || show_details[3] === true">
            <display_details class="zxw-display-details-top" :if_1="this.show_details[2] === true && this.$store.getters.get_build_place.s_location_standard_name !== ''" :if_2="this.show_details[2] === false" :selected_details_1="1" :details_list="$store.getters.get_build_place.s_location_standard_name" v-on:show_tipinfo="show_details_s">
            </display_details>

            <display_details :if_1="show_details[3] === true && this.$store.getters.get_build_place.l_location_standard_name !== ''" :if_2="show_details[3] === false" :selected_details_1="1" :details_list="this.$store.getters.get_build_place.l_location_standard_name" v-on:show_tipinfo="show_details_l">
            </display_details>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">治所：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_place.seat_standard_name.length === 0 " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin zxw-display-cursor" readonly v-model="this.$store.getters.get_build_place.seat_standard_name" @click="show_details_seat()" v-else>
        </div>

        <!--治所具体信息查看-->
        <div class="zxw-character-row" v-if="show_details[4] === true">
            <display_details :if_1="this.show_details[4] === true && this.$store.getters.get_build_place.seat_standard_name.length > 0" :if_2="this.show_details[4] === false" :selected_details_1="0" :details_list="$store.getters.get_build_place.seat_standard_name" v-on:show_tipinfo="show_details_seat">
            </display_details>
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
        <success_create :show_info="show_info"></success_create>
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
    import display_details from '../../../../component/display-details.vue';
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
                if(this.show_info === true){
                    window.setTimeout(function () {
                        this.show_info = false;
                        next();
                    }, 1500);

                } else{
                    next();
                }

            } else {
                next();
            }

        },

        components:{
            create_word,
            success_create,
            display_details
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
                show_details:[false,false,false,false,false],
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

            show_details_begin(){
                if(this.show_details[0] === false && this.$store.getters.get_build_place.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,true);
                } else if(this.show_details[0] === true && this.$store.getters.get_build_place.begin_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(0,1,false);
                }
            },

            show_details_end(){
                if(this.show_details[1] === false && this.$store.getters.get_build_place.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,true);
                } else if(this.show_details[1] === true && this.$store.getters.get_build_place.end_standard_time !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(1,1,false);
                }
            },

            show_details_s(){
                if(this.show_details[2] === false && this.$store.getters.get_build_place.s_location_standard_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(2,1,true);
                } else if(this.show_details[2] === true && this.$store.getters.get_build_place.s_location_standard_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(2,1,false);
                }
            },

            show_details_l(){
                if(this.show_details[3] === false && this.$store.getters.get_build_place.l_location_standard_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(3,1,true);
                } else if(this.show_details[3] === true && this.$store.getters.get_build_place.l_location_standard_name !== ''){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(3,1,false);
                }
            },

            show_details_seat(){
                if(this.show_details[4] === false && this.$store.getters.get_build_place.seat_standard_name.length > 0){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(4,1,true);
                } else if(this.show_details[4] === true && this.$store.getters.get_build_place.seat_standard_name.length > 0){
                    for(let i = 0;i < this.show_details.length;i++){
                        this.show_details[i] = false;
                    }
                    this.show_details.splice(4,1,false);
                }
            }
        }
    }
</script>

<style>

</style>