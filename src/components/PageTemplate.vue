<template>
    <div class="page-template">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="footer-nav">
            <Footer v-if="isLogged&&showFooter" />
        </div>
    </div>
</template>
<script>
import Footer from './Footer.vue';
import store from '../store';
const { getters, state } = store;
export default {
    name: 'PageTemplate',
    components:{
        'Footer': Footer,
    },
    computed:{
        isLogged(){
            return getters.isLoggedIn;
        },
        showFooter(){
            return state.footerShow;
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    //공통
    .page-template{
        display: flex;
        flex-direction: column;
        background: $primary-color;
        position: sticky;
        font-family: $font-stack;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        background: white;
    }
    .content{
        flex:1;
    }
    .footer-nav{
        position: absolute; 
        bottom:0; 
        left:0; 
        width:100%; 
        z-index:5;
        height: 6rem;
    }
   

</style>