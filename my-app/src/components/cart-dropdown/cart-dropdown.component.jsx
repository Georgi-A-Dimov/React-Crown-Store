import "./cart-dropdown.styles.scss";

import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-dropdown-container">
            {cartItems.length > 0
                ? <div className="cart-items">
                    {cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />))}
                  </div>
                : <span className="empty-message">Your cart is empty</span>
            }
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;