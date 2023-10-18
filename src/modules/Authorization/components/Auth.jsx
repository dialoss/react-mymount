import React from 'react';
import "./Auth.scss";
import AuthButton from "./AuthButton";

const Auth = React.forwardRef(function({user, login, logout, children}, ref) {
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
                    {children}
                    <img src={user.picture} alt=""/>
                    <h3>{user.name}</h3>
                    <AuthButton type={'signout'} callback={logout}>Выйти</AuthButton>
                </>
                }
            </div>

        </div>
    );
});

export default Auth;