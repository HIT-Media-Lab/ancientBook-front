/**
 * Created by Administrator on 2017/4/22.
 */

export default {
    GetShow:state => {
        return state.show
    },

    IfLogin:state =>{
        return state.ifLogin
    },

    GetToken:state => {
        return state.Token
    },
    ACL_user:state => {
        return state.acl_user
    },
    ACL_admin:state => {
        return state.acl_admin
    },
    ACL_guest:state => {
        return state.acl_guest
    },
    get_menu_item:state => {
        return state.menu_items
    },
    get_varieties_item:state => {
        return state.varieties_contents
    },
    get_edition_item:state => {
        return state.edition_contents
    },
    get_impression_item:state => {
        return state.impression_contents
    },
    get_copy_item:state => {
        return state.copy_contents
    },


}