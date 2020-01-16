<template>
    <div class="user" data-toggle="modal" data-target="#profile">
        <div class="thumb">
            <img :src="user.profileImgPath" v-if="!isError" @error="imgLoadError">
            <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
        </div>
        <div class="desc">
            <div class="text">
                <span class="name">{{user.nickname}}</span>
            </div>
            <!-- <span class="msg">{{user.profileMsg | filterMsg}}</span> -->
        </div>
        <div class="person" style="background: #9291A4" v-if="doIFollow" @click.stop="removeFollow">
            <v-icon name="user-check" class="user-check"></v-icon>
        </div>
        <div class="person" style="background: #0EC99C" v-if="!doIFollow" @click.stop="addFollow">
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
            isError:false
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
        },
        imgLoadError(){
            this.isError = true;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 2rem;
    font-size: 1.2rem;
    justify-content: space-between;
    width: 100%;
    font-family: $font-stack;
    cursor: pointer;
}
.thumb{
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;
    border: 0.5px solid lightgray;
    margin-right: 1.5rem;
    @include flex-center();
    svg{
        width: 3rem;
    }
}
.msg{
    color: #bebebe;
}
.name{
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
}
.desc{
    flex:1;
}
.person{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 100%;
    padding-left: 0.3rem;
    cursor: pointer;
    @include flex-center();
    .user-plus, .user-check{
        color:white;
        width: 1.5rem;
        height: 1.5rem;
        @include flex-center();
    }
}
.user-icon{
    color: #999ca3;
    width: 3rem;
}

@media (min-width: 450px) {
    .person{
        width: 4rem;
        height: 4rem;
        .user-plus, .user-check{
            width: 1.9rem;
            height: 1.9rem;
        }
    }
}
</style>