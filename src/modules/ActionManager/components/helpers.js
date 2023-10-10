import store from "store";
import {getElementFromCursor} from "../../../helpers/events";

export let actionElement = null;
export let actionElements = [];

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

function setSelected(element, type) {
    if (!!actionElements.filter(el => (el[type].id === element[type].id && el.selected === type)).length) {
        element[type].html.classList.remove('selected');
        actionElements = actionElements.filter(el => !(el[type].id === element[type].id && el.selected === type));
    } else {
        element.selected = type;
        element[type].html.classList.add('selected');
        actionElements.push(element);
    }
}


export function setUnselected() {
    actionElements.forEach(el => {
        el[el.selected].html.classList.remove('selected');
    });
    actionElements = [];
}

export function setActionElement(event) {
    actionElement = structuredClone(emptyElement);
    const elements = store.getState().elements;
    for (const type of Object.keys(actionElement)) {
        const element = getElementFromCursor(event, String(type));
        let id = +getElementID(element);
        actionElement[type] = {
            data: elements[`${type}s`].find(obj => obj.id === id),
            id,
            type : element.classList[2].split('-')[1],
            html: element,
        }
    }
    actionElement.position = getElementPosition(actionElement);
    console.log(actionElement);
    if (event.ctrlKey) {
        if (actionElement.item.id !== -1) setSelected(actionElement, 'item');
        else setSelected(actionElement, 'entry');
    }
    console.log(actionElements)
    return actionElement;
}

function getElementPosition(element) {
    const entrys = store.getState().elements.entrys;
    let pos = -1;
    for (let i = 0; i < entrys.length; i++) {
        if (entrys[i].id === element.entry.id) {
            pos = i;
            break;
        }
    }
    if (pos === -1) pos = entrys.length;
    return pos;
}