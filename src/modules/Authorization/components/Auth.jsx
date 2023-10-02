import React, {useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import "./Auth.scss";
import AuthButton from "./AuthButton";
import {sendLocalRequest} from "api/requests";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "modules/User/store/reducers";
import {Link} from "react-router-dom";

const Auth = () => {
    const user = useSelector(state => {
        if (!state.user.email) return null;
        return state.user;
    });
    const dispatch = useDispatch();
    const login = useGoogleLogin({
        onSuccess: async (credentials) => {
            const token = credentials.access_token;
            sendLocalRequest('/user/login/', {token}).then(data => {
                if (data.auth) {
                    dispatch(actions.setUser(data.user));
                }
            });
        },
        onError: () => {
            console.log('error');
        },
    });

    function logout() {
        googleLogout();
        dispatch(actions.setUser({}));
        sendLocalRequest('/user/logout/');
    }

    useEffect(() => {
        sendLocalRequest('/user/auth/').then(data => {
            if (data.auth) {
                dispatch(actions.setUser(data.user));
            }
        });
    }, []);

    return (
        <div className={"auth"}>
            <div className={"user-profile"}>
                {!user &&
                    <AuthButton type={'signin'} callback={login}>Вход</AuthButton>
                }
                {user && <>
                    <Link to={'/customer/'}></Link>
                    <img src={user.picture} alt=""/>
                    <h3>{user.name}</h3>
                    <AuthButton type={'signout'} callback={logout}>Выйти</AuthButton>
                </>
                }
            </div>
        </div>
    );
};

export default Auth;