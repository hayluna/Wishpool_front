<template>
     <div class="view">
        <div class="header">
            <div class="nav">
                <div class="back" @click="onBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"/></svg>
                </div>
            </div>
            <div class="empty"></div>
        </div>
        <div class="contents">
            <div class="contents-header">
                <div class="item-name">{{item.itemName}}<span class="badge">공개</span></div>
                <!-- <div class="badge-area"><span class="badge">{{item.visibleTo}}</span></div> -->
                <div class="item-price">&#8361;&nbsp;{{item.itemPrice|filterPrice}}</div>
            </div>
            <div class="thumbnail" v-if="preview">
                <img :src="preview" @error="imgLoadError" />
            </div>
            <div class="cont">
                <h5>LINK</h5>
                <div class="item-link">
                    <a :href="item.itemLink" v-if="!voidLink" >{{item.itemLink|filterLink}}</a>
                    <a href="javascript:void(0)" v-if="voidLink" style="text-decoration:none; color:black;">링크 없음</a>
                    <svg @click="onShare" v-if="!voidLink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1zm2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                </div>
            </div>
            <div class="cont">
                <h5>MEMO</h5>
                <div>{{item.itemMemo|filterMemo}}</div>
            </div>
            <div class="btn-area">
                <a @click="onShare" style="margin-bottom:1.5rem;">공유하기</a>
                <a @click="reserveItem">내가 사주기</a>
            </div>
        </div>
        <div id="snackbarLink">링크가 복사되었습니다!<br><span style="color:lightgreen">친구와 공유해보세요!</span></div>
        <div id="snackbar">사주기 요청을<br><span style="color:lightgreen"> {{user.userName}}</span>님에게 보냈습니다!</div>
        <div id="snackbar2"><span style="color:lightgreen">{{user.userName}}</span> 님이 수락하시면 <br>해당 아이템이 사주기 완료가 됩니다!</div>
    </div>
</template>
<script>
import store from '../../store';
const { getters, dispatch } = store;
export default {
    name: 'OthersItemDetail',
    beforeRouteEnter(to, from, next){
        next(vm => {
                vm.item = getters.othersAllItemList.find(item=>item._id == to.params.itemId);
                vm.user = getters.getCurrentUser;
                vm.preview = vm.item.itemImgPath;
            });

    },
    computed:{
        voidLink(){
            if(this.item.itemLink=='undefined'||this.item.itemLink==''){
                return true;
            }
            return false;
        }
    },
    data(){
        return{
            item: {},
            user: {},
            thumbnail:'',
            preview:'',
        }
    },
    filters:{
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
            if(val=='undefined'||val==''){
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
            this.item.itemImgPath='/assets/images/data_usage.svg';
        },
        onBack(){
            this.$router.go(-1);
        },
        onShare(){
            if(this.item.itemPrice ==''||this.item.itemPrice == 'undefined'){
                alert('복사할 링크가 없습니다.');
            }
            //url copy
            navigator.clipboard.writeText(this.$route.fullPath);
            //toast
            var x = document.getElementById("snackbarLink");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
            navigator.clipboard.writeText(this.$url+'/item/detail/'+this.item._id);
        },
        reserveItem(){
            //toast
            var x = document.getElementById("snackbar");
            var y = document.getElementById("snackbar2");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); y.className = "show";}, 2500);
            setTimeout(function(){ y.className = y.className.replace("show", ""); }, 5000);
            //사주기 취소로 토글
        },
        onEdit(){
            this.$router.push({name:'itemModify', params:{itemId:this.item._id}});
        },
        onRemove(){
            dispatch('removeItem', this.item);
            this.$router.push({name:'itemList', params:{itemId:this.item._id}});
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
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 0 2rem 0 2rem;
        height: 7rem;
        // box-shadow: 0px 3px 6px lightgray;
        position:fixed;
        width: 100%;
        z-index: 3;
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
    .thumbnail{
        width: 100%;
        height: 16rem;
        object-fit: cover;
        margin-top: 2rem;
        border-radius: 5px;
        text-align: right;
        padding: 0.2rem;
        border: 1px solid lightgray;
        img{
            width:100%;
            height:100%;
            object-fit: cover;
        }
       
        svg{
            width: 2rem;
        }
    }
    .contents{
        @include flex-center();
        padding:7.5rem 5rem 2rem 5rem;
    }
    .contents-header{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: flex-start;
        .item-name{
            display:flex;
            justify-content: flex-start;
            font-size: 1.5rem;
            font-weight: bold;
            // flex: 0.7;
            padding:0;
            word-break: break-all;
            span{
                width: fit-content;
                min-width: fit-content;
                margin-left: 1rem;
            }
        }
        .badge-area{
            padding:0;
            flex: 0.3;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            
        }
        .badge{
                height: 2rem;
                width: 10rem;
                background : transparent;
                border: 1px solid $margenta;
                color: $margenta;
            }
        .item-price{
            font-size:1.5rem;
            color: black;
            flex: 0.3;
            display: flex;
            justify-content: flex-end;
            padding-left:1rem;
            word-break: break-all;
        }
    }
    .cont{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width:100%;
        font-size: 1.5rem;
        margin-bottom: 3rem;
        h5{
            font-weight: bold;
        }
        a{
            display: block;
            color: #49B7F5
        }
        svg{
            fill: #49B7F5;
        }
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 2rem;
        margin-bottom: 6.5rem;
        a{
            height: 5rem;
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
    .void-link{
        text-decoration: none;
        color: white;
    }
    .dropdown-menu{
    left: unset;
    right: 0;
    background-color: rgba(51,51,51,0.8);
    border-radius: 10px;
    min-width: 5rem;
    a{
        color: white;
        width: fit-content;
        &:hover, &:active{
            background-color: transparent;
            color: $green;
        }
    }
}
    /* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar, #snackbarLink, #snackbar2 {
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
#snackbar.show, #snackbarLink.show, #snackbar2.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 1s, fadeout 0.8s 1.8s; //fadeout합과 setTimeout시간과 일치시켜야한다. 합쳐서 2.5s여야하는데, 막상 2s하면 잔상이 남음. delay시간을 0.1s더 잡아주면 됨.
  animation: fadein 1s, fadeout 0.8s 1.8s;
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
</style>