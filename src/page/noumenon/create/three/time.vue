<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_time.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">朝代：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.selected_chaodai.chinese_name">
            <label class="zxw-character-span">年号：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_nianhao.chinese_name === ''" >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.selected_nianhao.chinese_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">年份：</label>
            <input type="text" class="zxw-character-input-content zxw-null zxw-character-input-margin" readonly value="不详" v-if="this.$store.getters.get_build_time.year === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_time.year" v-else>
            <label class="zxw-character-span">月：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_1_month.chinese_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.selected_1_month.chinese_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">日：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_1_day.chinese_name === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_time.selected_1_day.chinese_name" v-else>
            <label class="zxw-character-span">干支：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_ganzhi.chinese_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.selected_ganzhi.chinese_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">节气：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_jieqi === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_time.selected_jieqi" v-else>
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">绝对日号：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.juedui === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_time.juedui" v-else>
            <label class="zxw-character-span">公元年份：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.g_year === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_time.g_year" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">月：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_2_month.chinese_name === null">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="g_month" v-else>
            <label class="zxw-character-span">日：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_time.selected_2_day.chinese_name === null">
            <input type="text" class="zxw-character-input-content" readonly v-model="g_day" v-else>
        </div>

        <div class="zxw-build-step2-btn">
            <router-link to="/timetwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()" v-bind:disabled="this.$store.getters.get_build_time.length === 0">确认</button>
        </div>
        <success_create :show_info="show_info"></success_create>
    </div>

</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    import modal from '../../../../component/modal.vue';
    export default{
        beforeRouteLeave (to, from, next){
            if(to.name !== 'timetwo') {
                //清空Vuex
                this.$store.getters.get_build_time.standard_name = '';
                this.$store.getters.get_build_time.year='';
                this.$store.getters.get_build_time.g_year='';
                this.$store.getters.get_build_time.juedui='';
                this.$store.getters.get_build_time.selected_ganzhi.item_1_id='';
                this.$store.getters.get_build_time.selected_ganzhi.chinese_name='';
                this.$store.getters.get_build_time.selected_chaodai.item_1_id='';
                this.$store.getters.get_build_time.selected_chaodai.chinese_name='';
                this.$store.getters.get_build_time.selected_nianhao.item_2_id='';
                this.$store.getters.get_build_time.selected_nianhao.chinese_name='';
                this.$store.getters.get_build_time.selected_1_month.item_1_id='';
                this.$store.getters.get_build_time.selected_1_month.chinese_name='';
                this.$store.getters.get_build_time.selected_1_day.item_1_id='';
                this.$store.getters.get_build_time.selected_1_day.chinese_name='';
                this.$store.getters.get_build_time.selected_2_month.item_1_id='';
                this.$store.getters.get_build_time.selected_2_month.chinese_name=null;
                this.$store.getters.get_build_time.selected_2_day.item_1_id='';
                this.$store.getters.get_build_time.selected_2_day.chinese_name=null;
                this.$store.getters.get_build_time.selected_jieqi='';
                this.$store.getters.get_build_time.english='';
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
            modal
        },

        created(){
            this.prams = this.$route.name;
            this.g_month_day();
        },

        data(){
            return{
                prams:'',
                show_info:false,
                create_time:{},
                create_time_url:'/ancient_books/add_time.action',
                g_month:'',
                g_day:''
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'time_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建时间本体失败");
            },

            open_confirm(){
                this.create_time.standard_name = this.$store.getters.get_build_time.standard_name;
                this.create_time.chaodai = this.$store.getters.get_build_time.selected_chaodai.item_1_id;
                this.create_time.nianhao = this.$store.getters.get_build_time.selected_nianhao.item_2_id;
                this.create_time.nianfen = this.$store.getters.get_build_time.year;
                this.create_time.ri = this.$store.getters.get_build_time.selected_1_day.item_1_id;
                this.create_time.yue = this.$store.getters.get_build_time.selected_1_month.item_1_id;
                this.create_time.ganzhi = this.$store.getters.get_build_time.selected_ganzhi.item_1_id;
                this.create_time.juedui = parseInt(this.$store.getters.get_build_time.juedui);
                this.create_time.gongyuan = parseInt(this.$store.getters.get_build_time.g_year);
                this.create_time.g_yue = this.$store.getters.get_build_time.selected_2_month.item_1_id;
                this.create_time.g_ri = this.$store.getters.get_build_time.selected_2_day.item_1_id;
                this.create_time.g_yue = this.$store.getters.get_build_time.selected_2_month.item_1_id;
                this.create_time.english = this.$store.getters.get_build_time.english;
                this.create_time.jieqi = this.$store.getters.get_build_time.selected_jieqi;
                this.http_json(this.create_time_url,'post',this.create_time,this.success_create,this.fail_create);
            },

            g_month_day(){
                if(this.$store.getters.get_build_time.selected_2_month.chinese_name !== ''){
                    this.g_month = this.$store.getters.get_build_time.selected_2_month.chinese_name+'月'
                }
                if(this.$store.getters.get_build_time.selected_2_day.chinese_name !== ''){
                    this.g_day = this.$store.getters.get_build_time.selected_2_day.chinese_name+'日'
                }
            }
        }
    }
</script>
