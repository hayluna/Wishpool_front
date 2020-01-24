<template>
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="empty"></div>
                <div class="title">
                    알림목록
                </div>
                <div class="empty"></div>
            </div>
        </div>
        <div class="area">
            <div class="noti-header">
                <div class="text">
                    <div class="name">안녕하세요 {{ myProfile.nickname }}님,</div>
                </div>
                <div style="font-weight:200; color:black;"> 안 읽은 메세지가 <span class="num">{{notiNum}}</span>개 있어요</div>
            </div>
            <div class="noti-contents">
                <ul v-if="!isListEmpty">
                    <li v-for="noti in notiList" :key="noti._id" :class="{unread : !noti.haveRead}">
                        <noti
                        :noti="noti" />
                    </li>
                </ul>
                <div v-if="isListEmpty" class="empty-list">
                    <div class="person"><v-icon name="check"></v-icon></div>
                    <br>모든 알림을 확인하셨네요!
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
        (async()=>{
            try {
                await dispatch('notiAllRead');
                next();
            } catch (e) {
                console.error(e);
            }
        })();
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
        },
        isListEmpty(){
            if(this.notiList.length == 0){
                return true;
            }
            return false;
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
        color: black;
        position: fixed; 
        width:100%; 
        top:0; 
        left:0;
    }
    .fix-top{
        -webkit-backface-visibility: hidden;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        z-index:10;
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
    .name{
        color: black;
        font-weight: 800;
    }
    .area{
        padding-top: 5rem;
        width: 100%;
        height: 95%;
        z-index: 1; 
        overflow-y: scroll; 
        -webkit-overflow-scrolling: touch;
    }
    .noti-header{
        color: #A9AAB9;
        font-weight: bold;
        font-size: 1.6rem;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        border-bottom: 1px solid lightgray;
        padding: 2rem 4rem;
    }
    .noti-contents{
        z-index: 0;
        // overflow: scroll;
        height: 80%;
    }
    .text{
        color: black;
        font-weight: bold;
    }
    .num{
        color: $green;
        font-weight: bold;
    }
    ul{
        padding: 1rem;
        z-index: 0;
        height: 100%;
        // overflow: scroll;
    }
    li{
        list-style: none;
        padding: 0.3rem;
        margin-top: 0.5rem;
        &:hover, &:active{
            background-color: rgba(100, 100, 100, 0.05);
        }
    
        &:last-child{
            margin-bottom: 8rem;
        }
    }
    .empty-list{
        width: 100%;
        height: 100%;
        @include flex-center();
        font-size: 1.5rem;
        text-align: center;
        margin-top: -8rem;
    }
    .person{
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 100%;
        background: $green;
        @include flex-center();
        svg{
            color:white;
            width: 2.2rem;
            height: 2.2rem;
            @include flex-center();
        }
    }
    .unread{
        background: rgba(100, 100, 100, 0.05);
        border-radius: 10px;
    }
    @media (min-width:450px){
        .header{
            height: 5.5rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 1.7rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
        .area{
            padding-top: 5.5rem;
        }
    }
</style>