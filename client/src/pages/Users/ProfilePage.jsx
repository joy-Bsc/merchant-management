import React,{Suspense, lazy} from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const Profile = lazy(() => import('../../components/Users/Profile'));
const ProfilePage = () => {
    return (
        <div>
           <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                <Profile/>
                </Suspense>
            </MasterLayout> 
        </div>
    );
};

export default ProfilePage;