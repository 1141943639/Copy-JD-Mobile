import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from 'views/Home/Home.vue';
import Sort from 'views/Sort/Sort.vue';
import Cart from 'views/Cart/Cart.vue';
import Profile from 'views/Profile/Profile.vue';
import Product from 'views/Product/Product.vue';
import Login from 'views/Login/Login.vue';
import Register from 'views/Register/Register.vue';

import { hasCookie } from 'common/cookieAPI.js';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: '京东首页',
		},
	},
	{
		path: '/sort',
		name: 'Sort',
		component: Sort,
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: {
			verifyLogin: true,
		},
	},
	{
		path: '/product/:iid',
		name: 'Product',
		component: Product,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || '京东超市';

	// 路由跳转时的登录验证
	if (to.meta.verifyLogin) {
		if (hasCookie('isLogin')) {
			next();
		} else {
			next({
				name: 'Login',
			});
		}
	}

	next();
});

// 防止路由连续点击两次的报错
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	// 加上catch捕捉错误就不会报错
	return originPush.call(this, location).catch((err) => err);
};

export default router;
