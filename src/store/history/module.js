import {
	requestHistory,
	addHistory,
	registerNewHistory,
} from 'network/history/index.js';

export default {
	namespaced: true,

	state() {
		return {
			history: [],
		};
	},
	mutations: {
		// 更新本地的history
		updateHistory(state, newHistory) {
			state.history = newHistory;
		},
	},
	actions: {
		async requestHistory({ commit }) {
			const { history } = await requestHistory();

			commit('updateHistory', history);
		},

		async registerNewHistory({ commit }, [username]) {
			const { history } = await registerNewHistory(username);

			commit('updateHistory', history);
		},

		// 添加历史记录
		async addHistory({ commit }, newHistory) {
			const history = await addHistory(newHistory);

			return;

			commit('updateHistory', history);
		},
	},
	getters: {
		historyLength({ history }) {
			return history.length;
		},
	},
};
