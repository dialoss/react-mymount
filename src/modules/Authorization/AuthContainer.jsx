import React from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import Auth from "./components/Auth";
const CLIENT_ID = '1024510478167-dufqr18l2g3nmt7gkr5rakc9sjk5nf54.apps.googleusercontent.com';

const AuthContainer = () => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Auth></Auth>
        </GoogleOAuthProvider>
    );
};

export default AuthContainer;