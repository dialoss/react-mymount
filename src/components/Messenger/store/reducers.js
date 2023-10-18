import {createSlice} from "@reduxjs/toolkit";

export const messengerSlice = createSlice({
    name: "messenger",
    initialState: {
        name: 'default'
    },
    reducers: {
        setName: (state, {payload: name}) => {
            return {name};
        }
    }
});

export const { actions, reducer } = messengerSlice;