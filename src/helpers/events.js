export function triggerEvent(name, data) {
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