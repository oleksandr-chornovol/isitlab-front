import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import wysiwyg from "vue-wysiwyg";

Vue.use(VueRouter)
Vue.use(wysiwyg)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://127.0.0.1/api'
Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
