import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {useMyLocation} from "hooks/useMyLocation";
import {triggerEvent} from "helpers/events";
import CustomerPage from "pages/CustomerPage/components/CustomerPage";
import {useAddEvent} from "../../../hooks/useAddEvent";

const Components = {
    'EntrysPage': EntrysPage,
    'Main': Intro,
    'CustomerPage': CustomerPage,
};

const PageWrapper = ({route}) => {
    const location = useMyLocation();
    useEffect(() => {
        triggerEvent("themes:add", {name:'listStyle', path:route.style, clear:true, active:true});
    }, []);

    document.title = "MyMount | " + location.pageTitle;

    return (
        <>
            {React.createElement(Components[route.component], {addComments: route.comments, key: location.relativeURL})}
        </>
    );
};

const AppRoutes = () => {
    const navigate = useNavigate();

    function handleNavigate(event) {
        navigate(event.detail.path);
    }

    useAddEvent("router:navigate", handleNavigate)


    return (
        <Routes>
            {
                routes.map((route) =>
                    <Route element={<PageWrapper route={route} key={route.path}/>}
                           path={route.path}
                           exact={route.exact}
                           key={route.path}/>
                )
            }
            <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
        </Routes>
    );
};

export default AppRoutes;