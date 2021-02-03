const toastDefOptions = { // toast object with predefined options
    containerClass: "toasts-container",
    containerID: "toastsContainer",
    toastClass: "toast",
    position: "left-bottom", /// position of the toasts' container
    direction: "from-bottom", /// direction from which toasts will appear (e.g. from top, from bottom)
    messageTitleClass: "toast__header",
    messageClass: "toast__text",
    title: "",
    message: "",
    toastStyleClass: undefined,
    showClass: "toast--visible",
    hideClass: "toast--hidden",
    closeAfterSeconds: 10,
    isAutoClose: true
};

/// Initialize Toasts (including default options for Toasts)
/// <param name="options" type="Object">User defined options for Toast (not defined/changed options will be set by default objects for Toast)</param>
function initToast(options) {
    if (!options || this === undefined) { throw new Error("Options are not provided."); }
    const defOptsObj = Object.assign({}, toastDefOptions, options); // gets option value from received options object or from predefined options

    let toastsContainer = _getContainer(defOptsObj.containerID);

    if (!toastsContainer) {
        toastsContainer = _createContainer(defOptsObj);
        document.body.appendChild(toastsContainer);
    }

    /// returns Toast object with default/changed options, container for toasts and Show method
    return { Show: setToast, options: defOptsObj, toastContainer: toastsContainer };
};

// Creates and displays Toast
function setToast() {
    if (this === undefined) { return; } /// we check it against undefined using == equality because we wannt to take into account null which in this case will be equal to undefined. (null == undefined) // --> true
    const defOptsObj = this.options; // default options for this method
    const toastsContainer = this.toastContainer;

    const toastEl = document.createElement("div");
    toastEl.classList.add(defOptsObj.toastClass);

    if (defOptsObj.toastStyleClass) { // gives style to the toast (e.g. background, text color)
        toastEl.classList.add(defOptsObj.toastStyleClass);
    }

    const lastAddedToastStyleData = toastsContainer.lastToastElem ? window.getComputedStyle(toastsContainer.lastToastElem) : undefined;

    if (lastAddedToastStyleData) { /// set toast's top position (starts with the second Toast in the toast container)       
        const heightValue = parseFloat(lastAddedToastStyleData.height);
        const marginBottomValue = parseFloat(lastAddedToastStyleData.marginBottom);
        const currentOffset = heightValue + marginBottomValue;

        if (defOptsObj.direction === "from-bottom") {
            for (let i = toastsContainer.children.length - 1, j = 1; i >= 0; i--, j++) {
                const toastElem = toastsContainer.children[i];
                toastElem.style.bottom = (currentOffset * (j) + 5) + "px";
            };
        } else { // from-top
            for (let i = 0; i < toastsContainer.children.length; i++) {
                const toastElem = toastsContainer.children[i];
                toastElem.style.top = (currentOffset * (i + 1) + 5) + "px";
            };
        }
    }

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast__body");

    const toastHeader = document.createElement("h4");
    toastHeader.classList.add(defOptsObj.messageTitleClass);
    toastHeader.textContent = defOptsObj.title;

    const toastMessage = document.createElement("p");
    toastMessage.classList.add(defOptsObj.messageClass);
    toastMessage.innerHTML = defOptsObj.message; // we can add HTML tags here (e.g. <br />)

    toastBody.appendChild(toastHeader);
    toastBody.appendChild(toastMessage);
    toastEl.appendChild(toastBody);

    /// set time after which element will be given class to reveal it
    const revealElemDelay = 5; /*in milliseconds*/

    if (defOptsObj.isAutoClose) {
        window.setTimeout(function () {
            toastEl.classList.remove(defOptsObj.showClass); // hides element (with animation) from the page
            toastEl.classList.add(defOptsObj.hideClass);

            window.setTimeout(function () { // removes element entirely from the page
                toastEl.parentNode.removeChild(toastEl);
            }, getTransitionDurationAvgTimeInMillSec(toastEl)); // should be larger then transition duration values

        }, (defOptsObj.closeAfterSeconds * 1000) + revealElemDelay);
    };

    if (defOptsObj.direction === "from-bottom")
        toastsContainer.appendChild(toastEl);
    else if (defOptsObj.direction === "from-top")
        toastsContainer.insertBefore(toastEl, toastsContainer.firstElementChild); // new toast will appear above the last one

    /// saves last Toast element that was added.
    toastsContainer.lastToastElem = toastEl;

    window.setTimeout(function () {
        toastEl.classList.add(defOptsObj.showClass);
    }, revealElemDelay);

};

function _createContainer(options) {
    // for the time being, we assume that there is only one place on the page where toasts could appear
    // we're creating container for toasts from the beginning  
    const toastsContainer = document.createElement("div");
    toastsContainer.id = options.containerID;
    toastsContainer.classList.add(options.containerClass);
    /// Position of the container could be changed, 
    /// position class pattern should be TOASTCLASS--TOASTPOSITION e.g. .toasts-container--left-bottom
    toastsContainer.classList.add(options.containerClass + "--" + options.position);
    /// direction, from which toasts will be added,
    ///  class pattern should be TOASTCLASS--TOASTDIRECTION e.g. .toasts-container--from-top 
    toastsContainer.classList.add(options.containerClass + "--" + options.direction);
    return toastsContainer;
};

function _getContainer(id) {
    return document.getElementById(id);
};

// returns sum of transition duration css property values, for the element, in milliseconds (i.e. each value multiply by 1000)
/// <param name="el" type="HTMLElement">Element from which transitionDuration, css property, should be read</param>
function getTransitionDurationAvgTimeInMillSec(el) {
    const resultArr = window.getComputedStyle(el).transitionDuration.match(/(\d+.\d+)/gi); // gets only numbers from property e.g. "0.7s, 0.6s" 
    let resultNum = 0;
    if (resultArr) {
        for (let i = 0, len = resultArr.length; i < len; i++) {
            const num = resultArr[i];
            resultNum += (parseFloat(num) * 1000); /// e.g. from 0.7 to 700
        }
        resultNum /= resultArr.length;
    }
    return resultNum;
};

const Toast = { /// will return Toast object with current options
    Init: initToast
};

export default Toast;