import store from "store/index";
import {actions} from './store/reducers';

export function changeModal(name, payload, field="") {
    store.dispatch(actions.changeModal({name: name, changes: payload, changeField: field}));
}

export function closeAllModals() {
    const allModals = Object.keys(store.getState().modal);
    allModals.forEach(modal => changeModal(modal, {isOpened: false}));
}