import React, {useEffect, useReducer, useState} from 'react';
import ListView from "ui/ListView/ListView";
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";

function reducer(state, action) {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "UPDATE":
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    let newState = [...state];
                    newState[i] = action.payload;
                    return newState;
                }
            }
            break;
        case "ADD":
            return state.insert(action.payload.display_pos, action.payload);
    }
}

const EntryListContainer = () => {
    let tempContainer = [];
    const [localEntrys, localDispatch] = useReducer(reducer, []);
    const dispatch = useDispatch();

    function addEntrys(response) {
        tempContainer = [...tempContainer, ...response.entrys_data];
        localDispatch({type: 'SET', payload: tempContainer});
        dispatch(actions.setElements({entrys: tempContainer}));
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    async function handleElements(event) {
        const data = event.detail.data;
        const response = await event.detail.response;
        const responseData = response.data.entrys_data[0];
        localDispatch({type: 'UPDATE', payload: responseData});
    }

    useAddEvent('element-changed', handleElements);

    return (
        <ListView>
            <EntryList entrys={localEntrys}/>
        </ListView>
    );
};

export default EntryListContainer;