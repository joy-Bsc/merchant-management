import { errorToast, successToast } from "../helper/FormHelper";
import { OnChangeProductInput, ResetFormValue, SetBrandDropDown, SetCategoryDropDown, SetProductList,SetProductListTotal } from "../redux/state-slice/product-slice";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import store from "../redux/store/Store";
import axios from 'axios';
import { getToken } from "../helper/SessionHelper";
import { BaseURL } from "../helper/config";
const AxiosHeader = { headers: { "token":getToken() } };


export async function ProductListRequest(pageNo, perPage, searchKeyword) {
    let URL = `${BaseURL}/ProductsList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            const { Rows, Total } = result.data.data[0];
            if (Rows.length > 0) {
                store.dispatch(SetProductList(Rows));
                store.dispatch(SetProductListTotal(Total[0].count));
            } else {
                store.dispatch(SetProductList([]));
                store.dispatch(SetProductListTotal(0));
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

export async function BrandDropDownRequest() {
    let URL = `${BaseURL}/BrandDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetBrandDropDown( result.data.data));
            } else {
                store.dispatch(SetBrandDropDown([]));
                errorToast("No Brand found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}
export async function CategoryDropDownRequest() {
    let URL = `${BaseURL}/CategoriesDropDown`;

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("dropDown", result.data.data[0].Name);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            
            if (result.data['data'].length > 0) {
                store.dispatch(SetCategoryDropDown( result.data.data));
            } else {
                store.dispatch(SetCategoryDropDown([]));
                errorToast("No Category found");
            }
        } else {
            errorToast("Something went wrong");
        }
    } catch (error) {
        errorToast(error.message);
        store.dispatch(HideLoader());
    }
}

export async function CreateProductRequest(PostBody, ObjectID) {
    let URL;
    if (ObjectID && ObjectID !== 0) {
        URL = `${BaseURL}/UpdateProducts/${ObjectID}`;
        console.log("Updating Product with ID:", ObjectID);
    } else {
        URL = `${BaseURL}/CreateProducts`;
        console.log("Creating new ProductType");
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

export async function FillProductFormRequest(ObjectID) {
    let URL = `${BaseURL}/ProductsDetailsByID/${ObjectID}`;
    

    store.dispatch(ShowLoader());
    try {
        const result = await axios.get(URL, AxiosHeader);
        console.log("rr", result);
        
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data.status === "success") {
            let FormValue = result.data.data[0];
            console.log("FormValue", FormValue);
            store.dispatch(OnChangeProductInput({ Name: "CategoryID", Value: FormValue.CategoryID }));
            store.dispatch(OnChangeProductInput({ Name: "BrandID", Value: FormValue.BrandID }));
            store.dispatch(OnChangeProductInput({ Name: "Name", Value: FormValue.Name }));
            store.dispatch(OnChangeProductInput({ Name: "Unit", Value: FormValue.Unit }));
            store.dispatch(OnChangeProductInput({ Name: "Details", Value: FormValue.Details }));

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

export async function ProductDetailsRequest(ObjectID) {
    let URL = `${BaseURL}/ProductsDetailsByID/${ObjectID}`;
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

export async function DeleteProduct(ObjectID) {
    let URL = `${BaseURL}/DeleteProducts/${ObjectID}`;
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
            successToast("ProductType Deleted Successfully");
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