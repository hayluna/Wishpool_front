<template>
    <div class="view">
        <div class="center-box">
            <div style="width:8rem; height: 8rem; margin-bottom: 2rem; color:#FDD302">
                <v-icon name="alert-triangle"></v-icon>
            </div>
            <div style="text-align:center; margin-bottom: 2rem;">
                잘못된 페이지로 이동하셨네요!<br>
                다시 로그인 해주세요^^
            </div>
            <div class="btn-area">
                <a @click="login">로그인 페이지로 이동<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'PageNotFound',
    methbods:{
        login(){
            location.href="/";
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        height: 100%;
        width: 100%;
    }
    .btn-area{
        // @include flex-center();
        a{
            height: 5rem;
            border-radius: 10px;
            width: 17rem;
            background: #F6F6FE;
            color: black;
            font-size: 1.4rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration:none;
            cursor: pointer;
            &:active{
                background: #bebebe;
                color: white;
                fill: white;
            }
            svg{
                display:inline;
                width: 1.6rem;
            }
        }
    }
    .center-box{
        @include flex-center();
        width: 100%;
        height: 100%;
        flex-direction: column;
    }
</style>