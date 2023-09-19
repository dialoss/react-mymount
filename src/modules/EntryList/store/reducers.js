import {createSlice} from "@reduxjs/toolkit";

export const entrysSlice = createSlice({
    name: "entrys",
    initialState: {
        entrys: []
    },
    reducers: {
        addEntrys: (state, {payload: {newEntrys}}) => {
            state.entrys = [...state.entrys, ...newEntrys];
        }
    }
});

export const { actions, reducer } = entrysSlice;