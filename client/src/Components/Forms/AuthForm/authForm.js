import React, { useState } from "react";

function AuthForm(props) {
    const { handleSubmit, buttonTitle = "submit", id = `Form${new Date().getMilliseconds()}`, isLoading, forwardedEmailRef } = props;
    const [formState, setFormState] = useState({ email: "", password: "" });

    const emailInputID = `authEmailInput${id}`;
    const passwordInputID = `authPasswordInput${id}`;

    function handleFormSubmit(e) {
        handleSubmit(formState);
        e.preventDefault();
    }

    function handleChange(e) {
        const input = e.target;
        setFormState({ ...formState, [input.name]: input.value });
    }

    return (
        <form className="c-auth-form" onSubmit={handleFormSubmit} id={id}>
            <fieldset className="c-auth-form__fieldset">
                <label className="c-auth-form__label" htmlFor={emailInputID}>Email</label>
                <input className="c-auth-form__input" value={formState.email} type="email" ref={forwardedEmailRef} name="email" onChange={handleChange} id={emailInputID} autoComplete="email" />
            </fieldset>
            <fieldset className="c-auth-form__fieldset">
                <label className="c-auth-form__label" htmlFor={passwordInputID}>Password</label>
                <input className="c-auth-form__input" value={formState.password} type="password" name="password" onChange={handleChange} id={passwordInputID} autoComplete="off" />
            </fieldset>
            <fieldset className="c-auth-form__fieldset">
                <button className="c-auth-form__button" disabled={isLoading}>{buttonTitle}</button>
            </fieldset>
        </form>
    );
}

export default AuthForm;