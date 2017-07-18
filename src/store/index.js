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
            ['login','404','bookstore','user','upload1','mybook',
            'character','recent','char_detail','char_edit','place','pla_detail','pla_edit','institution','ins_detail','ins_edit','upload1','upload2',
            'upload3','copy','edition','impression','varieties',
            'bookstore','book_recent','book_info',
            'book_varieties','book_edition','book_impression',
            'book_copy','sort_book','search_index','search_book',
            'search_noumenon','modify_info','user_info',
            'alupload','privatebooks','collection','offer','mark',
            'ancientbook','comment','revise','chacheck','edit',
            'build','charactertwo','characterthree','placetwo','placethree','institutiontwo','institutionthree'],
        acl_admin:['404','admin','modify_info'],
        acl_guest:['login', '404'],
        a:{},
        menu_items:[],
        copy_contents:{
            duplicate_book_count : '',
            duplicate_level : 1,
            duplicate_complete : 1,
            duplicate_attachment : '',
            copy_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 4,
            }
        },
        edition_contents:{
            version_volume : '',
            version_type : 1,
            version_age : 1,
            version_support : 1,
            version_binding : 1,
            version_frame_length : '',
            version_frame_width : '',
            version_format_length : '',
            version_format_width : '',
            version_paiji_content : '',
            version_paiji_location : '',
            version_half_page_line_number : '',
            version_page_line_number : '',
            version_yuwei : 1,
            version_double_page_number : '',
            version_bianlan : 1,
            version_fenlan : 1,
            version_shukou : 1,
            version_banxin_content : '',
            version_youshuwuer : '',
            version_youwujiazhu  : 1,
            edition_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 2,
            }
        },
        impression_contents:{
            printing_type : 1,
            printing_number : '',
            impression_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 3,
            }
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
            varieties_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : 1,
                action_value : '',
                explain : '',
                confirm : 1,
                type : 1,
                level : 1,
            }
        },
        book_summary:'',
        upload_file:{
            book_name : '',
            book_num : '',
        },
        images : [],
        picture_name : [],
        texts : [],
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

        create_one_selection:0,

        sort_item:{},
        sort_item_name:{},
        search_content: '',

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
    },
    getters,
    mutations,
    actions,
});
export default store