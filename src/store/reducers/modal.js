import {createSlice} from "@reduxjs/toolkit";

export const changeModal = createSlice({
    name: "modal",
    initialState: {
        modalsOpened: []
    },
    reducers: {
        toggleModal: (state, {payload: modalOpened}) => {
            state.modalOpened = modalOpened;
        }
    }
});

export const { actions, reducer } = changeModal;