import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/images/default.png',
  loading: 'assets/images/loading.png',
  attempt: 1
})

new Vue({	
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

