<template>
     <div id="customSnackbar" ref="customSnackbar">
         <div v-if="follow">{{me.nickname}}님이 회원님을 <br>팔로우하기 시작했습니다.</div>
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
        follow: false
      }
    },
    created(){
      this.$bus.$on('globalMsg', payload=>{
        const { me, other } = payload;
        this.follow=true;
        this.me = me;
        this.other = other;
        var x = document.getElementById("customSnackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      })
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
    b{
      display: inline;
    }
 /* The snackbar - position it at the bottom and in the middle of the screen */
#customSnackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  width: 25rem;
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  vertical-align: middle;
  position: absolute; /* Sit on top of the screen */
  z-index: 1001; /* Add a z-index if needed */
  top: 80%; /* 30px from the bottom */
  left:50%;
  transform:translate(-50%, -25%);
  border-radius: 10px;
  opacity: 0.8;
  font-size: 1.5rem;
  font-family: $font-stack;
  @include flex-center();
  div{
    @include flex-center();
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
  to {bottom: 25%; opacity: 0.8;}
}

@keyframes fadein {
  from {bottom: 25%; opacity: 0;}
  to {bottom: 25%; opacity: 0.8;}
}

@-webkit-keyframes fadeout {
  from {bottom: 25%; opacity: 0.8;}
  to {bottom: 25%; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 25%; opacity: 0.8;}
  to {bottom: 25%; opacity: 0;}
}
</style>