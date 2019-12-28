import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import io from 'socket.io-client'
// const socket = io('http://localhost:3001'); //개발용 서버 websocket 주소

Vue.config.productionTip = false

Vue.prototype.$http = axios; //axios 전역객체에 달기
// Vue.prototype.$socket = socket; //웹소켓 전역객체에 달기
Vue.prototype.$url = 'http://localhost:8080'; //개발용 webpack server 주소
Vue.prototype.$api = 'http://localhost:3000';  //개발용 REST API주소

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
