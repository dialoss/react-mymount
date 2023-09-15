import {createSlice} from "@reduxjs/toolkit";

export const entrysStore = createSlice({
    name: "entrys",
    initialState: {
      entrys: [],
      items: [],
    },
    reducers: {
        addEntrys: (state, {payload: entrys}) => {
            state.entrys = [...state.entrys, ...entrys];
            let newItems = [];
            entrys.forEach(entry => {
                newItems = [...newItems, ...entry.items]
            })
            state.items = [...state.items, ...newItems];
        }
    }
});

export const { actions, reducer } = entrysStore;