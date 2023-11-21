import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false


// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  // const token = Cookie.get('token')
  const token = localStorage.getItem('token')
  // 如果token不存在,说明用户未登录，应该跳转到登录页
  if (!token && to.name !== 'login' && to.name !== 'signup') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') { // 如果token存在,说名用户登录，此时跳转首页
    next({ name: 'home' })
  } else if (to.name === 'signup') {
    next()
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
