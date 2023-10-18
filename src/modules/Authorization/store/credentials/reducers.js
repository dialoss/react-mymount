import {createSlice} from "@reduxjs/toolkit";

export const credentialsSlice = createSlice({
    name: "credentials",
    initialState: {
        API_KEY: '*',
        CLIENT_ID: '*',
        ACCESS_TOKEN: '*',
        initialized: false,
    },
    reducers: {
        setCredentials: (state, {payload: credentials}) => {
            return {...credentials, initialized: true};
        }
    }
});

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

export const { actions, reducer } = credentialsSlice;