import { request } from '../index.js';
import { hasCookie } from 'common/cookieAPI.js';

// 模拟请求函数
async function makeRequest() {
	return await request('/updateProfile')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟API
 */

export async function requestProfile() {
	await makeRequest();

	return getUserList();
}

/**
 * 工具函数
 */

function getUserList() {
	return localStorage.getItem('userList');
}
