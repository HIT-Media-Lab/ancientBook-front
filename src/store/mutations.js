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
    get_menu_contents(state,menu_contents){
        state.menu_items = menu_contents
    },
    get_copy_contents(state,copy){
        state.copy_contents = copy
    },
    get_edition_contents(state,edition){
        state.edition_contents = edition
    },
    get_impression_contents(state,impression){
        state.impression_contents = impression
    },
    get_copy_varieties(state,varieties){
        state.varieties_contents = varieties
    },
    get_book_summary(state,summary){
        state.book_summary = summary
    },
    get_upload_file(state,file){
        state.upload_file = file
    },
    get_upload1_info(state,info){
        state.upload1_info = info
    }
    // character_id(state,num,id){
    //     for (let i = 0; i<num; i++){
    //         state.noumenon_character[i]=id[i]
    //     }
    // }
}