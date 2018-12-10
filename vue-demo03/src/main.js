import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import Fastclick from 'fastclick'
import 'common/style'

Vue.use(VueLazyload)
Fastclick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/img-lazy/default.png',
  loading: './assets/img-lazy/loading.png',
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
