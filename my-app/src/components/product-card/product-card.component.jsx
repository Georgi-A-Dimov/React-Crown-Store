import "./product-card.styles.scss";

import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, isLinkDisabled }) => {
    const { name, price, imageUrl, id } = product
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">

            {isLinkDisabled ? (
                <div className="img-link">
                    <img className="product-img" src={imageUrl} alt={name} />
                </div>
            ) : (
                <Link className="img-link" to={id}>
                    <img className="product-img" src={imageUrl} alt={name} />
                </Link>
            )}

            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>

            <Button buttonType='inverted' onClick={addProductToCart} > Add to cart </Button>
        </div>
    );
};

export default ProductCard;