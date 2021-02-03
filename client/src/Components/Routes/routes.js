import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/auth.page";
import CreatePage from "../Pages/CreatePage/create.page";
import DetailsPage from "../Pages/DetailsPage/details.page";
import LinksPage from "../Pages/LinksPage/links.page";

function useRoutes(isAuthenticated) {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/details/:id">
                    <DetailsPage />
                </Route>
                {/* default */}
                <Redirect to="/create" />
            </Switch>
        );
    }

    // else if user isn't authenticated
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            {/* default */}
            <Redirect to="/" />
        </Switch>
    );
}

export default useRoutes;