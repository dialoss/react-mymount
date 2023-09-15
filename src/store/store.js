import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer as modalReducer} from "./reducers/modal";
import {reducer as locationReducer} from "./reducers/location";

const reducers = combineReducers({
    modal: modalReducer,
    location: locationReducer,
})

export default configureStore({
    reducer: reducers,
});