import { createSlice } from '@reduxjs/toolkit';
export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        List: [],
        ListTotal: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        SaleFormValues: {
            CustomerID: '',
            VatTax:'',
            Discount:'',
            OtherCost:'',
            ShippingCost:'',
            GrandTotal:'',
            Note:'',
        },
        SaleItemList: [],
    },
    reducers: {
        SetSaleList: (state, action) => {
            state.List = action.payload;
        },
        SetSaleListTotal: (state, action) => {
            state.ListTotal = action.payload;
        },
        SetCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload;
        },
        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload;
        },
        OnChangeSaleInput: (state, action) => {
            state.SaleFormValues[`${action.payload.Name}`] = action.payload.Value;
        },
        SetSaleItemList: (state, action) => {
            state.SaleItemList.push(action.payload);
        },
        RemoveSaleItem: (state, action) => {
            state.SaleItemList.splice(action.payload, 1);
        }
    },
});


export const { SetSaleList, SetSaleListTotal,SetCustomerDropDown,SetProductDropDown,OnChangeSaleInput,SetSaleItemList,RemoveSaleItem } = saleSlice.actions;
export default saleSlice.reducer;
