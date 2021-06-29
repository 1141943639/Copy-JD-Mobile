import { request } from '../index.js';
import { hasCookie } from 'common/cookieAPI.js';

if (!localStorage.getItem('cartStore')) {
	localStorage.setItem('cartStore', '[]');
}

if (!localStorage.getItem('temporaryCartList')) {
	localStorage.setItem('temporaryCartList', '[]');
}

// 模拟请求函数
async function makeRequest() {
	return await request('/updateCartList')
		.then((res) => res.json())
		.catch((e) => {
			throw new Error(e);
		});
}

/**
 * 模拟API
 */

// 获取cartList数据
export async function requestCartList() {
	await makeRequest();

	return getCartList();
}

// 添加商品
export async function addProduct(shopDetail, productDetail) {
	// 设置一些默认的选项
	productDetail = Object.assign(
		{
			selected: true,
		},
		productDetail
	);
	shopDetail = Object.assign(
		{
			selected: true,
			list: [productDetail],
		},
		shopDetail
	);

	const { cartList } = getCartList();

	const { proIndex } = findProductIndex(
		shopDetail.shopsIid,
		productDetail.productIid
	);
	const { shopIndex } = findShopIndex(shopDetail.shopsIid);

	// 判断一下购物车里是否有相同的商品
	if (proIndex) {
		// 有的或直接更新该商品的数据
		cartList[shopIndex].list[proIndex] = productDetail;
	} else if (shopIndex) {
		// 如果是有相同的商铺 就添加到商铺的列表下
		cartList[shopIndex].list.push(productDetail);
	} else {
		// 什么都没有就添加新的列表
		cartList.push(shopDetail);
	}

	return await updateCartList(cartList);
}

// 删除商品
export async function deleteProduct(shopIid, productIid) {
	const { cartList } = getCartList();
	const { shopIndex, proIndex } = findProductIndex(shopIid, productIid);

	cartList[shopIndex].list.splice(proIndex, 1);

	// 当前店铺下没有商品时 执行垃圾回收机制
	if (!cartList[shopIndex].list.length) {
		cartList.splice(shopIndex, 1);
	}

	return await updateCartList(cartList);
}

// 注册新用户的购物车列表
export async function registerNewCartList(username) {
	const cartStore = getCartStore();

	cartStore.push({
		username,
		cartList: [],
	});

	await updateCartStore(cartStore);

	return getCartList();
}

// 更新商品数据
export async function changeProductProperty(key, value, shopIid, productIid) {
	const { cartList } = getCartList();

	const { shopIndex, proIndex } = findProductIndex(shopIid, productIid);

	if (!shopIndex && !proIndex) {
		throw new Error('没有此商品');
	}

	cartList[shopIndex].list[proIndex][key] = value;

	return await updateCartList(cartList);
}

// 更新商家数据
export async function changeShopProperty(key, value, shopIid) {
	const { cartList } = getCartList();
	const { shopIndex } = findShopIndex(shopIid);

	cartList[shopIndex][key] = value;

	return await updateCartList(cartList);
}

export async function getProduct(shopIid, productIid) {
	await makeRequest();

	const { cartList } = getCartList();
	const { shopIndex, proIndex } = findProductIndex(shopIid, productIid);

	return cartList[shopIndex].list[proIndex];
}

/**
 * 以下是工具函数
 */

// 获取当前用户的cartList数据
function getCartList() {
	const username = getUsername();
	const cartStore = getCartStore();

	for (const index in cartStore) {
		const item = cartStore[index];

		if (item.username === username) {
			return {
				cartList: item.cartList,
				index,
			};
		}
	}

	const temporaryCartList = JSON.parse(
		localStorage.getItem('temporaryCartList')
	);

	// 未登录状态返回临时存储文件
	return {
		cartList: temporaryCartList,
		index: 0,
	};
}

// 获取cartStore的数据
function getCartStore() {
	return JSON.parse(localStorage.getItem('cartStore'));
}

function getTemporaryCartList() {
	return JSON.parse(localStorage.getItem('temporaryCartList'));
}

// 获取当前用户名
function getUsername() {
	return localStorage.getItem('username');
}

// 找到指定的商品数据
function findProductIndex(shopIid, productIid) {
	const { cartList } = getCartList();

	for (const shopIndex in cartList) {
		const shop = cartList[shopIndex];

		if (shop.shopsIid === shopIid) {
			for (const proIndex in shop.list) {
				const pro = shop.list[proIndex];

				if (pro.productIid === productIid) {
					return {
						shopIndex,
						proIndex,
					};
				}
			}
		}
	}

	return {};
}

// 找到指定的商家数据
function findShopIndex(shopIid) {
	const { cartList } = getCartList();

	for (const shopIndex in cartList) {
		const shop = cartList[shopIndex];

		if (shop.shopsIid === shopIid) {
			return {
				shopIndex,
				shop,
			};
		}
	}

	return {};
}

// 更新cartList的数据
async function updateCartList(cartList) {
	await makeRequest();

	// 未登录状态
	if (!hasCookie('isLogin')) {
		localStorage.setItem('temporaryCartList', JSON.stringify(cartList));
		return getCartList();
	}

	const cartStore = getCartStore();
	const { index } = getCartList();

	cartStore[index].cartList = cartList;

	localStorage.setItem('cartStore', JSON.stringify(cartStore));

	return getCartList();
}

// 更新cartStore数据
async function updateCartStore(cartStore) {
	await makeRequest();

	localStorage.setItem('cartStore', JSON.stringify(cartStore));

	return getCartStore();
}
