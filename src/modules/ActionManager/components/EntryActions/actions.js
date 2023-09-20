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