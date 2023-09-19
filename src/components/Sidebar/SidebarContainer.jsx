import React, {useEffect, useState} from 'react';

import {sendLocalRequest} from "api/requests";
import Sidebar from "./components/Sidebar/Sidebar";

const SidebarContainer = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await sendLocalRequest('/get_static_data/', {});
            setPages(response.pages);
        })();
    }, []);

    const [isOpened, setOpened] = useState(true);

    return (
        <Sidebar isOpened={isOpened} windowCallback={setOpened} data={{sublist:pages, depth:-1}} key={pages.length}/>
    );
};

export default SidebarContainer;