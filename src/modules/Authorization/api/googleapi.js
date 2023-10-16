import store from "store";
import {actions} from "../store/reducers";
import {sendLocalRequest} from "api/requests";

export default class Credentials {
    static fetch() {
        sendLocalRequest('/api/google/credentials/').then(response => {
            store.dispatch(actions.setCredentials(
                {
                    ACCESS_TOKEN : response.token,
                    API_KEY : response.api_key,
                    CLIENT_ID : response.client_id,
                }
            ));
        });
    }
    static get() {
        return store.getState().credentials;
    }
}