import React, {useEffect, useState} from 'react';
import EntryList from "components/Entry/EntryList";
import {sendLocalRequest} from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import PageLoading from "./PageLoading";
import {useSelector} from "react-redux";

export const ThemeContext = React.createContext({});

const ListView = ({listStyle}) => {
    let entrysWrapper = [];
    const [entrys, setEntrys] = useState([]);
    const location = useSelector((state) => state.location);

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

    useEffect(()=>{
        console.log('mount');
    }, [location])

    useEffect(() => {
        fetchEntrysAll();
        // console.log(t)
        // return () => {
            // console.log("unmount", t);
        // }
    }, [location]);

    return (
        <div>
            <ThemeContext.Provider value={listStyle}>
                <EntryList entrys={entrys}></EntryList>
                {loading && <PageLoading/>}
            </ThemeContext.Provider>
        </div>
    );
};

export default ListView;