import React, { useRef } from 'react';
import { Fragment } from 'react';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import { RecoverResetPassRequest } from '../../APIRequest/UsersAPIRequest';
import { getEmail, getOTP } from '../../helper/SessionHelper';
import { useNavigate } from 'react-router-dom';

const CreatePassword = () => {
    let PasswordRef = useRef(); 
    let ConfirmPasswordRef = useRef();
    let navigate = useNavigate();
    
    const ResetPass = () => {
        let Password = PasswordRef.current.value;
        let ConfirmPassword = ConfirmPasswordRef.current.value;
        
        if (isEmpty(Password)) {
            errorToast("Password is required");
        } else if (isEmpty(ConfirmPassword)) {
            errorToast("Confirm password is required");
        } else if (Password !== ConfirmPassword) {
            errorToast("Password and confirm password should be the same");
        } else {
            RecoverResetPassRequest(getEmail(), getOTP(), Password)
                .then((result) => {
                    if (result === true) {
                        navigate("/login");
                    }
                })
                .catch((e) => {
                    errorToast("Something went wrong");
                });
        }
    }
    
    return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                        <div className='card w-90 p-4'>
                            <div className='card-body'>
                                <h4>Set New Password</h4>
                                <br />
                                <label htmlFor="">Your email address</label>
                                <input readOnly={true} value={getEmail()} placeholder='User email' className='form-control animated fadeInUp' type="email" />
                                <br />
                                <label htmlFor="">New Password</label>
                                <input ref={PasswordRef} placeholder='New password' className='form-control animated fadeInUp' type="password" />
                                <br />
                                <label htmlFor="">Confirm Password</label>
                                <input ref={ConfirmPasswordRef} placeholder='Confirm password' className='form-control animated fadeInUp' type="password" />
                                <br />
                                <button onClick={ResetPass} className='btn w-100 animated fadeInUp float-end btn-primary'>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;