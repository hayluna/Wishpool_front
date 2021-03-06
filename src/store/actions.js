import { 
    FETCH_MY_ALL_ITEM_LIST, 
    FETCH_AN_ITEM_AND_USER,
    FETCH_MY_PROFILE, 
    FETCH_SEARCH_USER_LIST, 
    FETCH_NOTI_LIST,
    ADD_FOLLOW_LIST,
    REMOVE_FOLLOW_LIST,
    FETCH_OTHERS_ITEM_LIST,
    ADD_FOLLOW_NOTI,
 } from './mutations-types';
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
                    commit('saveQuery', payload.query);
                    commit(FETCH_SEARCH_USER_LIST, matchUsers);
                }else if(code=="503"){
                    commit('saveQuery', payload.query);
                    commit(FETCH_SEARCH_USER_LIST, []);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    fetchOthersItemList({ commit }, id){
        return (async ()=>{
            try {
                const res = await axios.get(this._vm.$api+'/item/othersList/'+ id);
                const { code, msg, items } = res.data;
                if(code == "200"){
                    commit(FETCH_OTHERS_ITEM_LIST, items);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    fetchItemAndUser({ commit }, id){
        return (async()=>{
            try {
                const res = await axios.get(this._vm.$api+'/item/itemOne/'+id);
                const { code, msg, item } = res.data;
                if(code=="200"){
                    commit(FETCH_AN_ITEM_AND_USER, item);
                    commit('setCurrentUser', item.userId);
                }
            } catch (e) {
                console.error(e);
            }                
        })();
    },
    setCurrentUser({ commit }, user){
        return commit('setCurrentUser', user);
    },
    addFollow({ commit }, user){
        return(async()=>{
            try {
                await commit(ADD_FOLLOW_LIST, user); //내 프로필의 followingId '유저객체'에 해당 유저 추가
                user.followerId.push(state.userId); //상대의 follower목록에 내 아이디 추가
                const payload ={
                    me: state.myProfile,
                    other: user
                }
                await axios.patch(this._vm.$api+'/follow/add/'+state.userId, payload);
                const res = await axios.post(this._vm.$api+'/noti/follow/'+payload.other._id, payload);//상대방의 notiList에 저장
                if(res.data.code==200){
                    this._vm.$socket.emit('follow-add', payload);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    notiAllRead({commit}){
        state.notiList.forEach(noti=>{noti.haveRead = true;});
        commit('notiAllRead');
        return (async()=>{
            try {
                const res = await axios.patch(this._vm.$api+'/noti/toggle', state.notiList);
                const { code, msg } = res.data;
                if(code=="200"){
                    this.dispatch('fetchNotiList');
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    removeNotiItem({commit}, nid){
        return (async()=>{
            try {
                const res = await axios.delete(this._vm.$api+'/noti/remove/'+nid);
                const { code, msg } = res.data;
                if(code=="200"){
                    this.dispatch('fetchNotiList');
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    removeFollow({ commit }, user){
        return(async()=>{
            try {
                //내 프로필의 followingId '유저객체'에 해당 유저 삭제
                await commit(REMOVE_FOLLOW_LIST, user); 
                //상대의 follower목록에 내 아이디 삭제
                const index = user.followerId.findIndex(f=>f._id == state.userId); 
                user.followerId.splice(index, 1); 
                const payload ={
                    me: state.myProfile,
                    other: user
                }
                await axios.patch(this._vm.$api+'/follow/remove/'+state.userId, payload);
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
                const { code, msg } = res.data;
                if(code == "200"){
                    this.dispatch('fetchMyAllItemList');
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    removeItem({ commit }, item){
        return (async()=>{
            try{
                // commit('removeItem', item); //안해줘도 되지만, 이걸하면 깜박임이 사라져 UX가 좋아진다.
                const res = await axios.patch(this._vm.$api+'/item/delete/'+item._id, item)
                const { code, msg } = res.data;
                if(code == "200"){
                    this.dispatch('fetchMyAllItemList');
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },
    fetchNotiList({ commit }){
        return (async()=>{
            try {
                const res = await axios.get(this._vm.$api+'/noti/list/'+state.userId);
                const { code, msg, notis } = res.data;
                if(code=="200"){
                    commit(FETCH_NOTI_LIST, notis);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    } ,   
    register({ commit }, user){
        return (async()=>{
            try{
                const response = await axios.post(this._vm.$api +'/users/register', user);
                const { code, msg, payload } = response.data;
                if(code == 200){
                    const { token, newUser } = payload;
                    localStorage.setItem('wishToken', token);
                    await commit('auth_success', {token, userId:newUser._id}); // state.userId = _id; (ObjectId)
                    this.dispatch('fetchNotiList');
                    this.dispatch('toggleFooterShow', true);
                    this.dispatch('tab1');
                }else{
                    commit('register_error', msg);
                }
			} catch(err){
                console.error(err);
            }
        })();
    },
    login({ commit }, user){
        return (async()=>{
            const res = await axios.post(this._vm.$api+'/users/login', user);
            const { code, msg, payload } = res.data;
            if( code == "200"){
                const { token, user } = payload;
                localStorage.setItem('wishToken', token);
                await commit('auth_success', {token, userId:user._id});
                this.dispatch('fetchNotiList');
                this.dispatch('toggleFooterShow', true);
                this.dispatch('tab1');
            }else{
                commit('login_error', msg);
            }

        })();
    },
    checkLogin({commit}){
        return (async ()=>{
            const token = localStorage.getItem('wishToken');
            commit('auth_request');
            try {
                const res = await axios.get(this._vm.$api+'/users/check', {
                    headers: {authorization: token}
                });
                const { code, msg, user } = res.data;
                if(code=="200"){ //서버에서 유효한 사용자라고 판단이 났다면,
                    await commit('auth_success', {token, userId:user._id});
                    await this.dispatch('fetchNotiList');
                    this.dispatch('toggleFooterShow', true);
                }else{
                    await commit('auth_error');
                }
            } catch (e) {
                await commit('auth_error');
                console.error(e);
            }
        })();
    },
    authSuccess({commit}, payload){
        return (async()=>{
            try {
                await commit('auth_success', payload);
                this._vm.$socket.emit('uid', payload._id);         
            } catch (e) {
                console.error(e);
            }
        })();
        
    },
    logout({commit}){
        localStorage.removeItem('wishToken');
        commit('logout');
        this.dispatch('toggleFooterShow', false);
    },
    updateSid({ commit }, sid){
        commit('update_sid', sid);
    },
    tab1({ commit }){
        commit('tab1');
    },
    tab2({ commit }){
        commit('tab2');
    },
    tab3({ commit }){
        commit('tab3');
    },
    tab4({ commit }){
        commit('tab4');
    },
    toggleFooterShow({ commit }, value){
        commit('toggleFooterShow', value);
    },
}