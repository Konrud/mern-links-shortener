import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import { useAuthorizationHeader } from "../../Hooks/AuthHook/auth.hook";
import { useGetRequest } from "../../Hooks/ServerRequestHooks/serverRequestHooks";
import LinkCard from "../../LinkCard/linkCard";
import Loader from "../../Loader/loader";


function DetailsPage(props) {
    const [link, setLink] = useState(null);
    const { token, logout } = useContext(AuthContext);
    const history = useHistory();
    const authorizationHeader = useAuthorizationHeader(token);
    const linkID = useParams()?.id; // get id from the location value [<Route path="/details/:id">] (e.g. http://localhost:8080/details/6011443ecc3024f1f3314601)

    const getRequestOptions = useMemo(() => {
        return { url: `/api/link/${linkID}` };
    }, [linkID]);

    const { isLoading, request } = useGetRequest(getRequestOptions);

    const getLinkData = useCallback(async () => {
        try {
            const linkData = await request({ headers: authorizationHeader });

            if (linkData && linkData.tokenExpired) {
                logout();
                history.push("/"); // redirect to the main page;
            }

            setLink(linkData);
        } catch (e) {
            debugger;
        }
    }, [authorizationHeader, request, logout, history]);

    useEffect(() => {
        getLinkData();
    }, [getLinkData]);

    if (isLoading) {
        return <Loader isLoading={isLoading} />
    }

    return (
        <section id="detailsPage">
            <h2>Details Page</h2>
            {link && <LinkCard link={link} />}
        </section>
    )
};

export default DetailsPage; 