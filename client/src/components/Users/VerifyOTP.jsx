import React, { Fragment, useState } from 'react';
import  ReactCodeInput  from 'react-code-input';
import { errorToast, successToast } from '../../helper/FormHelper';
import { RecoverVerifyOTPRequest } from '../../APIRequest/UsersAPIRequest';
import { getEmail } from '../../helper/SessionHelper';
import Store from '../../redux/store/Store';
import { HideLoader } from '../../redux/state-slice/settings-slice';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    let defaultInputStyle = {
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '45px',
    borderRadius: '3px',
    fontSize: '32px',
    height: '45px',
    paddingLeft: '7px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid grey'

    }
    let navigate = useNavigate();

    let [OTP,SetOTP] = useState("")
    const SubmitOTP = () =>{
        if(OTP.length===6){
            RecoverVerifyOTPRequest(getEmail(),OTP).then((result)=>{
             if(result===true){
                navigate("/createPassword")
                
             }
            } ).catch((e)=>{
                errorToast("Invalid code")
                return false;
            }) 
        }
        else{
            errorToast("OTP must be 6 digit")
            return false;
        }

    }

    return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                        <div className='card w-90 p-4'>
                            <div className='card-body'>
                                <h4>OTP Verification</h4>
                                <br />
                                <p>A 6 digit code has been sent to your email address</p>
                                <ReactCodeInput onChange={(value=>SetOTP(value))} inputStyle={defaultInputStyle} fields={6}/>
                                <br /><br />
                                <button onClick={SubmitOTP} className='btn w-100 animated fadeInUp float-end btn-primary'>Next</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default VerifyOTP;