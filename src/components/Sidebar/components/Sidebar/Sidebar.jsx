import React, {useRef, useState} from 'react';
import GooglePicker from "components/GooglePicker/GooglePicker";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";
import SidebarList from "../List/SidebarList";
import "./Sidebar.scss";
import "../Link/SidebarLink.scss";
import AuthContainer from "modules/Authorization/AuthContainer";
import Slider from "ui/Slider/Slider";
import {useAddEvent} from "hooks/useAddEvent";
import {getElementFromCursor} from "../../../../helpers/events";
import {useSwipeable} from "react-swipeable";
import {config} from "../../../../ui/Swipes/config";

const Sidebar = ({data, picker}) => {
    const [isOpened, setOpened] = useState(true);
    const ref = useRef();
    const opRef = useRef();
    opRef.current = isOpened;

    function close() {
        setOpened(false);
        setTimeout(() => {
            ref.current.style.display = 'none';
        }, 250);
    }

    const togglers = [
        {
            element: <WindowButton type={'open'} style={{visibility: isOpened ? "hidden": "visible"}}/>,
            action: 'open',
            callback: () => {
                ref.current.style.display = 'block';
                setOpened(true);
            },
        },
        {
            element: <WindowButton type={'close'} style={{visibility: isOpened ? "visible": "hidden"}}/>,
            action: 'close',
            callback: close,
        },
    ];

    const swipeClose = useSwipeable({
        onSwiped: (eventData) => {
            console.log(eventData)
            if (eventData.dir === 'Left' && opRef.current) setOpened(false);
        },
        ...config,
    });

    const swipeOpen = useSwipeable({
        onSwiped: (eventData) => {
            if (eventData.dir === 'Right' && !opRef.current) setOpened(true);
        },
        ...config,
    });

    function toggleSidebar(event) {
        const el = getElementFromCursor(event, 'sidebar');
        if (!el && opRef.current)
            close();
    }

    useAddEvent("sidebar:toggle", toggleSidebar);
    useAddEvent("mousedown", toggleSidebar);
    useAddEvent("touchstart", toggleSidebar);

    return (
        <div className="sidebar" {...swipeClose}>
            <Slider togglers={togglers} opened={150} closed={0} defaultOpened={isOpened}>
                <div className="sidebar__wrapper" ref={ref}>
                    <div className="sidebar__inner">
                        <AuthContainer></AuthContainer>
                        {picker && <GooglePicker className={"sidebar__link"} style={{marginTop: 5}}>Хранилище</GooglePicker>}
                        <SidebarList list={data}></SidebarList>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Sidebar;