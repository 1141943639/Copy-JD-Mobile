import { request } from '../index.js';
import { hasCookie, removeCookie } from 'common/cookieAPI.js';

if (!localStorage.getItem('userStore')) {
	localStorage.setItem('userStore', '[]');

	if (hasCookie('isLogin')) {
		removeCookie('isLogin');
	}
}

// 模拟请求函数
async function makeRequest() {
	return await request('/updateUserData')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟API
 */

export async function requestUserData() {
	await makeRequest();

	return {
		userStore: getUserStore(),
		userList: getUserList(),
	};
}

export async function registerUser(newUserList) {
	const userStore = getUserStore();

	userStore.push(
		Object.assign(
			{
				nickname: `京东用户${userStore.length}`,
			},
			newUserList
		)
	);

	await updateUserStore(userStore);

	return getUserList(newUserList.username);
}

/**
 * 工具函数
 */

function getUserList(username = getUsername()) {
	const userStore = getUserStore();

	return userStore.find((item) => item.username === username) || [];
}

function getUserStore() {
	return JSON.parse(localStorage.getItem('userStore'));
}

function getUsername() {
	return localStorage.getItem('username');
}

async function updateUserStore(newUserStore) {
	await makeRequest();

	localStorage.setItem('userStore', JSON.stringify(newUserStore));

	return getUserList();
}
