import React, { useCallback, useRef, useEffect, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import Toast from "../../../Toast/toast";
import CreateLinkForm from "../../Forms/CreateLinkForm/createLinkForm";
import { usePostRequest } from "../../Hooks/ServerRequestHooks/serverRequestHooks";
import { useAuthorizationHeader } from "../../Hooks/AuthHook/auth.hook";


function CreatePage(props) {
    const authContext = useContext(AuthContext);
    const authorizationHeader = useAuthorizationHeader(authContext.token);
    const history = useHistory();
    const { isLoading, error, request } = usePostRequest({ url: "api/link/generate" });
    const forwardedLinkInputRef = useRef();

    const createToast = useMemo(() => {
        return Toast.Init({
            title: "Error",
            position: "left-bottom",
            direction: "from-top"
        });
    }, []);

    useEffect(() => {
        forwardedLinkInputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (error) {
            debugger;
            createToast.options.message = error;
            createToast.Show();
        }
    }, [error, createToast]);

    const handleCreateLink = useCallback(async (linkVal) => {

        try {
            const resultObj = await request({ body: JSON.stringify({ from: linkVal }), headers: authorizationHeader });

            if (resultObj && resultObj.link && resultObj.link._id) {
                // redirect to the details page
                history.push(`/details/${resultObj.link._id}`);
            } else {
                createToast.options.message = `Link could not be created: ${resultObj && resultObj.message}`;
                createToast.Show();
                if (resultObj && resultObj.tokenExpired) {
                    authContext.logout();
                    history.push("/"); // redirect to the main page;
                }
            }
        } catch (e) {
            debugger;
            createToast.options.message = e.message;
            createToast.Show();
        }
    }, [authContext, authorizationHeader, createToast, history, request]);


    return (
        <section className="c-create-page" id="createPage">
            <h2>Create Page</h2>
            <article className="c-create-page__content">
                <CreateLinkForm forwardedLinkRef={forwardedLinkInputRef} handleSubmit={handleCreateLink} isLoading={isLoading}></CreateLinkForm>
            </article>
        </section>
    )
};

export default CreatePage; 