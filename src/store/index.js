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
        copy_contents:{},
        edition_contents:{},
        impression_contents:{},
        varieties_contents:{},
        book_summary:'',
        upload_file:{},
        upload1_info:{},
    },
    getters,
    mutations,
    actions,
});
export default store