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
    change_guest(state){
        state.ifLogin = 'guest'
    },
    change_admin(state){
        state.ifLogin = 'admin'
    },
    change_user(state){
        state.ifLogin = 'user'
    },
    // character_id(state,num,id){
    //     for (let i = 0; i<num; i++){
    //         state.noumenon_character[i]=id[i]
    //     }
    // }
}