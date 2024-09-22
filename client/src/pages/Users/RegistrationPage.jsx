import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const Registration = lazy(() => import('../../components/Users/Registration'));

const RegistrationPage = () => {
    return (
        <div>
            
                <Suspense fallback={<LazyLoader/>}>
                <Registration/>
                </Suspense>
            
        </div>
    );
};

export default RegistrationPage;