import React, { Fragment, useRef } from 'react';
import {Link} from 'react-router-dom';
import { errorToast, isEmail, isEmpty } from '../../helper/FormHelper';
import { LoginRequest } from '../../APIRequest/UsersAPIRequest';
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        if (isEmail(email)) {
            errorToast("Invalid Email Address");
        } else if (isEmpty(password)) {
            errorToast("Password required");
        } else {
            LoginRequest(email, password).then((result) => {
                if (result === true) {
                    // Redirect to home page
                    window.location.href = "/";
                }
            });
        }
    };
    return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                        <div className='card w-90 p-4'>
                            <div className='card-body'>
                                <h5>Sign In</h5>
                                <br/>
                                <input ref={emailRef} placeholder='User Email' className='form-control animated fadeInUp' type='email'/>
                                <input ref={passwordRef} placeholder='User Password' className='form-control animated fadeInUp' type='password'/>
                                <br />
                                <button onClick={handleSubmit}className='btn w-100 animated fadeInUp float-end btn-primary'>Next</button>
                                <div className='text-center w-100'>
                                    <Link className='text-center animated fadeInUp' to='/registration'>Sign Up</Link>
                                    <br />
                                    <Link className='text-center animated fadeInUp' to='/ForgetPass'>Forget Password</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;