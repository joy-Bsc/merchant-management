import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        List: [],
        ListTotal: 0,
        BrandDropDown: [],
        CategoryDropDown: [],
        FormValue: {
             BrandID: '',
            CategoryID: '',
            Name: '',
            Unit: "",
            Details: ""
        }
    },
    reducers: {
        SetProductList: (state, action) => {
            state.List = action.payload;
        },
        SetProductListTotal: (state, action) => {
            state.ListTotal = action.payload;
        },
        SetBrandDropDown: (state, action) => {
            state.BrandDropDown = action.payload;
        },
        SetCategoryDropDown: (state, action) => {
            state.CategoryDropDown = action.payload;
        },
        OnChangeProductInput: (state, action) => {
            state.FormValue[`${action.payload.Name}`] = action.payload.Value;
        },
        ResetFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i)=>{
                state.FormValue[i]="";
            })
        }
    },
});
export const { SetProductList, SetProductListTotal,SetBrandDropDown,SetCategoryDropDown,OnChangeProductInput,ResetFormValue } = productSlice.actions;
export default productSlice.reducer;
