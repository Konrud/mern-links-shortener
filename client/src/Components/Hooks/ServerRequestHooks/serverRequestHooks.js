import { useCallback, useState } from "react";

function useGetRequest(requestOpts) {
    const url = `${requestOpts.url}`;
    return _useRequest(url, { method: "GET" });
}

function usePostRequest(requestOpts) {
    const url = `${requestOpts.url}`;
    const headers = requestOpts.headers || {};
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    return _useRequest(url, { method: "POST", headers: headers });
}

function _useRequest(url, options) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = useCallback((requestOptions) => {
        async function makeRequest() {
            try {
                setIsLoading(true);
                debugger;
                const mergedOptions = _mergeOptions(options, requestOptions);
                const response = await fetch(url, mergedOptions);
                const resultObj = await ((options.responseType === "text") ? response.text() : response.json());
                if (response.ok) {
                    setResult(resultObj);
                    setError(null);
                } else {
                    setError(`Error: ${resultObj.message}`);
                }
                return resultObj;
            } catch (e) {
                setError(`Exception Error: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        return makeRequest();
    }, [url]);

    return { result, error, isLoading, request };
}

function _mergeOptions(options, newOptions) {
    const defaultOptions = { ...options };
    for (const prop in newOptions) {
        const objPropValue = defaultOptions[prop];
        if (defaultOptions.hasOwnProperty(prop) && (typeof objPropValue === "object")) {
            defaultOptions[prop] = Object.assign({}, defaultOptions[prop], newOptions[prop]);
        } else if (defaultOptions.hasOwnProperty(prop) && Array.isArray(objPropValue)) {
            defaultOptions[prop] = objPropValue.concat(newOptions[prop]);
        } else {
            defaultOptions[prop] = newOptions[prop];
        }
    }
    return defaultOptions;
}

export { useGetRequest, usePostRequest };
