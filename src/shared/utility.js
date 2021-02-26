import scrollLock from "scroll-lock";

// Scroll ---
export const scrollX = (e, prevDelta, maxDelta, posX1) => {
	if(maxDelta <= 0) return 0;
	scrollLock.disablePageScroll();

	let delta = e.deltaY || touchMove(e, posX1),
		newDelta = prevDelta + delta;

	newDelta = Math.max(0, newDelta);
	newDelta = Math.min(maxDelta, newDelta);

	setTimeout(() => scrollLock.enablePageScroll(), 500);

	return newDelta;
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
		? - (e.touches[0].clientX - posX1) / 8
		: - (e.clientX - posX1) / 8;
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