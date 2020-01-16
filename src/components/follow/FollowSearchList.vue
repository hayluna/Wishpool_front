<template>
    <div class="view-box">
    <div class="view">
        <div class="header">
                <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
                <div class="title">
                    친구추가
                </div>
                <div class="empty"></div>
            </div>
        <div class="result-box">
            <div class="result-header"><v-icon name="search"></v-icon>검색결과 : '{{query}}'</div>
            <ul v-if="result">
                <li v-for="user in searchedUser" :key="user._id">
                    <follow-user
                    @click.native="getClickedUser(user)"
                    :user="user"
                    />
                </li>
            </ul>
            <div v-if="!result" class="empty-result">
                검색 결과가 없네요!<br />
                친구에게 문자를 보내 위시풀에 초대해보세요!<br /><br />
                <div class="person"><v-icon name="mail"></v-icon></div>
            </div>
        </div>
        <profile-detail
            :user="clickedUser"
         />
    </div>
    
</div>
</template>
<script>
import FollowSearchUser from './FollowSearchUser';
import ProfileDetail from '../profile/ProfileDetail'
import store from '../../store';
const { getters, dispatch, state } = store;
export default {
    name: 'FollowSearchList',
    components: {
        'follow-user' : FollowSearchUser,
        'profile-detail' : ProfileDetail,
    },
    methods:{
        onBack(){
            this.$router.go(-1);
        },
        getClickedUser(user){
            this.clickedUser = user;
            dispatch('setCurrentUser', user);
        },
    },
    beforeRouteEnter(to, from, next){
        next( vm =>{
            vm.user = getters.myProfile;
            vm.query = state.query;
        });
    },
    data(){
        return{
            user: {},
            query: '',
            clickedUser: {}
        }
    },
    computed: {
        searchedUser(){
            return getters.searchUserList;
        },
        result(){
            if(this.searchedUser.length==0){
                return false;
            }
            return true;
        } 
    },
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view, .view-box{
        background: white;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: $font-stack;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 0 1rem 0 1rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        position:fixed;
        width: 100%;
        z-index: 3;
    }
    .nav{
        justify-self: flex-start;
        flex:1;
    }
    .back{
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        &:hover{
            background:rgba(0, 0, 0, 0.1);
        }
    }
    .title{
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
        flex:1
    }
    .empty{
        flex:1;
    }
    .result-box{
        margin-top: 5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .result-header{
        font-size: 2rem;
        padding: 2.5rem 2rem;
        border-bottom : 1px solid #E7E7EB;
        display:flex;
        align-items: center;
        svg{
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
    }
    .user-icon{
        color: #999ca3;
        width: 3rem;
    }
    ul{
        width: 100%;
        padding: 0;
    }
    li{
        list-style: none;
        width: 100%;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #E7E7EB;
        &:hover{
            background: rgba(100, 100, 100, 0.05);
        }
    }
    .empty-result{
        width: 100%;
        height: 100%;
        @include flex-center();
        font-size: 1.5rem;
        text-align: center;
    }
    .person{
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        background: $green;
        @include flex-center();
        svg{
            color:white;
            width: 2.5rem;
            height: 2.5rem;
            @include flex-center();
        }
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
    }
</style>