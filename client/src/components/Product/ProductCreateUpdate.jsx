import React, { Fragment, useEffect } from 'react';
import Store from '../../redux/store/Store';
import { OnChangeProductInput } from '../../redux/state-slice/product-slice';
import { useSelector } from 'react-redux';
import { CreateProductRequest, BrandDropDownRequest,CategoryDropDownRequest, FillProductFormRequest } from '../../APIRequest/ProductAPIRequest';
import { useNavigate } from 'react-router-dom';
import { errorToast,  isEmpty } from '../../helper/FormHelper';
import { useState } from 'react';
const ProductCreateUpdate = () => {
    let FormValue = useSelector((state) => state.product.FormValue);
    let BrandDropDown = useSelector((state) => state.product.BrandDropDown);
    let CategoryDropDown = useSelector((state) => state.product.CategoryDropDown);
    
    
    
    const navigate = useNavigate();
    let[ObjectID,SetObjectID]=useState(0);
    useEffect(() => {
        (async () => {
             await  BrandDropDownRequest();
        })();

        (async () => {
            await  CategoryDropDownRequest();
         })();

        
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        if(id!==null){
        SetObjectID(id);
        (async()=>{
            await FillProductFormRequest(id);

    })()}
    }, [])

    const SaveChange= async()=>{
        if(isEmpty(FormValue.BrandID)){
            errorToast("Product Type is required");
        }
        else if(isEmpty(FormValue.CategoryID)){
            errorToast("Product Category is required");
        }
        else if(isEmpty(FormValue.Name)){
            errorToast("Product Name required");
        }
        else if(isEmpty(FormValue.Unit)){
            errorToast("Product Unit required");
        }
        else if(isEmpty(FormValue.Details)){
            errorToast("Product Details required");
        }
        
        else{
            await CreateProductRequest(FormValue,ObjectID);
        
            navigate("/ProductListPage")
            
        
        }
       
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Product</h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Brand Name</label>
                                        <select onChange={(e)=>{Store.dispatch(OnChangeProductInput({Name:"BrandID",Value:e.target.value}))}} value={FormValue.BrandID} className='form-select form-select-sm'>
                                            <option value="">Select Brand</option>
                                            {Array.isArray(BrandDropDown) && BrandDropDown.map((item, index) => (
                                            <option key={index.toLocaleString()} value={item._id}>{item.Name}</option>
                                        ))}
                                        </select>
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Category Name</label>
                                        <select onChange={(e)=>{Store.dispatch(OnChangeProductInput({Name:"CategoryID",Value:e.target.value}))}} value={FormValue.CategoryID} className='form-select form-select-sm'>
                                            <option value="">Select Category</option>
                                            {Array.isArray(CategoryDropDown) && CategoryDropDown.map((item, index) => (
                                            <option key={index.toLocaleString()} value={item._id}>{item.Name}</option>
                                        ))}
                                        </select>
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Product Name</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeProductInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} type="text" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Product Unit</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeProductInput({Name:"Unit",Value:e.target.value}))}} value={FormValue.Unit} type="text" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-12 row-4 p-2">
                                        <label htmlFor="" className="form-label">Product Details</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeProductInput({Name:"Details",Value:e.target.value}))}} value={FormValue.Details} type="text" className="form-control form-control-sm" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-4">
                                            <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductCreateUpdate;