import Vue from 'vue';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue-lazyload';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/index.less';
import 'assets/css/resetVui.less';
import 'assets/css/base.css';
import 'assets/font/index.css';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(VueLazyLoad);

Vue.prototype.ste = () => {
	Vue.prototype.$toast('该功能还在开发中......');
};

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
