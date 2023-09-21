import React, {useEffect, useState} from 'react';
import ListView from "ui/ListView/ListView";
import {useDispatch} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";
import {useAddEvent} from "hooks/useAddEvent";

const EntryListContainer = () => {
    let tempContainer = [];
    const [localEntrys, setEntrys] = useState([]);
    const dispatch = useDispatch();

    function addEntrys(response) {
        tempContainer = [...tempContainer, ...response.entrys_data];
        setEntrys(tempContainer);
        dispatch(actions.setEntrys({entrys: tempContainer}));
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    function handleElements(event) {

    }

    useAddEvent('element-changed', handleElements);

    return (
        <ListView>
            <EntryList entrys={localEntrys}/>
        </ListView>
    );
};

export default EntryListContainer;