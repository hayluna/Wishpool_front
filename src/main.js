import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import feather from 'vue-icon'
import io from 'socket.io-client'
const socket = io('http://localhost:3001'); //개발용 서버 websocket 주소

Vue.config.productionTip = false

Vue.prototype.$http = axios; //axios 전역객체에 달기
Vue.prototype.$socket = socket; //웹소켓 전역객체에 달기
Vue.prototype.$url = 'http://localhost:8080'; //개발용 webpack server 주소
Vue.prototype.$api = 'http://localhost:3000';  //개발용 REST API주소

Vue.use(feather, 'v-icon');

//웹소켓이 연결되면, 서버로부터 socket의 id를 받고, 내 uid를 보낸다.
socket.on('sid', sid=>{
  store.dispatch('updateSid', sid);
});

//처음시작할 때 로그인 체크를 한다.
store.dispatch('checkLogin');
//매 라우터 이동시 로그인체크를 한다.
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
      if(store.getters.isLoggedIn){
          next();
          return;
      }
      alert('로그인을 해주세요');
      next('/');
  }else{
      next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
