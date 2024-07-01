import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CrownLogo from '../../assets/crown.svg?react';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>

                    {currentUser ?
                        (<span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>) 
                        :
                        (<Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>)
                    }
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
};

export default Navigation