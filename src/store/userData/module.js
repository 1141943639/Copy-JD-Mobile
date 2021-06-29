import { registerUser, requestUserData } from 'network/userList/index.js';

export default {
	namespaced: true,

	state() {
		return {
			userList: [],
			userStore: [],
		};
	},

	mutations: {
		updateUserList(state, newUserList) {
			state.userList = newUserList;
		},

		updateUserStore(state, newUserStore) {
			state.userStore = newUserStore;
		},
	},

	actions: {
		// 初始化请求
		async requestUserData({ commit }) {
			const { userStore, userList } = await requestUserData();

			commit('updateUserList', userList);
			commit('updateUserStore', userStore);
		},

		// 注册新的user信息
		async registerNewUser({ commit }, newUserList) {
			const userList = await registerUser(newUserList);

			console.log(userList);

			commit('updateUserList', userList);
		},
	},
};
