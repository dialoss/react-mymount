import React, {useEffect} from 'react';
import ListView from "ui/ListView/ListView";
import {useDispatch, useSelector} from "react-redux";
import EntryList from "components/EntryList/EntryList";
import {actions} from "../store/reducers";
import {fetchEntrys} from "../api/fetchEntrys";

const EntryListContainer = () => {
    const entrys = useSelector((state) => state.entrys).entrys;
    const dispatch = useDispatch();

    function addEntrys(response) {
        dispatch(actions.addEntrys({newEntrys: response.entrys_data}));
    }

    useEffect(() => {
        fetchEntrys(addEntrys);
    }, []);

    return (
        <ListView>
            <EntryList entrys={entrys}/>
        </ListView>
    );
};

export default EntryListContainer;