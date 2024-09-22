import { errorToast, successToast } from "../helper/FormHelper";
import { OnChangeBrandInput, ResetFormValue, SetBrandList,SetBrandListTotal } from "../redux/state-slice/brand-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import Store from "../redux/store/Store";
const AxiosHeader = { headers: { "token":getToken() } };


export async function BrandListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/BrandList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetBrandList(Rows));
                store.dispatch(SetBrandListTotal(Total[0].count));
            } else {
                store.dispatch(SetBrandList([]));
                store.dispatch(SetBrandListTotal(0));
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

export async function CreateBrandRequest(PostBody, ObjectID) {
    let URL;
    if (ObjectID && ObjectID !== 0) {
        URL = `${BaseURL}/UpdateBrand/${ObjectID}`;
        console.log("Updating Brand with ID:", ObjectID);
    } else {
        URL = `${BaseURL}/CreateBrand`;
        console.log("Creating new Brand");
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

export async function FillBrandFormRequest(ObjectID) {
    let URL = `${BaseURL}/BrandDetailsByID/${ObjectID}`;
    

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            let FormValue = result.data.data[0];
            console.log("FormValue", FormValue);
            Store.dispatch(OnChangeBrandInput({ Name: "Name", Value: FormValue.Name }));
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

export async function BrandDetailsRequest(ObjectID) {
    let URL = `${BaseURL}/BrandDetailsByID/${ObjectID}`;
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

export async function DeleteBrand(ObjectID) {
    let URL = `${BaseURL}/DeleteBrand/${ObjectID}`;
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
            successToast("Brand Deleted Successfully");
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