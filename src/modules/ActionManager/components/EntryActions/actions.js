import {sendLocalRequest} from "api/requests";

export const ContextActions = {
    'add-quick': {
        name: 'Quick New',
        callback: (actionElement) => {
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
        callback: (actionElement) => {
            changeModal('form', {isOpened: true, ...getFormData('add', actionElement)});
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: (actionElement) => {
            changeModal('form', {isOpened: true, ...getFormData('edit', actionElement)});
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
        callback: (actionElement) => {
            let data = {
                'entry_action_type' : 'delete',
                'entry_id' : actionElement.entry.id,
                'item_id' : actionElement.item.id,
            }
            sendLocalRequest('/entry_action/', data);
        }
    }
}