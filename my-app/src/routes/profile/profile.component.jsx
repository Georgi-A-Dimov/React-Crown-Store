import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

import profileImage from '../../assets/profile.png';
import './profile.styles.scss';
import { updateUserPassword, updateUserProfile } from '../../utils/firebase.utils';
import { handleFirebaseError } from '../../errors/firebase-errors';

const UserProfile = () => {
    const { currentUser } = useContext(UserContext);

    const [displayName, setDisplayName] = useState(currentUser ? currentUser.displayName : '');
    const [password, setPassword] = useState('');
    const [authProvider, setAuthProvider] = useState(null);
    const [toggleName, setToggleName] = useState(false);
    const [togglePass, setTogglePass] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser) {
            const provider = currentUser.providerData[0].providerId;
            setAuthProvider(provider);
        }
    }, [currentUser]);

    const toggleNameHandler = () => {
        setToggleName(!toggleName);
    };
    const togglePassHandler = () => {
        setTogglePass(!togglePass);
    };

    const handleNameChange = async () => {
        if (!displayName.trim()) {
            setError('Display name cannot be empty');
            return;
        };

        try {
            setError('');
            await updateUserProfile(currentUser, displayName);
            setToggleName(false);
        } catch (error) {
            const errorMessage = handleFirebaseError(error);
            setError(errorMessage);
        }
    };

    const handlePasswordChange = async () => {
        if (currentUser && authProvider === 'password') {
            if (password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
            try {
                setError('');
                await updateUserPassword(currentUser, password);
                setTogglePass(false);
            } catch (error) {
                const errorMessage = handleFirebaseError(error);
                setError(errorMessage);
            }
        }
    };

    return (
        <div className='profile-container'>
            <div className="profile-header">
                <h1>Profile</h1>
                <img className='profile-img' src={profileImage} alt="img" />
            </div>

            {toggleName ?
                <div className={`form-group ${error ? 'error' : ''}`}>
                    <h3>Username:</h3>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        placeholder={currentUser.displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button onClick={handleNameChange}>Update Name</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
                :
                <div className="form-group">
                    <h3>Username:</h3>
                    <span>{currentUser?.displayName}</span>
                    <button onClick={toggleNameHandler}>Edit</button>
                </div>
            }

            {authProvider === 'password' &&
                togglePass ?
                <div className={`form-group ${error ? 'error' : ''}`}>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordChange}>Update Password</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
                :
                <div className="form-group">
                    <h3>Password:</h3>
                    <span>******</span>
                    <button onClick={togglePassHandler}>Edit</button>
                </div>
            }

            {/* Inform Google Users They Can't Change Password */}
            {authProvider === 'google.com' && (
                <div>
                    <p> Since you signed in with Google, you can't change your password here. Please visit your <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">Google Account</a> to change your password.</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;