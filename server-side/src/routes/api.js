const express = require('express');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const UsersController = require('../controller/Users/UsersControllers');
const BrandsController = require('../controller/Brands/BrandsController');
const SuppliersController = require('../controller/Suppliers/SuppliersControllers');
const CategoriesController = require('../controller/Categories/CategoriesControllers');
const CustomersController = require('../controller/Customers/CustomersControllers');
const ExpenseTypeController = require('../controller/Expenses/ExpenseTypeController')
const ExpensesController= require('../controller/Expenses/ExpensesController')
const ProductsController = require('../controller/Products/ProductsController')
const PurchasesController = require('../controller/Purchases/PurchasesController')
const SalesController= require('../controller/Sales/SalesController')
const ReturnsController = require('../controller/Returns/ReturnsController')
const SummaryController = require('../controller/Summary/SummaryController')
const ReportController = require('../controller/Report/ReportController')
const router = express.Router();

//User profile
router.post ("/Registration",UsersController.Registration);
router.post ("/Login",UsersController.Login);
router.post ("/ProfileUpdate",AuthVerifyMiddleware,UsersController.ProfileUpdate);
router.get ("/ProfileDetails",AuthVerifyMiddleware,UsersController.ProfileDetails);
router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOtp/:email/:otp",UsersController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",UsersController.RecoverResetPassword);


//Brands
router.post ("/CreateBrand",AuthVerifyMiddleware,BrandsController.CreateBrand);
router.post ("/UpdateBrand/:id",AuthVerifyMiddleware,BrandsController.UpdateBrand);
router.get ("/BrandList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,BrandsController.BrandList);
router.get ("/BrandDropDown",AuthVerifyMiddleware,BrandsController.BrandDropDown);
router.get ("/BrandDetailsByID/:id",AuthVerifyMiddleware,BrandsController.BrandDetailsByID);
router.get ("/DeleteBrand/:id",AuthVerifyMiddleware,BrandsController.DeleteBrand);

//Suppliers

router.post ("/CreateSuppliers",AuthVerifyMiddleware,SuppliersController.CreateSuppliers);
router.post ("/UpdateSuppliers/:id",AuthVerifyMiddleware,SuppliersController.UpdateSuppliers);
router.get ("/SuppliersList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,SuppliersController.SuppliersList);
router.get ("/SuppliersDropDown",AuthVerifyMiddleware,SuppliersController.SuppliersDropDown);
router.get ("/SuppliersDetailsByID/:id",AuthVerifyMiddleware,SuppliersController.SuppliersDetailsByID);
router.get ("/DeleteSupplier/:id",AuthVerifyMiddleware,SuppliersController.DeleteSupplier);


//Categories
router.post ("/CreateCategories",AuthVerifyMiddleware,CategoriesController.CreateCategories);
router.post ("/UpdateCategories/:id",AuthVerifyMiddleware,CategoriesController.UpdateCategories);
router.get ("/CategoriesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,CategoriesController.CategoriesList);
router.get ("/CategoriesDropDown",AuthVerifyMiddleware,CategoriesController.CategoriesDropDown);
router.get ("/CategoriesDetailsByID/:id",AuthVerifyMiddleware,CategoriesController.CategoriesDetailsByID);
router.get ("/DeleteCategories/:id",AuthVerifyMiddleware,CategoriesController.DeleteCategories);

//Customers
router.post ("/CreateCustomers",AuthVerifyMiddleware,CustomersController.CreateCustomer);
router.post ("/UpdateCustomers/:id",AuthVerifyMiddleware,CustomersController.UpdateCustomer);
router.get ("/CustomersList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,CustomersController.CustomerList);
router.get ("/CustomersDropDown",AuthVerifyMiddleware,CustomersController.CustomerDropDown);
router.get ("/CustomersDetailsByID/:id",AuthVerifyMiddleware,CustomersController.CustomerDetailsByID);
router.get ("/DeleteCustomers/:id",AuthVerifyMiddleware,CustomersController.DeleteCustomer);


//Expense Type
router.post ("/CreateExpenseType",AuthVerifyMiddleware,ExpenseTypeController.CreateExpenseType);
router.post ("/UpdateExpenseType/:id",AuthVerifyMiddleware,ExpenseTypeController.UpdateExpenseType);
router.get ("/ExpenseTypeList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ExpenseTypeController.ExpenseTypeList);
router.get ("/ExpenseTypeDropDown",AuthVerifyMiddleware,ExpenseTypeController.ExpenseTypeDropDown);
router.get ("/ExpenseTypeDetailsByID/:id",AuthVerifyMiddleware,ExpenseTypeController.ExpenseTypeDetailsByID);
router.get ("/DeleteExpenseType/:id",AuthVerifyMiddleware,ExpenseTypeController.DeleteExpenseType);

//Expenses
router.post ("/CreateExpenses",AuthVerifyMiddleware,ExpensesController.CreateExpenses);
router.post ("/UpdateExpenses/:id",AuthVerifyMiddleware,ExpensesController.UpdateExpenses);
router.get ("/ExpensesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ExpensesController.ExpensesList);
router.get ("/ExpensesDelete/:id",AuthVerifyMiddleware,ExpensesController.DeleteExpense);
router.get ("/ExpenseDetailsByID/:id",AuthVerifyMiddleware,ExpensesController.ExpenseDetailsByID);


//products
router.post ("/CreateProducts",AuthVerifyMiddleware,ProductsController.CreateProducts);
router.post ("/UpdateProducts/:id",AuthVerifyMiddleware,ProductsController.UpdateProducts);
router.get ("/ProductsList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ProductsController.ProductsList);
router.get ("/ProductsDropDown",AuthVerifyMiddleware,ProductsController.ProductsDropDown);
router.get ("/ProductsDetailsByID/:id",AuthVerifyMiddleware,ProductsController.ProductsDetailsByID);
router.get ("/DeleteProducts/:id",AuthVerifyMiddleware,ProductsController.DeleteProducts);


//Purchases
router.post ("/CreatePurchases",AuthVerifyMiddleware,PurchasesController.CreatePurchases );
router.get ("/PurchasesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,PurchasesController.PurchasesList);
router.get ("/PurchasesDelete/:id",AuthVerifyMiddleware,PurchasesController.PurchasesDelete);

//Sales
router.post ("/CreateSales",AuthVerifyMiddleware,SalesController.CreateSales);
router.get ("/SalesList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,SalesController.SalesList);
router.get ("/SalesDelete/:id",AuthVerifyMiddleware,SalesController.SalesDelete);


//Returns
router.post ("/CreateReturns",AuthVerifyMiddleware,ReturnsController.CreateReturns);
router.get ("/ReturnsList/:pageNo/:perPage/:searchKeyword",AuthVerifyMiddleware,ReturnsController.ReturnsList);
router.get ("/ReturnsDelete/:id",AuthVerifyMiddleware,ReturnsController.ReturnsDelete);


//Summary
router.get ("/ExpenseSummary",AuthVerifyMiddleware,SummaryController.ExpensesSummary);
router.get ("/PurchaseSummary",AuthVerifyMiddleware,SummaryController.PurchaseSummary);
router.get ("/SalesSummary",AuthVerifyMiddleware,SummaryController.SalesSummary);
router.get ("/ReturnSummary",AuthVerifyMiddleware,SummaryController.ReturnSummary);


//Reports
router.post("/ExpensesByDate",AuthVerifyMiddleware,ReportController.ExpensesByDate);
router.post("/PurchaseByDate",AuthVerifyMiddleware,ReportController.PurchaseByDate);
router.post("/SalesByDate",AuthVerifyMiddleware,ReportController.SalesByDate);
router.post("/ReturnByDate",AuthVerifyMiddleware,ReportController.ReturnByDate);


module.exports = router;