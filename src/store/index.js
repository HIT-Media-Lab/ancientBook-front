/**
 * Created by Administrator on 2017/4/16.
 */
import Vue        from 'vue'
import Vuex       from 'vuex'
import  actions from './actions'
import  mutations from  './mutations'
import  getters from  './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        show:true,
        ifLogin:'guest',
        Token:'',
        acl_user:
            ['login','404','403','bookstore','user','upload1','mybook',
            'character','recent','char_detail','char_edit','char_check','place','pla_detail','pla_edit','institution','ins_detail','ins_edit','ins_check','terms','terms_detail','terms_edit','office','off_detail','off_edit',
               'time','time_detail','time_edit','literature','lit_detail','lit_edit', 'upload1','upload2',
            'upload3','copy','edition','impression','varieties',
            'bookstore','book_recent','book_info',
            'book_varieties','book_edition','book_impression',
            'book_copy','sort_book','search_index','search_book',
            'search_noumenon','modify_info','user_info',
            'alupload','privatebook','collection','offer',
            'ancientbook','comment','revise','edit','mark',
            'build','charactertwo','characterthree','placetwo','placethree','institutiontwo','institutionthree','termstwo','termsthree','officetwo','officethree','littwo','litthree'],
        acl_admin:['404','403','admin','modify_info'],
        acl_guest:['login', '404','403'],
        a:{},
        menu_items:[],
        copy_contents:{
            duplicate_book_count_str : '',
            duplicate_book_count : null,
            duplicate_level : 1,
            duplicate_complete : 1,
            duplicate_attachment : '',
            copy_responsibility : [{
                value_add : true,
                value_del : false,
                location : '',
                location_id : '',
                person : '',
                person_id : '',
                begin_time : '',
                begin_time_id : '',
                end_time : '',
                end_time_id : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 4,
            }]
        },
        edition_contents:{
            version_volume_str : '',
            version_volume : null,
            version_type : 1,
            version_age : 1,
            version_support : 1,
            version_binding : 1,
            version_frame_length_str : '',
            version_frame_length : null,
            version_frame_width_str : '',
            version_frame_width : null,
            version_format_length_str : '',
            version_format_length : null,
            version_format_width_str : '',
            version_format_width : null,
            version_paiji_content : '',
            version_paiji_location : '',
            version_half_page_line_number_str : '',
            version_half_page_line_number : null,
            version_page_line_number_str : '',
            version_page_line_number : null,
            version_yuwei : 1,
            version_double_page_number_str : '',
            version_double_page_number : null,
            version_bianlan : 1,
            version_fenlan : 1,
            version_shukou : 1,
            version_banxin_content : '',
            version_youshuwuer : '',
            version_youwujiazhu  : 1,
            edition_responsibility : [{
                value_add : true,
                value_del : false,
                location : '',
                location_id : '',
                person : '',
                person_id : '',
                begin_time : '',
                begin_time_id : '',
                end_time : '',
                end_time_id :'',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 2,
            }]
        },
        impression_contents:{
            printing_type : 1,
            printing_number : '',
            impression_responsibility : [{
                value_add : true,
                value_del : false,
                location : '',
                location_id : '',
                person : '',
                person_id : '',
                begin_time : '',
                begin_time_id : '',
                end_time : '',
                end_time_id :'',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 3,
            }]
        },
        varieties_contents:{
            type_name : '',
            type_other_name : '',
            english : '',
            type_save : 1,
            type_level : 1,
            type_bu : 1,
            type_lei : 1,
            type_shu : 1,
            type_summary : '',
            literature_standard_name : '',
            varieties_responsibility : [{
                value_add : true,
                value_del : false,
                location : '',
                location_id : '',
                person : '',
                person_id : '',
                begin_time : '',
                begin_time_id : '',
                end_time : '',
                end_time_id :'',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 1,
            }]
        },
        book_summary:'',
        upload_book_index : 0,
        upload_file : [{
            value : true,
            book_name : '',
            book_num : '',
            images : [],
            texts : [],
        }],
        text_name : [],
        upload1_info:{},
        create_character:{
            standard_name:'',
            person_name:'',
            xing:'',
            shi:'',
            zi:'',
            other_name:'',
            birth_time_id:'',
            birth_standard_name:'',
            death_time_id:'1',
            death_standard_name:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:'',
            english:'',
            location_id:'',
            location:'',
            father:{},
            mother:{},
            son:[],
            daughter:[],
            brother:[],
            sister:[],
            teacher:[],
            student:[],
            friend:[],
            father_standard_name:'',
            mother_standard_name:'',
            son_standard_name:[],
            daughter_standard_name:[],
            brother_standard_name:[],
            sister_standard_name:[],
            teacher_standard_name:[],
            student_standard_name:[],
            friend_standard_name:[],
        },

        create_place:{
            standard_name:'',
            location_name:'',
            longitude:'',
            latitude:'',
            location_today:'',
            other_name:'',
            begin_time_id:'',
            begin_standard_time:'',
            end_time_id:'',
            end_standard_time:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:'',
            english:'',
            s_location_id:'',
            l_location_id:'',
            seat_id:[],
            s_location_standard_name:'',
            l_location_standard_name:'',
            seat_standard_name:[]
        },

        create_ins:{
            standard_name:'',
            ins_name:'',
            type:1,
            type_ins:[],
            english:'',
            other_name:'',
            begin_time_id:'',
            begin_standard_time:'',
            end_time_id:'',
            end_standard_time:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:'',
            chief_office_id:'',
            chief_office_name:'',
            vice_office_id:'',
            vice_office_name:'',
            parent_body_id:'',
            parent_body_name:''
        },

        create_terms:{
            standard_name:'',
            terms_name:'',
            selected_course:{
                item_1_id:0,
                chinese_name:''
            },
            course_subdivision:1,
            english:'',
            other_name:'',
            explain:'',
            begin_time_id:'',
            begin_standard_time:'',
            end_time_id:'',
            end_standard_time:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:''
        },

        create_off:{
            standard_name:'',
            office_name:'',
            english:'',
            other_name:'',
            institution_id:'',
            institution_name:'',
            s_office_id:'',
            s_office_name:'',
            dynasty:'',
            selected_level:{
                item_1_id:0,
                chinese_name:''
            },
            begin_time_id:'',
            begin_standard_time:'',
            end_time_id:'',
            end_standard_time:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:''
        },

        create_time:{
            standard_name:'',
            selected_chaodai:{
                item_1_id:0,
                chinese_name:''
            },
            selected_nianhao:{
                item_2_id:0,
                chinese_name:''
            },
            year:'',
            selected_1_month:{
                item_1_id:0,
                chinese_name:''
            },
            selected_1_day:{
                item_1_id:0,
                chinese_name:''
            },
            selected_ganzhi:{
                item_1_id:0,
                chinese_name:''
            },
            juedui:'',
            g_year:'',
            selected_2_month:{
                item_1_id:0,
                chinese_name:''
            },
            selected_2_day:{
                item_1_id:0,
                chinese_name:''
            },
            selected_jieqi:'',
            english:''
        },

        create_literature:{
            standard_name:'',
            type_name: '',   //书名
            type_other_name: '', //别名
            english: '',
            type_summary: '',
            selected_save: {    //选择的存佚类型
                item_1_id: 0,
                chinese_name: ''
            },
            selected_level: {   //选择的品种级别
                item_1_id: 0,
                chinese_name: ''
            },
            selected_bu: {
                item_1_id: 0,
                chinese_name: ''
            },
            selected_lei: {
                item_2_id: 0,
                chinese_name: ''
            },
            selected_shu: {
                item_3_id: 0,
                chinese_name: ''
            },
            varieties_arr: []
        },

        create_one_selection:0,
        chaodai_data:'',
        character_data:'',

        sort_item:{},
        sort_item_name:{},
        search_content: '',

        ancient_book_id: '',
        fork: true,

        book_all_info : {},
        first_layer_info : {},
        three_layers_info : {},
    },
    getters,
    mutations,
    actions,
});
export default store