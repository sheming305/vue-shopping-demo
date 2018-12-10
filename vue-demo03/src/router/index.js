import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import scroll from 'vue-seamless-scroll'
import VueWechatTitle from 'vue-wechat-title'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import index from '@/components/index'
import Goods from '@/components/details/goods'
import Ratings from '@/components/details/ratings'
import Seller from '@/components/details/seller'

Vue.use(Router)
Vue.use(Mint)
Vue.use(VueWechatTitle)
Vue.use(scroll)
Vue.prototype.$http = axios
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: 'Goods',
      children: [
      	{
	      path: 'Goods',
	      name: 'Goods',
	      component: Goods,
        meta: {
          title: '首页'
        }
    	},
     	{
	      path: 'Ratings',
	      name: 'Ratings',
	      component: Ratings,
         meta: {
          title: '评价页'
        }
    	},
     	{
	      path: 'Seller',
	      name: 'Seller',
	      component: Seller,
         meta: {
          title: '详情页'
        }
    	}
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
// router.beforeEach((to, from, next) => {
//   var userInfo= JSON.parse(sessionStorage.getItem('userInfoStorage'));//获取浏览器缓存的用户信息
//   if(userInfo){//如果有就直接到首页咯
//     next();
//   }else{
//     if(to.path=='/login'){//如果是登录页面路径，就直接next()
//       next();
//     }else{//不然就跳转到登录；
//       next('/login');
//     }

//   }
// });
