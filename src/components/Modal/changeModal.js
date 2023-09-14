import {actions} from "store/reducers/modal";
import store from 'store/store';

export const changeModal = function(name, payload) {
    store.dispatch(actions.changeModal({name: name, changes: payload}));
}

export const closeAllModals = function() {
    const allModals = Object.keys(store.getState().modal);
    allModals.forEach(modal => changeModal(modal, {isOpened: false}));
}