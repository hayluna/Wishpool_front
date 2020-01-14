<template>
<div class="view-box">
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="empty"></div>
                <div class="title">
                    내 친구목록
                </div>
                <span @click="findFollow" class="search-icon">
                    <div class="plus-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                    </div>
                </span>
            </div>
            <div class="user-me" @click="getMyProfile" data-toggle="modal" data-target="#profile">
                <div class="thumb">
                    <img :src="myProfile.profileImgPath" v-if="!isError" @error="imgLoadError">
                    <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
                </div>
                <div class="desc">
                    <div class="text">
                        <span class="name">{{ myProfile.nickname }}</span>
                    </div>
                    <span class="msg">{{ myProfile.profileMsg }}</span>
                </div>
            </div>
            <ul class="nav nav-tabs nav-tabs-wide">
                <li class="active"><a href="#wish" data-toggle="tab">팔로잉</a></li>
                <li><a href="#done" data-toggle="tab">팔로워</a></li>
            </ul>
        </div>
        <div class="tab-content" style="padding-top:20rem;">
            <!-- follow 목록 -->
            <div class="tab-pane active" id="wish">
                <ul class="ul-item" v-if="!isFollowEmpty">
                    <li v-for="user in followings" :key="user._id">
                        <follow-user
                        :user="user"
                        @click.native="getClickedUser(user)"
                         />
                    </li>
                </ul>
                <div v-if="isFollowEmpty" class="empty-list">
                    <div class="person" @click="findFollow"><v-icon name="user-plus"></v-icon></div>
                    <br>팔로우 할 친구를 찾아보세요!
                </div>
            </div>
            <!-- follower 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item" v-if="!isFollowerEmpty">
                    <li v-for="user in followers" :key="user._id">
                        <follow-user
                        :user="user"
                        @click.native="getClickedUser(user)"
                         />
                    </li>
                </ul>
                <div v-if="isFollowerEmpty" class="empty-list">
                    <div class="person"><v-icon name="user"></v-icon></div>
                    <br>아직 팔로워가 없네요!
                </div>
            </div>
        </div>
        <profile-detail
            :user="clickedUser"
         />
    </div>
    
</div>
</template>
<script>
import FollowUser from './FollowUser.vue'
import store from '../../store';
import ProfileDetail from '../profile/ProfileDetail'
const { state, getters, dispatch } = store;
export default {
    name: 'FollowList',
    components: {
        'follow-user': FollowUser,
        'profile-detail' : ProfileDetail,
    },
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
    data(){
        return{
            clickedUser: {},
            isError: false,
        }
    },
    computed:{
        myProfile(){
            return getters.myProfile;
        },
        followers(){
            return getters.myFollowers;
        },
        followings(){
            return getters.myFollowings;
        },
        isFollowEmpty(){
            if(this.followings.length==0){
                return true;
            }
            return false;
        },
        isFollowerEmpty(){
            if(this.followers.length==0){
                return true;
            }
            return false;
        },
    },
    methods: {
        findFollow(){
            this.$router.push({name:'followSearch', params:{userId:state.userId}});
        },
        getClickedUser(user){
            this.clickedUser = user;
            dispatch('setCurrentUser', user);
        },
        getMyProfile(){
            this.clickedUser = this.myProfile;
        },
        imgLoadError(){
            this.isError = true;
        },
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
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .title{
        flex:1;
        align-items: center;
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
    }
    .search-icon{
        cursor: pointer; 
        display: flex;
        justify-content: flex-end;
    }
    .user-icon{
        color: #999ca3;
        width: 3rem;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        color: #555;
        cursor: default;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #555;
    }
    .nav-tabs-wide{
        width: 100%;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 6rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            border: none;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #E7E7EB;
        }
        a{
            color: black;
            padding: 1rem 1rem 1.5rem 1rem;
        }
    }
    .tab-content, .tab-pane{
        height:100%;
    }
    .ul-item{
        padding: 0 1rem;
        li{
            list-style: none;
            cursor: pointer;
            &:hover{
                background: rgba(0,0,0, 0.1);
            }
        }
        
    }
    .user-me{
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid lightgray;
        padding: 2.3rem 1.7rem;
        margin: 0 1.5rem;
        cursor: pointer;
    }
    .thumb{
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 15px;
        border: transparent;
        box-shadow: 0 3px 6px lightgray;
        margin-right: 1.5rem;
        background: white;
        @include flex-center();
        img{
            background: white;
            width: 100%;            
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
        svg{
            color: gray;
            width: 2.4rem;
        }
    }
    .name{
        font-size: 1.5rem;
    }
    .msg{
        color: #bebebe;
    }
    .empty-list{
        width: 100%;
        height: 100%;
        @include flex-center();
        font-size: 1.5rem;
        text-align: center;
        margin-top: -3rem;
    }
    .person{
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 100%;
        background: $green;
        @include flex-center();
        cursor: pointer;
        &:active{
            background: gray;
        }
        svg{
            color:white;
            width: 2.2rem;
            height: 2.2rem;
            @include flex-center();
        }
    }
    .plus-button{
        border-radius: 100%;
        width:2rem;
        height:2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        margin-left: 0.2rem;
        fill: black;
        &:hover{
            fill: $primary-color;
            border-color: $primary-color;
            opacity: 0.8;
        }
        &:active{
            opacity: 1;
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