import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {routes} from "router/index";

const AppRouter = () => {
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