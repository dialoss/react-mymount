import React, {useEffect} from 'react';
import Auth from "./components/Auth";
import Credentials from "./api/googleapi";

const AuthContainer = () => {
    useEffect(() => {
        Credentials.fetch();
    }, []);

    return (
        <Auth></Auth>
    );
};

export default AuthContainer;