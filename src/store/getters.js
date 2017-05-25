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
    }


}