import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from 'modules/ActionForm/store/reducer';
import {reducer as locationReducer} from "helpers/location/reducers";
import {reducer as elementsReducer} from "modules/EntryList/store/reducers";
import {reducer as userReducer} from "modules/User/store/reducers";


const reducers = combineReducers({
    form: formReducer,
    location: locationReducer,
    elements: elementsReducer,
    user: userReducer,
})

export default configureStore({
    reducer: reducers,
});