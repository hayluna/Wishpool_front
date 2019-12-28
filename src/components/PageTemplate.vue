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
        justify-content: center;
        flex-direction: column;
    }
    .content{
        width: 100%;
        margin-top: auto; //display:flex + margin:auto조합은 중앙고정이 되는데, 아래의 하단고정 margin과 겹쳐 위로 올라가게 됨. 따라서 margin-top.
    }
    .nav{
        width: 100%;
        flex-basis: 58px;
        margin-top: auto;  //display:flex + margin-top:auto조합은 하단고정이 된다.
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