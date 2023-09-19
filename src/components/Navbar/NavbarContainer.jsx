import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {NavbarRoutes} from "./routes";
import {useMyLocation} from "hooks/useMyLocation";

const NavbarContainer = () => {
    const location = useMyLocation();
    return (
        <Navbar routes={NavbarRoutes} location={location}/>
    );
};

export default NavbarContainer;