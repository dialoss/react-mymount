export function triggerEvent(name, data) {
    window.dispatchEvent(new CustomEvent(name, {detail: data}));
}