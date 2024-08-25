import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Inputbox } from '../../component/UI/inputbox/input.styled';
import { login, register } from '../../../redux/reducer/slice/authlogin';
import { Navigate } from "react-router-dom";

function Login() {


    const [type, setType] = useState('login');

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth) || {};

    console.log(auth);


    let authSchema = {}, initialVal = {};

    if (type === 'signup') {
        authSchema = yup.object({
            name: yup.string().required("Enter your name"),
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().required().min(5, 'Password must be 5 characters long')
        });

        initialVal = {
            name: '',
            email: '',
            password: ''
        }
    } else if (type === 'login') {
        authSchema = yup.object({
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().required().min(5, 'Password must be 5 characters long')
        });

        initialVal = {
            email: '',
            password: '',
        }
    } else {
        authSchema = yup.object({
            email: yup.string().required("Enter your email").email("Enter valid email"),
        });

        initialVal = {
            email: '',
        }
    }

    let formikObj = useFormik({
        initialValues: initialVal,
        validationSchema: authSchema,
        onSubmit: values => {
            if (type === 'signup') {
                dispatch(register({ ...values, 'role': 'user' }));
            } else if (type === 'login') {
                dispatch(login(values))
            } else {

            }
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values } = formikObj;

    console.log(authSchema);

    console.log(initialVal);


    if (auth.isAuthenticated) {
        return <Navigate to="/" />
    }

    const handlegogglesub = () => {
        window.location.href = "http://localhost:8000/api/v1/users/googlelogin"
    }
    console.log(errors, touched);
    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {
                        type === 'login' ? "Login" :
                            type === 'signup' ? "Signup" : "Forgot Password?"
                    }
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">
                        {
                            type === 'login' ? "Login" :
                                type === 'signup' ? "Signup" : "Forgot Password?"
                        }
                    </li>
                </ol>
            </div>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <form onSubmit={handleSubmit} method='post'>
                        <div>
                            {
                                type === 'signup' ?
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='name'
                                            id='name'
                                            placeholder="Please enter your name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        <span>{errors.name && touched.name ? errors.name : null}</span>
                                    </div>
                                    : null
                            }

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name='email'
                                    id='email'
                                    placeholder="Please enter your name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <span>{errors.email && touched.email ? errors.email : null}</span>
                            </div>
                            {
                                type !== 'forgot' ?
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name='password'
                                            id='password'
                                            placeholder="Please enter your name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                        <span>{errors.password && touched.password ? errors.password : null}</span>
                                    </div>
                                    : null
                            }

                            {
                                type === 'signup' ?
                                    <p>Already have an account? <a href="#" class="link-primary" onClick={() => setType('login')}>Login</a></p>
                                    :
                                    <>
                                        <a href="#" class="link-primary" onClick={() => setType('forgot')}>Forgot Password?</a>
                                        <p>Don't have an account? <a href="#" class="link-primary" onClick={() => setType('signup')}>Signup</a></p>
                                    </>
                            }

                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <br></br>
                    <a
                        style={{
                            border: '2px solid #000',
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '4px',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handlegogglesub}
                    >
                        <img
                            width="48"
                            height="48"
                            src="https://img.icons8.com/color/48/google-logo.png"
                            alt="google-logo"
                        />
                        <span style={{ marginLeft: '8px' }}>Login with Google</span>
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Login;
