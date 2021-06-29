import { request } from '../index.js';

export function requestSwiperImage() {
	return request('/homeTopSwipeImage')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestActivityImage() {
	return request('/homeActivityImage')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestGridtext() {
	return request('/homeGridText')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestLimitedTimeActivityGoodsList() {
	return request('/homeLimitedTimeActivityGoodsList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestContainerGoodsList() {
	return request('/homeContainerGoodsList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestSeparationGoodsList() {
	return request('/homeSeparationGoodsList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}

export function requestGuessYouLikeGoodsList() {
	return request('/homeGuessYouLikeGoodsList')
		.then((res) => res.json())
		.catch((err) => {
			throw new Error(err);
		});
}
