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
            'book_copy','sort_book','search_index','search_book',
            'search_noumenon',
            'alupload','privatebooks','collection','offer','mark',
            'ancientbook','comment','revise','chacheck',
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
        book_summary:'《诗经》是我国第一部诗歌总集，共收入自西周初年至春秋中叶大约五百多年的诗歌三百零五篇。《诗经》共分风（160篇）、雅（105篇）、颂（40篇）三大部分。它们都得名于音乐。“风”的意义就是声调。古人所谓《秦风》、《魏风》、《郑风》，就如现在我们说陕西调、山西调、河南调、“雅”是正的意思。周代人把正声叫做雅乐，犹如清代人把昆腔叫做雅部，带有一种尊崇的意味。大雅小雅可能是根据年代先后而分的。“颂”是用于宗庙祭的乐歌。',
        upload_file:{
            book_name : '',
            book_num : '',
            images : {},
            texts : {},
        },
        upload1_info:{},
        create_character:{
            standard_name:'',
            person_name:'',
            xing:'',
            shi:'',
            zi:'',
            other_name:'',
            birth_time_id:'',
            birth_value:'',
            death_time_id:'',
            dead_value:'',
            remark_1_name:'',
            remark_2_name:'',
            remark_1:'',
            remark_2:'',
            english:'',
            location_id:'',
            location:'',
            person_relations:[]
        },
        create_add_data:[{value:true}]
    },
    getters,
    mutations,
    actions,
});
export default store