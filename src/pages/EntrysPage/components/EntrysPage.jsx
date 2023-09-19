import React, {useEffect, useState} from 'react';
import EntryList from "components/Entry/EntryList";
import {sendLocalRequest} from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/entrys";

export const ThemeContext = React.createContext({});

const EntrysPage = () => {
    const dispatch = useDispatch();
    let entrysWrapper = [];
    const [flow, setFlow] = useState(1);
    const [entrys, setEntrys] = useState([]);
    const location = useSelector((state) => state.location);
    const mounted = React.useRef(null);


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
        let step = 10;
        let cur = 0;
        while (true) {
            if (cur / step === 2) step = 20;
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
        setFlow(2);
    }, [location]);

    return (
        <div>
            <ThemeContext.Provider value={listStyle}>
                <EntryList entrys={entrys}></EntryList>
                {/*{loading && <PageLoading/>}*/}
            </ThemeContext.Provider>
        </div>
    );
};

export default EntrysPage;