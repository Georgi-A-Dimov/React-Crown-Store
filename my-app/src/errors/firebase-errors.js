export const handleFirebaseError = (error) => {
    let message = '';

    switch (error.code) {
        case 'auth/email-already-in-use':
            message = 'This email address is already in use.';
            break;
        case 'auth/invalid-email':
            message = 'The email address is not valid.';
            break;
        case 'auth/user-disabled':
            message = 'This user account has been disabled.';
            break;
        case 'auth/user-not-found':
            message = 'No user found with this email address.';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password. Please try again.';
            break;
        case 'auth/weak-password':
            message = 'The password is too weak. Please choose a stronger password.';
            break;
        case 'auth/requires-recent-login':
            message = 'Please log in again to proceed.';
            break;
        default:
            message = 'An unexpected error occurred. Please try again later.';
            break;
    }

    return message;
};