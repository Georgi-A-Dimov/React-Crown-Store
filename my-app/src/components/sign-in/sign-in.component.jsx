import { useState } from "react";
import { signInWithGooglePopup, signInUserAuthWithEmailAndPassword } from "../../utils/firebase.utils";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";
import { handleFirebaseError } from "../../errors/firebase-errors";

const SignInForm = () => {

    const defaultFormFields = {
        email: '',
        password: '',
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [error, setError] = useState('');
    const { email, password } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInUserAuthWithEmailAndPassword(email, password);
            resetFormFields();
            navigate('/');
        } catch (error) {
            const errorMessage = handleFirebaseError(error);
            setError(errorMessage);
        };

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                    error={error}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                    error={error}
                />

                <div className="buttons-container">
                    <Button type="submit"> Sign In </Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle} > Google Sign in </Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;