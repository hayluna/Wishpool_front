<template>
    <div class="template-block" @keydown.enter="onSubmit">
        <div class="welcome">
        <h1>안녕하세요,</h1>
        <p>Wishpool에 로그인을 해주세요!</p>
        </div>
        <div class="white-box">
            <!-- <div class="logo-area">WISHPOOL</div> -->
            <div class="form-login">
                <h3>로그인</h3>
                <div class="input-item" ref="id" style="margin-top:1rem;"><input type="text" v-model="user.userId" style="margin-top: 1.3rem;" placeholder="아이디" /></div>
                <div class="input-item" ref="pwd" style="margin-bottom:1.5rem;"><input type="password" v-model="user.password" style="margin-top: 1.5rem;" placeholder="비밀번호"/></div>
                <div class="error-box" v-if="isError">{{errorMsg}}</div>
                <a @click="onSubmit">로그인</a>
            </div>
            <div class="footer"><a @click="register">회원가입</a></div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { state, dispatch, getters } = store;
export default {
    name: 'Login',
    beforeRouteEnter(to, from, next){
        (async()=>{
            try {
                dispatch('toggleFooterShow', false);
                await dispatch('checkLogin'); //내 프로필 정보를 가져온다.
                if(getters.isLoggedIn){
                    next({
                        name: 'followList',
                        params: { userId: state.userId }
                    });
                }else{
                    next();
                }
            } catch (e) {
                console.error(e);
            }
        })();
       
    },
    data(){
        return {
            user: {},
            isError: false,
            errorMsg: '',
        }
    },
    methods:{
        register(){
            this.$router.push({name:'register'});
        },
        onSubmit(){
            if(this.$refs.id ==''){
                //아이디를 입력해주세요 스낵바
                this.$refs.id.focus();
            }
            if(this.$refs.pwd ==''){
                //비밀번호를 입력해주세요 스택바
                this.$refs.pwd.focus();
            }
            (async()=>{
                await dispatch('login', this.user);
                if(getters.isLoggedIn){
                    this.$router.push({name:'followList', params:{userId:state.userId}})
                }else{
                    this.isError = true;
                    this.errorMsg = state.loginErrMsg
                }
                
            })();
            
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    
    .template-block{
        background: $primary-color;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        color: white;
        @include flex-center();
        font-family: $font-stack;

    }
    .welcome{
        width: 27rem;
        text-align: left;
        margin-top: -2rem;
        h1{
            margin-bottom:0.5rem;
            font-size: 2.5rem;
        }
        p{
            margin-bottom:1rem;
            margin-top: 0.2rem;
            font-size: 1.5rem;
        }
    }
    .logo-area{
        display: block;
        padding-bottom: 2rem;
        text-align:center;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .white-box{
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
        padding: 2rem;
        background: white;
        border-radius: 7px;
        @include flex-center();
        flex-direction: column;
        width: 27rem; //mobile;
        color:black;
        margin-top: 0.5rem;
        font-size: 1.5rem;
    }
    .form-login{
        width: 100%;
        @include flex-center();
        font-size: 1.5rem;
        h3{
            width: 100%;
            margin: 1rem 0 0 0;
            font-size:2rem;
        }
        
        input{
            width: 100%;
            padding-bottom: 0.5rem;
            font-family: inherit;
            outline: none;
            background: transparent;
            border:none;
        }
        a{
            @include flex-center();
            width: 90%;
            border-radius: 4px;
            padding: 0.75rem 1rem;
            color: white;
            background: gray;
            margin-top: 1.5rem;
            cursor: pointer;
            &:hover{
                background: $dark-gray;
                text-decoration: none;
            }
        }
    }
    .input-item{
        width: 100%;
        padding: 0 0.2rem;
        border-bottom: 1px solid #adb5bd;
        &:focus-within, &:active{
            border-bottom: 1px solid $dark-gray;
            color: $dark-gray;
        }
    }
    .footer{
        margin-top: 2rem;
        text-align: right;
        width: 100%;
        font-size: 1.5rem;
        a{
            color: gray;
            text-decoration: underline;
            cursor: pointer;
            &:hover{
                color: $dark-gray;
            }
        }
    }
    .error-box{
        margin-top: 0.5rem;
        color: $margenta;
        font-size: 1.3rem;
        @include flex-center();
    }
    //desktop, tablet
    @media (min-width:450px){
        .white-box{
            width: 300px;
        }
        .logo-area{
            font-size: 1.2rem;
        }
        .form{
            h3{
                font-size:1.3rem;
            }
        }
        .welcome{
            width: 300px;
        }
    }

</style>