export default async function sendRequest(url, data) {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
}