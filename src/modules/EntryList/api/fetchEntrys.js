import {sendLocalRequest} from "api/requests";

export async function fetchEntrys(callback) {
    let step = 10;
    let cur = 0;
    while (true) {
        if (cur / step === 2) step = 20;
        let sendData = {
            data_start: cur,
            data_end: cur + step,
        };
        const response = await sendLocalRequest('/fetch_entrys/', sendData)
        callback(response);
        cur += step;
        if (cur >= response.entrys_amount) break;
    }
}