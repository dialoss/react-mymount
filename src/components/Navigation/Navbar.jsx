import React from 'react';
import NavButton from "components/Navigation/NavButton";
import 'styles/navigation/Navbar.scss';
import {routes} from "router/index";
import {useSelector} from "react-redux";

const Navbar = () => {
    const location = useSelector((state) => state.location);
    return (
        <div className={"navbar"}>
            {routes.map((navData, index) => {
                return <NavButton active={location.relativeURL === navData.path} navData={navData} key={index}/>
            })}
        </div>
    );
};

export default Navbar;