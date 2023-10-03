import {triggerEvent} from "helpers/events";

let copiedElements = [];
let cuttedElements = [];

function handleElements(actionElement, elements) {
    let sendData = [];
    for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        let data = {
            'event_type': 'ADD',
            'entry_action_type' : 'paste',
            'display_pos' : actionElement.position,
            'entry_id': el.entry.id,
            'item_id': el.item.id,
        };
        sendData.push(data);
    }
    return sendData;
}

export const ContextActions = {
    'add-quick': {
        name: 'Quick New',
        callback: ({actionElement}) => {
            let data = {
                'event_type': 'ADD',
                'entry_action_type' : 'add',
                'type' : 'add-entry-quick',
                'display_pos': actionElement.position
            }
            return [data];
        }
    },
    'add':{
        name: 'Добавить',
        callback: ({actionElement}) => {
            triggerEvent('form:set-data', {type:'add', element:actionElement})
            return [];
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: ({actionElement}) => {
            if (actionElement.item.id === -1 && actionElement.entry.id === -1) return [];
            triggerEvent('form:set-data', {type:'edit', element:actionElement})
            return [];
        }
    },
    'copy':{
        name: 'Копировать',
        callback: ({actionElement}) => {
            actionElement.entry.html.style.opacity = "0.7";
            copiedElements.push(actionElement);
            return [];
        }
    },
    'paste':{
        name: 'Вставить',
        callback: ({actionElement}) => {
            let copy = handleElements(actionElement, copiedElements);
            let cut = handleElements(actionElement, cuttedElements);

            return [...copy, ...cut, ...ContextActions['delete'].callback({actionElement:copiedElements})];
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: ({actionElement}) => {
            cuttedElements.push(actionElement);
            actionElement.entry.html.style.backgroundColor = "#747474";
            return [];
        }
    },
    'delete':{
        name: 'Удалить',
        callback: ({actionElement}) => {
            let data = {
                'event_type': 'DELETE',
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            return [data];
        }
    }
}