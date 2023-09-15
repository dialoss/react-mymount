import {sendLocalRequest} from "scripts/network/requests";
import {changeModal} from "components/Modal/changeModal";
import {getFormData} from "components/MyForm/FormData";

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
    for (const type of Object.keys(actionElement)) {
        for (const element of intersect) {
            if (element.classList.contains(`${type}`)) {
                actionElement[type] = {
                    data: element,
                    id: getElementID(element)
                }
            }
        }
    }
}

function getElementPosition(element) {
    return 1
}

export const ContextActions = [
    {
        name: 'Quick New',
        callback: () => {
            let data = {
                'entry_action_type' : 'add',
                'type' : 'add-entry-quick',
                'display_pos' : getElementPosition(actionElement)
            }
            return sendLocalRequest('/entry_action/', data);
        }
    },
    {
        name: 'Добавить',
        callback: () => {
            changeModal('form', {isOpened: true, ...getFormData('add', actionElement)});
        }
    },
    {
        name: 'Редактировать',
        callback: () => {
            changeModal('form', {isOpened: true, ...getFormData('edit', actionElement)});
        }
    },
    {
        name: 'Копировать',
        callback: () => {
            copiedElement = actionElement;
        }
    },
    {
        name: 'Вставить',
        callback: () => {
            let data = {
                'entry_action_type' : 'paste',
                'display_pos' : getElementPosition(actionElement),
                'entry_id' : copiedElement.entry.id,
                'item_id' : copiedElement.item.id,
            };
            console.log(data);
        }
    },
    {
        name: 'Вырезать',
        callback: () => {
            ContextActions[3].callback();
            copiedElement.entry.data.style.opacity = "0.3";
        }
    },
    {
        name: 'Удалить',
        callback: () => {
            let data = {
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            return sendLocalRequest('/entry_action/', data);
        }
    },
]