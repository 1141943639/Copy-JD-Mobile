import { hasCookie } from 'common/cookieAPI';
import { request } from '../index.js';

if (!JSON.parse(localStorage.getItem('collectionStore'))) {
	localStorage.setItem('collectionStore', '[]');
}

if (!JSON.parse(localStorage.getItem('temporaryCollection'))) {
	localStorage.setItem(
		'temporaryCollection',
		JSON.stringify([
			{
				shopCollection: [],
				productCollection: [],
			},
		])
	);
}

// 模拟请求函数
async function makeRequest() {
	return await request('/updateCollection')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟请求API
 */

export async function requestCollection() {
	await makeRequest();

	const { shopCollection } = getShopCollection();

	const { productCollection } = getProductCollection();

	return {
		shopCollection,
		productCollection,
	};
}

export async function addProductCollection(detail) {
	const { productCollection } = getProductCollection();

	productCollection.push(detail);

	return await updateProductCollection(productCollection);
}

export async function addShopCollection(detail) {
	const { shopCollection } = getShopCollection();

	shopCollection.push(detail);

	return await updateShopCollection(shopCollection);
}

export async function removeProductCollection(proIid) {
	const index = getProductIndex(proIid);
	const { productCollection } = getProductCollection();

	productCollection.splice(index, 1);

	return await updateProductCollection(productCollection);
}

export async function registerNewCollection(username) {
	const collectionStore = getCollectionStore();

	collectionStore.push({
		username,
		shopCollection: [],
		productCollection: [],
	});

	return await updateCollectionStore(collectionStore);
}

/**
 * 工具函数
 */

function getProductCollection() {
	const username = getUsername();
	const collectionStore = getCollectionStore();

	for (const index in collectionStore) {
		const collection = collectionStore[index];

		if (collection.username === username) {
			return {
				productCollection: collection.productCollection,
				index,
			};
		}
	}

	const temporaryProductCollection = getTemporaryCollection()[0]
		.productCollection;

	return {
		productCollection: temporaryProductCollection,
		index: 0,
	};
}

function getShopCollection() {
	const username = getUsername();
	const collectionStore = getCollectionStore();

	for (const index in collectionStore) {
		const collection = collectionStore[index];

		if (collectionStore.username === username) {
			return {
				shopCollection: collection.shopCollection,
				index,
			};
		}
	}

	const temporaryShopCollection = JSON.parse(
		localStorage.getItem('temporaryCollection')
	)[0].shopCollection;

	return {
		shopCollection: temporaryShopCollection,
		index: 0,
	};
}

function getCollectionStore() {
	return JSON.parse(localStorage.getItem('collectionStore'));
}

function getTemporaryCollection() {
	return JSON.parse(localStorage.getItem('temporaryCollection'));
}

function getUsername() {
	return localStorage.getItem('username');
}

function getProductIndex(proIid) {
	const collection = getCollectionStore();

	for (const proIndex in collection) {
		const pro = collection[proIndex];

		if (Number(pro.productIid) === Number(proIid)) {
			return proIndex;
		}
	}

	return false;
}

async function updateProductCollection(newCollection) {
	await makeRequest();

	const { index } = getProductCollection();
	const collectionStore = hasCookie('isLogin')
		? getCollectionStore()
		: getTemporaryCollection();

	collectionStore[index].productCollection = newCollection;

	if (hasCookie('isLogin')) {
		localStorage.setItem(
			'collectionStore',
			JSON.stringify(collectionStore)
		);
	} else {
		localStorage.setItem(
			'temporaryCollection',
			JSON.stringify(collectionStore)
		);
	}

	return getProductCollection();
}

async function updateShopCollection(newCollection) {
	await makeRequest();

	const { index } = getShopCollection();
	const collectionStore = hasCookie('isLogin')
		? getCollectionStore()
		: getTemporaryCollection();

	collectionStore[index].shopCollection = newCollection;

	if (!hasCookie('isLogin')) {
		localStorage.setItem(
			'collectionStore',
			JSON.stringify(collectionStore)
		);
	} else {
		localStorage.setItem(
			'temporaryCollection',
			JSON.stringify(collectionStore)
		);
	}

	return getShopCollection();
}

async function updateCollectionStore(newCollectionStore) {
	await makeRequest();

	localStorage.setItem('collectionStore', JSON.stringify(newCollectionStore));

	return {
		shopCollection: getShopCollection().shopCollection,
		productCollection: getProductCollection().productCollection,
	};
}
