<template>
    <div class="view-box">
        <div class="view">
            <div class="fix-top">
                <div class="header">
                    <div class="empty"></div>
                    <div class="title">
                        알림목록
                    </div>
                    <div class="empty"></div>
                </div>
                <div class="area">
                    <div class="noti-header">
                        <div class="text">
                            <div class="name">안녕하세요 {{ myProfile.nickName }}님,</div>
                        </div>
                        <div> 안 읽은 메세지가 <span class="num">{{notiNum}}</span>개 있어요</div>
                    </div>
                    <div class="noti-contents">
                        <ul>
                            <li v-for="noti in notiList" :key="noti._id">
                                <noti
                                :noti="noti" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import store from '../../store';
import Noti from './Noti.vue';
const { state, getters, dispatch } = store;
export default {
    name: 'NotiList',
    components:{
        'noti': Noti,
    },
    beforeRouteEnter(to, from, next){
        dispatch('pending');
        dispatch('fetchMyProfile'); //내 프로필 정보를 가져온다.
        dispatch('fetchNotiList');
        //loading==false가 될 때 라우터 이동을 허용한다.
        store.watch(
            (state, getters) => state.loading,
            (newValue, oldValue) =>{
                if(newValue == false){
                    next();
                }
            }
        )
    },
    beforeRouteLeave (to, from, next) {
        dispatch('removeNoti');
    },
    created(){
        this.$bus.$on('onClose', ()=>{
            dispatch('fetchNotiList');
        })
    },
    computed:{
        myProfile(){
            return getters.myProfile;
        },
        notiList(){
            return getters.notiList;
        },
        notiNum(){
            return getters.notiNum;
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
     .view, .view-box{
        background: white;
        height: 100%;
        font-family: $font-stack;
    }
    .fix-top{
        position: fixed;
        width: 100%;
        background: white;
        z-index: 4;
    }
    .header{
        display: flex;
        align-items: center;
        background: white;
        padding: 0 1.5rem 0 1.5rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        span{
            flex:1;
            text-align: right;
        }
    }
    .empty{
        flex:1;
    }
    .title{
        flex:1;
        align-items: center;
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
    }
    .area{
        height: 100%;
        overflow: scroll;
    }
    .noti-header{
        color: #A9AAB9;
        font-weight: bold;
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        height: 10rem;
        flex-direction: column;
        border-bottom: 1px solid lightgray;
        padding: 4rem;
        margin-bottom: 1rem;
    }
    .noti-contents{
        z-index: 0;
        overflow: scroll;
        height: 100%;
    }
    .text{
        color: $dark-gray;
        font-weight: bold;
    }
    .num{
        color: $dark-gray;
        font-weight: bold;
    }
    ul{
        height: 100%;
        padding: 0.5rem;
        z-index: 0;
        overflow: scroll;
    }
    li{
        list-style: none;
    }
</style>