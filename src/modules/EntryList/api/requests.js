import {baseURL} from "store/reducers/location";
import store from 'store/store';

export async function sendRequest(url, data) {
    let response = null;
    let emptyData = !(Boolean(Object.keys(data).length));
    const type = (!emptyData ? "POST" : "GET");
    let query = {
        method: type,
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        ...(!emptyData ? {body: JSON.stringify(data)} : {})
    }
    await fetch(url, query).then(res => res.json()).then(data => response = data);
    return response;
}

export function sendLocalRequest(request, data) {
    const location = store.getState().location;
    if (Object.keys(data).length !== 0) {
        data.page_url = location.relativeURL;
        data.page_slug = location.pageSlug;
    }
    const response = sendRequest(baseURL + request, data);
    return response;
}

export function submitForm(form) {
    let sendForm = {};
    Object.keys(form.data).forEach((field) => sendForm[field] = form.data[field].value);
    Object.keys(form.meta).forEach((field) => sendForm[field] = form.meta[field]);
    sendLocalRequest('/entry_action/', sendForm);
}