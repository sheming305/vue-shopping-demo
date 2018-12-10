import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/stylus/index.scss'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
Vue.use(Mint)
Vue.prototype.$axios = axios


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
	
});



