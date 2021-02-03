import { useCallback, useEffect, useMemo, useState } from "react";
import useClientStorage from "../ClientStorage/clientStorage.hook";

const LOGIN_KEY = "userLoginData";

function useAuth() {
    debugger;
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [ready, setReady] = useState(false);
    const [getData, setData, removeData] = useClientStorage();

    const login = useCallback((jwtToken, userId) => {
        setToken(jwtToken);
        setUserID(userId);
        setData(LOGIN_KEY, JSON.stringify({ token: jwtToken, userId }));
    }, [setData]);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        removeData(LOGIN_KEY);
    }, [removeData]);

    useEffect(() => {
        const loginData = getData(LOGIN_KEY);
        if (loginData) {
            const loginObjData = JSON.parse(loginData);
            if (loginObjData) {
                login(loginObjData.token, loginObjData.userId);
            }
        }
        setReady(true);
    }, [login, getData]);

    return { login, logout, token, userID, ready };
}

function useAuthorizationHeader(token) {

    const authorizationHeader = useMemo(() => {
        return { authorization: `BEARER ${token}` };
    }, [token]);

    return authorizationHeader;
}

export { useAuth, useAuthorizationHeader };