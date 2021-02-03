import React from "react";

const AuthContext = React.createContext({
    token: null,
    userID: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false
});


export default AuthContext;

