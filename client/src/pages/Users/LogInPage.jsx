import React,{Suspense, lazy} from 'react';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const Login = lazy(() => import('../../components/Users/Login'));
const LoginPage = () => {
    return (
        <div>
             
                <Suspense fallback={<LazyLoader/>}>
                <Login/>
                </Suspense>
            
        </div>
    );
};

export default LoginPage;