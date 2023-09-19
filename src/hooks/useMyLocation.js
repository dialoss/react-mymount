import store from "store";

export function useMyLocation() {
    const location = store.getState().location;
    return location;
}