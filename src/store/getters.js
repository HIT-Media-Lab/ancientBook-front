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
    get_upload_book_index:state => {
        return state.upload_book_index
    },
    get_upload_file:state => {
        return state.upload_file
    },
    get_text_name:state => {
        return state.text_name
    },
    get_book_summary:state => {
        return state.book_summary
    },
    get_upload1_info:state => {
        return state.upload1_info
    },
    get_build_character:state => {
        return state.create_character
    },
    get_create_one_selection:state => {
        return state.create_one_selection
    },
    get_bls:state => {
        return state.sort_item
    },
    get_bls_name:state => {
        return state.sort_item_name
    },
    get_search_content: state => {
        return state.search_content
    },
    get_ancient_book_id: state => {
        return state.ancient_book_id
    },
    get_build_place:state => {
    return state.create_place
    },
    get_build_ins:state => {
        return state.create_ins
    },
    get_build_terms:state => {
        return state.create_terms
    },
    get_build_time:state => {
        return state.create_time
    },
    get_build_off:state => {
        return state.create_off
    },
    get_build_lit:state => {
        return state.create_literature
    },
    get_chaodai_data:state => {
        return state.chaodai_data
    },
    get_character_data:state => {
        return state.character_data
    },
    get_fork:state => {
        return state.fork;
    },
    get_book_all_info:state => {
        return state.book_all_info;
    },
    get_first_layer_info:state => {
        return state.first_layer_info;
    },
    get_three_layers_info:state => {
        return state.three_layers_info;
    }





}