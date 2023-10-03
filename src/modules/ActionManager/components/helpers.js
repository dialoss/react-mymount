import store from "store";

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

export function setActionElement(event) {
    actionElement = structuredClone(emptyElement);
    const intersect = document.elementsFromPoint(event.clientX, event.clientY);
    const elements = store.getState().elements;
    for (const type of Object.keys(actionElement)) {
        for (const element of intersect) {
            if (element.classList.contains(`${type}`)) {
                let id = +getElementID(element);
                actionElement[type] = {
                    data: elements[`${type}s`].find(obj => obj.id === id),
                    id,
                    type : element.classList[2].split('-')[1],
                    html: element,
                }
                break;
            }
        }
    }
    actionElement.position = getElementPosition(actionElement);
    console.log(actionElement);
    if (event.ctrlKey) {
        if (!!actionElements.filter(el => el.entry.id === actionElement.entry.id).length) {
            actionElement.entry.html.style.border = "none";
            actionElements = actionElements.map(el => el.entry.id !== actionElement.entry.id);
        } else {
            actionElement.entry.html.style.border = "solid 10px blue";
            actionElements.push(actionElement);
        }


    }
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