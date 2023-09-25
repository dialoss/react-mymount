import React, {useLayoutEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {ThemeContext} from "ui/Themes";
import store from "../../../store";
import {actions} from "../../../helpers/themes/themes";
import {useAddEvent} from "../../../hooks/useAddEvent";
import editStyle from "../../../ui/Themes/edit.module.scss";
import {useThemes} from "hooks/useThemes";

const Components = {
    'EntrysPage': EntrysPage,
    'Main': Intro,
};

const PageWrapper = ({route}) => {
    const activeThemes = useThemes({listStyle:route.style});

    return (
        <ThemeContext.Provider value={activeThemes}>
            {React.createElement(Components[route.component], {addComments: route.comments, key: route.path})}
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