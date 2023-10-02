import React, {useEffect} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import Auth from "./components/Auth";
import {useCredentials} from "hooks/useCredentials";
import Credentials from "./api/googleapi";

const AuthContainer = () => {
    useEffect(() => {
        Credentials.fetch();
    }, []);

    const credentials = useCredentials();
    return (
        <GoogleOAuthProvider clientId={credentials.CLIENT_ID}>
            <Auth></Auth>
        </GoogleOAuthProvider>
    );
};

export default AuthContainer;