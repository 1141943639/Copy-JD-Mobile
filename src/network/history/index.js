import { request } from '../index.js';
import { hasCookie } from 'common/cookieAPI.js';

if (!localStorage.getItem('historyStore')) {
	localStorage.setItem('historyStore', '[]');
}

if (!localStorage.getItem('temporaryHistory')) {
	localStorage.setItem(
		'temporaryHistory',
		JSON.stringify([
			{
				history: [],
			},
		])
	);
}

// 模拟请求函数
async function makeRequest() {
	return await request('/updateHistory')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟请求API
 */

// 请求history数据
export async function requestHistory() {
	await makeRequest();

	return getHistory();
}

// 添加history数据
export async function addHistory(newHistory) {
	let { history } = getHistory();

	if (checkHasRepeat(newHistory.productIid)) {
		const res = await removeHistory(newHistory.productIid);

		history = res.history;
	}

	history.unshift(newHistory);

	return await updateHistory(history);
}

// 删除history数据
export async function removeHistory(proIid) {
	const { history } = getHistory();
	const { proIndex } = getProductIndex(proIid);

	history.splice(proIndex, 1);

	return await updateHistory(history);
}

export async function registerNewHistory(username) {
	const historyStore = getHistoryStore();

	historyStore.push({
		username,
		history: [],
	});

	return await updateHistoryStore(historyStore);
}

/**
 * 工具函数
 */

function getHistory() {
	const username = getUsername();
	const historyStore = getHistoryStore();

	for (const historyIndex in historyStore) {
		const history = historyStore[historyIndex];

		if (history.username === username) {
			return {
				history: history.history,
				historyIndex,
			};
		}
	}

	const temporaryHistory = JSON.parse(
		localStorage.getItem('temporaryHistory')
	);

	return {
		history: temporaryHistory[0].history,
		historyIndex: 0,
	};
}

function getHistoryStore() {
	return JSON.parse(localStorage.getItem('historyStore'));
}

function getTemporaryHistory() {
	return JSON.parse(localStorage.getItem('temporaryHistory'));
}

function getUsername() {
	return localStorage.getItem('username');
}

function checkHasRepeat(proIid) {
	const { history } = getHistory();

	for (const proIndex in history) {
		const pro = history[proIndex];

		if (Number(pro.productIid) === Number(proIid)) {
			return {
				pro,
				proIndex,
			};
		}
	}

	return false;
}

function getProductIndex(proIid) {
	const { history } = getHistory();

	for (const proIndex in history) {
		const pro = history[proIndex];

		if (Number(pro.productIid) === Number(proIid)) {
			return {
				pro,
				proIndex,
			};
		}
	}

	return {};
}

async function updateHistory(newHistory) {
	await makeRequest();

	if (!hasCookie('isLogin')) {
		const temporaryHistory = getTemporaryHistory();

		temporaryHistory[0].history = newHistory;

		localStorage.setItem(
			'temporaryHistory',
			JSON.stringify(temporaryHistory)
		);

		return getHistory();
	}

	const historyStore = getHistoryStore();
	const { historyIndex } = getHistory();

	historyStore[historyIndex].history = newHistory;

	localStorage.setItem('historyStore', JSON.stringify(historyStore));

	return getHistory();
}

async function updateHistoryStore(newHistoryStore) {
	await makeRequest();

	localStorage.setItem('historyStore', JSON.stringify(newHistoryStore));

	return getHistory();
}
