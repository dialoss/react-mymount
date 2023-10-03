import React from 'react';
import GooglePicker from "components/GooglePicker/GooglePicker";
import WindowButton from "ui/Buttons/WindowButton/WindowButton";
import SidebarList from "../List/SidebarList";
import {SidebarStates} from "./constants";
import "./Sidebar.scss";
import "../Link/SidebarLink.scss";
import AuthContainer from "modules/Authorization/AuthContainer";

const Sidebar = ({data, picker, windowCallback}) => {
    let isOpened = true
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <WindowButton style={SidebarStates[isOpened]['btn_open']} type={'open'}
                                 onClick={() => windowCallback(true)}></WindowButton>
                <WindowButton style={SidebarStates[isOpened]['btn_close']} type={'close'}
                                onClick={() => windowCallback(false)}></WindowButton>
            </div>
            <div className="sidebar__wrapper" style={SidebarStates[isOpened]['wrapper']}>
                <div className="sidebar__inner">
                    <AuthContainer></AuthContainer>
                    {picker && <GooglePicker className={"sidebar__link"}>Хранилище</GooglePicker>}
                    <SidebarList list={data}></SidebarList>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;