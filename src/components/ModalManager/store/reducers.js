import {createSlice} from "@reduxjs/toolkit";

export const changeModal = createSlice({
    name: "modals",
    initialState: {},
    reducers: {
        toggleModal: (state, {payload: {name, modalState}}) => {
            state[name].isOpened = modalState;
        },
        addModal: (state, {payload: name}) => {
            state[name] = {
                isOpened: false,
                position: {},
            }
        },
        changeModal: (state, {payload: {name, changes}}) => {
            state[name] = {...state[name], ...changes};
            // console.log(state[name]);
        },
        changeForm: (state, {payload: field}) => {
            state['form'].data[field.id].value = field.value;
        }
    }
});

export const { actions, reducer } = changeModal;