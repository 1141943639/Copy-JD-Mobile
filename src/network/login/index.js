import { request } from '../index.js';
import {
	hasCookie,
	removeCookie,
	setCookie,
	getCookie,
} from 'common/cookieAPI.js';

// 模拟请求函数
async function makeRequest() {
	return await request('/updateLogin')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟API
 */
export async function requestLogin() {
	return getIsLogin();
}

export async function login(username) {
	await makeRequest();

	setLogin('true');

	setUsername(username);

	return getIsLogin();
}

// 删除完后需要reload
export async function logout() {
	await makeRequest();

	removeLogin();

	setUsername('');

	return getIsLogin();
}

/**
 * 工具函数
 */

function getIsLogin() {
	return getCookie('isLogin');
}

function setLogin(value) {
	setCookie('isLogin', value, 99999);
}

function removeLogin() {
	removeCookie('isLogin');
}

function setUsername(username) {
	localStorage.setItem('username', username);
}
