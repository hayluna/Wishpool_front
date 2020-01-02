import { FETCH_MY_ALL_ITEM_LIST } from './mutations-types'

export default {
    [FETCH_MY_ALL_ITEM_LIST] (state, items){
        state.myAllItemList = items;
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