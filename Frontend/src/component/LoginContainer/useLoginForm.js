import { useState } from 'react';

const useLoginForm = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '', // Clear the error for the field being changed
        });
    };

    const validate = () => {
        let tempErrors = { email: '', password: '' };
        let isValid = true;

        if (!values.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }

        if (!values.password) {
            tempErrors.password = 'Password is required';
            isValid = false;
        } else if (values.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Handle the login logic here
            console.log('Logging in with', values);
            // After the login process, reset the form or handle further logic
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
};

export default useLoginForm;
