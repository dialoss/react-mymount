import React, {useEffect} from 'react';
import EntryList from "components/Entry/EntryList";
import sendRequest from "scripts/network/requests";
import {useFetching} from "hooks/useFetching";
import PageLoading from "./PageLoading";
import {useMyLocation} from "hooks/useMyLocation";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "store/reducers/entrys";

const ListView = () => {
    const dispatch = useDispatch();
    const entrys = useSelector((state) => state.entrys.entrys);
    const entrysAll = useSelector((state) => state.entrys.entrysAll);

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

    const [fetchEntrys, loading] = useFetching(async () => {
        await sendRequest(sendData).then(res => res.json()).then(data => {
            dispatch(actions.addEntrys(data.entrys_data));
            dispatch(actions.setAmount(data.entrys_amount));
        });
    });

    async function fetchEntrysAll() {
        let step = 10;
        let cur = 0;
        while (true) {
            sendData.data = {
                ...curPage,
                data_start: cur * step,
                data_end: (cur + 1) * step
            }
            await fetchEntrys();
            cur += 1;
            if (cur >= entrysAll / step) break;
        }
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