import { FETCH_MY_ALL_ITEM_LIST, FETCH_MY_PROFILE, FETCH_SEARCH_USER_LIST, ADD_FOLLOW_LIST } from './mutations-types';
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
    fetchMyProfile({ commit }){
        return (async()=>{
            try {
                const res = await axios.get(this._vm.$api+'/follow/list/'+state.userId);
                const { code, msg, profile } = res.data;
                if(code == "200"){
                    commit(FETCH_MY_PROFILE, profile);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    fetchQuery({ commit }, payload){
        return(async()=>{
            try {
                const res = await axios.get(this._vm.$api+'/follow/search/',
                {
                    params:{
                        query: payload.query,
                        id: payload._id
                    }
                });
                const { code, msg, matchUsers } = res.data;
                if(code=="200"){
                    commit(FETCH_SEARCH_USER_LIST, matchUsers);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    addFollow({ commit }, user){
        return(async()=>{
            try {
                await commit(ADD_FOLLOW_LIST, user); //내 프로필의 followingId '유저객체'에 해당 유저 추가
                user.followerId = state.userId; //상대의 follower목록에 내 아이디 추가
                const payload ={
                    me: state.myProfile,
                    other: user
                }
                const res = await axios.patch(this._vm.$api+'/follow/add/'+state.userId, payload);
            } catch (e) {
                console.error(e);
            }
        })();
    },
    removeFollow({ commit }, user){
        return(async()=>{
            try {
                const res = await axios.patch(this._vm.$api+'/follow/remove/'+state.userId, user);
                const { code, msg, matchUsers } = res.data;
                if(code=="200"){
                    commit(FETCH_SEARCH_USER_LIST, matchUsers);
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