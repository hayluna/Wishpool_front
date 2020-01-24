<template>
     <div id="customSnackbar" ref="customSnackbar" >
         <div v-if="follow"><span style="color:lightgreen;">{{me.nickname}}</span>님이 회원님을 <br><span style="color:lightgreen;">팔로우</span>하기 시작했습니다.</div>
         <div v-if="requestPurchase"><span style="color:lightgreen;">{{other.nickname}}</span>님이 회원님의 아이템<br>
         <span style="color:inherit;"> ' {{item.itemName}} '</span>을(를) <br><span style="color:lightgreen;">사주기 요청</span>하셨습니다.</div>
    </div>
</template>
<script>
import store from '../store';
const { state } = store;
export default {
    name: 'CustomSnackbar',
    data(){
      return {
        me: {},
        other: {},
        item:{},
        follow: false,
        requestPurchase: true,
      }
    },
    created(){
      this.$bus.$on('globalMsg', payload=>{
        const { me, other } = payload;
        this.requestPurchase = false;
        this.follow=true;
        this.me = me;
        this.other = other;
        var x = document.getElementById("customSnackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      });
      this.$bus.$on('purchaseRequestMsg', payload=>{
        this.follow=false;
        this.requestPurchase = true;
        this.other = payload.reqUser;
        this.item = payload.item;
        var x = document.getElementById("customSnackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      });
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    b{
      display: inline;
    }
 /* The snackbar - position it at the bottom and in the middle of the screen */
#customSnackbar{
  visibility: hidden; /* Hidden by default. Visible on click */
  width: 25rem;
  height: 8rem;
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  vertical-align: middle;
  position: absolute; /* Sit on top of the screen */
  z-index: 3001; /* Add a z-index if needed */
  top: 80%; /* 30px from the bottom */
  left:50%;
  transform:translate(-50%, -25%);
  border-radius: 10px;
  opacity: 0.8;
  padding: 0.5rem; /* Padding */
  font-size: 1.4rem;
  font-family: $font-stack;
    display:inline-flex;
    align-items: center;
    justify-content: center;
  div{
    display:-webkit-inline-box;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  vertical-align: middle;
    span{
      display:inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#customSnackbar.show {
   visibility: visible; /* Show the snackbar */
    -webkit-animation: fadein 1s, fadeout 0.8s 1.3s; //fadeout합과 setTimeout시간과 일치시켜야한다. 합쳐서 2s여야하는데, 막상 2s하면 잔상이 남음. delay시간을 0.1s더 잡아주면 됨.
    animation: fadein 1s, fadeout 0.8s 1.3s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 25%; opacity: 0;}
  to {bottom: 25%; opacity: 0.9;}
}

@keyframes fadein {
  from {bottom: 25%; opacity: 0;}
  to {bottom: 25%; opacity: 0.9;}
}

@-webkit-keyframes fadeout {
  from {bottom: 25%; opacity: 0.9;}
  to {bottom: 25%; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 25%; opacity: 0.9;}
  to {bottom: 25%; opacity: 0;}
}
</style>