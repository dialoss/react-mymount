import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "./location";

export default configureStore({
    reducer: reducer,
});