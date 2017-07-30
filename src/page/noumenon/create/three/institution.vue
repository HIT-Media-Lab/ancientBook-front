<template>
    <div class="zxwcreate">
        <p class="zxwcreate-title">新建本体</p>
        <img src="../../../../assets/img/no-use-picture/create-step3.png" class="zxwcreate-img">
        <create_word :prams="this.prams"></create_word>

        <p class="zxw-create-character">本体名称：{{this.$store.getters.get_build_ins.standard_name}}</p>

        <div class="zxw-character-row">
            <label class="zxw-character-span">机构名：</label>
            <input type="text" class="zxw-character-input-margin zxw-character-input-content" readonly v-model="this.$store.getters.get_build_ins.ins_name">
            <label class="zxw-character-span">英译：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_ins.english === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_ins.english" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">机构类型：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="ins_type[this.$store.getters.get_build_ins.type]">
            <label class="zxw-character-span">别名：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_ins.other_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_ins.other_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">主管职：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_ins.chief_office_name === '' " >
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_ins.chief_office_name" v-else>
            <label class="zxw-character-span">副官职：</label>
            <input type="text" class="zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_ins.vice_office_name === '' " >
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_ins.vice_office_name" v-else>
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">起始时间：</label>
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_ins.begin_standard_time">
            <label class="zxw-character-span">终止时间：</label>
            <input type="text" class="zxw-character-input-content" readonly v-model="this.$store.getters.get_build_ins.end_standard_time">
        </div>

        <div class="zxw-character-row">
            <label class="zxw-character-span">上级机构：</label>
            <input type="text" class=" zxw-character-input-margin zxw-character-input-content zxw-null" readonly value="不详" v-if="this.$store.getters.get_build_ins.parent_body_name === ''">
            <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_ins.parent_body_name" v-else>
        </div>

        <template v-if="this.$store.getters.get_build_ins.remark_1_name !== ''">
            <div>
                <label class="zxw-character-span" v-model="remark_1_name" v-bind="show_remark">{{remark_1_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_ins.remark_1">
            </div>
        </template>
        <template v-if="this.$store.getters.get_build_ins.remark_2_name !==''">
            <div>
                <label class="zxw-character-span" v-model="remark_2_name" v-bind="show_remark">{{remark_2_name}}</label>
                <input type="text" class="zxw-character-input-content zxw-character-input-margin" readonly v-model="this.$store.getters.get_build_ins.remark_2">
            </div>
        </template>
        <div class="zxw-build-step2-btn">
            <router-link to="/instwo">
                <button class="zxw-prebtn zxw-prebtn-margin zxw-prebtn-length">上一步</button>
            </router-link>

            <button class="zxw-nextbtn zxw-nextbtn-length" @click="open_confirm()">确认</button>
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
            if(to.name !== 'institutiontwo') {
                //清空Vuex
                this.$store.getters.get_build_ins.standard_name = '';
                this.$store.getters.get_build_ins.ins_name = '';
                this.$store.getters.get_build_ins.type = 0;
                this.$store.getters.get_build_ins.type_ins.splice(0, this.$store.getters.get_build_ins.type_ins.length);
                this.$store.getters.get_build_ins.english = '';
                this.$store.getters.get_build_ins.other_name = '';
                this.$store.getters.get_build_ins.begin_time_id = '';
                this.$store.getters.get_build_ins.begin_standard_time = '';
                this.$store.getters.get_build_ins.end_time_id = '';
                this.$store.getters.get_build_ins.end_standard_time = '';
                this.$store.getters.get_build_ins.remark_1_name = '';
                this.$store.getters.get_build_ins.remark_2_name = '';
                this.$store.getters.get_build_ins.remark_1 = '';
                this.$store.getters.get_build_ins.remark_2 = '';
                this.$store.getters.get_build_ins.chief_office_id = '';
                this.$store.getters.get_build_ins.chief_office_name = '';
                this.$store.getters.get_build_ins.vice_office_id = '';
                this.$store.getters.get_build_ins.vice_office_name = '';
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
                if( this.$store.getters.get_build_ins.remark_1_name !== ''){
                    this.remark_1_name = this.$store.getters.get_build_ins.remark_1_name+' :';
                } else{
                    this.remark_1_name = '';
                }

                if( this.$store.getters.get_build_ins.remark_2_name !== ''){
                    this.remark_2_name = this.$store.getters.get_build_ins.remark_2_name+' :';
                } else {
                    this.remark_2_name = '';
                }
            }
        },

        data(){
            return{
                prams:'',
                show_info:false,
                //close_icon:true,
                ins_type:['','全部机构','皇室机构','中央机构','地方机构','民间机构'],
                remark_1_name:'',
                remark_1:'',
                remark_2_name:'',
                remark_2:'',
                create_ins:{},
                create_ins_url:'/ancient_books/add_institution.action',
            }
        },
        methods:{
            success_create(response){
                this.show_info=true;
                this.$router.push({name:'ins_detail',params:{nouId:response.body.id}});
            },

            fail_create(){
                console.log("创建机构本体失败");
            },

            open_confirm(){
                this.create_ins.standard_name = this.$store.getters.get_build_ins.standard_name;
                this.create_ins.institution_name = this.$store.getters.get_build_ins.ins_name;
                this.create_ins.type = this.$store.getters.get_build_ins.type;
                this.create_ins.english = this.$store.getters.get_build_ins.english;
                this.create_ins.other_name = this.$store.getters.get_build_ins.other_name;
                this.create_ins.begin_time_id = this.$store.getters.get_build_ins.begin_time_id;
                this.create_ins.end_time_id = this.$store.getters.get_build_ins.end_time_id;
                this.create_ins.remark_1_name = this.$store.getters.get_build_ins.remark_1_name;
                this.create_ins.remark_1 = this.$store.getters.get_build_ins.remark_1;
                this.create_ins.remark_2_name = this.$store.getters.get_build_ins.remark_2_name;
                this.create_ins.remark_2 = this.$store.getters.get_build_ins.remark_2;
                this.create_ins.chief_office_id = this.$store.getters.get_build_ins.chief_office_id;
                this.create_ins.vice_office_id = this.$store.getters.get_build_ins.vice_office_id;
                this.create_ins.parent_body_id = this.$store.getters.get_build_ins.parent_body_id;
                this.http_json(this.create_ins_url,'post',this.create_ins,this.success_create,this.fail_create);
            }
        }
    }
</script>
