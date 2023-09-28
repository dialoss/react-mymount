import React, {createContext, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {useMyLocation} from "hooks/useMyLocation";
import {triggerEvent} from "helpers/events";

const Components = {
    'EntrysPage': EntrysPage,
    'Main': Intro,
};
export const ActiveThemes = createContext([]);

const PageWrapper = ({route}) => {
    const location = useMyLocation();
    useEffect(() => {
        triggerEvent("themes:add", {name:'listStyle', path:route.style});
    }, []);

    return (
        <ActiveThemes.Provider value={{listStyle: route.style}}>
            {React.createElement(Components[route.component], {addComments: route.comments, key: location.relativeURL})}
        </ActiveThemes.Provider>
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