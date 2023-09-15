import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as modalReducer} from "./reducers/modal";
import {reducer as locationReducer} from "./reducers/location";
import {reducer as entrysReducer} from "./reducers/entrys";

const reducers = combineReducers({
    modal: modalReducer,
    location: locationReducer,
    entrys: entrysReducer,
})

export default configureStore({
    reducer: reducers,
});