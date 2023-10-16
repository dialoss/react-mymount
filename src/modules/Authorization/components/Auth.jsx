import React, {useEffect, useRef} from 'react';
import "./Auth.scss";
import AuthButton from "./AuthButton";
import {sendLocalRequest} from "api/requests";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "modules/User/store/reducers";
import {Link} from "react-router-dom";
import {useCredentials} from "hooks/useCredentials";

const Auth = () => {
    const credentials = useCredentials();
    const credRef = useRef();
    credRef.current = credentials;
    const user = useSelector(state => {
        if (!state.user.email) return null;
        return state.user;
    });
    const dispatch = useDispatch();
    const ref = useRef();

    function init() {
        const id = credRef.current.CLIENT_ID;
        if (id === '*') return;
        console.log(id)
        window.google.accounts.id.initialize({
            client_id: '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com',
            callback: (data) => {
                sendLocalRequest('/api/user/login/', {data:{token: data.credential}}).then(data => {
                    if (data.auth) {
                        dispatch(actions.setUser(data.user));
                    }
                });
            }
        });
        window.google.accounts.id.renderButton(ref.current, {type:'icon'});
    }

    function login() {
        window.google.accounts.id.prompt();
    }

    function logout() {
        dispatch(actions.setUser({}));
        sendLocalRequest('/api/user/logout/');
    }

    useEffect(() => {
        sendLocalRequest('/api/user/auth/').then(data => {
            if (data.auth) {
                dispatch(actions.setUser(data.user));
            }
        });
        let client = document.createElement("script");
        client.onload = () => init();
        client.src = "https://accounts.google.com/gsi/client";
        client.setAttribute("defer", "defer");
        document.head.append(client);
    }, []);
    
    return (
        <div className={"auth"}>
            <div className={"user-profile"}>
                {!user &&
                    <AuthButton type={'signin'} callback={login}>
                        <div ref={ref}></div>
                        Вход
                    </AuthButton>
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