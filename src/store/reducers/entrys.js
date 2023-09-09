import {createSlice} from "@reduxjs/toolkit";

export const listEntrys = createSlice({
    name: "entrys",
    initialState: {
        entrys: [],
        entrysAll: 0,
    },
    reducers: {
        setAmount: (state, {payload: amount}) => {
            state.entrysAll = amount;
        },
        addEntrys: (state, {payload: newEntrys}) => {
            state.entrys = [...state.entrys, ...newEntrys];
        }
    }
});

export const { actions, reducer } = listEntrys;