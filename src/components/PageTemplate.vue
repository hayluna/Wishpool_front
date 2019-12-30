<template>
    <div class="template">
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="nav">
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
    .template{
        display: flex;
        flex-direction: column;
    }
    .content{
        flex:1;
        width: 100%;
    }
    .nav{
        width: 100%;
        flex-basis: 58px;
    }

    //desktop, tablet
    @media (min-width:420px) {
        .template{
            width: 500px;
            height: 900px;
            margin: 0;
            padding: 0;
            border-radius: 4px;
            overflow: hidden;
        }
    }

    //mobile
    @media (max-width: 420px){
        .template{
            width: 100%;
            height: 100%;
        }

    }
</style>