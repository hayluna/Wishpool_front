<template>
    <div class="noti">
        <div class="thumb">
            <!-- <img :src="user.profileImgPath" @error="imgLoadError"> -->
        </div>
        <div class="desc">
            <div class="text">
                <span class="user-name">팡이</span>님이
                <span class="item-name">스타벅스 텀블러 겨울 에디션</span>을 
                <span class="text-bold">사주기</span>를 예약하셨습니다. <span class="date">3일 전</span>
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
    name: 'NoiRequest'
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.noti{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem 0.2rem 1.5rem 2.5rem;
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