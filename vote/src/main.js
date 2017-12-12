// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/my.css'
import './style/weui.css'
import axios from 'axios'
import md5 from './util/md5.js'
import weui from 'weui.js';
import {u} from './util/util.js'
import wx from 'weixin-js-sdk';

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

Vue.prototype.$http = axios;
//Vue.prototype.$URL='http://wang123.natapp1.cc/';
Vue.prototype.$URL='https://dev.bchltech.cn/';
Vue.prototype.$AC_ID=10;
Vue.prototype.$md5=md5;
Vue.prototype.$weui=weui;
Vue.prototype.$u=u;
Vue.prototype.$wx=wx;

import './util/rem.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
