<template>
    <div class="view">
        <div class="header">
            <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
            <div class="title">내 프로필 수정</div>
            <div class="empty"></div>
        </div>
        <div class="contents">
            <div class="cont" style="margin-bottom:0; display:flex; flex-direction:column;">
                <div class="thumbnail" style="align-self:center;">
                    <img :src="preview" v-if="preview||!isError" @error="imgLoadError"/>
                    <v-icon v-if="!preview&&isError" name="user" class="user-icon"></v-icon>
                </div>
                <div class="delete-pic" v-if="preview||!isError">
                    <a @click="deletePreview"><v-icon name="x"></v-icon>프로필 사진 삭제</a>
                </div>
                <span class="small-title"><v-icon name="image"></v-icon>프로필 사진 수정하기</span>
                <input type="file" id="photo" style="margin-top: 1.2rem;" class="file-upload" accept="image/*" v-on:change="onFileUpload" ref="thumbnail">
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="user"></v-icon>닉네임 수정(*)</span>
                <div class="input-item">
                    <input type="text" ref="name" v-model="profile.nickname" placeholder="이름 혹은 닉네임을 입력해주세요"/>
                    <svg @click="clearName" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
           <div class="cont">
                <span class="small-title"><v-icon name="edit-3"></v-icon>프로필 메세지 수정</span>
                <div class="input-item">
                    <input type="text" ref="msg" v-model="profile.profileMsg" placeholder="프로필 메세지를 작성해주세요"/>
                    <svg @click="clearMsg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="mail"></v-icon>이메일 주소</span>
                <div class="input-item" style="font-weight: bold;">
                    <input type="text" ref="email" v-model="profile.email" style="width:80%; margin-right:1rem; font-weight: normal; display:inline;" placeholder="이메일 주소를 입력해주세요"/>
                    <svg @click="clearEmail" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="phone"></v-icon>전화번호</span>
                <div class="input-item">
                    <input type="text" ref="phone" v-model="profile.phone" placeholder="'-'없이 숫자만 입력해주세요"/>
                    <svg @click="clearPhone" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="map-pin"></v-icon>주소</span>
                <div class="input-item">
                    <input type="text" ref="address" v-model="profile.address" placeholder="주소를 입력해주세요"/>
                    <svg @click="clearAddress" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <!-- <div class="cont">
                <span class="small-title"><v-icon name="calendar"></v-icon>생일</span>
                <div class="input-item">
                    <input type="text" ref="birth" v-model="profile.birth" placeholder="숫자 6자리로 입력해주세요"/>
                    <svg @click="clearBirth" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div> -->
            <div class="btn-area">
                <a @click="onSubmit">프로필 수정하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
            </div>
        </div>
    </div>
    <!-- <div>
        <div class="thumb">
            <img :src="user.profileImgPath" v-if="!isError" @error="imgLoadError">
            <v-icon v-if="isError" name="user" class="user-icon"></v-icon>
        </div>
        <div class="profile-body">
            <div class="profile">
                <div class="nickname">{{user.nickname}}</div>
                <div class="msg">{{user.profileMsg}}</div>
            </div>
        </div>
        <complete-snackbar/>
    </div> -->
</template>
<script>
import store from '../../store';
const { getters, state, dispatch } = store;
import CompleteSnackbar from '../CompleteSnackbar.vue';
export default {
    name: 'ProfileModify',
    components:{
        'complete-snackbar' : CompleteSnackbar
    },
    beforeRouteEnter (to, from, next) {
         next(vm => {
                vm.profile = getters.myProfile;
                vm.preview = vm.profile.profileImgPath;
            });
    },
    computed:{
    },
    data(){
        return{
            profile:{},
            thumbnail:'',
            preview:'',
            prevImgName: '',
            isError: false,
            isProfileError: false
        }
    },
    methods:{
        imgLoadError(){
            this.isError = true;
        },
        profileImgLoadError(){
            this.isProfileError = true;
        },
        clearName(){
            this.profile.nickname = ''
            this.$refs.name.focus();
        },
        clearEmail(){
            this.profile.email = ''
            this.$refs.email.focus();
        },
        clearPhone(){
            this.profile.phone = '';
            this.$refs.phone.focus();
        },
        clearAddress(){
            this.profile.address = '';
            this.$refs.address.focus();
        },
        clearBirth(){
            this.profile.birth = '';
            this.$refs.birth.focus();
        },
        clearMsg(){
            this.profile.profileMsg = '';
            this.$refs.msg.focus();
        },
        onFileUpload(e){
            var file = e.target.files[0];
            console.log(file);
            if(file && file.type.match(/^image\/(png|jpeg)$/)){
                this.preview = window.URL.createObjectURL(file);
                this.thumbnail = file;
                this.prevImgName = this.profile.profileImgName;
            }
        },
        onSubmit(){
            if(this.profile.nickname ==''){
                alert('닉네임은 필수 입력값입니다!');
                return false;
            }
            //이메일 유효성검사
            var formData = new FormData();
            formData.append('nickname', this.profile.nickname);
            formData.append('profileMsg', this.profile.profileMsg);
            formData.append('email', this.profile.email);
            formData.append('phone', this.profile.phone);
            formData.append('address', this.profile.address);
            // formData.append('birth', this.profile.birth);
            formData.append('profileImgName', this.profile.profileImgName);
            formData.append('profileImgPath', this.profile.profileImgPath);
            formData.append('_id', state.userId);
            formData.append('thumbnail', this.thumbnail);
            formData.append('prevImgName', this.prevImgName);
            (async()=>{
                try{
                    const res = await this.$http.patch(this.$api+'/users/profile/modify/'+this.profile._id, formData, {
                        header: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if(res.data.code == "200"){
                        this.$router.push({name: 'more', params: {userId: state.userId}})
                    }else if(res.data.code == 500){
                        console.log('서버오류 : '+res.data.msg);
                    }
                    
                // }
                }catch(e){
                    console.error(e);
                }
                
            })();
        },
        deletePreview(){
            if(confirm('프로필 사진을 삭제하시겠습니까?')){
                this.prevImgName = this.profile.profileImgName;
                this.profile.profileImgPath = '';
                this.profile.profileImgName = '';
                this.preview = '';
                this.thumbnail = '';
            }
            document.getElementById("photo").value=""
        },
        onBack(){
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        background: white;
        height: 100%;
        font-family: $font-stack;
        position: fixed; 
        width:100%; 
        top:0; 
        left:0;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 0 1rem 0 1rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        position:fixed;
        width: 100%;
        z-index: 3;
    }
    .nav{
        justify-self: flex-start;
        flex:1;
    }
    .back{
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
         @include flex-center();
        &:hover{
            border-color: lightgray;
            fill: lightgray;
        }
        &:active{
            border-color: black;
            fill: black;
        }
    }
    .title{
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
        flex:1
    }
    .empty{
        flex:1;
    }
    .contents{
        padding: 3rem;
        font-size: 2rem;
        width:100%; 
        height: 100%;
        z-index: 1; 
        overflow-y: scroll; 
        -webkit-overflow-scrolling: touch;
    }
    .small-title{
        display: block;
        color: #999CA3;
        font-size: 1.7rem;
        display: flex;
        align-items: center;
        svg{
            width: 2rem;
            height: 2rem;
            margin-right: 0.8rem;
        }
    }
    .cont {
        margin-top: 4rem;
        margin-bottom: 2.5rem;
    }
    .input-item{
        border-bottom: 1px solid lightgray;
        svg{
            visibility: hidden;
            fill: transparent;
            width: 1.8rem; 
            height: 1.8rem;
        }
        &:focus-within, &:active{
            border-bottom: 1px solid black;
            svg{
                visibility: visible;
                fill:lightgray;
            }
        }
        input{
            outline: none;
            margin-top: 0.5rem;
            width: 90%;
            background: transparent;
            border: none;
            &:focus{
                color: black;
                font-size:2rem;
                &::placeholder{
                    color: transparent;
                }
            }
            &::placeholder{
                color: lightgray;
                font-size: 1.7rem;
            }
        }
    }
    .file-upload{
        font-size: 1.3rem;
        border: 1px solid lightgray;
        background: #f6f6fe;
        color: #333333;
        border-radius: 5px;
        padding: 1rem;
    }
    label{
        flex:1;
        border-radius: 10px;
        background: #F6F6FE;
    }
    .btn.active.focus, .btn.active:focus,
    .btn:active.focus, .btn:focus, .btn.active{
        outline:none;
        background: $purple-gray;
        color: white;
    }
    .pic{
        border-radius: 10px;
        width:100%;
        height: 4rem;
        font-size: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: $dark-gray;
        color: $dark-gray;
        background: #F6F6FE;
        border-radius:10px; 
        box-shadow: 0 3px 6px lightgray;
        margin-top: 1rem;
    }
    .thumbnail{
        width: 15rem;
        height: 15rem;
        margin: 2rem 0 2rem 0;
        border-radius: 100%;
        padding: 0.2rem;
        display: inline;
        @include flex-center();
        img{
            width:100%;
            height:100%;
            border-radius: 100%;
            object-fit: cover;
        }
        svg{
            width: 60%;
        }
    }
    textarea{
        margin-top: 1.5rem;
        border:1px solid lightgray;
        border-radius: 5px;
        font-size:1.5rem;
        outline:none;
        width:100%;
        height: 15rem;
        padding: 1rem;
    }
    .btn-area{
        width: 100%;
        @include flex-center();
        margin-top: 4rem;
        margin-bottom: 10rem;
        a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18rem;
            height: 5rem;
            border-radius: 4px;
            padding: 0.75rem 1rem;
            color: white;
            background: gray;
            margin-top: 1.5rem;
            border: 1px solid gray;
            fill: white;
            font-size: 1.5rem;
            cursor: pointer;
            &:hover{
                background: $dark-gray;
                text-decoration: none;
                color: white;
                fill: white;
            }
            svg{
                display:inline;
                width: 1.6rem;
                margin-left: 2rem;
            }
        }
    }
    .delete-pic{
        width: 100%;
        @include flex-center();
        margin-bottom: 3rem;
        a{
            padding: 0.6rem 2rem 0.6rem 1.5rem;
            border-radius: 10px;
            background: #F6F6FE;
            color: black;
            font-size: 1.3rem;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration:none;
            cursor: pointer;
            @include flex-center();
            flex-direction: row;
            &:active{
                background: #bebebe;
                color: white;
                fill: white;
            }
            svg{
                display:inline;
                width: 1.6rem;
                margin-right: 0.5rem;
            }
        }
    }
    .user-icon{
        color: #999ca3;
    }
    @media (min-width: 450px){
        .header{
            height: 5.5rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 1.7rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
    }
       
</style>