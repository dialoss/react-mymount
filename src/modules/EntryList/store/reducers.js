import {createSlice} from "@reduxjs/toolkit";

export const elementsSlice = createSlice({
    name: "elements",
    initialState: {
        entrys: [],
        items: [],
    },
    reducers: {
        clearElements: (state) => {
            state.entrys = [];
            state.items = [];
        },
        setElements: (state, {payload: {entrys}}) => {
            state.entrys = entrys;

            let newItems = [];
            entrys.forEach(entry => {
                newItems = [...newItems, ...entry.items]
            })
            state.items = newItems;
        }
    }
});

export const { actions, reducer } = elementsSlice;