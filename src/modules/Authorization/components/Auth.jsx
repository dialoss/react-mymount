import React from 'react';
import "./Auth.scss";
import AuthButton from "./AuthButton";
import {useGoogleLogin} from "@react-oauth/google";
import {sendLocalRequest} from "../../../api/requests";
import {useDispatch} from "react-redux";
import {actions} from "../store/user/reducers";

const Auth = ({user, logout, children}) => {
    const dispatch = useDispatch();
    const setUser = (v) => dispatch(actions.setUser(v));
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            sendLocalRequest('/api/user/login/', {token: tokenResponse.access_token}, 'POST').then(data => {
                if (data.auth) {
                    setUser(data.user);
                }
            });
        },
    });
    return (
        <div className={"auth"}>
            <div className={"user-profile"}>
                {!user &&
                    <AuthButton type={'signin'} callback={login} onClick={() => login()}>
                        Вход
                    </AuthButton>
                }
                {user && <>
                    {children}
                    <img src={user.picture} alt=""/>
                    <h3>{user.name}</h3>
                    <AuthButton type={'signout'} callback={logout}>Выйти</AuthButton>
                </>}
            </div>

        </div>
    );
};

export default Auth;