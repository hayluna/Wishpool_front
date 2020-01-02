<template>
    <div class="view">
        <div class="header">
            <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
            <div class="title">아이템 추가</div>
            <div class="empty"></div>
        </div>
        <div class="contents">
            <div class="cont">
                <span class="small-title">아이템 이름(*)</span>
                <div class="input-item">
                    <input type="text" ref="name" v-model="item.itemName" placeholder="아이템 이름을 입력해주세요"/>
                    <div class="clear"><svg @click="clearName" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                </div>
            </div>
            <div class="cont">
                <span class="small-title">아이템 가격</span>
                <div class="input-item" style="font-weight: bold;">
                    <input type="text" ref="price" v-model="item.itemPrice" style="width:80%; margin-right:1rem; font-weight: normal; display:inline;" placeholder="숫자만 입력해주세요"/>
                    <div class="clear"><svg @click="clearPrice" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                원
                </div>
            </div>
            <div class="cont">
                <span class="small-title">링크</span>
                <div class="input-item">
                    <input type="text" ref="link" v-model="item.itemLink" placeholder="링크를 입력해주세요"/>
                    <div class="clear"><svg @click="clearLink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                </div>
            </div>
            <div class="cont">
                <span class="small-title">공개설정</span>
                <div class="btn-group btn-group-toggle" style="width:100%; display:flex; margin-top:1.5rem; border-radius:10px; box-shadow: 0 3px 6px lightgray;" data-toggle="buttons">
                    <label class="btn" >
                        <input type="radio" name="jb-radio" id="jb-radio-1" value="public" v-model="item.visibleTo" > 공개
                    </label>
                    <label class="btn active focus">
                        <input type="radio" name="jb-radio" id="jb-radio-2" value="private" v-model="item.visibleTo"> 비공개
                    </label>
                </div>
            </div>
            <div class="cont">
                <span class="small-title">사진 업로드</span>
                <!-- <div class="pic">
                    <svg style="margin-right:1rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="12" cy="12" r="3"/><path d="M20 4h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
                    사진 추가하기
                </div> -->
                <input type="file" id="photo" class="file-upload" accept="image/*" v-on:change="onFileUpload" ref="thumbnail">
                <div class="thumbnail" v-if="preview">
                    <img :src="preview" />
                    <div class="overlay" v-if="preview"><svg @click="deletePreview" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
                </div>
            </div>
            <div class="cont">
                <span class="small-title">메모</span>
                <textarea v-model="item.itemMemo"></textarea>
            </div>
            <div class="btn-area">
                <a @click="onSubmit">아이템 추가하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store';
const { state, getters } = store;

export default {
    name: 'ItemModify',
    beforeRouteEnter(to, from, next){
        next(vm => vm.item = getters.myAllItemList.find(item=>item._id == to.params.itemId));
    },
    created(){
        // this.item = getters.myAllItemList.find(item=>item._id == this.$route.params);
    },
    data(){
        return{
            item: {},
            thumbnail:'',
            preview:''
        }
    },
    methods:{
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
            }
        },
        onSubmit(){
            var formData = new FormData();
            formData.append('itemName', this.item.itemName);
            formData.append('itemPrice', this.item.itemPrice);
            formData.append('itemLink', this.item.itemLink);
            formData.append('visibleTo', this.item.visibleTo);
            formData.append('purchasedBy', this.item.purchasedBy);
            formData.append('itemMemo', this.item.itemMemo);
            formData.append('userId', state.userId);
            formData.append('thumbnail', this.thumbnail);
            (async()=>{
                try{
                    const res = await this.$http.post(this.$api+'/item/insert/'+state.userId, formData, {
                        header: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if(res.data.code == "200"){
                        this.$router.push({name: 'itemList', params: {userId: state.userId}})
                    }else if(res.data.code == 500){
                        console.log('서버오류 : '+res.data.msg);
                    }
                }catch(e){
                    console.error(e);
                }
                
            })();
        },
        deletePreview(){
            this.preview = '';
            this.thumbnail = '';
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
    }
    .small-title{
        display: block;
        color: #999CA3;
        font-size: 1.7rem;
    }
    .cont {
        margin-top: 5rem;
        margin-bottom: 2.5rem;
        
    }
    .input-item{
        border-bottom: 1px solid lightgray;
        .clear{
            visibility: hidden;
            display:inline-flex; 
            border-radius:100%; 
            width: 2rem; 
            height: 2rem; 
            justify-content: center;
            align-items: center;
        }
        svg{
            fill: transparent;
            width: 1.8rem; 
            height: 1.8rem;
        }
        &:focus-within{
            border-bottom: 1px solid black;
            .clear{
                visibility: visible;
                background:lightgray; 
            }
            svg{
                visibility: visible;
                fill:white;
            }
        }
        input{
            outline: none;
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
    }
    label{
        flex:1;
        border-radius: 10px;
        background: #F6F6FE;
    }
    .btn.active.focus, .btn.active:focus,
    .btn.focus, .btn:active.focus, .btn:focus, .btn.active{
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
    }
    .btn-area{
        width: 100%;
        @include flex-center();
        margin-bottom: 5rem;
        a{
            height: 6rem;
            border-radius: 10px;
            width: 20rem;
            background: #F6F6FE;
            color: black;
            font-size: 1.6rem;
            font-weight: bold;
            display: inline-flex;
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
    @media (min-width: 420px){
        .header{
            width: 50rem;
        }
        label{
            height: 4.5rem;
            @include flex-center();
        }
    }
</style>