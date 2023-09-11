
export default async function sendRequest(url, data) {
    let response = null;
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(data => response = data);
    return response;
}