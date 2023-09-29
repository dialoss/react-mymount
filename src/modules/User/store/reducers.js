import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        authorized: false,
    },
    reducers: {
        setAuthorized: (state) => {
            return {authorized: true};
        }
    }
});

export const { actions, reducer } = userSlice;