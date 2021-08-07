import {
	addProduct,
	requestCartList,
	changeProductProperty,
	changeShopProperty,
	deleteProduct,
	registerNewCartList,
} from 'network/cartList/index.js';

export default {
	namespaced: true,

	state() {
		return {
			cartList: [],
			productNum: 0,
			index: '',
			skuShow: false,
			skuDetail: {},
		};
	},
	mutations: {
		updateCartList(state, cartList) {
			state.cartList = cartList;
		},

		setProperty(state, [key, value]) {
			state[key] = value;
		},
	},
	actions: {
		async registerCartList({ commit }, [username]) {
			const { cartList } = await registerNewCartList(username);

			commit('updateCartList', cartList);
		},

		// 添加商品
		async addProduct({
			commit,
			dispatch,
			rootState: {
				product: {
					selectedSkuComb,
					skuData,
					productIid,
					title,
					selectedNum,
					shop,
				},
			},
		}) {
			await dispatch(
				'changeIsLoading',
				async () => {
					const { cartList } = await addProduct(shop, {
						selectedSkuComb,
						skuData,
						productIid,
						title,
						selectedNum,
					});

					commit('updateCartList', cartList);
				},
				{ root: true }
			);
		},

		// 删除商品
		async deleteProduct({ commit, dispatch }, [shopIid, productIid]) {
			await dispatch(
				'changeIsLoading',
				async () => {
					const { cartList } = await deleteProduct(
						shopIid,
						productIid
					);

					commit('updateCartList', cartList);
				},
				{ root: true }
			);
		},

		// 更改商品数据
		async changeProductProperty(
			{ commit, dispatch },
			[key, value, shopIid, productIid]
		) {
			await dispatch(
				'changeIsLoading',
				async () => {
					const { cartList } = await changeProductProperty(
						key,
						value,
						shopIid,
						productIid
					);

					commit('updateCartList', cartList);
				},
				{ root: true }
			);
		},

		// 更改店铺数据
		async changeShopProperty({ commit }, [key, value, shopIid]) {
			const { cartList } = await changeShopProperty(key, value, shopIid);

			commit('updateCartList', cartList);
		},

		// 请求购物车数据
		async requestCartList({ commit, dispatch }) {
			let cartList = [];

			await dispatch(
				'changeIsLoading',
				async () => {
					cartList = (await requestCartList()).cartList;
				},
				{ root: true }
			);

			commit('updateCartList', cartList);
		},

		// 打开购物车商品sku弹窗
		changeSkuDetail({ commit, getters }, [shopIid, proIid] = []) {
			const {
				shop,
				pro: { skuData, productIid, selectedSkuComb },
			} = getters.getProduct(shopIid, proIid);

			commit('setProperty', [
				'skuDetail',
				{
					skuData,
					productIid,
					selectedSkuComb,
					shopIid: shop.shopsIid,
				},
			]);
		},

		// 更改商铺的选中
		async changeShopSelected(
			{ commit, dispatch, getters },
			[shopIid, value]
		) {
			await dispatch(
				'changeIsLoading',
				async () => {
					await dispatch('changeShopProperty', [
						'selected',
						value,
						shopIid,
					]);

					const { shop } = getters.getShop(shopIid);

					// 根据商铺的选择 全选或者取消子商品
					for (const pro of shop.list) {
						pro.selected = shop.selected;
					}

					const { cartList } = await changeShopProperty(
						'list',
						shop.list,
						shopIid
					);

					commit('updateCartList', cartList);
				},
				{ root: true }
			);
		},

		// 更改商品的选中
		async changeProductSelected(
			{ commit, dispatch, getters },
			[shopIid, productIid, value]
		) {
			await dispatch(
				'changeIsLoading',
				async () => {
					let cartList = [];

					cartList = (
						await changeProductProperty(
							'selected',
							value,
							shopIid,
							productIid
						)
					).cartList;

					// 如果此商品是商铺内的第一个商品 将商品的选中变为true
					if (
						getters.productHasAllSelected(
							shopIid,
							getters.getShop(shopIid, cartList).shop
						)
					) {
						cartList = (
							await changeShopProperty('selected', true, shopIid)
						).cartList;
					}

					// 如果商铺内没有选中的商品 将商品的选中变为false
					if (
						getters.productHasNotSelected(
							shopIid,
							getters.getShop(shopIid, cartList).shop
						)
					) {
						cartList = (
							await changeShopProperty('selected', false, shopIid)
						).cartList;
					}

					commit('updateCartList', cartList);
				},
				{ root: true }
			);
		},

		// 全选
		async checkAll({ dispatch, getters, state: { cartList } }) {
			for (const shop of cartList) {
				await dispatch('changeShopSelected', [
					shop.shopsIid,
					!getters.isCheckAll,
				]);
			}
		},
	},
	getters: {
		isCheckAll({ cartList }) {
			if (!cartList || !cartList.length) return false;

			return cartList.every(({ list }) =>
				list.every(({ selected }) => selected)
			);
		},

		productTotal({ cartList }) {
			if (!cartList || !cartList.length) return 0;

			return cartList.reduce((num, { list }) => {
				return list.reduce(
					(
						num,
						{ selected, selectedSkuComb: { price }, selectedNum }
					) => {
						if (selected) return num + Number(price) * selectedNum;

						return num;
					},
					0
				);
			}, 0);
		},

		getProductNumber({ cartList }) {
			return cartList.reduce((num, { list }) => {
				return (
					num +
					list.reduce((num, { selected }) => {
						return num + 1;
					}, 0)
				);
			}, 0);
		},

		getProduct({ cartList }) {
			return (shopIid, proIid) => {
				for (const shopIndex in cartList) {
					const shop = cartList[shopIndex];

					if (shop.shopsIid === shopIid) {
						for (const proIndex in shop.list) {
							const pro = shop.list[proIndex];

							if (pro.productIid === proIid) {
								return {
									shopIndex,
									shop,
									proIndex,
									pro,
								};
							}
						}
					}
				}

				return {};
			};
		},

		getShop({ cartList }) {
			return (shopIid, otherList = cartList) => {
				for (const shopIndex in otherList) {
					const shop = otherList[shopIndex];

					if (shop.shopsIid === shopIid) {
						return {
							shopIndex,
							shop,
						};
					}
				}

				return {};
			};
		},

		productHasAllSelected(state, getters) {
			return (shopIid, shop = getters.getShop(shopIid).shop) => {
				return shop.list.every(({ selected }) => selected);
			};
		},

		productHasNotSelected(state, getters) {
			return (shopIid, shop = getters.getShop(shopIid).shop) => {
				return shop.list.every(({ selected }) => !selected);
			};
		},
	},
};
