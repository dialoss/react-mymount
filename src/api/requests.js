import store from "store";
import Credentials from "../modules/Authorization/api/googleapi";

export async function fetchRequest(FILE_ID) {
    return await fetch("https://www.googleapis.com/drive/v3/files/" + FILE_ID + "?alt=media",{
        headers: {
            "Authorization": "Bearer " + Credentials.get().ACCESS_TOKEN,
        }
    });
}

export async function sendRequest(url, data) {
    let response = null;
    let query = {
        method: "POST",
        credentials: "include",
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
    return sendRequest(location.baseURL + request, data);
}