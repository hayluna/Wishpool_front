import { FETCH_MY_ALL_ITEM_LIST } from './mutations-types';
import axios from 'axios';
import state from './states';
export default{
    fetchMyAllItemList({ commit }){
        return (async ()=>{
            try {
                const res = await axios.get(this._vm.$api+'/item/list/'+ state.userId);
                const { code, msg, items } = res.data;
                
                console.log(items)
                if(code == "200"){
                    commit(FETCH_MY_ALL_ITEM_LIST, items);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
}