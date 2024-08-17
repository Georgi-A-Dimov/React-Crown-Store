import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

const ProfileGuard = ({ children, redirectPath = '/auth' }) => {
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser !== null) {
            setIsLoading(false);
        }
    }, [currentUser]);

    if (isLoading) {
        return <div>Loading...</div>; // or a loading spinner
    }
    
    return currentUser ? children : <Navigate to={redirectPath} />;
};

export default ProfileGuard;