import { 
    FETCH_MY_ALL_ITEM_LIST, 
    FETCH_MY_PROFILE, 
    FETCH_SEARCH_USER_LIST, 
    ADD_FOLLOW_LIST,
    REMOVE_FOLLOW_LIST,
    FETCH_OTHERS_ITEM_LIST, 
    FETCH_NOTI_LIST,
} from './mutations-types'

export default {
    [FETCH_MY_ALL_ITEM_LIST] (state, items){
        state.myAllItemList = items;
        state.loading = false;
    },
    [FETCH_MY_PROFILE](state, profile){
        state.myProfile = profile;
        state.loading = false;
    },
    [FETCH_SEARCH_USER_LIST](state, users){
        state.searchUserList = users;
    },
    [FETCH_OTHERS_ITEM_LIST](state, items){
        state.othersAllItemList = items;
        state.loading = false;
    },
    [ADD_FOLLOW_LIST](state, user){
        state.myProfile.followingId.push(user);
    },
    [REMOVE_FOLLOW_LIST](state, user){
        const index = state.myProfile.followingId.findIndex(f=>f._id == user._id); //myProfile의 followingId는 유저객체이다.
        state.myProfile.followingId.splice(index, 1);
    },
    [FETCH_NOTI_LIST](state, notis){
        state.notiList = notis;
    },
    increaseNoti(state){
        state.notiNum = state.notiNum+1;
    },
    removeNoti(state){
        state.notiNum = 0;
    },
    startLoading(state){
        state.loading = true;
    },
    endLoading(state){
        state.loading = false;
    },
    setCurrentUser(state, user){
        state.currentUser = user;
    },
    saveQuery(state, query){
        state.query = query;
    },
    removeItem(state, item){
        const index = state.myAllItemList.findIndex(el => el._id == item._id);
        if(index){
            state.myAllItemList.splice(index, 1);
        }
    },
    auth_request(state){
        state.status = 'auth_loading'
    },
    auth_success(state, payload){
        state.status = 'success';
        state.token = payload.token;
        state.userId = payload.userId;
        this._vm.$socket.emit('uid', state.userId);
    },
    auth_error(state){
        state.status = 'error';
        localStorage.removeItem('wishToken');
    },
    register_error(state, msg){
        state.registerErrMsg = msg;
    },
    logout(state){
        state.status = ''
        state.token = '';
        state.userId = ''
    },
    update_sid(state, sid){
        state.sid = sid;
    },
    tab1(state){
        state.tab1 = true;
        state.tab2 = false;
        state.tab3 = false;
        state.tab4 = false;
    },
    tab2(state){
        state.tab1 = false;
        state.tab2 = true;
        state.tab3 = false;
        state.tab4 = false;
    },
    tab3(state){
        state.tab1 = false;
        state.tab2 = false;
        state.tab3 = true;
        state.tab4 = false;
    },
    tab4(state){
        state.tab1 = false;
        state.tab2 = false;
        state.tab3 = false;
        state.tab4 = true;
    },
}