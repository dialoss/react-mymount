
export function useFetching(callback) {
    async function fetching() {
        return await callback();
    }
    return fetching;
}