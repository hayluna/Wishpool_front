<template>
    <div class="footer">
        <!-- <div class="footer-item" @click="follow"><div :class={selected:tab1}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"/></svg></div></div> -->
        <div class="footer-item" @click="follow"><div :class={selected1:tab1}><v-icon name="user"></v-icon></div></div>
        <div class="footer-item" @click="list"><div :class={selected1:tab2}><v-icon name="file-text"></v-icon></div></div>
        <div class="footer-item" @click="noti"><div :class={selected2:tab3}><span v-if="!notiZero" class="badge">{{notiNum}}</span><svg class="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg></div></div>
        <div class="footer-item" @click="more"><div :class={selected3:tab4}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></div></div>
    </div>
</template>
<script>
import store from '../store';
const { state, getters, dispatch } = store;
export default {
    name: 'Footer',
    computed:{
        tab1(){
            return getters.tab1;
        },
        tab2(){
            return getters.tab2;
        },
        tab3(){
            return getters.tab3;
        },
        tab4(){
            return getters.tab4;
        },
        notiNum(){
            return getters.notiNum;
        },
        notiZero(){
            if(this.notiNum == 0){
                return true;
            }
            return false;
        }
    },
    methods:{
        follow(){
            dispatch('tab1');
            this.$router.push({name:'followList', params: {userId: state.userId}}, ()=>{});
        },
        list(){
            dispatch('tab2');
            this.$router.push({name: 'itemList', params: {userId: state.userId}}, ()=>{});
        },
        noti(){
            dispatch('tab3');
            this.$router.push({name:'notiList', params: {userId:state.userId}}, ()=>{});
        },
        more(){
            dispatch('tab4');
            this.$router.push({name:'more'}, ()=>{})
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        background: $light-white;
        padding: 0 0.2rem 0 0.2rem;
    }
    .footer-item{
        flex:1;
        @include flex-center();
        color: $sky-gray;
        fill: $sky-gray;
        height: 100%;
        cursor: pointer;
        svg{
            width: 2.3rem;
            height: 2.3rem;
        }
    }
    .selected1{
        background: $primary-color;
        border-radius: 100%;
        border: none;
        width: 3.5rem;
        height: 3.5rem;
        box-shadow: 0px 3px 6px lightgray;
        @include flex-center();
        svg{
            // fill:white;
            color: white;
            width: 2.1rem;
            height: 2.1rem;
        }
    }
    .selected2{
        background: $primary-color;
        border-radius: 100%;
        border: none;
        width: 3.5rem;
        height: 3.5rem;
        box-shadow: 0px 3px 6px lightgray;
        @include flex-center();
        svg{
            fill:white;
            width: 2.1rem;
            height: 2.1rem;
        }
        .badge{
            width: 1.7rem;
            height: 1.7rem;
            margin-left: 1.4rem;
            margin-top: -1.1rem;
        }
    }
    .selected3{
        background: $primary-color;
        border-radius: 100%;
        border: none;
        width: 3.5rem;
        height: 3.5rem;
        box-shadow: 0px 3px 6px lightgray;
        @include flex-center();
        svg{
            fill:white;
            color:white;
            width: 2.1rem;
            height: 2.1rem;
        }
    }
    .heart{
        fill: $sky-gray;
    }
    .badge{
        @include flex-center();
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: #FE705A;
        border-radius: 100%;
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        margin-left: 1.35rem;
        margin-top: -0.6rem;
    }
    //desktop, tablet
    @media (min-width:450px) {
        .selected1, .selected2, .selected3{
            width: 4rem;
            height: 4rem;
        }
    }
</style>