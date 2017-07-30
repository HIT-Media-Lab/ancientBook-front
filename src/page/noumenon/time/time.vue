<template>
    <div class="zxwnoumenom-body">
        <noumenon_title :title="this.time_content.standard_name">
            <noumenon_button slot="children" :noumenon_number="4"></noumenon_button>
        </noumenon_title>

        <div class=" zxw-characterbody">
            <p class="zxwspan-length">朝代：</p>
            <p class="zxwspan-length" v-model="time_content.chaodai">{{time_content.chaodai}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">年号：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.nianhao === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.nianhao" v-else>{{time_content.nianhao}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">年份：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.year === ''">不详</p>
            <span class="zxwspan-length" v-model="time_content.year" v-else>{{time_content.year}}</span>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">月：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.month_name === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.month_name" v-else>{{time_content.month_name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">日：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.day_name === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.day_name" v-else>{{time_content.day_name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">干支：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.ganzhi_name === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.ganzhi_name" v-else>{{time_content.ganzhi_name}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">节气：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.jieqi === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.jieqi" v-else>{{time_content.jieqi}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">英译：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.english === ''">不详</p>
            <p class="zxwspan-length" v-model="time_content.english" v-else>{{time_content.english}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">绝对日号：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.juedui === null">不详</p>
            <p class="zxwspan-length" v-model="time_content.juedui" v-else>{{time_content.juedui}}</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">公元年份：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.g_year ===null">不详</p>
            <p class="zxwspan-length" v-model="time_content.g_year" v-else>{{time_content.g_year}}年</p>
        </div>

        <div class="zxw-infospan">
            <p class="zxwspan-length">月：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.g_month === null ">不详</p>
            <p class="zxwspan-length" v-model="time_content.g_month" v-else>{{time_content.g_month}}月</p>
        </div>
        <div class="zxw-infospan">
            <p class="zxwspan-length">日：</p>
            <p class="zxwspan-length zxw-null" v-if="time_content.g_day === null">不详</p>
            <p class="zxwspan-length" v-model="time_content.g_day" v-else>{{time_content.g_day}}日</p>
        </div>

    </div>
</template>

<script>
    /*let Mock = require('mockjs');
     Mock.mock('/ancient_books/get_time_by_id.action?id=7789','get',{
     "status|200":200,
     "standard_name": "宋朝天宝2017",
     "chaodai|1":1,
     "chaodai_name": "宋朝",
     "nianhao|1":1,
     "nianhao_name": "天宝",
     "nianfen": "2017",
     "yue|1": 1,
     "yue_name":'一月',
     "ri|1": 1,
     "ri_name":'一日',
     "ganzhi_name":'干支1',
     "ganzhi|1":1,
     "juedui|1": 1,
     "gongyuan|1": 1,
     "g_yue|1": 1,
     "g_ri|2":2,
     "english": 'shijian',
     "jieqi": "节气1"
     });*/

    import noumenon_title from '../../../component/noumenon-title.vue';
    import noumenon_button from '../../../component/noumenon-button.vue';
    export default{
        created(){
            this.time_info();
        },
        components:{
            noumenon_title,
            noumenon_button
        },
        data(){
            return{
                title:'',
                get_time_url:'/ancient_books/get_time_by_id.action',
                delete_time_url:'/ancient_books/delete_time_by_id.action',
                time_content:{
                    standard_name: '',
                    chaodai_name: '',
                    nianhao_name: '',
                    year: '',
                    month_name:'',
                    day_name: '',
                    ganzhi_name: '',
                    juedui:null,
                    g_year: null,
                    g_month: '',
                    g_day:'' ,
                    english: '',
                    jieqi:''
                },
                show_info:false
            }
        },

        methods:{
            /*根据id显示时间*/
            time_info(){
                let time_object={};
                let new_url = this.get_time_url +'?id='+this.$route.params.nouId;
                this.http_json(new_url,'get',time_object,this.success_id,this.fail_id);
            },

            success_id(response){
                this.time_content.standard_name = response.body.standard_name;
                this.time_content.chaodai = response.body.chaodai_name;
                this.time_content.nianhao = response.body.nianhao_name;
                this.time_content.year = response.body.nianfen;
                this.time_content.month_name = response.body.yue_name;
                this.time_content.day_name = response.body.ri_name;
                this.time_content.ganzhi_name = response.body.ganzhi_name;
                this.time_content.juedui = response.body.juedui;
                this.time_content.g_year = response.body.gongyuan;
                this.time_content.g_month = response.body.g_yue_name;
                this.time_content.g_day = response.body.g_ri_name;
                this.time_content.english = response.body.english;
                this.time_content.jieqi = response.body.jieqi;
                console.log(JSON.stringify('time_content: '+this.time_content));
            },

            fail_id(response){
                console.log("具体显示时间失败");
            }
        }
    }
</script>