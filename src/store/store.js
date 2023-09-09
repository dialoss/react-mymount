import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from "./reducers/changeForm";
import {reducer as modalReducer} from "./reducers/modal";
import {reducer as entrysReducer} from "./reducers/entrys";

const reducers = combineReducers({
    form: formReducer,
    modal: modalReducer,
    entrys: entrysReducer,
})

export default configureStore({
    reducer: reducers,
});