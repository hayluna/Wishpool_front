import { FETCH_MY_ALL_ITEM_LIST } from './mutations-types'

export default {
    [FETCH_MY_ALL_ITEM_LIST] (state, items){
        state.myAllItemList = items;
    },
}