import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from 'modules/ActionForm/store/reducer';
import {reducer as locationReducer} from "helpers/location/reducers";
import {reducer as elementsReducer} from "modules/EntryList/store/reducers";
import {reducer as themeReducer} from "helpers/themes/themes";

const reducers = combineReducers({
    form: formReducer,
    location: locationReducer,
    elements: elementsReducer,
    themes: themeReducer
})

export default configureStore({
    reducer: reducers,
});