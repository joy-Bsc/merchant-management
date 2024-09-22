import { errorToast, successToast } from "../helper/FormHelper";
import { SetProductDropDown, SetPurchaseList,SetPurchaseListTotal, SetSupplierDropDown } from "../redux/state-slice/purchase-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
const AxiosHeader = { headers: { "token":getToken() } };


export async function PurchaseListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/PurchasesList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetPurchaseList(Rows));
                store.dispatch(SetPurchaseListTotal(Total[0].count));
            } else {
                store.dispatch(SetPurchaseList([]));
                store.dispatch(SetPurchaseListTotal(0));
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

export async function SupplierDropDownRequest() {
    let URL = `${BaseURL}/SuppliersDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetSupplierDropDown( result.data.data));
            } else {
                store.dispatch(SetSupplierDropDown([]));
                errorToast("No Supplier found");
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

export async function CreatePurchaseRequest(ParentBody, ChildBody) {
    try {
        store.dispatch(ShowLoader());
        let PostBody = { "Parent": ParentBody, "Childs": ChildBody };
        let URL = `${BaseURL}/CreatePurchases`;
        const result = await axios.post(URL, PostBody, AxiosHeader);
       
         
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            successToast("Purchase Created Successfully");
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

export async function DeletePurchaseRequest(PurchaseId) {
    try {
        store.dispatch(ShowLoader());
        let URL = `${BaseURL}/PurchasesDelete/${PurchaseId}`;
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