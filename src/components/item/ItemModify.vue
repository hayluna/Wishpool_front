<template>
    <div class="view">
        <div class="fix-top">
            <div class="header">
                <div class="nav">
                    <div class="back" @click="onBack">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                    </div>
                </div>
                <div class="title">아이템 수정</div>
                <div class="empty"></div>
            </div>
        </div>
        <div class="contents">
            <div class="cont">
                <span class="small-title"><v-icon name="package"></v-icon>아이템 이름(*)</span>
                <div class="input-item">
                    <input type="text" ref="name" v-model="item.itemName" placeholder="아이템 이름을 입력해주세요"/>
                    <svg @click="clearName" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="dollar-sign"></v-icon>아이템 가격</span>
                <div class="input-item" style="font-weight: bold;">
                    <input type="text" ref="price" v-model="item.itemPrice" style="width:80%; margin-right:1rem; font-weight: normal; display:inline;" placeholder="숫자만 입력해주세요"/>
                    <svg @click="clearPrice" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                원
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="link"></v-icon>링크</span>
                <div class="input-item">
                    <input type="text" ref="link" v-model="item.itemLink" placeholder="링크를 입력해주세요"/>
                    <svg @click="clearLink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/></svg>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="user"></v-icon>공개설정</span>
                <div class="btn-group btn-group-toggle" style="width:100%; display:flex; margin-top:1.5rem; border-radius:10px; box-shadow: 0 3px 6px lightgray;" data-toggle="buttons">
                    <label :class="[btnClass, {active:isActive}]" @click="toggleVisibility">
                        <input type="radio" name="jb-radio" id="public" value="public"> 공개
                    </label>
                    <label :class="[btnClass, {active:!isActive}]" @click="toggleVisibility">
                        <input type="radio" name="jb-radio" id="private" value="private"> 비공개
                    </label>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="image"></v-icon>사진 수정하기</span>
                <!-- <div class="pic">
                    <svg style="margin-right:1rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="12" cy="12" r="3"/><path d="M20 4h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
                    사진 추가하기
                </div> -->
                <input type="file" id="photo" style="margin-top: 1.2rem;" class="file-upload" accept="image/*" v-on:change="onFileUpload" ref="thumbnail">
                <div class="thumbnail" v-if="preview&&!isError">
                    <img :src="preview" @error="imgLoadError"/>
                    <div class="overlay" v-if="preview&&!isError"><svg @click="deletePreview" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                </div>
            </div>
            <div class="cont">
                <span class="small-title"><v-icon name="edit-3"></v-icon>메모</span>
                <textarea v-model="item.itemMemo"></textarea>
            </div>
            <div class="btn-area">
                <a @click="onSubmit">아이템 수정하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { state, getters, dispatch } = store;

export default {
    name: 'ItemModify',
    beforeRouteEnter(to, from, next){
        next(vm => {
                vm.item = getters.myAllItemList.find(item=>item._id == to.params.itemId);
                vm.preview = vm.item.itemImgPath;
            });

    },
    computed:{
        isActive(){
            if(this.item.visibleTo == 'public'){
                return true;
            }else if(this.item.visibleTo == 'private'){
                return false;
            }
            return false;
        }
    },
    data(){
        return{
            item: {},
            thumbnail:'',
            preview:'',
            prevImgName: '',
            btnClass: 'btn',
            isError: false,
        }
    },
    methods:{
        imgLoadError(){
            this.isError = true;
        },
        clearName(){
            this.item.itemName = ''
            this.$refs.name.focus();
        },
        clearPrice(){
            this.item.itemPrice = ''
            this.$refs.price.focus();
        },
        clearLink(){
            this.item.itemLink = '';
            this.$refs.link.focus();
        },
        onFileUpload(e){
            var file = e.target.files[0];
            if(file && file.type.match(/^image\/(png|jpeg)$/)){
                this.preview = window.URL.createObjectURL(file);
                this.thumbnail = file;
                this.prevImgName = this.item.itemImgName;
                this.isError = false;
            }
        },
        onSubmit(){
            if(this.item.itemName ==''){
                alert('아이템 이름은 필수 입력값입니다!');
                return false;
            }
            if(isNaN(this.item.itemPrice)){
                alert('가격은 숫자만 입력가능합니다!');
                return false;
            }
            console.log(this.item.visibleTo);
            var formData = new FormData();
            formData.append('itemName', this.item.itemName);
            formData.append('itemPrice', this.item.itemPrice);
            formData.append('itemLink', this.item.itemLink);
            formData.append('visibleTo', this.item.visibleTo);
            formData.append('purchasedBy', this.item.purchasedBy);
            formData.append('itemMemo', this.item.itemMemo);
            formData.append('itemImgName', this.item.itemImgName);
            formData.append('itemImgPath', this.item.itemImgPath);
            formData.append('userId', state.userId);
            formData.append('thumbnail', this.thumbnail);
            formData.append('prevImgName', this.prevImgName);
            (async()=>{
                try{
                    const res = await this.$http.patch(this.$api+'/item/modify/'+this.item._id, formData, {
                        header: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if(res.data.code == "200"){
                        this.$router.push({name: 'itemList', params: {userId: state.userId}})
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
            if(confirm('아이템을 삭제하시겠습니까?')){
                this.prevImgName = this.item.itemImgName;
                this.item.itemImgPath = '';
                this.item.itemImgName = '';
                this.preview = '';
                this.thumbnail = '';
            }
            document.getElementById("photo").value=""
        },
        onBack(){
            this.$router.go(-1);
        },
        toggleVisibility(e){
            this.item.visibleTo = e.target.firstChild.value;
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    .view{
        background: white;
        height: 95%;
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
    .fix-top{
        -webkit-backface-visibility: hidden;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        z-index:10;
    }
    .back{
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
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
        display: flex;
        justify-content: flex-end;
        &:hover, &:active{
            color: $margenta;
        }
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
        display:flex;
        align-items: center;
        svg{
            width: 1.7rem;
            height: 1.7rem;
            margin-right: 0.6rem;
        }
    }
    .cont {
        margin-top: 5rem;
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
            border: none;
            margin-top: 0.5rem;
            width: 90%;
            background: transparent;
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
        width: 100%;
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
        width: 9rem;
        height: 9rem;
        margin-top: 2rem;
        border-radius: 5px;
        text-align: right;
        padding: 0.2rem;
        img{
            width:100%;
            height:100%;
            object-fit: cover;
        }
       
        svg{
            width: 2rem;
        }
    }
    .overlay{
        width: 8.8rem;
        height: 8.8rem;
        margin-left: -0.2rem;
        margin-top: -102%;
        border-radius: 5px;
        svg{
            width: 1.5rem;
            height: 1.5rem;
            fill: black;
            margin-right: 0.3rem; 
            margin-top: -0.2rem;
        }
        &:hover, &:active{
            z-index:3;
            background: lightgray;
            opacity: 0.7;
            svg{
                fill:black
            }
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
        &::placeholder{
            color: lightgray;
        }
    }
    .btn-area{
        width: 100%;
        @include flex-center();
        margin-bottom: 8rem;
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
      @media (min-width:450px){
        .header{
            height: 5.5rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 1.7rem;
        }
    }
</style>