import React, { Fragment, useEffect } from 'react';
import Store from '../../redux/store/Store';
import { OnChangeCustomerInput } from '../../redux/state-slice/customer-slice';
import { useSelector } from 'react-redux';
import { CreateCustomerRequest, FillCustomerFormRequest } from '../../APIRequest/CustomerAPIRequest';
import { useNavigate } from 'react-router-dom';
import { errorToast, isEmail, isEmpty } from '../../helper/FormHelper';
import { useState } from 'react';
const CustomerCreateUpdate = () => {
    let FormValue = useSelector((state) => state.customer.FormValue);
    const navigate = useNavigate();
    let[ObjectID,SetObjectID]=useState(0);
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        if(id!==null){
        SetObjectID(id);
        (async()=>{
            await FillCustomerFormRequest(id);

    })()}
    }, [])

    const SaveChange= async()=>{
        if(isEmpty(FormValue.CustomerName)){
            errorToast("Customer Name is required");
        }
        else if(isEmpty(FormValue.Phone)){
            errorToast("Phone is required");
        }
        else if(isEmail(FormValue.Email)){
            errorToast("Valid Email is required");
        }
        else if(isEmpty(FormValue.Address)){
            errorToast("Address is required");
        }
        else{
            await CreateCustomerRequest(FormValue,ObjectID);
        
            navigate("/CustomerListPage")
            
        
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
                                    <h5>Save Customer</h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Customer Name</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeCustomerInput({Name:"CustomerName",Value:e.target.value}))}} value={FormValue.CustomerName} type="text" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Mobile No</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeCustomerInput({Name:"Phone",Value:e.target.value}))}} value={FormValue.Phone} type="text" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Email</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeCustomerInput({Name:"Email",Value:e.target.value}))}} value={FormValue.Email} type="text" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-12 p-4">
                                        <label htmlFor="" className="form-label">Address</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeCustomerInput({Name:"Address",Value:e.target.value}))}} value={FormValue.Address} type="text" className="form-control form-control-sm" rows={4}  />
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

export default CustomerCreateUpdate;