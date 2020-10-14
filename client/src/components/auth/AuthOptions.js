import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext);

    //🔥 useHistory a react hook function that let us interact with history which means the URL for navigation. 
    const history = useHistory();
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <nav className="nav-menu">
            {userData.user ? (
                <button onClick={logout} className="b1">log out</button>
            ) : (
                    <>
                        <button onClick={login} className="b1">login</button>
                        <button onClick={register} className="b1">sign up</button>
                    </>
                )}
        </nav>
    )
}

export default AuthOptions
