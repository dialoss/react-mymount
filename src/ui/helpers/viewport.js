export function getViewportSize() {
    return [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)];
}

export function getCorrectedPosition(element) {
    let posX = element.clientX;
    let posY = element.clientY;

    let block = element.getBoundingClientRect();

    let bRight = posX + block.width;
    let bBottom = posY + block.height;

    const [vw, vh] = getViewportSize();

    if (bRight + 10 > vw) posX -= block.width;
    if (bBottom + 10 > vh) posY -= block.height;

    return [posX, posY];
}