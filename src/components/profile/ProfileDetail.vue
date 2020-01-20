<template>
    <!-- Modal -->
    <div class="modal fade" id="profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:absolute; right: 1rem; top:1rem; z-index:10;">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="img-header">
                    <img :src="user.profileImgPath" v-if="!isProfileError" @error="profileImgLoadError">
                </div>
            </div>
            <div class="thumb">
                <img :src="user.profileImgPath" v-if="!isError" @error="imgLoadError">
                <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
            </div>
            <div class="modal-body">
                <div class="profile">
                    <div class="nickname">{{user.nickname}}</div>
                    <div class="msg" style="color:gray;">{{user.profileMsg}}</div>
                </div>
                <div class="info-box">
                    <div class="info-item">
                        <p>팔로잉</p>
                        <p style="font-weight: 800;">{{countFollows}}</p>
                    </div>
                    <div class="info-item">
                        <p>팔로워</p>
                        <p style="font-weight: 800;">{{countFollowers}}</p>
                    </div>
                    <div class="info-item">
                        <p>아이템</p>
                        <p style="font-weight: 800;">{{countItems}}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer" v-if="!isSelf">
                <div class="person" style="background: #9291A4; padding-left: 0.5rem;" v-if="doIFollow" @click="removeFollow">
                    <v-icon name="user-check" class="user-check"></v-icon>
                </div>
                <div class="person" style="background: #59D2F1; padding-left: 0.5rem;" v-if="!doIFollow" @click="addFollow">
                    <v-icon name="user-plus" class="user-plus"></v-icon>
                </div>
                <div class="person" style="background: #0EC99C" @click="openWish" data-dismiss="modal" aria-label="Close">
                    <v-icon name="package" class="user-plus" style="border: white;"></v-icon>
                </div>
            </div>
            </div>
        </div>
        <complete-snackbar/>
    </div>
</template>
<script>
import store from '../../store';
import CompleteSnackbar from '../CompleteSnackbar.vue';
const { getters, state, dispatch } = store;
export default {
    name: 'ProfileDetail',
    props: ['user'],
    components:{
        'complete-snackbar' : CompleteSnackbar
    },
    created(){
        dispatch('fetchMyAllItemList');
    },
    computed:{
        doIFollow(){
            //내 팔로잉유저객체의 아이디목록에 이 검색된 유저가 존재한다면, 내가 이미 팔로잉중인 사람
            if(getters.myFollowings.map(f=>f._id).includes(this.user._id)){
                return true;
            }               
            return false;                                                                                                      
        },
        countFollows(){
            if(this.user.followingId){
                return this.user.followingId.length;
            }
            return 0;
        },
        countFollowers(){
            if(this.user.followerId){
                return this.user.followerId.length;
            }
            return 0;
        },
        countItems(){
            if(this.isSelf){
                return getters.myItemList.length;
            }
            return getters.othersItemList.length;
        },
        isSelf(){
            if(this.user._id){
                if(this.user._id == state.userId){
                    return true;
                }
            }
            return false;
        }
    },
    data(){
        return{
            isError: false,
            isProfileError: false
        }
    },
    methods:{
        addFollow(){
            dispatch('addFollow', this.user);
            var x = document.getElementById("complete");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },
        removeFollow(){
            dispatch('removeFollow', this.user);
             var x = document.getElementById("complete");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },
        openWish(){
            this.$router.push({name:'othersItemList', params:{userId: this.user._id}});
        },
        imgLoadError(){
            this.isError = true;
        },
        profileImgLoadError(){
            this.isProfileError = true;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .modal-open .modal {
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: $font-stack;
        position: fixed; 
        width:100%; 
        top:0; 
        left:0;
    }
    .modal-header{
        width: 100%;
        align-self: flex-end;
        border-radius: 5px 5px 0 0;
        border: none;
        padding: 0;
        button{
            opacity: 1;
            color: $dark-gray;
            outline-color: transparent;
            &:hover{
                color: gray;
            }
        }
        img{
            background: white;
            border-radius: 5px 5px 0 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .close{
        text-shadow: unset;
    }
    .img-header{
        background: $sky-gray;
        opacity: 0.2;
        height: 15rem;
    }
    .modal-content{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .modal-dialog{
        width: 28.5rem;
        transform: translate(0,0);
        -webkit-transform: translate(0, 0);
    }
    .modal.fade .modal-dialog{
        transform: translate(0,0);
        -webkit-transform: translate(0, 0);
    }
    .thumb{
        border: 1px solid lightgray;
        border-radius: 100%;
        transform: translate(0%, -50%);
        width: 10rem;
        height: 10rem;
        z-index: 1;
        background: white;
        @include flex-center();
        img{
            background: white;
            width: 100%;            
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .modal-body{
        width: 100%;
        transform: translate(0%, -20%);
    }
    .profile{
        @include flex-center();
        margin-bottom: 2rem;
    }
    .nickname{
        font-weight: bold;
    }
    .info-box{
        display: flex;
        flex-direction: row;
        padding: 1rem 1.5rem;
        justify-content: space-around;
    }
    .info-item{
        @include flex-center();
    }
    .modal-footer{
        width: 100%;
        transform: translate(0%, -60%);
        border: none;
        padding: 0 0 0.5rem 0;
        display:flex;
        justify-content:space-evenly;
        flex-direction: row;
    }
    .user-icon{
        width: 7rem;
        height: 7rem;
        color: lightgray;
    }
    .person{
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        &:hover{
            opacity: 0.7;
        }
        &:active{
            opacity: 1;
        }
        @include flex-center();
        .user-plus, .user-check{
            color:white;
            width: 2.5rem;
            height: 2.5rem;
            @include flex-center();
        }
    }
       
</style>