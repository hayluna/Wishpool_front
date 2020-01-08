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
                <div>
                    <a @click="logout" class="btn">로그아웃</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import store from '../../store';
const { state, getters, dispatch } = store;
export default {
    name: 'More',
    beforeRouteEnter(to, from, next){
        dispatch('pending');
        dispatch('fetchMyProfile'); //내 프로필 정보를 가져온다.
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
    created(){
    },
    computed:{
        myProfile(){
            return getters.myProfile;
        },
    },
    methods:{
        logout(){
            (async()=>{
                await dispatch('logout');
                this.$router.push('/');
            })();
           
        }
    }
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
</style>