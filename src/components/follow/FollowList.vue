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
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg> -->
                        <!-- <v-icon name="search"></v-icon> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        <span>+</span>
                    </div>
                </span>
            </div>
            <div class="user-me" @click="getMyProfile" data-toggle="modal" data-target="#profile">
                <div class="user-con">
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
        dispatch('toggleFooterShow', true);
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
            dispatch('fetchOthersItemList', user._id);
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
        position: absolute; 
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
        background: white;
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
            margin-right: 0.5rem;
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
        background: white;
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
    .tab-content{
        width: 100%;
        height: 90%;
        overflow-y: scroll; 
    }
    .tab-pane{
        height: 100%;
    }
    .ul-item{
        padding-right: 1rem;
        padding-left: 1rem;
        height: 100%;
        li{
            // display: flex;
            list-style: none;
            cursor: pointer;
            border-bottom: 1px solid lightgray;
            &:last-child{
                margin-bottom: 5rem;
            }
        }
        
    }
    .user-me{
        margin: 0 1.3rem;
        height: 8rem;
        border-bottom: 1px solid lightgray;
        background: white;
    }
    .user-con{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1.5rem 1.5rem;
        margin: 1rem 0rem;
        cursor: pointer;
         &:hover{
            background-color: rgba(100, 100, 100, 0.05);
            border-radius: 10px;
        }
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
            border-radius: 15px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.2rem;
            &:hover{
                svg{
                    fill: $green;
                }
                span{
                    color: $green;
                }
                opacity: 0.8;
            }
            &:active{
                opacity: 1;
            }
        
        svg{
            width:2.5rem;
            height:2.5rem;
            fill: black;
            color: black;
            border-color: black;
        }
        
        span{
            align-self: flex-start;
            margin:0;
            position: absolute;
            top: 10px;
            right: 20px;
            font-weight: bold;
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