import {sendLocalRequest} from "api/requests";
import {triggerEvent} from "helpers/events";

export function submitForm(form) {
    let sendForm = {};
    Object.keys(form.data).forEach((field) => sendForm[field] = form.data[field].value);
    Object.keys(form.meta).forEach((field) => sendForm[field] = form.meta[field]);
    triggerEvent("element-changed", sendForm);
}