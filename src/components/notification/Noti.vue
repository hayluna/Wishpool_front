<template>
    <div>
        <noti-follow v-if="typeFollow" :noti="noti"/>
        <noti-request v-if="typeRequest" :noti="noti" />
        <noti-response v-if="typeResponse" :noti="noti" />
    </div>
</template>
<script>
import NotiFollow from './NotiFollow';
import NotiRequest from './NotiRequest.vue';
import NotiResponse from './NotiResponse.vue';
export default {
    name: 'Noti',
    props: ['noti'],
    components:{
        'noti-follow' : NotiFollow,
        'noti-request' : NotiRequest,
        'noti-response' : NotiResponse,
    },
    computed:{
        typeFollow(){
            if(this.noti.type == 'noti-follow'){
                return true;
            }
            return false;
        },
        typeRequest(){
            if(this.noti.type == 'noti-request'){
                return true;
            }
            return false;
        },
        typeResponse(){
            if(this.noti.type == 'noti-response'){
                return true;
            }
            return false;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';

</style>