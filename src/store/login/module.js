import { login, logout, requestLogin } from 'network/login/index.js';

export default {
	namespaced: true,

	state() {
		return {
			isLogin: false,
		};
	},
	mutations: {
		updateIsLogin(state, value) {
			state.isLogin = value;
		},
	},
	actions: {
		// 请求isLogin信息
		async requestLogin({ commit }) {
			commit('updateIsLogin', await requestLogin());
		},

		// 注册
		async register({ dispatch }, newUserList) {
			// 注册购物车，历史记录什么的

			await dispatch('userData/registerNewUser', newUserList, {
				root: true,
			});

			await dispatch(
				'cartList/registerCartList',
				[newUserList.username],
				{
					root: true,
				}
			);

			await dispatch(
				'collection/registerNewCollection',
				[newUserList.username],
				{
					root: true,
				}
			);

			await dispatch(
				'history/registerNewHistory',
				[newUserList.username],
				{
					root: true,
				}
			);

			// 注册完后立刻登录
			await dispatch('login', newUserList.username);
		},

		// 登录
		async login({ commit, dispatch }, username) {
			await dispatch(
				'changeIsLoading',
				async () => {
					commit('updateIsLogin', await login(username));
				},
				{ root: true }
			);
		},

		// 登出
		async logout({ commit, dispatch }) {
			await dispatch(
				'changeIsLoading',
				async () => {
					commit('updateIsLogin', await logout());
				},
				{ root: true }
			);
		},
	},
	getters: {
		// 检查是否有重复的属性
		checkHasRepeat(state, getters, { userData: { userStore } }) {
			return (key, value) => {
				return userStore.some((item) => {
					return item[key] === value;
				});
			};
		},

		// 检查是否没有重读的属性
		checkHasNoRepeat(state, getters, { userData: { userStore } }) {
			return (key, value) => {
				return userStore.every((item) => item[key] !== value);
			};
		},

		// 登录的密码检测
		checkPassword(state, getters, { userData: { userStore } }) {
			return (username, password) => {
				return userStore.some((item) => {
					if (item.username === username) {
						return item.password === password;
					}
				});
			};
		},
	},
};
