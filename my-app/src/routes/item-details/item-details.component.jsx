import './item-details.styles.scss';

import { Fragment, useContext, useEffect, useState } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import { useParams } from 'react-router-dom';
import { getProductReviews, setProductReview } from '../../utils/firebase.utils';
import StarRate from '../../components/star-rate/star-rate.component';
import Button from '../../components/button/button.component';

const ItemDetails = () => {

    // const defaultFormFields = {
    //     review: '',
    //     rating: '',
    // };

    const { id, category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    const [formFields, setFormFields] = useState("");
    // const { review, rating } = formFields;

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible);
    };

    useEffect(() => {
        const currentProduct = () => (setProduct(categoriesMap[category]?.find((item) => (item.id === id))));
        currentProduct()
    }, [categoriesMap, category, id]);

    useEffect(() => {
        if (product?.id) {
            const getReviews = async () => {
                const productReviews = await getProductReviews(product.id);
                setReviews(productReviews.reviews);
                console.log(productReviews);

            };
            getReviews();
        };

    }, [product, reviews])

    if (!product) {
        return <p>Loading...</p>; // Handle loading or not found state
    };

    const handleChange = (event) => {
        setFormFields(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formFields.trim() === "") {
            alert("Review text cannot be empty!");
            return;
        }

        try {
            await setProductReview(id, formFields);
            setFormFields("");
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Failed to add review.");
        };

    };

    return (

        <Fragment>
            <div className="details-container">

                <div className="item-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="item-info">
                    <h2 className="item-name">???</h2>

                    <button className="toggle-description" onClick={toggleDescription}>
                        {isDescriptionVisible ? 'Hide Description' : 'View Description'}
                        <span className={`arrow ${isDescriptionVisible ? 'up' : 'down'}`}></span>
                    </button>

                    {isDescriptionVisible && (
                        <p className="item-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum corporis dolorem iusto sapiente, laboriosam esse excepturi cupiditate animi, deserunt dolores nesciunt maiores suscipit sit numquam possimus tenetur quod quas cumque.
                        </p>
                    )}
                </div>
            </div>

            <div className="review-container">
                <h2>Leave a Review</h2>
                <form onSubmit={handleSubmit} className="review-form" >

                    <div className="rating">
                        <StarRate />
                    </div>

                    <textarea
                        className="review"
                        placeholder="Write your review here..."
                        required
                        maxLength="200"
                        onChange={handleChange}
                    />

                    <Button type="submit"> Submit Review </Button>
                </form>

            </div>

            <div className="review-section">
                <h2>Customer Reviews</h2>
                {reviews.length > 0 ?
                    reviews.map((review, index) => (
                        <div className="review" key={index}>
                            <div className="review-header">
                                <h3 className='review-author'>???</h3>
                                <span className="review-rating">Rating: ? / 5</span>
                            </div>
                            <p className="review-text">{review.review}</p>
                        </div>
                    ))
                    : <p>No reviews yet. Be the first to review this product!</p>
                }
            </div>

        </Fragment>


    );
};

export default ItemDetails;