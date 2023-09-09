
export const useMyLocation = function() {
    const fullURL = window.location.href;
    const baseURL = fullURL.split('/').slice(0, 3).join('/');
    const relativeURL = fullURL.replace(baseURL, '');
    const pageSlug = relativeURL.split('/').slice(-2, -1);
    return {fullURL, baseURL, relativeURL, pageSlug};
}