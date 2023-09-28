import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from 'modules/ActionForm/store/reducer';
import {reducer as locationReducer} from "helpers/location/reducers";
import {reducer as elementsReducer} from "modules/EntryList/store/reducers";

const reducers = combineReducers({
    form: formReducer,
    location: locationReducer,
    elements: elementsReducer,
})

export default configureStore({
    reducer: reducers,
});