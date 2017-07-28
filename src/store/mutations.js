/**
 * Created by Administrator on 2017/4/22.
 */
export default {
    login_show(state){
        state.show =! state.show
    },
    change_token(state,token){
       state.Token = token
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
    get_varieties_contents(state,varieties){
        state.varieties_contents = varieties
    },
    get_book_summary(state,summary){
        state.book_summary = summary
    },
    get_upload_file(state,file){
        state.upload_file = file
    },
    get_text_name(state,text_name){
        state.text_name = text_name
    },
    get_upload_book_index(state,index){
        state.upload_book_index = index
    },
    get_upload1_info(state,info){
        state.upload1_info = info
    },
    // character_id(state,num,id){
    //     for (let i = 0; i<num; i++){
    //         state.noumenon_character[i]=id[i]
    //     }
    // }
    get_create_character(state,data){
        state.create_character = data;
        console.log('state.create_character:'+JSON.stringify(state.create_character));
    },
    get_create_one_selection(state,number){
        state.create_one_selection = number;
        console.log('selection:'+state.create_one_selection);
    },
    put_bls(state,item){
        state.sort_item = item;
    },
    put_bls_name(state,item){
        state.sort_item_name = item;
    },
    push_search_content(state,item){
        state.search_content = item;
    },
    push_ancient_book_id(state,item){
        state.ancient_book_id = item;
    },
    get_create_place(state,data){
        state.create_place = data;
        console.log('state.create_place:'+JSON.stringify(state.create_place));
    },
    get_create_ins(state,data){
        state.create_ins = data;
        console.log('state.create_ins:'+JSON.stringify(state.create_ins));
    },
    get_create_terms(state,data){
        state.create_terms = data;
        console.log('state.create_terms: '+JSON.stringify(state.create_terms));
    },
    get_create_off(state,data){
        state.create_off = data;
        console.log('state.create_off: '+JSON.stringify(state.create_off));
    },
    get_create_time(state,data){
        state.create_time = data;
        console.log('state.create_time: '+JSON.stringify(state.create_time));
    },
    change_fork(state, bool){
        state.fork = bool;
    }
}