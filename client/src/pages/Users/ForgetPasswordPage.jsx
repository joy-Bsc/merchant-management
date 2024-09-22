import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const ForgetPass = lazy(() => import('../../components/Users/SendOTP'));
const ForgetPassPage = () => {
    return (
        <div>
            
                <Suspense fallback={<LazyLoader/>}>
                <ForgetPass/>
                </Suspense>
           
        </div>
    );
};

export default ForgetPassPage;