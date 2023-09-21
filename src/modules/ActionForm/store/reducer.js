import {createSlice} from "@reduxjs/toolkit";

export const formSlice = createSlice({
    name: "form",
    initialState: {
        data: {}
    },
    reducers: {
        setForm: (state, {payload: form}) => {
            return form;
        },
        changeField: (state, {payload: field}) => {
            state.data[field.name].value = field.value;
        }
    }
});

export const { actions, reducer } = formSlice;