import Vue from 'vue';
import VueRouter from 'vue-router';
import { hasCookie } from 'common/cookieAPI.js';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('views/Home/Home.vue'),
		meta: {
			title: '京东首页',
		},
	},
	{
		path: '/Home',
		redirect: {
			name: 'Home',
		},
	},
	{
		path: '/sort',
		name: 'Sort',
		component: () => import('views/Sort/Sort.vue'),
	},
	{
		path: '/cart',
		name: 'Cart',
		component: () => import('views/Cart/Cart.vue'),
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('views/Profile/Profile.vue'),
		meta: {
			verifyLogin: true,
		},
	},
	{
		path: '/product/:iid',
		name: 'Product',
		component: () => import('views/Product/Product.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('views/Login/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('views/Register/Register.vue'),
	},
];

const router = new VueRouter({
	// mode: 'history',
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
