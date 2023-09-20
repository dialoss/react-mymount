import store from "../store";
import {baseURL} from "../helpers/location/reducers";

export async function sendRequest(url, data) {
    let response = null;
    let query = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }
    await fetch(url, query).then(res => res.json()).then(data => response = data);
    return response;
}

export function sendLocalRequest(request, data={}) {
    const location = store.getState().location;
    data.page_url = location.relativeURL;
    data.page_slug = location.pageSlug;
    return sendRequest(baseURL + request, data);
}