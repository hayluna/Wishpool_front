<template>
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="empty"></div>
                <div class="title">
                    설정
                </div>
                <div class="empty"></div>
            </div>
        </div>
        <div class="setting">
            <div class="setting-list">
                <a class="setting-item" @click="profileModify">프로필 수정</a>
                <v-icon name="chevron-right"></v-icon>
            </div>
            <div class="btn-area" style="margin-top:13rem;">
                <a @click="logout">로그아웃 하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
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
        },
        profileModify(){
            this.$router.push({name:'profileModify', params:{userId:state.userId}});
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
     .view{
        background: white;
        height: 100%;
        font-family: $font-stack;
        overflow: hidden;
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
    .setting{
        margin-top: 5rem;
    }
    .setting-list{
        display: flex;
        align-items: center;
        width: 100%;
        height: 7rem;
        padding: 0 2.5rem;
        border-bottom: 1px solid lightgray;
        &:hover, &:active{
            background-color: rgba(100, 100, 100, 0.05);
        }
         svg{
            justify-self: flex-end;
            width: 2.5rem;
            height: 2.5rem;
        }
         
    }
    .setting-item{
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        cursor: pointer;
        color: black;
    }
    .btn-area{
        width: 100%;
        @include flex-center();
        margin-top: 2rem;
         a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18rem;
            height: 5rem;
            border-radius: 4px;
            padding: 0.75rem 1rem;
            color: $dark-gray;
            background: transparent;
            margin-top: 1.5rem;
            border: 1px solid gray;
            fill: $dark-gray;
            cursor: pointer;
            &:hover{
                background: gray;
                text-decoration: none;
                color: white;
                fill: white;
            }
            svg{
                display:inline;
                width: 1.6rem;
                margin-left: 2rem;
            }
        }
        // a{
        //     height: 6rem;
        //     border-radius: 10px;
        //     width: 20rem;
        //     background: #F6F6FE;
        //     color: black;
        //     font-size: 1.6rem;
        //     font-weight: bold;
        //     text-decoration:none;
        //     cursor: pointer;
        //     &:hover{
        //        background:$primary-color;
        //        color: white;
        //        fill: white;
        //     }
            
        // }
    }
    a:hover, a:focus{
        text-decoration: none;
        cursor: pointer;
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
        .setting{
            margin-top: 6rem;
        }
    }
</style>