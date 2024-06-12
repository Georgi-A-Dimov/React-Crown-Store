import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserAuthWithEmailAndPassword } from "../../utils/firebase.utils";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const SignInForm = () => {

    const defaultFormFields = {
        email: '',
        password: '',
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInUserAuthWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;

                default:
                    console.log(error);;
            };
        };

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
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