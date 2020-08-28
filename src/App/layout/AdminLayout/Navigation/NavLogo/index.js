import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href="/dashboard" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-trending-up" />
                    </div>
                    <span className="b-title">SecDash</span>
                 </a>
                <a href="/dashboard" className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
