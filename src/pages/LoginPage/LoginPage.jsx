import React, {useEffect, useRef} from 'react';
import {fetchLoginForm} from "./api/fetchLoginForm";

const LoginPage = () => {
    const ref = useRef();
    const loginForm = fetchLoginForm();
    useEffect(() => {
        loginForm.then(data => {
            ref.current.innerHTML = data.form;
        })
    }, []);
    return (
        <div ref={ref}>
        </div>
    );
};

export default LoginPage;