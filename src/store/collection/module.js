import {
	requestCollection,
	addProductCollection,
	addShopCollection,
	registerNewCollection,
	removeProductCollection,
} from 'network/collection/index.js';

export default {
	namespaced: true,

	state() {
		return {
			productCollection: [],
			shopCollection: [],
		};
	},
	mutations: {
		updateProductCollection(state, newCollection) {
			state.productCollection = newCollection;
		},

		updateShopCollection(state, newCollection) {
			state.shopCollection = newCollection;
		},
	},
	actions: {
		async requestCollection({ commit }) {
			const {
				shopCollection,
				productCollection,
			} = await requestCollection();

			commit('updateProductCollection', productCollection);

			commit('updateShopCollection', shopCollection);
		},

		async addProductCollection({ commit }, newProductCollection) {
			const { productCollection } = await addProductCollection(
				newProductCollection
			);

			commit('updateProductCollection', productCollection);
		},

		async removeProductCollection({ commit }, proIid) {
			const { productCollection } = await removeProductCollection(proIid);

			commit('updateProductCollection', productCollection);
		},

		async registerNewCollection({ commit }, [username]) {
			const {
				shopCollection,
				productCollection,
			} = await registerNewCollection(username);

			commit('updateProductCollection', productCollection);

			commit('updateShopCollection', shopCollection);
		},
	},
	getters: {
		shopCollectionLength({ shopCollection }) {
			return shopCollection.length;
		},

		productCollectionLength({ productCollection }) {
			return productCollection.length;
		},

		hasProductCollection({ productCollection }) {
			return (proIid) => {
				for (const pro of productCollection) {
					if (Number(pro.productIid) === Number(proIid)) {
						return true;
					}
				}

				return false;
			};
		},
	},
};
