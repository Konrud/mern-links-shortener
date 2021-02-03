import React, { Component } from "react";
import { convertPXtoRem } from "../../utils";


class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: null
        };

        this.tabs = [];
        this.handleClick = this.handleClick.bind(this);

        this.props.items.forEach((item) => {
            this.tabs.push({
                tabElem: React.createRef(),
                titleElem: React.createRef(),
                contentElem: React.createRef()
            });
        });

        this.state.activeTab = this.tabs[0];
    }

    componentDidMount() {
        let previousTabsOffset = 0;
        const currentFontSize = parseFloat(window.getComputedStyle(this.tabs[0].titleElem.current).fontSize);

        this.tabs.forEach((tab, i, currentArr) => {
            if (i === 0) return;
            const prevTabTitleElem = currentArr[i - 1].titleElem.current;
            previousTabsOffset += Math.ceil(prevTabTitleElem.getBoundingClientRect().width);

            const previousTabsOffsetInREM = Math.ceil(convertPXtoRem(previousTabsOffset, currentFontSize));

            const currentTabTitleElem = tab.titleElem.current;
            currentTabTitleElem.style.setProperty("--tab-margin-left", previousTabsOffsetInREM);
        });
    }

    componentDidUpdate() {

    }

    handleClick(e) {
        const currentTab = e.target;

        if (currentTab.getAttribute("role") !== "tab") return;

        // previously activeTab
        if (this.state.activeTab) {
            this.state.activeTab.tabElem.current.classList.remove("is-active");
            this.state.activeTab.titleElem.current.setAttribute("aria-expanded", false);
            this.state.activeTab.contentElem.current.setAttribute("aria-hidden", true);
        }

        const index = currentTab.id.replace(/[a-z]*/i, "");

        const currentlyActiveTab = this.tabs[index];

        if (currentlyActiveTab) {
            currentlyActiveTab.tabElem.current.classList.add("is-active");
            currentlyActiveTab.titleElem.current.setAttribute("aria-expanded", true);
            currentlyActiveTab.contentElem.current.setAttribute("aria-hidden", false);
        } else {
            currentTab.parentElement.classList.add("is-active");
            currentTab.setAttribute("aria-expanded", true);
            currentTab.parentElement.querySelector("[role=tabpanel]").setAttribute("aria-hidden", false);
        }

        this.setState({ activeTab: currentlyActiveTab });
    }

    render() {
        const { items, customClassesStr } = this.props;

        if (!Array.isArray(items) || !items.length) {
            return;
        }

        const tabItems = items.map((item, i, arr) => {
            const contentID = `tab${i}Content`;
            const titleID = `tab${i}`;
            const isActiveClass = i === 0 ? " is-active" : "";
            return (
                <article className={`c-tabs__item${isActiveClass}`} ref={this.tabs[i].tabElem} key={i}>
                    <button className="c-tabs__title" ref={this.tabs[i].titleElem} id={titleID} aria-expanded="false" aria-controls={contentID} role="tab">{item.title}</button>
                    <div className="c-tabs__content" ref={this.tabs[i].contentElem} id={contentID} role="tabpanel" aria-labelledby={titleID} aria-hidden="true">{item.content}</div>
                </article>
            );
        });

        return (
            <section className={customClassesStr ? `c-tabs ${customClassesStr}` : "c-tabs"} onClickCapture={this.handleClick}>
                {tabItems}
            </section>
        );
    }
}


export default Tabs;