<template>
  <div id="app" class="app-container" :class="classObject">
    <page-template />
    <custom-snackbar/>
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
    this.$socket.on('noti-fired', payload=>{
      dispatch('fetchNotiList');
      this.$bus.$emit('globalMsg', payload);
    });
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
        width: 380px;
        height: 650px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .gray-color{
      border: 1px solid lightgray;
    }
    ::-webkit-scrollbar {
      width: 5px;
      visibility: hidden;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
}

</style>