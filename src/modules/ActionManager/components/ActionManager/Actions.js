import {sendLocalRequest} from "scripts/network/requests";
import {changeModal} from "ui/Modal/changeModal";
import {getFormData} from "components/MyForm/FormData";
import store from "store/store";

let actionElement = null;
let copiedElement = null;

const emptyElement = {
    entry: {
        id: -1,
        data: {}
    },
    item: {
        id: -1,
        type: "",
        data: {}
    }
}

function getElementID(element) {
    return element.classList[0].split('-')[1];
}

export function handleAction(action) {
    action.callback();
    actionElement = structuredClone(emptyElement);
    copiedElement = structuredClone(emptyElement);
}

export function setActionElement(event) {
    actionElement = structuredClone(emptyElement);
    const intersect = document.elementsFromPoint(event.clientX, event.clientY);
    const state = store.getState();
    for (const type of Object.keys(actionElement)) {
        for (const element of intersect) {
            if (element.classList.contains(`${type}`)) {
                let id = +getElementID(element);
                actionElement[type] = {
                    data: state.entrys[`${type}s`].find(obj => obj.id === id),
                    id,
                    type : element.classList[2].split('-')[1],
                }
                break;
            }
        }
    }
    actionElement.position = getElementPosition(actionElement);
    console.log(actionElement);
}

function getElementPosition(element) {
    const entrys = store.getState().entrys.entrys;
    let pos = 0;
    for (let i = 0; i < entrys.length; i++) {
        if (entrys[i].id === element.entry.id) {
            pos = i;
            break;
        }
    }
    return pos;
}

export const Actions = {
    'add-quick': {
        name: 'Quick New',
        callback: () => {
            let data = {
                'entry_action_type' : 'add',
                'type' : 'add-entry-quick',
                'display_pos' : actionElement.position
            }
            sendLocalRequest('/entry_action/', data);
        }
    },
    'add':{
        name: 'Добавить',
        callback: () => {
            changeModal('form', {isOpened: true, ...getFormData('add', actionElement)});
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: () => {
            changeModal('form', {isOpened: true, ...getFormData('edit', actionElement)});
        }
    },
    'copy':{
        name: 'Копировать',
        callback: () => {
            copiedElement = actionElement;
        }
    },
    'paste':{
        name: 'Вставить',
        callback: () => {
            let data = {
                'entry_action_type' : 'paste',
                'display_pos' : actionElement.position,
                'entry_id' : copiedElement.entry.id,
                'item_id' : copiedElement.item.id,
            };
            console.log(data);
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: () => {
            Actions["paste"].callback();
            copiedElement.entry.data.style.opacity = "0.3";
        }
    },
    'delete':{
        name: 'Удалить',
        callback: () => {
            let data = {
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            sendLocalRequest('/entry_action/', data);
        }
    }
}