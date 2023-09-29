import {sendLocalRequest} from "api/requests";

export async function fetchLoginForm() {
    return await sendLocalRequest("/fetch_login_form/").then(response => response);
}