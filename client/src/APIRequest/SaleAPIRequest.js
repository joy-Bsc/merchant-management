import { errorToast, successToast } from "../helper/FormHelper";
import { SetCustomerDropDown, SetProductDropDown, SetSaleList,SetSaleListTotal } from "../redux/state-slice/sale-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
const AxiosHeader = { headers: { "token":getToken() } };


export async function SaleListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/SalesList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetSaleList(Rows));
                store.dispatch(SetSaleListTotal(Total[0].count));
            } else {
                store.dispatch(SetSaleList([]));
                store.dispatch(SetSaleListTotal(0));
                errorToast("No Data found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function CustomerDropDownRequest() {
    let URL = `${BaseURL}/CustomersDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetCustomerDropDown( result.data.data));
            } else {
                store.dispatch(SetCustomerDropDown([]));
                errorToast("No Customer found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function ProductDropDownRequest() {
    let URL = `${BaseURL}/ProductsDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetProductDropDown( result.data.data));
            } else {
                store.dispatch(SetProductDropDown([]));
                errorToast("No Product found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function CreateSaleRequest(ParentBody, ChildBody) {
    try {
        store.dispatch(ShowLoader());
        let PostBody = { "Parent": ParentBody, "Childs": ChildBody };
        let URL = `${BaseURL}/CreateSales`;
        const result = await axios.post(URL, PostBody, AxiosHeader);
       
         
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            successToast("Sale Created Successfully");
            return true;
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
        return false;
    }
}

export async function DeleteSaleRequest(PurchaseId) {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/SalesDelete/${PurchaseId}`;
        const result = await axios.get(URL, AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            successToast("Purchase Deleted Successfully");
            return true;
        } else {
            errorToast("Something went wrong");
            return false;
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
        return false;
    }
}