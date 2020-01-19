<template>
    <div class="template-block">
        <div class="welcome">
        <h1>환영합니다!</h1>
        <p>Wishpool에 가입을 해보세요!</p>
        </div>
        <div class="white-box">
            <!-- <div class="logo-area">WISHPOOL</div> -->
            <div class="form">
                <!-- <h3>회원가입</h3> -->
                <div class="input-box" style="margin-top:0.5rem;"><span>필수 입력</span><span class="border-middle"></span></div>
                <div class="input-item"><input type="text" ref="id" v-model="user.userId" style="margin-top: 1.3rem;" placeholder="아이디" /><div @click="clearId" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                <div class="input-item"><input type="password" ref="pwd" v-model="user.password" style="margin-top: 1.5rem;" placeholder="비밀번호" /><div @click="clearPwd" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                <div class="input-item"><input type="password" ref="confirmPwd" v-model="confirmPassword" style="margin-top: 1.5rem;" placeholder="비밀번호 확인" /><div @click="clearPwdConfirm" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                <div class="input-item"><input type="text" ref="nickname" v-model="user.nickname" style="margin-top: 1.5rem;" placeholder="이름 혹은 닉네임 입력" /><div @click="clearNickname" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                <div class="input-item"><input type="text" ref="phone" class="phoneNumber" v-model="user.phone" style="margin-top: 1.5rem;" placeholder="전화번호 입력 : '-'없이 숫자만 입력" /><div @click="clearPhone" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                
                <div class="input-box" style="margin-top:4rem;"><span>선택 입력</span><span class="border-middle"></span></div>
                <div class="input-item"><input type="text" ref="address" v-model="user.address" style="margin-top: 1.5rem;" placeholder="주소" /><div @click="clearAddress" class="x-circle"><v-icon name="x-circle"></v-icon></div></div>
                <!-- <input type="checkbox" v-model="isChecked"> 입력한 내용은 테스트용데이터이며, 실제정보를 입력하지 않아야합니다. -->
                <div class="error-box" v-if="isError">{{errorMsg}}</div>
                <a @click="onSubmit" style="margin-top:3rem;">회원가입</a>
            </div>
            <div class="footer"><a @click="login">로그인</a></div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { dispatch, state, getters } = store;
export default {
    name: 'Register',
    data(){
        return{
            user: {
                userId:'',
                password: '',
                phone: '',
                nickname: '',
                address:'',
                entryType: 't', //테스트용 사용자
                profileImgPath: '',
                profileImgName: '',
                profileMsg:'',
                followingId: [],
                followerId: [],
                email:''
            },
            confirmPassword:'',
            isError: false,
            errorMsg: ''
        }
    },
    created(){
        // $(document).on("keyup", ".phoneNumber", function() { $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-") ); });
    },
    filters:{
        // regex(val){
        //     return val.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");
        // }
    },
     methods:{
        login(){
            this.$router.push({name:'login'});
        },
        clearId(){
            this.user.userId = '';
            this.$refs.id.focus();
        },
        clearPwd(){
            this.user.password = '';
            this.$refs.pwd.focus();
        },
        clearPwdConfirm(){
            this.confirmPassword = '';
            this.$refs.confirmPwd.focus();
        },
        clearPhone(){
             this.user.phone = '';
            this.$refs.phone.focus();
        },
        clearNickname(){
            this.user.nickname = '';
            this.$refs.nickname.focus();
        },
        clearAddress(){
            this.user.address = '';
            this.$refs.address.focus();
        },
        onSubmit(){
            //유효성검사
            if(this.user.userId == ''){
                this.isError = true;
                this.errorMsg = "아이디는 필수 입력값입니다"
                this.$refs.id.focus();
                return false;
            }
            if(this.user.userId.length <4){
                this.isError = true;
                this.errorMsg = "아이디는 3자 이상 20자 이하입니다."
                this.$refs.id.focus();
                return false;
            }
            if(this.user.password == ''){
                this.isError = true;
                this.errorMsg = "비밀번호를 입력하지 않으셨습니다"
                this.$refs.pwd.focus();
                return false; 
            }
            if(this.user.password !== this.confirmPassword){
                this.isError = true;
                this.errorMsg = "비밀번호가 일치하지 않습니다"
                this.$refs.pwd.focus();
                return false;
            }
            if(this.user.phone == ''){
                this.isError = true;
                this.errorMsg = "전화번호는 필수 입력값입니다"
                return false;
            }
            this.user.phone = this.user.phone.replace(/\-/g,"");
            const regPhone = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
            const validate = regPhone.test(this.user.phone.replace(/(\s*)/g, ""));
            if(!validate){
                this.isError = true;
                this.errorMsg = "실제 전화번호를 숫자만 입력해주세요."
                return false;
            }
            (async()=>{
                await dispatch('register', this.user);
                if(getters.isLoggedIn){
                    this.$bus.$emit('globlaMsg', '회원가입에 성공하였습니다.');
                    return this.$router.push({name:'followList', params:{userId:state.userId}});
                }else{
                    this.isError = true;
                    this.errorMsg = state.registerErrMsg;
                    return;
                }
            })();
           
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    
    .template-block{
        width: 100%;
        height: 100%;
        background: $primary-color;
        padding: 0;
        margin: 0;
        color: white;
        @include flex-center();
        font-family: $font-stack;
    }
    .logo-area{
        display: block;
        padding-bottom: 2rem;
        text-align:center;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .welcome{
       width: 27rem;
        text-align: left;
        margin-top: -1rem;
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
    .form{
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
            border-bottom: 1px solid #adb5bd;
            padding-bottom: 0.5rem;
            font-family: inherit;
            &::placeholder{
                color: darkgray;
            }
            &:focus{
                border-bottom: 1px solid $dark-gray;
                color: $dark-gray;
            }
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
            }
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
    .input-box{
        display:flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-direction: row;
        span{
            font-size: 1.6rem;
            color: gray;
            font-weight: 800;
        }
    }
    .border-middle{
        // height: 50%;
        // width: 30%;
        // border-top: 1px solid lightgray;
    }
    .error-box{
        margin-top: 1.5rem;
        color: $margenta;
        font-size: 1.3rem;
        @include flex-center();
    }
    .input-item{
        display:flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid gray;
        &:focus-within, &:active{
         .x-circle{
            visibility: visible;
            cursor: pointer;
            border-bottom: 1px solid darkgray;
         }   
         input{
             border: none;
         }
        }
        input{
            outline:none;
            border: none;
            background: transparent;
        }
    }
    .x-circle{
        visibility: hidden;
        @include flex-center();
        svg{
            fill: darkgray;
            color: white;
            width: 2rem;
            margin-top: 0.2rem;
        }
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
                font-size:1.2rem;
            }
        }
        .welcome{
            width: 300px;
        }
    }
</style>