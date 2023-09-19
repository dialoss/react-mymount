import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";

const Components = {
    'EntrysPage': <EntrysPage/>,
    'Main': <Intro/>,
};

const AppRoutes = () => {
    return (
        <Routes>
            {
                routes.map((route) => <Route element={Components[route.component]}
                                             path={route.path}
                                             exact={route.exact}
                                             key={route.path}/>)
            }
            <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
        </Routes>
    );
};

export default AppRoutes;