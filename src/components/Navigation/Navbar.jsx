import React from 'react';
import NavButton from "components/Navigation/NavButton";
import 'styles/navigation/Navbar.scss';
import {routes} from "router/index";
import {useMyLocation} from "hooks/useMyLocation";

const Navbar = () => {
    let myLocation = useMyLocation();
    return (
        <div className={"navbar"}>
            {routes.map((navData, index) => {
                return <NavButton active={myLocation.relativeURL === navData.path} navData={navData} key={index}/>
            })}
        </div>
    );
};

export default Navbar;