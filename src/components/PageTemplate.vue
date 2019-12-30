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
    }

    //desktop, tablet
    @media (min-width:420px) {
        .page-template{
            width: 50rem;
            height: 90rem;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .content{
            flex: 1;
        }
        .footer-nav{
            width: 50rem;;
            height: 5rem;
        }
    }

    //mobile
    @media (max-width: 420px){
        .page-template{
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }
        .content{
            flex:1;
        }
        .footer-nav{
            width: 100%;
            height: 5rem;
        }

    }
</style>