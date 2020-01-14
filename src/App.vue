<template>
  <div id="app" class="app-container" :class="classObject">
    <page-template />
    <custom-snackbar :msg="message"/>
  </div>
</template>
<script>
import PageTemplate from './components/PageTemplate.vue';
import CustomSnackbar from './components/CustomSnackbar.vue'
import store from './store';
const { dispatch, getters, state } = store;
export default {
  name: 'App',
  components:{
    'page-template': PageTemplate,
    'custom-snackbar' : CustomSnackbar
  },
  created(){
    this.$socket.on('noti-fired', ()=>{
      dispatch('fetchNotiList')
    });
    this.$bus.$on('globalMsg', msg=>{
      this.message = msg;
    })
  },
  computed: {
    classObject(){
      return {
        'primary-color' : !this.isLoggedIn,
        'gray-color' :  this.isLoggedIn
      }
    },
    isLoggedIn(){
      return getters.isLoggedIn;
    }
  },
  data(){
    return{
      message:''
    }
  },
  methods:{
    removeFollow(){
        var x = document.getElementById("customSnackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    },

  }
}
</script>

<style lang="scss">
    @import '@/styles/utils.scss';
    @import url('/assets/KoPubDotum.min.css');
    .app-container{
        @include flex-center();
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        right: 0;
        width: 100%;
        height: 100%;
        background: white;
    }
    .primary-color {
      background: #907AFF
    }
    .gray-color {
      background: #fafafa;
    }
    /* desktop, tablet */
  @media (min-width:450px) {
    .app-container{
        position: absolute;
        width: 450px;
        height: 700px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .gray-color{
      border: 1px solid lightgray;
    }
}
/* The snackbar - position it at the bottom and in the middle of the screen */
#customSnackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  width: 6rem;
  height: 6rem;
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  vertical-align: middle;
  border-radius: 100%; /* Rounded borders */
  padding: 0;
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  top: 50%; /* 30px from the bottom */
  left:50%;
  transform:translate(-50%, -50%);
  opacity: 0.8;
  div{
      width:100%;
      height: 100%;
    @include flex-center();
  }
  svg{
      color: white;
      width: 3.5rem;
      height: 3.5rem;
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
  from {bottom: 50%; opacity: 0;}
  to {bottom: 50%; opacity: 0.8;}
}

@keyframes fadein {
  from {bottom: 50%; opacity: 0;}
  to {bottom: 50%; opacity: 0.8;}
}

@-webkit-keyframes fadeout {
  from {bottom: 50%; opacity: 0.8;}
  to {bottom: 50%; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 50%; opacity: 0.8;}
  to {bottom: 50%; opacity: 0;}
}
</style>