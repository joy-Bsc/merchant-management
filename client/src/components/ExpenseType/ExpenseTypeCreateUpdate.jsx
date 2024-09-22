import React, { Fragment, useEffect } from 'react';
import Store from '../../redux/store/Store';
import { OnChangeExpenseTypeInput } from '../../redux/state-slice/expensetype-slice';
import { useSelector } from 'react-redux';
import { CreateExpenseTypeRequest, FillExpenseTypeFormRequest } from '../../APIRequest/ExpenseTypeAPIRequest';
import { useNavigate } from 'react-router-dom';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import { useState } from 'react';
const ExpenseTypeCreateUpdate = () => {
    let FormValue = useSelector((state) => state.expensetype.FormValue);
    
    const navigate = useNavigate();
    let[ObjectID,SetObjectID]=useState(0);
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        if(id!==null){
        SetObjectID(id);
        (async()=>{
            await FillExpenseTypeFormRequest(id);

    })()}
    }, [])

    const SaveChange= async()=>{
        if(isEmpty(FormValue.Name)){
            errorToast(" Name is required");
        }
        
        else{
            await CreateExpenseTypeRequest(FormValue,ObjectID);
        
            navigate("/ExpenseTypeListPage")
            
        
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
                                    <h5>Save Expense Type </h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Expense Type Name</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeExpenseTypeInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} type="text" className="form-control form-control-sm" />
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

export default ExpenseTypeCreateUpdate;