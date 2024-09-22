import React, { Fragment, useRef } from 'react';
import { errorToast, isEmail } from '../../helper/FormHelper';
import { RecoverVerifyEmailRequest } from '../../APIRequest/UsersAPIRequest';
import { useNavigate } from 'react-router-dom';

const SendOTP = () => {
    let emailRef = useRef();
    let navigate = useNavigate();

    const VerifyEmail = () => {
        let email = emailRef.current.value;
        if(isEmail(email)){
            errorToast("Valid email address required")
        }
        else{
            RecoverVerifyEmailRequest(email).then((result)=>{
               if(result===true){
                navigate("/VerifyOTP")
               }
            })
        }
    }
    return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                        <div className='card m-90 p-4'>
                            <div className='card-body'>
                                <h4>Email Address</h4>
                                <br />
                                <label>Your email address</label>
                                <input ref={emailRef} placeholder='User Email' className='form-control animated fadeInUp' type="email" />
                                <br />
                                <button onClick={VerifyEmail} className='btn w-100 animated fadeInUp float-end btn-primary'>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOTP;