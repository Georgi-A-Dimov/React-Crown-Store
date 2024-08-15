import { Fragment, useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRate = ({ rating, onRatingChange }) => {
    const [localRating, setLocalRating] = useState(rating);
    const [hoverRating, setHoverRating] = useState(null);

    const handleClick = (currentRate) => {
        setLocalRating(currentRate);
        onRatingChange(currentRate); // Notify parent component
    };

    return (
        <Fragment>
            {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                return (
                    <Fragment key={index}>
                        <label>
                            <input
                                type="radio"
                                name="rate"
                                value={currentRate}
                                onClick={() => handleClick(currentRate)}
                                style={{
                                    position: 'absolute',
                                    opacity: 0,
                                    width: 0,
                                    height: 0
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faStar}
                                size="2x"
                                color={currentRate <= (hoverRating || localRating) ? "gold" : "grey"}
                                onMouseEnter={() => setHoverRating(currentRate)}
                                onMouseLeave={() => setHoverRating(null)}
                            />
                        </label>
                    </Fragment>
                );
            })}
        </Fragment>
    );
};


export default StarRate;