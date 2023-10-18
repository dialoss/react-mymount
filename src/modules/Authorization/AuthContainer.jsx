import React, {useEffect, useRef, useState} from 'react';
import Auth from "./components/Auth";
import {sendLocalRequest} from "../../api/requests";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "./store/user/reducers";

const AuthContainer = () => {
    const ref = useRef();
    const user = useSelector(state => {
        if (!state.user.email) return null;
        return state.user;
    });
    const dispatch = useDispatch();
    const setUser = (v) => dispatch(actions.setUser(v));
    const [googleInited, setInited] = useState(false);

    function init() {
        window.google.accounts.id.initialize({
            client_id: '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com',
            callback: (data) => {
                console.log(data)
                sendLocalRequest('/api/user/login/', {token: data.credential}, 'POST').then(data => {
                    if (data.auth) {
                        setUser(data.user);
                    }
                });
            }
        });
        setInited(true);
        loginButton();
    }

    function loginButton() {
        window.google.accounts.id.renderButton(ref.current, {type:'icon'});
    }

    function login() {
        window.google.accounts.id.prompt();
    }

    function logout() {
        setUser({authenticated: false});
        sendLocalRequest('/api/user/logout/');
    }

    useEffect(() => {
        sendLocalRequest('/api/user/auth/').then(data => {
            if (data.auth) {
                setUser(data.user);
            }
        });
        let client = document.createElement("script");
        client.onload = () => init();
        client.src = "https://accounts.google.com/gsi/client";
        client.setAttribute("defer", "defer");
        document.head.append(client);
    }, []);
    useEffect(() => {
        googleInited && loginButton();
    }, [user]);

    return (
        <Auth user={user} login={login} logout={logout} ref={ref}></Auth>
    );
};

export default AuthContainer;