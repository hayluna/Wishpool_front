<template>
     <div class="view">
         <div class="fix-top">
            <div class="header">
                <div class="nav">
                    <div class="back" @click="onBack">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                    </div>
                </div>
                <div class="title">아이템 상세보기</div>
                <div class="empty" style="display:flex; justify-content:flex-end; padding-right:1rem;"><div class="dropdown"></div>
                    <a data-toggle="dropdown">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li role="presentation"><a role="menuitem" tabindex="-1" @click="onShare">복사</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" @click="onEdit">수정</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" @click="onRemove">삭제</a></li>
                    </ul>
                </div>    
            </div>
         </div>
        <div class="contents">
            <div class="contents-header">
                <div class="thumbnail">
                    <div class="pic">
                        <img :src="preview" v-if="preview&&!isError" @error="imgLoadError" />
                        <v-icon name="package" v-if="isError"></v-icon>
                    </div>
                </div>
            </div>
                <div class="cont">
                    <div>
                        <h5><v-icon name="package"></v-icon>아이템 명</h5>
                        <div class="item-name">: {{item.itemName}}
                            <span :class="[{'blue-badge':isPublic}, badgeClass]">{{item.visibleTo|filterVisible}}</span>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <div>
                        <h5><v-icon name="dollar-sign"></v-icon>아이템 가격 </h5>
                        <div class="item-price">: &#8361;&nbsp;{{item.itemPrice|filterPrice}}</div>
                    </div>
                </div>
            <div class="cont">
                <div>
                    <h5><v-icon name="link"></v-icon>아이템 링크</h5>
                    <div class="item-link">
                        <a :href="item.itemLink" v-if="!voidLink" style="word-break:break-all;">: {{item.itemLink|filterLink}}</a>
                        <a href="javascript:void(0)" v-if="voidLink" style="text-decoration:none; color:black; word-break:break-all;">: 링크 없음</a>
                        <div class="share" @click="onCopyLink" v-if="!voidLink" style="padding-left:0;"><v-icon name="copy" style="margin:0;"></v-icon></div>
                    </div>
                </div>
            </div>
            <div class="cont">
                <h5><v-icon name="edit-3"></v-icon>MEMO</h5>
                <div class="memo-area">{{item.itemMemo|filterMemo}}</div>
            </div>
            <div class="btn-area">
                <a @click="onShare">아이템 공유하기<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg></a>
            </div>
        </div>
        <div id="snackbar">링크가 복사되었습니다!<br><span style="color:lightgreen">친구와 공유해보세요!</span></div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
export default {
    name: 'ItemDetail',
    beforeRouteEnter(to, from, next){
        next(vm => {
                vm.item = getters.myAllItemList.find(item=>item._id == to.params.itemId);
                vm.preview = vm.item.itemImgPath;
            });

    },
    computed:{
        voidLink(){
            if(this.item.itemLink=='undefined'||this.item.itemLink==''){
                return true;
            }
            return false;
        },
        isPublic(){
            if(this.item.visibleTo == 'public'){
                return true;
            }
            return false;
        },
    },
    data(){
        return{
            item: {},
            thumbnail:'',
            preview:'',
            badgeClass: 'badge',
            isError: false,
        }
    },
    filters:{
        filterVisible(val){
            if(val=='public'){
                return '공개'
            }else{
                return '비공개'
            }
        },
        filterPrice(val){
            if(val==undefined){
                return '가격 없음'
            }else{
                let value = val.toString();
                let price ='';
                let j =0;
                for(var i = value.length-1; i>=0;i--){
                    j++;
                    price = value.charAt(i)+price;
                    if(j==3){
                        price = ','+price;
                        j=0;
                    }
                }
                return price;
            }
        },
        filterLink(val){
            if(val=='undefined'|| val==''){
                return '링크 없음';
            }
            return val;
        },
        filterMemo(val){
            if(val=='undefined'||val==''){
                return '메모없음';
            }
            return val;
        }
    },
    methods:{
        imgLoadError(){
            // this.item.itemImgPath='/assets/images/data_usage.svg';
            this.isError = true;
        },
        onBack(){
            this.$router.go(-1);
        },
        onShare(){
            //url copy
            navigator.clipboard.writeText(this.$url+'/item/othersDetail/'+this.item._id);
            //toast
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },
        onEdit(){
            this.$router.push({name:'itemModify', params:{itemId:this.item._id}});
        },
        onRemove(){
            dispatch('removeItem', this.item);
            this.$router.push({name:'itemList', params:{itemId:this.item._id}});
        },
        onCopyLink(){
            //url copy
            navigator.clipboard.writeText(this.item.itemLink);
            //toast
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        }
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
        padding: 0 2rem 0 2rem;
        height: 6rem;
        box-shadow: 0px 3px 6px lightgray;
        position:fixed;
        width: 100%;
        z-index: 3;
    }
    .fix-top{
        -webkit-backface-visibility: hidden;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        z-index:10;
    }
    .nav{
        justify-self: flex-start;
        flex:1;
    }
    .back{
        @include flex-center();
        border: 1px solid $dark-gray;
        border-radius: 5px;
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
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
        padding:7.5rem 4rem 2rem 4rem;
        font-size: 2rem;
        width:100%; 
        height: 100%;
        z-index: 1; 
        overflow-y: scroll; 
        -webkit-overflow-scrolling: touch;
    }
    .thumbnail{
        width: 85%;
        height: 16rem;
        object-fit: cover;
        margin-top: 2rem;
        text-align: right;
        padding: 0.2rem;
        border: none;
        @include flex-center();
        .pic{
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid lightgray;
            @include flex-center();
            svg{
                width: 10rem;
                height: 10rem;
                color: lightgray;
            }
        }
        img{
            width:100%;
            height:100%;
            object-fit: cover;
        }
       
        svg{
            width: 2rem;
        }
    }
    .contents-header{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: flex-start;
        @include flex-center();
    }
    .item-name{
        display:inline-flex;
        justify-content: flex-start;
        padding:0;
        color: black;
        word-break: break-all;
        span{
            width: fit-content;
            min-width: fit-content;
            margin-left: 1rem;
        }
    }
    .item-price{
        display:inline-flex;
        color: black;
        display: flex;
        justify-content: flex-start;
        word-break: break-all;
    }
    .badge-area{
        padding:0;
        flex: 0.3;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .badge{
        border-radius: 9px;
        display: inline-flex;
        height: 2rem;
        width: 7rem;
        font-size: 0.9rem;
        @include flex-center();
        color : $margenta;
        border: 1px solid $margenta;
        background: transparent;

    }
    .blue-badge{
        width: 7rem;
        color : $green;
        border: 1px solid $green;
        background: transparent;
    }
    .cont{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width:100%;
        font-size: 1.4rem;
        padding-bottom: 1rem;
        margin-bottom: 0.5rem;
        // border-bottom: 1px solid lightgray;
        div{
            div{
                padding-left: 1.5rem;
                color: $dark-gray;
                font-size: 1.4rem;
            }
        }
        h5{
            // border-radius: 5px;
            padding: 0rem 0.7rem;
            color:$dark-gray;
            display: flex;
            align-items: center;
            font-size: 1.4rem;
            font-weight: bold;
        }
        a{
            display: block;
            color: #49B7F5;
            word-break: break-all;
        }
        svg{
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.5rem;
            margin-bottom: 0.2rem;
            padding:0;
            fill: none;
        }
    }
    .share{
        @include flex-center();
        width: 3rem;
        height: 3rem;
        &:hover, &:active{
            background: rgba(100, 100, 100, 0.1);
            border-radius: 100%;
        }
        svg{
            color: $link-blue;
        }
    }
    .memo-area{
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1.2rem;
    }
    .item-link{
        display: flex;
        justify-content: space-between;
        svg{
            cursor: pointer;
        }
    }
    .btn-area{
        width: 100%;
        @include flex-center();
        margin-top: 2rem;
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
    .void-link{
        text-decoration: none;
        color: white;
    }
    .dropdown-menu{
    left: unset;
    right: 15px;
    background-color: rgba(51,51,51,0.8);
    border-radius: 10px;
    min-width: 5rem;
    a{
        color: white;
        width: fit-content;
        cursor: pointer;
        &:hover, &:active{
            background-color: transparent;
            color: $green;
        }
    }
}

    /* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 2.5rem; /* Set a default minimum width */
  width: 25rem;
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 10px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 10rem; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 1s, fadeout 0.8s 1.3s; //fadeout합과 setTimeout시간과 일치시켜야한다. 합쳐서 2s여야하는데, 막상 2s하면 잔상이 남음. delay시간을 0.1s더 잡아주면 됨.
  animation: fadein 1s, fadeout 0.8s 1.3s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 10rem; opacity: 0;}
  to {bottom: 10rem; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 10rem; opacity: 0;}
  to {bottom: 10rem; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 10rem; opacity: 1;}
  to {bottom: 10rem; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 10rem; opacity: 1;}
  to {bottom: 10rem; opacity: 0;}
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