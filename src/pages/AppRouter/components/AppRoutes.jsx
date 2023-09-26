import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {ThemeContext} from "ui/Themes";
import {useThemes} from "hooks/useThemes";
import {useMyLocation} from "hooks/useMyLocation";

const Components = {
    'EntrysPage': EntrysPage,
    'Main': Intro,
};

const PageWrapper = ({route}) => {
    const activeThemes = useThemes({listStyle:route.style});
    const location = useMyLocation();

    return (
        <ThemeContext.Provider value={activeThemes}>
            {React.createElement(Components[route.component], {addComments: route.comments, key: location.relativeURL})}
        </ThemeContext.Provider>
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