import React, { Fragment, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {errorToast, isEmail, isEmpty, isMobile } from '../../helper/FormHelper';
import { RegistrationRequest } from '../../APIRequest/UsersAPIRequest';


const Registration = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const mobileRef = useRef();
    const passwordRef = useRef();

    let navigate = useNavigate();
    

    const onRegistration = (e) => {
        e.preventDefault(); // Prevent default form submission
        
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const mobile = mobileRef.current.value;
        const password = passwordRef.current.value;
         const photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAAFSCAMAAACXC6fdAAABhlBMVEVHcEzE3f3L4v++2PzE3f3F3f3E3P281veCqMvE3f7D3P3L4v/F3f7L4v/F3v5FeJ/C3P3E3f3F3f3H3/7E3f2+2Py+2Py+2PxFeJ5FeJ9Ed53E3f1Ed5xAcZRLgapAcJNAcJNDdZtKgKrL4v++2PxSha1KgKq91/o23fvL4v82Xn3/3c6+2PtKgKr/y75AcJP0+/8rTWbigIbk9v/dY240XHzN4//K4f9Jfqg5YYHE3f3H3/5CdJnB2/xvkKz/08X839NHe6JEd50oS2Q+aYrb4fB+nLVBZYL3/f9PcYxXeZWJqMTn+P+mw+MwVXDi4OpcjLPg7vdhhKHT4vX9z8Oyzu0pTGVtmsC81fPj2OE+bJD29vj+2crw0s2YuNjKtbLv3d7ij5dTZXrexcP859747uzF2ebv+f+Lr9HksrjfdX7gytJraH58pcp4g5E/WnGTsMiGo72qb37xxLm4zdu0rK3jn6ePlqGmv8/WfYXeanXq8vilmZ/FeoWMb4IrAMkAsO9HcEylDzPuAAAAgnRSTlMAwuz4JUxfCgYU0dxs9zIXoH0+qLTg8upJMGKKue3v15p615OXi6H+//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8A3XUaOAAAHBNJREFUeNrsndtP4toXxwUpUCiEOw88atJsICY80AaJYsIoASMmikYTFKPJJJMzQY0hvvjH/1p0/HlpsatdXXtX+eYkM2cuOc3nrPvau11ZEVByWpKiUWW9ECqWy6XV1VKptFqvq8YP5WIiESpk1rNKVMql5djKUosVi8kRSalkQolyqb5lQKwb2qq/l6rOf3nVoGvAzUaliByLL9lZW6ayVkiGUylmSNfb7c3NrY84P9I10ZbKicK6IqXlJddXxQ3TzOZDyTnL9zLBfsX1Ge1qMZTJGga75Loi56JroXBKZ5rGbKSb9lp3ILVUDlWiOflH+3o0Y2mcNubqAKphr8XQejTyI7HKUtawTsM4NeZQetuZsZqpq2AEgZ8VPSPSWiLM4DKMdcsh1nIiE438kCIrno6uGd6uMZdyaqyqulo0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"       
         // Validation logic
        if (isEmail(email)) {
            errorToast("Valid Email address required!");
        } else if (isEmpty(firstName)) {
            errorToast("First Name required");
        } else if (isEmpty(lastName)) {
            errorToast("Last Name required");
        } else if (!isMobile(mobile)) {
            errorToast("Mobile number required");
        } else if (isEmpty(password)) {
            errorToast("Password required");
        } else {
            RegistrationRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                if(result===true){
                   navigate("/login")

                }
            })
        }
    };

    return (
        <Fragment>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-lg-6 center-screen'>
                       <div className='card animated fadeIn w-100 p-3'>
                        <div className='card-body'>
                            <h5>Sign Up</h5>
                            <br />
                            <input ref={emailRef} name="email" aria-label="User Email" placeholder='User Email' className='form-control animated fadeInUp' type="email" required />
                            <br />
                            <input ref={firstNameRef} name="firstName" aria-label="First Name" placeholder='First Name' className='form-control animated fadeInUp' type="text" required />
                            <br />
                            <input ref={lastNameRef} name="lastName" aria-label="Last Name" placeholder='Last Name' className='form-control animated fadeInUp' type="text" required />
                            <br />
                            <input ref={mobileRef} name="mobile" aria-label="Mobile" placeholder='Mobile' className='form-control animated fadeInUp' type="tel" required />
                            <br />
                            <input ref={passwordRef} name="password" aria-label="User Password" placeholder='User Password' className='form-control animated fadeInUp' type="password" required />
                            <br />
                            <button onClick={onRegistration} className='btn w-100 float-end btn-primary animated fadeInUp'>Complete</button>
                            <div className='text-center w-100'>
                                <Link className='text-center' to='/login'>Sign In</Link>
                                <br />
                                <Link className='text-center' to='/forgetPass'>Forget Password</Link>
                            </div>

                        </div>
                       </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Registration;