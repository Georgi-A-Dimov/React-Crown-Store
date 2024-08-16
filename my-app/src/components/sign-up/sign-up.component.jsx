import { useState } from "react";
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        };

        try {
            const { user } = await createUserAuthWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            await updateProfile(user, { displayName: displayName });
            resetFormFields();
            navigate('/');

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('User with this email already exists!');
            };

            console.log(error);
        };

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} 
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} 
                />

                <Button type="submit"> Sign Up </Button>
            </form>
        </div>
    )
};

export default SignUpForm;