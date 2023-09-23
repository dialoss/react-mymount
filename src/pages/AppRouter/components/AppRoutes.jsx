import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {useMyLocation} from "hooks/useMyLocation";
import {addTheme, removeTheme} from "helpers/themes";

const Components = {
    'EntrysPage': EntrysPage,
    'Main': Intro,
};

const PageWrapper = ({route}) => {
    const location = useMyLocation();
    addTheme("listStyle", route.style);
    useLayoutEffect(() => {
        removeTheme("listStyle");
        addTheme("listStyle", route.style);
    }, [location])
    
    return (
        <>
            {React.createElement(Components[route.component], {key: route.path})}
        </>
    );
};

const AppRoutes = () => {
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