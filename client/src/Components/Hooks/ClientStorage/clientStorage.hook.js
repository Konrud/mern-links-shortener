import { useCallback } from "react";


function useClientStorage() {

    const getData = useCallback((key) => {
        return localStorage.getItem(key);
    }, []);

    const setData = useCallback((key, value) => {
        return localStorage.setItem(key, value);
    }, []);

    const removeData = useCallback((key) => {
        return localStorage.removeItem(key);
    }, []);

    return [getData, setData, removeData];
}


export default useClientStorage;