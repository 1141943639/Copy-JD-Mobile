export default {
	namespaced: true,

	state() {
		return {
			selectedSkuComb: {},
			selectedNum: 1,
			productIid: NaN,
			topSwipe: [],
			price: {},
			title: {},
			coupon: {},
			skuData: {},
			address: {},
			serviceArea: [],
			shop: {},
			showSku: false,
		};
	},
	mutations: {
		updateSelectedSkuComb(state, newValue) {
			state.selectedSkuComb = newValue;
		},
		updateSelectedNum(state, newValue) {
			state.selectedNum = newValue;
		},
		changeShowSku(state, value) {
			state.showSku = value;
		},

		changeProperty(state, [key, value]) {
			state[key] = value;
		},

		addState(state, newValue) {
			for (const prop in newValue) {
				state[prop] = newValue[prop];
			}
		},
	},
	actions: {
		findSelectedImage({ state: { selectedSkuComb, skuData } }) {
			const obj = selectedSkuComb;

			if (!obj) return;

			const key = Object.keys(obj).filter((item) => item === 's1')[0];
			const value = obj[key];

			for (const prop of skuData.sku.tree) {
				if (String(prop.k_s) === key) {
					for (const v of prop.v) {
						if (v.id === value) {
							return v.previewImgUrl;
						}
					}
				}
			}
		},
	},
	getters: {
		getSelectedImage({ selectedSkuComb: { s1 }, skuData }) {
			if (!Object.keys(skuData).length) return;

			const value = skuData.sku.tree[0].v;

			for (const item of value) {
				if (item.id === s1) {
					return item.previewImgUrl;
				}
			}
		},
	},
};
