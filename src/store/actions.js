import { FETCH_MY_ALL_ITEM_LIST, PENDING } from './mutations-types';
import axios from 'axios';
import state from './states';
export default{
    fetchMyAllItemList({ commit }){
        return (async ()=>{
            try {
                const res = await axios.get(this._vm.$api+'/item/list/'+ state.userId);
                const { code, msg, items } = res.data;
                if(code == "200"){
                    commit(FETCH_MY_ALL_ITEM_LIST, items);
                    // console.log(items);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    pending({ commit }){
        commit('startLoading');
    },
    handleToggle({ commit }, newItem){
        return (async()=>{
            try{
                const res = await axios.patch(this._vm.$api+'/item/toggle/'+newItem._id, newItem)
                const { code, msg, items } = res.data;
                if(code == "200"){
                    commit(FETCH_MY_ALL_ITEM_LIST, items);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    removeItem({ commit }, item){
        return (async()=>{
            try{
                commit('removeItem', item); //안해줘도 되지만, 이걸하면 깜박임이 사라져 UX가 좋아진다.
                console.log(item);
                const res = await axios.patch(this._vm.$api+'/item/delete/'+item._id, item)
                const { code, msg, items } = res.data;
                console.log(items);
                if(code == "200"){
                    commit(FETCH_MY_ALL_ITEM_LIST, items);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }
}