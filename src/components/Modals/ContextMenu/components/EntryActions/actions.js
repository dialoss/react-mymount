import {triggerEvent} from "helpers/events";

let copiedElement = null;

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
            copiedElement = actionElement;
            return [];
        }
    },
    'paste':{
        name: 'Вставить',
        callback: ({actionElement}) => {
            let data = {
                'event_type': 'ADD',
                'entry_action_type' : 'paste',
                'display_pos' : actionElement.position,
                'entry_id': copiedElement.entry.id,
                'item_id': copiedElement.item.id,
            };
            return [data, ...(!!copiedElement.cut ? ContextActions['delete'].callback({actionElement:copiedElement}) : [])];
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: ({actionElement}) => {
            copiedElement = actionElement;
            copiedElement.entry.html.style.opacity = "0.3";
            copiedElement.cut = true;
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