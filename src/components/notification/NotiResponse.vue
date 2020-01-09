<template>
    <div class="noti">
        <div class="thumb">
            <!-- <img :src="user.profileImgPath" @error="imgLoadError"> -->
        </div>
        <div class="desc">
            <div class="text">
                <span class="text-bold">{{noti.itemName}}</span>에 대한
                <span class="text-bold">{{noti.from}}</span>님의
                <span class="text-bold">사주기 요청</span>를 <span class="text-bold">수락</span>하셨습니다. <span class="date">{{date}}</span>
            </div>
        </div>
        <div class="close-area">
            <v-icon name="x" class="icon-close"></v-icon>
        </div>
        <!-- <div id="snackbar">{{ item.itemName }}의 링크가 복사되었습니다!<br>친구와 공유해보세요!</div> -->
    </div>
</template>
<script>
export default {
    name: 'NoiRequest',
    props: ['noti'],
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
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.noti{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem 0.2rem 1.5rem 2.5rem;
    font-family: $font-stack;
}
.desc{
    flex:1;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    height: 100%;
    align-self: flex-start;
    color: #A9AAB9;
}
.thumb{
    width: 4rem;
    height: 4rem;
    justify-self: flex-start;
    border-radius: 100%;
    box-shadow: 0 3px 6px lightgray;
    margin-right: 0.7rem;
    @include flex-center();
    img{
        width: 95%;
        height: 95%;
        object-fit: cover;
        border-radius: 10px;
    }
}
.text{
    font-size:1.5rem;
}
.user-name, .item-name, .text-bold{
    font-weight: bold;
    color: $dark-gray;
}
.close-area{
    width:5rem;
    align-self: flex-start;
    @include flex-center();
    .icon-close{
        width: 1.7rem;
        height: 1.7rem;
        color: black;
    }
}
</style>