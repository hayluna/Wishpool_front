<template>
    <div class="user">
        <div class="thumb"></div>
        <div class="desc">
            <div class="text">
                <span class="name">{{user.userName}}</span>
            </div>
            <!-- <span class="msg">{{user.profileMsg | filterMsg}}</span> -->
        </div>
        <div class="person" style="background: #9291A4" v-if="doIFollow" @click="removeFollow">
            <v-icon name="user-check" class="user-check"></v-icon>
        </div>
        <div class="person" style="background: #0EC99C" v-if="!doIFollow" @click="addFollow">
            <v-icon name="user-plus" class="user-plus"></v-icon>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
export default {
    name: 'FollowSearchUser',
    props: ['user'],
    data(){
        return{
        }
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
    filters:{
        filterMsg(val){
            if(val.length>13){
                return val.substr(0, 13)+'...'
            }
            return val;
        }
    },
    methods:{
        addFollow(){
            dispatch('addFollow', this.user);
        },
        removeFollow(){
            dispatch('removeFollow', this.user);
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 1.5rem 1rem;
    font-size: 1.2rem;
    justify-content: space-between;
}
.thumb{
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
    border: 0.5px solid #3e414b;
    margin-right: 1.5rem;
}
.msg{
        color: #bebebe;
    }
.name{
    color: black;
    font-weight: bold;
}
.desc{
    flex:1;
}
.person{
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    padding-left: 0.3rem;
    
    @include flex-center();
    .user-plus, .user-check{
        color:white;
        width: 1.3rem;
        height: 1.3rem;
        @include flex-center();
    }
}

</style>