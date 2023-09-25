import store from "store";

export function useMyLocation() {
    return store.getState().location;
}