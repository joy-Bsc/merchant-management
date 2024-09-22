import { errorToast, successToast } from "../helper/FormHelper";
import { OnChangeSupplierInput, ResetFormValue, SetSupplierList,SetSupplierListTotal } from "../redux/state-slice/supplier-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import Store from "../redux/store/Store";
const AxiosHeader = { headers: { "token":getToken() } };


export async function SupplierListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/SuppliersList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetSupplierList(Rows));
                store.dispatch(SetSupplierListTotal(Total[0].count));
            } else {
                store.dispatch(SetSupplierList([]));
                store.dispatch(SetSupplierListTotal(0));
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

export async function CreateSupplierRequest(PostBody, ObjectID) {
    let URL;
    if (ObjectID && ObjectID !== 0) {
        URL = `${BaseURL}/UpdateSuppliers/${ObjectID}`;
        console.log("Updating Supplier with ID:", ObjectID);
    } else {
        URL = `${BaseURL}/CreateSuppliers`;
        console.log("Creating new Supplier");
    }

    store.dispatch(ShowLoader());
    try {
        const result = await axios.post(URL, PostBody, AxiosHeader);
        console.log("API response:", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            successToast("Request Successful");
             Store.dispatch(ResetFormValue());
        } else {

            errorToast("Request Failed ! Try Again");
        }
    } catch (error) {
        console.log(error);
        
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function FillSupplierFormRequest(ObjectID) {
    let URL = `${BaseURL}/SuppliersDetailsByID/${ObjectID}`;
    

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            let FormValue = result.data.data[0];
            console.log("FormValue", FormValue);
            Store.dispatch(OnChangeSupplierInput({ Name: "Name", Value: FormValue.Name }));
            Store.dispatch(OnChangeSupplierInput({ Name: "Phone", Value: FormValue.Phone }));
            Store.dispatch(OnChangeSupplierInput({ Name: "Email", Value: FormValue.Email }));
            Store.dispatch(OnChangeSupplierInput({ Name: "Address", Value: FormValue.Address }));
            return true;
        
        } else {

            errorToast("Request Failed ! Try Again");
        }
    } catch (error) {
        console.log(error);
        
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function SupplierDetailsRequest(ObjectID) {
    let URL = `${BaseURL}/SuppliersDetailsByID/${ObjectID}`;
    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("cd", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            return result.data.data[0];
        } else {
            errorToast("Request Failed ! Try Again");
        }
    } catch (error) {
        console.log(error);
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function DeleteSupplier(ObjectID) {
    let URL = `${BaseURL}/DeleteSupplier/${ObjectID}`;
    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("cd", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "associate") {
            errorToast(result.data.data)
             return false;
        } 
       else if (result.status === 200 && result.data.status === "success") {
            successToast("Supplier Deleted Successfully");
            return true;
        }
        else {
            errorToast("Request Failed ! Try Again");
            return false;
        }
    } catch (error) {
        console.log(error);
        errorToast(error.message);
        store.dispatch(HideLoader());
        return false;
    }
}