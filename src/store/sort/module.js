import { requestSortList } from 'network/sort';

export default {
	namespaced: true,

	state() {
		return {
			sortList: [],
			activeKey: 0,
		};
	},

	mutations: {
		updateSortList(state, newSortList) {
			state.sortList = newSortList;
		},

		updateActiveKey(state, newKey) {
			state.activeKey = newKey;
		},
	},

	actions: {
		async requestSortList({ commit }) {
			const { data } = await requestSortList();

			commit('updateSortList', data);
		},
	},

	getters: {},
};
