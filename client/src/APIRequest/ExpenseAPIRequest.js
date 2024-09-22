import { errorToast, successToast } from "../helper/FormHelper";
import { OnChangeExpenseInput, ResetFormValue, SetExpenseList,SetExpenseListTotal, SetExpenseTypeDropDown } from "../redux/state-slice/expense-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
const AxiosHeader = { headers: { "token":getToken() } };


export async function ExpenseListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/ExpensesList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetExpenseList(Rows));
                store.dispatch(SetExpenseListTotal(Total[0].count));
            } else {
                store.dispatch(SetExpenseList([]));
                store.dispatch(SetExpenseListTotal(0));
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

export async function ExpenseTypeDropDownRequest() {
    let URL = `${BaseURL}/ExpenseTypeDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetExpenseTypeDropDown( result.data.data));
            } else {
                store.dispatch(SetExpenseTypeDropDown([]));
                errorToast("No Expense found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function CreateExpenseRequest(PostBody, ObjectID) {
    let URL;
    if (ObjectID && ObjectID !== 0) {
        URL = `${BaseURL}/UpdateExpenses/${ObjectID}`;
        console.log("Updating Expense with ID:", ObjectID);
    } else {
        URL = `${BaseURL}/CreateExpenses`;
        console.log("Creating new ExpenseType");
    }

    store.dispatch(ShowLoader());
    try {
        const result = await axios.post(URL, PostBody, AxiosHeader);
        console.log("API response:", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            successToast("Request Successful");
             store.dispatch(ResetFormValue());
             return true;
        } else {

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

export async function FillExpenseFormRequest(ObjectID) {
    let URL = `${BaseURL}/ExpenseDetailsByID/${ObjectID}`;
    

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            let FormValue = result.data.data[0];
            console.log("FormValue", FormValue);
            store.dispatch(OnChangeExpenseInput({ Name: "TypeID", Value: FormValue.Name }));
            store.dispatch(OnChangeExpenseInput({ Name: "Amount", Value: FormValue.Amount }));
            store.dispatch(OnChangeExpenseInput({ Name: "Note", Value: FormValue.Note }));

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

export async function ExpenseDetailsRequest(ObjectID) {
    let URL = `${BaseURL}/ExpenseDetailsByID/${ObjectID}`;
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

export async function DeleteExpense(ObjectID) {
    let URL = `${BaseURL}/ExpensesDelete/${ObjectID}`;
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
            successToast("ExpenseType Deleted Successfully");
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