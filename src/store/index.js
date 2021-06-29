import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cartList from './cartList/module.js';
import product from './product/module.js';
import login from './login/module.js';
import collection from './collection/module.js';
import history from './history/module.js';
import sort from './sort/module.js';
import userData from './userData/module.js';

export default new Vuex.Store({
	state: {
		isLoading: false,
	},
	mutations: {
		changeIsLoading(state, value) {
			state.isLoading = value;
		},
	},
	actions: {
		// 改变loading状态 传入回调函数
		async changeIsLoading({ commit, state: { isLoading } }, fn) {
			commit('changeIsLoading', true);

			await fn(isLoading);

			commit('changeIsLoading', false);
		},
	},
	getters: {},
	modules: {
		cartList,
		product,
		login,
		collection,
		history,
		sort,
		userData,
	},
});
