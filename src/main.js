import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import feather from 'vue-icon'
import io from 'socket.io-client'
/*배포용코드 - 도메인 부분을 VM의 public ip로 대체 가능*/
const socket = io('https://api-wish.codeplot.co.kr:3001'); //실제 서버 websocket 주소
Vue.prototype.$url = 'https://wish.codeplot.co.kr'; //실제 Front 도메인 주소
Vue.prototype.$api = 'https://api-wish.codeplot.co.kr';  //실제 REST API주소
/*END OF 배포코드 */

/*개발용코드*/
// Vue.prototype.$url = 'http://localhost:8080'; //개발용 webpack server 주소
// const socket = io('http://localhost:3001'); //개발용 서버 websocket 주소
// Vue.prototype.$api = 'http://localhost:3000';  //개발용 REST API주소
/*END OF 개발코드*/

Vue.config.productionTip = false

Vue.prototype.$http = axios; //axios 전역객체에 달기
Vue.prototype.$socket = socket; //웹소켓 전역객체에 달기
Vue.use(feather, 'v-icon');

//웹소켓이 연결되면, 서버로부터 socket의 id를 받고, 내 uid를 보낸다.
socket.on('sid', sid=>{
  store.dispatch('updateSid', sid);
});

store.dispatch('checkLogin');

//매 라우터 이동시 로그인체크를 한다.
router.beforeEach(async (to, from, next)=>{
  //이동하려는 곳이 인증을 필요하는지 체크
  if(to.matched.some(record => record.meta.requiresAuth)){
    //현재 로그인 상태라면 통과시킨다.
    if(store.getters.isLoggedIn){
        next();
      }else{
        next({name:'login'});
      }
      if(store.state.status == 'error'){
        next({name:'login'})
      }
  }else{ //인증을 필요하지 않는 곳이라면 그냥 통과시켜준다.
    next(); 
  }
});

const EventBus = new Vue();
Vue.prototype.$bus = EventBus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
