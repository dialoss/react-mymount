import {createSlice} from "@reduxjs/toolkit";

export const listEntrys = createSlice({
    name: "entrys",
    initialState: {
        entrys: [],
        entrysAmount: 0,
    },
    reducers: {
        setAmount: (state, {payload: amount}) => {
            state.entrysAmount = amount;
        },
        addEntrys: (state, {payload: newEntrys}) => {
            state.entrys = [...state.entrys, ...newEntrys];
        },
        clearEntrys: (state) => {
            state.entrys = []
        },
    }
});

export const { actions, reducer } = listEntrys;