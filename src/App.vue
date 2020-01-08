<template>
  <div id="app" class="app-container" :class="classObject">
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
    }
    .primary-color {
      background: #907AFF
    }
    .gray-color {
      background: #FAFAFA
    }
</style>