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
            ['/login','/404','/bookstore','/noumenon_store','/user','/upload_step1','/mybook_index',
            '/alupload_index','/private_books_index','/my_collection_index','/my_offer_index','/noumenon_mark',
            '/picture_word','/comment','/revise','/search_index','/charater_noumenon','/charater_noumenon_check',
            '/build_noumenon','/build_character_steptwo','/build_character_stepthree'],
        acl_admin:['/login','/404','/super_user'],
        acl_guest:['/login','/404'],
        noumenon_character:[]

    },
    getters,
    mutations,
    actions,
});
export default store