import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
window.eventHub = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
