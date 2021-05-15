import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {http} from '@/utils/http.js'
import store from './store'
import vuetify from './plugins/vuetify';
import "./plugins/vuetify-money.js" 
import "@/assets/style/main.scss"

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
