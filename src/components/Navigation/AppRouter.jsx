import React, {useEffect, useLayoutEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "router/index";
import {useDispatch} from "react-redux";
import {actions} from "store/reducers/location";

const AppRouter = () => {
    const location = useNavigate();
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(actions.setLocation());
    }, [location]);

    return (
        <div>
            <Routes>
                {
                    routes.map((route) =>
                        <Route element={route.component} path={route.path} exact={route.exact} key={route.path}/>
                    )
                }
                <Route path={'*'} element={<Navigate to={'/main/'}/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;