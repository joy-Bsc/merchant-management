import React,{Suspense, lazy} from 'react';
import MasterLayout from '../../components/MasterLayout/MasterLayout';
import LazyLoader from '../../components/MasterLayout/LazyLoader';
const ReturnList = lazy(() => import('../../components/Return/ReturnList'));

const ReturnListPage = () => {
    return (
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ReturnList />
            </Suspense>
        </MasterLayout>
    );
};

export default ReturnListPage;