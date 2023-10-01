import React, {useState} from 'react';
import {GoogleLogin, googleLogout, useGoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import "./Auth.scss";

const Auth = () => {
    const login = useGoogleLogin({
        onSuccess: async (credentials) => {
            const url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + credentials.access_token;
            fetch(url).then(res => res.json()).then(data => setUser(data));
        },
        onError: () => {
            console.log('error');
        },
        login_uri: 'https://127.0.0.1:8000/oauth2callback/'
    });

    const [user, setUser] = useState(null);
    function logout() {
        googleLogout();
        setUser(null);
    }

    return (
        <div className={"auth"}>
            {!user &&
                // <GoogleLogin
                //     login_uri={'https://127.0.0.1:8000/oauth2callback/'}
                //     native_login_uri={'https://127.0.0.1:8000/oauth2callback/'}
                //     shape={'pill'}
                //     size={'medium'}
                //     text={'signin'}
                //     onSuccess={credentialResponse => {
                //         let json = jwt_decode(credentialResponse.credential);
                //         console.log(json)
                //         setUser(json);
                //     }}
                //     onError={() => {
                //         console.log('Login Failed');
                //     }}
                // />
                <button className={"auth-button auth-button--signin"} onClick={() => login()}>
                    Sign in with Google
                </button>
            }
            {user &&
                <div className={"user-profile"}>
                    <img src={user.picture} alt=""/>
                    <h3>{user.name}</h3>
                    <button onClick={logout} className={"auth-button auth-button--signout"}>Sign Out</button>
                </div>
            }
        </div>
    );
};

export default Auth;