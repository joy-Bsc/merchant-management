import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settings-slice";
import profileReducer from "../state-slice/profile-slice";
import brandReducer from "../state-slice/brand-slice";
import customerReducer from "../state-slice/customer-slice";
import expenseReducer from "../state-slice/expense-slice";
import returnReducer from "../state-slice/return-slice";
import saleReducer from "../state-slice/sale-slice";
import supplierReducer from "../state-slice/supplier-slice";
import categoryReducer from "../state-slice/category-slice";
import productReducer from "../state-slice/product-slice";
import purchaseReducer from "../state-slice/purchase-slice";
import reportReducer from "../state-slice/report-slice";
import dashboardReducer from "../state-slice/dashboard-slice";
import expensetypeReducer from "../state-slice/expensetype-slice";

export default configureStore({
    reducer:{
        settings:settingsReducer,
        profile:profileReducer,
        brand:brandReducer,
        customer:customerReducer,
        expense:expenseReducer,
        return:returnReducer,
        sale:saleReducer,
        supplier:supplierReducer,
        category:categoryReducer,
        product:productReducer,
        purchase:purchaseReducer,
        report:reportReducer,
        dashboard:dashboardReducer,
        expensetype:expensetypeReducer,

    }
})