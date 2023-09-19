import React, {useLayoutEffect} from 'react';
import {BrowserRouter, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import AppRoutes from "./AppRoutes";

const AppRouter = () => {
    const location = useNavigate();
    const dispatch = useDispatch();
    useLayoutEffect(() => {

    }, [location]);

    return (
        <BrowserRouter>
           <AppRoutes/>
        </BrowserRouter>
    );
};

export default AppRouter;