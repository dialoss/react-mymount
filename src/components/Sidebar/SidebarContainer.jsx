import React, {useEffect, useState} from 'react';

import {sendLocalRequest} from "api/requests";
import Sidebar from "./components/Sidebar/Sidebar";
import {actions} from "helpers/location/reducers";
import {useDispatch} from "react-redux";
import {useUserAuth} from "hooks/useUserAuth";

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

    const userAuth = useUserAuth();

    return (
        <Sidebar picker={userAuth}
                 data={{sublist:pages, depth:-1}}
                 key={pages.length}/>
    );
};

export default SidebarContainer;