import React, { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../../Context/authContext";
import { useAuthorizationHeader } from "../../Hooks/AuthHook/auth.hook";
import { useGetRequest } from "../../Hooks/ServerRequestHooks/serverRequestHooks";
import List from "../../List/list";
import ListItem from "../../ListItem/listItem";
import Loader from "../../Loader/loader";
import { Link, useHistory } from "react-router-dom";


function LinksPage(props) {
    const [links, setLinks] = useState([]);
    const { token, logout } = useContext(AuthContext);
    const history = useHistory();
    const authorizationHeader = useAuthorizationHeader(token);

    const { isLoading, request } = useGetRequest({ url: `api/link/` });

    useEffect(() => {
        async function getLinks() {
            try {
                const resultData = await request({ headers: authorizationHeader });

                if (resultData && resultData.links) {
                    setLinks(resultData.links);
                } else if (resultData && resultData.tokenExpired) {
                    logout();
                    history.push("/"); // redirect to the main page;
                }
            } catch (error) {
                debugger;
            }
        };

        getLinks();
    }, [authorizationHeader, request, logout, history]);

    const listItems = useMemo(() => {
        return links.map((link, i) => {
            return (
                <ListItem classNames="c-links__list-item" key={link.date}>
                    <dl className="c-links__data-list">
                        <div className="c-links__field">
                            <dt className="c-links__title">No:</dt>
                            <dd className="c-links__data">{i + 1}</dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Original Link:</dt>
                            <dd className="c-links__data"><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Shortened Link:</dt>
                            <dd className="c-links__data"><a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Open:</dt>
                            <dd className="c-links__data">
                                <Link to={`/details/${link._id}`}>Link Page</Link>
                            </dd>
                        </div>
                    </dl>
                </ListItem>
            );
        });
    }, [links]);

    if (isLoading) {
        return <Loader isLoading={isLoading} />
    }

    return (
        <section className="c-links" id="linksPage">
            <h2>Links Page</h2>
            {!listItems.length && <p>No links created yet.</p>}
            <List classNames="c-links__list">{listItems}</List>
        </section>
    )
};

export default LinksPage; 