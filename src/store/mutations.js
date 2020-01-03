import { FETCH_MY_ALL_ITEM_LIST, FETCH_MY_FOLLOW_LIST } from './mutations-types'

export default {
    [FETCH_MY_ALL_ITEM_LIST] (state, items){
        state.myAllItemList = items;
        state.loading = false;
    },
    [FETCH_MY_FOLLOW_LIST](state, all){
        state.myProfile = all.profile;
        state.myFollowers = all.followers;
        state.myFollowings = all.followings;
        state.loading = false;
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