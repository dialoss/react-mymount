import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

export const ContextActions = {
    'add-quick': {
        name: 'Quick New',
        callback: async (actionElement) => {
            let data = {
                'entry_action_type' : 'add',
                'type' : 'add-entry-quick',
                'display_pos' : actionElement.position
            }
            const response = sendLocalRequest('/entry_action/', data);
            triggerEvent('element-changed', {data, response});
        }
    },
    'add':{
        name: 'Добавить',
        callback: (actionElement) => {
            triggerEvent('form-data', {type:'add', element:actionElement})
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: (actionElement) => {
            triggerEvent('form-data', {type:'edit', element:actionElement})
        }
    },
    'copy':{
        name: 'Копировать',
        callback: () => {
            // copiedElement = actionElement;
        }
    },
    'paste':{
        name: 'Вставить',
        callback: (actionElement, copiedElement) => {
            let data = {
                'entry_action_type' : 'paste',
                'display_pos' : actionElement.position,
                'entry_id' : copiedElement.entry.id,
                'item_id' : copiedElement.item.id,
            };
            triggerEvent('element-changed', data);
            console.log(data);
        }
    },
    'cut':{
        name: 'Вырезать',
        callback: (copiedElement) => {
            ContextActions["paste"].callback();
            copiedElement.entry.data.style.opacity = "0.3";
        }
    },
    'delete':{
        name: 'Удалить',
        callback: async (actionElement) => {
            let data = {
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            const response = sendLocalRequest('/entry_action/', data);
            triggerEvent('element-changed', {data, response});
        }
    }
}