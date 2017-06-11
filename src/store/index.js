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
            'character','recent','char_detail','upload1','upload2',
            'upload3','copy','edition','impression','varieties',
            'char_detail','bookstore','book_recent','book_info',
            'book_varieties','book_edition','book_impression',
            'book_copy',
            'alupload','privatebooks','collection','offer','mark',
            'ancientbook','comment','revise','search','chacheck',
            'build','charactertwo','characterthree'],
        acl_admin:['login','404','admin'],
        acl_guest:['login', '404'],
        a:{},
        menu_items:[],
        copy_contents:{
            duplicate_book_count : '',
            duplicate_level : '',
            duplicate_complete : '',
            duplicate_attachment : '',
            copy_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : '',
                explain : '',
                confirm : '',
                type : '',
                level : 4,
            }
        },
        edition_contents:{
            version_volume : '',
            version_type : '',
            version_age : '',
            version_support : '',
            version_binding : '',
            version_frame_length : '',
            version_frame_width : '',
            version_format_length : '',
            version_format_width : '',
            version_paiji_content : '',
            version_paiji_location : '',
            version_half_page_line_number : '',
            version_page_line_number : '',
            version_yuwei : '',
            version_double_page_number : '',
            version_bianlan : '',
            version_fenlan : '',
            version_shukou : '',
            version_banxin_content : '',
            version_youshuwuer : '',
            version_youwujiazhu  : '',
            edition_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : '',
                explain : '',
                confirm : '',
                type : '',
                level : 2,
            }
        },
        impression_contents:{
            printing_type : '',
            printing_number : '',
            impression_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : '',
                explain : '',
                confirm : '',
                type : '',
                level : 3,
            }
        },
        varieties_contents:{
            type_name : '',
            type_other_name : '',
            english : '',
            type_save : '',
            type_level : '',
            type_bu : '',
            type_lei : '',
            type_shu : '',
            type_summary : '',
            literature_standard_name : '',
            varieties_responsibility : {
                location_id : '',
                person_id : '',
                begin_time : '',
                end_time : '',
                action : '',
                explain : '',
                confirm : '',
                type : '',
                level : 1,
            }
        },
        book_summary:'',
        upload_file:{},
        upload1_info:{},
    },
    getters,
    mutations,
    actions,
});
export default store