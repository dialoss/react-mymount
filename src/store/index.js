import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as modalReducer} from 'components/ModalManager';
import {reducer as locationReducer} from "helpers/location/reducers";
import {reducer as entrysReducer} from "modules/EntryList/store/reducers";
import {reducer as themeReducer} from "helpers/themes/themes";

const reducers = combineReducers({
    modal: modalReducer,
    location: locationReducer,
    entrys: entrysReducer,
    themes: themeReducer
})

export default configureStore({
    reducer: reducers,
});