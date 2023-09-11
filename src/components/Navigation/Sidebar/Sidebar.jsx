import React from 'react';
import CloseButton from "components/UI/Buttons/CloseButton";
import BurgerButton from "components/UI/Buttons/BurgerButton";
import GooglePicker from "components/Utils/GooglePicker";
import SidebarList from "./SidebarList";
import 'styles/navigation/sidebar/Sidebar.scss';
import ButtonComponent from "../../UI/Buttons/ButtonComponent";

const Sidebar = ({pagesTree}) => {
    function toggleSidebar() {

    }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <ButtonComponent type={'burger'} callback={() => toggleSidebar(true)}></ButtonComponent>
                <ButtonComponent type={'close'} callback={() => toggleSidebar(false)}></ButtonComponent>
            </div>
            <div className="sidebar__wrapper">
                <div className="sidebar__inner">
                    <GooglePicker/>
                    <SidebarList pages={pagesTree}></SidebarList>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;