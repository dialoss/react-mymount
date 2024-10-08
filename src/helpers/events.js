export function triggerEvent(name, data={}) {
    window.dispatchEvent(new CustomEvent(name, {detail: data}));
}

let timeButtonPressed = 0;

export function registerPress() {
    timeButtonPressed = Date.now();
}

export function getPressDelta() {
    if (timeButtonPressed === 0) return 0;
    let delta = Date.now() - timeButtonPressed;
    timeButtonPressed = 0;
    return delta;
}

export function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

export function doubleTap(callback) {
    let lastTap = 0;
    let timeout;
    return function detectDoubleTap(event) {
        const curTime = new Date().getTime();
        const tapLen = curTime - lastTap;
        if (tapLen < 500 && tapLen > 0) {
            callback(event);
            event.preventDefault();
        } else {
            timeout = setTimeout(() => {
                clearTimeout(timeout);
            }, 500);
        }
        lastTap = curTime;
    };
}

export function getElementFromCursor(event, className) {
    if (!!event.touches) event = event.touches[0];
    try {
        const intersect = document.elementsFromPoint(event.clientX, event.clientY);
        for (const element of intersect) {
            if (element.classList.contains('transform-resize')) {
                return element.closest('.transform-item').querySelector('.item');
            }
            if (element.classList.contains(className)) {
                return element;
            }
        }
    } catch (e) {}
    return null;
}