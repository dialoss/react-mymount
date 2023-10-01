import React, {useEffect} from 'react';
import {googleLogout, useGoogleLogin} from '@react-oauth/google';
import "./Auth.scss";
import AuthButton from "./AuthButton";
import {sendLocalRequest} from "api/requests";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "modules/User/store/reducers";

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
        login_uri: 'https://127.0.0.1:8000/oauth2callback/'
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
            {!user &&
                <AuthButton type={'signin'} callback={login}>Авторизация</AuthButton>
            }
            {user &&
                <div className={"user-profile"}>
                    <img src={user.picture} alt=""/>
                    <h3>{user.name}</h3>
                    <AuthButton callback={logout} type={'signout'}>Выход</AuthButton>
                </div>
            }
        </div>
    );
};

export default Auth;