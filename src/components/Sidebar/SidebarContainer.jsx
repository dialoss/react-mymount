import React, {useEffect, useState} from 'react';

import {sendLocalRequest} from "api/requests";
import Sidebar from "./components/Sidebar/Sidebar";
import {actions} from "helpers/location/reducers";
import {useDispatch} from "react-redux";

const SidebarContainer = () => {
    const [pages, setPages] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const response = await sendLocalRequest('/get_static_data/');
            setPages(response.pages_tree);
            dispatch(actions.setPages(response.pages_list));
        })();
    }, []);

    const [isOpened, setOpened] = useState(true);

    return (
        <Sidebar isOpened={isOpened} windowCallback={setOpened} data={{sublist:pages, depth:-1}} key={pages.length}/>
    );
};

export default SidebarContainer;