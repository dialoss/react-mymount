import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAdmin: false,
        authenticated: false,
    },
    reducers: {
        setUser: (state, {payload: user}) => {
            return {...user, authenticated: true};
        }
    }
});

export const { actions, reducer } = userSlice;