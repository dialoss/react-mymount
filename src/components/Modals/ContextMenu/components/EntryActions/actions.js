import {triggerEvent} from "helpers/events";

let copiedElement = null;

export const ContextActions = {
    'add-quick': {
        name: 'Quick New',
        callback: ({actionElement}) => {
            let data = {
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
            triggerEvent('form-data', {type:'add', element:actionElement})
            return [];
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: ({actionElement}) => {
            triggerEvent('form-data', {type:'edit', element:actionElement})
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
                'entry_action_type' : 'paste',
                'display_pos' : actionElement.position,
                'entry_id': copiedElement.entry.id,
                'item_id': copiedElement.item.id,
            };
            return [data, ContextActions['delete'].callback({actionElement:copiedElement})];
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: ({actionElement}) => {
            copiedElement = actionElement;
            copiedElement.entry.data.style.opacity = "0.3";
            return [];
        }
    },
    'delete':{
        name: 'Удалить',
        callback: ({actionElement}) => {
            let data = {
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            return [data];
        }
    }
}