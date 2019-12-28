<template>
  <div id="app">
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
      }
  },
}
</script>

<style lang="scss">
    @import '@/styles/utils.scss';
    #app{
        @include flex-center();
        position: absolute;
        left: 0;
        top:0;
        bottom:0;
        right: 0;
        width: 100%;
        height: 100%;
        background: $primary-color;
    }
</style>