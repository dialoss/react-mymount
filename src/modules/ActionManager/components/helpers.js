import store from "store";

let actionElement = null;

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
                }
                break;
            }
        }
    }
    console.log(intersect)
    actionElement.position = getElementPosition(actionElement);
    console.log(actionElement);
    return actionElement;
}

function getElementPosition(element) {
    const entrys = store.getState().elements.entrys;
    let pos = 0;
    for (let i = 0; i < entrys.length; i++) {
        if (entrys[i].id === element.entry.id) {
            pos = i;
            break;
        }
    }
    return pos;
}