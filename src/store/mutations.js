import { 
    FETCH_MY_ALL_ITEM_LIST, 
    FETCH_MY_PROFILE, 
    FETCH_SEARCH_USER_LIST, 
    ADD_FOLLOW_LIST,
    REMOVE_FOLLOW_LIST, 
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
    [ADD_FOLLOW_LIST](state, user){
        state.myProfile.followingId.push(user);
    },
    [REMOVE_FOLLOW_LIST](state, user){
        const index = state.myProfile.followingId.findIndex(f=>f._id == user._id); //myProfile의 followingId는 유저객체이다.
        state.myProfile.followingId.splice(index, 1);
    },
    startLoading(state){
        state.loading = true;
    },
    endLoading(state){
        state.loading = false;
    },
    removeItem(state, item){
        const index = state.myAllItemList.findIndex(el => el._id == item._id);
        if(index){
            state.myAllItemList.splice(index, 1);
        }
    }
}