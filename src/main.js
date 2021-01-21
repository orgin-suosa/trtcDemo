import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TRTC from 'trtc-js-sdk';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



window.TRTC = TRTC
Vue.config.productionTip = false
Vue.prototype.TRTC = TRTC
Vue.use(ElementUI)
Vue.prototype.$message=ElementUI.Message;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
