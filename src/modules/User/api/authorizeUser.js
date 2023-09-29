import {sendLocalRequest} from "api/requests";
import store from "store";
import {actions} from "modules/User/store/reducers";

export async function authorizeUser() {
    sendLocalRequest("/init_user/").then((data) => {
        const auth = data.auth;
        if (auth) {
            store.dispatch(actions.setAuthorized());
        }
    });
}