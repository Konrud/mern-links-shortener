import React from "react";


function LinkCard(props) {
    const { link } = props;

    return (
        <section className="c-link-card">
            <dl className="c-link-card__data-list">
                <div className="c-link-card__field">
                    <dt className="c-link-card__title">Shortened Link:</dt>
                    <dd className="c-link-card__data"><a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></dd>
                </div>
                <div className="c-link-card__field">
                    <dt className="c-link-card__title">Original Link:</dt>
                    <dd className="c-link-card__data"><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></dd>
                </div>
                <div className="c-link-card__field">
                    <dt className="c-link-card__title">Clicks:</dt>
                    <dd className="c-link-card__data"><strong>{link.clicks}</strong></dd>
                </div>
                <div className="c-link-card__field">
                    <dt className="c-link-card__title">Created on:</dt>
                    <dd className="c-link-card__data"><time dateTime={new Date(link.date).toLocaleDateString()}>{new Date(link.date).toLocaleDateString()}</time></dd>
                </div>
            </dl>
        </section>
    );
}


export default LinkCard;
