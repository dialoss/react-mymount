import {triggerEvent} from "helpers/events";
import {actionElement, actionElements, setUnselected} from "modules/ActionManager/components/helpers";

export default class Actions {
    static element = null;
    static elements = [];
    static history = [];

    static action(actionFunction) {
        Actions.element = actionElement;
        Actions.elements = actionElements;
        const actions = actionFunction();
        for (let i = actions.length - 1; i >= 0; i--) {
            let action = actions[i];
            let el = action.element;

            if (!el.type) el.type = actionElement.type;
            let url = `/api/${el.type}s/`;
            if (action.method !== 'POST') {
                if (!el.id) el.id = actionElement.id;
                url += el.id + '/';
            }

            let request = {
                data: action,
                url,
                method: action.method,
            };
            triggerEvent('entrylist:handle-changes', request);
        }
    }

    static addQuick() {
        return [{
            method: 'POST',
            element: {type: 'entry'},
            description: 'Text Field',
            title: 'Text Field',
            display_pos: Actions.element.display_pos,
        }];
    }

    static add() {
        triggerEvent('form:set-data', {type:'add', element: Actions.element});
        return [];
    }

    static edit() {
        if (Actions.element.id === -1) return [];
        triggerEvent('form:set-data', {type:'edit', element: Actions.element});
        return [];
    }

    static baseAction(type, name) {
        Actions.elements.forEach(el => el.html.classList.add(name));
        Actions.history.push({
            className: name,
            type: type,
            elements: Actions.elements,
        });
        if (!Actions.elements.length) Actions.history.push({type, elements: [Actions.element]})
        return [];
    }

    static copy() {
       return Actions.baseAction('copy', 'copied');
    }

    static cut() {
        return Actions.baseAction('cut', 'cutted');
    }

    static paste() {
        setUnselected();
        let historyData = Actions.history.slice(-1)[0];
        let action = Actions.element;
        if (action.type === 'item') {
            return [];
        }
        let actionData = structuredClone(action.data);
        actionData.items = [];
        let request = [];
        let items = false;
        historyData.elements.forEach(el => {
            if (el.type === 'entry') {
                request.push({...el.data, display_pos: actionData.display_pos,
                    method: 'POST', element:{type:'entry'}});
            } else {
                items = true;
                actionData.items = [...actionData.items, el.data];
            }
        });
        if (items) request.push({...actionData, method:'PATCH', element: {type:'entry', id: actionData.id}});

        if (historyData.type === 'cut') {
            request = [...request, ...Actions.delete()];
        }
        function clearSelection(elements, name) {
            elements.forEach(el => el.html.classList.remove(name));
        }
        clearSelection(historyData.elements, historyData.className);
        return request;
    }

    static delete() {
        const f = el => ({...el.data, element: {type: el.type, id: el.id}, method: 'DELETE'});
        let data = Actions.elements.map(el => f(el));
        if (!data.length) data = [f(Actions.element)];
        return data;
    }
}

export const ContextActions = {
    'add-quick': {
        name: 'Quick New',
        callback: Actions.addQuick,
    },
    'add':{
        name: 'Добавить',
        callback: Actions.add,
        actions: {
            'entry': {
                name: 'Запись',
                callback: Actions.add,
                actions: {

                }
            },
            'items': {
                name: 'Предметы',
                callback: Actions.add,
                actions: {
                    'textfield': {
                        name: 'Текст'
                    },
                    'image': {
                        name: 'Картинка'
                    },
                    'video': {
                        name: 'Видео'
                    },
                }
            }
        }
    },
    'edit':{
        name: 'Редактировать',
        callback: Actions.edit,
    },
    'copy':{
        name: 'Копировать',
        callback: Actions.copy,
    },
    'paste':{
        name: 'Вставить',
        callback: Actions.paste,
    },
    'cut':{
        name: 'Вырезать',
        callback: Actions.cut,
    },
    'delete':{
        name: 'Удалить',
        callback: Actions.delete,
    }
}