
export default async function sendRequest(url, data) {
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