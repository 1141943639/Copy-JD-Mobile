export function getCookie(key) {
	const cookie = document.cookie;

	const keyArr = new RegExp(key).exec(cookie);

	if (!keyArr) return keyArr;

	const valueStartIndex = keyArr.index + keyArr[0].length + 1;

	const valueEndIndex =
		cookie.indexOf(';', valueStartIndex) > 0
			? cookie.indexOf(';', valueStartIndex)
			: cookie.length;

	return cookie.slice(valueStartIndex, valueEndIndex);
}

export function setCookie(key, value, day = 0) {
	const date = new Date();
	const exp = date.getTime() + day * 60 * 60 * 24 * 1000;
	date.setTime(exp);

	document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function removeCookie(key) {
	const date = new Date(1);
	const value = getCookie(key);

	document.cookie = `${key}=${value};expires=${date.toUTCString()};`;
}

export function hasCookie(key) {
	const cookie = document.cookie;

	const keyArr = new RegExp(key).exec(cookie);

	if (keyArr) return true;

	return false;
}
