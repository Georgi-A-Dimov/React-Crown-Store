import { useState } from "react";
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { handleFirebaseError } from "../../errors/firebase-errors";

const SignUpForm = () => {

    const [formFields, setFormFields] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = formFields;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validate()) {
            try {
                const { user } = await createUserAuthWithEmailAndPassword(email, password);
                await createUserDocumentFromAuth(user, { displayName });
                await updateProfile(user, { displayName: displayName });
                navigate('/');
    
            } catch (error) {
                console.log(error);
                
            }; 
        };

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!formFields.displayName) {
            valid = false;
            newErrors.displayName = "Display Name is required";
        }

        if (!formFields.email) {
            valid = false;
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
            valid = false;
            newErrors.email = "Email address is invalid";
        }

        if (!formFields.password) {
            valid = false;
            newErrors.password = "Password is required";
        } else if (formFields.password.length < 6) {
            valid = false;
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (formFields.password !== formFields.confirmPassword) {
            valid = false;
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return valid;
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
                    error={errors.displayName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                    error={errors.email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                    error={errors.password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    error={errors.confirmPassword}
                />

                <Button type="submit"> Sign Up </Button>
            </form>
        </div>
    )
};

export default SignUpForm;