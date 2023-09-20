import {sendLocalRequest} from "scripts/network/requests";
import {changeModal} from "ui/Modal/changeModal";
import {getFormData} from "components/MyForm/FormData";
import store from "store/store";

let actionElement = null;
let copiedElement = null;

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

export function handleAction(action) {
    action.callback();
    actionElement = structuredClone(emptyElement);
    copiedElement = structuredClone(emptyElement);
}

export function setActionElement(event) {
    actionElement = structuredClone(emptyElement);
    const intersect = document.elementsFromPoint(event.clientX, event.clientY);
    const state = store.getState();
    for (const type of Object.keys(actionElement)) {
        for (const element of intersect) {
            if (element.classList.contains(`${type}`)) {
                let id = +getElementID(element);
                actionElement[type] = {
                    data: state.entrys[`${type}s`].find(obj => obj.id === id),
                    id,
                    type : element.classList[2].split('-')[1],
                }
                break;
            }
        }
    }
    actionElement.position = getElementPosition(actionElement);
    console.log(actionElement);
}

function getElementPosition(element) {
    const entrys = store.getState().entrys.entrys;
    let pos = 0;
    for (let i = 0; i < entrys.length; i++) {
        if (entrys[i].id === element.entry.id) {
            pos = i;
            break;
        }
    }
    return pos;
}