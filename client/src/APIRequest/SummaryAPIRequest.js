import axios from "axios";
import Store from '../redux/store/Store';
import { HideLoader, ShowLoader } from '../redux/state-slice/settings-slice';
import { getToken } from "../helper/SessionHelper";
import { errorToast } from "../helper/FormHelper";
import { BaseURL } from "../helper/config";
const AxiosHeader = { headers: { "token":getToken() } };

export async function ExpenseSummaryRequest() {
    let URL = `${BaseURL}/ExpenseSummary`;

    Store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        
        
        Store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
           return result.data.data[0];
        } else {
            errorToast("Something went wrong");
            return [];
        }
    } catch (error) {
        errorToast(error.message);
        Store.dispatch(HideLoader());
        return [];
    }
}

export async function PurchaseSummaryRequest() {
    let URL = `${BaseURL}/PurchaseSummary`;

    Store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        
        
        Store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
           return result.data.data[0];
        } else {
            errorToast("Something went wrong");
            return [];
        }
    } catch (error) {
        errorToast(error.message);
        Store.dispatch(HideLoader());
        return [];
    }
}

export async function SalesSummaryRequest() {
    let URL = `${BaseURL}/SalesSummary`;

    Store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        
        
        Store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
           return result.data.data[0];
        } else {
            errorToast("Something went wrong");
            return [];
        }
    } catch (error) {
        errorToast(error.message);
        Store.dispatch(HideLoader());
        return [];
    }
}

export async function ReturnSummaryRequest() {
    let URL = `${BaseURL}/ReturnSummary`;

    Store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        
        
        Store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
           return result.data.data[0];
        } else {
            errorToast("Something went wrong");
            return [];
        }
    } catch (error) {
        errorToast(error.message);
        Store.dispatch(HideLoader());
        return [];
    }
}