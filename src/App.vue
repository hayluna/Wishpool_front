<template>
  <div id="app" class="container" :class="classObject">
    <page-template />
  </div>
</template>
<script>
import PageTemplate from './components/PageTemplate.vue';

export default {
  name: 'App',
  components:{
    'page-template': PageTemplate,
  },
  data(){
      return{
        isLoggedIn: false,
      }
  },
  computed: {
    classObject(){
      return {
        'primary-color' : !this.isLoggedIn,
        'gray-color' :  this.isLoggedIn
      }
    }
  }

}
</script>

<style lang="scss">
    @import '@/styles/utils.scss';
    .container{
        @include flex-center();
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        right: 0;
        width: 100%;
        height: 100%;
<<<<<<< HEAD
        background: $sky-gray;
=======
    }
    .primary-color {
      background: #907AFF
    }
    .gray-color {
      background: #FAFAFA
>>>>>>> 07f7fc9b0c40cc7b9d584018c94aac3cce279236
    }
</style>