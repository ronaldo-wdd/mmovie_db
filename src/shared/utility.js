// Scroll ---
export const scrollX = (e, prevDeltaX, maxDeltaX) => {
    let deltaX = e.deltaX,
        newDeltaX = prevDeltaX + deltaX;

    newDeltaX = Math.max(0, newDeltaX);
    newDeltaX = Math.min(maxDeltaX, newDeltaX);

    return newDeltaX;
}