import React from "react";
import AuthContext from "../../Context/authContext";
import { useAuth } from "../Hooks/AuthHook/auth.hook";
import useRoutes from "../Routes/routes";
import Navbar from "../Navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "../Loader/loader";

function App(props) {
    debugger;
    const { login, logout, token, userID, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader isLoading={!ready} />
    }

    return (
        <AuthContext.Provider value={{ login, logout, token, userID, isAuthenticated }}>
            <Router>
                {isAuthenticated && <Navbar />}
                {routes}
            </Router>
        </AuthContext.Provider>
    );
}


export default App;