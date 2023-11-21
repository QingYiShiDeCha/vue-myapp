import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'

import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: SignUp },
  {
    path: '/main', name: 'main', component: Main, redirect: '/home',  children:
    [
      { path: '/home', name: 'home', component: Home },
      { path: '/user', name: 'user', component: User },
      { path: '/mall', name: 'mall', component: Mall },
      { path: '/pageone', name: 'pageone', component: PageOne },
      { path: '/pagetwo', name: 'pagetwo', component: PageTwo }
    ]
  }
]




const router = new VueRouter({
  routes
})

export default router




// const routes = [
//   {
//     path: '/',
//     name: 'login',
//     component: Login,
//     redirect: '/login',  // 重定向
//   },
//   {
//     path: '/signup',
//     name: 'signup',
//     component: SignUp
//   },
//   {
//     path: '/main',
//     name: 'main',
//     component: Main,
//     redirect: '/home',  // 重定向
//     children: [
//       { path: 'home', name: 'home', component: Home },
//       { path: 'user', name: 'user', component: User },
//       { path: 'mall', name: 'mall', component: Mall },
//       { path: 'page1', name: 'page1', component: PageOne },
//       { path: 'page2', name: 'page2', component: PageTwo }
//     ]
//   }
// ]