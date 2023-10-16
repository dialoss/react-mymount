import store from "store";
import Credentials from "../modules/Authorization/api/googleapi";

export async function fetchRequest(FILE_ID) {
    return await fetch("https://www.googleapis.com/drive/v3/files/" + FILE_ID + "?alt=media",{
        headers: {
            "Authorization": "Bearer " + Credentials.get().ACCESS_TOKEN,
        }
    });
}

export async function sendRequest(url, data, method) {
    let response = null;
    let query = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        ...(method !== 'GET' ? {body: JSON.stringify(data)} : {})
    }
    try {
        await fetch(url, query).then(res => res.json()).then(data => response = data);
    } catch (e) {
        console.log(e);
        return {"detail": "failed to fetch"};
    }
    return response;
}

export function sendLocalRequest(url, data={}, method='GET') {
    const location = store.getState().location;
    url = new URL(location.baseURL + url);
    if (method === 'GET') url.search += '&' + new URLSearchParams({slug: location.pageID || location.pageSlug}).toString();
    data.page = {
        'path': location.relativeURL.slice(1, -1),
        'slug': location.pageSlug,
    }
    return sendRequest(url.toString(), data, method);
}