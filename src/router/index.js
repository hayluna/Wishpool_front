import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import ItemInsert from '@/components/item/ItemInsert.vue'
import ItemList from '@/components/item/ItemList.vue'
import OthersItemList from '@/components/item/OthersItemList.vue'
import ItemModify from '@/components/item/ItemModify.vue'
import ItemDetail from '@/components/item/ItemDetail.vue'
import OthersItemDetail from '@/components/item/OthersItemDetail.vue'
import FollowList from '@/components/follow/FollowList.vue'
import FollowSearch from '@/components/follow/FollowSearch.vue'
import FollowSearchList from '@/components/follow/FollowSearchList.vue'
import NotiList from '@/components/notification/NotiList.vue'
import More from '@/components/setting/More.vue'

Vue.use(VueRouter)

const routes = [
  // { path:'/', component:Login, name:'login', meta: {requiresAuth:true} },
  { path:'/', component:Login, name:'login' },
  { path:'/item/list/:userId', component:ItemList, name:'itemList', meta: { requiresAuth: true } },
  { path:'/item/othersList/:userId', component:OthersItemList, name:'othersItemList', meta: { requiresAuth: true } },
  { path:'/item/insert', component:ItemInsert, name:'itemInsert', meta: { requiresAuth: true } },
  { path:'/item/modify/:itemId', component:ItemModify, name:'itemModify', meta: { requiresAuth: true } },
  { path:'/item/detail/:itemId', component:ItemDetail, name:'itemDetail', meta: { requiresAuth: true } },
  { path:'/item/othersDetail/:itemId', component:OthersItemDetail, name:'othersItemDetail', meta: { requiresAuth: true } },
  // { path:'/user/login', component:Login, name:'login' },
  { path:'/user/register', component:Register, name:'register' },    
  { path:'/follow/list/:userId', component:FollowList, name:'followList', meta: { requiresAuth: true } },
  { path:'/follow/search/:userId', component:FollowSearch, name:'followSearch', meta: { requiresAuth: true } },
  { path:'/follow/searchList', component:FollowSearchList, name:'followSearchList', meta: { requiresAuth: true } },
  { path:'/noti/list/:userId', component:NotiList, name:'notiList', meta: { requiresAuth: true } },
  { path:'/more/:userId', component:More, name:'more', meta: { requiresAuth: true } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next)=> {
  store.commit('startLoading');
  next();
})
export default router
