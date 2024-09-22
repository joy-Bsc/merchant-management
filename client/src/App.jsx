import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashBoardPage from './pages/DashBoard/DashBoardPage';
import ProfilePage from './pages/Users/ProfilePage';
import { getToken } from './helper/SessionHelper';
import RegistrationPage from './pages/Users/RegistrationPage';
import LoginPage from './pages/Users/LogInPage';
import ForgetPassPage from './pages/Users/ForgetPasswordPage';
import VerifyOTPPage from './pages/Users/VerifyOTPPage';
import CreatePasswordPage from './pages/Users/CreatePasswordPage';
import FullscreenLoader from './components/MasterLayout/FullScreenLoader';
import BrandListPage from './pages/Brand/BrandListPage';
import CategoryListPage from './pages/Category/CategoryListPage';
import CustomerListPage from './pages/Customer/CustomerListPage';
import ExpenseListPage from './pages/Expense/ExpenseListPage';
import ExpenseTypeListPage from './pages/ExpenseType/ExpenseTypeListPage';
import ProductListPage from './pages/Product/ProductListPage';
import PurchaseListPage from './pages/Purchase/PurchaseListPage';
import ReturnListPage from './pages/Return/ReturnListPage';
import SalesListPage from './pages/Sales/SalesListPage';
import SupplierListPage from './pages/Supplier/SupplierListPage';
import CustomerCreateUpdatePage from './pages/Customer/CustomerCreateUpdatePage';
import SupplierCreateUpdatePage from './pages/Supplier/SupplierCreateUpdatePage';
import BrandCreateUpdatePage from './pages/Brand/BrandCreateUpdatePage';
import CategoryCreateUpdatePage from './pages/Category/CategoryCreateUpdatePage';
import ExpenseTypeCreateUpdatePage from './pages/ExpenseType/ExpenseTypeCreateUpdatePage';
import ExpenseCreateUpdatePage from './pages/Expense/ExpenseCreateUpdatePage';
import ProductCreateUpdatePage from './pages/Product/ProductCreateUpdatePage';
import ExpenseReportPage from './pages/Report/ExpenseReportPage';
import PurchaseReportPage from './pages/Report/PurchaseReportPage';
import ReturnReportPage from './pages/Report/ReturnReportPage';
import SaleReportPage from './pages/Report/SalesReportPage';
import SalesCreateUpdatePage from './pages/Sales/SalesCreateUpdatePage';
import ReturnCreateUpdatePage from './pages/Return/ReturnCreateUpdatePage';
import PurchaseCreateUpdatePage from './pages/Purchase/PurchaseCreateUpdatePage';
const App = () => {

    if(getToken()){
      return (
        <Fragment>
          <Router>
            <Routes>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ForgetPass" element={<ForgetPassPage />} />
              <Route path="/VerifyOTP" element={<VerifyOTPPage />} />
              <Route path="/createPassword" element={<CreatePasswordPage />} />
              <Route path="/BrandListPage" element={<BrandListPage />} />
              <Route path="/CategoryListPage" element={<CategoryListPage />} />
              <Route path="/CustomerListPage" element={<CustomerListPage />} />
              <Route path="/ExpenseListPage" element={<ExpenseListPage />} />
              <Route path="/ExpenseTypeListPage" element={<ExpenseTypeListPage />} />
              <Route path="/ProductListPage" element={<ProductListPage />} />
              <Route path="/PurchaseListPage" element={<PurchaseListPage />} />
              <Route path="/ReturnListPage" element={<ReturnListPage />} />
              <Route path="/SaleListPage" element={<SalesListPage />} />
              <Route path="/SupplierListPage" element={<SupplierListPage />} />
              <Route path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage />} />
              <Route path="/SupplierCreateUpdatePage" element={<SupplierCreateUpdatePage />} />
              <Route path="/BrandCreateUpdatePage" element={<BrandCreateUpdatePage />} />
              <Route path="/CategoryCreateUpdatePage" element={<CategoryCreateUpdatePage />} />
              <Route path="/ExpenseTypeCreateUpdatePage" element={<ExpenseTypeCreateUpdatePage />} />
              <Route path="/ExpenseCreateUpdatePage" element={<ExpenseCreateUpdatePage />} />
              <Route path="/ProductCreateUpdatePage" element={<ProductCreateUpdatePage />} />
              <Route path="/ExpenseReport" element={<ExpenseReportPage />} />
              <Route path="/PurchaseReport" element={<PurchaseReportPage />} />
              <Route path="/ReturnReport" element={<ReturnReportPage />} />
              <Route path="/SalesReport" element={<SaleReportPage />} />
              <Route path="/SaleCreateUpdatePage" element={<SalesCreateUpdatePage />} />
              <Route path="/ReturnCreateUpdatePage" element={<ReturnCreateUpdatePage />} />
              <Route path="/PurchaseCreateUpdatePage" element={<PurchaseCreateUpdatePage />} />
            </Routes>
          </Router>
          <FullscreenLoader/>
            </Fragment>
      )
      
    }
    else{
      return (
        <Fragment>
          <Router>
            <Routes>
            <Route path='/'element={<Navigate to = "/login" replace/> }/>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ForgetPass" element={<ForgetPassPage />} />
              <Route path="/VerifyOTP" element={<VerifyOTPPage />} />
              <Route path="/createPassword" element={<CreatePasswordPage />} />
              
            </Routes>
          </Router>
          <FullscreenLoader/>
        </Fragment>
      )
    }
  
};

export default App;