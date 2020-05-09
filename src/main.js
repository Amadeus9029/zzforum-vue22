import Vue from 'vue'
import App from './App'
import router from './router/routers'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import './router' // permission control
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(ElementUI)
Vue.use(CKEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
