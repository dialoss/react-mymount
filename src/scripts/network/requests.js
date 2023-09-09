export default async function sendRequest(sendData) {
    return await fetch(sendData.url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        body: JSON.stringify(sendData.data),
    });
}