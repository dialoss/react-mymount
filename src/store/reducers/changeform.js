import {createSlice} from "@reduxjs/toolkit";
import {emptyForm} from "../../components/MyForm/FormData";

export const changeForm = createSlice({
    name: "form",
    initialState: emptyForm,
    reducers: {
        changeField: (state, {payload: field}) => {
            state[field.id].value = field.value;
        }
    }
});

export const { actions, reducer } = changeForm;