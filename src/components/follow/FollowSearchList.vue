<template>
    <div class="view-box">
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
                <div class="title">
                    친구목록
                </div>
                <div class="empty"></div>
            </div>
        </div>
        <div class="result-box" v-if="hasSearched">
            <h3>검색결과 : '{{query}}'</h3>
            <ul>
                <li v-for="user in searchedUser" :key="user._id">
                    <follow-user
                    :user="user"
                    />
                </li>
            </ul>
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
const { getters, dispatch } = store;
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
    },
    beforeRouteEnter(to, from, next){
        next( vm =>{
            vm.user = getters.myProfile;
        });
    },
    data(){
        return{
            user: {},
            query: '',
            hasSearched: false,
        }
    },
    computed: {
        searchedUser(){
            return getters.searchUserList;
        } 
    },
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';

</style>