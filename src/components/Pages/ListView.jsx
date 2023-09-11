import React, {useEffect, useMemo} from 'react';
import EntryList from "components/Entry/EntryList";
import sendRequest from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import PageLoading from "./PageLoading";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/entrys";
import {baseURL} from "store/reducers/location";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ListView = () => {
    const dispatch = useDispatch();
    const entrys = useSelector((state) => state.entrys.entrys);
    const entrysAmount = useSelector((state) => state.entrys.entrysAmount);
    const location = useSelector((state) => state.location);



    let curPage = {
        page_url: location.relativeURL,
        page_slug: location.pageSlug,
    }
    let sendData = {
        url: baseURL + '/ajax/',
        data: {
            ...curPage
        }
    };

    const [fetchEntrys, loading, setLoading] = useFetching(async () => {
        const response = await sendRequest(sendData.url, sendData.data)
        dispatch(actions.addEntrys(response.entrys_data));
        window.entrysAmount = response.entrys_amount;
        dispatch(actions.setAmount(response.entrys_amount));
    });

    const fetchEntrysAll = async () => {
        let step = 5;
        let cur = 0;
        while (true) {
            sendData.data = {
                ...curPage,
                data_start: cur * step,
                data_end: (cur + 1) * step
            }
            await fetchEntrys();
            cur += 1;
            if (cur >= window.entrysAmount / step) break;
        }
        setLoading(false);
    }

    useEffect(() => {
        dispatch(actions.clearEntrys());
        fetchEntrysAll();
    }, [location]);

    return (
        <div>
            <EntryList entrys={entrys}></EntryList>
            {loading && <PageLoading/>}
        </div>
    );
};

export default ListView;