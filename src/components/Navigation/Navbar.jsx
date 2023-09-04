import React from 'react';
import NavButton from "components/Navigation/NavButton";
import 'styles/navigation/Navbar.css';

const Navbar = ({navDatas}) => {
    return (
        <div className={"navbar"}>
            {navDatas.map((navData, index) => {
                return <NavButton navData={navData} key={index}/>
            })}
        </div>
    );
};

export default Navbar;