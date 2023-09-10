import React, {useEffect} from 'react';
import EntryList from "components/Entry/EntryList";
import sendRequest from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import PageLoading from "./PageLoading";
import {useMyLocation} from "hooks/useMyLocation";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/entrys";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ListView = () => {
    const dispatch = useDispatch();
    const entrys = useSelector((state) => state.entrys.entrys);
    const entrysAmount = useSelector((state) => state.entrys.entrysAmount);

    let myLocation = useMyLocation();
    let curPage = {
        page_url: myLocation.relativeURL,
        page_slug: myLocation.pageSlug,
    }
    let sendData = {
        url: 'http://127.0.0.1:8000/ajax/',
        data: {
            ...curPage
        }
    };

    const [fetchEntrys, loading, setLoading] = useFetching(async () => {
        await sendRequest(sendData.url, sendData.data).then(res => res.json()).then(data => {
            dispatch(actions.addEntrys(data.entrys_data));
            window.entrysAmount = data.entrys_amount;
            dispatch(actions.setAmount(data.entrys_amount));
        });
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
        fetchEntrysAll();
    }, []);

    return (
        <div>
            <EntryList entrys={entrys}></EntryList>
            {loading && <PageLoading/>}
        </div>
    );
};

export default ListView;