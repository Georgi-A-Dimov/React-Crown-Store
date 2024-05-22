import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import CrownLogo from '../../assets/crown.svg?react';
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='#'>
                        SHOP
                    </Link>
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
};

export default Navigation