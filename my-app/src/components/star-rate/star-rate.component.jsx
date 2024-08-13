import { Fragment, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRate = () => {

    const [rating, setRating] = useState(null);
    const [rateColor, setColor] = useState(null);

    return (
        <Fragment>
            {
                [...Array(5)].map((_, index) => {
                    const currentRate = index + 1;
                    return (
                        <Fragment key={index}>
                            <label>
                                <input type="radio"
                                    name="rate"
                                    value={currentRate}
                                    onClick={() => setRating(currentRate)}
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
                                    color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
                                    onMouseEnter={() => setColor(currentRate)}
                                    onMouseLeave={() => setColor(null)}
                                />
                            </label>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
};

export default StarRate;