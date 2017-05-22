/**
 * Created by Administrator on 2017/4/22.
 */
export default {
   login_show(state){
        state.show=!state.show
    },
    change_token(state,token){
       state.Token=token
    },
    change_iflogin0(state){
        state.ifLogin = '0'
    },
    change_iflogin1(state){
        state.ifLogin = '1'
    },
    change_iflogin2(state){
        state.ifLogin = '2'
    }
}