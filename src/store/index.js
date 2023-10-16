import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from 'modules/ActionForm/store/reducer';
import {reducer as locationReducer} from "pages/AppRouter/store/reducers";
import {reducer as elementsReducer} from "modules/EntryList/store/reducers";
import {reducer as userReducer} from "modules/User/store/reducers";
import {reducer as credentialsReducer} from "modules/Authorization/store/reducers";


const reducers = combineReducers({
    form: formReducer,
    location: locationReducer,
    elements: elementsReducer,
    user: userReducer,
    credentials: credentialsReducer,
})

export default configureStore({
    reducer: reducers,
});