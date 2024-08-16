import { Fragment, useContext } from "react";
import { Outlet, Link, useNavigate} from "react-router-dom";

import CrownLogo from '../../assets/crown.svg?react';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    const navigate = useNavigate(); 

    const handleSignOut = async () => {
        try {
            await signOutUser();
            navigate('/');
        } catch (error) {
            console.error('Sign out error', error);
        }
    };

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
                        (<>
                        <Link className="nav-link" to='/profile'>
                            Welcome {currentUser.displayName}
                        </Link>
                        <span className="nav-link" onClick={handleSignOut}>
                            SIGN OUT
                        </span>
                        </>) 
                        :
                        (<Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>)
                    }

                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>

            <Outlet />
        </Fragment>
    )
};

export default Navigation