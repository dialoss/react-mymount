import store from "store";
import {actions} from "./themes";

export function clearThemes() {
    store.dispatch(actions.clearThemes());
}

export function addTheme(name, stylesheet) {
    store.dispatch(actions.addTheme({name, stylesheet}));
}

export function removeTheme(name) {
    store.dispatch(actions.removeTheme({name}));
}