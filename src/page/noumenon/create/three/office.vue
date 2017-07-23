<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_off.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">职官名：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.office_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_off.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-null  zxw-character-input-margin" readonly value="不详" v-if="this.$store.getters.get_build_off.other_name === '' " >
            <input type="text" class="zxw-character-input-content  zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.other_name" v-else>
            <label class="zxw-character-span">隶属机构：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.institution_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">起始时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.begin_standard_time">
            <label class="zxw-character-span">终止时间：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.end_standard_time">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">上级职官：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_off.s_office_name === ''">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.s_office_name" v-else>
            <label class="zxw-character-span">品级：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_off.selected_level.chinese_name">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">所属朝代：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_off.dynasty === ''">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.dynasty" v-else>
        </div>

        <template v-if="this.$store.getters.get_build_off.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_off.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_off.remark_2">
            </div>
        </template>
        <div class="zxw-build-step2-btn">
            <router-link to="/offtwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()" v-bind:disabled="this.$store.getters.get_build_off.length === 0">确认</button>
        </div>
        <success_create id="show_info" :show_info="show_info"></success_create>
    </div>

</template>

<script>

    import create_word from '../../../../component/create-word.vue';
    import success_create from '../../../../component/success_create.vue';
    import modal from '../../../../component/modal.vue';
    export default{
        beforeRouteLeave (to, from, next){
            if(to.name !== 'officetwo') {
                //清空Vuex
                this.$store.getters.get_build_off.standard_name = '';
                this.$store.getters.get_build_off.office_name = '';
                this.$store.getters.get_build_off.level = 0;
                this.$store.getters.get_build_off.english = '';
                this.$store.getters.get_build_off.other_name = '';
                this.$store.getters.get_build_off.dynasty = '';
                this.$store.getters.get_build_off.institution_name = '';
                this.$store.getters.get_build_off.institution_id = '';
                this.$store.getters.get_build_off.s_office_id = '';
                this.$store.getters.get_build_off.s_office_name = '';
                this.$store.getters.get_build_off.selected_level.item_1_id = 0;
                this.$store.getters.get_build_off.selected_level.chinese_name = '';
                this.$store.getters.get_build_off.begin_time_id = '';
                this.$store.getters.get_build_off.begin_standard_time = '';
                this.$store.getters.get_build_off.end_time_id = '';
                this.$store.getters.get_build_off.end_standard_time = '';
                this.$store.getters.get_build_off.remark_1_name = '';
                this.$store.getters.get_build_off.remark_2_name = '';
                this.$store.getters.get_build_off.remark_1 = '';
                this.$store.getters.get_build_off.remark_2 = '';
                //模态框自动关闭
                window.setTimeout(function () {
                    document.getElementById("show_info").setAttribute('class', 'zxw-show-info');
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
                if( this.$store.getters.get_build_off.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_off.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_off.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_off.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                prams:'',
                show_info:false,
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_off:{},
                create_off_url:'/ancient_books/add_office.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'off_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建职官本体失败");
            },

            open_confirm(){
                this.create_off.standard_name = this.$store.getters.get_build_off.standard_name;
                this.create_off.office_name = this.$store.getters.get_build_off.office_name;
                this.create_off.level = this.$store.getters.get_build_off.selected_level.item_1_id;
                this.create_off.english = this.$store.getters.get_build_off.english;
                this.create_off.other_name = this.$store.getters.get_build_off.other_name;
                this.create_off.begin_time_id = this.$store.getters.get_build_off.begin_time_id;
                this.create_off.end_time_id = this.$store.getters.get_build_off.end_time_id;
                this.create_off.remark_1_name = this.$store.getters.get_build_off.remark_1_name;
                this.create_off.remark_1 = this.$store.getters.get_build_off.remark_1;
                this.create_off.remark_2_name = this.$store.getters.get_build_off.remark_2_name;
                this.create_off.remark_2 = this.$store.getters.get_build_off.remark_2;
                this.create_off.s_office_id = this.$store.getters.get_build_off.s_office_id;
                this.create_off.institution_id = this.$store.getters.get_build_off.institution_id;
                this.create_off.dynasty = this.$store.getters.get_build_off.dynasty;
                this.http_json(this.create_off_url,'post',this.create_off,this.success_create,this.fail_create);
            }
        }
    }
</script>
