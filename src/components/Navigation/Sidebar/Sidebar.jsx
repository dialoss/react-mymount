import React, {useEffect, useState} from 'react';
import SidebarList from "./SidebarList";
import 'styles/navigation/sidebar/Sidebar.scss';
import ButtonComponent from "components/UI/Buttons/ButtonComponent";
import {useFetching} from "hooks/useFetching";
import sendRequest from "scripts/network/requests";
import {baseURL} from "store/reducers/location";
import GooglePicker from "components/Utils/GooglePicker";

const SidebarStates = {
    true: {
        btn_open: {
            visibility: "hidden"
        },
        btn_close: {
            visibility: "visible"
        },
        wrapper: {
            transform: "translate(0, 0)",
            visibility: "visible",
        }
    },
    false: {
        btn_open: {
            visibility: "visible"
        },
        btn_close: {
            visibility: "hidden"
        },
        wrapper: {
            transform: "translate(-100%, 0)",
            visibility: "hidden",
        }
    }
}

const Sidebar = () => {
    const [pages, setPages] = useState([]);

    const [getPages, s1, s2] = useFetching(async () => {
        const response = await sendRequest(baseURL + '/get_static_data/', {});
        setPages(response.pages);
    });
    useEffect(() => {
        getPages();
    }, []);

    const [isOpened, setOpened] = useState(true);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <ButtonComponent style={SidebarStates[isOpened]['btn_open']} type={'open'}
                                 callback={() => setOpened(true)}></ButtonComponent>
                <ButtonComponent style={SidebarStates[isOpened]['btn_close']} type={'close'}
                                 callback={() => setOpened(false)}></ButtonComponent>
            </div>
            <div className="sidebar__wrapper" style={SidebarStates[isOpened]['wrapper']}>
                <div className="sidebar__inner">
                    <GooglePicker className={"sidebar__link"} text={"Хранилище"}/>
                    <SidebarList callback={null} pages={pages}></SidebarList>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;