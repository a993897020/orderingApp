// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui'
import Loading from 'muse-ui-loading'
import VueRouter from 'vue-router'
import axios from 'axios'
import Toast from 'muse-ui-toast'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import { routes } from './routes'
import { store } from './store/store'
import 'muse-ui-message/dist/muse-ui-message.css'
import Message from 'muse-ui-message';


const config={     //toast
  position:'start',
  time:1000,
  closeIcon:'close',
  close:true,
  successIcon:'check_circle',
  infoIcon:'info',
  warningIcon:'priority_high',
  errorIcon:'warning'
}
// axios.defaults.baseURL="https://mapp-7684e.firebaseio.com/"
Vue.prototype.http=axios
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Loading)
Vue.use(VueRouter)
Vue.use(Toast,config)
Vue.use(Message)



const router =new VueRouter({
  mode:'history',
  routes,
  linkActiveClass:"active",

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
