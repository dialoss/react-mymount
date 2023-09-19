import React, {useEffect, useState} from 'react';
import EntryList from "components/Entry/EntryList";
import {sendLocalRequest} from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import PageLoading from "./PageLoading";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/entrys";
import editStyle from "styles/listview/edit.module.scss";

export const ThemeContext = React.createContext({});

const ListView = ({listStyle}) => {

    const dispatch = useDispatch();
    let entrysWrapper = [];
    const [entrys, setEntrys] = useState([]);

    let sendData = {};
    let entrysAmount = 0;

    const [fetchEntrys, loading, setLoading] = useFetching(async () => {
        const response = await sendLocalRequest('/fetch_entrys/', sendData)
        addEntrys(response);
    });

    function addEntrys(response) {
        entrysWrapper = [...entrysWrapper, ...response.entrys_data]
        setEntrys(entrysWrapper);
        entrysAmount = response.entrys_amount;
        dispatch(actions.addEntrys(response.entrys_data));
    }

    function check(cur) {
        return (cur >= entrysAmount);
    }

    const fetchEntrysAll = async () => {
        let step = 5;
        let cur = 0;
        while (true) {
            if (cur / step === 2) step = 15;
            sendData = {
                data_start: cur,
                data_end: cur + step,
            };
            await fetchEntrys();
            cur += step;
            if (check(cur)) break;
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchEntrysAll();
    }, []);

    return (
        <div>
            <ThemeContext.Provider value={{listStyle, editStyle}}>
                <EntryList entrys={entrys}></EntryList>
                {/*{loading && <PageLoading/>}*/}
            </ThemeContext.Provider>
        </div>
    );
};

export default ListView;