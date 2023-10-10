import {triggerEvent} from "helpers/events";
import {setUnselected} from "modules/ActionManager/components/helpers";

function handleElements(actionElement, elements, event_type, action_type) {
    let sendData = [];
    for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        let data = {
            'event_type': event_type,
            'entry_action_type' : action_type,
            'display_pos' : actionElement.position,
            'entry_id': el.entry.id,
            'item_id': el.item.id,
        };
        sendData.push(data);
    }
    return sendData;
}

let copiedElements = [];
let cuttedElements = [];

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
        callback: ({actionElements}) => {
            copiedElements = actionElements;
            copiedElements.forEach(el => el[el.selected].html.classList.add("copied"));
            return [];
        }
    },
    'paste':{
        name: 'Вставить',
        callback: ({actionElement}) => {
            let copy = handleElements(actionElement, copiedElements, 'ADD', 'paste');
            let cut = handleElements(actionElement, cuttedElements, 'ADD', 'paste');
            let del = ContextActions['delete'].callback({actionElements:cuttedElements});
            setUnselected();
            copiedElements = [];
            cuttedElements = [];
            return [...copy, ...cut, ...del];
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: ({actionElements}) => {
            cuttedElements = actionElements;
            cuttedElements.forEach(el => el[el.selected].html.classList.add("cutted"));
            return [];
        }
    },
    'delete':{
        name: 'Удалить',
        callback: ({actionElements}) => {
            return handleElements(actionElements[0], actionElements, 'DELETE', 'delete');
        }
    }
}