function getMaxBottom(container) {
    let m = 0;
    for (const block of container.children[0].children) {
        let rect = block.getBoundingClientRect();
        m = Math.max(m, block.offsetTop + rect.height);
    }
    return m;
}

export function initContainerHeight(container) {
    let contHeight = getMaxBottom(container);
    container.style.height = contHeight + "px";
}