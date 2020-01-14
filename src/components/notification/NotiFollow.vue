<template>
    <div class="noti">
        <div class="thumb">
            <img :src="noti.profileImgPath" v-if="!isError" @error="imgLoadError">
            <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
        </div>
        <div class="desc">
            <div class="text">
                <span class="user-name">{{noti.from}}</span>님이 팔로우합니다. <span class="date"> {{date||now}}</span>
            </div>
        </div>
        <div class="close-area" @click="onClose">
            <v-icon name="x" class="icon-close"></v-icon>
        </div>
        <!-- <div id="snackbar">{{ item.itemName }}의 링크가 복사되었습니다!<br>친구와 공유해보세요!</div> -->
    </div>
</template>
<script>
import store from '../../store';
const { dispatch } = store;
export default {
    name: 'NotiFollow',
    props: ['noti'],
    data(){
        return{
            isError: false,
        }
    },
    computed:{
        date(){
            let now = new Date();
            const createdAt = new Date(this.noti.createdAt);
            var minus;
            var time = '';
            if(now.getFullYear() > createdAt.getFullYear()){
                minus= now.getFullYear()-createdAt.getFullYear();
                time += minus+"년 ";
                return time += '전';
            }
            if(now.getMonth() > createdAt.getMonth()){
                minus= now.getMonth()-createdAt.getMonth();
                time += minus+"달 ";
                return time += '전';
            }
            if(now.getDate() > createdAt.getDate()){
                minus= now.getDate()-createdAt.getDate();
                time +=  minus+"일 ";
                return time += '전';
            }

            if(now.getHours() > createdAt.getHours()){
                minus = now.getHours() - createdAt.getHours();
                time +=  minus+"시간 ";
                return time += '전';
            }
            
            if(now.getMinutes() > createdAt.getMinutes()){
                minus = now.getMinutes() - createdAt.getMinutes();
                time += minus+"분 ";
                return time += '전';
            }
        },
        now(){
            return '방금 전';
        }
    },
    methods:{
        onClose(){
            (async()=>{
                try {
                    await dispatch('removeNotiItem', this.noti._id);
                    this.$bus.$emit('onClose', this.noti._id);  
                } catch (e) {
                    console.error(e);
                }
            })();
        },
         imgLoadError(){
            this.isError = true;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    @import url('/assets/KoPubDotum.min.css');
.noti{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.3rem 0rem 1.5rem 2.5rem;
    font-family: $font-stack;
}
.desc{
    flex:1;
    margin-top: 0.5rem;
    margin-left: 1rem;
    height: 100%;
    align-self: flex-start;
    color: #A9AAB9;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    flex-direction: row;
}
.thumb{
    width: 4rem;
    height: 4rem;
    justify-self: flex-start;
    border-radius: 100%;
    box-shadow: 0 3px 6px lightgray;
    // border: 1px solid lightgray;
    margin-right: 0.7rem;
    @include flex-center();
    img{
        width: 95%;
        height: 95%;
        object-fit: cover;
        border-radius: 10px;
    }
    svg{
        width: 60%;
    }
}
.user-icon{
    color: black;
}
.text{
    display: flex;
    align-items: center;
    justify-items: flex-start;
    flex-direction: row;
    font-size:1.5rem;
    height: 100%;
    color: black;
    font-weight: 200;
}
.user-name{
    font-weight: 800;
    color: black;
}
.close-area{
    width:5rem;
    align-self: flex-start;
    @include flex-center();
    cursor: pointer;
    
    .icon-close{
        width: 1.7rem;
        height: 1.7rem;
        color: gray;
        justify-self:flex-start;
        margin-top: -0.6rem;
        cursor: pointer;
        &:hover{
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
}
.date{
    margin-left: 0.8rem;
    font-size: 1.4rem;
    color: darkgray;
}
</style>