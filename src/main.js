import Vue from 'vue';
import App from './App';

require('es6-promise').polyfill();

Vue.config.productionTip = false;
window.eventHub = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
