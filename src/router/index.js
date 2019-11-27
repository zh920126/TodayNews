// 引入vue
import Vue from 'vue'

// 引入vur-router
import VueRouter from 'vue-router'

// 引入单文件组件
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Personal from '@/views/personalCenter.vue'
import Editprofile from '@/views/edit_profile.vue'
import Index from '@/views/index.vue'
import editDetail from '@/views/editDetail.vue'
import Myfocus from '@/views/myfocus.vue'
import Mystar from '@/views/mystar.vue'
import Comments from '@/views/comments.vue'
import Search from '@/views/search.vue'

// 使用vuerouter插件
Vue.use(VueRouter)

// 创建路由实例
let router = new VueRouter({
  // 创建路由信息
  routes: [
    // 创建详细路由信息
    {
      path: '/',
      redirect: { path: '/index' }
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'Editprofile',
      path: '/editprofile/:id',
      component: Editprofile
    },
    {
      name: 'editDetail',
      path: '/editDetail/:id',
      component: editDetail
    },
    {
      name: 'Myfocus',
      path: '/myfocus',
      component: Myfocus
    },
    {
      name: 'Mystar',
      path: '/mystar',
      component: Mystar
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    }
  ]
})

// 5. 添加路由导航的前置守卫
// to:跳转的目的地路由
// from:从那里来
// next:继续管道中下一个操作--钩子
router.beforeEach((to, from, next) => {
  // 当你访问一些需要授权的页面时，判断是否有登陆的标识，如果有，就继续访问，否则就重定向到登陆页
  // 所有路由跳转都会经过这个守卫
  // console.log(to)
  // console.log(from)
  if (to.path.indexOf(`/personal/`) === 0) {
    let token = localStorage.getItem('heima_39_Authorization')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// 向外暴露
export default router
