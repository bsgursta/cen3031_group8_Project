import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Signup = () => {
    const [form_data, setFormData] = useState({
        email: '',
        user_name: '',
        password: '',
        confirm_password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    const validateFields = (name, value) => {
        let form_errors = {...errors};
        switch(name) {
                    case 'email':
                        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!email_regex.test(value)) {
                            form_errors.email = "Please enter a valid email address.";
                        }
                        else {
                            delete form_errors.email;
                        }
                        break;
            case 'user_name':
                const username_regex = /^[a-zA-Z0-9_]+$/;
                if (!username_regex.test(value)) {
                    form_errors.user_name = "Username can only contain letters, numbers, and underscores.";
            }
                else {
                    delete form_errors.user_name;
                }
                break;

            case 'password':
            const password_regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
            if (!password_regex.test(value) || value.length < 8 || value.length > 20) {
                form_errors.password = "Password must be 8-20 characters long, include one uppercase letter, one number, and one special symbol.";
            }
            else {
                delete form_errors.password;
            }
            break;

            case 'confirm_password':
                if (value !== form_data.password) {
                    form_errors.confirm_password = "Passwords do not match.";
                }
                else {
                    delete form_errors.confirm_password;
                }
                break;

                default:
                    break;
        }
        setErrors(form_errors);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        validateFields(name, value);
        };
    useEffect(() => {
        validateFields('password', form_data.password);
        validateFields('confirm_password', form_data.confirm_password);
    }, [form_data.password, form_data.confirm_password]);
        useEffect(() => {
        const is_form_complete = Object.values(form_data).every((field) => field !== '');
        const has_errors = Object.keys(errors).length > 0;
        setIsFormValid(is_form_complete && !has_errors);
    }, [form_data, errors]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add-user', {
                email: form_data.email,
                user_name: form_data.user_name,
                password: form_data.password
            });
            console.log('User added:', response.data);
            // redirect will occur here
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <main className="container">
            <h1 className="bg-primary text-white text-center p-4">Sign Up</h1>
            <form className="bg-light p-5 rounded shadow" style={{ maxWidth: '500px', margin: 'auto' }} onSubmit={handleSubmit}>
        <div className="mb-3">
                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                <input type="email" name="email" id="email" className="form-control" value={form_data.email} onChange={handleChange} required />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">User Name <span className="text-danger">*</span></label>
                <input type="text" name="user_name" id="uname" className="form-control" value={form_data.user_name} onChange={handleChange} required />
                {errors.user_name && <div className="text-danger">{errors.user_name}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                <input type="password" name="password" id="password" className="form-control" value={form_data.password} onChange={handleChange} required />
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                <input type="password" name="confirm_password" id="confirmpassword" className="form-control" value={form_data.confirm_password} onChange={handleChange} required />
                {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}
        </div>
            <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>Create Account</button>
            </form>
            </main>
        </div>
    );
};

export default Signup;