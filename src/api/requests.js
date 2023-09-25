import store from "../store";
import {baseURL} from "../helpers/location/reducers";

const API_KEY = "AIzaSyDDqSATTGIXHgBRwl_S4mPCcATYJsISOhM";

export async function fetchRequest(FILE_ID) {
    let response = null;
    await fetch("https://www.googleapis.com/drive/v3/files/" + FILE_ID, {
        method: 'GET',
        key: API_KEY,
    }).then(res => res.json()).then(data => console.log(data));
    return response;
}

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