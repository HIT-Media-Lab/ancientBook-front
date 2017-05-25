/**
 * Created by Administrator on 2017/4/22.
 */
export default {
    LOGIN_SHOW({commit}){
      return commit('login_show')
    },

    CHANGE_GUEST({commit}){
        return commit('change_guest')
    },

    CHANGE_ADMIN({commit}){
        return commit('change_admin')
    },

    CHANGE_user({commit}){
        return commit('change_user')
    },
}