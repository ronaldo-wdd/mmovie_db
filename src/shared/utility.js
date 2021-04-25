import scrollLock from "scroll-lock";

// Scroll ---
export const scrollX = (e, posX1 = 0, prevDelta = false, maxDelta = false) => {
	if((maxDelta && maxDelta <= 0) || onScrollY(e)) return 0;

	let delta = e.deltaX || touchMove(e, posX1),
		newDelta = prevDelta ? prevDelta + delta : delta;
		
	if (maxDelta) {
		newDelta = Math.max(0, newDelta);
		newDelta = Math.min(maxDelta, newDelta);
	}

	return newDelta;
}

const onScrollY = e => {
	if (!e.deltaY || e.deltaY === 0) return false;

	const scrollingY = e.deltaY > 0 > e.deltaX || e.deltaY < 0 < e.deltaX
		? true : false;

	return scrollingY;
}

// touchStart 
export const touchStart = e => {
	return e.type === 'touchstart'
		? e.touches[0].clientX
		: e.clientX;
}

// touchMove
const touchMove = (e, posX1) => {
  	return e.type === 'touchmove'
		? posX1 - e.touches[0].clientX / 8
		: posX1 - e.clientX / 8;
}

// JSON stringify circular structure
export const safeStringify = (obj) => {
	let cache = [];
	const retVal = JSON.stringify(
		obj,
		(key, value) =>
		typeof value === "object" && value !== null
			? cache.includes(value)
				? undefined 
				: cache.push(value) && value
			: value,
	);
	cache = null;
	return retVal;
};

// Max DeltaX
export const maxDeltaX = (target, element = false) => {
	if (!target) return 0;

	let targetWidth = target.getBoundingClientRect().width,
		elementWidth = element  
			? element.getBoundingClientRect().width
			: window.innerWidth - target.getBoundingClientRect().left * 2,
		maxDelta = targetWidth - elementWidth;

	return maxDelta;
}

// Lock scroll
export function scrollYLock (newDelta, maxDelta) {
	newDelta === 0 || newDelta === maxDelta
		? scrollLock.enablePageScroll()
		: scrollLock.disablePageScroll();

	setTimeout(() => scrollLock.enablePageScroll(), 500);
}