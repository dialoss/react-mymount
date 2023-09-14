
export const correctElementPosition = (position, element) => {
    if (Object.keys(position).length === 0) {
        return {left: "initial", top: "initial"};
    }
    let posX = position.left;
    let posY = position.top;
    let block = element.current.getBoundingClientRect();
    let bRight = posX + block.width;
    let bBottom = posY + block.height;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    if (bRight + 10 > vw) posX -= block.width;
    if (bBottom + 10 > vh) posY -= block.height;
    return {left: posX, top: posY};
}