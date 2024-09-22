import { errorToast, successToast } from "../helper/FormHelper";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
import { SetExpensesByDateList, SetPurchaseByDateList, SetReturnByDateList, SetSalesByDateList } from "../redux/state-slice/report-slice";
const AxiosHeader = { headers: { "token":getToken() } };


export async function ExpensesByDateRequest(FromDate,ToDate){
    try {
        store.dispatch(ShowLoader());
        let PostBody = {"FromDate":FromDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"};
        let URL = `${BaseURL}/ExpensesByDate`;
        const result = await axios.post(URL,PostBody, AxiosHeader);
        console.log("report", result.data.data);
        console.log("report2", result.data.data[0].Rows[0].Type[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            store.dispatch(SetExpensesByDateList(result.data.data));
        }
        else{
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function PurchaseByDateRequest(FromDate,ToDate){
    try {
        store.dispatch(ShowLoader());
        let PostBody = {"FromDate":FromDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"};
        let URL = `${BaseURL}/PurchaseByDate`;
        const result = await axios.post(URL,PostBody, AxiosHeader);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            store.dispatch(SetPurchaseByDateList(result.data.data));
        }
        else{
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function ReturnByDateRequest(FromDate,ToDate){
    try {
        store.dispatch(ShowLoader());
        let PostBody = {"FromDate":FromDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"};
        let URL = `${BaseURL}/ReturnByDate`;
        const result = await axios.post(URL,PostBody, AxiosHeader);
        console.log("report", result.data.data);
        console.log("report2", result.data.data[0].Rows[0].Type[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            store.dispatch(SetReturnByDateList(result.data.data));
        }
        else{
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function SalesByDateRequest(FromDate,ToDate){
    try {
        store.dispatch(ShowLoader());
        let PostBody = {"FromDate":FromDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"};
        let URL = `${BaseURL}/SalesByDate`;
        const result = await axios.post(URL,PostBody, AxiosHeader);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            store.dispatch(SetSalesByDateList(result.data.data));
        }
        else{
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}