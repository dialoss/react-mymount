import {sendLocalRequest} from "api/requests";

export async function fetchEntrys(callback) {
    let step = 10;
    let cur = 0;
    while (true) {
        if (cur / step === 2) step = 20;
        let page = {
            limit: step,
            offset: cur,
        };
        const urlParams = new URLSearchParams(page).toString();
        const response = await sendLocalRequest(`/api/entrys/?${urlParams}`, {method:"GET"})
        callback(response.results);
        cur += step;
        if (cur >= response.count) break;
    }
}