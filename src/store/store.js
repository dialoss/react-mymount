import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as formReducer} from "./reducers/changeForm";
import {reducer as modalReducer} from "./reducers/modal";
import {reducer as entrysReducer} from "./reducers/entrys";
import {reducer as locationReducer} from "./reducers/location";


const reducers = combineReducers({
    form: formReducer,
    modal: modalReducer,
    entrys: entrysReducer,
    location: locationReducer,
})

export default configureStore({
    reducer: reducers,
});