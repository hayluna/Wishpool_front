<template>
    <div class="view">
        <div class="header">
            <div class="nav">
                <div class="back">
                    <svg @click="onBack" style="z-index:5;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
        </div>
        <div class="contents" ref="contents">
            <div class="text" ref="text">
                <p>친구를 찾아보세요,</p>
                <h4>{{user.nickname}}<span style="font-weight:normal;">님!</span></h4>
                <p style="font-size:1.5rem; margin-top:1rem;">전화번호를 통해</p>
                <p style="font-size:1.5rem; margin-bottom:1rem;">친구의 위시리스트를 찾아보세요!</p>
            </div>
            <div class="search-box" ref="searchBox">
                <div class="input-box">
                    <input type="text" ref="inputBox" v-model="query" placeholder="전화번호 검색" />
                    <svg style="width:2rem; fill:gray;" @click="clear" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                </div>
                <div class="search-btn" @click="onSearch"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
            </div>
            
        </div>
    </div>
</template>
<script>
import FollowSearchUser from './FollowSearchUser';
import store from '../../store';
const { getters, dispatch } = store;
export default {
    name: 'FollowSearch',
    beforeRouteEnter(to, from, next){
        next( vm =>{
            dispatch('toggleFooterShow', false);
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
    components:{
        'follow-user' : FollowSearchUser,
    },
    methods:{
        onBack(){
            this.$router.go(-1);
            dispatch('toggleFooterShow', true);
        },
        clear(){
            this.query = '';
            this.$refs.inputBox.focus();
        },
        onSearch(){
            if(this.query.length<3){
                alert('전화번호는 3자이상 입력해주세요');
                this.$refs.inputBox.focus();
                return false;
            }
            (async()=>{
                 try {
                    await dispatch('fetchQuery', {query : this.query, _id : this.user._id });
                    this.$router.push({name:'followSearchList'})
                } catch (e) {
                    console.error(e);
                }
            })();
           
        },
        
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-self: flex-start;
        font-family: $font-stack;
        background: $primary-color;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem 0 1rem;
        height: 5rem;
        margin-top: 2rem;
        margin-left: 0.5rem;
    }
    .nav{
        justify-self: flex-start;
        flex:1;
        fill: white;
    }
    .back{
        border: 1px solid white;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        @include flex-center();
         &:hover{
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .contents{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 3rem;
        margin-right: 3rem;
        margin-top: -12rem;
        height: 100%;
        color: white;
    }
    .text{
        p{
            font-size: 2.7rem;
            padding: 0;
            margin: 0;
            font-weight: normal;
        }
        h4{
            font-size: 2.2rem;
            font-weight: bold;
            padding:0;
            margin:0;
        }
    }
    .search-box{
        width: 100%;
        display: flex;
        background: white;
        border-radius: 10px;
        height: 4.5rem;
    }
    .input-box{
        display: flex;
        flex: 0.92;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 1rem;
        &:focus-within, &:active{
            svg{
                visibility: visible;
            }
        }
        input{
            outline: none;
            border: none;
            background: transparent;
            padding-left: 1.7rem;
            color: black;
            fill: lightgray;
        }
        svg{
            visibility:hidden;
        }
    }
    .search-btn{
        flex: 0.17;
        border-left: 1px solid lightgray;
        @include flex-center();
        background: transparent;
        cursor: pointer;
        &:hover{
            background: rgba(0, 0, 0, 0.3);
            border-radius: 0 10px 10px 0;
            svg{
                fill: white;
            }
        }
    }
    .result-box{
        margin-bottom: 10rem;
    }
    ul{
        margin: auto 1.5rem;
        padding: 0.5rem 1rem;;
        background: white;
        border-radius: 10px;
    }
    li{
        list-style:none;
    }
    .user-icon{
        color: #999ca3;
        width: 3rem;
    }
    @media (min-width:450px) {
        .search-box{
            height: 5.5rem;
            .input-box{
               height: 100%; 
            }
            input{
               height: 100%; 
               font-size: 1.7rem;
            }
        }
    }
</style>