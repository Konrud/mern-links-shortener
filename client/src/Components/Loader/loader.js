import React, { useEffect, useRef } from "react";
import "../../WebComponents/Spinner/spinner.component";


function Loader(props) {
    const { isLoading } = props;
    const spinnerRef = useRef();

    useEffect(() => {
        if (isLoading) {
            spinnerRef.current.show();
        } else {
            spinnerRef.current.hide();
        }
    }, [spinnerRef, isLoading]);


    return (
        <>
            <spinner-component ref={spinnerRef}></spinner-component>
        </>
    );
}

export default Loader;