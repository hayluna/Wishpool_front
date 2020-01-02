<template>
    <div class="page-template">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="footer-nav">
            <Footer v-if="isLogged" />
        </div>
    </div>
</template>
<script>
import Footer from './Footer.vue';
export default {
    name: 'PageTemplate',
    components:{
        'Footer': Footer,
    },
    data(){
        return{
            isLogged: true
        }
    },
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
    }

    //desktop, tablet
    @media (min-width:420px) {
        .page-template{
            width: 50rem;
            height: 90rem;
            margin: 0;
            padding: 0;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .content{
            flex: 1;
        }
        .footer-nav{
            width: 50rem;;
            height: 5rem;
            position: fixed;
            z-index: 3;
            margin-top: 85rem;
            overflow: hidden;
        }
    }

    //mobile
    @media (max-width: 420px){
        .page-template{
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
        }
        .content{
            flex:1;
        }
        .footer-nav{
            width: 100%;
            height: 5rem;
            position: fixed;
            left:0;
            bottom:0;
        }

    }
</style>