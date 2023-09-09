import {createSlice} from "@reduxjs/toolkit";

export const changeModal = createSlice({
    name: "modal",
    initialState: {
        modalOpened: false
    },
    reducers: {
        toggleModal: (state, {payload: modalOpened}) => {
            state.modalOpened = modalOpened;
        }
    }
});

export const { actions, reducer } = changeModal;