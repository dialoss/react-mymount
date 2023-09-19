import React, {useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";
import {EntrysPage} from "pages/EntrysPage";
import {Intro} from "pages/MainPage";
import {TemplatePage} from "pages/TemplatePage";
import {useDispatch} from "react-redux";
import {actions} from "helpers/location/reducers";

const Components = {
    'EntrysPage': <EntrysPage/>,
    'Main': <Intro/>,
};

const AppRoutes = () => {
    const location = useNavigate();
    const dispatch = useDispatch();
    dispatch(actions.setLocation());
    useLayoutEffect(() => {
        dispatch(actions.setLocation());
    }, [location]);

    return (
        <Routes>
            {
                routes.map((route) =>
                    <Route element={<TemplatePage>
                                        {Components[route.component]}
                                    </TemplatePage>}
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