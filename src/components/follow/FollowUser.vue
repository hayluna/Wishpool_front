<template>
    <div class="user" data-toggle="modal" data-target="#profile">
        <div class="thumb">
            <img :src="user.profileImgPath" v-if="!isError" @error="imgLoadError">
            <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
        </div>
        <div class="desc">
            <div class="text">
                <span class="name">{{user.nickname}}</span>
            </div>
            <span class="msg">{{user.profileMsg}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FollowUser',
    props: ['user'],
    data(){
        return{
            isError: false,
        }
    },
    methods:{
        imgLoadError(){
            this.isError = true;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem 2rem;
    font-family: $font-stack;
    margin-bottom: 0.5rem;
    &:hover, &:active{
        background-color: rgba(100, 100, 100, 0.05);
    }
}
.thumb{
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 15px;
    border-color: transparent;
    margin-right: 1.5rem;
    background: white;
    box-shadow: 0px 3px 6px lightgray;
        @include flex-center();
        img{
            background: white;
            width: 100%;            
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
}
.msg{
    color: #bebebe;
}
.name{
    color: black;
    font-size: 1.5rem;
}
.user-icon{
        color: gray;
        width: 2.4rem;
    }
</style>