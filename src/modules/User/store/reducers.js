import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAdmin: false,
    },
    reducers: {
        setUser: (state, {payload: user}) => {
            return user;
        }
    }
});

export const { actions, reducer } = userSlice;