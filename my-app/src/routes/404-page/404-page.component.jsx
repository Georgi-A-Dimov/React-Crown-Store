import { Link } from 'react-router-dom';
import './404-page.styles.scss'; 

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-message">
                    Sorry, the page you're looking for cannot be found.
                </p>
                <p className="notfound-description">
                    But don't worry, you can find plenty of other things on our homepage.
                </p>
                <Link to="/" className="notfound-button">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;