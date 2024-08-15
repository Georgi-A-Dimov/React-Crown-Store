import './item-details.styles.scss';

import { useParams } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';

import { UserContext } from '../../contexts/user.context';
import { CategoriesContext } from '../../contexts/categories.context';

import { deleteReview, editReview, getProductReviews, setProductReview } from '../../utils/firebase.utils';
import StarRate from '../../components/star-rate/star-rate.component';
import Button from '../../components/button/button.component';
import StarWithNumber from '../../components/star-rate/star-number.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ItemDetails = () => {

    const { id, category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext);
    const { currentUser, userId } = useContext(UserContext);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    const [formFields, setFormFields] = useState("");
    const [editReviewId, setEditReviewId] = useState(null);
    const [newReviewText, setNewReviewText] = useState('');

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
            };
            getReviews();
        };

    }, [product, userId])

    const userHasReviewed = reviews.some(review => review.userId === userId);

    if (!product) {
        return <p>Loading...</p>; // Handle loading or not found state
    };

    const handleChange = (event) => {
        setFormFields(event.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(rating);

    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formFields.trim() === "") {
            alert("Review text cannot be empty!");
            return;
        }

        try {
            await setProductReview(product.id, formFields, userId, currentUser.displayName, rating);
            const updatedReviews = await getProductReviews(id);
            setReviews(updatedReviews.reviews);
            setFormFields("");
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Failed to add review.");
        };

    };

    const handleEditChange = (event) => {
        setNewReviewText(event.target.value);
    };

    const handleEditSubmit = async () => {
        try {
            const updatedReviews = reviews.map(review =>
                review.userId === userId ? { ...review, review: newReviewText } : review
            );

            await editReview(product.id, userId, newReviewText);

            setReviews(updatedReviews);
            setEditReviewId(null);
        } catch (error) {
            console.error("Failed to update review:", error);
        }
    };
    const handleDelete = async (reviewUserId) => {
        try {
            await deleteReview(product.id, reviewUserId);
            const updatedReviews = await getProductReviews(product.id);
            setReviews(updatedReviews.reviews);
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    return (

        <Fragment>
            <div className="details-container">

                <div className="item-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="item-info">
                    <h2 className="item-name">{product.name}</h2>

                    <button className="toggle-description" onClick={toggleDescription}>
                        {isDescriptionVisible ? 'Hide Description' : 'View Description'}
                        <span className={`arrow ${isDescriptionVisible ? 'up' : 'down'}`}></span>
                    </button>

                    {isDescriptionVisible && (
                        <p className="item-description">
                            {product.description}
                        </p>
                    )}
                </div>
            </div>

            {currentUser && !userHasReviewed &&
                <div className="review-container">
                    <h2>Leave a Review</h2>
                    <form onSubmit={handleSubmit} className="review-form" >

                        <div className="rating">
                            <StarRate rating={rating} onRatingChange={handleRatingChange} />
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
            }

            <div className="review-section">
                <h2>Customer Reviews</h2>
                {reviews.length > 0 ?
                    reviews.map((review, index) => (
                        <div className="review" key={index}>
                            <div className="review-header">
                                <h3 className='review-author'>{review.username}</h3>
                                {/* <span className="review-rating">Rating: {review.rating} / 5</span> */}
                                <StarWithNumber number={review.rating} />
                            </div>

                            {editReviewId === review.userId ? (
                                <textarea
                                    className="edit-review-text"
                                    value={newReviewText}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                <p className="review-text">{review.review}</p>
                            )}

                            {currentUser && userId === review.userId && (
                                <div className="review-actions">
                                    {editReviewId === review.userId ? (
                                        <button onClick={handleEditSubmit}>Save</button>
                                    ) : (
                                        <div className="edit-delete-container">
                                            <button
                                                className="icon-button edit-button"
                                                onClick={() => { setEditReviewId(review.userId); setNewReviewText(review.review); }}>
                                                <FontAwesomeIcon icon={faEdit} size='2x'/>
                                            </button>

                                            <button className="icon-button delete-button" onClick={() => handleDelete(review.userId)}>
                                                <FontAwesomeIcon icon={faTrash} size='2x'/>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                    : <p>No reviews yet. Be the first to review this product!</p>
                }
            </div>

        </Fragment>


    );
};

export default ItemDetails;