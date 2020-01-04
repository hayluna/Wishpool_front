<template>
    <!-- Modal -->
    <div class="modal fade" id="profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="thumb">
                <img src="" />
            </div>
            <div class="modal-body">
                <div class="profile">
                    <div class="nickname">{{user.nickName}}</div>
                    <div class="msg">{{user.profileMsg}}</div>
                </div>
                <div class="info-box">
                    <div class="info-item">
                        <p>팔로잉</p>
                        <p>0</p>
                    </div>
                    <div class="info-item">
                        <p>팔로워</p>
                        <p>0</p>
                    </div>
                    <div class="info-item">
                        <p>아이템</p>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="person" style="background: #9291A4; padding-left: 0.5rem;" v-if="doIFollow" @click="removeFollow">
                    <v-icon name="user-check" class="user-check"></v-icon>
                </div>
                <div class="person" style="background: #0EC99C; padding-left: 0.5rem;" v-if="!doIFollow" @click="addFollow">
                    <v-icon name="user-plus" class="user-plus"></v-icon>
                </div>
                <div class="person" style="background: #FE705A" @click="openWish" data-dismiss="modal" aria-label="Close">
                    <v-icon name="package" class="user-plus" style="border: white;"></v-icon>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, state, dispatch } = store;
export default {
    name: 'ProfileDetail',
    props: ['user'],
    created(){
    },
    computed:{
        doIFollow(){
            //내 팔로잉유저객체의 아이디목록에 이 검색된 유저가 존재한다면, 내가 이미 팔로잉중인 사람
            if(getters.myFollowings.map(f=>f._id).includes(this.user._id)){
                return true;
            }               
            return false;                                                                                                      
        },
    },
    methods:{
        addFollow(){
            dispatch('addFollow', this.user);
        },
        removeFollow(){
            dispatch('removeFollow', this.user);
        },
        openWish(){
            this.$router.push({name:'othersItemList', params:{userId: this.user._id}});
        }
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
    }
    .modal-header{
        width: 100%;
        height: 15rem;
        align-self: flex-end;
        background: lightgray;
        border-radius: 5px 5px 0 0;
        border: none;
    }
    .modal-content{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    .modal-dialog{
        width: 28.5rem;
    }
    .thumb{
        border: 1px solid lightgray;
        border-radius: 100%;
        transform: translate(0%, -50%);
        width: 10rem;
        height: 10rem;
        z-index: 1;
        background: white;
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
.person{
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    
    @include flex-center();
    .user-plus, .user-check{
        color:white;
        width: 2.5rem;
        height: 2.5rem;
        @include flex-center();
    }
}
</style>