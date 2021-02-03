import React, { useState } from "react";

function CreateLinkForm(props) {
    const { handleSubmit, buttonTitle = "create", id = `Form${new Date().getMilliseconds()}`, isLoading, forwardedLinkRef } = props;
    const [formState, setFormState] = useState({ link: "" });

    const createLinkInputID = `createLinkInput${id}`;

    function handleFormSubmit(e) {
        handleSubmit(formState.link);
        e.preventDefault();
    }

    function handleChange(e) {
        const input = e.target;
        setFormState({ ...formState, [input.name]: input.value });
    }

    return (
        <form className="c-create-link-form" onSubmit={handleFormSubmit} id={id}>
            <fieldset className="c-create-link-form__fieldset">
                <label className="c-create-link-form__label" htmlFor={createLinkInputID}>Create Link</label>
                <input className="c-create-link-form__input" value={formState.link} type="text" ref={forwardedLinkRef} name="link" onChange={handleChange} id={createLinkInputID} autoComplete="off" />
            </fieldset>
            <fieldset className="c-create-link-form__fieldset">
                <button className="c-create-link-form__button" disabled={isLoading}>{buttonTitle}</button>
            </fieldset>
        </form>
    );
}

export default CreateLinkForm;