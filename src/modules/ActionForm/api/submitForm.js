import {sendLocalRequest} from "api/requests";

export function submitForm(form) {
    let sendForm = {};
    Object.keys(form.data).forEach((field) => sendForm[field] = form.data[field].value);
    Object.keys(form.meta).forEach((field) => sendForm[field] = form.meta[field]);
    sendLocalRequest('/entry_action/', sendForm);
}