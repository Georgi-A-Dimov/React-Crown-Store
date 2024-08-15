import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarWithNumber = ({ number }) => {
    const starStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '50px',
        height: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'gold'
    };

    const numberStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        color: 'black'
    };

    return (
        <div style={starStyle}>
            <FontAwesomeIcon icon={faStar} size="2x" />
            <span style={numberStyle}>{number}</span>
        </div>
    );
};

export default StarWithNumber;