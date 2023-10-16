import store from "store";
import {getElementFromCursor} from "../../../helpers/events";

export let actionElement = null;
export let actionElements = [];

const emptyElement = {
    id: -1,
    data: {},
    type: "",
    html: null,
    display_pos: -1,
}

function getElementID(element) {
    return element.classList[0].split('-')[1];
}

function setElements() {
    if (actionElements.find(el => el.id === actionElement.id)) {
        actionElement.html.classList.remove('selected');
        actionElements = actionElements.filter(el => el.id !== actionElement.id);
    } else {
        actionElement.html.classList.add('selected');
        actionElements.push(actionElement);
    }
}

export function setUnselected() {
    actionElements.forEach(el => {
        el.html.classList.remove('selected');
    });
    actionElements = [];
}

function getElement(event, type) {
    const element = getElementFromCursor(event, type);
    if (!element) return null;
    let id = +getElementID(element);
    return {
        id,
        type,
        html: element,
    }
}

export function setActionElement(event) {
    actionElement = structuredClone(emptyElement);
    const elements = store.getState().elements;
    for (const type of ['item', 'entry']) {
        let el = getElement(event, type);
        if (el) {
            let parentID = el.id;
            if (el.type === 'item') {
                parentID = getElement(event, 'entry').id;
            }
            el.display_pos = getElementPosition(parentID);
            el.data = elements[`${type}s`].find(obj => obj.id === el.id);
            actionElement = el;
            break;
        }
    }
    if (actionElement.id === -1) {
        actionElement = {
            type: 'screen',
            data: {
                display_pos: getClickPosition(event)
            },
        }
    } else {
        if (event.ctrlKey) setElements();
    }

    console.log(actionElement, actionElements);
    return actionElement;
}

function getElementPosition(id) {
    const entrys = store.getState().elements.entrys;
    let pos = -1;
    for (let i = 0; i < entrys.length; i++) {
        if (entrys[i].id === id) {
            pos = i;
            break;
        }
    }
    if (pos === -1) pos = entrys.length;
    return pos;
}

function getClickPosition(event) {
    let pos = event.pageY;
    let curPos = 0;
    for (const entry of document.querySelectorAll(".entry")) {
        let block = entry.getBoundingClientRect();
        let b = block.top + block.height + window.scrollY;
        if (curPos === 0 && pos <= b) {
            return 0;
        }
        curPos += 1;
        if (pos > b) continue;
        pos = curPos - 1;
        return pos;
    }
    if (curPos === 0) pos = 0;
    else pos = curPos + 1;
    return pos;
}