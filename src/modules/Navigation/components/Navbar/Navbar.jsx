import React from 'react';
import NavButton from "components/Navigation/NavButton";
import 'styles/navigation/Navbar.scss';
import {useSelector} from "react-redux";

const NavbarRoutes = [
    {path:'/main/',         text:'главная'},
    {path:'/models/',       text:'модели'},
    {path:'/orders/',       text:'заказы'},
    {path:'/parts/',        text:'детали'},
    {path:'/blueprints/',   text:'чертежи'},
    {path:'/shop/',         text:'в продаже'},
]

const Navbar = () => {
    const location = useSelector((state) => state.location);
    return (
        <div className={"navbar"}>
            {NavbarRoutes.map((navData, index) => {
                const isActive = (location.relativeURL.split('/')[1] === navData.path.split('/')[1]);
                return <NavButton active={isActive} navData={navData} key={index}/>
            })}
        </div>
    );
};

export default Navbar;