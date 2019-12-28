import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/user/Login.vue'
import Register from '@/components/user/Register.vue'
import ItemInsert from '@/components/item/ItemInsert.vue'
import ItemList from '@/components/item/ItemList.vue'
import ItemModify from '@/components/item/ItemModify.vue'
import ItemDetail from '@/components/item/ItemDetail.vue'
import FollowList from '@/components/follow/FollowList.vue'
import NotiList from '@/components/notification/NotiList.vue'
import More from '@/components/setting/More.vue'

Vue.use(VueRouter)

const routes = [
  // { path:'/', component:Login, name:'login', meta: {requiresAuth:true} },
  { path:'/', component:Login, name:'login' },
  { path:'/item/list/', component:ItemList, name:'itemList' },
  // { path:'/item/list/:userId', component:ItemList, name:'itemList' },
  { path:'/item/add', component:ItemInsert, name:'itemAdd' },
  { path:'/item/modify/:itemId', component:ItemModify, name:'itemModify' },
  { path:'/item/detail/:itemId', component:ItemDetail, name:'itemDetail' },
  { path:'/user/login', component:Login, name:'login' },
  { path:'/user/register', component:Register, name:'register' },    
  { path:'/follow/list', component:FollowList, name:'followList' },
  // { path:'/follow/list/:userId', component:FollowList, name:'followList' },
  { path:'/noti/list', component:NotiList, name:'notiList' },
  // { path:'/noti/list/:userId', component:NotiList, name:'notiList' },
  { path:'/more', component:More, name:'more' },
  // { path:'/more/:userId', component:More, name:'more' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
